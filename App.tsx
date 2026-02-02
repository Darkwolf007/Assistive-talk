
import React, { useState, useEffect } from 'react';
import { AppMode, NeedItem } from './types';
import { ALL_NEEDS, EMERGENCY_CONTACTS } from './constants';
import NeedCard from './components/NeedCard';
import DrawingPad from './components/DrawingPad';
import Settings from './components/Settings';
import { speak } from './utils/speech';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('GRID');
  const [selectedItem, setSelectedItem] = useState<NeedItem | null>(null);
  const [emergencyNumber, setEmergencyNumber] = useState(() => {
    return localStorage.getItem('emergency_number') || '';
  });

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSaveEmergency = (num: string) => {
    setEmergencyNumber(num);
    localStorage.setItem('emergency_number', num);
  };

  const onSelectAction = (item: NeedItem) => {
    setSelectedItem(item);
    speak(item.speechText);
  };

  const handleEmergencyClick = () => {
    setMode('EMERGENCY_LIST');
  };

  const triggerSOS = () => {
    if (emergencyNumber) {
      window.location.href = `tel:${emergencyNumber}`;
    } else {
      setMode('EMERGENCY_LIST');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col p-4 safe-area-inset-top overflow-hidden relative text-white">
      
      {/* Top 2/3 - Middle Render Display Area */}
      <div className="h-2/3 flex flex-col relative">
        {/* Header - Settings and SOS */}
        <div className="absolute top-0 right-0 z-50 p-2 flex gap-3">
          <button
            onClick={() => setMode('SETTINGS')}
            className="w-12 h-12 glass border-white/10 rounded-full flex items-center justify-center text-xl shadow-lg active:rotate-90 transition-all opacity-40 hover:opacity-100"
          >
            ⚙️
          </button>
          <button
            onClick={triggerSOS}
            className="h-12 px-6 bg-red-600 border border-red-500/50 rounded-full flex items-center justify-center text-xl font-black shadow-xl active:scale-95 transition-all"
          >
            🚨 SOS
          </button>
        </div>

        {/* Display Content */}
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
          {selectedItem ? (
            <div 
              className="glass p-10 rounded-[3rem] flex flex-col items-center text-center max-w-lg w-full border-white/20 cursor-pointer active:scale-95 transition-transform"
              onClick={() => setSelectedItem(null)}
            >
              <span className="text-[10rem] md:text-[12rem] mb-4 leading-none drop-shadow-2xl">{selectedItem.icon}</span>
              <h2 className="text-6xl md:text-7xl font-black mb-1 tracking-tighter">{selectedItem.tamilLabel}</h2>
              <p className="text-2xl opacity-40 font-black uppercase tracking-[0.2em]">{selectedItem.label}</p>
            </div>
          ) : (
            <div className="text-center opacity-10 flex flex-col items-center">
              <h1 className="text-4xl font-black tracking-tight mb-2">Assistive Talk</h1>
              <p className="text-xl font-bold uppercase tracking-widest">தேர்ந்தெடுக்கவும்</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom 1/3 - 6x2 Icon Grid with Labels */}
      <div className="h-1/3 pt-2">
        <div className="grid grid-cols-6 grid-rows-2 gap-3 h-full max-w-6xl mx-auto">
          {ALL_NEEDS.map((item) => (
            <NeedCard 
              key={item.id} 
              item={item} 
              onClick={onSelectAction} 
              active={selectedItem?.id === item.id}
            />
          ))}
          
          {/* Emergency SOS Icon (Position 11) */}
          <button
            onClick={handleEmergencyClick}
            className="flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-md transition-all active:scale-90 h-full w-full p-1 aspect-square"
          >
            <div className="flex-1 flex items-center justify-center">
              <span className="text-4xl md:text-5xl drop-shadow-md">🚨</span>
            </div>
            <div className="flex flex-col items-center pb-1">
              <span className="text-sm md:text-base font-black tracking-tight text-center">அவசரம்</span>
              <span className="text-[8px] md:text-[10px] opacity-40 font-bold uppercase">SOS</span>
            </div>
          </button>

          {/* Write Button (Position 12) */}
          <button
            onClick={() => setMode('DRAW')}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md transition-all active:scale-90 h-full w-full p-1 aspect-square"
          >
            <div className="flex-1 flex items-center justify-center">
              <span className="text-4xl md:text-5xl drop-shadow-md">✏️</span>
            </div>
            <div className="flex flex-col items-center pb-1">
              <span className="text-sm md:text-base font-black tracking-tight text-center">எழுது</span>
              <span className="text-[8px] md:text-[10px] opacity-40 font-bold uppercase">Write</span>
            </div>
          </button>
        </div>
      </div>

      {/* Emergency Contacts Modal */}
      {mode === 'EMERGENCY_LIST' && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-8 animate-in zoom-in duration-300">
          <div className="glass max-w-4xl w-full p-10 rounded-[3rem] border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-black">அவசர எண்கள் (Contacts)</h2>
              <button onClick={() => setMode('GRID')} className="text-4xl opacity-50 hover:opacity-100">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {EMERGENCY_CONTACTS.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => window.location.href = `tel:${contact.phoneNumber}`}
                  className={`flex items-center gap-6 p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-left`}
                >
                  <span className="text-6xl">{contact.icon}</span>
                  <div>
                    <p className="text-3xl font-black">{contact.tamilLabel}</p>
                    <p className="text-xl opacity-40 font-bold uppercase tracking-widest">{contact.label}</p>
                    <p className="text-2xl text-blue-400 mt-2 font-mono">{contact.phoneNumber}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {mode === 'SETTINGS' && (
        <Settings
          emergencyNumber={emergencyNumber}
          onSave={handleSaveEmergency}
          onClose={() => setMode('GRID')}
        />
      )}

      {/* Drawing Pad */}
      {mode === 'DRAW' && <DrawingPad onClose={() => setMode('GRID')} />}
      
      {/* Offline Indicator */}
      {!navigator.onLine && mode === 'GRID' && (
        <div className="fixed bottom-1 left-4 text-white/10 text-[8px] uppercase tracking-tighter">
          Offline
        </div>
      )}
    </div>
  );
};

export default App;
