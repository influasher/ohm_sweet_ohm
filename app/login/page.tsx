"use client";

import { login, signup } from "./actions";
import { useState } from "react";
import Image from "next/image"; // Or 'react' if not using Next.js
import styles from "./login.module.css";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");

  async function setLogin(formData: FormData) {
    try {
      // Call the login function with formData
      await login(formData);
    } catch (error) {
      // Display an alert with the error message
      if (error instanceof Error) {
        alert(error.message);
      } else {
        // Handle other types of errors (if any)
        alert("An unexpected error occurred. Please try again.");
      }
      // Refresh the page after the user clicks OK
      window.location.reload();
    }
  }

  async function setSignup(formData: FormData) {
    try {
      // Call the login function with formData
      await signup(formData);
    } catch (error) {
      // Display an alert with the error message
      if (error instanceof Error) {
        alert(error.message);
      } else {
        // Handle other types of errors (if any)
        alert("An unexpected error occurred. Please try again.");
      }
      // Refresh the page after the user clicks OK
      window.location.reload();
    }
  }

  return (
    <section className="login-section flex items-center justify-center min-h-screen">
      <div className="container mx-auto wrapper flex items-center justify-center">
        <div className="row-wrapper w-full flex flex-col items-center">
          {/* Optional Image */}
          <div className="flex flex-col items-center">
            <Image
              src="/sustainable.png" // Adjust the path to your local image file
              alt="OhmSweetOhm Energy Challenge"
              className="img-fluid max-w-full h-auto"
              width={400}
              height={400}
            />
          </div>

          {/* Login and Register Forms */}
          <div className="login-register flex flex-col items-center text-center">
            <div className={styles.imageContainer}>
              <Image
                src="/logo-mailchimp.png" // Local path to the uploaded image
                alt="OhmSweetOhm Energy Challenge"
                width={200}
                height={200}
                className={styles.mainImage}
              />
            </div>{" "}
            <div className="card shadow py-4 px-6 w-full max-w-md flex flex-col items-center">
              {/* Tabs for Login and Register */}
              <div className="my-4 w-full flex" role="tablist">
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === "login"
                      ? "bg-dark-purple text-white"
                      : "text-dark-purple"
                  }`}
                  onClick={() => setActiveTab("login")}
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
                  onClick={() => setActiveTab("register")}
                  role="tab"
                  aria-selected={activeTab === "register"}
                >
                  Register
                </button>
              </div>
              {/* End of Tabs */}

              {/* Tab Content */}
              <div className="tab-content w-full">
                {/* Login Form */}
                {activeTab === "login" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent the default form submission
                      const formData = new FormData(e.currentTarget);
                      setLogin(formData); // Call setLogin with the form data
                    }}
                    className="w-full"
                  >
                    {" "}
                    {/* Email input */}
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
                    {/* Password input */}
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
                    {/* Submit button */}
                    <button type="submit" className={styles.loginButton}>
                      Sign in
                    </button>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === "register" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent the default form submission
                      const formData = new FormData(e.currentTarget);
                      setSignup(formData); // Call setSignup with the form data
                    }}
                    className="w-full"
                  >
                    {" "}
                    {/* First Name input */}
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
                    {/* Last Name input */}
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
                    {/* Email input */}
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
                    {/* Address input */}
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
                    {/* Password input */}
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
                    {/* Repeat Password input */}
                    <div className="mb-4">
                      <label
                        htmlFor="registerRepeatPassword"
                        className="form-label block text-left text-sm"
                      >
                        Repeat Password
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
                    {/* Submit button */}
                    <button type="submit" className={styles.loginButton}>
                      Sign up
                    </button>
                  </form>
                )}
              </div>
              {/* End of Tab Content */}
            </div>
            {/* End of Card */}
          </div>
        </div>
      </div>
    </section>
  );
}
// import { login, signup } from './actions'

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }
