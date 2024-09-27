"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";
type Appliance = {
  appliance: string;
  power_usage: number;
  brand: string;
  model: string;
  frequency_of_use: number;
  number_of_appliance: number;
  total_cost: number;
};
const CreateAppliancePage: React.FC = () => {
  const [formData, setFormData] = useState({
    appliance: "",
    powerUsage: "",
    brand: "",
    model: "",
  });
  const [power_usageType, setPower_usageType] = useState("watts");

  const [loading, setLoading] = useState(false);

  const [voltage, setVoltage] = useState<number>();

  const [current, setCurrent] = useState<number>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setLoading(true);

      // Prepare the form data to send to the API
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("http://localhost:5000/scan", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log(data);

        // Assuming API returns a JSON with {appliance, brand, model, Wh}
        if (data) {
          setFormData((prev) => ({
            ...prev,
            appliance: data.appliance || "Unidentified",
            brand: data.brand || "Unidentified",
            model: data.model || "Unidentified",
            power_usage: data.power_usage || "Unidentified",
          }));
        } else {
          alert("Could not extract data from the image.");
        }
      } catch (error) {
        console.error("Error scanning the label:", error);
        alert("An error occurred while scanning the label.");
      } finally {
        setLoading(false);
      }
    }
  };

  //use effect to handle update in local storage
  const [localData, setLocalData] = useState<Appliance[]>([]);
  useEffect(() => {
    const data = localStorage.getItem("storedData");
    if (data) {
      const parsedData = JSON.parse(data);
      setLocalData(parsedData);
    }
  }, []);

  const router = useRouter();
  return (
    <div className="font-montserrat bg-white min-h-screen">
      <Topbar />
      <div className="bg-dark-purple text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ArrowLeft className="mr-4" onClick={() => router.back()} />
          <h1 className="text-lg font-montserrat flex-grow">
            Enter Product Details
          </h1>
        </div>
        <button
          className="text-sm"
          type="button"
          onClick={() => {
            setFormData((prevFormData) => {
              const updatedFormData = { ...prevFormData };

              if (power_usageType === "watts") {
                updatedFormData.power_usage =
                  Number(prevFormData.power_usage) / 1000;
              } else if (power_usageType == "voltage_current") {
                updatedFormData.power_usage = (voltage * current) / 1000;
              }

              console.log(updatedFormData);

              const dataToSave = localData.concat(updatedFormData);
              localStorage.setItem("storedData", JSON.stringify(dataToSave));

              // Move the router.push here if you want it to happen after the state update
              router.push("./estimate");

              return updatedFormData;
            });
          }}
        >
          Next
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          id="file-input"
          style={{ display: "none" }}
        />

        {/* Button to trigger file upload */}
        <button
          className="w-full py-3 px-4 border border-purple-900 rounded-md flex items-center justify-center text-dark-purple"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Camera className="mr-2" />
          {loading ? "Scanning..." : "Scan Appliance"}
        </button>

        <div className="space-y-4">
          <div className="border border-gray-300 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Appliance
                </label>
                <span className="text-xs text-gray-500">
                  (e.g. Kettle 1.5L)
                </span>
              </div>
              <input
                type="text"
                name="appliance"
                placeholder="Describe Appliance"
                className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                value={formData.appliance}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Power Usage
                </label>
                {/* <span className="text-xs text-gray-500">Wattage (W)</span> */}
                <select
                  name=""
                  id=""
                  className="text-xs text-gray-500 mt-1"
                  value={power_usageType}
                  onChange={(e) => {
                    setPower_usageType(e.target.value);
                    console.log(power_usageType);
                  }}
                >
                  <option value="watts">Watts (W)</option>
                  <option value="kiloWatts">kiloWatts (kW)</option>
                  <option value="voltage_current">
                    Voltage (V) + Current (A)
                  </option>
                </select>
              </div>
              {/* <input
                type="text"
                name="power_usage"
                placeholder="Enter Watts"
                className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                value={formData.power_usage}
                onChange={handleInputChange}
              /> */}
              {power_usageType == "watts" ? (
                <input
                  type="text"
                  name="power_usage"
                  placeholder="Enter Watts"
                  className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                  value={formData.power_usage}
                  onChange={handleInputChange}
                />
              ) : power_usageType == "kiloWatts" ? (
                <input
                  type="text"
                  name="power_usage"
                  placeholder="Enter kiloWatts"
                  className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                  value={formData.power_usage}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex flex-col">
                  <input
                    type="number"
                    name="voltage"
                    placeholder="Enter Volts"
                    className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    name="current"
                    placeholder="Enter Amps"
                    className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                    value={current}
                    onChange={(e) => setCurrent(Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Brand Name
                </label>
              </div>
              <input
                type="text"
                name="brand"
                placeholder="Optional"
                className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-3 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Model
                </label>
              </div>
              <input
                type="text"
                name="model"
                placeholder="Optional"
                className="text-right text-dark-purple placeholder-dark-purple focus:outline-none"
                value={formData.model}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppliancePage;