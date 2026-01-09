import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingScreen } from "./LoadingScreen";

export const RouteChangeLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading screen on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay for loading screen

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    // Pass the current path (without leading slash) as page prop
    const page = location.pathname.slice(1) || "home";
    return <LoadingScreen page={page} />;
  }

  return <>{children}</>;
};
