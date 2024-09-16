"use client";
import React, { useState } from "react";
import Topbar from "@/components/Topbar";
import { ArrowLeft, MoreVertical, Zap, Ghost } from "lucide-react";

const appliances = [
  {
    name: "Air Conditioners",
    activeUsage: { cost: "$0.31 - $1.24", kwh: "1.0 - 4.0 kWh" },
    phantomUsage: { cost: "$13.58 - $27.16", kwh: "43.8 - 87.6 kWh" },
  },
  {
    name: "Electric Kettles",
    activeUsage: { cost: "$0.47 - $0.78", kwh: "1.5 - 2.5 kWh" },
    phantomUsage: { cost: "$2.71 - $5.43", kwh: "8.76 - 17.52 kWh" },
  },
  {
    name: "Electric Stoves",
    activeUsage: { cost: "$0.31 - $0.78", kwh: "1.0 - 2.5 kWh" },
    phantomUsage: { cost: "$5.43 - $13.58", kwh: "17.52 - 43.80 kWh" },
  },
  {
    name: "Fans",
    activeUsage: { cost: "$0.02 - $0.06", kwh: "0.05 - 0.20 kWh" },
    phantomUsage: { cost: "$2.71 - $5.43", kwh: "8.76 - 17.52 kWh" },
  },
  {
    name: "Microwave Ovens",
    activeUsage: { cost: "$0.19 - $0.06", kwh: "0.6 - 1.2 kWh" },
    phantomUsage: { cost: "$5.43 - $13.58", kwh: "17.52 - 43.8 kWh" },
  },
  {
    name: "Refrigerators",
    activeUsage: { cost: "$0.03 - $0.22", kwh: "0.1 - 0.7 kWh" },
    phantomUsage: { cost: "N/A", kwh: "N/A" },
  },
  {
    name: "Rice Cookers",
    activeUsage: { cost: "$0.09 - $0.22", kwh: "0.3 - 0.7 kWh" },
    phantomUsage: { cost: "$2.71 - $5.43", kwh: "8.76 - 17.52 kWh" },
  },
  {
    name: "Televisions",
    activeUsage: { cost: "$0.03 - $0.09", kwh: "0.1 - 0.3 kWh" },
    phantomUsage: { cost: "$13.58 - $27.16", kwh: "43.80 - 87.60 kWh" },
  },
  {
    name: "Vacuum Cleaners",
    activeUsage: { cost: "$0.16 - $0.37", kwh: "0.5 - 1.2 kWh" },
    phantomUsage: { cost: "$2.71 - $5.43", kwh: "8.76 - 17.52 kWh" },
  },
  {
    name: "Washing Machines",
    activeUsage: { cost: "$0.16 - $0.47", kwh: "0.4 - 1.5 kWh" },
    phantomUsage: { cost: "$2.71 - $8.14", kwh: "8.76 - 26.28 kWh" },
  },
];

const EnergyBillsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [usageDuration, setUsageDuration] = useState(60);

  return (
    <div className="font-montserrat bg-purple-100 min-h-screen">
      <div className="bg-dark-purple text-white p-4 flex items-center">
        <ArrowLeft className="mr-4" />
        <h1 className="text-lg font-montserrat flex-grow">
          Common Appliance Energy Bills
        </h1>
        <MoreVertical />
      </div>
      <Topbar />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex border-b">
            <button
              className={`flex-1 pb-2 ${
                activeTab === "active"
                  ? "border-b-2 border-dark-purple text-dark-purple"
                  : ""
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active Usage
            </button>
            <button
              className={`flex-1 pb-2 ${
                activeTab === "phantom"
                  ? "border-b-2 border-dark-purple text-dark-purple"
                  : ""
              }`}
              onClick={() => setActiveTab("phantom")}
            >
              Phantom Usage
            </button>
          </div>

          {activeTab === "active" ? (
            <div className="mt-4">
              <p className="flex items-center text-gray-600 mb-4">
                <Zap className="mr-2 text-yellow-500" />
                Here are estimates of how much energy common appliances uses and
                how much they may cost you.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Slide to adjust usage duration
              </p>
              <input
                type="range"
                min="5"
                max="1440"
                value={usageDuration}
                onChange={(e) => setUsageDuration(Number(e.target.value))}
                className="w-full custom-range"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 mins</span>
                <span>10 mins</span>
                <span>30 mins</span>
                <span>60 mins</span>
                <span>1 day</span>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="flex items-center text-gray-600 mb-4">
                <Ghost className="mr-2 text-gray-400" />
                Even when not in use, appliances can still consume power if
                they're plugged in. Check out these estimates to see how much
                phantom energy might be costing you.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Slide to adjust usage duration
              </p>
              <input
                type="range"
                min="1"
                max="365"
                value={usageDuration}
                onChange={(e) => setUsageDuration(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 day</span>
                <span>1 week</span>
                <span>1 month</span>
                <span>1 year</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {appliances.map((appliance) => (
            <div
              key={appliance.name}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <span>{appliance.name}</span>
              <div className="text-right">
                <p className="text-dark-purple">
                  {activeTab === "active"
                    ? appliance.activeUsage.cost
                    : appliance.phantomUsage.cost}
                </p>
                <p className="text-xs text-gray-500">
                  {activeTab === "active"
                    ? appliance.activeUsage.kwh
                    : appliance.phantomUsage.kwh}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-dark-purple-500 mt-4 pb-4">
        Based on tariff rates of $0.31/kWh.
      </p>
    </div>
  );
};

export default EnergyBillsPage;
