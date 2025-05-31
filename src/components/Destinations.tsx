// src/Destinations.js
import Image from "next/image";
import React from "react";

const destinations = [
  {
    name: "Hà Nội",
    price: "$5,42k",
    tripDuration: "10 Days Trip",
    image:
      "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1000&auto=format&fit=crop", // Using Unsplash image
  },
  {
    name: "Thành phố Hồ Chí Minh",
    price: "$4.2k",
    tripDuration: "12 Days Trip",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1000&auto=format&fit=crop", // Using Unsplash image
  },
  {
    name: "Đà Nẵng",
    price: "$15k",
    tripDuration: "28 Days Trip",
    image:
      "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=1000&auto=format&fit=crop", // Using Unsplash image
  },
];

const Destinations = () => {
  return (
    <div id="destinations" className="py-60 bg-gradient-to-br from-[#89f7fe] via-[#66a6ff] to-[#4a6bff]">
      <div className="text-center mb-12">
        <h6 className="text-gray-600 font-medium">Top Destinations</h6>
        <h1 className="text-4xl md:text-5xl py-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Top Selling
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  width={400}
                  height={500}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {destination.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-blue-600">
                    {destination.price}
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {destination.tripDuration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
