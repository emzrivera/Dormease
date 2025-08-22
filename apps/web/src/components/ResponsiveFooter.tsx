import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import ResponsiveContainer from "./ResponsiveContainer";
import ResponsiveImage from "./ResponsiveImage";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-12">
      <ResponsiveContainer padding="lg">

        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between py-10 items-center md:items-start">

          <div className="flex flex-col items-center md:items-start space-y-3 text-center">
            {/* Logo */}
            <Link href='/home' className="flex-shrink-0">
              <ResponsiveImage
                src="/dormease-logo-ondark.svg"
                alt="Dormease Logo"
                width={120}
                height={40}
                className="h-5 w-auto"
              />
            </Link>
       

            {/* Tagline */}
            <p className="text-sm text-white">Find your dorm with ease.</p>

            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              <Link href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors">
                <FaFacebookF className="text-dark" />
              </Link>
              <Link href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors">
                <FaEnvelope className="text-dark" />
              </Link>
              <Link href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors">
                <FaInstagram className="text-dark" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
         <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-2 text-center text-sm md:text-right md:ml-auto w-full md:w-auto mt-8 md:mt-0">
          <Link href="#" className="hover:underline">About Us</Link>
          <Link href="#" className="hover:underline">Contact</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Terms of Service</Link>
        </div>



        </div>

        {/* Thin line */}
        <div className="border-t border-white"></div>

        {/* Copyright */}
        <div className="py-4 text-center text-white text-sm">
          © 2025 Dormease. All rights reserved.
        </div>

      </ResponsiveContainer>
    </footer>
  );
}
