
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import React from 'react';

interface NavigationProps {
  navAnimation?: {
    duration?: number;
    delay?: number;
  };
}

const Navigation = React.memo(({ navAnimation }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Get In Touch', special: true },
  ];

  const location = useLocation();

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
    // Find the actual <section> element with the id
    const element = document.querySelector(`section[id="${sectionId}"]`);
    if (element) {
      const navbarHeight = 80;
      const elementTop = (element as HTMLElement).offsetTop - navbarHeight;
      window.scrollTo({ 
        top: elementTop, 
        behavior: 'smooth' 
      });
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
      initial={navAnimation?.duration === 0 ? false : { y: -40, opacity: 0 }}
      animate={navAnimation?.duration === 0 ? false : { y: 0, opacity: 1 }}
      transition={navAnimation?.duration === 0 ? {} : {
        duration: navAnimation?.duration ?? 0.25,
        delay: navAnimation?.delay ?? 0,
      }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out p-4 sm:p-6 ${
        isScrolled ? 'bg-[#050d1a]/70 backdrop-blur-lg border-b border-[#34d399]/10' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo on the left */}
        <motion.div 
          initial={navAnimation?.duration === 0 ? false : { scale: 0, opacity: 0 }}
          animate={navAnimation?.duration === 0 ? false : { scale: 1, opacity: 1 }}
          transition={navAnimation?.duration === 0 ? {} : { duration: 0.6, delay: 1.4 }}
          className="px-4 py-2 cursor-pointer"
          onClick={() => {
            if (location.pathname === '/') {
              handleNavItemClick('hero');
            }
          }}
        >
          <span className="text-2xl font-black text-white">VJ</span>
        </motion.div>

        {/* Hamburger menu for mobile */}
        <div className="relative sm:hidden z-50">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34d399] relative z-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {sidebarOpen ? (
              <X className="w-7 h-7 text-white transition-transform duration-300" />
            ) : (
              <Menu className="w-7 h-7 text-white transition-transform duration-300" />
            )}
          </button>
          {/* Dropdown menu for mobile */}
          {sidebarOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0a1628] border border-[#34d399]/20 rounded-lg shadow-lg py-4 z-50 flex flex-col gap-2">
              {navItems.map((item) => (
                location.pathname === '/' ? (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavItemClick(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-[90%] mx-auto text-center px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      activeSection === item.id
                        ? item.special
                          ? 'bg-[rgba(52,211,153,0.2)] text-[#34d399] border border-[rgba(52,211,153,0.6)]'
                          : 'text-[#34d399]'
                        : item.special
                        ? 'bg-[rgba(52,211,153,0.1)] text-[#34d399] border border-[rgba(52,211,153,0.3)] hover:bg-[rgba(52,211,153,0.2)] hover:border-[rgba(52,211,153,0.6)]'
                        : 'text-[rgba(226,245,239,0.55)] hover:text-[#e2f5ef] hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.id}
                    to={{ pathname: '/', hash: '#' + item.id }}
                    replace
                    onClick={() => setSidebarOpen(false)}
                    className={`w-[90%] mx-auto text-center px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      item.special
                        ? 'bg-[rgba(52,211,153,0.1)] text-[#34d399] border border-[rgba(52,211,153,0.3)] hover:bg-[rgba(52,211,153,0.2)] hover:border-[rgba(52,211,153,0.6)]'
                        : 'text-[rgba(226,245,239,0.55)] hover:text-[#e2f5ef] hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>

        {/* Navigation items on the right (hidden on mobile) */}
        <motion.div 
          initial={navAnimation?.duration === 0 ? false : { scale: 0, opacity: 0 }}
          animate={navAnimation?.duration === 0 ? false : { scale: 1, opacity: 1 }}
          transition={navAnimation?.duration === 0 ? {} : { duration: 0.6, delay: 1.6 }}
          className="px-8 py-4 hidden sm:block"
        >
          <nav>
            <ul className="flex gap-8 list-none">
              {navItems.map((item) => (
                <li key={item.id}>
                  {location.pathname === '/' ? (
                    <button
                      onClick={() => handleNavItemClick(item.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                        activeSection === item.id
                          ? item.special
                            ? 'bg-[rgba(52,211,153,0.2)] text-[#34d399] border border-[rgba(52,211,153,0.6)]'
                            : 'text-[#34d399]'
                          : item.special
                          ? 'bg-[rgba(52,211,153,0.1)] text-[#34d399] border border-[rgba(52,211,153,0.3)] hover:bg-[rgba(52,211,153,0.2)] hover:border-[rgba(52,211,153,0.6)]'
                          : 'text-[rgba(226,245,239,0.55)] hover:text-[#e2f5ef] hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={{ pathname: '/', hash: '#' + item.id }}
                      replace
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                        item.special
                          ? 'bg-[rgba(52,211,153,0.1)] text-[#34d399] border border-[rgba(52,211,153,0.3)] hover:bg-[rgba(52,211,153,0.2)] hover:border-[rgba(52,211,153,0.6)]'
                          : 'text-[rgba(226,245,239,0.55)] hover:text-[#e2f5ef] hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </motion.nav>
  );
});

export default Navigation;
