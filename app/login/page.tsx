"use client";

import { login, signup } from "./actions";
import { useState } from "react";
import Image from "next/image";
import styles from "./login.module.css";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  async function setLogin(formData: FormData) {
    try {
      await login(formData);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      window.location.reload();
    }
  }

  async function setSignup(formData: FormData) {
    try {
      if (!marketingConsent) {
        setShowConsentError(true);
        return;
      }
      setShowConsentError(false);
      formData.append("marketing_consent", marketingConsent.toString());
      await signup(formData);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      window.location.reload();
    }
  }

  return (
    <>
      <Topbar />
      <section className="login-section flex items-center justify-center min-h-screen">
        <div className="container mx-auto wrapper flex items-center justify-center">
          <div className="row-wrapper w-full flex flex-col items-center">
            <div className="flex flex-col items-center">
              <Image
                src="/sustainable.png"
                alt="OhmSweetOhm Energy Challenge"
                className="img-fluid max-w-full h-auto"
                width={400}
                height={400}
              />
            </div>

            <div className="login-register flex flex-col items-center text-center">
              <div className={styles.imageContainer}>
                <Image
                  src="/logo-mailchimp.png"
                  alt="OhmSweetOhm Energy Challenge"
                  width={200}
                  height={200}
                  className={styles.mainImage}
                />
              </div>
              <div className="card shadow py-4 px-6 w-full max-w-md flex flex-col items-center">
                <div className="my-4 w-full flex" role="tablist">
                  <button
                    className={`flex-1 text-center py-2 ${
                      activeTab === "login"
                        ? "bg-dark-purple text-white"
                        : "text-dark-purple"
                    }`}
                    onClick={() => {
                      setActiveTab("login");
                      setShowConsentError(false);
                    }}
                    role="tab"
                    aria-selected={activeTab === "login"}
                  >
                    Login
                  </button>
                  <button
                    className={`flex-1 text-center py-2 ${
                      activeTab === "register"
                        ? "bg-dark-purple text-white"
                        : "text-dark-purple"
                    }`}
                    onClick={() => {
                      setActiveTab("register");
                      setShowConsentError(false);
                    }}
                    role="tab"
                    aria-selected={activeTab === "register"}
                  >
                    Register
                  </button>
                </div>

                <div className="tab-content w-full">
                  {activeTab === "login" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        setLogin(formData);
                      }}
                      className="w-full"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="loginEmail"
                          className="form-label block text-left text-sm"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="loginEmail"
                          name="email"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="loginPassword"
                          className="form-label block text-left text-sm"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="loginPassword"
                          name="password"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <button type="submit" className={styles.loginButton}>
                        Sign in
                      </button>
                    </form>
                  )}

                  {activeTab === "register" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        setSignup(formData);
                      }}
                      className="w-full"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="firstName"
                          className="form-label block text-left text-sm"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="lastName"
                          className="form-label block text-left text-sm"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="registerEmail"
                          className="form-label block text-left text-sm"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="registerEmail"
                          name="email"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="form-label block text-left text-sm"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your address"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="postcode"
                          className="form-label block text-left text-sm"
                        >
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postcode"
                          name="postcode"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your Postal Code"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="unit"
                          className="form-label block text-left text-sm"
                        >
                          Unit Number
                        </label>
                        <input
                          type="text"
                          id="unit"
                          name="unit"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your Unit Number"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="registerPassword"
                          className="form-label block text-left text-sm"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="registerPassword"
                          name="password"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="registerRepeatPassword"
                          className="form-label block text-left text-sm"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="registerRepeatPassword"
                          name="confirmPassword"
                          className="form-control w-full border border-gray-300 p-2"
                          placeholder="Repeat your password"
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="marketing-consent"
                            checked={marketingConsent}
                            onChange={(e) => {
                              setMarketingConsent(e.target.checked);
                              if (e.target.checked) {
                                setShowConsentError(false);
                              }
                            }}
                            className={`mt-1 h-4 w-4 rounded border-gray-300 text-dark-purple focus:ring-dark-purple cursor-pointer ${
                              showConsentError ? "border-red-500" : ""
                            }`}
                          />
                          <label
                            htmlFor="marketing-consent"
                            className={`text-sm font-Karla cursor-pointer text-left ${
                              showConsentError ? "text-red-500" : ""
                            }`}
                          >
                            I consent to receive emails and notifications
                            regarding OhmSweetOhm's energy saving challenge,
                            products and announcements. I agree to the
                            collection, use, disclosure, and processing of my
                            personal data by OhmSweetOhm for subscription to
                            this mailing list and acknowledge the terms in our{" "}
                            <Link
                              href="/privacy-policy"
                              className={`text-dark-purple hover:text-purple-900 hover:underline ${
                                showConsentError ? "text-red-500" : ""
                              }`}
                            >
                              Privacy Policy
                            </Link>{" "}
                            and confirm that all information provided is
                            accurate and complete.
                          </label>
                        </div>
                        {showConsentError && (
                          <p className="text-red-500 text-sm mt-2 text-left">
                            Please accept the terms and conditions to continue.
                          </p>
                        )}
                      </div>

                      <button type="submit" className={styles.loginButton}>
                        Sign up
                      </button>
                    </form>
                  )}
                </div>
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
        </div>
      </section>
    </>
  );
}
