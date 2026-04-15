import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Format a date string like "2021-05-01" → "May 2021"
 * or accepts "Present"
 */
function fmtDate(dateStr) {
  if (!dateStr || dateStr === 'Present') return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Calculate duration between two dates (start ISO string → end ISO string or "Present")
 * Returns a human-readable string like "3 yrs 2 mos"
 */
function calcDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate === 'Present' ? new Date() : new Date(endDate);

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '< 1 mo';
}

export default function Experience({ experience }) {
  const ref = useRef(null);
  const visible = useIntersectionObserver(ref, { threshold: 0.1 });

  // Auto-calculate total experience from earliest startDate
  const totalYears = (() => {
    const earliest = experience.reduce((earliest, job) => {
      const d = new Date(job.startDate);
      return d < earliest ? d : earliest;
    }, new Date());
    const years = (new Date() - earliest) / (1000 * 60 * 60 * 24 * 365.25);
    return (Math.round(years * 2) / 2).toFixed(1);
  })();

  return (
    <section id="experience" className="exp-section">
      <div className="container" ref={ref}>
        <div className={`sec-label sa${visible ? ' visible' : ''}`}>Career</div>
        <h2 className={`sec-title sa sa-delay-1${visible ? ' visible' : ''}`}>
          Professional Experience
        </h2>
        <p className={`sec-sub sa sa-delay-2${visible ? ' visible' : ''}`}>
          {totalYears}+ years across AI engineering, technical training, and program leadership
        </p>

        <div className="timeline">
          {experience.map((job, i) => {
            const delay = Math.min(i + 1, 5);
            const duration = calcDuration(job.startDate, job.endDate);
            return (
              <div key={job.id} className={`tl-item sa sa-delay-${delay}${visible ? ' visible' : ''}`}>
                <div className="tl-dot" />
                <div className="tl-date">
                  {fmtDate(job.startDate)} – {fmtDate(job.endDate)}
                  <span className="tl-duration">{duration}</span>
                </div>
                <div className="tl-title">{job.title}</div>
                <div className="tl-company">{job.company}</div>
                <ul className="tl-list">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
