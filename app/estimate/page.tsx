"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, MoreVertical, Save, CirclePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import ApplianceCardComponent from "@/components/ApplianceCardComponent";
import { useRouter } from "next/navigation";

const AddAppliancePage = () => {
  const [newUser, setNewUser] = useState(true);
  const [dataSet, setDataSet] = useState<Appliance[]>();
  interface Appliance {
    appliance: string;
    powerUsage: number;
    brandName: string;
    model: string;
    frequencyOfUse: number;
    numberOfAppliance: number;
  }

  //data processing function
  function parseData(jsonData: Appliance[]): Appliance[] {
    return jsonData.map((item: Appliance) => ({
      appliance: item.appliance,
      powerUsage: Number(item.powerUsage),
      brandName: item.brandName,
      model: item.model,
      frequencyOfUse: Number(item.frequencyOfUse),
      numberOfAppliance: Number(item.numberOfAppliance),
    }));
  }
  useEffect(() => {
    const storedData = localStorage.getItem("storedData");
    if (storedData) {
      setNewUser(false);
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);
      console.log(typeof parsedData);
      const data: Appliance[] = parseData(parsedData);
      setDataSet(data);
    }
  }, []);
  const router = useRouter();
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
        className="justify-center items-center flex text-dark-purple py-3"
        onClick={() => router.push("create/")}
      >
        <CirclePlus />
        <div className="pl-1 font-semibold"> Add Appliance</div>
      </div>
      {newUser
        ? null
        : dataSet.map((appliance, index) => (
            <div className="m-2 p-2 float-left">
              <ApplianceCardComponent
                key={index}
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
          onClick={() => router.push("estimate/results/")}
        >
          Calculate Bills
        </button>
      </div>
    </div>
  );
};

export default AddAppliancePage;
