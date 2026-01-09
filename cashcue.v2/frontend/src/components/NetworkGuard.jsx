import React, { useEffect, useState } from "react";
import OfflineScreen from "./OfflineScreen";

const NetworkGuard = ({ children }) => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Function to update online status
    const updateOnlineStatus = () => {
      setOnline(navigator.onLine);
    };

    // Event handlers
    const handleOnline = () => {
      updateOnlineStatus();
    };
    const handleOffline = () => {
      updateOnlineStatus();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateOnlineStatus();
      }
    };

    // Initial check on mount
    updateOnlineStatus();

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!online) {
    return <OfflineScreen />;
  }

  return <>{children}</>;
};

export default NetworkGuard;
