
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import SleepTracking from "./pages/SleepTracking";
import FoodTracker from "./pages/FoodTracker";
import StressManagement from "./pages/StressManagement";
import SkinCare from "./pages/SkinCare";
import DayDescription from "./pages/DayDescription";
import Storage from "./pages/Storage";
import LogDetails from "./pages/LogDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sleep" element={<SleepTracking />} />
          <Route path="/food" element={<FoodTracker />} />
          <Route path="/stress" element={<StressManagement />} />
          <Route path="/skincare" element={<SkinCare />} />
          <Route path="/day" element={<DayDescription />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/logs/:type?" element={<LogDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
