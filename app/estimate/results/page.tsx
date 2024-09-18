"use client";
import React from "react";
import { ArrowLeft, MoreVertical, Share2, CirclePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import SingleRoomList from "../SingleRoomList";
import Infographic from "@/app/estimate/results/Infographic";
import Breakdown from "@/app/estimate/results/Breakdown";


const estimateResults = () => {
    return (
        <div className="bg-white min-h-screen font-Montserrat">
            <Topbar />
            <div className="bg-dark-purple text-white p-4 flex items-center">
                <ArrowLeft className="mr-4" />
                <h1 className="text-lg font-montserrat flex-grow">Estimate bills - Results</h1>
                <div className="flex">
                    <Share2 className="mr-3" />
                    <MoreVertical />
                </div>
            </div>
            <div className="py-[300px] w-full flex items-center justify-center border border-black">
                <Infographic/>
            </div>
            <div>
                <Breakdown/>
            </div>

        </div>
    );
};

export default estimateResults;