
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import SleepTracking from "./pages/SleepTracking";
import FoodTracker from "./pages/FoodTracker";
import StressManagement from "./pages/StressManagement";
import SkinCare from "./pages/SkinCare";
import DayDescription from "./pages/DayDescription";
import Storage from "./pages/Storage";
import LogDetails from "./pages/LogDetails.jsx";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import SupabaseProtectedRoute from "./components/auth/SupabaseProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" closeButton />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/" element={
                <SupabaseProtectedRoute>
                  <Index />
                </SupabaseProtectedRoute>
              } />
              <Route path="/sleep" element={
                <SupabaseProtectedRoute>
                  <SleepTracking />
                </SupabaseProtectedRoute>
              } />
              <Route path="/food" element={
                <SupabaseProtectedRoute>
                  <FoodTracker />
                </SupabaseProtectedRoute>
              } />
              <Route path="/stress" element={
                <SupabaseProtectedRoute>
                  <StressManagement />
                </SupabaseProtectedRoute>
              } />
              <Route path="/skincare" element={
                <SupabaseProtectedRoute>
                  <SkinCare />
                </SupabaseProtectedRoute>
              } />
              <Route path="/day" element={
                <SupabaseProtectedRoute>
                  <DayDescription />
                </SupabaseProtectedRoute>
              } />
              <Route path="/storage" element={
                <SupabaseProtectedRoute>
                  <Storage />
                </SupabaseProtectedRoute>
              } />
              <Route path="/logs/:type?" element={
                <SupabaseProtectedRoute>
                  <LogDetails />
                </SupabaseProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
