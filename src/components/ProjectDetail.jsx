import { motion, AnimatePresence } from 'framer-motion';

function ProjectDetail({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end">
        {/* Backdrop - dims gallery */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Detail Panel - slides in from right */}
        <motion.div
          className="relative w-full max-w-2xl h-full bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition z-10"
          >
            ✕
          </button>
          
          {/* Content */}
          <div className="p-12">
            {/* Project Image */}
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-8 shadow-xl">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Project Name */}
            <h2 className="text-4xl font-bold font-display mb-4 text-stone-900">
              {project.name}
            </h2>
            
            {/* Tagline */}
            <p className="text-xl text-stone-700 mb-6 italic">
              {project.tagline}
            </p>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-stone-800 mb-3">About</h3>
              <p className="text-stone-700 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-stone-800 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-stone-800 text-white text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-stone-800 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-700">
                    <span className="text-stone-800 font-bold">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visit Live Button */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-stone-800 text-white text-center font-bold text-lg hover:bg-stone-700 transition shadow-lg"
            >
              Visit Live Site →
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ProjectDetail;