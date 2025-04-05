import React from 'react';
import RedFlagCheckbox from './RedFlagCheckbox';

interface CategorySectionProps {
  category: string;
  flags: string[];
  selectedFlags: string[];
  onFlagChange: (flag: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, flags, selectedFlags, onFlagChange }) => {
  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold text-red-500 mb-3">{category}</h3>
      <div className="space-y-2">
        {flags.map(flag => (
          <RedFlagCheckbox
            key={flag}
            label={flag}
            checked={selectedFlags.includes(flag)}
            onChange={() => onFlagChange(flag)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;