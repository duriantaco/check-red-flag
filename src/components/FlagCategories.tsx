import React from 'react';
import FlagCategory from './FlagCategory';
import { CategoryData } from '../types';

interface FlagCategoriesProps {
  viewMode: 'edit' | 'shared';
  profileName: string;
  allCategories: Record<string, CategoryData>;
  selectedFlags: string[];
  expandedCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  handleFlagChange: (flag: string) => void;
}

const FlagCategories: React.FC<FlagCategoriesProps> = ({
  viewMode,
  profileName,
  allCategories,
  selectedFlags,
  expandedCategories,
  toggleCategory,
  handleFlagChange
}) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-6">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-center border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-2">
          {viewMode === 'edit' 
            ? "Select any red flags you've noticed" 
            : `Red Flags for ${profileName}`}
        </h2>
        <p className="text-gray-400">
          {viewMode === 'edit'
            ? "Check all behaviors that apply to get an assessment"
            : "This is a shared assessment of potential warning signs"}
        </p>
      </div>
      
      <div className="p-4 space-y-4">
        {Object.entries(allCategories).map(([categoryName, categoryData]) => (
          <FlagCategory
            key={categoryName}
            categoryName={categoryName}
            categoryData={categoryData}
            selectedFlags={selectedFlags}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            handleFlagChange={handleFlagChange}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default FlagCategories;