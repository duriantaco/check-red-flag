import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ProfileModalProps {
  newProfileName: string;
  setNewProfileName: (name: string) => void;
  setShowProfileModal: (show: boolean) => void;
  addNewProfile: () => void;
  isMobile?: boolean; 
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  newProfileName,
  setNewProfileName,
  setShowProfileModal,
  addNewProfile,
  isMobile = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowProfileModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowProfileModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewProfile();
  };

  const modalClasses = isMobile
    ? "fixed inset-0 bg-black/75 z-50 flex flex-col justify-end"
    : "fixed inset-0 bg-black/75 z-50 flex items-center justify-center";

  const contentClasses = isMobile
    ? "bg-gray-800 border border-gray-700 rounded-t-xl p-4 animate-slide-up w-full max-h-[80vh] overflow-auto"
    : "bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full animate-fade-in";

  return (
    <div className={modalClasses} onClick={() => setShowProfileModal(false)}>
      <div 
        className={contentClasses} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Create New Profile</h2>
          <button
            className="p-1 hover:bg-gray-700 rounded-full"
            onClick={() => setShowProfileModal(false)}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="profileName" className="block text-sm font-medium text-gray-300 mb-2">
              Profile Name
            </label>
            <input
              ref={inputRef}
              id="profileName"
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Enter a name for this profile"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              onClick={() => setShowProfileModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              disabled={!newProfileName.trim()}
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;