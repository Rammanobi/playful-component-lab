
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import SleepTracking from "./pages/SleepTracking";
import FoodTracker from "./pages/FoodTracker";
import StressManagement from "./pages/StressManagement";
import SkinCare from "./pages/SkinCare";
import DayDescription from "./pages/DayDescription";
import Storage from "./pages/Storage";
import LogDetails from "./pages/LogDetails";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { isUserLoggedIn } from "./lib/storage/auth";

const queryClient = new QueryClient();

const App = () => {
  const isLoggedIn = isUserLoggedIn();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" closeButton />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/" replace /> : <Login />
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/sleep" element={
              <ProtectedRoute>
                <SleepTracking />
              </ProtectedRoute>
            } />
            <Route path="/food" element={
              <ProtectedRoute>
                <FoodTracker />
              </ProtectedRoute>
            } />
            <Route path="/stress" element={
              <ProtectedRoute>
                <StressManagement />
              </ProtectedRoute>
            } />
            <Route path="/skincare" element={
              <ProtectedRoute>
                <SkinCare />
              </ProtectedRoute>
            } />
            <Route path="/day" element={
              <ProtectedRoute>
                <DayDescription />
              </ProtectedRoute>
            } />
            <Route path="/storage" element={
              <ProtectedRoute>
                <Storage />
              </ProtectedRoute>
            } />
            <Route path="/logs/:type?" element={
              <ProtectedRoute>
                <LogDetails />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
