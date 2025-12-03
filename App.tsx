import React, { useState } from 'react';
import { Concept, Category } from './types';
import { INITIAL_CONCEPTS } from './constants';
import ConceptNetwork from './components/ConceptNetwork';
import ConceptTable from './components/ConceptTable';
import IdeaSynthesizer from './components/IdeaSynthesizer';
import { expandConcept } from './services/geminiService';

enum ViewMode {
  EXPLORE = 'explore',
  DATA = 'data'
}

const App: React.FC = () => {
  const [concepts, setConcepts] = useState<Concept[]>(INITIAL_CONCEPTS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EXPLORE);
  const [isExpanding, setIsExpanding] = useState(false);

  // Derived state for passing full objects
  const selectedConcepts = concepts.filter(c => selectedIds.includes(c.id));

  const toggleSelection = (concept: Concept) => {
    setSelectedIds(prev => 
      prev.includes(concept.id) 
        ? prev.filter(id => id !== concept.id)
        : [...prev, concept.id]
    );
  };

  const handleManualAdd = async () => {
    const term = prompt("Enter a term to research and add to the database:");
    if (!term) return;

    setIsExpanding(true);
    try {
        // Check if exists
        const exists = concepts.find(c => c.name.toLowerCase() === term.toLowerCase());
        if (exists) {
            alert("Concept already exists!");
            return;
        }

        const newConcept = await expandConcept(term);
        // Ensure ID is unique roughly
        if(concepts.find(c => c.id === newConcept.id)) {
            newConcept.id = newConcept.id + '-' + Date.now();
        }
        setConcepts(prev => [...prev, newConcept]);
    } catch (e) {
        alert("Failed to fetch concept details. Check API Key.");
    } finally {
        setIsExpanding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur fixed top-0 w-full z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg shadow-lg shadow-cyan-500/20"></div>
          <h1 className="text-xl font-bold tracking-tight text-white">ArtCode<span className="text-cyan-400">Nexus</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-slate-800 rounded-full p-1 border border-slate-700 flex">
              <button 
                onClick={() => setViewMode(ViewMode.EXPLORE)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === ViewMode.EXPLORE ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Network Map
              </button>
              <button 
                onClick={() => setViewMode(ViewMode.DATA)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === ViewMode.DATA ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Data Table
              </button>
           </div>
           
           <button 
             onClick={handleManualAdd}
             disabled={isExpanding}
             className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-sm text-cyan-400 transition-colors flex items-center gap-2"
           >
             {isExpanding ? 'Researching...' : '+ Add Term (AI)'}
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 p-6 flex flex-col lg:flex-row gap-6 h-screen overflow-hidden">
        
        {/* Left Column: Visualization/Data */}
        <section className="flex-1 h-full flex flex-col min-h-[400px]">
           {viewMode === ViewMode.EXPLORE ? (
             <ConceptNetwork 
                concepts={concepts} 
                onNodeClick={toggleSelection} 
             />
           ) : (
             <ConceptTable 
                concepts={concepts} 
                onSelect={toggleSelection} 
                selectedIds={selectedIds}
             />
           )}
        </section>

        {/* Right Column: Synthesis & Details */}
        <section className="w-full lg:w-[450px] xl:w-[500px] flex flex-col gap-6 overflow-y-auto pb-10">
            {/* Context Widget */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">Stats</h3>
                <div className="flex justify-between text-xs text-slate-400">
                    <span>Total Nodes: <strong className="text-white">{concepts.length}</strong></span>
                    <span>Selection: <strong className="text-cyan-400">{selectedIds.length}</strong></span>
                    <span>Tech: <strong className="text-blue-400">{concepts.filter(c => c.category === Category.TECHNOLOGY).length}</strong></span>
                    <span>Aesthetics: <strong className="text-purple-400">{concepts.filter(c => c.category === Category.AESTHETIC).length}</strong></span>
                </div>
            </div>

            {/* AI Generator */}
            <IdeaSynthesizer 
                selectedConcepts={selectedConcepts}
                onClear={() => setSelectedIds([])}
            />
            
            {/* Selected Items Detail List (if any) */}
            {selectedConcepts.length > 0 && (
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Selected Context</h3>
                    <div className="space-y-3">
                        {selectedConcepts.map(c => (
                            <div key={c.id} className="p-3 bg-slate-900 rounded border border-slate-700/50">
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-white text-sm">{c.name}</span>
                                    <button onClick={() => toggleSelection(c)} className="text-xs text-red-400 hover:text-red-300">remove</button>
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
      </main>
    </div>
  );
};

export default App;