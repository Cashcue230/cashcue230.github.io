import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FloatingHireButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact');
    // Small delay to ensure page loads, then scroll to contact form
    setTimeout(() => {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      className="floating-hire-btn"
      aria-label="Hire Me - Contact CashCue"
    >
      Hire Me
    </button>
  );
};