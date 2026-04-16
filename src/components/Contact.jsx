import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Contact({ profile }) {
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.2 });

  const links = [
    { href: profile.calLink, label: '📅 Grab a Slot', target: '_blank', rel: 'noopener noreferrer' },
    { href: profile.linkedin, label: '🔗 LinkedIn', target: '_blank', rel: 'noopener noreferrer' },
    { href: `mailto:${profile.email}`, label: `✉️ ${profile.email}` },
    { href: `tel:${profile.phone.replace(/\s/g, '')}`, label: `📞 ${profile.phone}` },
    { href: profile.resumePdf, label: '📄 Download Resume', download: true },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container" ref={ref}>
        <div className={`contact-card sa${visible ? ' visible' : ''}`}>
          <h2>{profile.contactCta}</h2>
          <p>{profile.contactDesc}</p>
          <div className="contact-links">
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
