import React from 'react';
import { relationshipTraits } from '../relationshipTraitSystem';
import { 
  MessageSquare,
  Shield, 
  User, 
  Heart, 
  Lock, 
  Briefcase, 
  UserCircle,
  CheckCircle
} from 'lucide-react';

interface TraitProgressProps {
  selections: Record<string, string>;
}

const TraitProgress: React.FC<TraitProgressProps> = ({ selections }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Communication':
        return <MessageSquare size={16} className="text-indigo-400" />;
      case 'Respect & Boundaries':
        return <Shield size={16} className="text-pink-400" />;
      case 'Independence':
        return <User size={16} className="text-teal-400" />;
      case 'Emotional Patterns':
        return <Heart size={16} className="text-violet-400" />;
      case 'Trust':
        return <Lock size={16} className="text-red-400" />;
      case 'Lifestyle':
        return <Briefcase size={16} className="text-yellow-400" />;
      case 'Character':
        return <UserCircle size={16} className="text-green-400" />;
      default:
        return <MessageSquare size={16} className="text-gray-400" />;
    }
  };

  const calculateCategoryProgress = () => {
    const progress: Record<string, { completed: number; total: number; percentage: number }> = {};
    
    Object.entries(relationshipTraits).forEach(([category, traits]) => {
      const total = traits.length;
      let completed = 0;
      
      traits.forEach(trait => {
        const traitId = `${category}_${trait.trait}`.replace(/\s+/g, '_').toLowerCase();
        if (selections[traitId]) {
          completed++;
        }
      });
      
      progress[category] = {
        completed,
        total,
        percentage: Math.round((completed / total) * 100)
      };
    });
    
    return progress;
  };
  
  const getTotalProgress = () => {
    let completed = 0;
    let total = 0;
    
    Object.entries(relationshipTraits).forEach(([_, traits]) => {
      total += traits.length;
    });
    
    completed = Object.keys(selections).length;
    
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-700';
    if (percentage === 100) return 'bg-green-500';
    if (percentage > 75) return 'bg-blue-500';
    if (percentage > 50) return 'bg-indigo-500';
    if (percentage > 25) return 'bg-purple-500';
    return 'bg-pink-500';
  };
  
  const categoryProgress = calculateCategoryProgress();
  const totalProgress = getTotalProgress();
  
  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/20 to-indigo-500/20">
        <h2 className="font-bold text-white">Assessment Progress</h2>
      </div>
      
      <div className="p-4">
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-300">Total Progress</div>
            <div className="text-gray-300 flex items-center">
              <span>{totalProgress.completed}/{totalProgress.total} Traits ({totalProgress.percentage}%)</span>
              {totalProgress.percentage === 100 && (
                <CheckCircle size={16} className="ml-2 text-green-400" />
              )}
            </div>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(totalProgress.percentage)}`} 
              style={{ width: `${totalProgress.percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(categoryProgress).map(([category, progress]) => (
            <div key={category} className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center text-gray-300">
                  <span className="mr-2">{getCategoryIcon(category)}</span>
                  <span>{category}</span>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  progress.percentage === 100 
                    ? 'bg-green-500/20 text-green-400' 
                    : progress.percentage > 0 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-gray-700/50 text-gray-400'
                }`}>
                  {progress.percentage}%
                </div>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(progress.percentage)}`} 
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TraitProgress;