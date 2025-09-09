-- Clean up duplicate RLS policies for day_descriptions table
DROP POLICY IF EXISTS "Users can delete their own day descriptions" ON public.day_descriptions;
DROP POLICY IF EXISTS "Users can insert their own day descriptions" ON public.day_descriptions;
DROP POLICY IF EXISTS "Users can update their own day descriptions" ON public.day_descriptions;
DROP POLICY IF EXISTS "Users can view their own day descriptions" ON public.day_descriptions;

-- Clean up duplicate RLS policies for meal_logs table
DROP POLICY IF EXISTS "Users can delete their own meal logs" ON public.meal_logs;
DROP POLICY IF EXISTS "Users can insert their own meal logs" ON public.meal_logs;
DROP POLICY IF EXISTS "Users can update their own meal logs" ON public.meal_logs;
DROP POLICY IF EXISTS "Users can view their own meal logs" ON public.meal_logs;

-- Keep the cleaner, more consistent policies that use auth.uid() = user_id pattern
-- These policies already exist and are the ones we want to keep:
-- - "Users can delete own day descriptions"  
-- - "Users can insert own day descriptions"
-- - "Users can update own day descriptions" 
-- - "Users can view own day descriptions"
-- - "Users can manage their own day descriptions"

-- - "Users can delete own meal logs"
-- - "Users can insert own meal logs" 
-- - "Users can update own meal logs"
-- - "Users can view own meal logs"
-- - "Users can manage their own meal logs"