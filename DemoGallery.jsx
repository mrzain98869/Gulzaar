import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { TEMPLATES, ORNAMENT_ICON } from '../data/templates';

export default function DemoGallery() {
  return (
    <section
      id="demo"
      className="content-section"
      style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #07090e 0%, #0c0f18 100%)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-head">
          <div className="section-overline">
            <Sparkles size={14} color="#d4af37" />
            <span>Royal Template Gallery</span>
          </div>
          <h2 className="section-title">Click. Scroll. Fall in Love.</h2>
          <p className="section-sub">
            Six live, fully-working invitations — not screenshots. Open any demo, scroll through
            the story, test the RSVP and wishes wall, then select it for your own celebration.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '28px',
          }}
        >
          {TEMPLATES.map((t) => {
            const Icon = ORNAMENT_ICON[t.ornament] || ORNAMENT_ICON.arch;
            const darkInk = t.palette.ink === '#f6eef7' || t.palette.ink === '#ecf6ef' || t.palette.ink === '#eaf7f2' || t.palette.ink === '#fbeedb';
            return (
              <div
                key={t.slug}
                className="glass-card"
                style={{
                  borderRadius: '26px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
                  background: '#0f131d',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
                  e.currentTarget.style.boxShadow = '0 24px 50px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Theme preview banner */}
                <Link
                  to={`/demo/${t.slug}`}
                  style={{
                    display: 'block',
                    position: 'relative',
                    height: '170px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    background: `linear-gradient(160deg, ${t.palette.bg} 0%, ${t.palette.bg2} 100%)`,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '66px',
                      height: '66px',
                      borderRadius: '50%',
                      border: `1.5px solid ${t.palette.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: t.palette.accentDeep,
                      fontFamily: t.fonts.script,
                      fontSize: '18px',
                      boxShadow: `0 0 0 5px ${t.palette.glow}`,
                      background: `${t.palette.surface}`,
                      zIndex: 2,
                    }}
                  >
                    {t.content.groom[0]} &amp;<br />{t.content.bride[0]}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      color: darkInk ? '#fff' : t.palette.inkMuted,
                      fontFamily: t.fonts.display,
                      fontSize: '12px',
                      letterSpacing: '.3em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ color: t.palette.accent }}>{t.content.groom}</span> &amp; <span style={{ color: t.palette.accent }}>{t.content.bride}</span>
                  </div>
                  {/* decorative corners */}
                  <div style={{ position: 'absolute', top: 12, left: 12, width: 26, height: 26, borderTop: `2px solid ${t.palette.accent}`, borderLeft: `2px solid ${t.palette.accent}`, borderTopLeftRadius: 8, opacity: .7 }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, borderTop: `2px solid ${t.palette.accent}`, borderRight: `2px solid ${t.palette.accent}`, borderTopRightRadius: 8, opacity: .7 }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, width: 26, height: 26, borderBottom: `2px solid ${t.palette.accent}`, borderLeft: `2px solid ${t.palette.accent}`, borderBottomLeftRadius: 8, opacity: .7 }} />
                  <div style={{ position: 'absolute', bottom: 12, right: 12, width: 26, height: 26, borderBottom: `2px solid ${t.palette.accent}`, borderRight: `2px solid ${t.palette.accent}`, borderBottomRightRadius: 8, opacity: .7 }} />
                </Link>

                {/* Card body */}
                <div style={{ padding: '26px 26px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: 'rgba(212,175,55,0.14)',
                        border: '1px solid rgba(212,175,55,0.4)',
                        color: '#f3e5ab',
                        borderRadius: '999px',
                        padding: '3px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Icon size={11} color="#d4af37" /> {t.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#8a94aa', letterSpacing: '.04em', marginBottom: '10px' }}>
                    {t.region}
                  </p>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#a2aabd', marginBottom: '16px', flex: 1 }}>
                    {t.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', color: '#7d879c' }}>From</span>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#f3e5ab', fontFamily: 'var(--font-display)' }}>₹{t.price}</span>
                    <span style={{ fontSize: '14px', color: '#5d677c', textDecoration: 'line-through' }}>₹{t.originalPrice}</span>
                    <span style={{ fontSize: '12px', color: '#7d879c' }}>one-time</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      to={`/demo/${t.slug}`}
                      className="btn-primary-pill"
                      style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '14px', textDecoration: 'none' }}
                    >
                      <Eye size={15} /> Live Demo
                    </Link>
                    <Link
                      to="/#pricing"
                      className="btn-secondary-pill"
                      style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '14px', textDecoration: 'none' }}
                    >
                      Select <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}