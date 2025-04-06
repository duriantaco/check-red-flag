
import React, { useEffect, useRef } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import { ShareModalProps } from '../../types'; 

const ShareModal: React.FC<ShareModalProps> = ({
  shareableLink,
  copied,
  setShowShareModal,
  copyToClipboard,
  downloadAsImage,
  isMobile = false
}) => {
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.select();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowShareModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setShowShareModal]);

  const modalClasses = isMobile
    ? "fixed inset-0 bg-black/75 z-50 flex flex-col justify-end"
    : "fixed inset-0 bg-black/75 z-50 flex items-center justify-center";

  const contentClasses = isMobile
    ? "bg-gray-800 border border-gray-700 rounded-t-xl p-4 animate-slide-up w-full max-h-[80vh] overflow-auto"
    : "bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full animate-fade-in";

  return (
    <div className={modalClasses} onClick={() => setShowShareModal(false)}>
      <div 
        className={contentClasses} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Share Your Assessment</h2>
          <button
            className="p-1 hover:bg-gray-700 rounded-full"
            onClick={() => setShowShareModal(false)}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-3">
            Share this link for others to view your relationship assessment:
          </p>
          <div className="flex items-center gap-2">
            <input
              ref={linkRef}
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={shareableLink}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="min-w-[44px] h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              aria-label={copied ? "Copied" : "Copy to clipboard"}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          {copied && (
            <p className="mt-2 text-sm text-green-400">
              Link copied to clipboard!
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <button
            onClick={downloadAsImage}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Download size={20} />
            <span>Download as Image</span>
          </button>
          <p className="mt-2 text-sm text-gray-400">
            Get a shareable image of your assessment results.
          </p>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setShowShareModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;