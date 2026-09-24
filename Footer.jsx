import React, { useState } from 'react';
import { Crown, MessageCircle, Heart, ArrowUp, Send } from 'lucide-react';
import { WHATSAPP_LINK } from '../config';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" stroke="none" {...props}>
    <path d="M9.5 21v-7H7v-3.5h2.5V8.2c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.5.7-1.5 1.5V10.5H17l-.5 3.5h-3V21h-4z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" stroke="none" {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.4V8.6L15.8 12l-6.2 3.4z" />
  </svg>
);

const SOCIALS = [
  { label: 'Instagram', icon: <InstagramIcon />, href: 'https://instagram.com/gulzaar.invites' },
  { label: 'Facebook', icon: <FacebookIcon />, href: 'https://facebook.com/gulzaar.invites' },
  { label: 'YouTube', icon: <YoutubeIcon />, href: 'https://youtube.com/@gulzaar.invites' }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer
      style={{
        background: '#05070a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '70px 24px 40px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #d4af37, #997d33)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Crown size={16} />
              </div>
              <span className="font-display" style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                Gulzaar
              </span>
            </div>

            <p style={{ color: '#8e96a8', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              The premier cinematic-scroll invitation platform. Royal-grade invites crafted online in
              minutes for weddings, galas, and milestones across the globe.
            </p>

            <div style={{ fontSize: '13px', color: '#d4af37', marginBottom: '20px' }}>
              Official Domain: <strong>gulzaar.com</strong>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Gulzaar on ${s.label}`}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aab3c6',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.color = '#d4af37';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#aab3c6';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gulzaar on WhatsApp"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25d366',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.12)';
                }}
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#hero" style={{ color: '#8e96a8', textDecoration: 'none', fontSize: '14px' }}>
                  Taj Mahal Cinematic Scroll
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: '#8e96a8', textDecoration: 'none', fontSize: '14px' }}>
                  The Royal Portal Experience
                </a>
              </li>
              <li>
                <a href="#pricing" style={{ color: '#8e96a8', textDecoration: 'none', fontSize: '14px' }}>
                  Tiered Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              Royal Concierge
            </h4>
            <p style={{ color: '#8e96a8', fontSize: '13.5px', marginBottom: '16px', maxWidth: '240px' }}>
              Need bespoke calligraphy, custom music arrangement, or white-glove setup? Our 24/7 concierge is on WhatsApp.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(46, 176, 134, 0.15)',
                border: '1px solid rgba(46, 176, 134, 0.35)',
                color: '#2eb086',
                padding: '10px 18px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Newsletter */}
          <div style={{ maxWidth: '320px' }}>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>
              Royal Updates & Wedding Ideas
            </h4>
            <p style={{ color: '#8e96a8', fontSize: '13px', lineHeight: 1.55, marginBottom: '14px' }}>
              New templates, seasonal colour trends and offer codes — straight to your inbox. No spam.
            </p>

            {subscribed ? (
              <div
                style={{
                  background: 'rgba(46, 176, 134, 0.12)',
                  border: '1px solid rgba(46, 176, 134, 0.35)',
                  color: '#2eb086',
                  borderRadius: '9999px',
                  padding: '12px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                ✦ You're on the royal list. Welcome!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{
                  display: 'flex',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '9999px',
                  padding: '5px'
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: '13px',
                    padding: '8px 12px',
                    minWidth: 0
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#d4af37',
                    color: '#0a0d14',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#e5c378')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#d4af37')}
                >
                  <span>Join</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            color: '#656e80',
            fontSize: '13px'
          }}
        >
          <div>
            © {new Date().getFullYear()} Gulzaar (gulzaar.com). All rights reserved. Crafted with{' '}
            <Heart size={12} color="#e8a598" style={{ display: 'inline', verticalAlign: 'middle' }} fill="#e8a598" /> for unforgettable celebrations.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: '#8e96a8',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
