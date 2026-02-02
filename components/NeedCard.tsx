
import React from 'react';
import { NeedItem } from '../types';

interface NeedCardProps {
  item: NeedItem;
  onClick: (item: NeedItem) => void;
  active?: boolean;
}

const NeedCard: React.FC<NeedCardProps> = ({ item, onClick, active }) => {
  return (
    <button
      onClick={() => onClick(item)}
      className={`flex flex-col items-center justify-center rounded-xl md:rounded-2xl border backdrop-blur-md transition-all active:scale-90 h-full w-full p-1 aspect-square ${item.color} ${active ? 'ring-2 md:ring-4 ring-white/30 border-white/40 bg-white/20' : 'hover:bg-white/5 border-white/10'}`}
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <span className="text-3xl md:text-4xl lg:text-5xl drop-shadow-md" role="img" aria-label={item.label}>
          {item.icon}
        </span>
      </div>
      <div className="flex flex-col items-center pb-0.5 md:pb-1 px-1">
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-black tracking-tight leading-none text-center truncate w-full">{item.tamilLabel}</span>
        <span className="text-[6px] sm:text-[8px] md:text-[10px] opacity-40 font-bold uppercase tracking-tight md:tracking-[0.05em]">{item.label}</span>
      </div>
    </button>
  );
};

export default NeedCard;
