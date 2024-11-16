/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC, useEffect, useMemo } from "react";
import { X } from "lucide-react";

interface ApplianceCardProps {
  applianceName: string;
  modelNumber: string;
  powerUsage: number;
  frequencyOfUse: number;
  numberOfAppliance: number;
  onDelete?: () => void;
  onUpdate: (updates: {
    frequencyOfUse?: number;
    numberOfAppliance?: number;
    totalCost?: number;
  }) => void;
}

const tariff: number = 0.3257;

function calcCost(
  frequencyOfUse: number,
  powerUsage: number,
  numberOfAppliance: number
) {
  if (numberOfAppliance <= 0 || !numberOfAppliance) return 0;
  const hoursPerMonth = frequencyOfUse * 31;
  return hoursPerMonth * powerUsage * tariff * numberOfAppliance;
}

const ApplianceCardComponent: FC<ApplianceCardProps> = ({
  applianceName,
  modelNumber,
  powerUsage,
  frequencyOfUse: initialFrequencyOfUse,
  numberOfAppliance: initialNumberOfAppliance,
  onDelete,
  onUpdate,
}) => {
  const [frequencyOfUse, setFrequencyOfUse] = useState<number>(
    initialFrequencyOfUse
  );
  const [numberOfAppliances, setNumberOfAppliances] = useState<number>(
    initialNumberOfAppliance
  );

  // Calculate cost using useMemo to prevent unnecessary recalculations
  const costPerMonth = useMemo(
    () => calcCost(frequencyOfUse, powerUsage, numberOfAppliances),
    [frequencyOfUse, powerUsage, numberOfAppliances]
  );

  // Separate useEffect for updates to parent
  useEffect(() => {
    const updatedValues = {
      frequencyOfUse,
      numberOfAppliance: numberOfAppliances,
      totalCost: costPerMonth, // Include the calculated cost in the update
    };

    // Only update if values are different from initial values or if there's a new cost
    if (
      frequencyOfUse !== initialFrequencyOfUse ||
      numberOfAppliances !== initialNumberOfAppliance
    ) {
      onUpdate(updatedValues);
    }
  }, [
    frequencyOfUse,
    numberOfAppliances,
    initialFrequencyOfUse,
    initialNumberOfAppliance,
    costPerMonth,
    onUpdate, // Include onUpdate in dependencies
  ]);

  const handleDelete = () => {
    const storedData = localStorage.getItem("storedData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = parsedData.filter(
        (item: any) => item.appliance !== applianceName
      );
      localStorage.setItem("storedData", JSON.stringify(updatedData));
      if (onDelete) {
        onDelete();
      }
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setNumberOfAppliances(newValue);
    }
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFrequencyOfUse(Number(event.target.value));
  };

  return (
    <div className="relative border rounded-lg shadow-lg p-4 bg-white w-full md:w-96">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Delete appliance"
      >
        <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
      </button>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-montserrat font-semibold">
            {applianceName}
          </h3>
          <p className="text-gray-500">{modelNumber}</p>
        </div>

        <div className="text-2xl font-montserrat font-semibold">
          ${costPerMonth.toFixed(2)}
          <span className="text-sm font-light"> per month</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-500">Frequency of use</label>
        <select
          value={frequencyOfUse}
          onChange={handleFrequencyChange}
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={24}>Always on (24hrs/day)</option>
          <option value={12}>12 hrs/day</option>
          <option value={8}>8 hrs/day</option>
          <option value={4}>4 hrs/day</option>
          <option value={2}>2 hrs/day</option>
          <option value={1}>1 hrs/day</option>
          <option value={0.5}>30 mins/day</option>
          <option value={0.25}>15 mins/day</option>
          <option value={5 / 60}>5 mins/day</option>
        </select>
      </div>

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
