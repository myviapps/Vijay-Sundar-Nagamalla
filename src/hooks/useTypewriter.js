import { useState, useEffect, useRef } from 'react';

/**
 * Typewriter effect hook. Cycles through phrases with type + delete animation.
 * @param {string[]} phrases
 * @param {{ typeSpeed?: number, deleteSpeed?: number, pauseMs?: number }} opts
 * @returns {{ text: string }}
 */
export function useTypewriter(phrases, { typeSpeed = 80, deleteSpeed = 40, pauseMs = 2000 } = {}) {
  const [text, setText] = useState('');
  const state = useRef({ pIdx: 0, cIdx: 0, deleting: false });

  useEffect(() => {
    let timer;

    function tick() {
      const { pIdx, cIdx, deleting } = state.current;
      const phrase = phrases[pIdx];

      if (!deleting) {
        const next = cIdx + 1;
        setText(phrase.slice(0, next));
        state.current.cIdx = next;

        if (next === phrase.length) {
          state.current.deleting = true;
          timer = setTimeout(tick, pauseMs);
        } else {
          timer = setTimeout(tick, typeSpeed);
        }
      } else {
        const next = cIdx - 1;
        setText(phrase.slice(0, next));
        state.current.cIdx = next;

        if (next === 0) {
          state.current.deleting = false;
          state.current.pIdx = (pIdx + 1) % phrases.length;
          timer = setTimeout(tick, 300);
        } else {
          timer = setTimeout(tick, deleteSpeed);
        }
      }
    }

    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [phrases, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
