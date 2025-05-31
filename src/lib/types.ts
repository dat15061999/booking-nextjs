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
  duration_days: number;
  destination: string;
  traveler_ages: TravelerAges;
  traveler_info: string;
  budget_level: string;
  total_budget_vnd: string;
  accommodation_preference: string;
  otherPlace: string;
};

export interface Activity {
  id?: number;
  start_time: string;
  end_time: string | null;
  activity_name: string;
  description: string;
  category: string;
  image_url: string | null;
  map_link: string | null;
  estimated_cost: string | null;
}

export interface DailyItinerary {
  id?: number;
  day: number;
  date: string | null;
  activities: Activity[];
  daily_summary: string;
  weather_forecast_for_day?: WeatherForecast;
}

export interface TripData {
  destination: string;
  duration_days: number;
  daily_itinerary: DailyItinerary[];
}

export interface WeatherForecast {
  condition: string;
  min_temp_celsius: number;
  max_temp_celsius: number;
  description: string;
  impact_on_activities: string;
}

export interface Customer {
  id: number | boolean;
  name: string | boolean;
}

export interface TripPlan {
  id: number;
  name: string;
  destination: string;
  duration_days: number;
  customer: Customer;
  itineraries: DailyItinerary[];
}

export interface TripListResponseData {
  trip_plans: TripPlan[];
}

export interface ApiResponseMeta {
  status: boolean;
  message: string;
  status_code: number;
}

export interface TripListResponse {
  meta: ApiResponseMeta;
  data: TripListResponseData;
}