export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  languages: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Tour {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number;
  duration_hours: number;
  location: string | null;
  max_participants: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface AvailableDate {
  id: string;
  tour_id: string;
  date: string;
  start_time: string;
  spots_available: number;
  created_at: string;
}

export interface Booking {
  id: string;
  tour_id: string;
  available_date_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  participants: number;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface TourWithDates extends Tour {
  available_dates: AvailableDate[];
}

export interface BookingWithDetails extends Booking {
  tour: Tour;
  available_date: AvailableDate;
}
