"use client";

import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";

const CreateAppliancePage: React.FC = () => {
  const [formData, setFormData] = useState({
    appliance: "",
    brand: "",
    model: "",
    wattage: "",
    frequency: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

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
        const response = await fetch("http://localhost:5000/analyse", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log(data)

        // Assuming API returns a JSON with {appliance, brand, model, Wh}
        if (data) {
          setFormData((prev) => ({
            ...prev,
            appliance: data.appliance || "Unidentified",
            brand: data.brand || "Unidentified",
            model: data.model || "Unidentified",
            wattage: data.Wh || "Unidentified",
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

  const router = useRouter();
  return (
    <div className="font-montserrat bg-purple-100 min-h-screen">
      <Topbar />
      <div className="bg-dark-purple text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ArrowLeft className="mr-4" />
          <h1 className="text-lg font-montserrat flex-grow">
            Create new appliances
          </h1>
        </div>
        <button className="text-sm" type="button" onClick={() => router.push('./estimate')}>
          Save
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-input"
          style={{ display: "none" }}
        />
        
        {/* Button to trigger file upload */}
        <button
          className="w-full py-2 px-4 border border-purple-300 rounded-md flex items-center justify-center text-dark-purple"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Camera className="mr-2" />
          {loading ? "Scanning..." : "Scan label"}
        </button>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-purple mb-1">
              Appliance
            </label>
            <input
              type="text"
              name="appliance"
              placeholder="e.g. Kettle 1.5L"
              className="w-full p-2 border border-purple-200 rounded-md"
              value={formData.appliance}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-purple mb-1">
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              placeholder="Optional"
              className="w-full p-2 border border-purple-200 rounded-md"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-purple mb-1">
              Model
            </label>
            <input
              type="text"
              name="model"
              placeholder="Optional"
              className="w-full p-2 border border-purple-200 rounded-md"
              value={formData.model}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-purple mb-1">
              Power usage
            </label>
            <div className="flex">
              <select className="p-2 border border-purple-200 rounded-l-md bg-white">
                <option>Wattage</option>
              </select>
              <input
                type="text"
                name="wattage"
                placeholder="Enter Watts"
                className="flex-grow p-2 border border-purple-200 rounded-r-md"
                value={formData.wattage}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-purple mb-1">
              Frequency of use (per 30days)
            </label>
            <div className="flex">
              <select className="p-2 border border-purple-200 rounded-l-md bg-white">
                <option>Hour</option>
              </select>
              <input
                type="text"
                name="frequency"
                placeholder="Enter quantity"
                className="flex-grow p-2 border border-purple-200 rounded-r-md"
                value={formData.frequency}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-purple mb-1">
              Number of Appliance
            </label>
            <input
              type="text"
              name="quantity"
              placeholder="Enter quantity"
              className="w-full p-2 border border-purple-200 rounded-md"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppliancePage;