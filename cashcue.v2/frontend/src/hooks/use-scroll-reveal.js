import { useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { MOTION_CONFIG } from '../lib/motion-config';
import { REVEAL_VARIANTS } from '../lib/motion-variants';
import { useReducedMotion } from './use-reduced-motion';

/**
 * Custom hook to trigger animations when an element enters the viewport.
 * Returns spreadable props for a motion component.
 * 
 * @param {string} variant - Variant name from REVEAL_VARIANTS
 * @param {number} delay - Delay in seconds
 * @param {number} threshold - Intersection threshold (0-1)
 * @returns {Object} Props object containing { ref, initial, animate, variants, transition }
 */
export const useScrollReveal = (variant = 'slideUp', delay = 0, threshold = 0.1) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const shouldReduceMotion = useReducedMotion();

    const selectedVariant = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.slideUp;

    useEffect(() => {
        if (shouldReduceMotion) {
            // Ensure visible state if reduced motion is preferred
            controls.start('visible');
            return;
        }

        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView, shouldReduceMotion]);

    // If reduced motion, return minimal props to just show content
    if (shouldReduceMotion) {
        return { ref };
    }

    return {
        ref,
        initial: "hidden",
        animate: controls,
        variants: selectedVariant,
        transition: {
            ...MOTION_CONFIG.transition,
            delay
        }
    };
};

export default useScrollReveal;
