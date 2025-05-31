import { TripHobbies, TripInform } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiService = {
  async submitPrompt(prompt: TripInform & TripHobbies) {
    const raw_request = `Gia đình tôi muốn đi du lịch ${prompt.destination} ${
      prompt.duration_days
    } ngày ${parseInt(prompt.duration_days) - 1} đêm, có ${
      prompt.traveler_ages.children
    } trẻ nhỏ và  ${prompt.traveler_ages.adults} người lớn tuổi.`;

    try {
      const response = await fetch(`${API_URL}/generate_trip_plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params: {
            ...prompt,
            raw_request,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Error submitting prompt:", error);
      throw error;
    }
  },
};
