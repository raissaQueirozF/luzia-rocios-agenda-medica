
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";
import Appointments from "./pages/appointments/Appointments";
import NewAppointment from "./pages/appointments/NewAppointment";
import Doctors from "./pages/doctors/Doctors";
import Services from "./pages/services/Services";
import AboutUs from "./pages/about/AboutUs";
import Contact from "./pages/contact/Contact";
import FAQ from "./pages/faq/FAQ";
import NotFound from "./pages/NotFound";
import { RequireAuth } from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Protected routes */}
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/appointments" element={<RequireAuth><Appointments /></RequireAuth>} />
            <Route path="/appointments/new" element={<RequireAuth><NewAppointment /></RequireAuth>} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
