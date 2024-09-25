import { useState, FC, useEffect } from "react";

// Define the props interface
interface ApplianceCardProps {
  applianceName: string;
  modelNumber: string;
  powerUsage: number;
}

type Appliance = {
  appliance: string;
  powerUsage: number;
  brandName: string;
  model: string;
  frequencyOfUse: number;
  numberOfAppliance: number;
}

const tariff: number = 32.57;

function calcCost(
  frequencyOfUse: number,
  powerUsage: number,
  numberOfAppliance: number
) {
  const hoursPerMonth = frequencyOfUse * 31;
  return hoursPerMonth * powerUsage * tariff * numberOfAppliance;
}

// Functional component with props
const ApplianceCardComponent: FC<ApplianceCardProps> = ({
  applianceName,
  modelNumber,
  powerUsage,
}) => {
  // State to track user input
  const [frequencyOfUse, setFrequencyOfUse] = useState<number>(24);
  const [numberOfAppliances, setNumberOfAppliances] = useState<number>(1);
  const [costPerMonth, setCostPerMonth] = useState<number>(0);

  // useEffect(() => {
  //   setCostPerMonth(calcCost(frequencyOfUse, powerUsage, numberOfAppliances));
  // }, [frequencyOfUse, numberOfAppliances]);

  useEffect(() => {
    const newCost = calcCost(frequencyOfUse, powerUsage, numberOfAppliances);
    setCostPerMonth(newCost);

    // Update localStorage
    const storedData = JSON.parse(localStorage.getItem("storedData") || "[]");
    const updatedData = storedData.map((item: Appliance) => {
      if (item.appliance === applianceName) {
        return { ...item, totalCost: newCost };
      }
      return item;
    });

    // If the appliance doesn't exist, add it
    if (!updatedData.some((item: Appliance) => item.appliance === applianceName)) {
      updatedData.push({ applianceName, totalCost: newCost });
    }

    localStorage.setItem("storedData", JSON.stringify(updatedData));
  }, [frequencyOfUse, numberOfAppliances, applianceName, powerUsage]);



  // Handlers
  // const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFrequencyOfUse(event.target.value);
  // };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfAppliances(parseInt(event.target.value));
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-full md:w-96">
      {/* Flexbox to align appliance name to the left and cost to the right */}
      <div className="flex justify-between items-center">
        {/* Appliance Name and Model */}
        <div>
          <h3 className="text-lg font-montserrat font-semibold">
            {applianceName}
          </h3>
          <p className="text-gray-500">{modelNumber}</p>
        </div>

        {/* Cost per month */}
        <div className="text-2xl font-montserrat font-semibold">
          ${costPerMonth.toFixed(2)}
          <span className="text-sm font-light"> per month</span>
        </div>
      </div>

      {/* Frequency of Use */}
      <div className="mt-4">
        <label className="text-sm text-gray-500">Frequency of use</label>
        <select
            value={frequencyOfUse}
            onChange={(e) => {
              setFrequencyOfUse(Number(e.target.value));
            }}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={24}>Always on (24hrs/day)</option>
          <option value={12}>12 hrs/day</option>
          <option value={8}>8 hrs/day</option>
          <option value={4}>4 hrs/day</option>
          <option value={2}>2 hrs/day</option>
          <option value={1}>1 hrs/day</option>
          <option value={.5}>30 mins/day</option>
          <option value={.25}>15 mins/day</option>
          <option value={5/60}>5 mins/day</option>
        </select>
      </div>

      {/* Number of Appliances */}
      <div className="mt-4">
        <label className="text-sm text-gray-500">Number of Appliances</label>
        <input
          type="number"
          min="1"
          value={numberOfAppliances}
          onChange={handleNumberChange}
          className="w-full mt-1 p-2 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ApplianceCardComponent;
