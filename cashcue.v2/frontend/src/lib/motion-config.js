export const MOTION_CONFIG = {
  // Global transition defaults - optimized for performance
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier (easeOutQuint-ish) for smooth premium feel without spring overhead
  },

  // Spring physics for interactive elements (hover/tap) where physics feels better
  springTransition: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  },

  // Slower transition for specific dramatic reveals
  slowTransition: {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier
  },

  // Viewport detection settings
  viewport: {
    once: true, // Critical for performance: only animate once
    margin: "-50px", // Trigger slightly before element is fully in view
    amount: 0.1, // Minimal amount visible to trigger
  },

  // Reduced motion alternative
  reducedMotion: {
    transition: { duration: 0 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
};
