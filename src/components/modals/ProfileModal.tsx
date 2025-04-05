import React from 'react';

interface ProfileModalProps {
  newProfileName: string;
  setNewProfileName: (name: string) => void;
  setShowProfileModal: (show: boolean) => void;
  addNewProfile: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  newProfileName,
  setNewProfileName,
  setShowProfileModal,
  addNewProfile
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 to-red-600 p-4">
          <h3 className="text-xl font-bold">Create New Profile</h3>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Profile Name
          </label>
          <input
            type="text"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Enter profile name"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
            autoFocus
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowProfileModal(false);
                setNewProfileName('');
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addNewProfile}
              disabled={!newProfileName.trim()}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !newProfileName.trim() 
                  ? 'bg-pink-700 opacity-50 cursor-not-allowed' 
                  : 'bg-pink-600 hover:bg-pink-700'
              }`}
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;