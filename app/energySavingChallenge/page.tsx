"use client";
import Head from "next/head";
import Image from "next/image";
import FAQ from "./Faq-Accordian";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
const EnergySavingChallenge: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>OhmSweetOhm Energy Savings Challenge</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta
          property="og:title"
          content="OhmSweetOhm Energy Savings Challenge"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/path/to/image.png" />{" "}
        {/* Adjust the image path */}
        <meta
          property="og:url"
          content="https://mailchi.mp/8c071eea5dc3/yfo9gng51s"
        />
      </Head>
      <Topbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 pb-16">
        <div className="mx-auto  px-4 p-8 md:p-12 rounded-3xl max-w-5xl">
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
                <h1 className="font-medium text-dark-purple">
                  OhmSweetOhm&apos;s
                </h1>
                <h1 className="font-black">Energy Saving Challenge!</h1>
              </div>
              <p className="font-Karla font-semibold">
                17 Nov till 31 Dec 2024
              </p>
              <p className="font-Karla font-semibold">
                Registration closes on 29 Nov, 12pm.
              </p>
              <p className="font-Karla font-thin pb-3">
                Track your energy use with our cost calculator, adopt smarter
                habits, and earn up to $20 NTUC voucher for supporting
                sustainability while saving on your bills! Terms & Conditions
                apply.
              </p>
              <button
                className="rounded-full bg-dark-purple text-white text-sm font-semibold h-14 w-44 md:h-14 md:w-96 font-Karla"
                onClick={() => router.push("/home/")}
              >
                Join now
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto bg-[#FFD761] my-2 px-4 p-8 md:p-12 rounded-3xl max-w-5xl justify-center">
          <h1 className="font-Arvo font-bold text-5xl text-center">
            Save Electricity For What Truly Matters
          </h1>
        </div>
        {/* Challenge stuff*/}
        <div className="mx-auto my-2 px-4 p-8 md:p-12 rounded-3xl max-w-5xl">
          <div className="font-Arvo text-4xl px-0 pb-8 md:pb-10">
            <h1 className="font-bold text-black">What is this challenge?</h1>
          </div>
          <p>OhmSweetOhm is currently in its early stages.</p>
          <p>
             We’re launching this challenge as part of a pilot to gather
            valuable feedback and insights for improving the product. Your
            participation helps shape a tool that empowers more people to save
            energy to protect our planet and of course—reduce our bills!
          </p>
        </div>

        {/* steps */}

        <div className="mx-auto my-2 px-4 p-8 md:p-12 rounded-3xl max-w-5xl">
          <div>
            {/* steps */}
            <div className="mx-auto my-2 px-4 p-8 md:p-12 rounded-3xl max-w-5xl">
              <div className="font-Arvo text-3xl px-0 pb-8 md:pb-10">
                <h1 className="font-bold text-black">How does it work?</h1>
              </div>
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                    <Image
                      src="/account-purple.png"
                      alt="Person interacting with electronic devices"
                      height={200}
                      width={200}
                      className="max-w-[200px]"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-bold">01</span>
                      <div>
                        <p className="mb-4">
                          Sign up and log in to your account between 17-29 Nov
                          2024 and use the cost estimator to get estimates for
                          at least 3 appliances.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          Note: Each household may only participate in this
                          challenge once.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                    <Image
                      src="/track-purple.png"
                      alt="Person interacting with electronic devices"
                      height={200}
                      width={200}
                      className="max-w-[200px]"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-bold">02</span>
                      <div>
                        <p className="mb-4">
                          Take action to reduce your total energy consumption by
                          the next billing cycle.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                          OhmSweetOhm&apos;s calculator will provide you with
                          some tips and recommendations to help you in your
                          energy-saving journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                    <Image
                      src="/bills-purple.png"
                      alt="Person interacting with electronic devices"
                      height={200}
                      width={200}
                      className="max-w-[200px]"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-bold">03</span>
                      <div className="font-Karla ">
                        <p className="">
                          Complete these tasks to qualify for NTUC Vouchers:
                        </p>
                        <ol className="list-decimal list-inside pl-2 text-gray-500">
                          <li>A short mid-point survey</li>
                          <li>
                            A final feedback survey by 12 Jan 2025, 11.59pm
                          </li>
                          <li>
                            Submit your two most recent electricity bills (for
                            the month that has just been billed and previous
                            month) at the end of the challenge to validate your
                            energy-saving success.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*purple box*/}

            <div className="mx-auto bg-[#D5D4FF] my-2 px-4 p-8 md:p-12 rounded-3xl max-w-5xl justify-center">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="column2 w-full md:w-1/2 md:pt-0">
                  <Image
                    src="/discount.png"
                    width={600}
                    height={656}
                    alt="Lady watering plants"
                  ></Image>
                </div>

                <div className="column1 w-full md:w-1/2">
                  <div className="font-Arvo text-3xl px-0 pb-8 md:pb-10">
                    <h1 className="font-black">We celebrate every effort</h1>
                  </div>
                  <ul className="list-disc pl-8 space-y-4 font-Karla">
                    <li className="text-gray-700">
                      <span className="font-bold">$20 NTUC Voucher</span> if you
                      reduce your energy consumption by more than 2% compared to
                      last month&apos;s level.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-bold">$5 NTUC Voucher</span> if you
                      keep your energy usage within a +/-2% range of last
                      month&apos;s level.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="max-auto max-w-5xl my-2 px-4 p-8 md:p-12 justify-center">
            <FAQ />
          </div>

          <div className="mx-auto my-3 px-4 p-8 md:p-12 max-w-5xl">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <h1 className="text-5xl font-extrabold mb-8 font-Arvo ">
                Ready To Start Saving?
              </h1>
              <button
                className="rounded-full bg-dark-purple text-white text-sm font-semibold h-14 w-44 md:h-14 md:w-96 font-Karla"
                onClick={() => {
                  router.push("/home/");
                }}
              >
                Join the challenge now
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

export default EnergySavingChallenge;
