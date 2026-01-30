-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Create a more secure policy that still allows public booking
-- but validates that the tour and date exist
CREATE POLICY "Public users can create valid bookings"
ON public.bookings FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.available_dates ad
    JOIN public.tours t ON t.id = ad.tour_id
    WHERE ad.id = available_date_id
    AND t.id = tour_id
    AND t.is_active = true
    AND ad.spots_available > 0
  )
);