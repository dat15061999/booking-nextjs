import { create } from "zustand/react";
import { TripData, TripInform, TripHobbies, DailyItinerary } from "./types";
import { apiService } from "./apiService";

export interface PROMPT_AI {
  loading: boolean;
  saving: boolean;
  creating: boolean;
  data: TripData;
  userPreferences: (TripInform & TripHobbies) | null;
  handleSubmitPrompt: (trip: TripInform, hobbies: TripHobbies) => Promise<void>;
  createTrip: () => Promise<void>;
  updateDailyItinerary: (
    dayNumber: number,
    updatedData: DailyItinerary
  ) => void;
}

export const usePromptToAI = create<PROMPT_AI>((set, get) => ({
  loading: false,
  saving: false,
  creating: false,
  data: {
    destination: "",
    duration_days: 0,
    daily_itinerary: [],
  },
  userPreferences: null,
  handleSubmitPrompt: async (trip: TripInform, hobbies: TripHobbies) => {
    try {
      set({ loading: true, userPreferences: { ...trip, ...hobbies } });
      const response = await apiService.submitPrompt({ ...trip, ...hobbies });

      // Check response status and get data
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get response data
      const responseData = await response.json();

      // Log response details for debugging
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );
      console.log("Response data:", responseData);

      set({ data: responseData?.result?.data?.trip_plan, loading: false });
    } catch (error) {
      console.error("Error submitting prompt:", error);
      alert("Failed to generate trip plan. Please try again.");
      set({ loading: false });
    }
  },
  updateDailyItinerary: (dayNumber: number, updatedData: DailyItinerary) => {
    set((state) => ({
      data: {
        ...state.data,
        daily_itinerary: state.data.daily_itinerary.map((day) =>
          day.day === dayNumber ? updatedData : day
        ),
      },
    }));
  },
  createTrip: async () => {
    const state = get();
    if (state.data.daily_itinerary.length === 0) {
      alert('No trip data to create');
      return;
    }

    try {
      set({ creating: true });
      const result = await apiService.createTrip(state.data);
      alert('Trip created successfully!');
      set({ creating: false });
      // Navigate to /trips page
      window.location.href = '/trips';
      return result;
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to create trip. Please try again.');
      set({ creating: false });
    }
  }
}));
