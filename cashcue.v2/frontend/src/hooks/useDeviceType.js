import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device type and screen size
 * @returns {Object} Device information including type, width, height, and responsive breakpoints
 */
export const useDeviceType = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    width: 0,
    height: 0,
    type: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSmartwatch: false,
    orientation: 'landscape'
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? 'landscape' : 'portrait';

      // Device type detection
      let type = 'desktop';
      let isMobile = false;
      let isTablet = false;
      let isDesktop = true;
      let isSmartwatch = false;

      if (width < 300) {
        type = 'smartwatch';
        isSmartwatch = true;
        isDesktop = false;
      } else if (width < 640) {
        type = 'mobile';
        isMobile = true;
        isDesktop = false;
      } else if (width < 1024) {
        type = 'tablet';
        isTablet = true;
        isDesktop = false;
      } else {
        type = 'desktop';
        isDesktop = true;
      }

      setDeviceInfo({
        width,
        height,
        type,
        isMobile,
        isTablet,
        isDesktop,
        isSmartwatch,
        orientation
      });
    };

    // Initial detection
    updateDeviceInfo();

    // Add event listeners
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

/**
 * Utility function to get responsive classes based on device type
 * @param {Object} deviceInfo - Device information from useDeviceType hook
 * @param {Object} classes - Object containing responsive classes for different device types
 * @returns {string} Combined class string
 */
export const getResponsiveClasses = (deviceInfo, classes = {}) => {
  const {
    isMobile,
    isTablet,
    isDesktop,
    isSmartwatch
  } = deviceInfo;

  let classString = '';

  if (isSmartwatch && classes.smartwatch) {
    classString += ` ${classes.smartwatch}`;
  } else if (isMobile && classes.mobile) {
    classString += ` ${classes.mobile}`;
  } else if (isTablet && classes.tablet) {
    classString += ` ${classes.tablet}`;
  } else if (isDesktop && classes.desktop) {
    classString += ` ${classes.desktop}`;
  }

  return classString.trim();
};

/**
 * Hook to detect if device is low-power (for fallback decisions)
 * @returns {boolean} True if device is likely low-power
 */
export const useLowPowerDevice = () => {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const checkLowPower = () => {
      // Check for mobile devices (often lower power)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      // Check for limited memory (if available)
      const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

      // Check for slow connection
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const hasSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.saveData
      );

      setIsLowPower(isMobile || hasLimitedMemory || hasSlowConnection);
    };

    checkLowPower();

    // Listen for connection changes
    window.addEventListener('online', checkLowPower);
    window.addEventListener('offline', checkLowPower);

    return () => {
      window.removeEventListener('online', checkLowPower);
      window.removeEventListener('offline', checkLowPower);
    };
  }, []);

  return isLowPower;
};
