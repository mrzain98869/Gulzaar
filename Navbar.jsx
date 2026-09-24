import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`pill-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Brand */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          textDecoration: 'none',
          color: '#0f1117'
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4af37, #997d33)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)'
          }}
        >
          <Crown size={15} />
        </div>
        <span
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.04em',
            color: '#11141d'
          }}
        >
          Gulzaar
        </span>
      </a>

      {/* Nav Links */}
      <ul className="nav-links">
        <li>
          <span
            className="nav-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Home
          </span>
        </li>
        <li>
          <span className="nav-link" onClick={() => scrollTo('demo')}>
            Demo
          </span>
        </li>
        <li>
          <span className="nav-link" onClick={() => scrollTo('how-it-works')}>
            How It Works
          </span>
        </li>
        <li>
          <span className="nav-link" onClick={() => scrollTo('features')}>
            Features
          </span>
        </li>
        <li>
          <span className="nav-link" onClick={() => scrollTo('pricing')}>
            Pricing
          </span>
        </li>
        <li>
          <Link to="/admin" className="nav-link" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
