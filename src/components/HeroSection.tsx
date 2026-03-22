import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
const MetaBalls = lazy(() => import('./MetaBalls'));
import DecryptedText from './DecryptedText';
import { Button } from '@/components/ui/button';
import { TypewriterText } from './TypewriterText';

const HeroSection = () => {
  const handleDownloadResume = () => {
    // Create a download link for resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Add your resume file to public folder
    link.download = 'Vijay_KS_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" data-section="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20 relative overflow-hidden">
      <div className="aurora-glow-primary" />
      <div className="aurora-glow-secondary" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6 z-20 relative">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-5xl lg:text-7xl font-black"
          >
            <span className="text-gradient">Hello,</span>
            <br />
            <DecryptedText 
              text="I'm Vijay K S"
              speed={80}
              maxIterations={12}
              sequential={true}
              className="text-aurora-text"
              encryptedClassName="text-gray-400"
            />
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="text-2xl lg:text-3xl font-bold"
          >
            <TypewriterText />
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="text-lg text-gray-300 max-w-md font-medium italic"
          >
            "Between black holes and galaxies lies my curiosity — endlessly falling, never fading."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          >
            <Button
              onClick={handleDownloadResume}
              style={{
                background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                color: '#050d1a',
                fontWeight: 600,
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                letterSpacing: '0.02em',
                transition: 'transform 0.18s, box-shadow 0.18s',
                boxShadow: '0 0 20px rgba(52,211,153,0.25)',
              }}
              className="hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(52,211,153,0.45)]"
            >
              Download Resume
            </Button>
          </motion.div>
        </div>

        {/* Right MetaBalls Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-64 sm:h-[450px] lg:h-[600px] relative z-0"
        >
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-[#34d399]">Loading...</div>}>
            <MetaBalls
              color="#34d399"
              cursorBallColor="#22d3ee"
              speed={0.4}
              animationSize={35}
              ballCount={8}
              clumpFactor={0.6}
              cursorBallSize={3}
              enableMouseInteraction={true}
              hoverSmoothness={0.08}
              enableTransparency={true}
              className="w-full h-full"
            />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
