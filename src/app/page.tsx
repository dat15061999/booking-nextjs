"use client";

import { useState } from "react";
import Link from "next/link";
import TripInformPage from "@/components/TripInform";
import TripHobbiesPage from "@/components/TripHobbies";
import type { TripInform, TripHobbies } from "@/lib/types";
import { usePromptToAI } from "@/lib/callAI";
import About from "@/components/About";
import Destinations from "@/components/Destinations";
import TripCard from "@/components/TripCard";

export default function Home() {
  const [currentShow, setCurrentShow] = useState("1");

  const [trip, setTrip] = useState<TripInform>({
    start_date: "",
    destination: "",
    duration_days: 0,
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

  const { handleSubmitPrompt, loading, data = { daily_itinerary: [], destination: "", duration_days: 0 }, updateDailyItinerary, saving, createTrip, creating } = usePromptToAI();

  const isTripValid = () => {
    if (currentShow === "1") {
      return (
        trip.destination &&
        trip.start_date &&
        trip.traveler_ages.adults &&
        trip.total_budget_vnd &&
        trip.accommodation_preference &&
        trip.duration_days
      );
    } else if (currentShow === "2") {
      return (
        hobbies.trip_style_preference && hobbies.specific_interests.length > 0
      );
    }
    return false;
  };

  return (
    <main
      id="home"
      className="min-h-screen flex flex-col text-gray-900 font-sans"
    >
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-md py-4 text-center text-white font-bold tracking-wider select-none shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            4F Odyssey
          </div>
          <div className="flex gap-8">
            <Link
              href="#home"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              Trang Chủ
            </Link>
            <Link
              href="/trips"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              Chuyến đi của tôi
            </Link>
            <Link
              href="#destinations"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              Điểm Đến
            </Link>
            <Link
              href="#about"
              className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
            >
              Giới Thiệu
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

            {data.daily_itinerary?.length === 0 && (
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentShow === "1" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} font-bold transition-colors duration-300`}>
                      1
                    </div>
                    <div className={`w-16 h-1 ${parseInt(currentShow) > 1 ? "bg-blue-600" : "bg-gray-300"} transition-colors duration-300`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentShow === "2" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} font-bold transition-colors duration-300`}>
                      2
                    </div>
                    <div className={`w-16 h-1 ${parseInt(currentShow) > 2 ? "bg-blue-600" : "bg-gray-300"} transition-colors duration-300`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentShow === "3" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} font-bold transition-colors duration-300`}>
                      3
                    </div>
                  </div>
                  <div className="flex justify-center w-full px-1">
                    <div className="grid grid-cols-3 gap-x-5 text-sm text-gray-600 w-full max-w-sm">
                      <div className={`text-center ${currentShow === "1" ? "font-bold text-blue-600" : ""}`}>Thông tin chuyến đi</div>
                      <div className={`text-center ${currentShow === "2" ? "font-bold text-blue-600" : ""}`}>Sở thích</div>
                      <div className={`text-center ${currentShow === "3" ? "font-bold text-blue-600" : ""}`}>Lịch trình</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      Quay lại
                    </button>
                    <button
                      onClick={() => {
                        const currentPage = parseInt(currentShow);
                        const totalPages = 3;
                        if (currentPage < totalPages) {
                          if (!isTripValid()) {
                            alert(
                              "Vui lòng điền đầy đủ thông tin trước khi tiếp tục nhé!"
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
                          ? "Hoàn thành"
                          : "Tiếp theo"}
                    </button>
                  </div>
                )}

                {data.daily_itinerary.length > 0 && (
                  <div className="flex flex-col gap-4 container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-1">Thông tin chuyến đi:</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <p><span className="font-medium">Điểm đến:</span> {data.destination || trip.destination}</p>
                          <p><span className="font-medium">Thời gian:</span> {data.duration_days || trip.duration_days} ngày</p>
                          <p><span className="font-medium">Số người:</span> {parseInt(trip.traveler_ages.adults) + parseInt(trip.traveler_ages.children || "0")} người ({trip.traveler_ages.adults} người lớn, {trip.traveler_ages.children || "0"} trẻ em)</p>
                          <p><span className="font-medium">Ngân sách:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(trip.total_budget_vnd))}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={createTrip}
                          disabled={saving || data.daily_itinerary.length === 0}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {saving ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang lưu...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                              </svg>
                              Lưu chuyến đi
                            </>
                          )}
                        </button>
                        <button
                          onClick={createTrip}
                          disabled={creating || data.daily_itinerary.length === 0}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {creating ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang tạo...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Tạo chuyến đi
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    {data.daily_itinerary.map((day, index) => (
                      <TripCard
                        key={index}
                        tripData={day}
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

      <footer className="bottom-0 left-0 right-0 text-indigo-200 text-center py-2 select-none bg-black/30 backdrop-blur-sm border-t border-white/10">
        <p className="text-lg font-medium">
          © 2025 4F Odyssey. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
