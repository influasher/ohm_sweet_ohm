import React from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

const PromoBanner = ({ onClose }: Props) => {
  return (
    <div className="bg-dark-purple px-2 py-2 ">
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-start mx-auto">
          <div className="flex items-start space-x-2 font-Montserrat pr-8">
            <div className="w-3 h-3 bg-white rounded-full flex-shrink-0 flex items-center justify-center mt-1">
              <div className="w-1.5 h-1.5 bg-dark-purple rounded-full" />
            </div>
            <div className="text-white flex flex-col text-sm">
              <span className="font-semibold leading-tight">
                ENERGY SAVING CHALLENGE: REGISTER BY 29 NOV 2024
              </span>
              <div className="flex flex-wrap items-center">
                <span className="leading-tight">
                  Earn NTUC Vouchers While Saving Energy!
                </span>
                <a
                  href="/energySavingChallenge"
                  className="underline ml-2 hover:text-purple-200"
                >
                  Learn more »
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 p-1 absolute right-2 top-2"
              aria-label="Close banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
