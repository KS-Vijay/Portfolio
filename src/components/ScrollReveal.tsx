
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode, useState, useEffect } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  direction = 'up',
  distance = 50
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (ref.current) {
        setElementRect(ref.current.getBoundingClientRect());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial measurement

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  const getAnimationState = () => {
    if (!hasBeenInView && !isInView) {
      // Initial state - not revealed yet
      return getInitialPosition();
    }
    
    if (isInView) {
      // Element is in view - show normally
      return { x: 0, y: 0, opacity: 1 };
    }
    
    // Element has been revealed before but is now out of view
    if (hasBeenInView && !isInView) {
      // Determine if we scrolled past the section (going down) or before it (going up)
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        
        if (scrollY > elementTop + rect.height) {
          // Scrolled past the section (going down) - dismantle downward
          switch (direction) {
            case 'up':
              return { y: -distance, opacity: 0 };
            case 'down':
              return { y: distance, opacity: 0 };
            case 'left':
              return { x: -distance, opacity: 0 };
            case 'right':
              return { x: distance, opacity: 0 };
            default:
              return { y: -distance, opacity: 0 };
          }
        } else {
          // Scrolled before the section (going up) - show initial position
          return getInitialPosition();
        }
      }
    }
    
    return getInitialPosition();
  };

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={getAnimationState()}
      transition={{ 
        duration, 
        delay: (isInView && !hasBeenInView) ? delay : 0,
        ease: [0.17, 0.55, 0.55, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
