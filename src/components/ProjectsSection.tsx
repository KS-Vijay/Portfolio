import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import projects from '../data/projects';
import { AnimatedSection } from './AnimatedSection';

const ProjectsSection = () => {
  return (
    <section id="projects" data-section="projects" className="min-h-screen py-20 relative z-10 w-full overflow-hidden">
      <AnimatedSection className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div style={{ color: '#34d399', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>— My Work</div>
          <h2 style={{ color: '#e2f5ef', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, lineHeight: 1.15 }}>
            Projects
          </h2>
          <div style={{ width: '48px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #34d399, #22d3ee)', marginTop: '12px', marginBottom: '40px' }} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.id}
              delay={0.1 + index * 0.15}
              className="w-full h-80 md:h-[420px] xl:h-[480px]"
            >
              <Link to={`/projects/${project.id}`} className="block h-full group">
                <Tilt
                  tiltMaxAngleX={7}
                  tiltMaxAngleY={7}
                  scale={1.03}
                  transitionSpeed={600}
                  glareEnable={true}
                  glareMaxOpacity={0.07}
                  glareColor="#34d399"
                  glarePosition="all"
                  className="will-change-transform h-full"
                >
                  <div 
                    className="relative w-full h-full overflow-hidden flex flex-col justify-end"
                    style={{
                      background: 'rgba(10,22,40,0.75)',
                      border: '1px solid rgba(52,211,153,0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      transition: 'border-color 0.25s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(52,211,153,0.40)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(52,211,153,0.15)'}
                  >
                    <img src={project.screenshots?.[0] || ''} alt={project.title} className="absolute inset-0 w-full h-full object-cover rounded-xl" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent"></div>
                    <div className="relative z-10 p-4 md:p-6 drop-shadow-lg">
                      <h3 className="text-lg md:text-xl font-bold text-[#e2f5ef] mb-2 md:mb-3 group-hover:text-[#34d399] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[rgba(226,245,239,0.55)] mb-2 md:mb-4 leading-relaxed text-xs md:text-sm font-medium">
                        {project.cardDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 bg-[#0a1628]/80 text-[#34d399] text-xs rounded-full border border-[#34d399]/20 backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default ProjectsSection;
