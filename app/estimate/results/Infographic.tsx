import React, { useState, useEffect } from 'react';

interface Appliance {
    appliance: string;
    powerUsage: number;
    brand: string;  // Note: This is 'brand' in localStorage, but we'll map it to 'brandName' in our component
    model: string;
    frequencyOfUse: number;
    numberOfAppliance: number;
    totalCost: number;
}

interface InfographicProps {
    totalCost: number;
    appliances: Appliance[];
}


const Infographic: React.FC<InfographicProps> = ({totalCost, appliances}) => {


    return (
        <div className="h-2/3 w-10/12 bg-white text-black">
            <h1>Appliance Infographic</h1>
            <h1>{totalCost}</h1>
            <ul>
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
            </ul>
        </div>
    );
};

export default Infographic;