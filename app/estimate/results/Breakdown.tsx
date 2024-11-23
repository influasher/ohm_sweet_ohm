/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Helper function to calculate color distance in HSL space
function getColorDistance(
  hue1: number,
  sat1: number,
  light1: number,
  hue2: number,
  sat2: number,
  light2: number
): number {
  // Normalize hue difference considering the circular nature of hue
  const hueDiff = Math.min(Math.abs(hue1 - hue2), 360 - Math.abs(hue1 - hue2));
  // Weight factors for each component
  const hueWeight = 1;
  const satWeight = 1.5;
  const lightWeight = 2;

  return Math.sqrt(
    hueWeight * (hueDiff / 360) ** 2 +
      satWeight * ((sat1 - sat2) / 100) ** 2 +
      lightWeight * ((light1 - light2) / 100) ** 2
  );
}

// Function to generate a palette of distinct colors
const generateDistinctColors = (count: number): string[] => {
  const colors: Array<{
    hue: number;
    sat: number;
    light: number;
    hex: string;
  }> = [];
  const minDistance = 0.3; // Minimum distance between colors (adjust as needed)

  // Predefined color hue segments to ensure good distribution
  const hueStep = 360 / count;

  const attempts = 50; // Maximum attempts to find a distinct color

  for (let i = 0; i < count; i++) {
    let bestColor = null;
    let maxMinDistance = 0;

    // Try multiple times to find the most distinct color
    for (let attempt = 0; attempt < attempts; attempt++) {
      // Base hue on segment to ensure good distribution
      const baseHue = i * hueStep;
      const hueRange = hueStep * 0.8; // Allow some variation within segment

      const hue = (baseHue + Math.random() * hueRange) % 360;
      const sat = 65 + Math.random() * 20; // 65-85%
      const light = 45 + Math.random() * 15; // 45-60%

      // Find minimum distance to existing colors
      let minDistToOthers = 1;
      for (const existing of colors) {
        const distance = getColorDistance(
          hue,
          sat,
          light,
          existing.hue,
          existing.sat,
          existing.light
        );
        minDistToOthers = Math.min(minDistToOthers, distance);
      }

      // Update best color if this one is more distinct
      if (minDistToOthers > maxMinDistance) {
        maxMinDistance = minDistToOthers;
        bestColor = { hue, sat, light };
      }

      // If we found a color with sufficient distance, stop trying
      if (maxMinDistance >= minDistance) break;
    }

    if (bestColor) {
      // Convert HSL to HEX
      const h = bestColor.hue / 360;
      const s = bestColor.sat / 100;
      const l = bestColor.light / 100;

      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      // Convert to hex
      const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };

      const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      colors.push({ ...bestColor, hex: hexColor });
    }
  }

  return colors.map((color) => color.hex);
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

  // Define consistent colors for the bar chart
  const barChartColors = {
    consumption: "#7C3AED", // Purple color for your consumption
    average: "#10B981", // Green color for national average
    activeConsumption: "#9F67FF", // Lighter purple for active state
    activeAverage: "#34D399", // Lighter green for active state
  };

  const { applianceCostData, applianceConsumptionData, COLORS } =
    useMemo(() => {
      const costData: ApplianceData[] = appliances.map((appliance) => ({
        name: appliance.appliance,
        value: parseFloat(((appliance.totalCost / totalCost) * 100).toFixed(0)),
        cost: appliance.totalCost,
        consumption: Number(
          (appliance.powerUsage * appliance.frequencyOfUse).toFixed(0)
        ),
      }));

      const consumptionData: ConsumptionData[] = appliances.map(
        (appliance) => ({
          name: appliance.appliance,
          Consumption: appliance.powerUsage * appliance.frequencyOfUse * 30,
          cost: appliance.totalCost,
          Average: appliance.monthlyNationalAverage,
        })
      );

      const colors = generateDistinctColors(appliances.length);

      return {
        applianceCostData: costData,
        applianceConsumptionData: consumptionData,
        COLORS: colors,
      };
    }, [appliances, totalCost]);

  // Custom bar shape for active state
  const CustomBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={4}
          ry={4}
        />
      </g>
    );
  };

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
                    {appliance.value}% (${appliance.cost.toFixed(2)},{" "}
                    {appliance.consumption} kWh)
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
            <BarChart
              width={150}
              height={40}
              data={applianceConsumptionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: "kWh/month",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                }}
              />
              <Bar
                name="Your Consumption"
                dataKey="Consumption"
                fill={barChartColors.consumption}
                shape={<CustomBar />}
                activeBar={
                  <CustomBar fill={barChartColors.activeConsumption} />
                }
              />
              <Bar
                name="National Average"
                dataKey="Average"
                fill={barChartColors.average}
                shape={<CustomBar />}
                activeBar={<CustomBar fill={barChartColors.activeAverage} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default EnergyDashboard;
