
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollFadeWrapperProps {
  children: ReactNode;
}

const ScrollFadeWrapper = ({ children }: ScrollFadeWrapperProps) => {
  const { scrollY } = useScroll();
  
  // Transform scroll position to opacity - fade starts at 80px (nav height) and completes at 200px
  const opacity = useTransform(scrollY, [0, 80, 200], [1, 0.8, 0]);
  
  return (
    <motion.div
      style={{ opacity }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeWrapper;
