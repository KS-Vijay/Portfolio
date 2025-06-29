
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltedCard from './TiltedCard';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: 'AI-Powered Analytics Platform',
      description: 'A comprehensive machine learning platform that processes real-time data and provides intelligent insights for business decision-making.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop',
      technologies: ['Python', 'TensorFlow', 'React', 'AWS']
    },
    {
      title: 'Quantum Computing Simulator',
      description: 'A web-based quantum computing simulator that allows users to experiment with quantum algorithms and visualize quantum states.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&h=300&fit=crop',
      technologies: ['JavaScript', 'Three.js', 'WebGL', 'Node.js']
    },
    {
      title: 'Space Mission Control Dashboard',
      description: 'A real-time mission control dashboard for tracking spacecraft telemetry, orbital mechanics, and mission-critical systems.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=300&fit=crop',
      technologies: ['React', 'TypeScript', 'WebSockets', 'D3.js']
    }
  ];

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
    <section id="projects" data-section="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient"
        >
          Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
              className="h-96"
            >
              <TiltedCard
                imageSrc={project.image}
                altText={project.title}
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={12}
              >
                <div className="rounded-2xl p-6 h-full flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-space-pink transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-200 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
