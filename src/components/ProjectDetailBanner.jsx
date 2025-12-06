import { motion } from 'framer-motion';

const getPanelThemeClass = (style) => {
  switch (style) {
    case 'dual-tone':
      return 'marble-panel--dual-tone';
    case 'sharp':
      return 'marble-panel--sharp';
    case 'neon-glow':
    case 'neon-pulse':
      return 'marble-panel--neon-pulse';
    case 'gold-shimmer':
      return 'marble-panel--gold-shimmer';
    default:
      return '';
  }
};

function ProjectDetailBanner({ project, onClose, anchorPosition, bannerRef }) {
  if (!project) return null;

  const theme = project.theme || {
    primary: '#9C9B93',
    secondary: '#6B6A65'
  };
  const panelThemeClass = getPanelThemeClass(project.theme?.style);
  const panelStyle = anchorPosition
    ? { position: 'absolute', ...anchorPosition }
    : { position: 'absolute', right: 24, top: 24 };

  return (
    <motion.div
      ref={bannerRef}
      className={`marble-panel z-30 w-[400px] max-w-full pointer-events-auto overflow-hidden ${panelThemeClass}`}
      style={panelStyle}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Close Button - Themed */}
      <button
        onClick={onClose}
        className="marble-panel__close"
        aria-label="Close project details"
      >
        ✕
      </button>

      <div className="space-y-6 max-h-[540px] overflow-y-auto pr-2 custom-scrollbar mt-6">
        {/* Project Image with themed overlay */}
        <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/800x400/9C9B93/2B2B2B?text=' +
                encodeURIComponent(project.name);
            }}
          />
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}60, ${theme.secondary}40)`
            }}
          />
        </div>

        {/* Status Badge - Animated */}
        <div className="flex justify-start">
          <motion.span
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow-lg ${
              project.status === 'live'
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 text-stone-900'
            }`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {project.status === 'live' ? ' LIVE PROJECT' : ' IN DEVELOPMENT'}
          </motion.span>
        </div>

        {/* Project Title */}
        <div className="marble-panel__section">
          <h2 className="marble-panel__headline-title text-4xl font-display font-bold mb-2 leading-tight">
            {project.name}
          </h2>
          <p className="marble-panel__headline-tagline text-base font-semibold italic">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <div className="marble-panel__section">
          <div className="marble-panel__description text-sm leading-relaxed">
            {project.description}
          </div>
        </div>

        {/* Tech Stack - Colorful badges */}
        <div className="marble-panel__section">
          <h3 className="marble-panel__section-title text-base mb-3 flex items-center gap-2">
            <span className="text-xl"></span>
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <motion.span
                key={idx}
                className="marble-panel__tech-pill"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Key Features - With themed bullets */}
        <div className="marble-panel__section">
          <h3 className="marble-panel__section-title text-base mb-3 flex items-center gap-2">
            <span className="text-xl"></span>
            Key Features
          </h3>
          <ul className="marble-panel__features space-y-2">
            {project.features.slice(0, 5).map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Visit Button */}
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="marble-panel__visit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
           VISIT LIVE PROJECT
        </motion.a>
      </div>

      {/* Custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--panel-accent), var(--panel-accent-secondary));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--panel-accent);
        }
      `}</style>
    </motion.div>
  );
}

export default ProjectDetailBanner;