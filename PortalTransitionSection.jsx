import React, { useEffect, useRef, useState, useCallback } from 'react';
import framesData from '../framesData.json';
import { drawImageContain } from '../utils/canvasHelper';
import { Key, Sparkles, MapPin, Music, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PortalTransitionSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const phoneRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const animFrameIdRef = useRef(null);

  const [phoneSize, setPhoneSize] = useState({ w: 400, h: 694 });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const computeSize = () => {
      const parent = phoneRef.current ? phoneRef.current.parentElement : null;
      const availW = parent ? parent.clientWidth : window.innerWidth;
      const availH = Math.min(window.innerHeight * 0.96, 960);
      // Screen (inner area, bezel padding 11px a side) matches the mobile footage ratio 9:16,
      // so the video fills the phone screen edge-to-edge with zero letterbox bars.
      const targetW = Math.min(availW * 0.85, (availH - 22) * (9 / 16), 640);
      const screenH = Math.round((targetW - 22) * (16 / 9));
      setPhoneSize({
        w: Math.round(targetW),
        h: screenH + 22
      });
    };
    computeSize();
    window.addEventListener('resize', computeSize);
    return () => window.removeEventListener('resize', computeSize);
  }, []);

  const portalFrames = framesData.mobile;

  // Frame drawer with target or closest loaded frame fallback
  const drawCurrentFrame = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgs = imagesRef.current;
    if (!imgs || imgs.length === 0) return;

    const total = portalFrames.length;
    let targetIdx = Math.min(total - 1, Math.max(0, Math.floor(progress * total)));

    // Find target or closest loaded frame
    let imgToDraw = imgs[targetIdx];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      // Search backwards
      for (let i = targetIdx - 1; i >= 0; i--) {
        if (imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0) {
          imgToDraw = imgs[i];
          break;
        }
      }
      // Search forwards
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        for (let i = targetIdx + 1; i < total; i++) {
          if (imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0) {
            imgToDraw = imgs[i];
            break;
          }
        }
      }
    }

    if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
      drawImageContain(ctx, canvas, imgToDraw);
    }
  }, [portalFrames.length]);

  // Preload portal frames
  useEffect(() => {
    const imgs = portalFrames.map((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (idx === 0 || idx === Math.floor(scrollProgressRef.current * portalFrames.length)) {
          drawCurrentFrame(scrollProgressRef.current);
        }
      };
      return img;
    });
    imagesRef.current = imgs;

    // Draw frame 0 immediately
    const timer = setTimeout(() => {
      drawCurrentFrame(0);
    }, 60);

    return () => clearTimeout(timer);
  }, [portalFrames, drawCurrentFrame]);

  // Scroll handler with requestAnimationFrame (desktop sticky scrub)
  useEffect(() => {
    if (isMobile) return; // mobile auto-plays the footage instead (see effect below)

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentY = -rect.top;
      const progress = Math.max(0, Math.min(1, currentY / totalScrollable));
      scrollProgressRef.current = progress;
      setScrollProgress(progress);

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      animFrameIdRef.current = requestAnimationFrame(() => {
        drawCurrentFrame(progress);
      });
    };

    const handleResize = () => {
      drawCurrentFrame(scrollProgressRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawCurrentFrame, isMobile]);

  // Mobile: auto-play the footage inside the phone (no sticky scrub on small screens)
  useEffect(() => {
    if (!isMobile) return;
    const total = portalFrames.length;
    if (!total) return;

    let idx = Math.floor(scrollProgressRef.current * total);
    let visible = true;
    let observer;
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
      observer.observe(containerRef.current);
    }

    const id = setInterval(() => {
      if (!visible) return;
      idx = (idx + 1) % total;
      scrollProgressRef.current = idx / total;
      drawCurrentFrame(idx / total);
    }, 60);

    return () => { clearInterval(id); if (observer) observer.disconnect(); };
  }, [isMobile, portalFrames.length, drawCurrentFrame]);

  return (
    <section
      id="features"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '300vh', // 300vh provides a smooth, deliberate scrub for 179 frames
        background: '#07090e',
        zIndex: 5
      }}
    >
      {/* Sticky Viewport Container */}
      <div
        className="portal-sticky"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Split Grid: Canvas on the Left/Center, Text on the RIGHT */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            alignItems: 'center',
            padding: '0 5vw',
            gap: '40px',
            zIndex: 10
          }}
          className="portal-grid"
        >
          {/* Smartphone Mockup - Taj Mahal Cinematic Scrollymation inside the phone screen */}
          <div
            ref={phoneRef}
            style={{
              position: 'relative',
              width: `${phoneSize.w}px`,
              height: `${phoneSize.h}px`,
              margin: '0 auto',
              background:
                'linear-gradient(150deg, #2b3040 0%, #15181f 38%, #0a0c12 72%, #07080d 100%)',
              borderRadius: '46px',
              padding: '11px',
              border: '1px solid rgba(212, 175, 55, 0.38)',
              boxShadow:
                '0 45px 100px -18px rgba(0, 0, 0, 0.95), 0 0 70px rgba(212, 175, 55, 0.18), 0 22px 40px -20px rgba(212, 175, 55, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.07), inset 0 1px 3px rgba(255, 255, 255, 0.12), inset 0 -2px 5px rgba(0, 0, 0, 0.55)',
              display: 'flex'
            }}
          >
            {/* Metal rails - top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '18px',
                right: '18px',
                height: '1px',
                borderRadius: '46px 46px 0 0',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)'
              }}
            />
            {/* Metal rails - bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '18px',
                right: '18px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.7), transparent)'
              }}
            />
            {/* Metal rails - left */}
            <div
              style={{
                position: 'absolute',
                top: '26px',
                bottom: '26px',
                left: 0,
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)'
              }}
            />
            {/* Metal rails - right */}
            <div
              style={{
                position: 'absolute',
                top: '26px',
                bottom: '26px',
                right: 0,
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.10), transparent)'
              }}
            />
            {/* Volume up */}
            <div
              style={{
                position: 'absolute',
                left: '-4px',
                top: '218px',
                width: '4px',
                height: '42px',
                borderRadius: '3px',
                background: 'linear-gradient(90deg, #4a5162 0%, #1d212c 45%, #0a0c12 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1px 1px rgba(0,0,0,0.6)'
              }}
            />
            {/* Volume down */}
            <div
              style={{
                position: 'absolute',
                left: '-4px',
                top: '268px',
                width: '4px',
                height: '54px',
                borderRadius: '3px',
                background: 'linear-gradient(90deg, #4a5162 0%, #1d212c 45%, #0a0c12 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1px 1px rgba(0,0,0,0.6)'
              }}
            />
            {/* Power */}
            <div
              style={{
                position: 'absolute',
                right: '-4px',
                top: '238px',
                width: '4px',
                height: '68px',
                borderRadius: '3px',
                background: 'linear-gradient(270deg, #4a5162 0%, #1d212c 45%, #0a0c12 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1px 1px rgba(0,0,0,0.6)'
              }}
            />

            {/* Phone screen */}
            <div
              style={{
                position: 'relative',
                flex: '1',
                borderRadius: '34px',
                overflow: 'hidden',
                background: '#020305',
                boxShadow:
                  'inset 0 0 0 1px rgba(255, 255, 255, 0.07), inset 0 0 18px rgba(0, 0, 0, 0.85), 0 0 0 2px rgba(212, 175, 55, 0.10)'
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  position: 'absolute',
                  top: '9px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '104px',
                  height: '28px',
                  borderRadius: '14px',
                  background: 'linear-gradient(180deg, #131722 0%, #05070c 100%)',
                  boxShadow:
                    'inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -1px 3px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '9px',
                  zIndex: 6
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #4a5264, #0a0c12 72%)',
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.12)'
                  }}
                />
              </div>

              {/* Screen glass glare */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 16%, transparent 30%, transparent 62%, rgba(255,255,255,0.03) 78%, transparent 100%), linear-gradient(295deg, rgba(255,255,255,0.05) 0%, transparent 26%)',
                  pointerEvents: 'none',
                  zIndex: 4
                }}
              />

              {/* Gold accent ring around the screen glass */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '34px',
                  border: '1px solid rgba(212, 175, 55, 0.16)',
                  pointerEvents: 'none',
                  zIndex: 6
                }}
              />

              {/* Bottom chin details - speaker grille + charging port */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '44px',
                  height: '3px',
                  borderRadius: '2px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  boxShadow: '0 1px 0 rgba(255, 255, 255, 0.10)',
                  zIndex: 6
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  left: 'calc(50% - 62px)',
                  width: '16px',
                  height: '3px',
                  borderRadius: '1.5px',
                  background: 'rgba(0, 0, 0, 0.55)',
                  zIndex: 6
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  right: 'calc(50% - 62px)',
                  width: '16px',
                  height: '3px',
                  borderRadius: '1.5px',
                  background: 'rgba(0, 0, 0, 0.55)',
                  zIndex: 6
                }}
              />

              {/* The Taj Mahal Scrollymation Canvas */}
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />

              {/* Interactive Live Scrollymation Indicator */}

              {/* Home indicator bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '112px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.55)',
                  zIndex: 5
                }}
              />
            </div>
          </div>

          {/* Right Text Column (Per User: "Place the text in the right side of next section image") */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '20px 0'
            }}
          >
            {/* Category Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#f3e5ab',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                width: 'fit-content',
                marginBottom: '18px'
              }}
            >
              <Sparkles size={13} />
              <span>The Royal Portal</span>
            </div>

            {/* Title */}
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '18px'
              }}
            >
              Unveil Your Story <br />
              <span className="gold-text-gradient font-script" style={{ fontWeight: 400, fontSize: '1.1em', letterSpacing: '0.01em' }}>
                Through an Enchanted Gateway
              </span>
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '16.5px',
                lineHeight: 1.65,
                color: '#b8bece',
                marginBottom: '28px',
                fontWeight: 400
              }}
            >
              Paper cards get misplaced; static PDFs get overlooked. Gulzaar invites your guests 
              on an unforgettable journey. As they open your link, the wooden keyhole zooms open 
              to unveil your celebration nestled in timeless royal beauty.
            </p>

            {/* Feature List Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    padding: '8px',
                    borderRadius: '10px',
                    color: '#d4af37',
                    display: 'flex'
                  }}
                >
                  <Key size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>
                    Enchanted Keyhole Flythrough
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#9ba3b8', lineHeight: 1.4 }}>
                    Guests unlock your celebration with every scroll, entering an enchanted sunlit world.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    padding: '8px',
                    borderRadius: '10px',
                    color: '#d4af37',
                    display: 'flex'
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>
                    Scratch-to-Reveal Ceremony Date
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#9ba3b8', lineHeight: 1.4 }}>
                    A gold foil scratch card with sparkling particles makes revealing the date a joyful surprise.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    padding: '8px',
                    borderRadius: '10px',
                    color: '#d4af37',
                    display: 'flex'
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>
                    1-Click Google Maps & Calendar Sync
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#9ba3b8', lineHeight: 1.4 }}>
                    Direct Uber / Google Maps routing and calendar integration ensures zero lost guests.
                  </p>
                </div>
              </div>
            </div>

            {/* Create CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary-pill"
                style={{ width: 'fit-content' }}
              >
                <span>Create My Invitation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 20px !important;
            gap: 28px !important;
            height: auto !important;
            align-content: start !important;
          }
          .portal-sticky {
            position: relative !important;
            height: auto !important;
            overflow: visible !important;
            align-items: flex-start !important;
            padding: 40px 0 48px !important;
          }
          #features {
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
