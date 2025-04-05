import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { CategoryData } from '../types';

interface FlagCategoryProps {
  categoryName: string;
  categoryData: CategoryData;
  selectedFlags: string[];
  expandedCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  handleFlagChange: (flag: string) => void;
  viewMode: 'edit' | 'shared';
}

const FlagCategory: React.FC<FlagCategoryProps> = ({
  categoryName,
  categoryData,
  selectedFlags,
  expandedCategories,
  toggleCategory,
  handleFlagChange,
  viewMode
}) => {
  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden">
      <button 
        className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${categoryData.color} cursor-pointer transition-all`}
        onClick={() => toggleCategory(categoryName)}
      >
        <div className="flex items-center">
          {categoryData.icon}
          <h3 className="text-lg font-bold ml-2">{categoryName}</h3>
        </div>
        {expandedCategories[categoryName] ? 
          <ChevronUp size={20} /> : 
          <ChevronDown size={20} />
        }
      </button>
      
      {expandedCategories[categoryName] && (
        <div className="p-4 space-y-3 bg-gray-800">
          {categoryData.flags.map(flag => (
            <label 
              key={flag} 
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                viewMode === 'edit' ? 'cursor-pointer hover:bg-gray-700' : ''
              }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedFlags.includes(flag)}
                  onChange={() => handleFlagChange(flag)}
                  disabled={viewMode === 'shared'}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  selectedFlags.includes(flag) ? 'bg-pink-600' : 'bg-gray-600'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  selectedFlags.includes(flag) ? 'transform translate-x-6' : ''
                }`}></div>
              </div>
              <span className="text-sm md:text-base">{flag}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagCategory;