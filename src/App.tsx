import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import Index from "./pages/Index";
import FreightBrokers from "./pages/FreightBrokers";
import Shippers from "./pages/Shippers";
import ThirdPartyLogistics from "./pages/ThirdPartyLogistics";
import Distributors from "./pages/Distributors";
import Operations from "./pages/teams/Operations";
import Sales from "./pages/teams/Sales";
import ProjectManagement from "./pages/teams/ProjectManagement";
import Features from "./pages/Features";
import FollowUps from "./pages/features/FollowUps";
import Alerts from "./pages/features/Alerts";
import Contacts from "./pages/features/Contacts";
import Tasks from "./pages/features/Tasks";
import Email from "./pages/features/Email";
import Instructions from "./pages/features/Instructions";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Security from "./pages/Security";
import JoinCommunity from "./pages/JoinCommunity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PostHogPageView() {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog) {
      posthog.capture('$pageview');
    }
  }, [location, posthog]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PostHogPageView />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/brokers" element={<FreightBrokers />} />
            <Route path="/shippers" element={<Shippers />} />
            <Route path="/3pl" element={<ThirdPartyLogistics />} />
            <Route path="/distributors" element={<Distributors />} />
            <Route path="/teams/operations" element={<Operations />} />
            <Route path="/teams/sales" element={<Sales />} />
            <Route path="/teams/project-management" element={<ProjectManagement />} />
            <Route path="/features" element={<Features />} />
            <Route path="/features/follow-ups" element={<FollowUps />} />
            <Route path="/features/alerts" element={<Alerts />} />
            <Route path="/features/contacts" element={<Contacts />} />
            <Route path="/features/tasks" element={<Tasks />} />
            <Route path="/features/email" element={<Email />} />
            <Route path="/features/instructions" element={<Instructions />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/security" element={<Security />} />
            <Route path="/join-community" element={<JoinCommunity />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
