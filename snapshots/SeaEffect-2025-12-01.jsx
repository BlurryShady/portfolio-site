import { motion } from 'framer-motion';

const waveVariants = {
  animate: {
    x: ['-5%', '5%', '-5%'],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  }
};

function SeaEffect() {
  console.log('Rendering sea effect');
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-72 pointer-events-none z-30 overflow-hidden"
      style={{
        mixBlendMode: 'multiply',
        opacity: 0.95,
        background: 'linear-gradient(180deg, rgba(54,94,124,0.8), rgba(16,39,56,0.95))'
      }}
      aria-hidden
    >
      {/* Base water gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(64,134,169,0.85), rgba(16,39,56,0.5))'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Wave layers */}
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          className="absolute inset-x-[-20%] bottom-0 h-24"
          style={{
            opacity: 0.55 + layer * 0.15,
            filter: 'blur(2px)',
            clipPath: layer % 2 === 0
              ? 'polygon(0% 60%, 10% 55%, 20% 60%, 30% 55%, 40% 60%, 50% 55%, 60% 60%, 70% 55%, 80% 60%, 90% 55%, 100% 60%, 100% 100%, 0% 100%)'
              : 'polygon(0% 55%, 12% 62%, 25% 55%, 38% 62%, 50% 55%, 63% 62%, 75% 55%, 88% 62%, 100% 55%, 100% 100%, 0% 100%)',
            background: layer % 2 === 0
                ? 'linear-gradient(90deg, rgba(143,198,229,0.7), rgba(48,113,156,0.4))'
                : 'linear-gradient(90deg, rgba(48,113,156,0.5), rgba(143,198,229,0.6))'
          }}
          variants={waveVariants}
          animate="animate"
          transition={{
            duration: 8 + layer * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: layer
          }}
        />
      ))}

      {/* Surface shimmer */}
      <motion.div
        className="absolute bottom-2 left-0 right-0 h-4"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
          backgroundSize: '200% 100%'
        }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default SeaEffect;
