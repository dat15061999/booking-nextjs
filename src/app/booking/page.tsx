"use client";

import { useState } from 'react';
import { TripInform, TripHobbies } from '@/lib/types';
import TripInformPage from '@/components/TripInform';
import TripHobbiesPage from '@/components/TripHobbies';
import { usePromptToAI } from '@/lib/callAI';
import Link from 'next/link';
import TripCard from '@/components/TripCard';

export default function BookingPage() {
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

    const { handleSubmitPrompt, loading, data, updateDailyItinerary, createTrip, creating } = usePromptToAI();

    const isTripValid = () => {
        if (currentShow === "1") {
            return (
                trip.destination &&
                trip.start_date &&
                trip.traveler_ages.adults &&
                trip.traveler_info &&
                trip.budget_level &&
                trip.total_budget_vnd &&
                trip.accommodation_preference &&
                trip.duration_days > 0
            );
        } else if (currentShow === "2") {
            return (
                hobbies.trip_style_preference && hobbies.specific_interests.length > 0
            );
        }
        return false;
    };

    return (
        <main className="min-h-screen flex flex-col text-gray-900 font-sans bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-md py-4 text-center text-white font-bold tracking-wider select-none shadow-lg border-b border-white/20">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        Tạo chuyến đi
                    </div>
                    <div className="flex gap-8">
                        <Link
                            href="/"
                            className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
                        >
                            Home
                        </Link>
                        <Link
                            href="/trips"
                            className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
                        >
                            4F Odyssey
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

            <div className="container mx-auto px-4 pt-24 pb-12">
                {data.daily_itinerary?.length === 0 && (
                    <div className="relative mb-8">
                        <div className="absolute top-2 left-0 w-full h-2 bg-gray-200 rounded overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                                style={{ width: currentShow === "1" ? "50%" : "100%" }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-8">
                            <div>
                                <div className={`text-center ${currentShow === "1" ? "font-bold text-blue-600" : ""}`}>
                                    Trip Information
                                </div>
                            </div>
                            <div>
                                <div className={`text-center ${currentShow === "2" ? "font-bold text-blue-600" : ""}`}>
                                    Preferences & Interests
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
                    {currentShow === "1" && (
                        <TripInformPage
                            trip={trip}
                            onUpdate={(newTrip) => {
                                // Ensure duration_days is a number
                                if (typeof newTrip.duration_days === 'string') {
                                    newTrip.duration_days = parseInt(newTrip.duration_days) || 0;
                                }
                                setTrip(newTrip);
                            }}
                        />
                    )}

                    {currentShow === "2" && (
                        <TripHobbiesPage preferences={hobbies} onUpdate={setHobbies} />
                    )}

                    <div className="mt-6">
                        {data.daily_itinerary?.length === 0 && (
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => {
                                        const currentPage = parseInt(currentShow);
                                        if (currentPage > 1) {
                                            setCurrentShow(String(currentPage - 1));
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-lg ${currentShow === "1"
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                                        } transition-all duration-300`}
                                    disabled={currentShow === "1"}
                                >
                                    Previous
                                </button>
                                {currentShow === "1" ? (
                                    <button
                                        onClick={() => setCurrentShow("2")}
                                        className={`px-4 py-2 rounded-lg ${!isTripValid()
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                                            } transition-all duration-300`}
                                        disabled={!isTripValid()}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={async () => {
                                            if (isTripValid()) {
                                                await handleSubmitPrompt(trip, hobbies);
                                            }
                                        }}
                                        className={`px-4 py-2 rounded-lg ${!isTripValid()
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                                            } transition-all duration-300`}
                                        disabled={!isTripValid() || loading}
                                    >
                                        {loading ? "Generating Trip Plan..." : "Generate Trip"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {data.daily_itinerary?.length > 0 && (
                    <div className="mt-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">
                                Generated Trip Plan
                            </h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentShow("1")}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                                >
                                    Edit Plan
                                </button>
                                <button
                                    onClick={createTrip}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                                    disabled={creating}
                                >
                                    {creating ? "Saving Trip..." : "Save Trip"}
                                </button>
                            </div>
                        </div>
                        {data.daily_itinerary.map((day) => (
                            <TripCard
                                key={day.day}
                                tripData={day}
                                onClick={() => { }}
                                onUpdate={(dayNumber, updatedData) => {
                                    updateDailyItinerary(updatedData.day, updatedData);
                                }}
                                isCollapsible={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
