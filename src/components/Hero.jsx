import { useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Hero({ profile }) {
  const typedText = useTypewriter(profile.typedPhrases);
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.05 });

  return (
    <div className="hero">
      <div className="hero-content" ref={ref}>
        <div className={`hero-badge sa${visible ? ' visible' : ''}`}>
          <span className="dot" />
          {profile.availabilityBadge}
        </div>

        <p className={`hero-greeting sa sa-delay-1${visible ? ' visible' : ''}`}>
          {profile.headline1}
        </p>

        <h1 className={`hero-name sa sa-delay-1${visible ? ' visible' : ''}`}>
          {profile.headlineGrad.split(' ').slice(0, 2).join(' ')}
          <br />
          {profile.headlineGrad.split(' ').slice(2).join(' ')}
        </h1>

        <p className={`hero-subtitle sa sa-delay-2${visible ? ' visible' : ''}`}>
          {profile.headline2}
        </p>

        <div className={`hero-typed-wrap sa sa-delay-2${visible ? ' visible' : ''}`}>
          <span>{typedText}</span>
          <span className="cursor" />
        </div>

        <p className={`hero-desc sa sa-delay-2${visible ? ' visible' : ''}`}>
          {profile.description}
        </p>

        <div className={`hero-tags sa sa-delay-3${visible ? ' visible' : ''}`}>
          {profile.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className={`hero-cta sa sa-delay-4${visible ? ' visible' : ''}`}>
          <a className="btn btn-primary" href={profile.resumePdf} download>
            ↓ Download Resume
          </a>
          <a className="btn btn-outline" href="#projects">View Projects</a>
          <a className="btn btn-outline" href={`mailto:${profile.email}`}>Contact Me</a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </div>
  );
}
