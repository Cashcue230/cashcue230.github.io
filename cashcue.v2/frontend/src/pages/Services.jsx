import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Zap, Bot, Globe, Smartphone, Search, BarChart } from 'lucide-react';
import { mockServices } from '../mock';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MicroInteraction from '../components/motion/MicroInteraction';
import PageTransition from '../components/motion/PageTransition';

export const Services = () => {
  const serviceIcons = [Code, Zap, Palette, Bot];

  const additionalServices = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Full-stack development with modern frameworks and technologies.",
      features: ["React/Next.js", "Node.js Backend", "Database Design", "API Integration"]
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Ensure your website works perfectly on all devices and screen sizes.",
      features: ["Responsive Design", "Touch Optimization", "Fast Loading", "PWA Ready"]
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Get found by your customers with advanced SEO strategies.",
      features: ["Technical SEO", "Content Strategy", "Performance Optimization", "Analytics Setup"]
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Track and optimize your website's performance with detailed analytics.",
      features: ["User Behavior Tracking", "Conversion Optimization", "A/B Testing", "Custom Dashboards"]
    }
  ];

  return (
    <PageTransition>
      <div className="dark-container" style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <RevealOnScroll variant="slideUp" delay={0.1}>
                <h1 className="display-huge mb-6">Our Services</h1>
              </RevealOnScroll>
              <RevealOnScroll variant="slideUp" delay={0.2}>
                <p className="body-large text-gray-400 max-w-3xl mx-auto">
                  We offer a comprehensive range of web development services designed to bring your vision to life with cutting-edge technology and stunning design.
                </p>
              </RevealOnScroll>
            </div>

            {/* Main Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {mockServices.map((service, index) => {
                const IconComponent = serviceIcons[index];
                return (
                  <RevealOnScroll key={service.id} variant="slideUp" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div
                        className="group bg-gray-900/30 backdrop-blur-sm border border-white/10 p-8 hover:border-brand-primary/50 transition-all duration-500 dark-hover"
                      >
                        <div className="flex items-start gap-6">
                          <MicroInteraction type="icon">
                            <div className="flex-shrink-0 p-3 bg-brand-primary/10 border border-brand-primary/20">
                              <IconComponent size={32} style={{ color: 'var(--brand-primary)' }} />
                            </div>
                          </MicroInteraction>
                          <div className="flex-1">
                            <h3 className="heading-2 mb-4">{service.title}</h3>
                            <p className="body-medium text-gray-400 mb-6">{service.description}</p>
                            <div className="grid grid-cols-2 gap-3">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0"></div>
                                  <span className="body-small text-gray-300">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </MicroInteraction>
                  </RevealOnScroll>
                );
              })}
            </div>

            {/* Additional Services */}
            <div className="mb-16">
              <RevealOnScroll variant="fadeIn">
                <h2 className="display-medium text-center mb-12">Additional Expertise</h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {additionalServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <RevealOnScroll key={index} variant="slideUp" delay={index * 0.1} className="h-full">
                      <MicroInteraction type="card" className="h-full">
                        <div
                          className="group bg-black/50 backdrop-blur-sm border border-white/10 p-6 hover:border-brand-primary/50 transition-all duration-500 dark-hover text-center h-full"
                        >
                          <div className="mb-4 flex justify-center">
                            <div className="p-3 bg-brand-primary/10 border border-brand-primary/20">
                              <IconComponent size={28} style={{ color: 'var(--brand-primary)' }} />
                            </div>
                          </div>
                          <h3 className="heading-3 mb-3">{service.title}</h3>
                          <p className="body-small text-gray-400 mb-4">{service.description}</p>
                          <div className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center justify-center gap-2">
                                <div className="w-1 h-1 bg-brand-primary rounded-full"></div>
                                <span className="text-xs text-gray-500">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </MicroInteraction>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>

            {/* Process Section */}
            <div className="bg-gray-900/20 border border-white/10 p-12 mb-16">
              <RevealOnScroll variant="fadeIn">
                <h2 className="display-medium text-center mb-12">Our Process</h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Discovery",
                    description: "We understand your goals, target audience, and project requirements."
                  },
                  {
                    step: "02",
                    title: "Design",
                    description: "Create stunning mockups and prototypes that bring your vision to life."
                  },
                  {
                    step: "03",
                    title: "Development",
                    description: "Build your website with cutting-edge technology and best practices."
                  },
                  {
                    step: "04",
                    title: "Launch",
                    description: "Deploy your website and provide ongoing support and maintenance."
                  }
                ].map((phase, index) => (
                  <RevealOnScroll key={index} variant="slideUp" delay={index * 0.2}>
                    <div className="text-center group">
                      <div className="relative mb-6">
                        <MicroInteraction type="icon">
                          <div
                            className="w-16 h-16 mx-auto border-2 border-brand-primary flex items-center justify-center text-xl font-bold group-hover:bg-brand-primary group-hover:text-black transition-all duration-300"
                          >
                            {phase.step}
                          </div>
                        </MicroInteraction>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/20"></div>
                        )}
                      </div>
                      <h3 className="heading-3 mb-3">{phase.title}</h3>
                      <p className="body-small text-gray-400">{phase.description}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <RevealOnScroll variant="slideUp">
              <div className="text-center">
                <h2 className="display-medium mb-6">Ready to Start Your Project?</h2>
                <p className="body-large text-gray-400 mb-8 max-w-2xl mx-auto">
                  Let's discuss your project requirements and create something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MicroInteraction type="button">
                    <Link to="/contact" className="btn-primary">
                      Get a Quote
                      <ArrowRight size={20} />
                    </Link>
                  </MicroInteraction>
                  <MicroInteraction type="button">
                    <Link to="/portfolio" className="btn-secondary">
                      View Our Work
                    </Link>
                  </MicroInteraction>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};