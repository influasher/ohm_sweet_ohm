"use client";
import React from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-8 font-Arvo ">
          Powering Smart Savings For Every Home!
        </h1>

        <p className="font-medium font-Karla pb-4">
          Understanding your home&apos;s energy use, reduce waste, and save-with
          ease.
        </p>
        <button className="rounded-full bg-dark-purple text-white text-sm font-semibold px-8 py-2 font-Karla">
          Get started for free
        </button>
        <p className="p-3 font-Karla font-xs">See how it works</p>
        <div className="grid place-items-center">
          <ArrowDown
            className="text-black"
            absoluteStrokeWidth={true}
            size={48}
          />
        </div>
      </div>
      {/*First purple box*/}
      <div className="container mx-auto px-4 bg-light-purple p-8 md:p-12 rounded-3xl max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="column1 w-full md:w-1/2">
            <div className="font-Arvo text-5xl px-0 pb-8 md:pb-10">
              <h1 className="font-[500]">What is </h1>
              <h1 className="font-black">OhmSweetOhm?</h1>
            </div>
            <p className="font-Karla font-thin pb-3">
              OhmSweetOhm is a web-based cost calculator that estimates the
              energy costs of your home appliances—no extra devices or
              installations needed beyond your mobile phone or computer!{" "}
            </p>

            <p className="font-Karla font-thin pt-2">
              With actionable insights, OhmSweetOhm empowers you to make smart
              choices to reduce energy use and save on your bills.
            </p>
            <p className="font-Karla font-semibold">
              Best of all, it&apos;s completely free to use!
            </p>
          </div>
          <div className="column2 w-full md:w-1/2 md:pt-0">
            <Image
              src="/lp-software-img-1.png"
              width={600}
              height={656}
              alt="Image of phone"
            ></Image>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
