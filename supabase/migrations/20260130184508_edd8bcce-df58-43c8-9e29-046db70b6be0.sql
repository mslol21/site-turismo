-- Create profiles table for guide information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  languages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tours table
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  duration_hours DECIMAL(4,1) NOT NULL DEFAULT 1,
  location TEXT,
  max_participants INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create available_dates table for tour availability
CREATE TABLE public.available_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  spots_available INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE NOT NULL,
  available_date_id UUID REFERENCES public.available_dates(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  participants INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.available_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Tours policies (public read, owner write)
CREATE POLICY "Active tours are viewable by everyone"
ON public.tours FOR SELECT
USING (is_active = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert own tours"
ON public.tours FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tours"
ON public.tours FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tours"
ON public.tours FOR DELETE
USING (auth.uid() = user_id);

-- Available dates policies
CREATE POLICY "Available dates are viewable by everyone"
ON public.available_dates FOR SELECT
USING (true);

CREATE POLICY "Tour owners can manage dates"
ON public.available_dates FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.tours WHERE id = tour_id AND user_id = auth.uid()));

CREATE POLICY "Tour owners can update dates"
ON public.available_dates FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.tours WHERE id = tour_id AND user_id = auth.uid()));

CREATE POLICY "Tour owners can delete dates"
ON public.available_dates FOR DELETE
USING (EXISTS (SELECT 1 FROM public.tours WHERE id = tour_id AND user_id = auth.uid()));

-- Bookings policies
CREATE POLICY "Anyone can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Tour owners can view their bookings"
ON public.bookings FOR SELECT
USING (EXISTS (SELECT 1 FROM public.tours WHERE id = tour_id AND user_id = auth.uid()));

CREATE POLICY "Tour owners can update bookings"
ON public.bookings FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.tours WHERE id = tour_id AND user_id = auth.uid()));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tours_updated_at
BEFORE UPDATE ON public.tours
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Novo Guia'), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();