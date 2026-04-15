import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Skills({ skills }) {
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section id="skills" className="skills-section">
      <div className="container" ref={ref}>
        <div className={`sec-label sa${visible ? ' visible' : ''}`}>Capabilities</div>
        <h2 className={`sec-title sa sa-delay-1${visible ? ' visible' : ''}`}>Technical Skills</h2>
        <p className={`sec-sub sa sa-delay-2${visible ? ' visible' : ''}`}>
          Technologies across {skills.length > 0 ? '5' : '0'} production projects
        </p>

        <div className="skill-grid">
          {skills.map((card, i) => {
            const delay = ((i % 5) + 1);
            return (
              <div
                key={card.title}
                className={`skill-card sa sa-delay-${delay}${visible ? ' visible' : ''}`}
              >
                <div className="skill-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <div className="skill-pills">
                  {card.pills.map((pill) => (
                    <span key={pill} className="pill">{pill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
