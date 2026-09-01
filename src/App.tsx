import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Security from "./pages/Security";
import Pricing from "./pages/Pricing";
import JoinCommunity from "./pages/JoinCommunity";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import TrustBadges from "./components/TrustBadges";
import AskMin from "./components/landing/AskMin";

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

/**
 * Restores scroll on navigation, and honours a #hash target.
 *
 * The hash case had two holes and "All your repos" in the footer hit both.
 * Coming from another route, the target section has to mount before it can be
 * found, and a single 60ms timeout either won that race or gave up and sent
 * you to the top of the page, which read as a dead link. And because the
 * effect only watched pathname and hash, clicking a link to the hash you were
 * already on changed no state, so nothing happened at all.
 *
 * Polling on animation frames removes the race, and location.key changes on
 * every navigation, so clicking the same link twice scrolls twice.
 */
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer = 0;
    const find = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // Polling on a timer rather than animation frames: rAF is paused in a
      // hidden tab, so a link opened in the background would never resolve its
      // hash. 40 x 50ms is a comfortable margin over a route mount without
      // stranding the visitor if the id genuinely does not exist.
      if (++tries < 40) timer = window.setTimeout(find, 50);
      else window.scrollTo(0, 0);
    };
    find();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);
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
          <TrustBadges />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/security" element={<Security />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/join-community" element={<JoinCommunity />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AskMin />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
