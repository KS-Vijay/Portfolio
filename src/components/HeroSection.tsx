import { motion } from 'framer-motion';
import { Suspense } from 'react';
import MetaBalls from './MetaBalls';
import DecryptedText from './DecryptedText';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const handleDownloadResume = () => {
    // Create a download link for resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Add your resume file to public folder
    link.download = 'John_Doe_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" data-section="hero" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="space-y-6 z-20 relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-5xl lg:text-7xl font-black"
          >
            <span className="text-gradient">Hello,</span>
            <br />
            <DecryptedText 
              text="I'm John Doe"
              speed={80}
              maxIterations={12}
              sequential={true}
              className="text-white"
              encryptedClassName="text-gray-400"
            />
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-2xl lg:text-3xl text-space-violet font-bold"
          >
            Full Stack Developer & AI Engineer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-lg text-gray-300 max-w-md font-medium italic"
          >
            "The universe is not only stranger than we imagine, it is stranger than we can imagine."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Button
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-space-purple to-space-violet hover:from-space-violet hover:to-space-pink text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105"
            >
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Right MetaBalls Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-[450px] lg:h-[600px] relative z-0"
        >
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-space-violet">Loading...</div>}>
            <MetaBalls
              color="#8b5cf6"
              cursorBallColor="#ec4899"
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
