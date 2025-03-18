import { useState, useEffect } from 'react';

// Custom Hook for window width
const useDeviceType = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 575;
  const isTablet = width > 575 && width <= 1024;
  const isMobileOrTablet = isMobile || isTablet;

  return { isMobile, isTablet, isMobileOrTablet };
};
