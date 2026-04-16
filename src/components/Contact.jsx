import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Contact({ profile }) {
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.2 });

  const links = [
    { href: profile.linkedin, label: '🔗 LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
    { href: `mailto:${profile.email}`, label: '✉️ Email' },
    { href: `tel:${profile.phone.replace(/\s/g, '')}`, label: '📞 Phone' },
    { href: `https://wa.me/${profile.phone.replace(/\D/g, '')}`, label: '💬 WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
    { href: profile.resumePdf, label: '📄 Download Resume', download: true },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container" ref={ref}>
        <div className={`contact-card sa${visible ? ' visible' : ''}`}>
          <h2>{profile.contactCta}</h2>
          <p>{profile.contactDesc}</p>
          <div className="contact-links">
            {/* Cal.com embed button — same behaviour as Navbar */}
            <button
              className="contact-link"
              data-cal-link="vijay-sundar-nagumalla"
              data-cal-config='{"layout":"month_view"}'
            >
              📅 Grab a Slot
            </button>
            {links.map((link) => (
              <a
                key={link.href}
                className="contact-link"
                href={link.href}
                download={link.download || undefined}
                target={link.target || undefined}
                rel={link.rel || undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
