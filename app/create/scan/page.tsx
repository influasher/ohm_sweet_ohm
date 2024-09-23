"use client";
import React, { useState } from "react";
import { ArrowLeft, Camera, Info, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import ScanningLabelInfo from "./ScanningLabelInfo";

const ScanApplianceLabelPage = () => {
  const router = useRouter();
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newMedia = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedMedia([...selectedMedia, ...newMedia]);
    }
  };

  return (
    <div className="font-montserrat bg-white min-h-screen">
      <Topbar />
      {/* Header */}
      <div className="bg-dark-purple text-white p-4 flex items-center">
        <ArrowLeft className="mr-4" onClick={() => router.back()} />
        <h1 className="text-lg font-montserrat flex-grow">
          Scan appliance label
        </h1>
      </div>

      {/* Main content */}
      <div className="p-4">
        <div className="bg-purple-100 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <Camera className="text-dark-purple mr-2 flex-shrink-0 mt-1" />
            <p className="text-dark-purple flex-grow">
              Snap a photo of the appliance or its specifications label.
            </p>
          </div>
          <a href="#" className="text-blue-500 flex items-center mt-2">
            {/* <Info className="mr-1" size={16} />
            Where to find the specification label? */}
            <ScanningLabelInfo />
          </a>
        </div>

        {/* Recent section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold flex items-center">
              Recent <ChevronDown className="ml-1" size={20} />
            </h2>
            <div>
              <label className="mr-2">
                <Camera className="text-gray-600" />
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Display selected media */}
          <div className="grid grid-cols-3 gap-2">
            {selectedMedia.map((mediaSrc, index) => (
              <div key={index}>
                {mediaSrc.includes("video") ? (
                  <video
                    src={mediaSrc}
                    controls
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanApplianceLabelPage;
