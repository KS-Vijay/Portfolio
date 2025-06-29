
import { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  onItemClick,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isInitialized, setIsInitialized] = useState(false);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (
    distance,
    pointIndex,
    totalPoints
  ) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (
    i,
    t,
    d,
    r
  ) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, #8b5cf6)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    
    const liEl = e.currentTarget;
    console.log('GooeyNav click:', items[index].id, 'at index:', index);
    
    if (activeIndex === index) {
      // Still call the external handler even if same index
      if (onItemClick) {
        onItemClick(items[index].id, index);
      }
      return;
    }

    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current.removeChild(p));
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    // Call the external click handler with a slight delay to avoid animation conflicts
    if (onItemClick) {
      setTimeout(() => {
        onItemClick(items[index].id, index);
      }, 100);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick(
          { currentTarget: liEl, preventDefault: () => {}, stopPropagation: () => {} },
          index
        );
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    
    // Wait for animations to settle before initializing
    const initTimeout = setTimeout(() => {
      const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
      if (activeLi && filterRef.current && textRef.current) {
        updateEffectPosition(activeLi);
        textRef.current.classList.add("active");
        setIsInitialized(true);
      }
    }, 1800); // Wait for navigation animations to complete

    const resizeObserver = new ResizeObserver(() => {
      if (isInitialized) {
        const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
        if (currentActiveLi) {
          updateEffectPosition(currentActiveLi);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    
    return () => {
      clearTimeout(initTimeout);
      resizeObserver.disconnect();
    };
  }, [activeIndex, isInitialized]);

  // Update active index when external activeIndex changes
  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={(e) => handleClick(e, index)}
            >
              <button 
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`gooey-nav-item ${item.special ? 'special' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} style={{ opacity: isInitialized ? 1 : 0 }} />
      <span className="effect text" ref={textRef} style={{ opacity: isInitialized ? 1 : 0 }} />
    </div>
  );
};

export default GooeyNav;
