import React, { useState, useEffect, useMemo } from 'react';
import { AnimatedSection } from './AnimatedSection';

const SkillsSection = () => {
  const skills = [
    'Python', 'Java', 'JavaScript', 'C++', 'Machine Learning',
    'TensorFlow', 'PyTorch', 'Git'
  ];

  const imglinks = [
    'https://img.icons8.com/?size=100&id=W3gfKnMhfM6h&format=png&color=000000', 'https://img.icons8.com/?size=100&id=5OD485koNIrb&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=Nkym0Ujb8VGI&format=png&color=000000', 'https://img.icons8.com/?size=100&id=TpULddJc4gTh&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=114322&format=png&color=000000', 'https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=O6SWwpPIM0GB&format=png&color=000000', 'https://img.icons8.com/?size=100&id=20906&format=png&color=000000'
  ];

  function chunkArray(arr: any[], size: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  const mdCols = 4;
  const lgCols = 6;
  const isWindow = typeof window !== 'undefined';
  const [cols, setCols] = useState(mdCols);
  useEffect(() => {
    function updateCols() {
      if (!isWindow) return;
      if (window.innerWidth >= 1024) setCols(lgCols);
      else if (window.innerWidth >= 768) setCols(mdCols);
      else if (window.innerWidth >= 640) setCols(3);
      else setCols(2);
    }
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [isWindow]);

  const skillRows = useMemo(() => chunkArray(skills, cols), [skills, cols]);

  return (
    <section id="skills" data-section="skills" className="min-h-screen py-20 relative z-10 w-full overflow-hidden">
      <AnimatedSection className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div style={{ color: '#34d399', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>— What I know</div>
          <h2 style={{ color: '#e2f5ef', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, lineHeight: 1.15 }}>
            Skills
          </h2>
          <div style={{ width: '48px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #34d399, #22d3ee)', marginTop: '12px', marginBottom: '40px' }} />
        </div>
        
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 w-full justify-items-center`}>
          {skillRows.map((row, rowIdx) => {
            const isLastRow = rowIdx === skillRows.length - 1;
            const numCards = row.length;
            let emptyCells = [];
            if (isLastRow && numCards < cols && cols >= 4) {
              const emptyCount = Math.floor((cols - numCards) / 2);
              emptyCells = Array(emptyCount).fill(null);
            }
            return (
              <React.Fragment key={`row-${rowIdx}`}>
                {isLastRow && emptyCells.map((_, i) => (
                  <div key={`empty-${rowIdx}-${i}`} className="hidden md:block" />
                ))}
                {row.map((skill, idx) => (
                  <AnimatedSection
                    key={`skill-${rowIdx}-${idx}-${skill}`}
                    delay={(rowIdx * cols + idx) * 0.05}
                    className="flex flex-col items-center justify-center w-32 h-32 sm:w-36 sm:h-36"
                  >
                    <div 
                      className="group flex flex-col items-center justify-center w-full h-full relative overflow-hidden"
                      style={{
                        background: 'rgba(52,211,153,0.06)',
                        border: '1px solid rgba(52,211,153,0.18)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '8px',
                        padding: '5px 14px',
                        color: '#e2f5ef',
                        fontSize: '13px',
                        fontWeight: 500,
                        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(52,211,153,0.45)';
                        e.currentTarget.style.background = 'rgba(52,211,153,0.12)';
                        e.currentTarget.style.boxShadow = '0 0 12px rgba(52,211,153,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(52,211,153,0.18)';
                        e.currentTarget.style.background = 'rgba(52,211,153,0.06)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <img
                        src={imglinks[skills.indexOf(skill)]}
                        alt={skill + ' logo'}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain mb-3 drop-shadow-md"
                        loading="lazy"
                      />
                      <span className="text-center break-words">{skill}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default SkillsSection;
