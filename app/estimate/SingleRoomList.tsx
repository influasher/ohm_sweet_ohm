import React from 'react';
import { ArrowLeft, MoreVertical, Save} from "lucide-react";
import Topbar from "@/components/Topbar";
import Link from 'next/link';

const SingleRoomList = () => {
  return (
    <>
          <div className=" pt-8 px-4 pb-1.5">
        <div className="flex justify-between text-xl font-Montserrat text-black font-bold"> 
          <h1>Room Name</h1>
          <h1>$total</h1>
        </div>
        <p className="font-Montserrat text-sm text-black pt-3">92.58kwh a month</p>
      </div>
        <div className="border border-light-purple"> </div>

      <div className=" py-2 px-4 flex justify-between">
       <div className=" text-lg font-Montserrat text-black font-semibold"> 
          <h1>Item one</h1>
          <h1>$27</h1>
        </div>
        <p className="font-Montserrat text-sm text-black pt-1 content-center">1kwh a month</p>
      </div>
        <div className="border border-light-purple"> </div>
 

      <div className=" py-2 px-4 flex justify-between">
       <div className=" text-lg font-Montserrat text-black font-semibold"> 
          <h1>Item 2</h1>
          <h1>$27</h1>
        </div>
        <p className="font-Montserrat text-sm text-black pt-1 content-center">1kwh a month</p>
      </div>
        <div className="border border-light-purple"> </div>
 
    <div className='px-4 pt-2 pb-8'>
    <Link href='home/' className="font-Montserrat text-dark-purple">ADD APPLIANCE</Link>
    </div>
        <div className="border border-light-purple"> </div>


  </>
  );
}

export default SingleRoomList;
