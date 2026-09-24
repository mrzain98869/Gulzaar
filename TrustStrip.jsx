import React from 'react';

const STATS = [
  { value: '900+', label: 'Royal Celebrations' },
  { value: '14', label: 'Countries Served' },
  { value: '4.9/5', label: 'Guest Rating' },
  { value: '7 min', label: 'Average Build Time' }
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Gulzaar at a glance"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#080a10',
        borderTop: '1px solid rgba(212, 175, 55, 0.18)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
        padding: '30px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px 0'
        }}
      >
        {STATS.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            {idx > 0 && (
              <div
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '34px',
                  background: 'rgba(212, 175, 55, 0.32)',
                  margin: '0 clamp(20px, 4vw, 52px)'
                }}
              />
            )}
            <div style={{ textAlign: 'center', minWidth: '150px' }}>
              <div
                className="font-display gold-text-gradient"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.1 }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: '#9aa2b5',
                  fontSize: '12.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '5px'
                }}
              >
                {stat.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
