import { useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FILTER_TABS = [
  { key: 'all',     label: 'All Projects' },
  { key: 'ai',      label: '🤖 AI / ML' },
  { key: 'fintech', label: '🏦 FinTech' },
  { key: 'edtech',  label: '🎓 EdTech' },
  { key: 'saas',    label: '🛠️ SaaS' },
];

function ProjectCard({ proj, visible, idx }) {
  const delay = Math.min(idx + 1, 5);
  return (
    <div className={`proj-card ${proj.color} sa sa-delay-${delay}${visible ? ' visible' : ''}`}>
      <div className="proj-header">
        <span className={`proj-badge badge-${proj.color}`}>{proj.badge}</span>
        <span className={`proj-status status-${proj.status}`}>
          <span className="sdot" />
          {proj.statusLabel}
        </span>
      </div>

      <h3>{proj.title}</h3>
      <p className="proj-stack">{proj.stack}</p>
      <p className="proj-impact">{proj.impact}</p>

      <ul className="proj-list">
        {proj.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="proj-footer">
        <a
          className="proj-link"
          href={proj.link}
          target={proj.link === '#' ? undefined : '_blank'}
          rel="noreferrer"
        >
          View Project →
        </a>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.05 });

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.filter.includes(activeFilter));

  return (
    <section id="projects" className="projects-section">
      <div className="container" ref={ref}>
        <div className={`sec-label sa${visible ? ' visible' : ''}`}>Portfolio</div>
        <h2 className={`sec-title sa sa-delay-1${visible ? ' visible' : ''}`}>
          AI &amp; Full-Stack Projects
        </h2>
        <p className={`sec-sub sa sa-delay-2${visible ? ' visible' : ''}`}>
          {projects.length} production-grade platforms built from architecture to deployment
        </p>

        {/* Filter Tabs */}
        <div className={`filter-tabs sa sa-delay-2${visible ? ' visible' : ''}`}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab${activeFilter === tab.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="proj-grid">
          {filtered.map((proj, idx) => (
            <ProjectCard key={proj.id} proj={proj} visible={visible} idx={idx} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--sm)', textAlign: 'center', padding: '2rem' }}>
            No projects match this filter yet.
          </p>
        )}
      </div>
    </section>
  );
}
