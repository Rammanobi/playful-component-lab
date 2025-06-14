
-- Add missing RLS policies for all data tables
-- First, ensure RLS is enabled on all tables
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skincare_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.day_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Sleep logs policies
CREATE POLICY "Users can view own sleep logs" ON public.sleep_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sleep logs" ON public.sleep_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sleep logs" ON public.sleep_logs
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sleep logs" ON public.sleep_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Meal logs policies
CREATE POLICY "Users can view own meal logs" ON public.meal_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meal logs" ON public.meal_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meal logs" ON public.meal_logs
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own meal logs" ON public.meal_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Stress logs policies
CREATE POLICY "Users can view own stress logs" ON public.stress_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stress logs" ON public.stress_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stress logs" ON public.stress_logs
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own stress logs" ON public.stress_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Skincare logs policies
CREATE POLICY "Users can view own skincare logs" ON public.skincare_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skincare logs" ON public.skincare_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skincare logs" ON public.skincare_logs
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skincare logs" ON public.skincare_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Day descriptions policies
CREATE POLICY "Users can view own day descriptions" ON public.day_descriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own day descriptions" ON public.day_descriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own day descriptions" ON public.day_descriptions
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own day descriptions" ON public.day_descriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Make user_id columns NOT NULL for data integrity
ALTER TABLE public.sleep_logs ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.meal_logs ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.stress_logs ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.skincare_logs ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.day_descriptions ALTER COLUMN user_id SET NOT NULL;

-- Create or replace function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
