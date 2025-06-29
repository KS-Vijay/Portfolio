import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Machine Learning',
    'TensorFlow', 'PyTorch', 'AWS', 'Docker', 'Kubernetes', 'MongoDB',
    'PostgreSQL', 'GraphQL', 'Redis', 'Microservices', 'DevOps', 'Git'
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

  return (
    <section id="skills" data-section="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Skills
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              className="glass-effect rounded-xl p-4 text-center cursor-pointer group"
            >
              <motion.div variants={iconFloatVariants}>
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-space-purple to-space-violet rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {skill.charAt(0)}
                  </span>
                </div>
              </motion.div>
              <h3 className="text-sm font-semibold text-white group-hover:text-space-violet transition-colors duration-300">
                {skill}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
