import React from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="w-full bg-gray-50 border-t border-gray-200">
      <div className="flex justify-between items-end">
        <Image
          src="/logo-mailchimp.png"
          height={200}
          width={200}
          alt="OSO Logo"
          className="mx-3 pt-3"
        ></Image>
        <a
          href="https://instagram.com/ohmsweetohm_sg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-800 px-6"
        >
          <Instagram size={30} />
        </a>
      </div>
      <div className="w-full mx-0 px-3 font-Karla ">
        <div className="flex flex-col md:flex-row justify-between items-start py-4">
          {/* Logo and links */}
          <div className="flex flex-col md:flex-row items-center  gap-4 md:gap-8 pb-2">
            {/* Logo */}
            {/* Navigation links */}
            <div className="flex gap-4 text-sm text-black">
              <Link href="/termsOfUse" className="hover:text-gray-800">
                TERMS OF USE
              </Link>
              <span className="text-black">|</span>
              <Link href="/privacyPolicy" className="hover:text-gray-800">
                PRIVACY POLICY
              </Link>
              <span className="text-black">|</span>
              <Link href="/contact" className="hover:text-gray-800">
                CONTACT US
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-black">
              © 2024 OhmSweetOhm. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
