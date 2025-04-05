import React from 'react';
import { Share2, Copy, Check, Download } from 'lucide-react';

interface ShareModalProps {
  shareableLink: string;
  copied: boolean;
  setShowShareModal: (show: boolean) => void;
  copyToClipboard: () => void;
  downloadAsImage: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  shareableLink,
  copied,
  setShowShareModal,
  copyToClipboard,
  downloadAsImage
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <h3 className="text-xl font-bold flex items-center">
            <Share2 size={20} className="mr-2" />
            Share Your Results
          </h3>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Share this link with friends to show them your assessment:
          </p>
          
          <div className="flex items-center">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none text-white text-sm overflow-hidden"
            />
            <button
              onClick={copyToClipboard}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Close
              </button>
              
              <button
                onClick={downloadAsImage}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center"
              >
                <Download size={16} className="mr-1" />
                Download Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;