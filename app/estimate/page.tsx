"use client";

import React, { useEffect, useReducer } from "react";
import { ArrowLeft, MoreVertical, Save, CirclePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import ApplianceCardComponent from "@/components/ApplianceCardComponent";
import { useRouter } from "next/navigation";
import { Appliance } from "@/types/appliance";

type State = {
  isNewUser: boolean;
  appliances: Appliance[];
};

type Action =
    | { type: "SET_NEW_USER"; payload: boolean }
    | { type: "SET_APPLIANCES"; payload: Appliance[] };

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
    default:
      return state;
  }
}

const AddAppliancePage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("storedData");
    if (storedData) {
      dispatch({ type: "SET_NEW_USER", payload: false });
      const parsedData: Appliance[] = JSON.parse(storedData);
      dispatch({ type: "SET_APPLIANCES", payload: parsedData });
    }
  }, []);

  const handleAddAppliance = () => {
    router.push("create/");
  };

  const handleCalculateBills = () => {
    router.push("estimate/results/");
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