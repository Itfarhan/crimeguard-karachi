
import React from 'react';
import { Incident } from '../types';

interface MapViewProps {
  incidents: Incident[];
  userLocation: { lat: number; lng: number } | null;
}

const MapView: React.FC<MapViewProps> = ({ incidents, userLocation }) => {
  // Using a visual placeholder for the map since external script loading can be tricky in this environment.
  // In a real app, this would be a Google Maps or Mapbox GL JS instance.
  
  return (
    <div className="w-full h-full bg-slate-200 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="text-gray-400 flex flex-col items-center opacity-50">
            <i className="fas fa-map-marked-alt text-6xl mb-4"></i>
            <p className="font-semibold text-lg">Karachi Interactive Map</p>
            <p className="text-sm">Hotspots Loaded: {incidents.length}</p>
         </div>
      </div>

      {/* Simulated Heatmap Clusters */}
      {incidents.map((incident) => (
        <div 
          key={incident.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ 
            top: `${50 + (incident.lat - 24.86) * 100}%`, 
            left: `${50 + (incident.lng - 67.00) * 100}%` 
          }}
        >
          <div className="relative">
             <div className={`w-8 h-8 ${incident.isVerified ? 'bg-red-500' : 'bg-orange-400'} rounded-full animate-pulse opacity-20`}></div>
             <div className={`absolute inset-2 w-4 h-4 ${incident.isVerified ? 'bg-red-600' : 'bg-orange-500'} rounded-full border-2 border-white shadow-lg`}></div>
          </div>
          
          {/* Tooltip */}
          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white shadow-2xl rounded-lg p-3 text-sm z-50 border border-gray-100">
             <div className="font-bold text-red-600 border-b pb-1 mb-1">{incident.type}</div>
             <p className="text-gray-600 leading-tight">{incident.description}</p>
             <div className="text-[10px] mt-2 text-gray-400">{new Date(incident.timestamp).toLocaleTimeString()}</div>
          </div>
        </div>
      ))}

      {/* User Location Marker */}
      {userLocation && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            top: `${50 + (userLocation.lat - 24.86) * 100}%`, 
            left: `${50 + (userLocation.lng - 67.00) * 100}%` 
          }}
        >
           <div className="w-10 h-10 bg-blue-500/20 rounded-full animate-ping"></div>
           <div className="absolute inset-2.5 w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2 pointer-events-auto">
        <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 text-gray-700 border border-gray-100">
          <i className="fas fa-layer-group"></i>
        </button>
        <button className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 text-gray-700 border border-gray-100">
          <i className="fas fa-crosshairs"></i>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="absolute top-20 left-4 flex gap-2 pointer-events-auto overflow-x-auto pb-2 no-scrollbar pr-4">
        {['All', 'Snatching', 'Theft', 'Harassment'].map(filter => (
          <button key={filter} className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-medium shadow-sm border border-gray-100 whitespace-nowrap">
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapView;
