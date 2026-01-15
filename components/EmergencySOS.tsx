
import React, { useState, useEffect } from 'react';

const EmergencySOS: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: any;
    if (isActive && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      // Logic for triggering actual alert
      console.log("SOS Alert Triggered!");
    }
    return () => clearInterval(timer);
  }, [isActive, countdown]);

  const handleSOS = () => {
    if (isActive) {
      setIsActive(false);
      setCountdown(5);
    } else {
      setIsActive(true);
    }
  };

  return (
    <div className="pointer-events-auto">
      <button 
        onClick={handleSOS}
        className={`relative flex items-center justify-center group ${
          isActive ? 'scale-110' : ''
        } transition-all duration-300`}
      >
        <div className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isActive ? 'bg-red-600' : 'bg-red-400'}`}></div>
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white transition-colors ${
          isActive ? 'bg-black' : 'bg-red-600'
        }`}>
          {isActive ? (
            <span className="text-white font-black text-xl">{countdown}</span>
          ) : (
            <i className="fas fa-bell text-white text-xl"></i>
          )}
        </div>
        <div className="absolute top-full mt-2 hidden group-hover:block bg-black text-white text-[10px] font-bold py-1 px-3 rounded shadow-lg whitespace-nowrap">
          {isActive ? 'HOLD TO CANCEL' : 'EMERGENCY SOS'}
        </div>
      </button>
    </div>
  );
};

export default EmergencySOS;
