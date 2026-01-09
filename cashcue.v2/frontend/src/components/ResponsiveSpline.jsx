import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const ResponsiveSpline = ({
  scene,
  fallbackImage,
  fallbackMessage = "3D Animation Loading...",
  className = "",
  style = {},
  hueRotate = null,
  onLoad = null,
  onError = null
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Device detection for responsive behavior
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 300) {
        setDeviceType('smartwatch');
      } else if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    const updateDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDeviceType();
    updateDimensions();

    const handleResize = () => {
      updateDeviceType();
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive dimensions based on device type
  const getResponsiveDimensions = () => {
    const baseSize = Math.min(dimensions.width, dimensions.height) || 400;

    switch (deviceType) {
      case 'smartwatch':
        return {
          width: Math.min(baseSize * 0.8, 200),
          height: Math.min(baseSize * 0.8, 200)
        };
      case 'mobile':
        return {
          width: Math.min(baseSize * 0.9, 500),
          height: Math.min(baseSize * 0.9, 500)
        };
      case 'tablet':
        return {
          width: Math.min(baseSize * 0.85, 600),
          height: Math.min(baseSize * 0.85, 600)
        };
      default: // desktop
        return {
          width: Math.min(baseSize * 1.2, 1200),
          height: Math.min(baseSize * 1.2, 1200)
        };
    }
  };

  const handleSplineLoad = (spline) => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad(spline);
  };

  const handleSplineError = (error) => {
    setIsLoading(false);
    setHasError(true);
    console.warn('Spline failed to load:', error);
    if (onError) onError(error);
  };

  const splineDimensions = getResponsiveDimensions();

  // Don't render Spline on smartwatches or if container is too small
  const shouldRenderSpline = deviceType !== 'smartwatch' && splineDimensions.width > 100;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={style}
    >
      {shouldRenderSpline ? (
        <>
          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm z-10">
              {fallbackImage ? (
                <img
                  src={fallbackImage}
                  alt="Fallback"
                  className="max-w-full max-h-full object-contain opacity-70"
                  style={{
                    width: splineDimensions.width,
                    height: splineDimensions.height
                  }}
                />
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">{fallbackMessage}</p>
                </div>
              )}
            </div>
          )}

          {/* Spline Component */}
          <div
            className="relative"
            style={{
              width: splineDimensions.width,
              height: splineDimensions.height,
              left: '50%',
              transform: 'translateX(-50%)',
              overflow: 'visible'
            }}
          >
            <Spline
              scene={scene}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
              style={{
                width: '100%',
                height: '100%',
                filter: hueRotate ? `hue-rotate(${hueRotate})` : undefined,
                transform: 'rotateY(15deg) scale(1.1)',
                transformOrigin: 'center center'
              }}
            />
          </div>
        </>
      ) : (
        /* Fallback for very small devices */
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-3 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">3D Animation</p>
          <p className="text-xs text-gray-600 mt-1">Available on larger screens</p>
        </div>
      )}
    </div>
  );
};

export default ResponsiveSpline;
