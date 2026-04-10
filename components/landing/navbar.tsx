'use client';

import { useEffect, useState } from 'react';

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C17.5 22.15 21 17.25 21 12V6l-9-4z" fill="white" />
    <path d="M9 12l2 2 4-4" stroke="#00c48a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${isScrolled ? 'scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <div className="logo-icon">
          <ShieldIcon />
        </div>
        SignalMesh
      </a>
      <div className="nav-links">
        <a href="#">Product</a>
        <a href="/tools">Security Tools</a>
        <a href="#">Integrations</a>
        <a href="/knowledgebase">Knowledge Base</a>
        <a href="#">Pricing</a>
      </div>
      <button className="nav-cta">Get API Key →</button>
    </nav>
  );
}
