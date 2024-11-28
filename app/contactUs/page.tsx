import React from "react";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-grow w-full max-w-4xl mx-auto p-8 bg-white">
        <h1 className="text-6xl font-bold text-center text-gray-800 mb-16">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Envelope SVG Illustration */}
          <div className="w-128 h-128 relative">
            <Image
              width={600}
              height={600}
              alt="Envelope"
              src={"/contact.png"}
            ></Image>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl font-semibold text-gray-700 mb-2">
                For general enquiries and feedback
              </h2>
              <a
                href="mailto:hello@ohmsweetohm.sg"
                className="flex text-xl items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@ohmsweetohm.sg
              </a>
            </div>

            <div>
              <h2 className="text-4xl font-semibold text-gray-700 mb-2">
                Connect with us!
              </h2>
              <a
                href="https://instagram.com/ohmsweetohm_sg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-xl items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                ohmsweetohm_sg
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
