
import React, { useState } from 'react';
import { IncidentType } from '../types';

interface ReportFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  userLocation: { lat: number; lng: number } | null;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, onCancel, userLocation }) => {
  const [type, setType] = useState<IncidentType>(IncidentType.SNATCHING);
  const [description, setDescription] = useState('');
  const [isAnonymizing, setIsAnonymizing] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      description,
      lat: userLocation?.lat,
      lng: userLocation?.lng,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-red-600 p-6 text-white">
        <h2 className="text-xl font-bold">Report an Incident</h2>
        <p className="text-red-100 text-sm mt-1">Your report helps keep the community safe.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Incident Type</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(IncidentType).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`text-sm py-3 px-4 rounded-xl border-2 transition-all ${
                  type === t 
                    ? 'border-red-600 bg-red-50 text-red-700 font-bold' 
                    : 'border-gray-100 bg-gray-50 text-gray-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            required
            className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none min-h-[120px]"
            placeholder="Describe what happened (e.g., 2 men on bike, escaped towards...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isAnonymizing ? 'bg-green-100 text-green-600' : 'bg-gray-200'}`}>
              <i className="fas fa-user-secret"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Privacy Masking</p>
              <p className="text-xs text-gray-500">Location is fuzzed within 50m radius</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={isAnonymizing} 
            onChange={() => setIsAnonymizing(!isAnonymizing)}
            className="w-5 h-5 accent-red-600"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
