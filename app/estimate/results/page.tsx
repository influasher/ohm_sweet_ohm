"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, MoreVertical, Share2 } from "lucide-react";
import Topbar from "@/components/Topbar";
import Infographic from "@/app/estimate/results/Infographic";
import Breakdown from "@/app/estimate/results/Breakdown";
import { useRouter } from "next/navigation";

interface Appliance {
  appliance: string;
  powerUsage: number;
  brand: string; // Note: This is 'brand' in localStorage, but we'll map it to 'brandName' in our component
  model: string;
  frequencyOfUse: number;
  numberOfAppliance: number;
  totalCost: number;
}

const EstimateResults = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem("storedData");
    if (storedData) {
      const parsedData: Appliance[] = JSON.parse(storedData);
      setAppliances(parsedData);
      const total = parsedData.reduce(
        (sum, appliance) => sum + appliance.totalCost,
        0
      );
      setTotalCost(total);
    }
  }, []);
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen font-Montserrat">
      <Topbar />
      <div className="bg-dark-purple text-white p-4 flex items-center">
        <ArrowLeft className="mr-4" onClick={() => router.push("/estimate")} />
        <h1 className="text-lg font-montserrat flex-grow">
          Estimate bills - Results
        </h1>
        <div className="flex">
          <Share2 className="mr-3" />
          <MoreVertical />
        </div>
      </div>
      <div className="m-2 p-2 float-left items-center justify-center">
        <Infographic totalCost={totalCost} appliances={appliances} />
      </div>
      <div className="m-2 p-2 float-left items-center justify-center">
        <Breakdown totalCost={totalCost} appliances={appliances} />
      </div>
    </div>
  );
};

export default EstimateResults;
