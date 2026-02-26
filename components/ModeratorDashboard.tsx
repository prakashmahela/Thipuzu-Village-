import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Settings, FileText, Image as ImageIcon, 
  Users, Bell, LogOut, ArrowLeft, Save, Edit3, Trash2, Plus
} from 'lucide-react';

interface Props {
  onLogout: () => void;
  onBackToHome: () => void;
  isLightMode: boolean;
}

const ModeratorDashboard: React.FC<Props> = ({ onLogout, onBackToHome, isLightMode }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Visitors', value: '12,482', change: '+12%' },
    { label: 'Active Sessions', value: '42', change: '+5%' },
    { label: 'Pending Edits', value: '3', change: '-1' },
    { label: 'System Health', value: '99.9%', change: 'Stable' },
  ];

  const recentEdits = [
    { id: 1, section: 'Hero Section', user: 'Admin_Rose', time: '2h ago', status: 'Published' },
    { id: 2, section: 'Places to Visit', user: 'Mod_Venuh', time: '5h ago', status: 'Draft' },
    { id: 3, section: 'Demographics', user: 'Admin_Rose', time: '1d ago', status: 'Published' },
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${isLightMode ? 'bg-[#F8F7F2]' : 'bg-obsidian'}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r ${isLightMode ? 'border-black/5 bg-white' : 'border-white/5 bg-zinc-950'} flex flex-col`}>
        <div className="p-8 border-b border-inherit">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <Settings size={16} className="text-obsidian" />
            </div>
            <h1 className={`font-black uppercase tracking-widest text-sm ${isLightMode ? 'text-black' : 'text-bone'}`}>
              Admin Panel
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gold font-bold opacity-60">Thipuzu Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
            { id: 'content', icon: <FileText size={18} />, label: 'Content Manager' },
            { id: 'media', icon: <ImageIcon size={18} />, label: 'Media Library' },
            { id: 'users', icon: <Users size={18} />, label: 'User Management' },
            { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-gold text-obsidian shadow-lg shadow-gold/10' 
                  : `hover:bg-gold/5 ${isLightMode ? 'text-black/60 hover:text-black' : 'text-bone/60 hover:text-bone'}`
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-inherit space-y-2">
          <button 
            onClick={onBackToHome}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-gold/5 ${isLightMode ? 'text-black/60 hover:text-black' : 'text-bone/60 hover:text-bone'}`}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className={`text-4xl heading-big mb-2 mask-text ${isLightMode ? 'text-black' : 'text-bone'}`}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold opacity-60">
              System Administrator Dashboard
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={async () => {
                const link = document.createElement('a');
                link.href = '/api/download-zip';
                link.download = 'thipuzu-village-project.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className={`px-6 py-3 rounded-xl border ${isLightMode ? 'border-black/10 text-black' : 'border-white/10 text-bone'} text-xs font-bold uppercase tracking-widest hover:bg-gold/5 transition-all flex items-center gap-2`}
            >
              <FileText size={14} />
              Download Source (ZIP)
            </button>
            <button className="px-6 py-3 rounded-xl bg-gold text-obsidian text-xs font-bold uppercase tracking-widest shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all flex items-center gap-2">
              <Save size={14} />
              Save Changes
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl border ${isLightMode ? 'bg-white border-black/5' : 'bg-zinc-900 border-white/5 shadow-2xl'}`}
                >
                  <p className={`text-[10px] uppercase tracking-widest font-bold mb-4 ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>
                    {stat.label}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className={`text-3xl font-black ${isLightMode ? 'text-black' : 'text-bone'}`}>{stat.value}</h3>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                      stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 
                      stat.change.startsWith('-') ? 'bg-red-500/10 text-red-500' : 
                      'bg-gold/10 text-gold'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Content Management Mockup */}
            <div className={`rounded-3xl border ${isLightMode ? 'bg-white border-black/5' : 'bg-zinc-900 border-white/5'} overflow-hidden`}>
              <div className="p-8 border-b border-inherit flex justify-between items-center">
                <h3 className={`text-lg font-bold uppercase tracking-widest ${isLightMode ? 'text-black' : 'text-bone'}`}>
                  Recent Website Activity
                </h3>
                <button className="text-gold text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`text-[10px] uppercase tracking-widest font-bold ${isLightMode ? 'text-black/40' : 'text-bone/40'}`}>
                      <th className="px-8 py-4">Section</th>
                      <th className="px-8 py-4">Modified By</th>
                      <th className="px-8 py-4">Time</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLightMode ? 'divide-black/5' : 'divide-white/5'}`}>
                    {recentEdits.map((edit) => (
                      <tr key={edit.id} className={`text-sm ${isLightMode ? 'text-black/80' : 'text-bone/80'} hover:bg-gold/5 transition-colors`}>
                        <td className="px-8 py-4 font-medium">{edit.section}</td>
                        <td className="px-8 py-4">{edit.user}</td>
                        <td className="px-8 py-4 opacity-60">{edit.time}</td>
                        <td className="px-8 py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                            edit.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gold/10 text-gold'
                          }`}>
                            {edit.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 hover:text-gold transition-colors"><Edit3 size={16} /></button>
                            <button className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className={`text-xl font-bold uppercase tracking-widest ${isLightMode ? 'text-black' : 'text-bone'}`}>
                Page Sections
              </h3>
              <button className="px-4 py-2 bg-gold text-obsidian text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2">
                <Plus size={14} /> Add New Section
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {['Hero', 'About', 'Spiritual Heritage', 'History', 'Demographics', 'Tourism', 'Places to Visit', 'Contact'].map((section, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${isLightMode ? 'bg-white border-black/5' : 'bg-zinc-900 border-white/5'} flex justify-between items-center group hover:border-gold/30 transition-all`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold uppercase tracking-widest text-sm ${isLightMode ? 'text-black' : 'text-bone'}`}>{section}</h4>
                      <p className="text-[10px] opacity-40">Last updated 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-gold/20 rounded-lg hover:bg-gold/10 text-gold transition-all">Edit Content</button>
                    <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-lg hover:bg-white/5 opacity-40">Settings</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`text-xl font-bold uppercase tracking-widest ${isLightMode ? 'text-black' : 'text-bone'}`}>
                  Media Library
                </h3>
                <p className="text-[10px] opacity-40 mt-1">Manage gallery images and visual assets</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input 
                  type="text" 
                  placeholder="Image Title..." 
                  id="image-title-input"
                  className={`flex-1 px-4 py-2 rounded-lg border text-xs ${isLightMode ? 'bg-white border-black/10' : 'bg-zinc-800 border-white/10 text-white'}`}
                />
                <input 
                  type="text" 
                  placeholder="Paste Image URL..." 
                  id="image-url-input"
                  className={`flex-[2] px-4 py-2 rounded-lg border text-xs ${isLightMode ? 'bg-white border-black/10' : 'bg-zinc-800 border-white/10 text-white'}`}
                />
                <button 
                  onClick={() => {
                    const titleInput = document.getElementById('image-title-input') as HTMLInputElement;
                    const urlInput = document.getElementById('image-url-input') as HTMLInputElement;
                    const title = titleInput.value.trim() || 'Untitled Archive';
                    const url = urlInput.value.trim();
                    if (url) {
                      const stored = localStorage.getItem('thipuzu_gallery_images');
                      const images = stored ? JSON.parse(stored) : [
                        { url: "https://i.ibb.co/tMZ2xCJC/Whats-App-Image-2026-02-09-at-12-51-00-PM.jpg", title: "Village Panorama" },
                        { url: "https://i.ibb.co/NdxZFrQq/Whats-App-Image-2026-02-09-at-12-50-59-PM-1.jpg", title: "Sacred Hearth" },
                        { url: "https://i.ibb.co/zLKLMh4/Whats-App-Image-2026-02-09-at-12-50-58-PM.jpg", title: "Ancient Stones" },
                        { url: "https://i.ibb.co/gZzskKT4/Whats-App-Image-2026-02-09-at-12-50-59-PM.jpg", title: "Mist over Ridge" },
                        { url: "https://i.ibb.co/VYXKrqrc/Whats-App-Image-2026-02-09-at-12-50-56-PM.jpg", title: "Terrace Fields" },
                        { url: "https://i.ibb.co/673nGx5J/Whats-App-Image-2026-02-09-at-12-50-55-PM.jpg", title: "Pentagon View" },
                        { url: "https://i.ibb.co/XNj6pTF/Whats-App-Image-2026-02-09-at-12-50-54-PM.jpg", title: "Kiwi Orchards" },
                        { url: "https://i.ibb.co/FbnJZSYR/Whats-App-Image-2026-02-09-at-12-50-46-PM.jpg", title: "Cultural Heritage" },
                      ];
                      
                      // Handle migration if existing data is string array
                      const normalized = images.map((item: any) => typeof item === 'string' ? { url: item, title: 'Untitled Archive' } : item);
                      
                      normalized.push({ url, title });
                      localStorage.setItem('thipuzu_gallery_images', JSON.stringify(normalized));
                      titleInput.value = '';
                      urlInput.value = '';
                      window.location.reload();
                    }
                  }}
                  className="px-6 py-2 bg-gold text-obsidian text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all whitespace-nowrap"
                >
                  <Plus size={14} /> Add Image
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(localStorage.getItem('thipuzu_gallery_images') ? JSON.parse(localStorage.getItem('thipuzu_gallery_images')!) : [
                { url: "https://i.ibb.co/tMZ2xCJC/Whats-App-Image-2026-02-09-at-12-51-00-PM.jpg", title: "Village Panorama" },
                { url: "https://i.ibb.co/NdxZFrQq/Whats-App-Image-2026-02-09-at-12-50-59-PM-1.jpg", title: "Sacred Hearth" },
                { url: "https://i.ibb.co/zLKLMh4/Whats-App-Image-2026-02-09-at-12-50-58-PM.jpg", title: "Ancient Stones" },
                { url: "https://i.ibb.co/gZzskKT4/Whats-App-Image-2026-02-09-at-12-50-59-PM.jpg", title: "Mist over Ridge" },
                { url: "https://i.ibb.co/VYXKrqrc/Whats-App-Image-2026-02-09-at-12-50-56-PM.jpg", title: "Terrace Fields" },
                { url: "https://i.ibb.co/673nGx5J/Whats-App-Image-2026-02-09-at-12-50-55-PM.jpg", title: "Pentagon View" },
                { url: "https://i.ibb.co/XNj6pTF/Whats-App-Image-2026-02-09-at-12-50-54-PM.jpg", title: "Kiwi Orchards" },
                { url: "https://i.ibb.co/FbnJZSYR/Whats-App-Image-2026-02-09-at-12-50-46-PM.jpg", title: "Cultural Heritage" },
              ]).map((img: any, idx: number) => {
                const imageUrl = typeof img === 'string' ? img : img.url;
                const imageTitle = typeof img === 'string' ? 'Untitled Archive' : img.title;
                
                return (
                  <div key={idx} className={`group relative aspect-square rounded-2xl overflow-hidden border ${isLightMode ? 'border-black/5' : 'border-white/5'} bg-black/5 flex flex-col`}>
                    <img src={imageUrl} alt={imageTitle} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-black/60 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-[9px] text-white font-bold uppercase tracking-widest truncate">{imageTitle}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => {
                          const stored = localStorage.getItem('thipuzu_gallery_images');
                          const images = stored ? JSON.parse(stored) : [];
                          const filtered = images.filter((_: any, i: number) => i !== idx);
                          localStorage.setItem('thipuzu_gallery_images', JSON.stringify(filtered));
                          window.location.reload();
                        }}
                        className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModeratorDashboard;
