import React, { useState } from 'react';
import { Check, Sparkles, Crown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

const PLANS = [
  {
    id: 'classic',
    name: 'Classic Heirloom',
    badge: 'Essential Grace',
    priceINR: '999',
    priceUSD: '14',
    popular: false,
    desc: 'Perfect for intimate ceremonies, engagements, and elegant receptions.',
    features: [
      'Interactive Webpage Hosted for 6 Months',
      'Elegant Wax Seal Break Animation',
      '1-Click Google Maps & Uber Venue Route',
      'Event Countdown Timer',
      'Unlimited Guest Page Views',
      'Instant WhatsApp Shareable Link',
      'Standard Instrumental Music'
    ]
  },
  {
    id: 'royal',
    name: 'Royal Grandeur',
    badge: 'Most Popular',
    priceINR: '1,799',
    priceUSD: '24',
    popular: true,
    desc: 'Our signature imperial experience with 3D doors, scratch foil, and live RSVP.',
    features: [
      'Everything in Classic Heirloom +',
      'Interactive 3D Palace Doors Opening Ceremony',
      'Gold Foil Scratch-to-Reveal Date Card',
      'Real-time RSVP Guest Messaging & Attendance CRM',
      'Background Royal Music with Custom Audio Upload',
      'Photo Slideshow & Couple Love Story Gallery',
      'Multi-Language Greeting Translation',
      'Hosted for 1 Full Year with Unlimited Live Edits'
    ]
  },
  {
    id: 'bespoke',
    name: 'Imperial Bespoke',
    badge: 'VIP White-Glove',
    priceINR: '2,999',
    priceUSD: '39',
    popular: false,
    desc: 'For multi-day royal extravaganzas requiring custom domains and bespoke styling.',
    features: [
      'Everything in Royal Grandeur +',
      'Custom Vanity Domain (e.g. gulzaar.com/alina-zayd)',
      'Multi-Day Schedule (Mehendi, Sangeet, Nikah, Reception)',
      'WhatsApp Automation & Direct Guest Name Ingestion',
      'Dedicated 1-on-1 Royal Concierge Designer',
      'High-Resolution Printable QR Code Suite',
      'Lifetime Cloud Archive of All Guest Messages'
    ]
  }
];

export default function PricingSection({ onCheckout }) {
  const [currency, setCurrency] = useState('INR');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCheckoutStep(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <section
      id="pricing"
      className="content-section"
      style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #0c0f18 0%, #07090e 100%)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="announcement-pill" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} color="#d4af37" />
            <span>Transparent Investment</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '16px'
            }}
          >
            Royalty Within Reach
          </h2>

          <p
            style={{
              color: '#a3abbd',
              fontSize: '17px',
              maxWidth: '620px',
              margin: '0 auto 32px auto',
              lineHeight: 1.6
            }}
          >
            No recurring monthly subscriptions. One transparent payment for lifetime memories. 
            Select the tier that honors your milestone.
          </p>

          {/* Currency Toggle */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '4px',
              gap: '4px'
            }}
          >
            <button
              onClick={() => setCurrency('INR')}
              style={{
                background: currency === 'INR' ? '#ffffff' : 'transparent',
                color: currency === 'INR' ? '#0f1117' : '#99a3b7',
                border: 'none',
                borderRadius: '9999px',
                padding: '6px 18px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              style={{
                background: currency === 'USD' ? '#ffffff' : 'transparent',
                color: currency === 'USD' ? '#0f1117' : '#99a3b7',
                border: 'none',
                borderRadius: '9999px',
                padding: '6px 18px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}
        >
          {PLANS.map((plan) => {
            const price = currency === 'INR' ? `₹${plan.priceINR}` : `$${plan.priceUSD}`;

            return (
              <div
                key={plan.id}
                className={plan.popular ? 'glass-card-gold' : 'glass-card'}
                style={{
                  borderRadius: '28px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: plan.popular
                    ? '2px solid rgba(212, 175, 55, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
                  zIndex: plan.popular ? 2 : 1
                }}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #d4af37, #b89225)',
                      color: '#0a0d14',
                      padding: '4px 16px',
                      borderRadius: '9999px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Crown size={13} />
                    <span>{plan.badge}</span>
                  </div>
                )}

                {/* Plan Header */}
                <div style={{ marginBottom: '24px' }}>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '8px'
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#9ba4b8', lineHeight: 1.5 }}>
                    {plan.desc}
                  </p>
                </div>

                {/* Price Display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '28px' }}>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '44px',
                      fontWeight: 800,
                      color: plan.popular ? '#f3e5ab' : '#ffffff'
                    }}
                  >
                    {price}
                  </span>
                  <span style={{ color: '#828c9e', fontSize: '14px' }}>/ one-time fee</span>
                </div>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px', flex: 1 }}>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div
                        style={{
                          background: plan.popular ? 'rgba(212, 175, 55, 0.2)' : 'rgba(46, 176, 134, 0.15)',
                          borderRadius: '50%',
                          padding: '3px',
                          display: 'flex',
                          marginTop: '2px'
                        }}
                      >
                        <Check size={13} color={plan.popular ? '#d4af37' : '#2eb086'} />
                      </div>
                      <span style={{ fontSize: '13.5px', color: '#cad1e0', lineHeight: 1.4 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={plan.popular ? 'btn-primary-pill' : 'btn-secondary-pill'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    fontSize: '15px'
                  }}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Security & Guarantee Note */}
        <div
          style={{
            marginTop: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            color: '#8d96a8',
            fontSize: '13px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#2eb086" />
            <span>Secure 256-Bit Encrypted Payment (UPI, Cards, NetBanking)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} color="#d4af37" />
            <span>Instant Setup in 3 Minutes</span>
          </div>
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      {checkoutStep && selectedPlan && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setCheckoutStep(false)}
        >
          <div
            className="glass-card-gold"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '36px',
              borderRadius: '28px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #d4af37, #997d33)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  margin: '0 auto 14px auto'
                }}
              >
                <Crown size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '24px', color: '#fff', marginBottom: '6px' }}>
                Your {selectedPlan.name}
              </h3>
              <p style={{ color: '#a0a8bb', fontSize: '13.5px' }}>
                Total: {currency === 'INR' ? `₹${selectedPlan.priceINR}` : `$${selectedPlan.priceUSD}`} (One-time payment)
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Couple Names (e.g. Alina & Zayd)"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <input
                type="tel"
                placeholder="WhatsApp Number for Instant Link Delivery"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={() => {
                alert(`✨ Congratulations! Your invitation link for ${selectedPlan.name} is ready. Redirecting to your Gulzaar dashboard!`);
                setCheckoutStep(false);
              }}
              className="btn-primary-pill"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            >
              <span>Confirm & Generate Invitation Link</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
