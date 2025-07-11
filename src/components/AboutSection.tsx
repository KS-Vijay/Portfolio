import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Instagram } from 'lucide-react';
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Vijay_KS_Resume.pdf';
    link.click();
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KS-Vijay', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vj-ks/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/_._ksvj_._/', label: 'Instagram' },
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
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 45 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Orbital elements - positioned behind main image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute inset-0 animate-spin z-0"
                style={{ animationDuration: '20s', pointerEvents: 'none' }}
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-space-violet rounded-full transform -translate-x-1/2 animate-twinkle"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute inset-0 animate-spin z-0"
                style={{ animationDuration: '30s', pointerEvents: 'none' }}
              >
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-space-pink rounded-full animate-twinkle"></div>
              </motion.div>

              {/* Main profile image container */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotateY: isFlipped ? 180 : 0 
                } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 rounded-full bg-gradient-to-r from-space-purple via-space-violet to-space-pink p-1 animate-float z-10"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                <div className="relative w-full h-full rounded-full bg-space-dark overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front face */}
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      zIndex: 2
                    }}
                  >
                    <motion.img
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      src='/images/p1.webp'
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </motion.div>
                  
                  {/* Back face */}
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    animate={{ rotateY: isFlipped ? 0 : -180 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      zIndex: 1
                    }}
                  >
                    <img
                      src='/images/p2.webp'
                      alt="Profile Alternative"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
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
                Hi, I'm Vijay K S — an aspiring Machine Learning Engineer with a strong interest in space, technology, and building things that make an impact.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-gray-300 leading-relaxed mb-6"
              >
                I enjoy working on real-world problems using code, especially in the fields of AI and automation. I'm currently pursuing my undergraduate studies and actively building projects, participating in hackathons, and learning everything I can about future tech.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg text-gray-300 leading-relaxed mb-8"
              >
                Beyond tech, I'm deeply inspired by space and the unknown — the silence between stars reminds me why curiosity matters. I believe in staying consistent, thinking long-term, and pushing myself to learn and grow every day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-lg text-gray-300 leading-relaxed mb-8"
              >
                Whether it's developing tools that solve real problems or just exploring big ideas, I'm here to build — and to keep getting better.
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
