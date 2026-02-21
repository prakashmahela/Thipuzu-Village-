import React from 'react';
import { motion } from 'framer-motion';

const ROW_1_IMAGES = [
  "https://i.ibb.co/tMZ2xCJC/Whats-App-Image-2026-02-09-at-12-51-00-PM.jpg",
  "https://i.ibb.co/NdxZFrQq/Whats-App-Image-2026-02-09-at-12-50-59-PM-1.jpg",
  "https://i.ibb.co/zLKLMh4/Whats-App-Image-2026-02-09-at-12-50-58-PM.jpg",
  "https://i.ibb.co/gZzskKT4/Whats-App-Image-2026-02-09-at-12-50-59-PM.jpg",
];

const ROW_2_IMAGES = [
  "https://i.ibb.co/VYXKrqrc/Whats-App-Image-2026-02-09-at-12-50-56-PM.jpg",
  "https://i.ibb.co/673nGx5J/Whats-App-Image-2026-02-09-at-12-50-55-PM.jpg",
  "https://i.ibb.co/XNj6pTF/Whats-App-Image-2026-02-09-at-12-50-54-PM.jpg",
  "https://i.ibb.co/FbnJZSYR/Whats-App-Image-2026-02-09-at-12-50-46-PM.jpg",
];

const MarqueeRow = ({ images, reverse = false, isLightMode = false }: { images: string[], reverse?: boolean, isLightMode?: boolean }) => {
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="flex overflow-hidden group">
      <motion.div
        className="flex gap-6 py-2"
        animate={{
          x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((src, idx) => (
          <div 
            key={idx} 
            className={`relative flex-shrink-0 w-[240px] md:w-[380px] aspect-[4/3] rounded-3xl overflow-hidden border transition-colors duration-500 ${isLightMode ? 'border-black/10' : 'border-luxury/30'}`}
          >
            <img 
              src={src} 
              alt={`Archive image ${idx % 4}`}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Gallery: React.FC<{ isLightMode?: boolean }> = ({ isLightMode }) => {
  return (
    <div className="space-y-8 py-12 relative overflow-visible">
      {/* Decorative side masks removed to ensure images are clearly visible without being covered */}
      <div className="space-y-6">
        <MarqueeRow images={ROW_1_IMAGES} isLightMode={isLightMode} />
        <MarqueeRow images={ROW_2_IMAGES} reverse isLightMode={isLightMode} />
      </div>
    </div>
  );
};

export default Gallery;