'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => revObs.observe(el));

    return () => revObs.disconnect();
  }, []);

  return null;
}
