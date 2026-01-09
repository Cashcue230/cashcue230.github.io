import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current > 100) {
        setIsScrolled(window.scrollY > 50);
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'CashCue AI', path: '/ai-waitlist' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-2 sm:px-4 lg:px-[7.6923%] h-20 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/25' : 'bg-transparent'
        }`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/2bd68bb7-0cd1-4c35-841e-3668322ca5a0_removalai_preview.png" alt="CashCue Logo" className="h-8 sm:h-10 mr-1" />
        <div className="text-2xl font-bold text-white hidden min-[300px]:block">
          Cash<span style={{ color: 'var(--brand-primary)' }}>Cue</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-lg font-medium transition-colors duration-300 hover:text-white ${location.pathname === item.path
              ? 'text-white border-b-2'
              : 'text-gray-400'
              }`}
            style={{
              borderBottomColor: location.pathname === item.path ? 'var(--brand-primary)' : 'transparent'
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-white hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/25 lg:hidden">
          <nav className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-lg font-medium transition-colors duration-300 hover:text-white ${location.pathname === item.path
                  ? 'text-white'
                  : 'text-gray-400'
                  }`}
                style={{
                  color: location.pathname === item.path ? 'var(--brand-primary)' : undefined
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};