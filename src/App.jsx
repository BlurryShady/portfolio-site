import { useState, useRef, useEffect, useMemo, createRef } from 'react';
// import FogEffect from './components/FogEffect'; // <-- This was likely causing the global blur!
import SeaEffect from './components/SeaEffect';
import IntroSection from './components/IntroSection';
import ProjectCard from './components/ProjectCard';
import ProjectDetailBanner from './components/ProjectDetailBanner';
import { projects } from './data/project';
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [bannerPosition, setBannerPosition] = useState(null);

  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const bannerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSummaryRef = useRef(null);
  const heroIndicatorRef = useRef(null);
  const galleryHeadingRef = useRef(null);
  const gallerySubheadingRef = useRef(null);

  const projectRefs = useMemo(() => projects.map(() => createRef()), []);

  const obstacleTargets = useMemo(() => {
    const base = [
      { id: 'hero', ref: heroRef, radiusMultiplier: 1.45, strength: 0.12 },
      { id: 'hero-title', ref: heroTitleRef, radiusMultiplier: 0.7, strength: 0.04 },
      { id: 'hero-summary', ref: heroSummaryRef, radiusMultiplier: 0.78, strength: 0.05 },
      { id: 'hero-indicator', ref: heroIndicatorRef, radiusMultiplier: 0.45, strength: 0.03 },
      { id: 'gallery', ref: galleryRef, radiusMultiplier: 1.2, strength: 0.14 },
      { id: 'gallery-heading', ref: galleryHeadingRef, radiusMultiplier: 0.6, strength: 0.04 },
      { id: 'gallery-subheading', ref: gallerySubheadingRef, radiusMultiplier: 0.55, strength: 0.04 },
    ];

    projectRefs.forEach((ref, index) => {
      base.push({
        id: `project-${projects[index].id}`,
        ref,
        radiusMultiplier: 0.6,
        strength: 0.08,
      });
    });

    if (selectedProject) {
      base.push({
        id: 'detail-banner',
        ref: bannerRef,
        radiusMultiplier: 0.95,
        strength: 0.12,
      });
    }

    return base;
  }, [
    heroRef,
    heroTitleRef,
    heroSummaryRef,
    heroIndicatorRef,
    galleryRef,
    galleryHeadingRef,
    gallerySubheadingRef,
    projectRefs,
    selectedProject,
  ]);

  const handleProjectClick = (project) => (event) => {
    setSelectedProject(project);

    if (!galleryRef.current) return;

    const containerRect = galleryRef.current.getBoundingClientRect();
    const cardRect = event.currentTarget.getBoundingClientRect();
    const PANEL_WIDTH = 360;
    const PANEL_HEIGHT = 520;
    const GAP = 24;

    let left = cardRect.right - containerRect.left + GAP;
    if (left + PANEL_WIDTH > containerRect.width) {
      left = cardRect.left - containerRect.left - PANEL_WIDTH - GAP;
    }
    left = Math.max(0, Math.min(containerRect.width - PANEL_WIDTH, left));

    let top = cardRect.top - containerRect.top;
    if (top + PANEL_HEIGHT > containerRect.height) {
      top = containerRect.height - PANEL_HEIGHT;
    }
    top = Math.max(0, top);

    setBannerPosition({ top, left });
  };

  const handleCloseBanner = () => {
    setSelectedProject(null);
    setBannerPosition(null);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const handlePointerDown = (event) => {
      if (bannerRef.current && bannerRef.current.contains(event.target)) {
        return;
      }
      handleCloseBanner();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [selectedProject]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      
        <BackgroundMusic />
        
      {/* 1. BACKGROUND: The Sea (Z-0) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <SeaEffect obstacleTargets={obstacleTargets} />
      </div>

      {/* 2. DECORATION: (none for now, reserved layer) */}

      {/* 3. CONTENT: Text and Cards (Z-20) */}
      <main className="relative z-20 pointer-events-none">
        
        {/* Intro Wrapper - Wrapped in div to ensure ref works for water effect */}
          <div ref={heroRef} className="pointer-events-auto">
            <IntroSection
             titleRef={heroTitleRef}
             summaryRef={heroSummaryRef}
             indicatorRef={heroIndicatorRef}
            />
          </div>
        
        <section className="min-h-screen px-8 pb-20 pt-36">
          <h2
            ref={galleryHeadingRef}
            className="text-5xl font-bold font-display text-center mb-4 drop-shadow-lg"
            style={{
              background: 'linear-gradient(to right, #ffffff, #c7dbff)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Gallery of Works
          </h2>
          <p
            ref={gallerySubheadingRef}
            className="text-center mb-24 text-lg drop-shadow-md"
            style={{ color: 'rgba(230, 230, 230, 0.9)' }}
          >
            Hover to bring clarity
          </p>
          
          <div
            ref={galleryRef}
            className="project-grid max-w-6xl mx-auto relative pointer-events-auto mt-10"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick(project)}
                ref={projectRefs[index]}
              />
            ))}

            {selectedProject && (
              <ProjectDetailBanner
                project={selectedProject}
                onClose={handleCloseBanner}
                anchorPosition={bannerPosition}
                bannerRef={bannerRef}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;