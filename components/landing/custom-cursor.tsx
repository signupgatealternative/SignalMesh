'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx - 5 + 'px';
        cursorRef.current.style.top = my - 5 + 'px';
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx - 16 + 'px';
        ringRef.current.style.top = ry - 16 + 'px';
      }
      requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animRing();

    const buttons = document.querySelectorAll('button, a, input');
    buttons.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (cursorRef.current) cursorRef.current.style.transform = 'scale(2.2)';
        if (ringRef.current) ringRef.current.style.transform = 'scale(1.3)';
      });
      el.addEventListener('mouseleave', () => {
        if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
        if (ringRef.current) ringRef.current.style.transform = 'scale(1)';
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      buttons.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={ringRef} className="cursor-ring"></div>
    </>
  );
}
