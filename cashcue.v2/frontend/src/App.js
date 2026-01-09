import React, { lazy, Suspense } from "react";
import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingHireButton } from "./components/FloatingHireButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoadingScreen } from "./components/LoadingScreen";
import { RouteChangeLoader } from "./components/RouteChangeLoader";
import NetworkGuard from "./components/NetworkGuard";

const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const Services = lazy(() => import("./pages/Services").then(module => ({ default: module.Services })));
const Portfolio = lazy(() => import("./pages/Portfolio").then(module => ({ default: module.Portfolio })));
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const Contact = lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));
const AIWaitlist = lazy(() => import("./pages/AIWaitlist").then(module => ({ default: module.AIWaitlist })));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingScreen page="home" />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<LoadingScreen page="services" />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<LoadingScreen page="portfolio" />}>
              <Portfolio />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<LoadingScreen page="about" />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<LoadingScreen page="contact" />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/ai-waitlist"
          element={
            <Suspense fallback={<LoadingScreen page="ai-waitlist" />}>
              <AIWaitlist />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop />
        <Header />
        <main>
          <NetworkGuard>
            <RouteChangeLoader>
              <AnimatedRoutes />
            </RouteChangeLoader>
          </NetworkGuard>
        </main>
        <Footer />
        <FloatingHireButton />
      </HashRouter>
    </div>
  );
}

export default App;