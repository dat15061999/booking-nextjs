import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="bg-gradient-to-br from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1] py-60 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-12 text-center">
          What People Say About Us
        </h2>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300">
          <div className="relative">
            <svg
              className="absolute -top-4 -left-4 w-8 h-8 text-blue-500 opacity-50"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-lg md:text-xl italic text-gray-700 mb-6 leading-relaxed">
              On the Windows talking painted pasture yet its express parties
              use. Sure last upon he same as knew next. Of believed or diverted
              no.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
              MT
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Mike Taylor</h4>
              <p className="text-gray-600">Lahore, Pakistan</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h5 className="font-medium text-gray-700">Chris Thomas</h5>
            <p className="text-gray-500">CEO of Red Button</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
