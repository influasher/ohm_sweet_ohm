import React from 'react';
import Link from 'next/link';
import Topbar from "@/components/Topbar";

const EnergyUsageCard: React.FC = () => {
    return (
        <>
        <Topbar/>
            <div className="bg-white flex items-stretch justify-evenly h-screen pt-8">
        <div className="bg-white p-6 sm:p-6 w-full my-0 ">
            <div className="flex items-center mb-4 pb-5">
                <span className="text-7xl sm:text-8xl">👀</span>
                <span className="text-yellow-400 text-7xl sm:text-3xl">⚡</span>
            </div>
            <h2 className="text-5xl font-medium sm:text-2xl mb-3 pb-3 sm:mb-4 text-black">Curious about your home's energy usage?</h2>
            <p className="text-lg sm:text-base font-Montserrat text-black mb-4">
                Flip the switch and light up the details on your appliances' energy usage and likely bills!
            </p>
            <button className="bg-dark-purple text-white font-semibold text-base sm:text-base px-6 py-2.5 rounded-full inline-block mb-5 sm:mb-6 hover:bg-indigo-700 transition-colors">
                Estimate bills now →
            </button>
            <h3 className="text-xl pt-5 text-black sm:text-lg mb-2 font-Montserrat font-medium">Top 10 Appliance Bill Estimate</h3>
            <p className="text-lg font-Montserrat sm:text-base text-black mb-4">
                Check out the monthly energy consumption of top 10 common household appliance and how much they bill for.
            </p>
            <button className="bg-light-purple text-black font-semibold text-base sm:text-base px-6 py-2.5 rounded-full inline-block hover:bg-purple-300 transition-colors">
                View common costs →
            </button>
        </div>
            </div>
            </>
    );
};

export default EnergyUsageCard;