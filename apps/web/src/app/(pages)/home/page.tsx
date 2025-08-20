"use client";

import ResponsiveNavigation from '../../../components/ResponsiveNavBar';
import Footer from '../../../components/ResponsiveFooter';
import ListingCard from './components/ListingCard';
import { Search } from "lucide-react";
import ResponsiveGrid from '../../../components/ResponsiveGrid';


const listings = [
  {
    name: "Sunrise Dormitory",
    address: "J. Hernandez St., Naga City, Camarines Sur",
    rating: 4.8,
    price: "₱3,500/mo",
    type: "Co-ed • Single | Shared",
    photo: "/dorm.jpg",
    badges: ["Accredited", "Available"],
  },

  {
    name: "Sunrise Dormitory",
    address: "J. Hernandez St., Naga City, Camarines Sur",
    rating: 4.8,
    price: "₱3,500/mo",
    type: "Co-ed • Single | Shared",
    photo: "/dorm.jpg",
    badges: ["Accredited", "Available"],
  },

   {
    name: "Sunrise Dormitory",
    address: "J. Hernandez St., Naga City, Camarines Sur",
    rating: 4.8,
    price: "₱3,500/mo",
    type: "Co-ed • Single | Shared",
    photo: "/dorm.jpg",
    badges: ["Accredited", "Available"],
  },

   {
    name: "Sunrise Dormitory",
    address: "J. Hernandez St., Naga City, Camarines Sur",
    rating: 4.8,
    price: "₱3,500/mo",
    type: "Co-ed • Single | Shared",
    photo: "/dorm.jpg",
    badges: ["Accredited", "Available"],
  },

];


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation at the top */}
      <ResponsiveNavigation />

      {/* Main content area, flex-grow fills remaining height */}
      <div className="flex flex-col flex-grow items-center justify-center px-4 py-10 bg-white">
        <div className="w-full max-w-7xl mx-auto text-center">
          {/* Heading */}
          <h1 className="font-montserrat font-semibold text-dark leading-tight mb-4 
                        text-[3.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem]">
            Dormer?
          </h1>

          {/* Subtext */}
          <p className="text-labelDarkGray mb-8 text-sm sm:text-base md:text-lg">
            Delve into our dormitory listings to find the perfect space for your needs.
            <br/>
            Search now for available dormitories.
          </p>

          {/* Search Bar */}
          <div className="flex w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto h-auto mb-6 gap-2 px-2">
            <input
              type="text"
              placeholder="Search dorm or location..."
              className="flex-grow pl-4 pr-2 py-2 sm:pl-6 sm:pr-4 sm:py-3 
                        border border-dark bg-white rounded-l-[1.25rem] 
                        focus:outline-none text-sm sm:text-base"
            />
            <button
              className="flex items-center justify-center px-4 sm:px-6 
                        bg-[#2254C5] hover:bg-blue-700 text-white 
                        rounded-r-[1.25rem]"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="w-full max-w-[90rem] mx-auto px-4 py-6 sm:px-8"> 
          {/* Section Title */}
          <h2 className="text-2xl sm:text-2xl font-semibold text-dark ml-4 mb-4">
            Popular & Available
          </h2>

          {/* Grid of listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map((listing, idx) => (
            <ListingCard key={idx} {...listing} />
          ))}
        </div>
          
        </div>

      </div>

      <Footer />
    </div>
  );
}
