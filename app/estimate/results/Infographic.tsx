import React, { useState, useEffect } from "react";

interface Appliance {
  appliance: string;
  powerUsage: number;
  brand: string; // Note: This is 'brand' in localStorage, but we'll map it to 'brandName' in our component
  model: string;
  frequencyOfUse: number;
  numberOfAppliance: number;
  totalCost: number;
}

interface InfographicProps {
  totalCost: number;
  appliances: Appliance[];
  views: {
    view1: string[];
    view2: string[];
  };
}

const placeholderAnalyses = {
  view1: [
    "and you might be spending ~$14.60 powering inactive appliances that are plugged in 🔌💡",
    "Don't let your money flow away 💸. Turn power off and unplug inactive appliances 🛑🔌.",
  ],
  view2: [
    "your air conditioning ❄️ could be costing you ~$30.00 extra per month",
    "Save energy by setting your air conditioner to 25°C 🌡️ and using fans 🌀 instead when possible.",
  ],
  view3: [
    "leaving your lights 💡 on when not in use could be adding ~$7.20 to your electricity bill",
    "Switch to energy-efficient LED bulbs 💡✅ and always turn off the lights 🔦 when leaving a room.",
  ],
};

const Infographic: React.FC<InfographicProps> = ({ totalCost, appliances, views }) => {
  const [currentView, setCurrentView] = useState("view1");
  const [isAnimating, setIsAnimating] = useState(false);

  //get the total kwh of appliances
  let totalkWh: number = 0;
  appliances.forEach((element) => {
    totalkWh = totalkWh + element.powerUsage * element.frequencyOfUse;
  });

  const changeView = () => {
    setIsAnimating(true);
    const viewKeys = Object.keys(views);
    let newView;
    do {
      newView = viewKeys[Math.floor(Math.random() * viewKeys.length)];
    } while (newView === currentView);

    setTimeout(() => {
      setCurrentView(newView);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-full md:w-96 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-dark-purple mb-2 ">
        You will spend
      </h2>
      <p className="text-4xl font-bold text-dark-purple mb-2">
        ~${totalCost.toFixed(2)}
      </p>
      <p className="text-dark-purple mb-2">({totalkWh.toFixed(2)} kWh)</p>
      {/* <ul>
                {appliances.map((appliance, index) => (
                    <li key={index}>
                        {appliance.appliance} - {appliance.brand} {appliance.model}
                        <br />
                        Power Usage: {appliance.powerUsage} kW
                        <br />
                        Frequency of Use: {appliance.frequencyOfUse} hours/day
                        <br />
                        Number of Appliances: {appliance.numberOfAppliance}
                        <br />
                        Total Cost: ${appliance.totalCost.toFixed(2)}
                    </li>
                ))}
            </ul> */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-lg text-dark-purple mb-4">
          {views[currentView as keyof typeof views][0]}
        </p>
        <p className="text-lg text-dark-purple mb-4">
          {views[currentView as keyof typeof views][1]}
        </p>
      </div>
      <p className="text-dark-purple mb-2">See More Protips?</p>
      <button
        className="bg-dark-purple text-white px-6 py-2 rounded-full transition duration-300"
        onClick={changeView}
      >
        Show Me More
      </button>
    </div>
  );
};

export default Infographic;
