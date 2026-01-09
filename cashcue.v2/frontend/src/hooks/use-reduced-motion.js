import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user has requested reduced motion
 * @returns {boolean} true if prefers-reduced-motion is set to reduce
 */
export const useReducedMotion = () => {
    // Default to false for SSR/initial render
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Check if browser supports matchMedia
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Set initial value
        setMatches(mediaQuery.matches);

        // Event listener for changes
        const listener = (event) => {
            setMatches(event.matches);
        };

        // Modern browsers use addEventListener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        }
        // Fallback for older browsers
        else {
            mediaQuery.addListener(listener);
            return () => mediaQuery.removeListener(listener);
        }
    }, []);

    return matches;
};
