import { TripData, TripHobbies, TripInform, TripListResponse } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiService = {
  async submitPrompt(prompt: TripInform & TripHobbies) {
    // Convert duration_days to a number and ensure it's valid
    const durationDays = prompt.duration_days;

    // Create the raw request string based on the presence of children
    let raw_request = `Gia đình tôi muốn đi du lịch ${prompt.destination} ${durationDays} ngày ${durationDays - 1} đêm`;

    // Only include children in the request if they exist and are not zero
    const childrenCount = parseInt(prompt.traveler_ages.children || "0");
    if (childrenCount > 0) {
      raw_request += `, có ${prompt.traveler_ages.children} trẻ nhỏ và ${prompt.traveler_ages.adults} người lớn tuổi`;
    } else {
      raw_request += `, có ${prompt.traveler_ages.adults} người lớn tuổi`;
    }

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

  async createTrip(tripData: TripData) {
    try {
      const response = await fetch(`${API_URL}/api/trip_plan/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          params: {
            trip_plan: tripData
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating trip:", error);
      throw error;
    }
  },

  async listTrips(): Promise<TripListResponse> {
    try {
      const response = await fetch(`${API_URL}/api/trip_plan/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params: {
            user_id: 2
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      return jsonResponse.result; // Extract the 'result' from the JSON-RPC response
    } catch (error) {
      console.error("Error listing trips:", error);
      throw error;
    }
  },

  async deleteTrip(tripId: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/api/trip_plan/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params: {
            trip_id: tripId
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const result = jsonResponse.result;

      return {
        success: result.meta.status,
        message: result.meta.message
      };
    } catch (error) {
      console.error("Error deleting trip:", error);
      throw error;
    }
  },
};
