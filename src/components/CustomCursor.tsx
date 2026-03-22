import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos   = useRef({ x: -100, y: -100 });
  const ring  = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Trailing ring — indigo tint */}
      <div ref={ringRef} style={{
        position:'fixed', top:0, left:0,
        width:36, height:36, borderRadius:'50%',
        border:'1.5px solid rgba(99,102,241,0.55)',
        pointerEvents:'none', zIndex:9999,
        willChange:'transform',
        transition:'width .15s, height .15s',
      }}/>
      {/* Core dot — emerald glow */}
      <div ref={dotRef} style={{
        position:'fixed', top:0, left:0,
        width:8, height:8, borderRadius:'50%',
        background:'#34d399',
        boxShadow:'0 0 10px 4px rgba(52,211,153,0.45)',
        pointerEvents:'none', zIndex:9999,
        willChange:'transform',
      }}/>
    </>
  );
}
