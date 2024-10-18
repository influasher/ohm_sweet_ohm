import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Rectangle,
} from "recharts";
import { Appliance } from "@/types/appliance";

interface BreakdownProps {
  totalCost: number;
  appliances: Appliance[];
}

interface ApplianceData {
  name: string;
  value: number;
  cost: number;
  consumption: number;
}

interface ConsumptionData {
  name: string;
  Consumption: number;
  cost: number;
  Average: number | undefined;
}

type TabId = "cost" | "consumption";

interface TabProps {
  id: TabId;
  label: string;
  isActive: boolean;
  onClick: (id: TabId) => void;
}

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
};

const Tab: React.FC<TabProps> = ({ id, label, isActive, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`px-4 py-2 font-semibold ${
            isActive ? "text-purple-700 border-b-2 border-purple-700" : "text-black"
        }`}
    >
      {label}
    </button>
);

const EnergyDashboard: React.FC<BreakdownProps> = ({
                                                     totalCost,
                                                     appliances,
                                                   }) => {
  const [activeTab, setActiveTab] = useState<TabId>("cost");

  const { applianceCostData, applianceConsumptionData, COLORS } = useMemo(() => {
    const costData: ApplianceData[] = appliances.map(appliance => ({
      name: appliance.appliance,
      value: parseFloat(((appliance.totalCost / totalCost) * 100).toFixed(0)),
      cost: appliance.totalCost,
      consumption: Number((appliance.powerUsage * appliance.frequencyOfUse).toFixed(0)),
    }));

    const consumptionData: ConsumptionData[] = appliances.map(appliance => ({
      name: appliance.appliance,
      Consumption: appliance.powerUsage * appliance.frequencyOfUse * 30,
      cost: appliance.totalCost,
      Average: appliance.monthlyNationalAverage,
    }));

    const colors = costData.map(() => generateRandomColor());

    return { applianceCostData: costData, applianceConsumptionData: consumptionData, COLORS: colors };
  }, [appliances, totalCost]);

  return (
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
        <div className="flex mb-4 border-b">
          <Tab
              id="cost"
              label="Cost Breakdown"
              isActive={activeTab === "cost"}
              onClick={setActiveTab}
          />
          <Tab
              id="consumption"
              label="National Consumption Comparison"
              isActive={activeTab === "consumption"}
              onClick={setActiveTab}
          />
        </div>

        {activeTab === "cost" && (
            <div className="text-black">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Monthly Cost Breakdown
              </h2>
              <div className="flex">
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                          data={applianceCostData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                      >
                        {applianceCostData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full">
                  {applianceCostData.map((appliance, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex items-center">
                          <div
                              className="w-4 h-4 mr-2 rounded-full"
                              style={{ backgroundColor: COLORS[index] }}
                          ></div>
                          <span>{appliance.name}</span>
                        </div>
                        <div className="ml-6 text-sm text-gray-600">
                          {appliance.value}% (${appliance.cost.toFixed(2)}, {appliance.consumption}{" "}
                          kWh)
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Appliance Breakdown</h3>
                {applianceConsumptionData.map((item, itemIndex) => (
                    <div
                        key={itemIndex}
                        className="flex justify-between items-center py-2"
                    >
                      <div>
                        <div>{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.Consumption.toFixed(2)} kWh/month
                        </div>
                      </div>
                      <div>${item.cost.toFixed(2)}</div>
                    </div>
                ))}
              </div>
            </div>
        )}

        {activeTab === "consumption" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                National Consumption Comparison
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart width={150} height={40} data={applianceConsumptionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Bar
                      dataKey="Consumption"
                      fill="#8884d8"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                      dataKey="Average"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
        )}
      </div>
  );
};

export default EnergyDashboard;