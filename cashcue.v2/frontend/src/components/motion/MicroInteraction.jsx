import React from 'react';
import { motion } from 'framer-motion';
import { INTERACTION_VARIANTS } from '../../lib/motion-variants';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

/**
 * Adds micro-interactions (hover/tap effects) to child elements.
 * 
 * @param {Object} props
 * @param {string} props.type - The interaction type: 'button', 'card', 'icon', 'tap'
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to interact with
 * @param {Function} props.onClick - Click handler pass-through
 */
export const MicroInteraction = ({
    type = 'button',
    className = '',
    children,
    onClick,
    ...rest
}) => {
    const shouldReduceMotion = useReducedMotion();

    // Select variant key based on type
    const variantKey = type === 'button' ? 'buttonHover'
        : type === 'card' ? 'cardHover'
            : type === 'icon' ? 'iconBounce'
                : 'tap';

    const hoverVariant = INTERACTION_VARIANTS[variantKey];
    const tapVariant = INTERACTION_VARIANTS.tap;

    // Render plain div if reduced motion
    if (shouldReduceMotion) {
        return (
            <div className={className} onClick={onClick} {...rest}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={className}
            whileHover={hoverVariant}
            whileTap={tapVariant}
            whileFocus={hoverVariant}
            onClick={onClick}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default MicroInteraction;
