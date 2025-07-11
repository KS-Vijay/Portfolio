
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import TiltedCard from './TiltedCard';
import projects from '../data/projects';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
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
    <div className="container mx-auto" ref={ref}>
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient"
      >
        Projects
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ 
              opacity: 0, 
              y: 50,
              scale: 0.95
            }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              scale: 1
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.3 + index * 0.1,
              ease: "easeOut"
            }}
            className="w-full h-80 md:h-[420px] xl:h-[480px]"
          >
            <Link to={`/projects/${project.id}`} className="block h-full">
              <TiltedCard
                imageSrc={project.screenshots?.[0] || ''}
                altText={project.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={12}
                loading="lazy"
              >
                <div className="rounded-2xl p-4 md:p-6 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-space-pink transition-colors duration-300 drop-shadow-lg">
                    {project.title}
                  </h3>
                  
                  <p className="text-white mb-2 md:mb-4 leading-relaxed text-xs md:text-sm font-medium drop-shadow-lg">
                    {project.cardDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-2 md:px-3 py-1 bg-black/40 text-white text-xs rounded-full border border-white/50 backdrop-blur-sm hover:bg-black/60 transition-all duration-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltedCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
