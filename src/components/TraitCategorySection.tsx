import React from 'react';
import { TraitSpectrumSelector } from './TraitSpectrumSelector';

interface TraitCategorySectionProps {
  category: string;
  traits: Array<{
    trait: string;
    negative: string;
    positive: string;
    negativeWeight: number;
    positiveWeight: number;
  }>;
  selections: Record<string, string>;
  onChange: (traitId: string, value: string) => void;
  viewMode: 'edit' | 'shared';
}

export const TraitCategorySection: React.FC<TraitCategorySectionProps> = ({
  category,
  traits,
  selections,
  onChange,
  viewMode
}) => {
  const [expanded, setExpanded] = React.useState(true);
  
  let categoryColor = "from-blue-500 to-blue-600";
  if (category === "Communication") categoryColor = "from-indigo-500 to-indigo-600";
  else if (category === "Respect & Boundaries") categoryColor = "from-pink-500 to-pink-600";
  else if (category === "Independence") categoryColor = "from-teal-500 to-teal-600";
  else if (category === "Emotional Patterns") categoryColor = "from-violet-500 to-violet-600";
  else if (category === "Trust") categoryColor = "from-red-500 to-red-600";
  else if (category === "Lifestyle") categoryColor = "from-yellow-500 to-yellow-600";
  else if (category === "Character") categoryColor = "from-green-500 to-green-600";
  
  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden mb-4">
      <button 
        className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${categoryColor} cursor-pointer transition-all`}
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-bold">{category}</h3>
        <span>{expanded ? '−' : '+'}</span>
      </button>
      
      {expanded && (
        <div className="p-4 bg-gray-800">
          {traits.map((trait) => (
            <TraitSpectrumSelector
              key={trait.trait}
              category={category}
              trait={trait}
              selection={selections[`${category}_${trait.trait}`.replace(/\s+/g, '_').toLowerCase()] || ''}
              onChange={onChange}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};