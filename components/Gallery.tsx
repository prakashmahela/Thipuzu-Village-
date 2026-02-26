import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Upload, Trash2 } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  { url: "https://i.ibb.co/tMZ2xCJC/Whats-App-Image-2026-02-09-at-12-51-00-PM.jpg", title: "Village Panorama" },
  { url: "https://i.ibb.co/NdxZFrQq/Whats-App-Image-2026-02-09-at-12-50-59-PM-1.jpg", title: "Sacred Hearth" },
  { url: "https://i.ibb.co/zLKLMh4/Whats-App-Image-2026-02-09-at-12-50-58-PM.jpg", title: "Ancient Stones" },
  { url: "https://i.ibb.co/gZzskKT4/Whats-App-Image-2026-02-09-at-12-50-59-PM.jpg", title: "Mist over Ridge" },
  { url: "https://i.ibb.co/VYXKrqrc/Whats-App-Image-2026-02-09-at-12-50-56-PM.jpg", title: "Terrace Fields" },
  { url: "https://i.ibb.co/673nGx5J/Whats-App-Image-2026-02-09-at-12-50-55-PM.jpg", title: "Pentagon View" },
  { url: "https://i.ibb.co/XNj6pTF/Whats-App-Image-2026-02-09-at-12-50-54-PM.jpg", title: "Kiwi Orchards" },
  { url: "https://i.ibb.co/FbnJZSYR/Whats-App-Image-2026-02-09-at-12-50-46-PM.jpg", title: "Cultural Heritage" },
];

const MarqueeRow = ({ images, reverse = false, isLightMode = false }: { images: GalleryImage[], reverse?: boolean, isLightMode?: boolean }) => {
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
        {duplicatedImages.map((img, idx) => (
          <div 
            key={idx} 
            className={`relative flex-shrink-0 w-[240px] md:w-[380px] aspect-[4/3] rounded-3xl overflow-hidden border transition-colors duration-500 ${isLightMode ? 'border-black/10' : 'border-luxury/30'}`}
          >
            <img 
              src={img.url} 
              alt={img.title}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest">{img.title}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Gallery: React.FC<{ isLightMode?: boolean; mode?: 'marquee' | 'grid' }> = ({ isLightMode, mode = 'marquee' }) => {
  const [images, setImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const storedImages = localStorage.getItem('thipuzu_gallery_images');
    if (storedImages) {
      const parsed = JSON.parse(storedImages);
      // Handle migration from string array to object array if needed
      const normalized = parsed.map((item: any) => typeof item === 'string' ? { url: item, title: 'Untitled Archive' } : item);
      setImages(normalized);
    }
  }, []);

  if (mode === 'marquee') {
    const row1 = images.slice(0, Math.ceil(images.length / 2));
    const row2 = images.slice(Math.ceil(images.length / 2));
    
    return (
      <div className="space-y-8 py-12 relative overflow-visible">
        <div className="space-y-6">
          <MarqueeRow images={row1.length > 0 ? row1 : DEFAULT_IMAGES.slice(0, 4)} isLightMode={isLightMode} />
          <MarqueeRow images={row2.length > 0 ? row2 : DEFAULT_IMAGES.slice(4)} reverse isLightMode={isLightMode} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${isLightMode ? 'border-black/5 bg-white' : 'border-white/5 bg-zinc-900'}`}
            onClick={() => setSelectedImage(img)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold text-obsidian flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 size={20} />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h4 className={`text-xs font-black uppercase tracking-[0.2em] ${isLightMode ? 'text-black' : 'text-bone'}`}>
                {img.title}
              </h4>
              <p className="text-[8px] uppercase tracking-widest text-gold font-bold mt-2 opacity-60">Archive Record</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="relative max-w-full max-h-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="text-center">
                <h3 className="text-white text-2xl heading-big uppercase tracking-widest">{selectedImage.title}</h3>
                <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mt-2">Thipüzu Visual Archive</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
