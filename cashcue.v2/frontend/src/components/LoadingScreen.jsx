import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const animationUrls = {
  // all animations disabled to avoid runtime errors due to splinecode loading issues
  // home: "https://prod.spline.design/0v6q6q6q6q6q6q6q/scene.splinecode",
  // contact: "https://prod.spline.design/bd2qUxAvW9YrV6zr/scene.splinecode",
  // "ai-waitlist": "https://prod.spline.design/0mKkLmXsdgUzyrtn/scene.splinecode"
};

export const LoadingScreen = ({ page }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) return null;

  // Disable all spline animations to avoid errors
  const animationUrl = null;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {animationUrl ? (
        <div className="w-full h-full max-w-full max-h-full">
          <Spline scene={animationUrl} />
        </div>
      ) : (
        <div className="w-16 h-16 border-4 border-t-brand-primary border-gray-300 rounded-full animate-spin"></div>
      )}
      <p className="mt-4 text-brand-primary text-md font-medium">Loading...</p>
    </div>
  );
};
