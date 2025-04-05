import React from 'react';
import { PlusCircle, Tag } from 'lucide-react';
import { relationshipTraits } from '../../relationshipTraitSystem';

interface CustomFlagModalProps {
  customFlag: string;
  setCustomFlag: (flag: string) => void;
  customCategory: string;
  setCustomCategory: (category: string) => void;
  setShowCustomFlagModal: (show: boolean) => void;
  addCustomFlag: () => void;
  categoryData?: any; 
}

const CustomFlagModal: React.FC<CustomFlagModalProps> = ({
  customFlag,
  setCustomFlag,
  customCategory,
  setCustomCategory,
  setShowCustomFlagModal,
  addCustomFlag
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-fadeIn">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
          <h3 className="text-xl font-bold flex items-center">
            <PlusCircle size={20} className="mr-2" />
            Add Custom Trait
          </h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center">
              <Tag size={16} className="mr-2 text-purple-400" />
              Category
            </label>
            <select
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-colors duration-200"
            >
              {Object.keys(relationshipTraits).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Choose which category your trait belongs to
            </p>
          </div>
          
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Trait Name
          </label>
          <input
            type="text"
            value={customFlag}
            onChange={(e) => setCustomFlag(e.target.value)}
            placeholder="e.g., Dismisses my career ambitions"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-colors duration-200"
            autoFocus
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter a specific behavior or trait you want to rate
          </p>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setShowCustomFlagModal(false);
                  setCustomFlag('');
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addCustomFlag}
                disabled={!customFlag.trim()}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  !customFlag.trim() 
                    ? 'bg-indigo-700 opacity-50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                }`}
              >
                <PlusCircle size={16} className="mr-2" />
                Add Trait
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFlagModal;