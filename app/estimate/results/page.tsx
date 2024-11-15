"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, MoreVertical, Share2 } from "lucide-react";
import Topbar from "@/components/Topbar";
import Infographic from "@/app/estimate/results/Infographic";
import Breakdown from "@/app/estimate/results/Breakdown";
import { useRouter } from "next/navigation";
import { Appliance } from "@/types/appliance";
import { createClient } from "@/utils/supabase/client";

type Views = {
  [key: string]: string[];
};
const supabase = createClient();
async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
  } else {
    console.log(data);
    return data.user.id;
  }
}

async function getAppliances(): Promise<Appliance[]> {
  try {
    // Get the user ID
    const userid = await getUser();
    const userPath = `${userid}/`;

    // List all files in the user's directory
    const { data: fileList, error: listError } = await supabase.storage
      .from("oso_appliances")
      .list(userPath);

    if (listError) {
      console.error("Error listing files:", listError);
      return [];
    }

    if (!fileList) {
      console.error("No files found");
      return [];
    }

    // Filter for JSON files
    const jsonFiles = fileList.filter((file) => file.name.endsWith(".json"));

    // Download and parse each file
    const allAppliances = await Promise.all(
      jsonFiles.map(async (file) => {
        const { data, error } = await supabase.storage
          .from("oso_appliances")
          .download(`${userid}/${file.name}`);

        if (error || !data) {
          console.error(`Error downloading ${file.name}:`, error);
          return null;
        }

        try {
          const arrayBuffer = await data.arrayBuffer();
          const jsonString = new TextDecoder("utf-8").decode(arrayBuffer);
          const parsed = JSON.parse(jsonString);

          // Handle both single appliance and array of appliances
          const appliances = Array.isArray(parsed) ? parsed : [parsed];

          // Validate each appliance object
          return appliances.filter((item): item is Appliance => {
            const isValid =
              typeof item === "object" &&
              item !== null &&
              typeof item.appliance === "string" &&
              typeof item.powerUsage === "number" &&
              typeof item.brand === "string" &&
              typeof item.model === "string" &&
              typeof item.frequencyOfUse === "number" &&
              typeof item.numberOfAppliance === "number" &&
              typeof item.totalCost === "number";

            if (!isValid) {
              console.error("Invalid appliance data:", item);
            }

            return isValid;
          });
        } catch (parseError) {
          console.error(`Error parsing ${file.name}:`, parseError);
          return null;
        }
      })
    );

    // Remove any null values from failed downloads/parsing
    // and flatten the array of arrays into a single array
    const validAppliances = allAppliances
      .filter((item): item is Appliance[] => item !== null)
      .flat();

    return validAppliances;
  } catch (error) {
    console.error("Error in getAppliances:", error);
    return [];
  }
}

const EstimateResults: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [views, setViews] = useState<Views>({});
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchApplianceData();
      } catch (error) {
        console.error("Error in loadData:", error);
      }
    };

    loadData();
  }, []);

  const fetchApplianceData = async () => {
    const storedData = localStorage.getItem("storedData");
    if (!storedData) {
      console.log("No stored data found");
      return;
    }

    try {
      // const parsedData: Appliance[] = JSON.parse(storedData);
      const parsedData = await getAppliances();
      console.log("Parsed data from localStorage:", parsedData);

      // Update state with localStorage data immediately
      setAppliances(parsedData);
      const localTotal = parsedData.reduce(
        (sum, appliance) => sum + appliance.totalCost,
        0
      );
      setTotalCost(localTotal);

      // Then fetch updated data from the server
      const response = await fetch(
        "https://oso-backend.vercel.app/getNationalMonthlyAverage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedData: Appliance[] = await response.json();
      console.log("Updated data from getNationalMonthlyAverage:", updatedData);
      setAppliances(updatedData);

      const total = updatedData.reduce(
        (sum, appliance) => sum + appliance.totalCost,
        0
      );
      console.log("Calculated total cost:", total);
      setTotalCost(total);
      localStorage.setItem("storedData", JSON.stringify(updatedData));

      const suggestionsResponse = await fetch(
        "https://oso-backend.vercel.app/getSuggestions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!suggestionsResponse.ok) {
        throw new Error(`HTTP error! Status: ${suggestionsResponse.status}`);
      }

      const suggestionsViews: Views = await suggestionsResponse.json();
      console.log("Suggestions views:", suggestionsViews);
      setViews(suggestionsViews);
    } catch (error) {
      console.error("Error updating appliance data:", error);
    }
  };

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
        <Infographic
          totalCost={totalCost}
          appliances={appliances}
          views={views}
        />
      </div>
      <div className="m-2 p-2 float-left items-center justify-center">
        <Breakdown totalCost={totalCost} appliances={appliances} />
      </div>
    </div>
  );
};

export default EstimateResults;
