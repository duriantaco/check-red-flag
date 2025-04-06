import React, { useState } from 'react';
import { 
  Plus, X, User, Share2, Download, RefreshCw, Flag
} from 'lucide-react';

interface FloatingActionButtonProps {
  onAddProfile: () => void;
  onAddTrait: () => void;
  onShare: () => void;
  onDownload: () => void;
  onReset: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onAddProfile, 
  onAddTrait, 
  onShare, 
  onDownload, 
  onReset 
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const actionButtons = [
    { 
      icon: <User size={18} />, 
      label: "New Profile", 
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        onAddProfile();
        setIsExpanded(false);
      }
    },
    { 
      icon: <Flag size={18} />, 
      label: "Add Custom Flag", 
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        onAddTrait();
        setIsExpanded(false);
      }
    },
    { 
      icon: <Share2 size={18} />, 
      label: "Share", 
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => {
        onShare();
        setIsExpanded(false);
      }
    },
    { 
      icon: <Download size={18} />, 
      label: "Download", 
      color: "bg-indigo-500 hover:bg-indigo-600",
      action: () => {
        onDownload();
        setIsExpanded(false);
      }
    },
    { 
      icon: <RefreshCw size={18} />, 
      label: "Reset All", 
      color: "bg-red-500 hover:bg-red-600",
      action: () => {
        onReset();
        setIsExpanded(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col-reverse items-end space-y-2 space-y-reverse">
      {/* Main FAB button */}
      <button
        onClick={toggleExpand}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg
                  flex items-center justify-center transition-all duration-300 hover:shadow-pink-500/20"
      >
        {isExpanded ? <X size={24} /> : <Plus size={24} />}
      </button>
      
      {/* Action buttons that appear when expanded */}
      {isExpanded && (
        <div className="flex flex-col-reverse space-y-2 space-y-reverse transition-all duration-300">
          {actionButtons.map((button, index) => (
            <div 
              key={index} 
              className="flex items-center justify-end space-x-2 mb-2"
            >
              <span className="bg-gray-800 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                {button.label}
              </span>
              <button
                onClick={button.action}
                className={`w-10 h-10 rounded-full ${button.color} text-white shadow-md 
                          flex items-center justify-center`}
              >
                {button.icon}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;