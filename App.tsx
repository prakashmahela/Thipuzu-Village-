import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, GraduationCap, Building2, 
  Sprout, Compass, Mountain, Users, Globe, Home,
  Mail, Phone, MapPin
} from 'lucide-react';
import { SECTIONS, CONTENT_DATA } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionWrapper from './components/SectionWrapper';
import SubPage from './components/SubPage';
import DemographicStats from './components/DemographicStats';
import Timeline from './components/Timeline';
import ModeratorLogin from './components/ModeratorLogin';
import ModeratorDashboard from './components/ModeratorDashboard';

const App: React.FC = () => {
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true); // Default to Light Mode
  const [isModerator, setIsModerator] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const toggleSubPage = (id: string | null) => {
    if (id) {
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
    }
    setActiveSubPage(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (activeSubPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [activeSubPage]);

  const COVENANT_DOCS = [
    { id: 'faith_chronology', title: 'I. THE CHRONOLOGY', subtitle: 'RECORDS 1939–2024' },
    { id: 'faith_ethics', title: 'II. THE ETHICS', subtitle: 'COMMUNAL LAW' },
    { id: 'faith_architecture', title: 'III. THE ARCHITECTURE', subtitle: 'PENTAGON SPECS' },
    { id: 'faith_pioneers', title: 'IV. THE PIONEERS', subtitle: 'BIOGRAPHICAL ARCHIVE' }
  ];

  const TOURISM_EXPERIENCES = [
    { id: 'tourism_immersion', icon: <Users />, title: "Cultural Immersion", desc: "Experience authentic Chakhesang Naga traditions through hearth-side rituals and clan ceremonies.", colorClass: "card-blue" },
    { id: 'tourism_adventure', icon: <Mountain />, title: "Adventure Tourism", desc: "Thrilling outdoor activities including vertical trekking, ridge ascents, and limestone cave exploration.", colorClass: "card-yellow" },
    { id: 'tourism_eco', icon: <Sprout />, title: "Eco-Tourism", desc: "Sustainable exploration of the Kütsalü primary forests and ancient botanical diversity.", colorClass: "card-pink" },
    { id: 'tourism_homestays', icon: <Home />, title: "Village Homestays", desc: "Authentic local living experiences in traditional hearth-centered mountain architecture.", colorClass: "card-green" }
  ];

  const CARD_COLORS = ["card-blue", "card-yellow", "card-pink", "card-green"];

  return (
    <div ref={containerRef} className={`min-h-screen ${isLightMode ? 'bg-[#F8F7F2] text-[#1A1A1A]' : 'bg-obsidian text-bone'} transition-colors duration-500 selection:bg-gold selection:text-white`}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[110] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
        onNavigate={toggleSubPage}
        isLightMode={isLightMode}
        onToggleTheme={toggleTheme}
        isModerator={isModerator}
      />

      {/* Moderator Toolbar */}
      {isModerator && !activeSubPage && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-20 md:top-24 left-0 right-0 z-[80] bg-gold text-obsidian py-2 px-6 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-2 h-2 bg-obsidian rounded-full animate-pulse" />
              Moderator Mode Active
            </span>
            <div className="h-4 w-px bg-obsidian/20 hidden md:block" />
            <p className="text-[9px] font-medium opacity-70 hidden md:block">You have full administrative privileges to modify content.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveSubPage('moderator_dashboard')}
              className="text-[9px] font-black uppercase tracking-widest border border-obsidian/20 px-3 py-1 rounded-lg hover:bg-obsidian hover:text-gold transition-all"
            >
              Dashboard
            </button>
            <button 
              onClick={() => setIsModerator(false)}
              className="text-[9px] font-black uppercase tracking-widest bg-obsidian text-gold px-3 py-1 rounded-lg hover:bg-obsidian/80 transition-all"
            >
              Exit
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeSubPage === 'moderator_dashboard' && isModerator ? (
          <motion.div
            key="moderator-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModeratorDashboard 
              onLogout={() => {
                setIsModerator(false);
                setActiveSubPage(null);
              }}
              onBackToHome={() => {
                setActiveSubPage(null);
              }}
              isLightMode={isLightMode}
            />
          </motion.div>
        ) : activeSubPage === 'moderator_login' ? (
          <motion.div
            key="moderator-login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModeratorLogin 
              onBack={() => toggleSubPage(null)} 
              onLoginSuccess={() => {
                setIsModerator(true);
                setActiveSubPage('moderator_dashboard');
              }}
              isLightMode={isLightMode} 
            />
          </motion.div>
        ) : !activeSubPage ? (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            className="relative pt-10 lg:pt-0"
            style={{ scale: scaleProgress }}
          >
            <Hero onNavigate={toggleSubPage} isLightMode={isLightMode} />
            
            {/* Introduction Section */}
            <SectionWrapper id="intro" title="About Thipuzu" subtitle="Historical Overview" className={`py-16 md:py-32 ${isLightMode ? 'bg-[#F8F7F2]' : 'bg-obsidian'}`}>
              <div className="max-w-5xl">
                <p className={`text-sm md:text-base leading-relaxed font-light ${isLightMode ? 'text-black/80' : 'text-bone/80'}`}>
                  Nestled in the Phek district of Nagaland, Thipuzu is a historic Chakhesang Naga village that balances ancestral heritage with a forward-looking spirit. A living museum of Naga traditions, it is renowned for its strategic history, vibrant festivals, and intricate weaving. From symbolic monoliths and sacred prayer centers to breathtaking high-altitude terrace fields, Thipuzu offers a profound glimpse into the soul of Nagaland—a hidden gem for those seeking cultural depth and peace.
                </p>
              </div>
            </SectionWrapper>

            {/* Spiritual Heritage Section */}
            <SectionWrapper id="spiritual" title="The Spiritual Heritage of Thipuzu" subtitle="Faith & Legacy" className={`py-16 md:py-32 ${isLightMode ? 'bg-white' : 'bg-zinc-950'}`}>
              <div className="max-w-5xl">
                <p className={`text-sm md:text-base leading-relaxed font-light ${isLightMode ? 'text-black/80' : 'text-bone/80'}`}>
                  The history of Christianity in Thipuzu is a narrative of profound transformation and social cohesion. Since the faith was introduced in the mid-20th century, the Thipuzu Baptist Church (TBC) has served as the village's spiritual and developmental cornerstone. Recently celebrating its Platinum Jubilee, the church commemorates over 75 years of growth, transitioning the community from ancestral traditions to a vibrant Christian identity. This legacy is integrated into daily life through institutions like the Christian Model School and the unique "Procession in Attire," where the community harmonizes Chakhesang heritage with modern faith. Today, Thipuzu stands as a model of disciplined, faith-based living rooted in peace and hospitality.
                </p>
              </div>
            </SectionWrapper>

            {/* History Section */}
            <SectionWrapper id="about" title="Our Essence" subtitle="XV Generations" className={`py-16 md:py-40 ${isLightMode ? 'bg-white' : ''}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
                <div className="lg:col-span-7 space-y-6 md:space-y-12">
                  <motion.h3 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-5xl font-semibold leading-tight mask-text"
                  >
                    “Where the clouds meet the ancestral stones of Phek.”
                  </motion.h3>
                  <p className={`text-base md:text-2xl font-light ${isLightMode ? 'text-black/60' : 'text-bone/60'} leading-relaxed max-w-2xl`}>
                    For half a millennium, Thipuzu has served as the silent guardian of Chakhesang wisdom. Our ridge is not just a location, but a historical witness.
                  </p>
                  <div className="flex flex-wrap gap-8 md:gap-12">
                    <div>
                      <p className="heading-big text-gold text-4xl md:text-6xl mask-text">500+</p>
                      <p className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>Years of Legacy</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSubPage('about')}
                    className="group flex items-center gap-4 text-gold border-b border-gold/30 pb-2 hover:border-gold transition-all"
                  >
                    <span className="uppercase tracking-widest text-[10px] md:text-xs font-bold">Open Origins Archive</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                  <div className={`aspect-[4/5] ${isLightMode ? 'bg-premiumBlue' : 'bg-sage-dark/10'} rounded-2xl overflow-hidden border border-luxury relative group shadow-2xl shadow-gold/5`}>
                    <iframe 
                      title="Thipuzu Village Location"
                      className="w-full h-full border-0 pointer-events-none"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14383.0!2d94.2704!3d25.6657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3747190000000000%3A0x0!2zMjXCsDM5JzU2LjgiTiA5NMKwMTYnMjEuMyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Travel Experience Header */}
            <SectionWrapper id="tourism" title="The Pilgrimage" subtitle="Exclusive Journey" className={`${isLightMode ? 'bg-[#F8F7F2]' : 'bg-zinc-950'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-luxury/10 border border-luxury/10 rounded-3xl overflow-hidden mb-12 md:mb-24">
                {[
                  { icon: <Users />, ...CONTENT_DATA.tourism.experiences[0], color: "card-blue" },
                  { icon: <Mountain />, ...CONTENT_DATA.tourism.experiences[1], color: "card-yellow" },
                  { icon: <Sprout />, ...CONTENT_DATA.tourism.experiences[2], color: "card-pink" },
                  { icon: <Compass />, ...CONTENT_DATA.tourism.experiences[3], color: "card-green" }
                ].map((exp, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(197, 160, 89, 0.05)' }}
                    className={`p-8 md:p-12 transition-all group cursor-pointer ${isLightMode ? exp.color : 'bg-obsidian'}`}
                    onClick={() => toggleSubPage('tourism')}
                  >
                    <div className="text-gold mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                      {React.cloneElement(exp.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                    <h3 className="heading-big text-lg md:text-2xl mb-2 md:mb-4 group-hover:text-gold transition-colors mask-text">{exp.title}</h3>
                    <p className={`${isLightMode ? 'text-black/60' : 'text-bone/40'} text-[11px] md:text-sm leading-relaxed`}>{exp.desc}</p>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Places to Visit Section */}
            <SectionWrapper id="places" title="Places to Visit" subtitle="Must-See Landmarks" className={isLightMode ? 'bg-white' : 'bg-obsidian'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { id: 'place_kiwi', name: 'Kiwi & Allied Fruit Processing Unit', img: 'https://i.ibb.co/5XSFPcGR/Whats-App-Image-2026-02-20-at-8-44-10-PM.jpg' },
                  { id: 'place_rihuba_church', name: 'Rihuba Baptist Church site', img: 'https://i.ibb.co/4wWfQDCx/Whats-App-Image-2026-02-20-at-8-46-55-PM.jpg' },
                  { id: 'place_eco_park', name: 'Mini Eco-Tourism Park, Jüdü', img: 'https://i.ibb.co/Y7Z8PVrK/Whats-App-Image-2026-02-20-at-8-48-37-PM.jpg' },
                  { id: 'place_horticulture', name: 'Horticulture Farm, Suso-Bostu', img: 'https://i.ibb.co/1f8DLWdh/Whats-App-Image-2026-02-20-at-8-49-53-PM.jpg' },
                  { id: 'place_baptist_church', name: 'Thipüzu Baptist Church', img: 'https://i.ibb.co/zW7XMXQm/Whats-App-Image-2026-02-20-at-8-51-19-PM.jpg' },
                  { id: 'place_rihuba', name: 'Rihuba', img: 'https://i.ibb.co/NgJWphBS/Whats-App-Image-2026-02-20-at-8-53-32-PM.jpg' }
                ].map((place, idx) => (
                  <motion.div 
                    key={place.id}
                    whileHover={{ y: -10 }}
                    onClick={() => toggleSubPage(place.id)}
                    className={`aspect-[4/3] rounded-2xl overflow-hidden border border-luxury/20 relative group bg-luxury/5 cursor-pointer`}
                  >
                    <img 
                      src={place.img} 
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <span className="text-gold font-black text-[8px] tracking-[0.4em] mb-2 opacity-60">LANDMARK_0{idx + 1}</span>
                      <p className="text-white text-sm md:text-base font-medium tracking-wide">
                        {place.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* NEW: Tourism Experiences Section */}
            <SectionWrapper id="tourism-experiences" title="Immersive Travel" subtitle="Archival Experiences" className={isLightMode ? 'bg-white' : 'bg-[#030303]'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {TOURISM_EXPERIENCES.map((exp, idx) => (
                  <motion.div 
                    key={exp.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-10 md:p-16 border border-luxury rounded-[2rem] group cursor-pointer hover:border-gold transition-all ${isLightMode ? exp.colorClass : 'bg-zinc-900/50'}`}
                    onClick={() => toggleSubPage(exp.id)}
                  >
                    <div className="text-gold mb-8 group-hover:scale-110 transition-transform">
                      {React.cloneElement(exp.icon as React.ReactElement<any>, { size: 32 })}
                    </div>
                    <h4 className={`heading-big text-2xl md:text-4xl mb-4 group-hover:text-gold transition-colors ${isLightMode ? 'text-black' : 'text-bone'}`}>{exp.title}</h4>
                    <p className={`text-sm md:text-base leading-loose mb-10 ${isLightMode ? 'text-black/50' : 'text-bone/50'}`}>
                      {exp.desc} This journey is documented in our local archives as a primary method of cultural preservation and sustainable engagement.
                    </p>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gold font-bold">
                      Explore Record <ArrowRight size={14} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* Faith / Covenant */}
            <SectionWrapper id="faith" title="The Covenant" subtitle="Manifesto & Archive" className={isLightMode ? 'bg-[#F8F7F2]' : 'bg-[#080808]'}>
               <div className="max-w-5xl mx-auto space-y-24">
                 <div className="space-y-12">
                   <p className={`text-2xl md:text-4xl leading-relaxed font-light border-l-4 border-gold pl-8 md:pl-16 ${isLightMode ? 'text-black/90' : 'text-bone/90'}`}>
                     THIPUZU IS DEFINED BY A SACRED CONTRACT SIGNED IN THE SPIRIT OF 1939. WE ARE NOT MERELY A GEOGRAPHICAL ENTITY; WE ARE A TYPOGRAPHIC CONTINUITY OF RESTORATIVE JUSTICE, COLLECTIVE LABOR, AND ARCHITECTURAL REASON.
                   </p>
                   <p className={`text-sm md:text-base leading-loose max-w-3xl ml-auto text-right ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>
                     THE FOLLOWING DOCUMENTS REPRESENT THE EXHAUSTIVE RECORDS OF OUR TRANSFORMATION. THEY ARE TO BE READ WITH THE GRAVITY OF AN ANCESTRAL WILL. NO IMAGERY CAN CAPTURE THE DEPTH OF THIS ETHICAL JOURNEY.
                   </p>
                 </div>

                 <Timeline onNavigate={toggleSubPage} isLightMode={isLightMode} />
                 
                 <div className="mt-32 border-t border-luxury/20 pt-16">
                   <h4 className="heading-big text-xs text-gold tracking-[0.8em] mb-12 opacity-50">INDEX OF SACRED RECORDS</h4>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-luxury/10 border border-luxury/10">
                     {COVENANT_DOCS.map((doc, idx) => (
                       <div
                        key={doc.id}
                        onClick={() => toggleSubPage(doc.id)}
                        className={`group p-10 md:p-16 transition-all cursor-pointer border-r border-b border-luxury/10 ${isLightMode ? CARD_COLORS[idx % 4] : 'bg-obsidian hover:bg-zinc-900'}`}
                       >
                         <div className="space-y-4">
                           <h5 className={`heading-big text-2xl md:text-4xl group-hover:text-gold transition-colors ${isLightMode ? 'text-black' : 'text-bone'}`}>{doc.title}</h5>
                           <p className={`text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black group-hover:text-gold/60 transition-colors ${isLightMode ? 'text-black/30' : 'text-bone/20'}`}>
                             ACCESS DOCUMENTARY TREATISE — SEC_{idx+1}
                           </p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </SectionWrapper>

            {/* Culture */}
            <SectionWrapper id="culture" title="Fabric of Life" subtitle="Heritage" className={isLightMode ? 'bg-white' : 'bg-[#050505]'}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-8 md:space-y-12">
                   <h3 className="heading-big text-4xl md:text-6xl mask-text">Identity<br/>Defined</h3>
                   <div className="space-y-6 md:space-y-8">
                     {CONTENT_DATA.culture.festivals.map((f: string, i: number) => (
                       <motion.div 
                        key={i}
                        whileHover={{ x: 20 }}
                        className={`flex items-baseline gap-4 md:gap-6 border-b pb-3 md:pb-4 group cursor-pointer ${isLightMode ? 'border-black/5' : 'border-white/5'}`}
                        onClick={() => toggleSubPage('culture')}
                       >
                         <span className="text-gold font-bold text-xs">0{i+1}</span>
                         <span className={`text-xl md:text-3xl font-bold uppercase group-hover:text-gold transition-colors mask-text`}>{f}</span>
                       </motion.div>
                     ))}
                   </div>
                </div>
                <div className={`p-8 md:p-12 rounded-3xl border border-luxury relative overflow-hidden group cursor-pointer ${isLightMode ? 'bg-premiumGreen' : 'bg-white/5'}`} onClick={() => toggleSubPage('culture')}>
                   <h4 className="heading-big text-xl md:text-2xl text-gold mb-4 md:mb-6 font-bold mask-text">Culinary & Craft</h4>
                   <div className={`space-y-6 mb-8 md:mb-10 font-light leading-relaxed ${isLightMode ? 'text-black/80' : 'text-bone/70'}`}>
                     <p className="text-lg md:text-xl">
                       The culinary heritage of Thipuzu is a testament to the village's deep relationship with the seasonal rhythms of the Phek mountains. Beyond the staples of organic rice and smoked meats, our kitchen is a laboratory of fermentation and preservation.
                     </p>
                     <p className={`text-sm md:text-base border-l-2 border-gold/30 pl-6 italic ${isLightMode ? 'text-black/60' : 'text-bone/50'}`}>
                       "Our shawls are not just garments; they are the scrolls of our warriors, woven in geometry."
                     </p>
                   </div>
                   <div className="flex items-center gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-gold transition-all">
                     Enter Cultural Vault <ChevronRight size={14} />
                   </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Education */}
            <SectionWrapper id="education" title="Intelligence" subtitle="Future First" className={isLightMode ? 'bg-[#F8F7F2]' : ''}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
                  <div className={`p-6 md:p-10 border border-luxury group hover:bg-gold rounded-3xl transition-all cursor-pointer ${isLightMode ? 'bg-premiumYellow' : 'bg-gold/5'}`} onClick={() => toggleSubPage('education')}>
                    < GraduationCap className="mb-4 text-gold group-hover:text-white transition-colors" size={28} />
                    <h5 className="heading-big text-lg md:text-2xl mb-1 md:mb-2 group-hover:text-white mask-text">87%</h5>
                    <p className={`text-[8px] md:text-[10px] uppercase tracking-widest group-hover:text-white/60 ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>Literacy Rate</p>
                  </div>
                  <div className={`p-6 md:p-10 border border-luxury group hover:bg-black rounded-3xl transition-all cursor-pointer ${isLightMode ? 'bg-premiumBlue' : 'bg-bone/5'}`} onClick={() => toggleSubPage('education')}>
                    <Building2 className={`mb-4 group-hover:text-white transition-colors ${isLightMode ? 'text-black' : 'text-bone'}`} size={28} />
                    <h5 className={`heading-big text-lg md:text-2xl mb-1 md:mb-2 group-hover:text-white mask-text`}>Elite</h5>
                    <p className={`text-[8px] md:text-[10px] uppercase tracking-widest group-hover:text-white/60 ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>Infrastructure</p>
                  </div>
                </div>
                <div className={`lg:col-span-8 p-8 md:p-16 border rounded-3xl shadow-2xl ${isLightMode ? 'bg-white border-black/5' : 'bg-zinc-900 border-white/5'}`}>
                  <h4 className="heading-big text-2xl md:text-5xl mb-6 md:mb-10 mask-text">Academic<br/>Excellence</h4>
                  <div className={`space-y-6 md:space-y-8 text-base md:text-lg font-light leading-relaxed ${isLightMode ? 'text-black/70' : 'text-bone/60'}`}>
                    <p>
                      In Thipuzu, education is viewed as the primary engine of social mobility and cultural preservation. The Government High School, perched at the village's highest academic summit, serves as a beacon of intellectual rigor.
                    </p>
                    <p className="text-gold/80 font-medium">
                      "The government High School serves as the crucible where traditional wisdom meets digital prowess."
                    </p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSubPage('education')}
                    className="mt-8 md:mt-12 px-6 md:px-10 py-3 md:py-4 bg-gold text-white heading-big text-[10px] md:text-sm rounded-full shadow-lg shadow-gold/20"
                  >
                    View Full Curriculum
                  </motion.button>
                </div>
              </div>
            </SectionWrapper>

            {/* Development / Growth */}
            <SectionWrapper id="development" title="The Ascent" subtitle="Sustainable Growth" className={isLightMode ? 'bg-white' : 'bg-[#0A0A0A]'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
                {[
                  { icon: <Sprout />, title: "Agri-Sustainability", desc: "Trees-for-Wealth initiatives and kiwi cultivation models.", color: "card-green" },
                  { icon: <Compass />, title: "Conservation", desc: "The Kütsalü forest preservation and regulated timber laws.", color: "card-blue" },
                  { icon: <Globe />, title: "Digital Era", desc: "Solar connectivity and infrastructure for a smart village.", color: "card-yellow" }
                ].map((dev, idx) => (
                  <div key={idx} className={`p-6 md:p-10 border border-luxury rounded-3xl group hover:border-gold transition-all cursor-pointer ${isLightMode ? dev.color : ''}`} onClick={() => toggleSubPage('development')}>
                    <div className="text-gold mb-4 md:mb-6">{dev.icon}</div>
                    <h4 className={`heading-big text-base md:text-xl mb-3 md:mb-4 mask-text`}>{dev.title}</h4>
                    <p className={`text-[11px] md:text-sm ${isLightMode ? 'text-black/60' : 'text-bone/40'}`}>{dev.desc}</p>
                  </div>
                ))}
              </div>
            </SectionWrapper>

            {/* Community Section */}
            <SectionWrapper id="demographics" title="The Pulse" subtitle="Data Driven" className={`${isLightMode ? 'bg-[#F8F7F2]' : 'bg-obsidian'} border-t border-luxury/10`}>
              <DemographicStats isLightMode={isLightMode} />
            </SectionWrapper>

            <footer className={`${isLightMode ? 'bg-white' : 'bg-[#020202]'} border-t border-luxury/20 py-16 md:py-32 px-6 md:px-12`}>
               <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 md:space-y-12">
                  <motion.img 
                    src="https://i.ibb.co/mFqbLh92/Seal-of-Nagaland.jpg" 
                    alt="Logo" 
                    className="h-16 w-16 md:h-24 md:w-24 rounded-full object-contain bg-white p-1 md:p-2 shadow-2xl shadow-gold/10 hover:scale-110 transition-transform cursor-pointer" 
                  />
                  
                  <div className="relative z-10 max-w-3xl mx-auto mb-16 space-y-4">
                    <h3 className="heading-big text-3xl md:text-7xl mask-text uppercase">Thipuzu Village</h3>
                    <p className={`text-[10px] uppercase tracking-[0.4em] font-black ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>Chakhesang Community, Nagaland</p>
                    <p className={`text-sm md:text-lg leading-relaxed italic font-light ${isLightMode ? 'text-black/60' : 'text-bone/60'}`}>
                      "Preserving our heritage, empowering our future. Thipuzu Village stands as a beacon of traditional wisdom and modern progress in the heart of Nagaland."
                    </p>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-24 w-full pt-12 border-t text-left ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
                    <div className="space-y-2 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold font-bold">Location</p>
                      <p className={`text-[11px] md:text-sm opacity-50 ${isLightMode ? 'text-black' : 'text-bone'}`}>Phek District, Nagaland<br/>Pin: 797108</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold font-bold">Administration</p>
                      <p className={`text-[11px] md:text-sm opacity-50 ${isLightMode ? 'text-black' : 'text-bone'}`}>Village Council Chairman:<br/>Mr. Zhoveyi Rose</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold font-bold">Contact Information</p>
                      <div className={`text-[11px] md:text-sm opacity-50 space-y-2 ${isLightMode ? 'text-black' : 'text-bone'}`}>
                        <p className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> Thipuzu Village, Nagaland</p>
                        <a href="mailto:thipuzu.village@nagaland.gov.in" className="flex items-center gap-2 hover:text-gold transition-colors">
                          <Mail size={12} className="text-gold" /> thipuzu.village@nagaland.gov.in
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold font-bold">Digital Archiving</p>
                      <p className={`text-[11px] md:text-sm opacity-50 ${isLightMode ? 'text-black' : 'text-bone'}`}>Copyright © 2024 Thipuzu Village<br/>All Ancestral Rights Reserved.</p>
                    </div>
                  </div>
               </div>
            </footer>
          </motion.main>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeSubPage && activeSubPage !== 'moderator_login' && (
          <SubPage 
            id={activeSubPage} 
            data={CONTENT_DATA[activeSubPage as keyof typeof CONTENT_DATA]} 
            onClose={() => toggleSubPage(null)} 
            isLightMode={isLightMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;