import React from 'react';
import { CheckCircle } from 'lucide-react';
import { spectrumLevels } from '../relationshipTraitSystem';

interface TraitSpectrumSelectorProps {
  category: string;
  trait: {
    trait: string;
    negative: string;
    positive: string;
    negativeWeight: number;
    positiveWeight: number;
  };
  selection: string;
  onChange: (traitId: string, value: string) => void;
  viewMode: 'edit' | 'shared';
}

export const TraitSpectrumSelector: React.FC<TraitSpectrumSelectorProps> = ({
  category,
  trait,
  selection,
  onChange,
  viewMode
}) => {
  const traitId = `${category}_${trait.trait}`.replace(/\s+/g, '_').toLowerCase();
  
  return (
    <div className="p-4 bg-gray-800 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-gray-200">{trait.trait}</h4>
        {trait.negativeWeight >= 50 && (
          <div className="text-xs bg-red-600 bg-opacity-20 text-red-400 px-2 py-1 rounded-full">
            Critical
          </div>
        )}
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <div className="max-w-[40%]">{trait.negative}</div>
        <div className="max-w-[40%] text-right">{trait.positive}</div>
      </div>
      
      <div className="flex justify-between items-center">
        {spectrumLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(traitId, level.value)}
            disabled={viewMode === 'shared'}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              selection === level.value
                ? `${level.color} ring-2 ring-white ring-offset-2 ring-offset-gray-800`
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            aria-label={level.label}
            title={level.label}
          >
            {selection === level.value && (
              <CheckCircle size={16} className="text-white" />
            )}
          </button>
        ))}
      </div>
      
      {selection && (
        <div className="mt-2 text-center text-sm">
          <span className={
            selection === 'very_negative' ? 'text-red-500' :
            selection === 'negative' ? 'text-red-400' :
            selection === 'neutral' ? 'text-gray-400' :
            selection === 'positive' ? 'text-green-400' :
            'text-green-500'
          }>
            {spectrumLevels.find(l => l.value === selection)?.label || 'Not rated'}
          </span>
        </div>
      )}
    </div>
  );
};