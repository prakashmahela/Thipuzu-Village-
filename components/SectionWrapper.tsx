import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<Props> = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 md:py-40 px-6 md:px-24 overflow-hidden ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 md:mb-24 flex flex-col space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-6"
          >
            <div className="w-12 md:w-20 h-px bg-gold" />
            <p className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-gold font-black">{subtitle}</p>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="heading-big text-5xl md:text-[10rem] mask-text"
          >
            {title}
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper;