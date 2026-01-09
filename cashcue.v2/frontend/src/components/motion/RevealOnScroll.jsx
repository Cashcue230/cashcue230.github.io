import React from 'react';
import { motion } from 'framer-motion';
import { MOTION_CONFIG } from '../../lib/motion-config';
import { REVEAL_VARIANTS } from '../../lib/motion-variants';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

/**
 * Wraps content with a scroll-triggered reveal animation.
 * 
 * @param {Object} props
 * @param {string} props.variant - The variant name from REVEAL_VARIANTS (default: 'slideUp')
 * @param {number} props.delay - Delay in seconds (default: 0)
 * @param {number} props.duration - Custom duration (optional)
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to animate
 */
export const RevealOnScroll = ({
    variant = 'slideUp',
    delay = 0,
    duration,
    className = '',
    children
}) => {
    const shouldReduceMotion = useReducedMotion();

    // Select the variant definition
    const selectedVariant = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.slideUp;

    // If reduced motion is preferred, render without animation logic
    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={MOTION_CONFIG.viewport}
            variants={selectedVariant}
            transition={{
                ...MOTION_CONFIG.transition,
                delay: delay,
                ...(duration ? { duration } : {}),
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
