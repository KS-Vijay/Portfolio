
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Get In Touch', special: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Update scroll state for background blur
      setIsScrolled(window.scrollY > 20);

      // Find the current section
      const sections = navItems.map(item => document.getElementById(item.id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== navItems[i].id) {
            setActiveSection(navItems[i].id);
            console.log('Active section changed to:', navItems[i].id);
          }
          break;
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    console.log('Navigation: Attempting to scroll to section:', sectionId);
    
    const element = document.getElementById(sectionId);
    
    if (element) {
      const navbarHeight = 80;
      const elementTop = element.offsetTop - navbarHeight;
      
      window.scrollTo({ 
        top: elementTop, 
        behavior: 'smooth' 
      });
      
      // Update active section immediately for visual feedback
      setActiveSection(sectionId);
    } else {
      console.error('Element not found for section:', sectionId);
    }
  };

  const handleNavItemClick = (sectionId: string) => {
    console.log('Navigation: Nav item clicked:', sectionId);
    scrollToSection(sectionId);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out p-6 ${
        isScrolled ? 'bg-space-dark/70 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo on the left */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="px-4 py-2 cursor-pointer"
          onClick={() => handleNavItemClick('hero')}
        >
          <span className="text-2xl font-black text-white">VJ</span>
        </motion.div>

        {/* Navigation items on the right */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="px-8 py-4"
        >
          <nav>
            <ul className="flex gap-8 list-none">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavItemClick(item.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      activeSection === item.id
                        ? item.special
                          ? 'bg-space-violet text-white border border-space-violet'
                          : 'bg-space-violet/20 text-space-violet border border-space-violet/30'
                        : item.special
                        ? 'border border-space-violet text-space-violet hover:bg-space-violet hover:text-white'
                        : 'text-white hover:text-space-violet hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
