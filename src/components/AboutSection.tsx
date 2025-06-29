
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Instagram } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'John_Doe_Resume.pdf';
    link.click();
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      rotateX: -90,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: 90,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="exit"
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient perspective-1000"
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 45 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-80 h-80 rounded-full bg-gradient-to-r from-space-purple via-space-violet to-space-pink p-1 animate-float"
              >
                <div className="w-full h-full rounded-full bg-space-dark flex items-center justify-center overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>
              
              {/* Orbital elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: '20s' }}
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-space-violet rounded-full transform -translate-x-1/2 animate-twinkle"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: '30s' }}
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-space-pink rounded-full animate-twinkle"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-300 leading-relaxed mb-6"
              >
                I'm a passionate Full Stack Developer and AI Engineer with over 5 years of experience in creating innovative solutions that bridge the gap between cutting-edge technology and real-world applications.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-gray-300 leading-relaxed mb-6"
              >
                My journey in the cosmos of code began with a fascination for problem-solving and has evolved into a deep expertise in machine learning, web development, and cloud architecture.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg text-gray-300 leading-relaxed mb-8"
              >
                When I'm not coding, you'll find me exploring the latest in AI research, contributing to open-source projects, or stargazing—both literally and metaphorically.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Button
                    onClick={handleDownloadResume}
                    className="bg-gradient-to-r from-space-purple to-space-violet hover:from-space-violet hover:to-space-pink text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Download Resume
                  </Button>
                </motion.div>
                
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                      className="p-3 rounded-full bg-space-purple/20 border border-space-purple/30 hover:bg-space-violet hover:border-space-violet hover:scale-110 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-space-violet group-hover:text-white transition-colors duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
