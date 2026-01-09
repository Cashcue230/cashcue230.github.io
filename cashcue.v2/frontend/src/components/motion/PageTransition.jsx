import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/use-reduced-motion';

/**
 * Wraps entire page content to provide a smooth mount transition.
 * Best used as the root element of each page component.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 */
export const PageTransition = ({ children }) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
