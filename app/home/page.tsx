"use client";

import React from "react";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const EnergyUsageCard: React.FC = () => {
  const router = useRouter();
  const routeTo = "/estimate";

  const handleEstimateBills = () => {
    router.push(routeTo);
  };

  const client = createClient();

  async function getUser() {
    try {
      const response = await client.auth.getUser();
      console.log(response.data.user?.user_metadata); // this is how we get the user details
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  getUser();

  return (
    <div className="bg-white min-h-screen font-Montserrat">
      <Topbar />
      <div className="flex items-stretch justify-evenly pt-8">
        <div className="bg-white p-6 sm:p-6 w-full">
          <div className="flex items-center mb-4 pb-5">
            <span className="text-7xl sm:text-8xl">👀</span>
            <span className="text-yellow-400 text-7xl sm:text-3xl">⚡</span>
          </div>
          <h2 className="text-5xl font-thin text-black sm:text-2xl mb-3 pb-3 sm:mb-4">
            Curious about your home&#39;s energy usage?
          </h2>
          <p className="text-m sm:text-base text-black mb-4">
            Flip the switch and light up the details on your appliances&#39;
            energy usage and likely bills!
          </p>
          <div className="px-1">
            <button
              className="bg-dark-purple text-white font-semibold text-base sm:text-base h-14 w-96 rounded-full inline-block mb-5 sm:mb-6 hover:bg-indigo-700 transition-colors min-h-11"
              type="button"
              onClick={handleEstimateBills}
            >
              Estimate bills now →
            </button>
          </div>
          <div className="px-1">
            <button
              className=" h-14 w-96 font-Karla font-semibold  rounded-full bg-red-400 hover:bg-indigo-700"
              onClick={() => {
                router.push("https://forms.gle/q7LsGqKDJuU22un19");
              }}
            >
              {" "}
              Fill Up Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyUsageCard;
