import React from 'react';
import Link from 'next/link';

const EnergyUsageCard: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm mx-auto">
            <div className="flex items-center mb-4">
                <span className="text-2xl sm:text-3xl mr-2">👀</span>
                <span className="text-yellow-400 text-2xl sm:text-3xl">⚡</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Curious about your home's energy usage?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
                Flip the switch and light up the details on your appliances' energy usage and likely bills!
            </p>
            <Link href="/estimate-bills" className="bg-indigo-600 text-white text-sm sm:text-base px-4 py-2 rounded-full inline-block mb-5 sm:mb-6 hover:bg-indigo-700 transition-colors">
                Estimate bills now →
            </Link>
            <h3 className="font-semibold text-base sm:text-lg mb-2">Top 10 Appliance Bill Estimate</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
                Check out the monthly energy consumption of top 10 common household appliance and how much they bill for.
            </p>
            <Link href="/common-costs" className="bg-purple-200 text-purple-800 text-sm sm:text-base px-4 py-2 rounded-full inline-block hover:bg-purple-300 transition-colors">
                View common costs →
            </Link>
        </div>
    );
};

export default EnergyUsageCard;