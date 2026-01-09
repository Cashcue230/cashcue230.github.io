import { useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from './use-reduced-motion';

/**
 * Hook to manage a count-up value logic.
 * 
 * @param {number} end - Target value
 * @param {number} duration - Animation duration in seconds
 * @param {number} start - Start value
 * @returns {Object} { value: number, ref: React.RefObject }
 */
export const useCountUp = (end, duration = 2, start = 0) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const shouldReduceMotion = useReducedMotion();
    const [displayValue, setDisplayValue] = useState(start);

    const motionValue = useMotionValue(start);
    const springValue = useSpring(motionValue, {
        damping: 20,
        stiffness: 100,
        duration: duration * 1000
    });

    useEffect(() => {
        if (shouldReduceMotion) {
            setDisplayValue(end);
            return;
        }

        if (isInView) {
            motionValue.set(end);
        }
    }, [isInView, end, motionValue, shouldReduceMotion]);

    useEffect(() => {
        if (shouldReduceMotion) return;

        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(latest);
        });

        return () => unsubscribe();
    }, [springValue, shouldReduceMotion]);

    return {
        value: displayValue,
        ref
    };
};

export default useCountUp;
