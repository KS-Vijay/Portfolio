import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number;
  size: number; speed: number; opacity: number;
  hue: 'white' | 'emerald' | 'teal';
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 240 stars: mostly white, a few colored to echo the aurora palette
    starsRef.current = Array.from({ length: 240 }, () => {
      const layer = Math.random();
      const rand = Math.random();
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 4,
        size:    layer < 0.4 ? 0.5 : layer < 0.75 ? 1.0 : 1.7,
        speed:   layer < 0.4 ? 0.06 : layer < 0.75 ? 0.15 : 0.28,
        opacity: layer < 0.4 ? 0.35 : layer < 0.75 ? 0.6 : 0.85,
        hue:     rand < 0.07 ? 'emerald' : rand < 0.13 ? 'teal' : 'white',
      };
    });

    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of starsRef.current) {
        const rawY = (star.y - scrollYRef.current * star.speed) % canvas.height;
        const drawY = rawY < 0 ? rawY + canvas.height : rawY;
        const color =
          star.hue === 'emerald' ? `rgba(52,211,153,${star.opacity})`
          : star.hue === 'teal'  ? `rgba(34,211,238,${star.opacity})`
          : `rgba(226,245,239,${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
