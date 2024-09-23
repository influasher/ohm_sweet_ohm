"use client";
import React from "react";
import SearchBar from "@/app/estimate/SearchBar";
import Topbar from "@/components/Topbar";
import {ArrowLeft, MoreVertical, Save} from "lucide-react";

const SelectCreateType = () => {
    return (
        <div className="bg-white h-screen font-Montserrat">
            <Topbar />
            <div className="bg-dark-purple text-white p-4 flex items-center">
                <ArrowLeft className="mr-4" />
                <h1 className="text-lg font-montserrat flex-grow">Estimate bills</h1>
                <div className="flex">
                    <Save className="mr-3" />
                    <MoreVertical />
                </div>
            </div>

            <div className="py-7 px-3">
                <SearchBar/>
            </div>
        </div>
    );
}

export default SelectCreateType;