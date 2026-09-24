import React, { useState } from 'react';
import { Star, ChevronDown, MessageCircleHeart, HelpCircle, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    quote:
      'Our guests were genuinely spellbound. The cinematic scroll opening, paired with the sitar melody, set the most regal tone for our Udaipur palace wedding. Ten times more luxurious than a paper card.',
    author: 'Shehzadi Alina & Zayd',
    location: 'Taj Lake Palace, Udaipur',
    guests: '480 Guests',
    verified: true,
    rating: 5
  },
  {
    quote:
      'The scratch-to-reveal date card went viral among our friends on WhatsApp! We received 400+ RSVPs directly into our dashboard within 48 hours without calling a single person.',
    author: 'Dr. Kabir & Ananya',
    location: 'ITC Grand Chola, Chennai',
    guests: '410 Guests',
    verified: true,
    rating: 5
  },
  {
    quote:
      'As a luxury wedding planner, I recommend Gulzaar to all our high-profile clients. The visual finish, smooth animations, and Google Maps integration make it the gold standard in Asia.',
    author: 'Tarun Mehra',
    location: 'Elite Bespoke Events, Mumbai',
    guests: '60+ Weddings',
    verified: true,
    rating: 5
  },
  {
    quote:
      'Multi-event RSVP saved us. Separate Haldi, Sangeet and Nikaah lists from one link, and my father who barely uses a phone RSVPed by himself. Live dashboard was addictive.',
    author: 'Harneet & Navjot',
    location: 'Amritsar, Punjab',
    guests: '380 Guests',
    verified: true,
    rating: 5
  },
  {
    quote:
      'Guests across India, UAE and UK opened the invite with zero trouble. Add-to-calendar meant zero "bhaiya kahan aana hai?" calls. Complete peace of mind.',
    author: 'Pooja & Arjun',
    location: 'Dubai, UAE',
    guests: '280 Guests',
    verified: true,
    rating: 5
  },
  {
    quote:
      'We finished the whole invite during a night-shift break — honestly under 15 minutes. By morning we had 140 RSVPs. If this isn\'t the future of weddings, I don\'t know what is.',
    author: 'Simran & Akash',
    location: 'Dehradun, Uttarakhand',
    guests: '220 Guests',
    verified: true,
    rating: 5
  }
];

const STATS = [
  { value: '4.9/5', label: 'Average Guest Rating', sub: '2,000+ verified reviews' },
  { value: '900+', label: 'Royal Celebrations', sub: 'across 14 countries' },
  { value: '7 min', label: 'Average Build Time', sub: 'design-free, instant preview' },
  { value: '₹35k', label: 'Avg. Saved vs Paper', sub: 'vs ₹35k–₹90k card boxes' }
];

const FAQS = [
  {
    q: 'How quickly will our digital invitation link be live?',
    a: 'Instantly. Once you input your celebration details and complete the secure one-time payment, your personalized link (e.g. gulzaar.com/your-name) is generated in under 3 minutes ready to share on WhatsApp.'
  },
  {
    q: 'Can we modify dates, venue, or timings after sharing the link?',
    a: 'Yes, absolutely. You receive unlimited real-time edits from your Gulzaar dashboard. Any change you save updates instantly on the live webpage without affecting your existing link.'
  },
  {
    q: 'Does it work smoothly on all smartphones (iPhone & Android)?',
    a: 'Yes. Gulzaar is optimized with GPU-accelerated canvas animations that run at a buttery 60 FPS across all modern mobile browsers (Safari, Chrome, Samsung Internet) with zero app downloads needed.'
  },
  {
    q: 'How do we track guest RSVPs and dietary preferences?',
    a: 'Each time a guest confirms attendance on your webpage, the response is recorded in your live RSVP dashboard. You can download an Excel/CSV spreadsheet anytime for your caterer and seating team.'
  },
  {
    q: 'Can we upload our own custom music track or voice note?',
    a: 'Yes! On the Royal Grandeur and Imperial Bespoke tiers, you can select from our curated instrumental library (sitar, shehnai, harp, orchestral) or upload your own favorite song or couple voice greeting.'
  }
];

export default function TestimonialsFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section
      id="faq"
      className="content-section"
      style={{
        padding: '120px 24px',
        background: '#07090e',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* TESTIMONIALS SECTION */}
        <div className="section-head">
          <div className="section-overline">
            <MessageCircleHeart size={14} color="#d4af37" />
            <span>Honored Celebrations</span>
          </div>

          <h2 className="section-title">Cherished by Grand Couples</h2>
        </div>

        {/* Trust Stats Band */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '56px'
          }}
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(212, 175, 55, 0.06)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '20px',
                padding: '24px 18px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #fff7df, #d4af37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px'
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ color: '#8c95a8', fontSize: '12px', marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '110px'
          }}
        >
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '32px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} color="#d4af37" fill="#d4af37" />
                  ))}
                </div>
                <p style={{ color: '#d8dee9', fontSize: '15px', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '24px' }}>
                  "{rev.quote}"
                </p>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '15.5px' }}>{rev.author}</div>
                <div style={{ color: '#8c95a8', fontSize: '13px', marginTop: '2px' }}>{rev.location}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '10px',
                    flexWrap: 'wrap'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#2eb086',
                      background: 'rgba(46, 176, 134, 0.12)',
                      border: '1px solid rgba(46, 176, 134, 0.3)',
                      borderRadius: '9999px',
                      padding: '4px 10px'
                    }}
                  >
                    <CheckCircle2 size={12} />
                    Verified Couple
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#aab3c6',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '9999px',
                      padding: '4px 10px'
                    }}
                  >
                    {rev.guests}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ SECTION */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="section-head">
            <div className="section-overline">
              <HelpCircle size={14} color="#d4af37" />
              <span>Everything You Need To Know</span>
            </div>

            <h3 className="section-title" style={{ marginBottom: 0 }}>Frequently Asked Questions</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="#d4af37"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 22px 24px',
                        color: '#a2abbd',
                        fontSize: '14.5px',
                        lineHeight: 1.6
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
