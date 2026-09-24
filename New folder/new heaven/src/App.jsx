const story = [
  'A celebration of love, family, and the beginning of forever.',
  'With laughter in the air, floral blessings in every corner, and memories waiting to be made.',
  'Join us as we gather under a sky lit with joy and welcome the next chapter of our story.'
];

const details = [
  { label: 'Date', value: 'Saturday, 12 October 2026' },
  { label: 'Time', value: '7:00 PM onwards' },
  { label: 'Venue', value: 'The Royal Courtyard, Gulzaar Palace' },
  { label: 'Dress Code', value: 'Traditional Elegance' }
];

const timeline = [
  { time: '6:30 PM', title: 'Guest Arrival & Welcome Drinks' },
  { time: '7:10 PM', title: 'Grand Entrance' },
  { time: '7:45 PM', title: 'Dinner & Toasts' },
  { time: '8:30 PM', title: 'Live Music & Celebration' }
];

const gallery = ['A', 'B', 'C', 'D'];

export default function App() {
  return (
    <div className="page-shell">
      <header className="hero">
        <nav className="topbar">
          <div className="brand">Gulzaar</div>
          <a href="#rsvp" className="cta-link">RSVP</a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Wedding Invitation</p>
          <h1>
            Aisha <span>&</span> Zayan
          </h1>
          <p className="subtitle">Invite you to celebrate their forever</p>
          <div className="date-badge">12 October 2026</div>
        </div>
      </header>

      <main>
        <section className="intro card">
          <p className="section-kicker">With love and gratitude</p>
          <h2>We are getting married</h2>
          <p>
            Together with our families, we joyfully invite you to witness our wedding
            ceremony and share in a night filled with love, music, and celebration.
          </p>
        </section>

        <section className="details-grid card">
          {details.map((item) => (
            <div key={item.label} className="detail-box">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="story card">
          <p className="section-kicker">Our story</p>
          <div className="story-list">
            {story.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="timeline card">
          <p className="section-kicker">Program</p>
          <div className="timeline-list">
            {timeline.map((event) => (
              <div key={event.time} className="timeline-item">
                <span>{event.time}</span>
                <h3>{event.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="gallery card">
          <p className="section-kicker">Moments</p>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <div key={item} className="photo-frame">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="rsvp" className="rsvp card">
          <p className="section-kicker">RSVP</p>
          <h2>We would love to celebrate with you</h2>
          <a href="mailto:hello@gulzaar.com" className="rsvp-button">
            Confirm your presence
          </a>
        </section>
      </main>
    </div>
  );
}
