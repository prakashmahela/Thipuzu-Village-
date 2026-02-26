import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Gallery from './Gallery';

interface Props {
  id: string;
  data: {
    title: string;
    sections: { head: string; body: string }[];
  };
  onClose: () => void;
  isLightMode?: boolean;
}

const SubPage: React.FC<Props> = ({ id, data, onClose, isLightMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed inset-0 z-[110] overflow-y-auto no-scrollbar selection:bg-gold selection:text-white cursor-default transition-colors duration-500 ${isLightMode ? 'bg-white' : 'bg-obsidian'}`}
    >
      {/* Archive Navigation */}
      <div 
        className={`sticky top-0 z-20 backdrop-blur-xl px-8 md:px-24 py-6 md:py-8 flex items-center justify-between border-b transition-colors duration-500 ${isLightMode ? 'bg-white/98 border-black/5' : 'bg-obsidian/98 border-luxury/10'}`}
      >
        <button 
          onClick={onClose}
          className={`flex items-center gap-2 transition-all group px-4 py-2 border rounded-full ${isLightMode ? 'text-black/60 hover:text-black border-black/10 hover:border-black/30' : 'text-gold/60 hover:text-gold border-gold/10 hover:border-gold/30'}`}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">Back</span>
        </button>
        <div className={`text-[10px] uppercase tracking-[0.6em] font-bold hidden md:block ${isLightMode ? 'text-black/10' : 'text-bone/10'}`}>
          REDACTED ARCHIVE • ACCESS_GRANTED_V_1.08
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 md:px-24 py-32">
        {/* Typographic Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-48 border-l border-gold pl-12"
        >
          <span className="text-[9px] font-black text-gold/40 tracking-[1em] uppercase block mb-6">UNABRIDGED HISTORICAL MANIFESTO</span>
          <h1 className={`heading-big text-3xl md:text-6xl leading-none mb-12 uppercase ${isLightMode ? 'text-black' : 'text-bone'}`}>
            {data.title}
          </h1>
          <div className={`text-[10px] uppercase tracking-[0.3em] font-light leading-relaxed ${isLightMode ? 'text-black/30' : 'text-bone/30'}`}>
            SYSTEM_TIME: 2024.12.01 / LOCATION: PHEK_RIDGE_SUMMIT / CLEARANCE: PUBLIC_TRUST
          </div>
        </motion.div>

        {/* Dense Typographic Content Area */}
        <div className="space-y-64">
          {id === 'gallery' ? (
            <Gallery isLightMode={isLightMode} mode="grid" />
          ) : (
            data.sections.map((sec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 1 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <span className="text-[10px] text-gold/60 font-black tracking-[0.8em]">PARAGRAPH_RECORD_0{idx + 1}</span>
                  <h2 className="heading-big text-xl md:text-3xl text-gold/90 uppercase tracking-widest leading-tight">
                    {sec.head}
                  </h2>
                </div>
                <div className={`border-t pt-12 transition-colors duration-500 ${isLightMode ? 'border-black/5' : 'border-luxury/10'}`}>
                   <p className={`text-lg md:text-2xl leading-[2] font-light text-justify transition-colors duration-500 ${isLightMode ? 'text-black/80' : 'text-bone/60'}`}>
                     {sec.body}
                   </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Archival Terminal Footer */}
        <div className={`mt-80 pb-40 border-t pt-24 text-center transition-colors duration-500 ${isLightMode ? 'border-black/5' : 'border-luxury/10'}`}>
          <p className={`text-[11px] uppercase tracking-[1em] font-black mb-12 ${isLightMode ? 'text-black/10' : 'text-bone/10'}`}>END OF TRANSMISSION — THIPUZU VILLAGE RECORDS</p>
          <button 
            onClick={onClose}
            className={`flex items-center gap-2 mx-auto transition-all group px-8 py-3 border rounded-full ${isLightMode ? 'text-black/60 hover:text-black border-black/10 hover:border-black/30' : 'text-gold/60 hover:text-gold border-gold/10 hover:border-gold/30'}`}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Return to Index</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Documentary Grid Borders */}
      <div className={`fixed left-4 inset-y-0 w-px pointer-events-none hidden md:block transition-colors duration-500 ${isLightMode ? 'bg-black/5' : 'bg-luxury/5'}`} />
      <div className={`fixed right-4 inset-y-0 w-px pointer-events-none hidden md:block transition-colors duration-500 ${isLightMode ? 'bg-black/5' : 'bg-luxury/5'}`} />
    </motion.div>
  );
};

export default SubPage;