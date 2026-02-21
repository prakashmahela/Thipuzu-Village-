import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

interface Props {
  onBack: () => void;
  onLoginSuccess: () => void;
  isLightMode: boolean;
}

const ModeratorLogin: React.FC<Props> = ({ onBack, onLoginSuccess, isLightMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoggingIn(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${isLightMode ? 'bg-white' : 'bg-obsidian'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-12 group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Back to Village
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 bg-gold/5 mb-6">
            <ShieldCheck className="text-gold" size={32} />
          </div>
          <h2 className={`text-4xl heading-big mb-2 mask-text ${isLightMode ? 'text-black' : 'text-bone'}`}>
            Moderator Access
          </h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold opacity-60">
            Secure Administrative Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={`text-[10px] uppercase tracking-widest font-bold ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-transparent border ${isLightMode ? 'border-black/10 focus:border-black' : 'border-white/10 focus:border-gold'} rounded-xl py-4 pl-12 pr-4 outline-none transition-all text-sm ${isLightMode ? 'text-black' : 'text-white'}`}
                placeholder="moderator@thipuzu.gov"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className={`text-[10px] uppercase tracking-widest font-bold ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>
                Password
              </label>
              <button 
                type="button"
                className="text-[10px] uppercase tracking-widest font-bold text-gold hover:opacity-100 opacity-60 transition-opacity"
                onClick={() => alert('Password reset link sent to registered email.')}
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={18} />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border ${isLightMode ? 'border-black/10 focus:border-black' : 'border-white/10 focus:border-gold'} rounded-xl py-4 pl-12 pr-4 outline-none transition-all text-sm ${isLightMode ? 'text-black' : 'text-white'}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoggingIn}
            className={`w-full bg-gold hover:bg-gold/90 text-obsidian font-black uppercase tracking-[0.2em] text-xs py-5 rounded-xl transition-all shadow-xl shadow-gold/10 hover:shadow-gold/20 active:scale-[0.98] ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoggingIn ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full mx-auto"
              />
            ) : 'Authorize Session'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className={`text-[8px] uppercase tracking-[0.5em] font-bold opacity-20 ${isLightMode ? 'text-black' : 'text-bone'}`}>
            Authorized Personnel Only • Phek District
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeratorLogin;
