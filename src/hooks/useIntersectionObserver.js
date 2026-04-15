import { useState, useEffect } from 'react';

/**
 * Returns true once the element enters the viewport.
 * @param {React.RefObject} ref
 * @param {IntersectionObserverInit} options
 */
export function useIntersectionObserver(ref, options = { threshold: 0.12 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el); // fire once
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options.threshold]);

  return isVisible;
}
