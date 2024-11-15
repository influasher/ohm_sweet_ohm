"use client";

import React, { useEffect, useReducer } from "react";
import { ArrowLeft, MoreVertical, Save, CirclePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import ApplianceCardComponent from "@/components/ApplianceCardComponent";
import { useRouter } from "next/navigation";
import { Appliance } from "@/types/appliance";
// import { createClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

type State = {
  isNewUser: boolean;
  appliances: Appliance[];
};

type Action =
  | { type: "SET_NEW_USER"; payload: boolean }
  | { type: "SET_APPLIANCES"; payload: Appliance[] }
  | { type: "DELETE_APPLIANCE"; payload: string }; // New action type

const initialState: State = {
  isNewUser: true,
  appliances: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NEW_USER":
      return { ...state, isNewUser: action.payload };
    case "SET_APPLIANCES":
      return { ...state, appliances: action.payload };
    case "DELETE_APPLIANCE":
      return {
        ...state,
        appliances: state.appliances.filter(
          (appliance) => appliance.appliance !== action.payload
        ),
        isNewUser: state.appliances.length <= 1, // Set to true if last appliance is deleted
      };
    default:
      return state;
  }
}

const supabase = createClient();
// process.env.NEXT_PUBLIC_SUPABASE_URL!,
// process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getAppliances() {
  try {
    // Get the user ID
    const userid = await getUser();
    const userPath = userid + "/";

    // List all files in the user's directory
    const { data: fileList, error: listError } = await supabase.storage
      .from("oso_appliances")
      .list(userPath);

    if (listError) {
      console.error("Error listing files:", listError);
      return [];
    }

    // Filter for JSON files if needed
    const jsonFiles = fileList.filter((file) => file.name.endsWith(".json"));

    console.log(jsonFiles);

    // Download and parse each file
    const allAppliances = await Promise.all(
      jsonFiles.map(async (file) => {
        const { data, error } = await supabase.storage
          .from("oso_appliances")
          .download(userid + "/" + file.name);

        if (error) {
          console.error(`Error downloading ${file.name}:`, error);
          return null;
        }

        try {
          const arrayBuffer = await data.arrayBuffer();
          const jsonString = new TextDecoder("utf-8").decode(arrayBuffer);
          return JSON.parse(jsonString);
        } catch (parseError) {
          console.error(`Error parsing ${file.name}:`, parseError);
          return null;
        }
      })
    );

    // Remove any null values from failed downloads/parsing
    // and flatten the array if each file contains an array of appliances
    const validAppliances = allAppliances
      .filter((item) => item !== null)
      .flat();

    return validAppliances;
  } catch (error) {
    console.error("Error in getAppliances:", error);
    return [];
  }
}

async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
  } else {
    console.log(data);
    return data.user.id;
  }
}

async function deleteApplianceFile(applianceName: string) {
  try {
    const userid = await getUser();
    const fileName = `${userid}/${applianceName}.json`;

    const { error } = await supabase.storage
      .from("oso_appliances")
      .remove([fileName]);

    if (error) {
      console.error("Error deleting appliance file:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteApplianceFile:", error);
    return false;
  }
}

const AddAppliancePage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // useEffect(() => {
  //   // const storedData = localStorage.getItem("storedData"); // this needs to change
  //   // getApplicances();
  //   const storedData =  await getApplicances();
  //   if (storedData) {
  //     dispatch({ type: "SET_NEW_USER", payload: false });
  //     const parsedData: Appliance[] = JSON.parse(storedData);
  //     dispatch({ type: "SET_APPLIANCES", payload: parsedData });
  //   }
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getAppliances();
      if (storedData) {
        dispatch({ type: "SET_NEW_USER", payload: false });
        const parsedData: Appliance[] = storedData;
        dispatch({ type: "SET_APPLIANCES", payload: parsedData });
      }
    };

    fetchData();
    getUser();
  }, []);

  const handleAddAppliance = () => {
    router.push("create/");
  };

  const handleCalculateBills = () => {
    router.push("estimate/results/");
  };

  // const handleDeleteAppliance = (applianceName: string) => {
  //   dispatch({ type: "DELETE_APPLIANCE", payload: applianceName });

  //   // Update localStorage
  //   const storedData = localStorage.getItem("storedData");

  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     const updatedData = parsedData.filter(
  //       (item: Appliance) => item.appliance !== applianceName
  //     );
  //     localStorage.setItem("storedData", JSON.stringify(updatedData));
  //   }
  const handleDeleteAppliance = async (applianceName: string) => {
    try {
      // First attempt to delete the file from Supabase storage
      const deleteSuccess = await deleteApplianceFile(applianceName);

      if (deleteSuccess) {
        // If file deletion was successful, update the local state
        dispatch({ type: "DELETE_APPLIANCE", payload: applianceName });
      } else {
        // Handle deletion failure
        console.error("Failed to delete appliance file");
        // Optionally show an error message to the user
        // You might want to add a toast notification or alert here
      }
    } catch (error) {
      console.error("Error in handleDeleteAppliance:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="bg-white min-h-screen font-Montserrat">
      <Topbar />
      <div className="bg-dark-purple text-white p-4 flex items-center">
        <ArrowLeft className="mr-4" onClick={() => router.push("home/")} />
        <h1 className="text-lg font-montserrat flex-grow">Estimate bills</h1>
        <div className="flex">
          <Save className="mr-3" />
          <MoreVertical />
        </div>
      </div>
      <div
        className="justify-center items-center flex text-dark-purple py-3 cursor-pointer"
        onClick={handleAddAppliance}
      >
        <CirclePlus />
        <div className="pl-1 font-semibold">Add Appliance</div>
      </div>
      {!state.isNewUser &&
        state.appliances.map((appliance, index) => (
          <div key={index} className="m-2 p-2 float-left">
            <ApplianceCardComponent
              applianceName={appliance.appliance}
              modelNumber={appliance.model}
              powerUsage={appliance.powerUsage}
              onDelete={() => handleDeleteAppliance(appliance.appliance)}
            />
          </div>
        ))}

      <div className="text-dark-purple font-normal text-sm mx-4">
        Calculation is based on 30days/month and tariff rates of $0.31/kWh,
        based on rates in Jul – Sep 2024. Tariff rates are updated every
        quarter.
      </div>
      <div className="pt-5 pb-3 justify-center flex items-center">
        <button
          className="border bg-dark-purple py-1.5 rounded-full w-11/12 text-white"
          onClick={handleCalculateBills}
        >
          Calculate Bills
        </button>
      </div>
    </div>
  );
};

export default AddAppliancePage;
