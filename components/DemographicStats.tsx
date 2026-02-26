import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Cultivators', value: 879 },
  { label: 'Agri Laborers', value: 456 },
  { label: 'Gov Service', value: 324 },
  { label: 'Craftsmen', value: 187 },
];

interface Props {
  isLightMode?: boolean;
}

const DemographicStats: React.FC<Props> = ({ isLightMode }) => {
  const total = 1846;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Centered Stat Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl mx-auto mb-20">
        {STATS.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative aspect-square flex flex-col items-center justify-center group"
          >
            {/* The Animated Circle Backdrop */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: isLightMode ? [0.05, 0.1, 0.05] : [0.15, 0.25, 0.15],
                boxShadow: [
                  "0 0 20px rgba(197, 160, 89, 0)",
                  "0 0 40px rgba(197, 160, 89, 0.2)",
                  "0 0 20px rgba(197, 160, 89, 0)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: idx * 0.5
              }}
              className="absolute inset-0 bg-gold rounded-full z-0"
            />

            {/* Content Container */}
            <div className="relative z-10 text-center space-y-2">
              <h4 className={`heading-big text-3xl md:text-6xl transition-colors duration-500 ${isLightMode ? 'text-black group-hover:text-gold' : 'text-bone group-hover:text-gold'}`}>
                {stat.value}
              </h4>
              <p className="text-[8px] md:text-[12px] uppercase tracking-[0.4em] font-black text-gold/60 group-hover:text-gold transition-colors duration-500">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Distribution Section */}
      <div className="w-full max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="h-px w-24 bg-gold/30 mx-auto" />
          <h4 className={`heading-big text-xl md:text-3xl uppercase tracking-wider ${isLightMode ? 'text-black/80' : 'text-bone/80'}`}>
            Socio-Economic Distribution
          </h4>
        </div>

        <div className="space-y-12 pb-20">
          {STATS.map((stat, idx) => (
            <div key={idx} className="relative group">
              <div className="flex justify-between items-end mb-4 px-2">
                <span className={`text-sm md:text-lg font-bold uppercase tracking-[0.3em] transition-colors ${isLightMode ? 'text-black/40 group-hover:text-gold' : 'text-bone/40 group-hover:text-gold'}`}>{stat.label}</span>
                <span className="text-gold font-black tracking-tighter text-xl">{Math.round((stat.value / total) * 100)}%</span>
              </div>
              <div className={`h-1 relative overflow-hidden rounded-full ${isLightMode ? 'bg-black/5' : 'bg-white/5'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stat.value / 879) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 bg-gold/80 z-10"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemographicStats;