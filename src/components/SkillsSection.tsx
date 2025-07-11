import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import React from 'react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    'Python', 'Java', 'JavaScript', 'React', 'Machine Learning',
    'TensorFlow', 'PyTorch', 'Git'
  ];

  const imglinks = [
    'https://img.icons8.com/?size=100&id=W3gfKnMhfM6h&format=png&color=000000','https://img.icons8.com/?size=100&id=5OD485koNIrb&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=Nkym0Ujb8VGI&format=png&color=000000','https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=114322&format=png&color=000000','https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=O6SWwpPIM0GB&format=png&color=000000','https://img.icons8.com/?size=100&id=20906&format=png&color=000000'
  ];

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const iconFloatVariants = {
    hidden: { y: 0 },
    visible: {
      y: ["0px", "-20px", "0px"],
      transition: {
        delay: 0.8, // Start after card animates in (0.3 + 0.5)
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Helper to chunk array into rows of N
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  // Responsive grid columns
  // 2 for xs/sm, 3 for sm/md, 4 for md, 6 for lg+
  // We'll use md:grid-cols-4 lg:grid-cols-6
  const mdCols = 4;
  const lgCols = 6;
  const isWindow = typeof window !== 'undefined';
  const [cols, setCols] = useState(mdCols);
  useEffect(() => {
    function updateCols() {
      if (!isWindow) return;
      if (window.innerWidth >= 1024) setCols(lgCols);
      else if (window.innerWidth >= 768) setCols(mdCols);
      else if (window.innerWidth >= 640) setCols(3);
      else setCols(2);
    }
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [isWindow]);

  const skillRows = useMemo(() => chunkArray(skills, cols), [skills, cols]);

  return (
    <section id="skills" data-section="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Skills
        </motion.h2>
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 w-full justify-items-center`}>
          {skillRows.map((row, rowIdx) => {
            const isLastRow = rowIdx === skillRows.length - 1;
            const numCards = row.length;
            // Only center last row if not full and on md+ screens
            let emptyCells = [];
            if (isLastRow && numCards < cols && cols >= 4) {
              const emptyCount = Math.floor((cols - numCards) / 2);
              emptyCells = Array(emptyCount).fill(null);
            }
            return (
              <React.Fragment key={`row-${rowIdx}`}>
                {isLastRow && emptyCells.map((_, i) => (
                  <div key={`empty-${rowIdx}-${i}`} className="hidden md:block" />
                ))}
                {row.map((skill, idx) => (
                  <motion.div
                    key={`skill-${rowIdx}-${idx}-${skill}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover="hover"
                    className="glass-effect rounded-xl p-3 sm:p-4 text-center cursor-pointer group flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36"
                  >
                    <motion.div variants={iconFloatVariants} className="flex justify-center w-full">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-r from-space-purple to-space-violet rounded-full flex items-center justify-center overflow-hidden">
                        <img
                          src={imglinks[skills.indexOf(skill)]}
                          alt={skill + ' logo'}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-space-violet transition-colors duration-300 text-center break-words">
                      {skill}
                    </h3>
                  </motion.div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
