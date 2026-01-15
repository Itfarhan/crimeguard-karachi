
import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'map', icon: 'fa-map-marked-alt', label: 'Safety Map' },
    { id: 'feed', icon: 'fa-stream', label: 'Live Alerts' },
    { id: 'report', icon: 'fa-plus-circle', label: 'Report Incident' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-black text-red-500">CRIMEGUARD</h1>
        <p className="text-slate-400 text-xs mt-1">Karachi Neighborhood Watch</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs">
                 <i className="fas fa-check"></i>
              </div>
              <div>
                 <p className="text-xs font-bold">Network Secure</p>
                 <p className="text-[10px] text-slate-400 italic">E2E Encrypted</p>
              </div>
           </div>
           <button className="w-full text-xs py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              User Settings
           </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
