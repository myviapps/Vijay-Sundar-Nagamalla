import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCounter } from '../hooks/useCounter';

function StatItem({ stat, isVisible }) {
  const count = useCounter(stat.value, isVisible, { isFloat: stat.isFloat });

  return (
    <div className="stat">
      <div className="stat-num">
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function StatsBar({ stats }) {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });

  return (
    <div className="stats-section">
      <div className={`stats-grid sa${isVisible ? ' visible' : ''}`} ref={ref} id="statsGrid">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
}
