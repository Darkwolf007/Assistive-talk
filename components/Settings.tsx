
import React, { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
  emergencyNumber: string;
  onSave: (num: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, emergencyNumber, onSave }) => {
  const [num, setNum] = useState(emergencyNumber);

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-2xl flex flex-col p-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto w-full">
        <h2 className="text-4xl font-black text-white">அமைப்புகள் (Settings)</h2>
        <button 
          onClick={onClose} 
          className="w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-3xl transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full space-y-12">
        <div className="space-y-6">
          <label className="text-2xl font-bold text-white/70 block">
            அவசர கால எண் (Emergency Number)
          </label>
          <input
            type="tel"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className="w-full p-6 text-5xl bg-white/5 border border-white/20 rounded-[2rem] text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-white/10 text-center font-black"
            placeholder="0000000000"
          />
          <p className="text-white/40 text-center text-lg">SOS பொத்தானை அழுத்தும்போது இந்த எண் அழைக்கப்படும்.</p>
        </div>

        <button
          onClick={() => {
            onSave(num);
            onClose();
          }}
          className="w-full p-8 bg-indigo-600/80 border border-indigo-400/50 text-white rounded-[2.5rem] text-3xl font-black shadow-2xl active:scale-95 transition-all hover:bg-indigo-600"
        >
          சேமி (Save)
        </button>
      </div>
    </div>
  );
};

export default Settings;
