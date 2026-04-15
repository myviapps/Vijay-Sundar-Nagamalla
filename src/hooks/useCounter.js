import { useState, useEffect, useRef } from 'react';

/**
 * Animated number counter hook.
 * @param {number} target
 * @param {boolean} isVisible — start animation only when true
 * @param {{ duration?: number, isFloat?: boolean }} opts
 * @returns {string} formatted display value
 */
export function useCounter(target, isVisible, { duration = 1500, isFloat = false } = {}) {
  const [display, setDisplay] = useState(isFloat ? '0.0' : '0');
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      if (isFloat) {
        setDisplay(value.toFixed(1));
      } else if (target >= 1000) {
        setDisplay(Math.round(value).toLocaleString());
      } else {
        setDisplay(String(Math.round(value)));
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [isVisible, target, duration, isFloat]);

  return display;
}
