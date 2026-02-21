import React from 'react';
import { Menu, X, ArrowLeft, Sun, Moon, Lock } from 'lucide-react';
import { SECTIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  onNavigate: (id: string) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  isModerator: boolean;
}

const Navbar: React.FC<Props> = ({ onMenuToggle, isMenuOpen, onNavigate, isLightMode, onToggleTheme, isModerator }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* Main Header Bar */}
      <div className={`h-20 md:h-24 backdrop-blur-2xl border-b border-luxury/10 px-6 md:px-12 transition-colors duration-500 ${isLightMode ? 'bg-white/95' : 'bg-obsidian/95'}`}>
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
          >
            <img 
              src="https://i.ibb.co/mFqbLh92/Seal-of-Nagaland.jpg" 
              alt="Nagaland Seal" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-contain bg-white p-1 group-hover:scale-110 transition-transform shadow-lg shadow-gold/5" 
            />
            <div>
              <h1 className={`heading-big text-lg md:text-2xl leading-none tracking-tight mask-text ${isLightMode ? 'text-black' : 'text-bone'}`}>Thipuzu</h1>
              <p className="text-[7px] md:text-[9px] uppercase tracking-[0.5em] text-gold font-bold opacity-80">Ancient Roots</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={onToggleTheme}
              className={`p-2 rounded-full border border-gold/20 hover:bg-gold/10 transition-all ${isLightMode ? 'text-black' : 'text-gold'}`}
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Hamburger Button */}
            <button 
              className="flex items-center gap-3 px-4 py-2 text-gold border border-gold/20 rounded-full hover:bg-gold/10 transition-all"
              onClick={onMenuToggle}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isMenuOpen ? 'Close' : 'Menu'}</span>
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-[90] flex flex-col p-8 pt-32 overflow-y-auto no-scrollbar transition-colors duration-500 ${isLightMode ? 'bg-white' : 'bg-obsidian'}`}
          >
            {/* Additional Small Back Button in Menu */}
            <div className="max-w-xs mx-auto w-full mb-8">
              <button 
                onClick={onMenuToggle}
                className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-[10px] font-black uppercase tracking-[0.3em] group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Back to View
              </button>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
              {SECTIONS.map((s, idx) => (
                <motion.button
                  key={s.id}
                  onClick={() => onNavigate(s.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group flex items-center justify-between py-4 border-b ${isLightMode ? 'border-black/5' : 'border-white/5'}`}
                >
                  <span className={`text-3xl heading-big group-hover:text-gold transition-all mask-text ${isLightMode ? 'text-black' : 'text-bone'}`}>
                    {s.label}
                  </span>
                  <span className="text-gold opacity-20 group-hover:opacity-100 transition-opacity">0{idx+1}</span>
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: SECTIONS.length * 0.05 }}
                className={`group flex items-center gap-3 py-6 mt-4 border-t ${isLightMode ? 'border-black/5' : 'border-white/5'}`}
                onClick={() => {
                  onMenuToggle();
                  onNavigate(isModerator ? 'moderator_dashboard' : 'moderator_login');
                }}
              >
                <Lock size={14} className="text-gold" />
                <span className={`text-xs font-black uppercase tracking-[0.3em] group-hover:text-gold transition-all ${isLightMode ? 'text-black/60' : 'text-bone/60'}`}>
                  {isModerator ? 'Moderator Dashboard' : 'Moderator Login'}
                </span>
              </motion.button>
            </div>
            
            <div className="mt-12 text-center">
              <p className={`text-[8px] uppercase tracking-[0.5em] font-bold ${isLightMode ? 'text-black/20' : 'text-bone/20'}`}>
                Phek District • Nagaland
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;