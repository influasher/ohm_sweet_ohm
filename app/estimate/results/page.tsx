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
  monthlyNationalAverage: number;
}

const EstimateResults = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [views, setViews] = useState<{ view1: string[]; view2: string[] }>({
    view1: ["", ""],
    view2: ["", ""],
  });
  const router = useRouter();

  useEffect(() => {
    const fetchApplianceData = async () => {
      const storedData = localStorage.getItem("storedData");
      if (storedData) {
        const parsedData: Appliance[] = JSON.parse(storedData);
        
        try {
          // Send a POST request to update the monthlyNationalAverage field for each appliance
          const response = await fetch("http://localhost:5000/getNationalMonthlyAverage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const updatedData: Appliance[] = await response.json();
          setAppliances(updatedData);

          const total = updatedData.reduce(
            (sum, appliance) => sum + appliance.totalCost,
            0
          );
          setTotalCost(total);
          localStorage.setItem("storedData", JSON.stringify(updatedData));

          // POST request to the getSuggestions endpoint
          const suggestionsResponse = await fetch("http://localhost:5000/getSuggestions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });

          if (!suggestionsResponse.ok) {
            throw new Error(`HTTP error! Status: ${suggestionsResponse.status}`);
          }

          const suggestionsViews = await suggestionsResponse.json();
          setViews(suggestionsViews); // Update the views state with the response

        } catch (error) {
          console.error("Error updating appliance data:", error);
        }
      }
    };

    fetchApplianceData();
  }, []);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("storedData");
  //   if (storedData) {
  //     const parsedData: Appliance[] = JSON.parse(storedData);
  //     setAppliances(parsedData);
  //     const total = parsedData.reduce(
  //       (sum, appliance) => sum + appliance.totalCost,
  //       0
  //     );
  //     setTotalCost(total);

  //     // send the appliances (list, line 21)
  //     // return same data with monthlyNationalAverage field
  //     // json.parse, save the result to setAppliances like line 30
  //     // change breakdown.tsx line 51 (30 to appliance.monthlyNationalAverage)

  //     // do post request
  //     // send the appliances (list, line 21)
  //     // return ai response to line 62 as prop (Infographic + views, line 24)
  //   }
  // }, []);

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
        <Infographic totalCost={totalCost} appliances={appliances} views={views}/>
      </div>
      <div className="m-2 p-2 float-left items-center justify-center">
        <Breakdown totalCost={totalCost} appliances={appliances} />
      </div>
    </div>
  );
};

export default EstimateResults;
