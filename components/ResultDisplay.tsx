
import React, { useState, useMemo } from 'react';

interface Props {
  content: string;
  onExport: (format: 'md' | 'json') => void;
  onClear: () => void;
}

/**
 * Renderizador de Markdown Editorial
 * Foco: Estética de luxo, legibilidade máxima e ausência de layout shift.
 */
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const lines = useMemo(() => text.split('\n'), [text]);

  const formatText = (line: string) => {
    const parts = line.split('**');
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-white font-bold tracking-tight">{part}</strong> : part
    );
  };

  const renderContent = () => {
    const elements: React.ReactNode[] = [];
    let currentTable: string[][] = [];

    const flushTable = (key: number) => {
      if (currentTable.length === 0) return;
      
      const headers = currentTable[0];
      const rows = currentTable.slice(1);

      elements.push(
        <div key={`table-${key}`} className="my-12 w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
          {/* Desktop: Editorial Grid (Clean & Static) */}
          <div className="hidden md:block">
            <div className={`grid gap-px bg-slate-800/30 border border-slate-800/50 rounded-3xl overflow-hidden`} 
                 style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
              {/* Headers */}
              {headers.map((h, i) => (
                <div key={`h-${i}`} className="bg-slate-900/50 p-5 border-b border-slate-800">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80">
                    {h.trim()}
                  </span>
                </div>
              ))}
              {/* Rows */}
              {rows.map((row, ri) => (
                <React.Fragment key={`row-${ri}`}>
                  {row.map((cell, ci) => (
                    <div key={`cell-${ri}-${ci}`} className="bg-[#08080c] p-6 text-sm text-slate-400 leading-relaxed min-h-[100px] border-slate-800/20 last:border-0">
                      {formatText(cell.trim())}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile: Consistent Vertical Cards */}
          <div className="md:hidden space-y-4">
            {rows.map((row, ri) => (
              <div key={ri} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                {headers.map((h, ci) => (
                  <div key={ci} className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500/60">{h.trim()}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{formatText(row[ci]?.trim() || '-')}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
      currentTable = [];
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.includes('|') && !trimmed.startsWith('---')) {
        const cells = trimmed.split('|').filter(c => c.trim() !== '' || (line.startsWith('|') && line.endsWith('|')));
        if (cells.length > 0) {
          currentTable.push(cells);
          return;
        }
      } else if (currentTable.length > 0) {
        if (!trimmed.includes('---')) {
          flushTable(idx);
        } else {
          return;
        }
      }

      if (trimmed.startsWith('### ')) {
        elements.push(<h3 key={idx} className="text-lg md:text-2xl font-bold text-indigo-300 mt-16 mb-6 tracking-tight flex items-center gap-3">
          <span className="w-8 h-px bg-indigo-500/30"></span>
          {formatText(trimmed.replace('### ', ''))}
        </h3>);
      }
      else if (trimmed.startsWith('## ')) {
        elements.push(<h2 key={idx} className="text-2xl md:text-3xl font-black text-white mt-20 mb-8 tracking-tighter border-l-2 border-indigo-600 pl-6 py-1">
          {formatText(trimmed.replace('## ', ''))}
        </h2>);
      }
      else if (trimmed.startsWith('# ')) {
        elements.push(<h1 key={idx} className="text-3xl md:text-5xl font-black text-white mb-16 text-center py-12 bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/5">
          {formatText(trimmed.replace('# ', ''))}
        </h1>);
      }
      else if (trimmed.startsWith('> ')) {
        elements.push(<blockquote key={idx} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] italic text-indigo-100/90 my-10 text-xl leading-relaxed relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
          {formatText(trimmed.replace('> ', ''))}
        </blockquote>);
      }
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <div key={idx} className="flex gap-4 ml-2 items-start py-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2.5 transition-transform group-hover:scale-150"></div>
            <p className="text-base md:text-lg text-slate-300/90 leading-relaxed">{formatText(trimmed.replace(/^[\s\-\*]+/, ''))}</p>
          </div>
        );
      }
      else if (trimmed === '') {
        elements.push(<div key={idx} className="h-6" />);
      }
      else {
        elements.push(<p key={idx} className="text-base md:text-xl text-slate-400/90 leading-relaxed mb-6 font-light">{formatText(line)}</p>);
      }
    });

    flushTable(lines.length);
    return elements;
  };

  return <div className="font-inter antialiased select-text">{renderContent()}</div>;
};

export const ResultDisplay: React.FC<Props> = ({ content, onExport, onClear }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 md:mt-24 bg-[#050508] rounded-[3rem] border border-slate-800/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Action Bar - Glassmorphism */}
      <div className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-slate-800/50 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-400">Exclusive Report</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-800"></div>
          <span className="hidden sm:block text-[10px] font-medium text-slate-500 uppercase tracking-widest">© 2024 CONTENT ENGINE</span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              copied ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button
            onClick={() => onExport('md')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            Export .MD
          </button>
          <button
            onClick={onClear}
            className="p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
            title="Delete Document"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
      
      {/* High-End Document Layout */}
      <div className="relative">
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="px-6 md:px-24 lg:px-32 py-16 md:py-28 max-w-5xl mx-auto relative z-10">
          <MarkdownRenderer text={content} />

          {/* Document Footer / Watermark */}
          <div className="mt-32 pt-16 border-t border-slate-900 flex flex-col items-center gap-6">
            <div className="flex items-center gap-8 opacity-20 grayscale">
              <span className="text-[10px] font-black tracking-widest uppercase">Verified by AI</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              <span className="text-[10px] font-black tracking-widest uppercase">High Performance</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              <span className="text-[10px] font-black tracking-widest uppercase">Mastery</span>
            </div>
            <div className="text-[8px] font-black uppercase tracking-[0.8em] text-slate-700 animate-pulse">
              Confidential Content Strategy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
