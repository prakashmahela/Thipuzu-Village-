import React from 'react';
import { motion } from 'framer-motion';

const EVENTS = [
  { id: 'faith_chronology', year: '1939', event: 'THE ARRIVAL', desc: 'THE SPARK OF FAITH IGNITED BY PIONEERS. THE FORMAL ADOPTION OF THE COVENANT BY TWELVE FAMILIES.' },
  { id: 'faith_pioneers', year: 'EARLY', event: 'HEARTH FIRES', desc: 'COMMUNION IN THE KITCHEN OF HÜNERÜ ROSE. THE SPIRITUAL FOUNDATION WAS LAID IN THE SECRECY OF THE HOME.' },
  { id: 'faith_ethics', year: '1972', event: 'REBIRTH', desc: 'A SANCTUARY RISES FROM POST-WAR ASHES. THE COMPLETION OF THE FIRST PERMANENT SANCTUARY THROUGH COLLECTIVE LABOR.' },
  { id: 'faith_architecture', year: '2014', event: 'THE PENTAGON', desc: 'A GEOMETRICAL MASTERPIECE IN THE HILLS. SYMBOLIZING THE UNITY OF THE FIVE CLANS UNDER A UNIFIED ARCHITECTURAL ROOF.' },
];

interface Props {
  onNavigate?: (id: string) => void;
  isLightMode?: boolean;
}

const Timeline: React.FC<Props> = ({ onNavigate, isLightMode }) => {
  return (
    <div className={`space-y-20 py-10 border-l ml-4 md:ml-0 transition-colors ${isLightMode ? 'border-black/5' : 'border-gold/10'}`}>
      {EVENTS.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={`relative pl-12 md:pl-24 group ${onNavigate ? 'cursor-pointer' : ''}`}
          onClick={() => onNavigate?.(item.id)}
        >
          <div className="space-y-4">
            <span className={`heading-big text-2xl md:text-3xl transition-colors block ${isLightMode ? 'text-black/10 group-hover:text-gold' : 'text-gold/40 group-hover:text-gold'}`}>
              {item.year}
            </span>
            <div className="space-y-4 max-w-2xl">
              <h3 className={`heading-big text-xl tracking-widest font-black uppercase transition-colors ${isLightMode ? 'text-black group-hover:text-gold' : 'text-bone group-hover:text-gold'}`}>{item.event}</h3>
              <p className={`text-xs md:text-sm font-light leading-loose tracking-wider uppercase transition-colors ${isLightMode ? 'text-black/50 group-hover:text-black/80' : 'text-bone/50 group-hover:text-bone/80'}`}>{item.desc}</p>
              {onNavigate && (
                <div className="text-[8px] text-gold/40 uppercase tracking-[0.3em] font-black group-hover:text-gold transition-colors pt-2">
                  [ VIEW_ARCHIVE_RECORDS ]
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;