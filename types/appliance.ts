

export type Appliance = {
    appliance: string;
    powerUsage: number;
    brand: string; // Note: This is 'brand' in localStorage, but we'll map it to 'brandName' in our component
    model: string;
    frequencyOfUse: number;
    numberOfAppliance: number;
    totalCost: number;
    monthlyNationalAverage?: number;
};

export type ApplianceList = Appliance[];