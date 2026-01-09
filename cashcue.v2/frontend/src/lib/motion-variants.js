// Standard Reveal Variants
// Used with RevealOnScroll or manually with motion components

export const REVEAL_VARIANTS = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },

    slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    },

    slideDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
    },

    slideInLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },

    slideInRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },

    scaleIn: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },

    // For lists/grids
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    },
};

// Micro-Interaction Variants
// For hover/focus states on interactive elements

export const INTERACTION_VARIANTS = {
    buttonHover: {
        scale: 1.02,
        transition: { duration: 0.2 },
    },

    cardHover: {
        y: -5,
        transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },

    iconBounce: {
        y: [0, -5, 0],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        },
    },

    tap: {
        scale: 0.98,
    },
};
