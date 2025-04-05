import React from 'react';
import { Share2, AlertTriangle } from 'lucide-react';

interface SharedBannerProps {
  profileName: string;
  generateShareableLink: () => void;
}

const SharedBanner: React.FC<SharedBannerProps> = ({ profileName, generateShareableLink }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 mb-6 rounded-xl p-4 border border-indigo-500/30 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <AlertTriangle className="text-indigo-400" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Viewing Shared Profile: <span className="text-indigo-300">{profileName}</span>
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              This is a read-only view of someone's relationship assessment
            </p>
          </div>
        </div>
        <button
          onClick={generateShareableLink}
          className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md"
        >
          <Share2 size={16} className="mr-2" />
          <span className="font-medium">Share Again</span>
        </button>
      </div>
    </div>
  );
};

export default SharedBanner;