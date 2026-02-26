import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNavigate: (id: string) => void;
  isLightMode?: boolean;
}

const Hero: React.FC<Props> = ({ onNavigate, isLightMode }) => {
  return (
    <section className={`relative h-screen flex flex-col items-center justify-center overflow-hidden px-12 transition-colors duration-500 ${isLightMode ? 'bg-[#F8F7F2]' : 'bg-obsidian'}`}>
      {/* Background Image with Parallax/Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://i.ibb.co/ynCRv9Fq/Whats-App-Image-2026-02-22-at-10-08-35-PM-2.jpg" 
          alt="Thipuzu Village Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Cinematic Vignette - Lightened for better image visibility */}
      <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isLightMode ? 'bg-black/20' : 'bg-black/40'}`} />
      
      {/* Background Motion Blur Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [-20, 20, -20]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-gold/20 blur-[120px] rounded-full z-0"
      />

      <div className="relative z-20 w-full max-w-[1400px]">
        <motion.div
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`inline-block px-6 py-2 border text-gold text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold mb-8 md:mb-12 rounded-full transition-colors bg-black/80 backdrop-blur-xl border-gold/50 shadow-[0_0_30px_rgba(197,160,89,0.4)]`}
          >
            Phek • Nagaland
          </motion.span>
          
          <h1 className="heading-big text-[12vw] sm:text-[10vw] leading-none pt-4 pb-8 md:pb-12 overflow-visible drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-wrap justify-center">
            {"TIPHUZU".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  color: ["#FFFFFF", "#C5A059", "#FFFFFF", "#C5A059", "#FFFFFF"] 
                }}
                transition={{ 
                  opacity: { duration: 1.2, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] },
                  y: { duration: 1.2, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] },
                  rotateX: { duration: 1.2, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] },
                  color: { 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: index * 0.1 
                  }
                }}
                className="inline-block origin-bottom font-black"
                style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center gap-4 md:gap-8 mt-2 w-full justify-center"
          >
            <div className={`h-[1px] flex-1 max-w-[30px] md:max-w-[100px] hidden sm:block bg-gold/50 shadow-[0_0_10px_rgba(197,160,89,0.5)]`} />
            <motion.div
              className="relative"
            >
              <motion.p 
                initial={{ letterSpacing: "0.05em", opacity: 0 }}
                animate={{ 
                  letterSpacing: "0.2em", 
                  opacity: 1,
                  color: ["#C5A059", "#FFFFFF", "#C5A059"]
                }}
                transition={{ 
                  letterSpacing: { delay: 1.2, duration: 2, ease: "easeOut" },
                  opacity: { delay: 1.2, duration: 2 },
                  color: { duration: 3, repeat: Infinity, ease: "linear" }
                }}
                className={`text-sm sm:text-lg md:text-3xl font-black uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] text-center px-4`}
              >
                Kingdom Above the Clouds
              </motion.p>
            </motion.div>
            <div className={`h-[1px] flex-1 max-w-[30px] md:max-w-[100px] hidden sm:block bg-gold/50 shadow-[0_0_10px_rgba(197,160,89,0.5)]`} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-16 md:mt-24 flex flex-wrap justify-center gap-10"
        >
          {['about', 'tom', 'tourism', 'faith'].map((section) => (
            <button 
              key={section}
              onClick={() => onNavigate(section)}
              className="group flex flex-col items-center gap-3"
            >
              <span className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-colors text-white group-hover:text-gold drop-shadow-[0_2px_10px_rgba(0,0,0,1)]`}>
                {section === 'about' ? 'About' : section === 'tom' ? 'Mission' : section === 'tourism' ? 'Journey' : 'Covenant'}
              </span>
              <div className={`w-12 h-[2px] transition-all duration-700 group-hover:w-24 bg-gold shadow-[0_0_15px_rgba(197,160,89,0.8)]`} />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Vertical Decorative Lines */}
      <div className={`absolute left-12 bottom-0 h-[15vh] w-px hidden md:block bg-white/30 shadow-lg`} />
      <div className={`absolute right-12 bottom-0 h-[15vh] w-px hidden md:block bg-white/30 shadow-lg`} />
    </section>
  );
};

export default Hero;