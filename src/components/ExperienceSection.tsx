
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      title: 'Senior AI Engineer',
      company: 'TechCorp Industries',
      period: '2022 - Present',
      description: 'Leading AI initiatives and developing machine learning models for autonomous systems.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Inc.',
      period: '2020 - 2022',
      description: 'Built scalable web applications using React, Node.js, and cloud technologies.',
    },
    {
      title: 'Software Engineer',
      company: 'StartupXYZ',
      period: '2019 - 2020',
      description: 'Developed mobile applications and worked on microservices architecture.',
    },
    {
      title: 'Junior Developer',
      company: 'Code Academy',
      period: '2018 - 2019',
      description: 'Started my journey in software development, focusing on web technologies.',
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
    <section id="experience" data-section="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Experience
        </motion.h2>
        
        <div className="relative max-w-6xl mx-auto">
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
              className={`relative flex items-center mb-20 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline dot - perfectly centered on the line */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-space-violet rounded-full border-2 border-space-dark z-10 shadow-lg shadow-space-violet/50"
              ></motion.div>
              
              {/* Content card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className={`bg-space-dark/60 backdrop-blur-md rounded-2xl p-6 max-w-md shadow-xl hover:shadow-2xl hover:shadow-space-violet/20 transition-all duration-300 ${
                  index % 2 === 0 ? 'mr-auto translate-x-16' : 'ml-auto -translate-x-16'
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
    </section>
  );
};

export default ExperienceSection;
