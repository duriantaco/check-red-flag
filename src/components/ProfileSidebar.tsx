import React from 'react';
import { Heart, BarChart2, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProfileSidebarProps {
  profileName: string;
  setProfileName: (name: string) => void;
  currentProfile: string;
  profiles: { [key: string]: any };
  setCurrentProfile: (profile: string) => void;
  setTraitSelections: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setShowProfileModal: (show: boolean) => void;
  deleteCurrentProfile: () => void;
  generateShareableLink: () => void;
  downloadAsImage: () => void;
  resetSelections: () => void;
  setShowCustomTraitModal: (show: boolean) => void;
  riskLevel: string;
  riskColor: string;
  redScore: number;
  greenScore: number;
  netScore: number;
  ratedTraitsCount: number;
  totalTraitsCount: number;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profileName,
  currentProfile,
  profiles,
  setCurrentProfile,
  setShowProfileModal,
  deleteCurrentProfile,
  generateShareableLink,
  downloadAsImage,
  resetSelections,
  setShowCustomTraitModal,
  riskLevel,
  redScore,
  greenScore,
  netScore,
  ratedTraitsCount,
  totalTraitsCount
}) => {
  return (
    <div className="md:w-1/4 space-y-6">
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 px-4 py-3 border-b border-gray-700/50">
          <h2 className="font-bold text-lg flex items-center">
            <Heart size={18} className="mr-2 text-pink-500" fill="currentColor" />
            <span className="text-white">Profile</span>
          </h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Current Profile</label>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{profileName}</h3>
              <button
                onClick={() => setShowProfileModal(true)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all duration-300 ease-in-out"
                title="Create new profile"
              >
                +
              </button>
            </div>
          </div>

          {Object.keys(profiles).length > 1 && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400 mb-1 block">Your Profiles</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                {Object.keys(profiles).map(profile => (
                  <button
                    key={profile}
                    onClick={() => setCurrentProfile(profile)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentProfile === profile 
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 px-4 py-3 border-b border-gray-700/50">
          <h2 className="font-bold text-lg flex items-center">
            <BarChart2 size={18} className="mr-2 text-pink-500" />
            <span className="text-white">Actions</span>
          </h2>
        </div>
        <div className="p-4 space-y-3">
          <button
            onClick={resetSelections}
            className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out"
          >
            <span>Reset Answers</span>
          </button>
          <button
            onClick={generateShareableLink}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out"
          >
            <span>Share Results</span>
          </button>
          <button
            onClick={downloadAsImage}
            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out"
          >
            <span>Download Results</span>
          </button>
          {currentProfile !== 'Default' && (
            <button
              onClick={deleteCurrentProfile}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-red-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out"
            >
              <span>Delete Profile</span>
            </button>
          )}
          <button
            onClick={() => setShowCustomTraitModal(true)}
            className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out"
          >
            <span>Add Custom Trait</span>
          </button>
        </div>
      </div>

      <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden`}>
        <div className={`px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r ${
          riskLevel === 'Low' ? 'from-green-500/20 to-green-600/20' : 
          riskLevel === 'Moderate' ? 'from-yellow-500/20 to-orange-500/20' : 
          riskLevel === 'High' ? 'from-orange-500/20 to-red-500/20' : 
          riskLevel === 'Severe' ? 'from-red-500/20 to-red-600/20' : 
          'from-gray-500/20 to-gray-600/20'
        }`}>
          <h2 className="font-bold text-lg flex items-center">
            {riskLevel === 'Low' ? 
              <CheckCircle size={18} className="mr-2 text-green-500" /> : 
              <AlertTriangle size={18} className="mr-2 text-red-500" />
            }
            <span className="text-white">Risk Summary</span>
          </h2>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-400">Red Flags</span>
              <span className="text-sm font-medium text-red-500">{redScore}</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(100, (redScore/100) * 100)}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-400">Green Flags</span>
              <span className="text-sm font-medium text-green-500">{greenScore}</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(100, (greenScore/100) * 100)}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-400">Net Score</span>
              <span className={`text-sm font-medium ${netScore >= 0 ? 'text-green-500' : 'text-red-500'}`}>{netScore}</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-gray-500"></div>
              </div>
              {netScore >= 0 ? (
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-l-full transition-all duration-500 ease-out" style={{ width: '50%', marginLeft: '50%', transform: `scaleX(${Math.min(1, netScore/100)})` }}></div>
              ) : (
                <div className="bg-gradient-to-l from-red-500 to-orange-500 h-2 rounded-r-full transition-all duration-500 ease-out" style={{ width: '50%', transform: `scaleX(${Math.min(1, Math.abs(netScore)/100)})` }}></div>
              )}
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-700/50">
            <div className={`px-3 py-2 rounded-lg text-center font-bold ${
              riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' : 
              riskLevel === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' : 
              riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400' : 
              riskLevel === 'Severe' ? 'bg-red-500/20 text-red-400' : 
              'bg-gray-700 text-gray-400'
            }`}>
              {riskLevel || 'Not Rated'} Risk
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-400">Traits Rated</span>
              <span className="text-sm font-medium text-blue-400">{ratedTraitsCount} / {totalTraitsCount}</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${(ratedTraitsCount / totalTraitsCount) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;