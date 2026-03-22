
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, useState, useEffect, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import Navigation from '../components/Navigation';
import ScrollReveal from '../components/ScrollReveal';
import FloatingArrow from '../components/FloatingArrow';
import { useLocation } from 'react-router-dom';

const AboutSection = lazy(() => import('../components/AboutSection'));
const ExperienceSection = lazy(() => import('../components/ExperienceSection'));
const SkillsSection = lazy(() => import('../components/SkillsSection'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const StarField = lazy(() => import('../components/StarField'));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // On reload, remove hash and scroll to top
  useEffect(() => {
    const isReload = performance.navigation.type === 1;
    if (isReload && window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (isReload) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (!isLoading && location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.querySelector(`section[id="${sectionId}"]`);
      if (element) {
        const navbarHeight = 80;
        const elementTop = (element as HTMLElement).offsetTop - navbarHeight;
        window.scrollTo({ top: elementTop, behavior: 'smooth' });
      }
    }
  }, [isLoading, location.hash]);

  // Additional hash navigation for when sections might not be ready
  useEffect(() => {
    if (location.hash && !isLoading) {
      const timer = setTimeout(() => {
        const sectionId = location.hash.replace('#', '');
        const element = document.querySelector(`section[id="${sectionId}"]`);
        if (element) {
          const navbarHeight = 80;
          const elementTop = (element as HTMLElement).offsetTop - navbarHeight;
          window.scrollTo({ top: elementTop, behavior: 'smooth' });
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, location.hash]);

  // Handle hash changes after initial load
  useEffect(() => {
    const handleHashChange = () => {
      if (location.hash && !isLoading) {
        const sectionId = location.hash.replace('#', '');
        const element = document.querySelector(`section[id="${sectionId}"]`);
        if (element) {
          const navbarHeight = 80;
          const elementTop = (element as HTMLElement).offsetTop - navbarHeight;
          window.scrollTo({ top: elementTop, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoading, location.hash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1); // 1ms loading animation
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
            
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-space-violet">Loading Section...</div>}>
              <ScrollReveal id="about" className="min-h-screen flex items-center justify-center px-6 py-20" delay={0.2}>
                <AboutSection />
              </ScrollReveal>
              
              <ScrollReveal id="experience" className="min-h-screen flex items-center justify-center px-6 py-20" delay={0.3} direction="left">
                <ExperienceSection />
              </ScrollReveal>
              
              <ScrollReveal id="skills" className="min-h-screen flex items-center justify-center px-6 py-20" delay={0.4} direction="right">
                <SkillsSection />
              </ScrollReveal>
              
              <ScrollReveal id="projects" className="min-h-screen flex items-center justify-center px-6 py-20" delay={0.5}>
                <ProjectsSection />
              </ScrollReveal>
              
              <ScrollReveal id="contact" className="min-h-screen flex items-center justify-center px-6 py-20" delay={0.6}>
                <ContactSection />
              </ScrollReveal>
            </Suspense>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
