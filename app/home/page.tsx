"use client";
import React from "react";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";

const EnergyUsageCard: React.FC = () => {
  const router = useRouter();
  const routeTo: string = "estimate/";

  return (
    <>
      <Topbar />
      <div className="bg-white flex items-stretch justify-evenly h-screen pt-8">
        <div className="bg-white p-6 sm:p-6 w-full my-0 ">
          <div className="flex items-center mb-4 pb-5">
            <span className="text-7xl sm:text-8xl">👀</span>
            <span className="text-yellow-400 text-7xl sm:text-3xl">⚡</span>
          </div>
          <h2 className="text-5xl font-thin text-black sm:text-2xl mb-3 pb-3 sm:mb-4">
            Curious about your home's energy usage?
          </h2>
          <p className="text-m sm:text-base font-Montserrat text-black mb-4">
            Flip the switch and light up the details on your appliances' energy
            usage and likely bills!
          </p>
          <button
            className="bg-dark-purple text-white font-semibold text-base sm:text-base px-6 py-2.5 rounded-full inline-block mb-5 sm:mb-6 hover:bg-indigo-700 transition-colors min-h-11"
            type="button"
            onClick={() => router.push(routeTo)}
          >
            Estimate bills now →
          </button>
        </div>
      </div>
    </>
  );
};

export default EnergyUsageCard;
