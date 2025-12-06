import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';

const FALLBACK_IMAGE = 'https://via.placeholder.com/600x400/e9e4dc/2b2b2b?text=Project';

const getThemeStyles = (themeStyle) => {
  switch (themeStyle) {
    case 'dual-tone':
      return { cardClass: 'marble-card--dual-tone' };
    case 'sharp':
      return { cardClass: 'marble-card--sharp' };
    case 'neon-glow':
    case 'neon-pulse':
      return { cardClass: 'marble-card--neon-pulse' };
    case 'gold-shimmer':
      return { cardClass: 'marble-card--gold-shimmer' };
    default:
      return { cardClass: '' };
  }
};

const ProjectCard = forwardRef(function ProjectCard({ project, onClick }, ref) {
  const [isHovered, setIsHovered] = useState(false);
  const techList = project.tech?.slice(0, 4) ?? [];
  const description = project.description?.slice(0, 140) ?? '';
  const themeConfig = getThemeStyles(project.theme?.style);
  const cardClassNames = ['marble-card', themeConfig.cardClass, isHovered ? 'marble-card--hovered' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <motion.article
      ref={ref}
      className={cardClassNames}
      style={themeConfig.inlineStyles}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onClick={onClick}
    >
      <figure className="marble-card__media">
        <img
          src={project.image}
          alt={project.name}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <span className="marble-card__badge">
          {project.status === 'live' ? 'Live' : 'In Progress'}
        </span>
      </figure>

      <span className="marble-card__divider" aria-hidden />

      <div className="marble-card__body">
        <p className="marble-card__eyebrow">{project.tagline}</p>
        <h3 className="marble-card__title">{project.name}</h3>
        <p className="marble-card__copy">{description}</p>

        <div className="marble-card__tech">
          {techList.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <button type="button" className="marble-card__action">
          Discover Details
        </button>
      </div>
    </motion.article>
  );
});

export default ProjectCard;