import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const IntroSection = forwardRef(function IntroSection({ titleRef, summaryRef, indicatorRef }, ref) {
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative z-20 px-8">
      <div className="max-w-4xl text-center">
        {/* Title with blur-to-clear animation */}
        <motion.h1
          ref={titleRef}
          className="text-7xl font-bold font-display mb-6"
          style={{
            background: 'linear-gradient(to right, #ffffff, #c7dbff)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          BLURRY SHADY
        </motion.h1>
        
        <motion.div
          ref={summaryRef}
          className="text-xl leading-relaxed mb-8"
          style={{ color: 'rgba(230, 230, 230, 0.9)' }}
          initial={{ filter: 'blur(15px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <p className="mb-4">
            Full-stack developer crafting <span className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>clarity</span> out of complexity.
          </p>
          <p className="text-lg">
            Interested in <span className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>web development</span>, 
            <span className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.95)' }}> system design</span> and 
            <span className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.95)' }}> building premium experiences</span>.
          </p>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          ref={indicatorRef}
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-sm text-stone-500 mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default IntroSection;