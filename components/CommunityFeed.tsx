
import React from 'react';
import { Incident } from '../types';

interface FeedProps {
  incidents: Incident[];
}

const CommunityFeed: React.FC<FeedProps> = ({ incidents }) => {
  return (
    <div className="pt-20 px-4 max-w-2xl mx-auto space-y-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Local Alerts</h2>
        <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">Verified Only</span>
      </div>

      {incidents.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
           <i className="fas fa-check-circle text-5xl mb-4 text-green-100"></i>
           <p className="text-lg">No incidents reported near you.</p>
           <p className="text-sm">Stay safe out there!</p>
        </div>
      ) : (
        incidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {incident.type}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(incident.timestamp).toLocaleTimeString()} • 2km away
              </span>
            </div>
            <p className="text-gray-800 font-medium mb-3">{incident.description}</p>
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex gap-4">
                <button className="text-gray-400 hover:text-red-500 flex items-center gap-1.5 text-sm transition-colors">
                  <i className="far fa-thumbs-up"></i>
                  <span>Useful</span>
                </button>
                <button className="text-gray-400 hover:text-blue-500 flex items-center gap-1.5 text-sm transition-colors">
                  <i className="far fa-comment"></i>
                  <span>Comment</span>
                </button>
              </div>
              {incident.isVerified && (
                <div className="flex items-center text-blue-600 text-xs font-bold gap-1">
                  <i className="fas fa-shield-alt"></i>
                  <span>TRUSTED REPORT</span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommunityFeed;
