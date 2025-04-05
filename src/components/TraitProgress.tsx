import React from 'react';
import { relationshipTraits } from '../relationshipTraitSystem';

interface TraitProgressProps {
  selections: Record<string, string>;
}

const TraitProgress: React.FC<TraitProgressProps> = ({ selections }) => {
  const totalTraits = Object.values(relationshipTraits)
    .reduce((sum, traits) => sum + traits.length, 0);
  
  const ratedTraits = Object.keys(selections).length;
  
  const progressPercentage = (ratedTraits / totalTraits) * 100;

  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/20 to-indigo-500/20">
        <h2 className="font-bold text-lg text-white">Assessment Progress</h2>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <div className="text-gray-300 mb-2 md:mb-0">
            <span className="font-medium">{ratedTraits}</span> of <span className="font-medium">{totalTraits}</span> traits rated
          </div>
          <div className="text-right">
            <span className={`text-sm font-medium px-2 py-1 rounded-md ${
              progressPercentage < 25 ? 'bg-red-500/20 text-red-400' :
              progressPercentage < 50 ? 'bg-orange-500/20 text-orange-400' :
              progressPercentage < 75 ? 'bg-yellow-500/20 text-yellow-400' :
              progressPercentage < 100 ? 'bg-blue-500/20 text-blue-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
        </div>
        <div className="relative w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              progressPercentage < 25 ? 'bg-gradient-to-r from-red-500 to-red-600' :
              progressPercentage < 50 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
              progressPercentage < 75 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              progressPercentage < 100 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
              'bg-gradient-to-r from-green-500 to-green-600'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          
          {[25, 50, 75].map(milestone => (
            <div 
              key={milestone}
              className="absolute top-0 bottom-0 w-px bg-gray-500"
              style={{ left: `${milestone}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TraitProgress;