"use client";

import React, { useEffect, useReducer, useCallback } from "react";
import { ArrowLeft, Save, CirclePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import ApplianceCardComponent from "@/components/ApplianceCardComponent";
import { useRouter } from "next/navigation";
import { Appliance } from "@/types/appliance";
import { createClient } from "@/utils/supabase/client";

type State = {
  isNewUser: boolean;
  appliances: Appliance[];
  isSaving: boolean;
};

type Action =
  | { type: "SET_NEW_USER"; payload: boolean }
  | { type: "SET_APPLIANCES"; payload: Appliance[] }
  | { type: "DELETE_APPLIANCE"; payload: string }
  | { type: "SET_SAVING"; payload: boolean }
  | {
      type: "UPDATE_APPLIANCE";
      payload: { applianceName: string; updates: Partial<Appliance> };
    };

const initialState: State = {
  isNewUser: true,
  appliances: [],
  isSaving: false,
};

const tariff: number = 0.3257;

function calcCost(
  frequencyOfUse: number,
  powerUsage: number,
  numberOfAppliance: number
) {
  if (numberOfAppliance <= 0 || !numberOfAppliance) return 0;
  const hoursPerMonth = frequencyOfUse * 31;
  return hoursPerMonth * powerUsage * tariff * numberOfAppliance;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NEW_USER":
      return { ...state, isNewUser: action.payload };
    case "SET_APPLIANCES": {
      // Update localStorage whenever appliances are updated
      localStorage.setItem("storedData", JSON.stringify(action.payload));
      return { ...state, appliances: action.payload };
    }
    case "DELETE_APPLIANCE":
      return {
        ...state,
        appliances: state.appliances.filter(
          (appliance) => appliance.appliance !== action.payload
        ),
        isNewUser: state.appliances.length <= 1,
      };
    case "SET_SAVING":
      return { ...state, isSaving: action.payload };
    case "UPDATE_APPLIANCE":
      return {
        ...state,
        appliances: state.appliances.map((appliance) =>
          appliance.appliance === action.payload.applianceName
            ? { ...appliance, ...action.payload.updates }
            : appliance
        ),
      };
    default:
      return state;
  }
}

const supabase = createClient();

async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return data.user.id;
}

