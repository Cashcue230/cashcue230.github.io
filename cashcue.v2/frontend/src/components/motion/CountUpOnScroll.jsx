import React, { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

/**
 * Animates a number counting up from start to end value when in view.
 * 
 * @param {Object} props
 * @param {number} props.end - The final number to show
 * @param {number} props.start - The starting number (default: 0)
 * @param {number} props.duration - Duration of animation in seconds (default: 2)
 * @param {string} props.suffix - Suffix to append (e.g., '+', '%')
 * @param {string} props.prefix - Prefix to prepend (e.g., '$')
 * @param {number} props.decimals - Number of decimal places (default: 0)
 * @param {string} props.className - CSS class for the span
 */
export const CountUpOnScroll = ({
    end,
    start = 0,
    duration = 2,
    suffix = '',
    prefix = '',
    decimals = 0,
    className = ''
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const shouldReduceMotion = useReducedMotion();

    const motionValue = useMotionValue(start);
    const springValue = useSpring(motionValue, {
        damping: 20,
        stiffness: 100,
        duration: duration * 1000 // spring duration approx
    });

    // Ref to hold the displayed value
    const displayRef = useRef(null);

    useEffect(() => {
        if (isInView && !shouldReduceMotion) {
            motionValue.set(end);
        }
    }, [isInView, end, motionValue, shouldReduceMotion]);

    useEffect(() => {
        // If reduced motion, just show the end value
        if (shouldReduceMotion && displayRef.current) {
            displayRef.current.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
            return;
        }

        const unsubscribe = springValue.on("change", (latest) => {
            if (displayRef.current) {
                displayRef.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
            }
        });

        return () => unsubscribe();
    }, [springValue, decimals, prefix, suffix, end, shouldReduceMotion]);

    // Initial render content
    const initialContent = shouldReduceMotion
        ? `${prefix}${end.toFixed(decimals)}${suffix}`
        : `${prefix}${start.toFixed(decimals)}${suffix}`;

    return (
        <span ref={ref} className={className}>
            <span ref={displayRef}>{initialContent}</span>
        </span>
    );
};

export default CountUpOnScroll;
