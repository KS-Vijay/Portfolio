
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      title: 'MERN Stack with GenAI',
      company: 'The Angaar Batch & W3Grads',
      period: 'Jun’ 25 - Jul’ 25',
      description: 'Built and deployed full-stack web applications using the MERN stack. Integrated Generative AI models into workflows, enhancing automation and reducing manual processing effort by ~40%.',
    },
    {
      title: 'BTech CSE - 8 CGPA',
      company: 'Lovely Professional University',
      period: '2023 - Present',
      description: 'Leading AI initiatives and developing machine learning models for autonomous systems.',
    },
    {
      title: 'Senior Secondary - 89.4%',
      company: 'KMC Public Sr. Sec. School',
      period: '2022 - 2023',
      description: 'Developed a Flight Management Database System using Python and SQL.',
    },
    {
      title: 'Secondary - 79.6%',
      company: 'KMC Public Sr. Sec. School',
      period: '2020 - 2021',
      description: 'Started my journey in Computer Science',
    },
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

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-20" ref={ref}>
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient"
      >
        Education
      </motion.h2>
      
      <div className="relative max-w-full md:max-w-6xl mx-auto">
        {/* Timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute left-1/2 transform -translate-x-px w-0.5 bg-gradient-to-b from-space-purple via-space-violet to-space-pink h-full origin-top"
        ></motion.div>
        
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.5 + index * 0.1,
              ease: "easeOut"
            }}
            className={`relative flex flex-col md:flex-row items-center mb-10 md:mb-20 ${
              index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            }`}
          >
            {/* Timeline dot - perfectly centered on the line */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-space-violet rounded-full border-2 border-space-dark z-10 shadow-lg shadow-space-violet/50"
            ></motion.div>
            
            {/* Content card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className={`bg-space-dark/60 backdrop-blur-md rounded-2xl p-4 md:p-6 max-w-xs md:max-w-md shadow-xl hover:shadow-2xl hover:shadow-space-violet/20 transition-all duration-300 ${
                index % 2 === 0 ? 'mr-auto md:translate-x-16' : 'ml-auto md:-translate-x-16'
              }`}
            >
              <h3 className="text-xl font-bold text-space-violet mb-2">
                {exp.title}
              </h3>
              <h4 className="text-lg text-gray-300 mb-2 font-semibold">
                {exp.company}
              </h4>
              <p className="text-sm text-space-pink mb-3 font-medium">
                {exp.period}
              </p>
              <p className="text-gray-400">
                {exp.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
