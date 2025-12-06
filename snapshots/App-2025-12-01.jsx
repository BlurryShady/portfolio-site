import { useState, useRef, useEffect } from 'react';
import Pillar from './components/Pillar';
import FogEffect from './components/FogEffect';
import SeaEffect from './components/SeaEffect';
import IntroSection from './components/IntroSection';
import ProjectCard from './components/ProjectCard';
import ProjectDetailBanner from './components/ProjectDetailBanner';
import { projects } from './data/project';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [bannerPosition, setBannerPosition] = useState(null);
  const galleryRef = useRef(null);
  const bannerRef = useRef(null);

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
    <div className="relative min-h-screen overflow-x-hidden">
     {/* Background Pillars - Both sides */}
      <Pillar position="left" style="ionic" />
      <Pillar position="right" style="ionic" />
      
      {/* Sea/Water Effect at bottom */}
      <SeaEffect />
      
      {/* Animated Fog - Multiple layers */}
      <FogEffect />
      
      <main className="relative z-20">
        {/* Intro Section */}
        <IntroSection />
        
        {/* Gallery Section - GRID LAYOUT (2 per row) */}
        <section className="min-h-screen py-20 px-8">
          <h2 className="text-5xl font-bold font-display text-center mb-4 text-stone-800">
            Gallery of Works
          </h2>
          <p className="text-center text-stone-600 mb-16 text-lg">
            Hover to bring clarity
          </p>
          
          {/* Grid Layout - 2 columns */}
          <div
            ref={galleryRef}
            className="max-w-6xl mx-auto grid grid-cols-2 gap-12 relative"
          >
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick(project)}
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
