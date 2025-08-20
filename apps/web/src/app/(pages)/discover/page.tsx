"use client";

import { useState } from "react";
import ResponsiveNavigation from "../../../components/ResponsiveNavBar";
import Footer from "../../../components/ResponsiveFooter";
import ListingCard from "./components/ListingCard";
import ResponsiveContainer from "../../../components/ResponsiveContainer";
import { Map} from "lucide-react";

export default function DiscoverPage() {
  const [query, setQuery] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOption, setSortOption] = useState("relevance");
  const [showMap, setShowMap] = useState(false); 


  const listings = [
    {
      id: 1,
      name: "Cozy Dorm near Ateneo",
      address: "Bagumbayan Sur, Naga City",
      rating: 4.5,
      price: "₱3,500/mo",
      type: "Shared Room",
      photo: "/dorm.jpg",
      badges: ["Accredited", "Available"],
    },
    {
      id: 2,
      name: "Student Hub Dorm",
      address: "Naga Centro",
      rating: 4.8,
      price: "₱4,200/mo",
      type: "Shared Room",
      photo: "/dorm.jpg",
      badges: ["Accredited"],
    },
    {
      id: 3,
      name: "Budget-Friendly Stay",
      address: "Magsaysay Ave.",
      rating: 4.2,
      price: "₱2,800/mo",
      type: "Shared Room",
      photo: "/dorm.jpg",
      badges: ["Accredited"],
    },

    {
      id: 4,
      name: "Sunrise Dormitory",
      address: "J. Hernandez St., Naga City, Camarines Sur",
      rating: 4.8,
      price: "₱3,500/mo",
      type: "Co-ed • Single | Shared",
      photo: "/dorm.jpg",
      badges: ["Accredited", "Available"],
    }

  ];

  // Repeat for layout testing
  const repeatedListings = [...listings, ...listings, ...listings, ...listings];

  // Apply filter based on `searchTerm` 
  let filteredListings = searchTerm
    ? repeatedListings.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : repeatedListings;

    //Sort-based
  filteredListings = [...filteredListings].sort((a, b) => {
    if (sortOption === "priceLow") {
      return (
        parseInt(a.price.replace(/[^\d]/g, "")) -
        parseInt(b.price.replace(/[^\d]/g, ""))
      );
    }
    if (sortOption === "priceHigh") {
      return (
        parseInt(b.price.replace(/[^\d]/g, "")) -
        parseInt(a.price.replace(/[^\d]/g, ""))
      );
    }
    if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0; 
  });


  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveNavigation />

      <ResponsiveContainer maxWidth="7xl" padding="md" className="flex-grow">
        
        <div className="flex w-full mt-6 mb-8 items-center justify-between">
       
          {/* Search Bar */}
          <div className="flex w-full max-w-2xl gap-2">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow pl-4 pr-2 py-2 border border-light_border rounded-l-xl focus:outline-none"
            />
            <button
              className="px-4 bg-dark hover:bg-blue-700 text-white rounded-r-xl"
              onClick={() => setSearchTerm(query)} 
            >
              Search
            </button>
          </div>

          {/* Map Toggle */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors 
                ${showMap 
                  ? "bg-dark text-white border-dark hover:bg-opacity-90" 
                  : "bg-white text-dark border-dark hover:bg-light_border"
                }`}
            >
              <span className="text-sm font-medium">
                {showMap ? "Hide Map" : "Show Map"}
              </span>
               {showMap ? <Map size={18} /> : <Map size={18} />}
            </button>
          </div>
          {/* Floating Map Toggle */}
          <div className="md:hidden fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`p-4 rounded-full shadow-lg border transition-colors ${
                showMap
                  ? "bg-dark text-white border-dark"
                  : "bg-white text-dark border-light_border"
              }`}
            >
              {showMap ? <Map size={24} /> : <Map size={24} />}
            </button>
          </div>

        </div>

        {/* Listings */}
        {filteredListings.length > 0 ? (
        <>

          {/* Results title */}
          {searchTerm && (
            <h2 className="text-lg text-dark font-semibold mb-1 ml-8">
              Search Results for “{searchTerm}”
            </h2>
          )}

          {/* Count & Sort */}
          <div className="flex w-full mt-4 mb-1 items-center justify-between">
            <p className="text-sm text-labelDarkGray">
              Showing {filteredListings.length} space
              {filteredListings.length > 1 ? "s" : ""}
              {searchTerm && <> for “{searchTerm}”</>}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-labelDarkGray">Sort by</span>
              <select
                className="border border-light_border rounded-lg px-2 py-1 text-sm text-labelDarkGray focus:outline-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredListings.map((listing, idx) => (
              <ListingCard key={`${listing.id}-${idx}`} {...listing} />
            ))}
          </div>
            </>
          ) : (
            <div className="text-center text-labelDarkGray mt-20">
              No dorms found for “{searchTerm}”
            </div>
          )}

      </ResponsiveContainer>

      <Footer />
    </div>
  );
}
