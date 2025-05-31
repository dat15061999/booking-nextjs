import { create } from "zustand/react";
import { TripData, TripInform, TripHobbies, DailyItinerary } from "./types";
import { apiService } from "./apiService";

export interface PROMPT_AI {
  loading: boolean;
  data: TripData;
  handleSubmitPrompt: (trip: TripInform, hobbies: TripHobbies) => Promise<void>;
  updateDailyItinerary: (
    dayNumber: number,
    updatedData: DailyItinerary
  ) => void;
}

export const usePromptToAI = create<PROMPT_AI>((set) => ({
  loading: false,
  data: {
    destination: "",
    duration_days: 0,
    daily_itinerary: [],
  },
  handleSubmitPrompt: async (trip: TripInform, hobbies: TripHobbies) => {
    try {
      set({ loading: true });
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
}));
