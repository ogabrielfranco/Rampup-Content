
import React, { useState, useEffect } from 'react';
import { Methodology, MethodologyPrompt } from './types';
import { METHODOLOGIES, FIELD_GUIDE } from './constants';
import { MethodologyCard } from './components/MethodologyCard';
import { ResultDisplay } from './components/ResultDisplay';
import { generateContent } from './services/geminiService';

const REASSURING_MESSAGES = [
  "Analisando tendências virais...",
  "Aplicando gatilhos psicológicos...",
  "Estruturando roteiros magnéticos...",
  "Hackeando o algoritmo...",
  "Otimizando retenção...",
  "Finalizando estratégia..."
];

const App: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<Methodology | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<MethodologyPrompt | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (loading) {
      setLoadingMessage(REASSURING_MESSAGES[0]);
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % REASSURING_MESSAGES.length;
        setLoadingMessage(REASSURING_MESSAGES[i]);
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const handleMethodSelect = (method: Methodology) => {
    setSelectedMethod(method);
    setResult(null);
    setError(null);
    if (!method.isSubPromptSystem && method.prompts.length > 0) {
      setSelectedPrompt(method.prompts[0]);
      const initialValues: Record<string, string> = {};
      method.prompts[0].fields.forEach(f => initialValues[f] = '');
      setFormValues(initialValues);
    } else {
      setSelectedPrompt(null);
      setFormValues({});
    }
    
    setTimeout(() => {
      document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handlePromptSelect = (prompt: MethodologyPrompt) => {
    setSelectedPrompt(prompt);
    setResult(null);
    setError(null);
    const initialValues: Record<string, string> = {};
    prompt.fields.forEach(f => initialValues[f] = '');
    setFormValues(initialValues);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrompt || !selectedMethod) return;

    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      let finalPrompt = selectedPrompt.template;
      Object.entries(formValues).forEach(([key, val]) => {
        finalPrompt = finalPrompt.replace(new RegExp(`\\[${key}\\]`, 'g'), val);
      });

      const generated = await generateContent(finalPrompt, `${selectedMethod.title} - ${selectedPrompt.label}`);
      setResult(generated || 'Sem resposta.');
      
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } catch (err: any) {
      setError(err.message || "Houve um erro na geração via IA. Verifique sua chave de API nas configurações do Vercel.");
    } finally {
      setLoading(false);
    }
  };

  const exportResult = (format: 'md' | 'json') => {
    if (!result) return;
    const content = format === 'json' ? JSON.stringify({ result, formValues }, null, 2) : result;
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-strategy-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-slate-200 pb-20 selection:bg-indigo-500/40 font-inter">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <header className="mb-16 md:mb-24 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
            Vercel Ready Deployment
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]">
            SuperApp <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Content</span>
          </h1>
          <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A infraestrutura definitiva para estrategistas que não aceitam o mediano. 
          </p>
        </header>

        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 px-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500/80">01. Seleção DNA</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Eixo Metodológico</h2>
            </div>
            <p className="text-slate-500 text-xs md:text-sm font-medium">Escolha sua linha tática de atuação.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {METHODOLOGIES.map(method => (
              <MethodologyCard 
                key={method.id} 
                method={method} 
                onSelect={handleMethodSelect}
                isSelected={selectedMethod?.id === method.id}
              />
            ))}
          </div>
        </section>

        {selectedMethod && (
          <div id="form-section" className="scroll-mt-12">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 mb-16 backdrop-blur-2xl shadow-2xl">
              <div className="mb-12 p-6 md:p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-indigo-500/20 text-2xl border border-indigo-500/20">
                    {selectedMethod.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500 text-[9px] font-black uppercase text-white tracking-widest">Resumo Estratégico</span>
                      <h3 className="text-xl font-black text-white">{selectedMethod.title}</h3>
                    </div>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed italic">
                      "{selectedMethod.description}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                {selectedMethod.isSubPromptSystem && (
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-2 mb-6 px-2">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Variáveis Táticas</h4>
                    </div>
                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                      {selectedMethod.prompts.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handlePromptSelect(p)}
                          className={`whitespace-nowrap lg:whitespace-normal px-6 py-4 rounded-2xl text-xs md:text-sm font-bold transition-all shrink-0 border
                            ${selectedPrompt?.id === p.id 
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30 translate-x-1' 
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'}`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  {selectedPrompt ? (
                    <div>
                      <div className="flex items-center gap-6 mb-12">
                        <div className="w-12 h-12 flex items-center justify-center rounded-[1rem] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-2xl">
                          {selectedMethod.icon}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Execução Tática</h3>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">{selectedPrompt.label}</p>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {selectedPrompt.fields.map(field => {
                            const guide = FIELD_GUIDE[field];
                            const isLarge = field === 'texto' || field === 'contexto' || field === 'assunto';
                            return (
                              <div key={field} className={`${isLarge ? 'md:col-span-2' : ''} space-y-3`}>
                                <div className="flex items-center justify-between px-1">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                    {guide?.label || field}
                                  </label>
                                </div>
                                {isLarge ? (
                                  <textarea
                                    required
                                    rows={4}
                                    value={formValues[field] || ''}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    className="w-full bg-black/60 border border-slate-800/80 rounded-2xl px-5 py-4 text-sm md:text-base text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800 resize-none"
                                    placeholder={`Descreva os detalhes aqui...`}
                                  />
                                ) : (
                                  <input
                                    required
                                    type="text"
                                    value={formValues[field] || ''}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    className="w-full bg-black/60 border border-slate-800/80 rounded-2xl px-5 py-4 text-sm md:text-base text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800"
                                    placeholder={`Ex: ${field === 'nicho' ? 'Estética Avançada' : '...'}`}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm md:text-lg transition-all shadow-2xl shadow-indigo-600/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
                        >
                          {loading ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span className="tracking-tight">{loadingMessage}</span>
                            </>
                          ) : (
                            <>
                              <span className="tracking-tight uppercase tracking-[0.1em]">Gerar Estratégia de Elite</span>
                              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-[2.5rem] bg-black/20 p-8 text-center">
                      <div className="w-16 h-16 bg-slate-800/40 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      </div>
                      <p className="text-sm font-medium max-w-xs mx-auto">Escolha uma variável tática ao lado para iniciar a construção.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <section id="result-section" className="scroll-mt-12 pb-20">
            <ResultDisplay 
              content={result} 
              onExport={exportResult} 
              onClear={() => setResult(null)} 
            />
          </section>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
