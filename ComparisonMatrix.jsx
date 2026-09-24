import React from 'react';
import { Check, X, Sparkles, Crown } from 'lucide-react';

const COMPARISONS = [
  {
    feature: 'Cinematic Scroll Visuals',
    gulzaar: '60fps Scroll-Tied Photorealistic Journey',
    competitor: 'Static 2D/3D Templates',
    paper: 'Static printed paper'
  },
  {
    feature: 'Live Interactive Demo Invitations',
    gulzaar: 'Real Working Previews — Studio, Royal, Classic & Tahari',
    competitor: 'Fixed Pre-recorded Screenshots',
    paper: 'Non-existent'
  },
  {
    feature: 'Cinematic Scroll Journey & Spatial Audio',
    gulzaar: 'Scroll-Tied Reveal with Sitar & Visualizer',
    competitor: 'Static Page Transition',
    paper: 'Manual envelope flap'
  },
  {
    feature: 'Scratch-to-Reveal Ceremony Date',
    gulzaar: 'Real Golden Scratch Foil + Confetti Sparkles',
    competitor: 'Basic scratch effect',
    paper: 'Static printed date'
  },
  {
    feature: 'Guest RSVP CRM & WhatsApp Sync',
    gulzaar: 'Live Dashboard, Guest Count & WhatsApp Broadcast',
    competitor: 'Basic form inbox',
    paper: 'Manual calls & spreadsheets'
  },
  {
    feature: 'Turnaround Time & Edits',
    gulzaar: 'Instant (3 Mins) + Unlimited Real-time Edits',
    competitor: 'Requires waiting for setup',
    paper: '3 to 4 Weeks (Reprints cost extra)'
  },
  {
    feature: 'Investment Cost',
    gulzaar: 'Starting ₹999 ($14) One-Time',
    competitor: '₹1,499 Flat',
    paper: '₹35,000 - ₹90,000+'
  },
  {
    feature: 'Sustainability & Eco Footprint',
    gulzaar: '100% Zero-Waste Eco-Royal Luxury',
    competitor: 'Digital',
    paper: 'Massive paper waste & emissions'
  }
];

export default function ComparisonMatrix() {
  return (
    <section
      id="comparison"
      className="content-section"
      style={{
        padding: '120px 24px',
        background: '#07090e',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="announcement-pill" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} color="#d4af37" />
            <span>Unmatched Distinction</span>
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
            Why Gulzaar Reigns Supreme
          </h2>

          <p
            style={{
              color: '#a3abbd',
              fontSize: '17px',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            See how Gulzaar surpasses standard digital invitation services and traditional paper cards 
            in elegance, interactivity, and unmatched value.
          </p>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            overflowX: 'auto',
            background: 'rgba(14, 18, 28, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              minWidth: '680px'
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '24px', color: '#8d97aa', fontSize: '14px', fontWeight: 600, width: '32%' }}>
                  Features & Experience
                </th>
                <th
                  style={{
                    padding: '24px',
                    color: '#f3e5ab',
                    fontSize: '16px',
                    fontWeight: 700,
                    background: 'rgba(212, 175, 55, 0.12)',
                    borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRight: '1px solid rgba(212, 175, 55, 0.3)',
                    width: '36%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Crown size={18} color="#d4af37" />
                    <span>Gulzaar (gulzaar.com)</span>
                  </div>
                </th>
                <th style={{ padding: '24px', color: '#8d97aa', fontSize: '14px', fontWeight: 600, width: '16%' }}>
                  Basic Competitors
                </th>
                <th style={{ padding: '24px', color: '#8d97aa', fontSize: '14px', fontWeight: 600, width: '16%' }}>
                  Traditional Paper
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx === COMPARISONS.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td style={{ padding: '20px 24px', color: '#e5e8f2', fontSize: '14.5px', fontWeight: 600 }}>
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: '20px 24px',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 500,
                      background: 'rgba(212, 175, 55, 0.07)',
                      borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRight: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color="#2eb086" />
                      <span style={{ fontWeight: 600 }}>{row.gulzaar}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', color: '#97a1b5', fontSize: '13.5px' }}>
                    {row.competitor}
                  </td>
                  <td style={{ padding: '20px 24px', color: '#7a8397', fontSize: '13.5px' }}>
                    {row.paper}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
