import React, { useEffect, useRef, useState, useCallback } from 'react';
import framesData from '../framesData.json';
import { drawImageCover } from '../utils/canvasHelper';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function HeroScrollymation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedFramesRef = useRef(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollProgressRef = useRef(0);
  const animFrameIdRef = useRef(null);

  const heroFrames = framesData.hero;

  // Easing for smooth scrolling
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  // Draw frame helper with mobile zoom effect
  const drawCurrentFrame = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgs = imagesRef.current;
    if (!imgs || imgs.length === 0) return;

    const total = heroFrames.length;
    const easedProgress = easeOutQuart(progress);

    let targetIdx = Math.min(total - 1, Math.max(0, Math.floor(easedProgress * total)));

    let imgToDraw = loadedFramesRef.current.has(targetIdx) ? imgs[targetIdx] : null;

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      for (let i = targetIdx - 1; i >= 0; i--) {
        if (loadedFramesRef.current.has(i) && imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0) {
          imgToDraw = imgs[i];
          break;
        }
      }
      if (!imgToDraw) {
        for (let i = targetIdx + 1; i < total; i++) {
          if (loadedFramesRef.current.has(i) && imgs[i] && imgs[i].complete && imgs[i].naturalWidth > 0) {
            imgToDraw = imgs[i];
            break;
          }
        }
      }
    }

    if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
      drawImageCover(ctx, canvas, imgToDraw);
    }
  }, [heroFrames.length]);

  // Preload frames
  useEffect(() => {
    const imgs = heroFrames.map((src, idx) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        loadedFramesRef.current.add(idx);
        if (loadedFramesRef.current.size === heroFrames.length) {
          setIsLoaded(true);
          drawCurrentFrame(0);
        }
      };

      img.onerror = () => {
        console.warn(`Failed to load frame: ${src}`);
        if (loadedFramesRef.current.size + 1 >= heroFrames.length) {
          setIsLoaded(true);
          drawCurrentFrame(0);
        }
      };

      return img;
    });

    imagesRef.current = imgs;

    // Fallback: if no frames loaded within 2 seconds, show anyway
    const fallback = setTimeout(() => {
      setIsLoaded(true);
      drawCurrentFrame(0);
    }, 2000);

    return () => clearTimeout(fallback);
  }, [heroFrames, drawCurrentFrame]);

  // Scroll handling with slower progress
  useEffect(() => {
    const handleScroll = () => {
      if (!isLoaded) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      let progress = 0;

      if (totalScrollable > 0) {
        const currentY = -rect.top;
        progress = Math.max(0, Math.min(1, currentY / totalScrollable));
      } else {
        const docHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        const winHeight = window.innerHeight;
        progress = Math.max(0, Math.min(1, window.scrollY / (docHeight - winHeight)));
      }

      scrollProgressRef.current = progress;
      setScrollProgress(progress);

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(() => {
        drawCurrentFrame(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawCurrentFrame]);

  const textOpacity = Math.max(0, 1 - scrollProgress * 12);
  const textTranslateY = scrollProgress * -60;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section"
      style={{
        position: 'relative',
        height: '300vh',
        background: '#07090e'
      }}
    >
      {!isLoaded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#07090e'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid rgba(212, 175, 55, 0.3)',
              borderTopColor: '#d4af37',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.95,
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(7, 9, 14, 0.18)',
              pointerEvents: 'none'
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '900px',
            textAlign: 'center',
            padding: '0 24px',
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            pointerEvents: textOpacity <= 0.05 ? 'none' : 'auto'
          }}
        >
          <div className="announcement-pill">
            <Sparkles size={14} color="#d4af37" />
            <span style={{ letterSpacing: '0.01em' }}>
              Royal Event Invitation • Online in Minutes
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 3.4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)'
            }}
          >
            Royalty in Every Scroll. <br />
            <span className="gold-text-gradient font-script" style={{ fontWeight: 400, fontSize: '1.3em', letterSpacing: '0.01em' }}>
              Grandeur in Minutes.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.1rem)',
              color: '#d6dae6',
              maxWidth: '640px',
              margin: '0 auto 32px auto',
              lineHeight: 1.6,
              fontWeight: 400,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)'
            }}
          >
            Cinematic invitations, crafted online in minutes — with live RSVP, reveal-the-date, and bespoke music.
          </p>
        </div>

        <div
          className="scroll-indicator-pill"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
          style={{
            opacity: textOpacity > 0.1 ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          <span>Scroll</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </section>
  );
}
