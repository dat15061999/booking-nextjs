export type AuthService = {
  email: string;
  password: string;
};

export type Authenticate = {
  token: string;
};

export type TripHobbies = {
  trip_style_preference: string;
  specific_interests: string[];
  food_preferences: string;
  activity_pace: string;
  transportation_preference_at_destination: string;
  special_considerations: string;
};

export type TravelerAges = {
  adults: string;
  children: string;
};

export type TripInform = {
  start_date: string;
  duration_days: string;
  destination: string;
  traveler_ages: TravelerAges;
  traveler_info: string;
  budget_level: string;
  total_budget_vnd: string;
  accommodation_preference: string;
  otherPlace: string;
};

export interface Activity {
  start_time: string;
  end_time: string;
  activity_name: string;
  description: string;
  category: string;
  image_url: string | null;
  map_link: string | null;
  estimated_cost: string | null;
}

export interface DailyItinerary {
  day: number;
  date: string;
  activities: Activity[];
  daily_summary: string;
}

export interface TripData {
  destination: string;
  duration_days: number;
  daily_itinerary: DailyItinerary[];
}
