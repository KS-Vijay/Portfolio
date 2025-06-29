
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import StarField from '../components/StarField';
import Navigation from '../components/Navigation';
import ScrollReveal from '../components/ScrollReveal';
import FloatingArrow from '../components/FloatingArrow';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="loading-screen"
          >
            <div className="loader"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-space-dark overflow-x-hidden"
      >
        {/* Star Field Background */}
        <div className="fixed inset-0 z-0">
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </div>

        {/* Navigation - Fixed and always visible */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>

        {/* Floating Arrow */}
        <FloatingArrow />

        {/* Main Content with proper top padding to avoid navbar overlap */}
        <div className="relative z-10 pt-[72px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <HeroSection />
            
            <ScrollReveal delay={0.2}>
              <AboutSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.3} direction="left">
              <ExperienceSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.4} direction="right">
              <SkillsSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.5}>
              <ProjectsSection />
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <ContactSection />
            </ScrollReveal>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
