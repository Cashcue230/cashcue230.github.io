import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import CountUpOnScroll from './CountUpOnScroll';
import MicroInteraction from './MicroInteraction';

/**
 * THIS IS A REFERENCE FILE ONLY.
 * It demonstrates how to use the new motion components.
 * Do not import this component in production.
 */

export const MotionExamples = () => {
    return (
        <div className="p-10 space-y-12">

            {/* Example 1: Section Header Reveal */}
            <RevealOnScroll variant="slideUp">
                <h1 className="text-4xl font-bold mb-4">Animated Title</h1>
                <p className="text-gray-400">This content fades and slides up when scrolled into view.</p>
            </RevealOnScroll>

            {/* Example 2: Service Cards with Staggered Delay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item, index) => (
                    <RevealOnScroll
                        key={item}
                        variant="fadeIn"
                        delay={index * 0.1} // Stagger effect
                        className="h-full"
                    >
                        <MicroInteraction type="card" className="h-full">
                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <MicroInteraction type="icon">
                                    <Star className="text-yellow-400 mb-4" />
                                </MicroInteraction>
                                <h3 className="text-xl font-bold">Feature {item}</h3>
                            </div>
                        </MicroInteraction>
                    </RevealOnScroll>
                ))}
            </div>

            {/* Example 3: Stats Counter */}
            <div className="flex justify-around bg-gray-800 p-8 rounded-2xl">
                <div className="text-center">
                    <div className="text-3xl font-bold text-brand-primary">
                        <CountUpOnScroll end={98} suffix="%" />
                    </div>
                    <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-brand-primary">
                        <CountUpOnScroll end={500} prefix="$" suffix="K+" />
                    </div>
                    <div className="text-sm text-gray-400">Revenue</div>
                </div>
            </div>

            {/* Example 4: Interactive Buttons */}
            <div className="flex gap-4">
                <MicroInteraction type="button">
                    <button className="px-6 py-3 bg-blue-600 rounded-lg font-medium flex items-center gap-2">
                        Get Started <ArrowRight size={18} />
                    </button>
                </MicroInteraction>

                <MicroInteraction type="button">
                    <button className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5">
                        Learn More
                    </button>
                </MicroInteraction>
            </div>

        </div>
    );
};

export default MotionExamples;
