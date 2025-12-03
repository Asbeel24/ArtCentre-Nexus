import React, { useState } from 'react';
import { Concept, SynthesisResult } from '../types';
import { synthesizeIdea } from '../services/geminiService';

interface IdeaSynthesizerProps {
  selectedConcepts: Concept[];
  onClear: () => void;
}

const IdeaSynthesizer: React.FC<IdeaSynthesizerProps> = ({ selectedConcepts, onClear }) => {
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SynthesisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSynthesize = async () => {
    if (selectedConcepts.length === 0 && !context) {
      setError("Please select at least one concept or provide context.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await synthesizeIdea(selectedConcepts, context);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Something went wrong during synthesis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-800 rounded-lg border border-slate-700 p-6 flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Synthesis Engine
            </h2>
            <p className="text-slate-400 text-sm mt-1">Recombine selected terms to generate new art projects.</p>
        </div>
        {selectedConcepts.length > 0 && (
            <button onClick={onClear} className="text-xs text-slate-500 hover:text-white underline">
                Clear Selections
            </button>
        )}
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="bg-slate-900/50 p-3 rounded border border-slate-700 min-h-[60px]">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2 block">Active Inputs</span>
          {selectedConcepts.length === 0 ? (
            <span className="text-slate-600 italic text-sm">Select terms from the table or graph...</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedConcepts.map(c => (
                <span key={c.id} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs flex items-center gap-2">
                  {c.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2 block">Additional Context / Constraints</label>
            <textarea
            className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-sm text-white focus:border-cyan-500 outline-none transition-all"
            rows={3}
            placeholder="e.g. 'Make it interactive using a webcam' or 'Focus on the aesthetic of brutalism'"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            />
        </div>

        <button
          onClick={handleSynthesize}
          disabled={loading}
          className={`w-full py-3 rounded font-bold uppercase tracking-widest text-sm transition-all
            ${loading 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/20'
            }`}
        >
          {loading ? 'Synthesizing...' : 'Generate Project'}
        </button>
        
        {error && <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-900/50">{error}</div>}
      </div>

      {/* Result Section */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t border-slate-700 pt-6">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-600 shadow-2xl">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">{result.title}</h3>
                    <p className="text-cyan-400 text-sm font-mono mt-1">{result.concept}</p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Visual Aesthetic</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{result.visuals}</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Sonic Landscape</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{result.audio}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {result.techStack.map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-900/30 border border-blue-800 text-blue-300 text-xs rounded font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded border border-slate-700/50">
                         <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Theoretical Rationale</h4>
                         <p className="text-sm text-slate-400 italic">{result.rationale}</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default IdeaSynthesizer;