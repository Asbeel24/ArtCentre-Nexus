import React, { useState, useMemo } from 'react';
import { Concept, Category } from '../types';

interface ConceptTableProps {
  concepts: Concept[];
  onSelect: (concept: Concept) => void;
  selectedIds: string[];
}

const ConceptTable: React.FC<ConceptTableProps> = ({ concepts, onSelect, selectedIds }) => {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredData = useMemo(() => {
    return concepts.filter(c => {
      const matchesText = c.name.toLowerCase().includes(filter.toLowerCase()) || 
                          c.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()));
      const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
      return matchesText && matchesCat;
    });
  }, [concepts, filter, categoryFilter]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-800 rounded-lg border border-slate-700">
      <div className="p-4 border-b border-slate-700 flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-xl font-bold text-cyan-400">Knowledge Base</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search term or tag..."
            className="px-3 py-1 bg-slate-900 border border-slate-600 rounded text-sm text-white focus:border-cyan-500 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select 
            className="px-3 py-1 bg-slate-900 border border-slate-600 rounded text-sm text-white focus:border-cyan-500 outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Object.values(Category).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900 text-xs uppercase sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Description</th>
              <th className="px-6 py-3 font-semibold">Tags</th>
              <th className="px-6 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredData.map(concept => {
              const isSelected = selectedIds.includes(concept.id);
              return (
                <tr 
                  key={concept.id} 
                  className={`hover:bg-slate-700/50 transition-colors ${isSelected ? 'bg-cyan-900/20' : ''}`}
                >
                  <td className="px-6 py-4 font-medium text-white">{concept.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold
                      ${concept.category === Category.TECHNOLOGY ? 'bg-blue-900 text-blue-200' : 
                        concept.category === Category.AESTHETIC ? 'bg-purple-900 text-purple-200' :
                        concept.category === Category.MOVEMENT ? 'bg-amber-900 text-amber-200' :
                        'bg-slate-600 text-slate-200'
                      }`}>
                      {concept.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs" title={concept.description}>
                    {concept.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {concept.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-xs text-slate-400">#{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onSelect(concept)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-colors border
                        ${isSelected 
                          ? 'bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500/20' 
                          : 'bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'}`}
                    >
                      {isSelected ? 'Remove' : 'Select'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConceptTable;