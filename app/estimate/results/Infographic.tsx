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
  view4: [
    "your washing machine 🧺 usage may account for ~$12.50 a month",
    "Try washing with cold water ❄️ and only run full loads 🏡 to cut down on energy use.",
  ],
  view5: [
    "your entertainment devices like TVs 📺 and gaming consoles 🎮 are contributing ~$9.80 to your monthly bill",
    "Unplug these devices when not in use 🔌 or invest in smart plugs 📱 to cut power.",
  ],
  view6: [
    "your fridge 🧊 might be using ~$25.40 a month if it's an older model",
    "Consider upgrading 🆕 to an energy-efficient refrigerator and keep it at the optimal temperature of 4°C 🌡️.",
  ],
};

const Infographic: React.FC<InfographicProps> = ({ totalCost, appliances }) => {
  const [currentView, setCurrentView] = useState("view1");
  const [isAnimating, setIsAnimating] = useState(false);

  //get the total kwh of appliances
  let totalkWh: number = 0;
  appliances.forEach((element) => {
    totalkWh = totalkWh + element.powerUsage * element.frequencyOfUse;
  });

  const changeView = () => {
    setIsAnimating(true);
    const views = Object.keys(placeholderAnalyses);
    let newView;
    do {
      newView = views[Math.floor(Math.random() * views.length)];
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
      <p className="text-dark-purple mb-2">({totalkWh} kWh)</p>
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
        <p className="text-lg text-dark-purple mb-4 font-bold">
          {
            placeholderAnalyses[
              currentView as keyof typeof placeholderAnalyses
            ][0]
          }
        </p>
        <p className="text-lg text-dark-purple mb-6 font-bold">
          {
            placeholderAnalyses[
              currentView as keyof typeof placeholderAnalyses
            ][1]
          }
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
