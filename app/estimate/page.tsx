"use client";
import React from "react";
import { ArrowLeft, MoreVertical, Save, CirclePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import SingleRoomList from "./SingleRoomList";
import {useRouter} from 'next/navigation';
import SearchBar from "@/app/estimate/SearchBar";


const AddAppliancePage = () => {
    let newUser: boolean = true
    type Appliance = {
        appliance: string;
        powerUsage: number;
        brandName: string;
        model: string;
        frequencyOfUse: number;
        numberOfAppliance: number;
    }

    //data processing function
    function parseData(jsonData: any): Appliance[] {
        return jsonData.map((item: any) => ({
            appliance: item.appliance,
            powerUsage: Number(item.powerUsage),
            brandName: item.brandName,
            model: item.model,
            frequencyOfUse: Number(item.frequencyOfUse),
            numberOfAppliance: Number(item.numberOfAppliance),
        }));
    }

    const storedData = localStorage.getItem('storedData')
    if (storedData) {
        newUser = false;
        const parsedData = JSON.parse(storedData);
        let dataSet : Appliance[] =  parseData(parsedData);
    }
    const router = useRouter();
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
      <SingleRoomList />
        <div className="justify-center items-center flex text-dark-purple py-3"> <CirclePlus/> <div className="pl-1 font-semibold"> Add Room</div> </div>
        <div className="pt-5 pb-3 justify-center flex items-center">
        <button className="border bg-dark-purple py-1.5 rounded-full w-11/12 text-white" onClick={() => router.push('estimate/results/')} >Calculate Bills</button>
        </div>
        <div className="text-dark-purple font-normal text-sm mx-4">
            Calculation is based on 30days/month and tariff rates of $0.31/kWh, based on rates in Jul – Sep 2024. Tariff rates are updated every quarter.
        </div>
    </div>
  );
};

export default AddAppliancePage;
