"use client";

import Login from "@/app/login/page";
import { useState } from "react";
import Link from "next/link";
import TripInformPage, { TripInform } from "@/components/TripInform";
import TripHobbiesPage, { TripHobbies } from "@/components/TripHobbies";
import { apiService } from "@/lib/apiService";
import { log } from "console";
import { usePromptToAI } from "@/lib/callAI";
import About from "@/components/About";
import Destinations from "@/components/Destinations";
import TripCard from "@/components/TripCard";

export default function Home() {
  const [token, setToken] = useState("");
  const [currentShow, setCurrentShow] = useState("1");

  // if (!token) {
  //     return <Login setToken={setToken} />;
  // }

  const [trip, setTrip] = useState<TripInform>({
    start_date: "",
    destination: "",
    duration_days: "",
    traveler_ages: {
      adults: "",
      children: "",
    },
    traveler_info: "",
    budget_level: "",
    total_budget_vnd: "",
    accommodation_preference: "",
    otherPlace: "",
  });

  const [hobbies, setHobbies] = useState<TripHobbies>({
    trip_style_preference: "",
    specific_interests: [],
    food_preferences: "",
    activity_pace: "",
    transportation_preference_at_destination: "",
    special_considerations: "",
  });

  const isTripValid = () => {
    if (currentShow === "1") {
      return (
        trip.destination &&
        trip.start_date &&
        trip.traveler_ages.adults &&
        trip.total_budget_vnd &&
        trip.accommodation_preference
      );
    } else if (currentShow === "2") {
      return (
        hobbies.trip_style_preference && hobbies.specific_interests.length > 0
      );
    }
    return false;
  };

  const { handleSubmitPrompt, loading, data, updateDailyItinerary } =
    usePromptToAI();

  return (
    <main
      id="home"
      className="min-h-screen flex flex-col text-gray-900 font-sans"
    >
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-md py-4 text-center text-white font-bold tracking-wider select-none shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Trips
          </div>
          <div className="flex gap-8">
            <Link
              href="#home"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              Home
            </Link>
            <Link
              href="#destinations"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              Destinations
            </Link>
            <Link
              href="#about"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div
          className="flex-grow px-20 py-40 bg-cover bg-center w-full"
          style={{
            backgroundImage:
              "url(https://cdn1.ivivu.com/images/2024/11/05/12/=utf-8BQmFubmVyIFRvcCBWw6kgVnVpIGNoxqFpNCAoMTkyMHg1MTMpICgxKS5wbmdfMC5wbmc==_.webp)",
          }}
        >
          <div className="container mx-auto">
            <h1 className="text-5xl font-extrabold my-4">
              Đi đi, <span className="text-orange-500">tận hưởng</span> cuộc
              sống mới <br />
              <span className="text-blue-800">trọn vẹn</span>
            </h1>

            <div className="bg-white/1 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 ">
              {currentShow === "1" && (
                <TripInformPage trip={trip} onUpdate={setTrip} />
              )}

              {currentShow === "2" && (
                <TripHobbiesPage preferences={hobbies} onUpdate={setHobbies} />
              )}

              <div className="mt-6">
                {data.daily_itinerary.length === 0 && (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        const currentPage = parseInt(currentShow);
                        if (currentPage > 1) {
                          setCurrentShow(String(currentPage - 1));
                        }
                      }}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium text-lg"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        const currentPage = parseInt(currentShow);
                        const totalPages = 3;
                        if (currentPage < totalPages) {
                          if (!isTripValid()) {
                            alert(
                              "Please fill in all required fields before proceeding"
                            );
                            return;
                          }
                          if (currentPage === 2) {
                            handleSubmitPrompt(trip, hobbies);
                          }
                          setCurrentShow(String(currentPage + 1));
                        }
                      }}
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? "Loading..."
                        : parseInt(currentShow) === 2
                        ? "Finish"
                        : "Next"}
                    </button>
                  </div>
                )}

                {data.daily_itinerary.length > 0 && (
                  <div className="flex flex-col gap-4 container mx-auto">
                    {data.daily_itinerary.map((day, index) => (
                      <TripCard
                        key={index}
                        tripData={day}
                        onClick={() => {}}
                        onUpdate={(dayNumber, updatedData) => {
                          updateDailyItinerary(dayNumber, updatedData);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Destinations />
        <About />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 text-indigo-200 text-center py-6 select-none bg-black/30 backdrop-blur-sm border-t border-white/10">
        <p className="text-lg font-medium">
          © 2024 TourBooker. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
