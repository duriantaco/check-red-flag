import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CustomFlagModalProps } from '../../types'; 

const CustomFlagModal: React.FC<CustomFlagModalProps> = ({
  customFlag,
  setCustomFlag,
  customCategory,
  setCustomCategory,
  setShowCustomFlagModal,
  addCustomFlag,
  isMobile = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCustomFlagModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowCustomFlagModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomFlag();
  };

  const categories = [
    'Communication',
    'Respect & Boundaries',
    'Independence',
    'Emotional Patterns',
    'Trust',
    'Lifestyle',
    'Character'
  ];

  const modalClasses = isMobile
    ? "fixed inset-0 bg-black/75 z-50 flex flex-col justify-end"
    : "fixed inset-0 bg-black/75 z-50 flex items-center justify-center";

  const contentClasses = isMobile
    ? "bg-gray-800 border border-gray-700 rounded-t-xl p-4 animate-slide-up w-full max-h-[80vh] overflow-auto"
    : "bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full animate-fade-in";

  return (
    <div className={modalClasses} onClick={() => setShowCustomFlagModal(false)}>
      <div 
        className={contentClasses} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Add Custom Red/Green Flag</h2>
          <button
            className="p-1 hover:bg-gray-700 rounded-full"
            onClick={() => setShowCustomFlagModal(false)}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="flagCategory" className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              id="flagCategory"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="customFlag" className="block text-sm font-medium text-gray-300 mb-2">
              Trait Description
            </label>
            <input
              ref={inputRef}
              id="customFlag"
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={customFlag}
              onChange={(e) => setCustomFlag(e.target.value)}
              placeholder="e.g., Communication Style, Anger Management"
            />
            <p className="mt-2 text-sm text-gray-400">
              This will be added as a custom trait that you can rate as positive or concerning.
            </p>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              onClick={() => setShowCustomFlagModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              disabled={!customFlag.trim()}
            >
              Add Trait
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomFlagModal;
