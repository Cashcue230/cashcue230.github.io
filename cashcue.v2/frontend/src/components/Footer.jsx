import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';
import SocialIcons from './SocialIcons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/25 mt-8 md:mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-2xl font-bold text-white mb-4">
              <img src="/2bd68bb7-0cd1-4c35-841e-3668322ca5a0_removalai_preview.png" alt="CashCue Logo" className="h-8 sm:h-10 mr-1 inline-block align-middle" />
              <span className="hidden min-[300px]:inline">
                Cash<span style={{ color: 'var(--brand-primary)' }}>Cue</span>
              </span>
            </div>
            <p className="body-medium text-gray-400 mb-6 max-w-md">
              We don't just build websites — we create futuristic experiences that attract, engage, and convert.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:cashcue001@gmail.com"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
                cashcue001@gmail.com
              </a>
            </div>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://wa.me/13162368103"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
                +1 (316) 236-8103
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="heading-3 text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'CashCue AI Waitlist', path: '/ai-waitlist' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="body-small text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="heading-3 text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                'Website Development',
                'UI/UX Design',
                'Custom Animations',
                'AI Integration'
              ].map((service) => (
                <li key={service}>
                  <span className="body-small text-gray-400">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/25 mt-12 pt-8 flex flex-col items-center text-center">
          <p className="body-small text-gray-400 mb-4">
            © {currentYear} CashCue. All rights reserved.
          </p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};