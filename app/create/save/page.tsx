"use client";

import ApplianceCardComponent from "@/components/ApplianceCardComponent";
import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";

const SaveAppliancePage: React.FC = () => {
  //TODOS: figure out global state management and how we are supposed to call the form data/what even is the state data that we will be using
  const [formData, setFormData] = useState();

  // Dummy data for the appliance card component
  const dummyData = {
    applianceName: "Kettle",
    modelNumber: "KT-1500",
    costPerMonth: 5.99,
  };

  const router = useRouter();
  return (
    <div className="font-montserrat bg-white min-h-screen">
      <Topbar />
      <div className="bg-dark-purple text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ArrowLeft className="mr-4" />
          <h1 className="text-lg font-montserrat flex-grow">
            Enter Product Details
          </h1>
        </div>
        <button
          className="text-sm"
          type="button"
          onClick={() => router.push("./estimate")}
        >
          Save
        </button>
      </div>
      <div className="p-4 max-w-3xl mx-auto">
        <ApplianceCardComponent
          applianceName={dummyData.applianceName}
          modelNumber={dummyData.modelNumber}
          costPerMonth={dummyData.costPerMonth}
        />
      </div>
    </div>
  );
};

export default SaveAppliancePage;
