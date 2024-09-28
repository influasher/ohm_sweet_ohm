import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import Image from 'next/image'
import kettlePic from './model_kettle.png'

const ScanningLabelInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <span onClick={handleTogglePopup} className="cursor-pointer">
        Where to find the specification label?
      </span>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleTogglePopup}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md mx-auto">
              <button
                onClick={handleTogglePopup}
                className="absolute top-2 right-2 text-xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-dark-purple">
                Specification Label Information
              </h2>
              <div className="bg-purple-100 rounded-lg p-3 mb-4 flex items-start">
                <AlertTriangle
                  className="text-yellow-500 mr-2 flex-shrink-0"
                  size={24}
                />
                <p className="text-dark-purple">
                  Make sure the <strong>Wattage (W)</strong> or{" "}
                  <strong>Voltage (V) + Current (A)</strong> is clearly visible.
                </p>
              </div>
              <p className="font-bold text-dark-purple">
                Product Specifications are usually found:
              </p>
              <ol className="list-decimal list-inside text-dark-purple">
                <li>On the side, back, or bottom of the appliance</li>
                <li>Inside doors of refrigerators</li>
                <li>In user manuals and online catalogues</li>
              </ol>
              {/* Image is bugging out, tofix */}
              <Image
                src={kettlePic}
                width={500}
                height={500}
                alt="product label on bottom of kettle"
                className="mt-4 rounded-lg"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScanningLabelInfo;
