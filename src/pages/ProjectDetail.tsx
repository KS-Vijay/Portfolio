import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import StarField from '../components/StarField';
import Navigation from '../components/Navigation';
import { FaGithub } from 'react-icons/fa';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === projectId);
  const [screenshotIdx, setScreenshotIdx] = useState(0);

  // Always scroll to top when component mounts
  useEffect(() => {
    // Immediate scroll
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Also scroll after a short delay to handle any rendering delays
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-space-dark text-white">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Button onClick={() => navigate(-1)} className="bg-space-violet text-white px-6 py-2 rounded-full">Go Back</Button>
      </div>
    );
  }

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const currentScreenshot = hasScreenshots ? project.screenshots[screenshotIdx] : null;

  const handlePrev = () => {
    setScreenshotIdx((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };
  const handleNext = () => {
    setScreenshotIdx((prev) => (prev + 1) % project.screenshots.length);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-stretch justify-center px-0 py-0 bg-space-dark overflow-hidden">
      {/* Navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50 overflow-visible">
        <Navigation navAnimation={{ duration: 0, delay: 0 }} />
      </div>
      {/* StarField background */}
      <div className="fixed inset-0 z-0">
        <StarField />
      </div>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen pt-[100px]"
      >
        <div className="container mx-auto max-w-7xl bg-space-dark/30 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col gap-10 min-h-[80vh]">
          <h1 className="text-5xl lg:text-6xl font-bold text-gradient mb-4">{project.title}</h1>
          <p className="text-lg text-gray-200 mb-6 max-w-3xl">{project.summary}</p>
          <div className="flex flex-col md:flex-row gap-10 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-space-violet mb-3">Tech Stack</h2>
              <ul className="list-disc list-inside text-lg text-gray-200 space-y-2 ml-4">
                {project.techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-space-violet mb-3">Key Features</h2>
              <ul className="list-disc list-inside text-lg text-gray-200 space-y-2 ml-4">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-6 mb-8 items-center">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-space-violet hover:text-space-pink transition-colors text-3xl" aria-label="GitHub">
              <FaGithub />
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button className="bg-space-pink hover:bg-space-violet text-white px-8 py-3 rounded-full text-lg font-semibold">Live Demo</Button>
              </a>
            )}
          </div>
          {/* Screenshot carousel below links */}
          <div className="w-full flex flex-col items-center justify-center bg-black/30 rounded-2xl p-6 md:p-12 min-h-[400px] mb-4">
            {hasScreenshots ? (
              <div className="relative w-full flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-space-violet/70 hover:bg-space-pink/80 text-white rounded-full p-3 shadow-lg transition-all duration-200 text-3xl"
                  aria-label="Previous screenshot"
                  disabled={project.screenshots.length < 2}
                >
                  &#8592;
                </button>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentScreenshot}
                    src={currentScreenshot}
                    alt={`Screenshot ${screenshotIdx + 1}`}
                    className="rounded-2xl w-full max-h-[600px] object-contain shadow-xl mx-12"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-space-violet/70 hover:bg-space-pink/80 text-white rounded-full p-3 shadow-lg transition-all duration-200 text-3xl"
                  aria-label="Next screenshot"
                  disabled={project.screenshots.length < 2}
                >
                  &#8594;
                </button>
              </div>
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center text-gray-400 italic">
                No screenshots available
              </div>
            )}
          </div>
          <Button
            onClick={() => {
              navigate('/#projects');
            }}
            className="mt-6 bg-space-violet text-white px-8 py-3 rounded-full self-start text-lg"
          >
            Back to Projects
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectDetail; 