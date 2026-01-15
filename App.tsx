
import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import ReportForm from './components/ReportForm';
import CommunityFeed from './components/CommunityFeed';
import Sidebar from './components/Sidebar';
import EmergencySOS from './components/EmergencySOS';
import { Incident, IncidentType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'map' | 'feed' | 'report'>('map');
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Initializing with mock data for Karachi
    const mockData: Incident[] = [
      { id: '1', type: IncidentType.SNATCHING, description: 'Mobile snatched at gunpoint near Gulshan.', lat: 24.9192, lng: 67.0858, timestamp: new Date().toISOString(), isVerified: true },
      { id: '2', type: IncidentType.THEFT, description: 'Bike stolen from parking.', lat: 24.8607, lng: 67.0011, timestamp: new Date().toISOString(), isVerified: false },
    ];
    setIncidents(mockData);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const handleNewReport = (report: Partial<Incident>) => {
    const newIncident: Incident = {
      id: Math.random().toString(36).substr(2, 9),
      type: report.type || IncidentType.OTHER,
      description: report.description || '',
      lat: (report.lat || 24.8607) + (Math.random() - 0.5) * 0.001, // Add slight fuzzing
      lng: (report.lng || 67.0011) + (Math.random() - 0.5) * 0.001,
      timestamp: new Date().toISOString(),
      isVerified: false
    };
    setIncidents([newIncident, ...incidents]);
    setView('map');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 relative bg-white h-full overflow-y-auto">
        <header className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl px-4 py-2 border border-gray-100 pointer-events-auto">
            <h1 className="text-xl font-bold text-red-600 tracking-tight">CrimeGuard <span className="text-gray-800">Karachi</span></h1>
          </div>
          <EmergencySOS />
        </header>

        {view === 'map' && <MapView incidents={incidents} userLocation={userLoc} />}
        {view === 'feed' && <CommunityFeed incidents={incidents} />}
        {view === 'report' && (
          <div className="pt-20 px-4 max-w-2xl mx-auto">
            <ReportForm onSubmit={handleNewReport} onCancel={() => setView('map')} userLocation={userLoc} />
          </div>
        )}

        {/* Persistent Bottom Nav for Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-20">
          <button onClick={() => setView('map')} className={`flex flex-col items-center ${view === 'map' ? 'text-red-600' : 'text-gray-400'}`}>
            <i className="fas fa-map text-xl"></i>
            <span className="text-xs mt-1">Map</span>
          </button>
          <button onClick={() => setView('report')} className={`flex flex-col items-center -mt-8 bg-red-600 text-white rounded-full p-4 shadow-xl border-4 border-white`}>
            <i className="fas fa-plus text-xl"></i>
          </button>
          <button onClick={() => setView('feed')} className={`flex flex-col items-center ${view === 'feed' ? 'text-red-600' : 'text-gray-400'}`}>
            <i className="fas fa-list text-xl"></i>
            <span className="text-xs mt-1">Feed</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
