import React from 'react';
import { Palette, Edit3, Smartphone, Share2, Sparkles, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <Palette size={24} color="#d4af37" />,
    title: 'Select Your Royal Theme',
    desc: 'Browse our curated Royal & Classic templates. Choose the aesthetic that mirrors your celebration—from Mughal arches to contemporary rose gold.'
  },
  {
    num: '02',
    icon: <Edit3 size={24} color="#d4af37" />,
    title: 'Personalize Details in Minutes',
    desc: 'Easily enter your ceremony dates, venue with Google Maps, dress codes, couple photos, and select your favorite instrumental sitar or flute soundtrack.'
  },
  {
    num: '03',
    icon: <Smartphone size={24} color="#d4af37" />,
    title: 'Instant Interactive Preview',
    desc: 'Test your live webpage immediately. Experience the cinematic scroll reveal, test the scratch card date reveal, and verify all details on your mobile screen.'
  },
  {
    num: '04',
    icon: <Share2 size={24} color="#e5c378" />,
    title: 'Share via WhatsApp & QR',
    desc: 'Receive your personalized link (e.g. gulzaar.com/alina-zayd) and luxurious digital QR card to broadcast instantly to family and friends worldwide.'
  }
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="content-section"
      style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #07090e 0%, #0c0f18 100%)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-head">
          <div className="section-overline">
            <Sparkles size={14} color="#d4af37" />
            <span>Effortless Creation</span>
          </div>

          <h2 className="section-title">How Gulzaar Works</h2>

          <p className="section-sub">
            Create an heirloom-grade digital invitation webpage online in under four minutes.
            No design or technical experience required.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            position: 'relative'
          }}
        >
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '32px 24px',
                borderRadius: '24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              {/* Step Number Watermark */}
              <div
                className="font-display"
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '22px',
                  fontSize: '36px',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.06)',
                  userSelect: 'none'
                }}
              >
                {step.num}
              </div>

              {/* Step Icon */}
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '22px'
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px'
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#9aa2b5'
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div
          style={{
            marginTop: '56px',
            textAlign: 'center'
          }}
        >
          <a
            href="#pricing"
            className="btn-primary-pill"
            style={{ display: 'inline-flex' }}
          >
            <span>Create My Invitation</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
