"use client";
import React from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Topbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold mb-8 font-Arvo ">
              Powering Smart Savings For Every Home!
            </h1>

            <p className="font-medium font-Karla pb-4">
              Understanding your home&apos;s energy use, reduce waste, and
              save-with ease.
            </p>
            <button
              className="rounded-full bg-dark-purple text-white text-sm font-semibold px-8 py-2 font-Karla"
              onClick={() => {
                router.push("/home/");
              }}
            >
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
          <div className="container mx-auto  px-4 bg-light-purple p-8 md:p-12 rounded-3xl max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="column1 w-full md:w-1/2">
                <div className="font-Arvo md:text-5xl text-2xl px-0 pb-8 md:pb-10">
                  <h1 className="font-[500]">What is </h1>
                  <h1 className="font-black">OhmSweetOhm?</h1>
                </div>
                <p className="font-Karla font-thin pb-3">
                  OhmSweetOhm is a web-based cost calculator that estimates the
                  energy costs of your home appliances—no extra devices or
                  installations needed beyond your mobile phone or computer!{" "}
                </p>

                <p className="font-Karla font-thin pt-2">
                  With actionable insights, OhmSweetOhm empowers you to make
                  smart choices to reduce energy use and save on your bills.
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

          {/*Second green box*/}

          <div className="mx-auto my-5 px-4 bg-[#BEF1C9] p-8 md:p-12 rounded-3xl max-w-5xl">
            <div>
              <h1 className="font-Arvo mb-8 text-4xl font-bold">
                How does it work?
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-stretch justify-evenly gap-6">
              {/*three columns here*/}
              <div className="col1 bg-white md:w-1/3 items-center rounded-xl p-6 flex flex-col text-center">
                <div className="bg-gray-500 size-40 "> image here</div>
                <div className="font-Arvo text-xl font-semibold m-3">
                  <h1>Simple Setup</h1>
                </div>
                <p className="text-black">
                  Input appliance details or snap a picture of a household
                  appliance or its specifications label—no additional hardware
                  needed.
                </p>
                {/*2nd columns here*/}
              </div>
              <div className="col2 bg-white md:w-1/3 items-center rounded-xl p-6 flex flex-col text-center">
                <div className="bg-gray-500 size-40 "> image here</div>
                <div className="font-Arvo text-xl font-semibold m-3">
                  <h1>Personalised Insights</h1>
                </div>
                <p className="text-black">
                  Input appliance details or snap a picture of a household
                  appliance or its specifications label—no additional hardware
                  needed.
                </p>
              </div>
              {/*third columns here*/}
              <div className="col3 bg-white md:w-1/3 items-center rounded-xl p-6 flex flex-col text-center">
                <div className="bg-gray-500 size-40 "> image here</div>
                <div className="font-Arvo text-xl font-semibold m-3">
                  <h1>Actionable Recommendations</h1>
                </div>
                <p className="text-black">
                  Input appliance details or snap a picture of a household
                  appliance or its specifications label—no additional hardware
                  needed.
                </p>
              </div>
            </div>
          </div>

          {/*Third yellow box*/}
          <div className="mx-auto my-2 px-4 bg-[#FFD761] p-8 md:p-12 rounded-3xl max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="column2 w-full md:w-1/2 md:pt-0">
                <Image
                  src="/sustainable.png"
                  width={600}
                  height={656}
                  alt="Lady watering plants"
                ></Image>
              </div>

              <div className="column1 w-full md:w-1/2">
                <div className="font-Arvo text-5xl px-0 pb-8 md:pb-10">
                  <h1 className="font-black">Save Energy</h1>
                  <h1 className="font-black">And Earn</h1>
                  <h1 className="font-black">NTUC Vouchers!</h1>
                </div>
                <p className="font-Karla font-semibold">
                  From 15 Nov till 31 Dec 2024  Registration closes on 29 Nov,
                  12pm.
                </p>
                <p className="font-Karla font-thin pb-3">
                  Join us in making Singapore a greener, more resilient place!
                  Take part in our energy-saving challenge and share your
                  feedback to help us make an even greater impact.
                </p>
                <button
                  className="rounded-full bg-dark-purple text-white text-sm font-semibold px-9 w-80 py-2 font-Karla"
                  onClick={() => {
                    router.push("/energySavingChallenge");
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto my-3 px-4 p-8 md:p-12 max-w-5xl">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <h1 className="text-5xl font-extrabold mb-8 font-Arvo ">
                Ready To Start Saving?
              </h1>
              <button
                className="rounded-full bg-dark-purple text-white text-sm font-semibold px-8 py-2 font-Karla"
                onClick={() => {
                  router.push("/home/");
                }}
              >
                Get started for free
              </button>
            </div>

            <div className="border-2 rounded-xl border-dark-purple text-center text-sm mx-auto mt-20">
              <div className="font-Karla p-3 m-3">
                This product was developed by citizen participants of{" "}
                <a
                  href="https://build.gov.sg"
                  className="font-semibold text-purple-700 hover:text-purple-900 hover:underline"
                >
                  Build For Good 2024
                </a>{" "}
                – a hackathon organised by{" "}
                <a
                  href="https://open.gov.sg"
                  className="font-semibold text-purple-700 hover:text-purple-900 hover:underline"
                >
                  Open Government Products
                </a>
                , in collaboration with{" "}
                <a
                  href="https://www.sgpo.gov.sg"
                  className="font-semibold text-purple-700 hover:text-purple-900 hover:underline"
                >
                  Singapore Government Partnerships Office
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
