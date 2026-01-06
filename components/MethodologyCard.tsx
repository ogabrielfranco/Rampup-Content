
import React from 'react';
import { Methodology } from '../types';

interface Props {
  method: Methodology;
  onSelect: (method: Methodology) => void;
  isSelected: boolean;
}

export const MethodologyCard: React.FC<Props> = ({ method, onSelect, isSelected }) => {
  return (
    <button
      onClick={() => onSelect(method)}
      className={`relative p-6 rounded-[2rem] border transition-all duration-500 text-left group overflow-hidden
        ${isSelected 
          ? 'bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.15)] scale-[1.02]' 
          : 'bg-slate-900/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/60 hover:translate-y-[-4px]'}`}
    >
      {/* Decorative background glow for selected state */}
      {isSelected && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none"></div>
      )}

      {/* Icon Container */}
      <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-3xl mb-5 transition-all duration-500 
        ${isSelected 
          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 rotate-3' 
          : 'bg-slate-800/80 text-slate-300 group-hover:bg-slate-700 group-hover:scale-110 group-hover:-rotate-3'}`}>
        {method.icon}
      </div>

      <div className="relative z-10">
        <h3 className={`text-lg font-black tracking-tight mb-2 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
          {method.title}
        </h3>
        <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 line-clamp-2 ${isSelected ? 'text-indigo-200/70' : 'text-slate-500 group-hover:text-slate-400'}`}>
          {method.description}
        </p>
      </div>

      {/* Selected Indicator Dot */}
      <div className={`absolute top-6 right-6 w-2 h-2 rounded-full transition-all duration-500 
        ${isSelected ? 'bg-indigo-400 scale-100 opacity-100 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-transparent scale-0 opacity-0'}`}>
      </div>
    </button>
  );
};
