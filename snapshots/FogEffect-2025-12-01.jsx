import { motion } from 'framer-motion';

function FogEffect() {
  console.log('Rendering fog effect');
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.92,
        background: 'radial-gradient(circle at 40% 20%, rgba(255,255,255,0.45), transparent 65%)'
      }}
      aria-hidden
    >
      {/* Layer 1: Heavy bottom fog (like sea mist rolling in) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[70vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(244,245,240,0.95), rgba(219,222,220,0.45) 70%, transparent)',
          filter: 'blur(24px)'
        }}
        animate={{
          x: [-120, 120, -120],
          opacity: [0.5, 0.75, 0.5],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Layer 2: Mid-level drifting fog */}
      <motion.div
        className="absolute inset-x-0 top-16 h-3/4"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(230,240,255,0.5), transparent 75%)',
        }}
        animate={{
          x: [100, -100, 100],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Layer 3: Upper atmospheric fog */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-64"
        style={{
          background: 'linear-gradient(to bottom, rgba(232,238,248,0.65), transparent)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Layer 4: Spot fog patches (random clouds) */}
      <motion.div
        className="absolute"
        style={{
          background: 'radial-gradient(circle at center, rgba(230,240,250,0.6), transparent 65%)',
          width: '400px',
          height: '300px',
          top: '40%',
          left: '20%'
        }}
        animate={{
          x: [-50, 50, -50],
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
      />

      <motion.div
        className="absolute"
        style={{
          background: 'radial-gradient(circle at center, rgba(225,235,252,0.55), transparent 65%)',
          width: '500px',
          height: '350px',
          top: '30%',
          right: '15%'
        }}
        animate={{
          x: [50, -50, 50],
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 15
        }}
      />
    </div>
  );
}

export default FogEffect;
