import React, { useState, useMemo } from "react";
import { Appliance } from "@/types/appliance";

type ViewKey = "view1" | "view2";

interface Views {
  [key: string]: string[];
}

interface InfographicProps {
  totalCost: number;
  appliances: Appliance[];
  views: Views;
}

const Infographic: React.FC<InfographicProps> = ({
  totalCost,
  appliances,
  views,
}) => {
  const [currentView, setCurrentView] = useState<ViewKey>("view1");
  const [isAnimating, setIsAnimating] = useState(false);

  const totalkWh = useMemo(
    () =>
      appliances.reduce(
        (sum, appliance) =>
          sum + appliance.powerUsage * appliance.frequencyOfUse,
        0
      ),
    [appliances]
  );

  const changeView = () => {
    setIsAnimating(true);
    const viewKeys = Object.keys(views) as ViewKey[];
    if (viewKeys.length > 0) {
      let newView: ViewKey;
      do {
        newView = viewKeys[Math.floor(Math.random() * viewKeys.length)];
      } while (newView === currentView && viewKeys.length > 1);

      setTimeout(() => {
        setCurrentView(newView);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white w-full md:w-96 max-w-md mx-auto text-left">
      <h2 className="text-2xl font-bold text-dark mb-2">
        Monthly Cost Estimates
      </h2>
      <p>Bill Estimate</p>
      <p className="text-2xl text-dark-purple mb-2">${totalCost.toFixed(2)}</p>
      <p>Energy Expenditure</p>
      <p className="text-dark-purple mb-2 text-2xl">
        {totalkWh.toFixed(2)} kWh
      </p>
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <p>Energy Saving Tips</p>

        <p className="text-lg text-dark-purple mb-4 font-bold">
          {views[currentView]?.[0] || "Loading..."}
        </p>
        <p className="text-lg text-dark-purple mb-4">
          {views[currentView]?.[1] || ""}
        </p>
      </div>
      <p className="text-dark-purple mb-2 text-center">See More Protips?</p>
      <button
        className="block bg-dark-purple text-white px-6 py-2 rounded-full transition duration-300 text-center mx-auto"
        onClick={changeView}
        disabled={Object.keys(views).length === 0}
      >
        Show Me More
      </button>
    </div>
  );
};

export default Infographic;
