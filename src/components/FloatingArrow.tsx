
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FloatingArrow = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      <motion.button
        onClick={scrollToNext}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="p-3 rounded-full bg-space-violet/20 backdrop-blur-md border border-space-violet/30 hover:bg-space-violet/30 transition-all duration-300"
      >
        <ChevronDown className="w-6 h-6 text-space-violet" />
      </motion.button>
    </motion.div>
  );
};

export default FloatingArrow;
