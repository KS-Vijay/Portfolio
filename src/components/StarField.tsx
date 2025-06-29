
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 50,
      endX: Math.random() * 100,
      endY: Math.random() * 50 + 50,
      delay: Math.random() * 10,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {shootingStars.map((shootingStar) => (
        <motion.div
          key={`shooting-${shootingStar.id}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [`0%`, `${(shootingStar.endX - shootingStar.startX) * 8}px`],
            y: [`0%`, `${(shootingStar.endY - shootingStar.startY) * 8}px`],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: shootingStar.duration,
            delay: shootingStar.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 15 + 10,
            ease: "easeOut",
          }}
        >
          {/* Tail effect */}
          <motion.div
            className="absolute w-8 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"
            style={{
              left: '-32px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
            }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              scaleX: [0, 1, 1, 0],
            }}
            transition={{
              duration: shootingStar.duration,
              delay: shootingStar.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 15 + 10,
              ease: "easeOut",
            }}
          />
        </motion.div>
      ))}
      
      {/* Nebula effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-purple/20 via-transparent to-space-pink/20 animate-pulse"></div>
    </div>
  );
};

export default StarField;
