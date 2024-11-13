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
      const user = await client.auth.getUser();
      console.log(user.data.user.id);
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
          <button
            className="bg-dark-purple text-white font-semibold text-base sm:text-base px-6 py-2.5 rounded-full inline-block mb-5 sm:mb-6 hover:bg-indigo-700 transition-colors min-h-11"
            type="button"
            onClick={handleEstimateBills}
          >
            Estimate bills now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnergyUsageCard;
