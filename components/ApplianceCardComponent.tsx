import { useState, FC } from "react";

// Define the props interface
interface ApplianceCardProps {
  applianceName: string;
  modelNumber: string;
  costPerMonth: number;
}

const tariff: Number = 32.57;

// Functional component with props
const ApplianceCardComponent: FC<ApplianceCardProps> = ({
  applianceName,
  modelNumber,
  costPerMonth,
}) => {
  // State to track user input
  const [frequencyOfUse, setFrequencyOfUse] = useState<string>("Always on (24hrs/day)");
  const [numberOfAppliances, setNumberOfAppliances] = useState<number>(1);

  // Handlers
  const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequencyOfUse(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfAppliances(parseInt(event.target.value));
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-full md:w-96">
      {/* Flexbox to align appliance name to the left and cost to the right */}
      <div className="flex justify-between items-center">
        {/* Appliance Name and Model */}
        <div>
          <h3 className="text-lg font-montserrat font-semibold">{applianceName}</h3>
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
          onChange={handleFrequencyChange}
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Always on (24hrs/day)</option>
          <option>12 hrs/day</option>
          <option>6 hrs/day</option>
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
