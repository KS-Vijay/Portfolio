
import { motion } from 'framer-motion';

const Planet = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ 
          rotateY: 360,
          rotateX: [0, 10, -10, 0]
        }}
        transition={{ 
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Main planet sphere */}
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-space-violet via-space-purple to-space-deep shadow-2xl relative overflow-hidden">
          {/* Surface texture */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-space-violet/30 blur-xl scale-110"></div>
          
          {/* Atmospheric rim light */}
          <div className="absolute inset-0 rounded-full border-2 border-space-violet/50 shadow-[0_0_50px_rgba(139,92,246,0.6)]"></div>
        </div>
        
        {/* Orbital ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-space-pink/30 rounded-full"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-2 h-2 bg-space-pink rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Planet;
