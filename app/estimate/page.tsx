import React from 'react';
import { ArrowLeft, MoreVertical, Save} from "lucide-react";
import Topbar from "@/components/Topbar";
import Link from 'next/link';
import SingleRoomList from './SingleRoomList.tsx'

const addAppliancePage = () => {
  return (
    <div className="bg-white h-screen">
    <Topbar/>
    <div className="bg-dark-purple text-white p-4 flex items-center">
        <ArrowLeft className="mr-4" />
        <h1 className="text-lg font-montserrat flex-grow">
          Estimate bills
        </h1>
        <div className="flex">
        <Save className="mr-3"/>
        <MoreVertical />
        </div>
      </div>
    <SingleRoomList/>
    </div>
  )
}

export default addAppliancePage;