async function saveToSupabase(appliances: Appliance[]) {
  try {
    const userId = await getUser();
    if (!userId) {
      console.error("No user ID found");
      return false;
    }

    console.log("Saving appliances data:", appliances);

    const fileName = `appliances_${Date.now()}.json`;
    const filePath = `${userId}/${fileName}`;

    const processedAppliances = appliances.map((appliance) => ({
      ...appliance,
      frequencyOfUse: Number(appliance.frequencyOfUse),
      numberOfAppliance: Number(appliance.numberOfAppliance),
      powerUsage: Number(appliance.powerUsage),
      totalCost: Number(appliance.totalCost),
    }));

    console.log("Processed appliances data:", processedAppliances);

    const jsonString = JSON.stringify(processedAppliances, null, 2);
    console.log("JSON string to save:", jsonString);

    const blob = new Blob([jsonString], { type: "application/json" });

    const { error } = await supabase.storage
      .from("oso_appliances")
      .upload(filePath, blob);

    if (error) {
      console.error("Error uploading to Supabase:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in saveToSupabase:", error);
    return false;
  }
}

async function getAppliances(): Promise<Appliance[]> {
  try {
    const userid = await getUser();
    if (!userid) return [];

    const userPath = `${userid}/`;
    const { data: fileList, error: listError } = await supabase.storage
      .from("oso_appliances")
      .list(userPath);

    if (listError || !fileList) {
      console.error("Error listing files:", listError);
      return [];
    }

    const jsonFiles = fileList
      .filter((file) => file.name.endsWith(".json"))
      .sort((a, b) => {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return timeB - timeA;
      });

    if (jsonFiles.length === 0) return [];

    const mostRecentFile = jsonFiles[0];
    const { data, error } = await supabase.storage
      .from("oso_appliances")
      .download(`${userid}/${mostRecentFile.name}`);

    if (error || !data) {
      console.error("Error downloading file:", error);
      return [];
    }

    const arrayBuffer = await data.arrayBuffer();
    const jsonString = new TextDecoder("utf-8").decode(arrayBuffer);
    const parsed = JSON.parse(jsonString);

    const appliances = Array.isArray(parsed) ? parsed : [parsed];
    return appliances.filter((item): item is Appliance => {
      if (!item || typeof item !== "object") {
        console.error("Invalid appliance data: not an object", item);
        return false;
      }

      const validatedItem = {
        ...item,
        powerUsage: Number(item.powerUsage) || 0,
        frequencyOfUse: Number(item.frequencyOfUse) || 1,
        numberOfAppliance: Number(item.numberOfAppliance) || 1,
        totalCost: Number(item.totalCost) || 0,
      };

      const isValid =
        typeof validatedItem.appliance === "string" &&
        !isNaN(validatedItem.powerUsage) &&
        typeof validatedItem.brand === "string" &&
        typeof validatedItem.model === "string" &&
        !isNaN(validatedItem.frequencyOfUse) &&
        !isNaN(validatedItem.numberOfAppliance) &&
        !isNaN(validatedItem.totalCost);

      if (!isValid) {
        console.error("Invalid appliance data:", item);
        return false;
      }

      Object.assign(item, validatedItem);
      return true;
    });
  } catch (error) {
    console.error("Error in getAppliances:", error);
    return [];
  }
}

const AddAppliancePage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // Function to calculate and update totalCost for all appliances
  const calculateTotalCosts = (appliances: Appliance[]): Appliance[] => {
    return appliances.map((appliance) => ({
      ...appliance,
      totalCost: calcCost(
        appliance.frequencyOfUse,
        appliance.powerUsage,
        appliance.numberOfAppliance
      ),
    }));
  };

  // Memoized update handler
  const handleApplianceUpdate = useCallback(
    (applianceName: string, updates: Partial<Appliance>) => {
      dispatch({
        type: "UPDATE_APPLIANCE",
        payload: {
          applianceName,
          updates,
        },
      });

      // Update localStorage with totalCost
      const storedData = localStorage.getItem("storedData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const updatedData = parsedData.map((item: Appliance) => {
          if (item.appliance === applianceName) {
            const updatedItem = { ...item, ...updates };
            // Recalculate totalCost if relevant fields were updated
            if (
              updates.frequencyOfUse !== undefined ||
              updates.numberOfAppliance !== undefined
            ) {
              updatedItem.totalCost = calcCost(
                updatedItem.frequencyOfUse,
                updatedItem.powerUsage,
                updatedItem.numberOfAppliance
              );
            }
            return updatedItem;
          }
          return item;
        });
        localStorage.setItem("storedData", JSON.stringify(updatedData));
      }
    },
    []
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const appliancesData = await getAppliances();

        if (appliancesData.length > 0) {
          localStorage.setItem("storedData", JSON.stringify(appliancesData));
          dispatch({ type: "SET_NEW_USER", payload: false });
          dispatch({ type: "SET_APPLIANCES", payload: appliancesData });
        } else {
          const storedData = localStorage.getItem("storedData");
          if (storedData) {
            const parsedData: Appliance[] = JSON.parse(storedData);
            dispatch({ type: "SET_NEW_USER", payload: false });
            dispatch({ type: "SET_APPLIANCES", payload: parsedData });
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Error loading appliances. Please try refreshing the page.");
      }
    };

    loadData();
  }, []);

  const handleAddAppliance = () => {
    router.push("create/");
  };

  const handleCalculateBills = async () => {
    if (state.appliances.length < 3) {
      alert("Please add at least three appliance before calculating bills.");
      return;
    }
    try {
      dispatch({ type: "SET_SAVING", payload: true });

      // Calculate total costs for all appliances
      const appliancesWithCosts = calculateTotalCosts(state.appliances);

      // Update state with new costs
      dispatch({
        type: "SET_APPLIANCES",
        payload: appliancesWithCosts,
      });

      // Update localStorage with the latest data including costs
      localStorage.setItem("storedData", JSON.stringify(appliancesWithCosts));

      const saved = await saveToSupabase(appliancesWithCosts);
      if (!saved) {
        console.error("Failed to save appliances to Supabase");
        alert(
          "Warning: Failed to save appliances, but proceeding with calculation."
        );
      }
      router.push("estimate/results/");
    } catch (error) {
      console.error("Error in handleCalculateBills:", error);
      alert("Error occurred while saving. Please try again.");
    } finally {
      dispatch({ type: "SET_SAVING", payload: false });
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // if (state.appliances.length === 0) {
    //   alert("No appliances to save");
    //   return;
    // }

    if (state.isSaving) {
      return;
    }

    try {
      dispatch({ type: "SET_SAVING", payload: true });

      // Calculate total costs for all appliances
      const appliancesWithCosts = calculateTotalCosts(state.appliances);

      // Update state with new costs
      dispatch({
        type: "SET_APPLIANCES",
        payload: appliancesWithCosts,
      });

      // Update localStorage with the latest data including costs
      localStorage.setItem("storedData", JSON.stringify(appliancesWithCosts));

      console.log("Current appliances state:", appliancesWithCosts);

      const saved = await saveToSupabase(appliancesWithCosts);

      if (saved) {
        const savedAppliances = await getAppliances();
        console.log("Verified saved appliances:", savedAppliances);
        alert("Saved Appliances!");
      } else {
        alert("Failed to save appliances, please try again");
      }
    } catch (error) {
      console.error("Error saving appliances:", error);
      alert("Failed to save appliances, please try again");
    } finally {
      dispatch({ type: "SET_SAVING", payload: false });
    }
  };

  const handleDeleteAppliance = async (applianceName: string) => {
    dispatch({ type: "DELETE_APPLIANCE", payload: applianceName });

    const storedData = localStorage.getItem("storedData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = parsedData.filter(
        (item: Appliance) => item.appliance !== applianceName
      );
      localStorage.setItem("storedData", JSON.stringify(updatedData));

      try {
        await saveToSupabase(updatedData);
      } catch (error) {
        console.error("Error saving after delete:", error);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen font-Montserrat">
      <Topbar />
      <div className="bg-dark-purple text-white p-4 flex items-center">
        <ArrowLeft
          className="mr-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push("home/")}
        />
        <h1 className="text-lg font-montserrat flex-grow">Estimate bills</h1>
        <div className="flex items-center">
          <div
            className={`p-2 cursor-pointer hover:bg-purple-700 rounded-full transition-all duration-200 flex items-center justify-center ${
              state.isSaving ? "opacity-50" : "hover:opacity-80"
            }`}
            onClick={handleSave}
            role="button"
            tabIndex={0}
            aria-label="Save appliances"
            style={{ pointerEvents: state.isSaving ? "none" : "auto" }}
          >
            <Save className="w-5 h-5" />
          </div>
          {/* <div className="p-2 cursor-pointer hover:bg-purple-700 rounded-full transition-colors duration-200 flex items-center justify-center">
            <MoreVertical className="w-5 h-5" />
          </div> */}
        </div>
      </div>

      <div
        className="justify-center items-center flex text-dark-purple py-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleAddAppliance}
      >
        <CirclePlus />
        <div className="pl-1 font-semibold">Add Appliance</div>
      </div>

      <div className="flex flex-wrap">
        {!state.isNewUser &&
          state.appliances.map((appliance, index) => (
            <div key={index} className="m-2 p-2">
              <ApplianceCardComponent
                applianceName={appliance.appliance}
                modelNumber={appliance.model}
                powerUsage={appliance.powerUsage}
                frequencyOfUse={appliance.frequencyOfUse}
                numberOfAppliance={appliance.numberOfAppliance}
                onDelete={() => handleDeleteAppliance(appliance.appliance)}
                onUpdate={(updates) =>
                  handleApplianceUpdate(appliance.appliance, updates)
                }
              />
            </div>
          ))}
      </div>

      <div className="text-dark-purple font-normal text-sm mx-4">
        Calculation is based on 30days/month and tariff rates of 31.72
        cents/kWh, based on rates in Oct – Dec 2024. Tariff rates are updated
        every quarter.
      </div>

      <div className="pt-5 pb-3 justify-center flex items-center">
        <button
          className={`border bg-dark-purple py-1.5 rounded-full w-11/12 text-white transition-opacity duration-200 ${
            state.isSaving
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
          onClick={handleCalculateBills}
          disabled={state.isSaving}
        >
          {state.isSaving ? "Saving..." : "Calculate Bills"}
        </button>
      </div>
    </div>
  );
};

export default AddAppliancePage;
