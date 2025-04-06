import React, { useState, useEffect, useCallback } from 'react';
import { relationshipTraits, TraitDefinition } from '../relationshipTraitSystem';
import { 
    MessageSquare,
    Shield,
    User,
    Heart,
    Lock,
    Briefcase,
    UserCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export interface CustomTraitDefinition extends TraitDefinition {
    isCustom: boolean;
    createdAt: number;
}

export interface RelationshipAssessmentProps {
    selections: Record<string, string>;
    onChange: (traitId: string, value: string) => void;
    viewMode: 'edit' | 'shared';
    customTraits?: Record<string, CustomTraitDefinition[]>;
}

const RelationshipAssessment: React.FC<RelationshipAssessmentProps> = ({ 
  selections, 
  onChange,
  viewMode,
  customTraits = {}
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const firstCategory = Object.keys(relationshipTraits)[0];
    setExpandedCategories(prev => ({
      ...prev,
      [firstCategory]: true
    }));
  }, []);

  const generateTraitId = (category: string, trait: TraitDefinition): string => {
    return `${category}_${trait.trait}`.replace(/\s+/g, '_').toLowerCase();
  };

  const getTraitDescription = (_: TraitDefinition): string => {
    return `Rate how your relationship demonstrates this trait, from very concerning to very positive behaviors.`;
  };

  const getTraitOptions = (trait: TraitDefinition) => {
    return [
      {
        value: 'very_negative',
        label: trait.negative,
        impact: -trait.negativeWeight
      },
      {
        value: 'negative',
        label: `Sometimes ${trait.negative.toLowerCase()}`,
        impact: Math.round(-trait.negativeWeight * 0.7)
      },
      {
        value: 'neutral',
        label: 'Neutral or mixed',
        impact: 0
      },
      {
        value: 'positive',
        label: `Usually ${trait.positive.toLowerCase()}`,
        impact: Math.round(trait.positiveWeight * 0.7)
      },
      {
        value: 'very_positive',
        label: trait.positive,
        impact: trait.positiveWeight
      }
    ];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Communication':
        return <MessageSquare size={20} className="text-indigo-400" />;
      case 'Respect & Boundaries':
        return <Shield size={20} className="text-pink-400" />;
      case 'Independence':
        return <User size={20} className="text-teal-400" />;
      case 'Emotional Patterns':
        return <Heart size={20} className="text-violet-400" />;
      case 'Trust':
        return <Lock size={20} className="text-red-400" />;
      case 'Lifestyle':
        return <Briefcase size={20} className="text-yellow-400" />;
      case 'Character':
        return <UserCircle size={20} className="text-green-400" />;
      default:
        return <MessageSquare size={20} className="text-gray-400" />;
    }
  };
  
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  
  const getCategoryCompletionStatus = (category: string, traits: TraitDefinition[]) => {
    const totalTraits = traits.length;
    const completedTraits = traits.filter(trait => 
      selections[generateTraitId(category, trait)]
    ).length;
    
    if (completedTraits === 0) return 'not-started';
    if (completedTraits === totalTraits) return 'completed';
    return 'in-progress';
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-pink-500/20 to-red-500/20">
        <h2 className="font-bold text-xl text-white">Relationship Assessment</h2>
      </div>
      <div className="p-4">
        <p className="text-gray-300 mb-6">
          Evaluate your relationship by rating each trait. This assessment will help identify potential red flags and strengths in your relationship.
        </p>
        
        <div className="relative timeline-assessment pb-4">
          <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-700/70"></div>
          
          <div className="space-y-6">
            {Object.entries(relationshipTraits).map(([categoryName, categoryTraits]) => {
              const customCategoryTraits = customTraits[categoryName] || [];
              const allTraits = [...categoryTraits, ...customCategoryTraits];
              const isExpanded = expandedCategories[categoryName];
              const hasSelections = allTraits.some(trait => 
                selections[generateTraitId(categoryName, trait)]
              );
              const status = getCategoryCompletionStatus(categoryName, allTraits);
              
              return (
                <div key={categoryName} className="relative">
                  <div 
                    className={`
                      flex items-center relative cursor-pointer z-10 ml-2
                      ${hasSelections ? 'text-white' : 'text-gray-400'}
                      ${viewMode === 'shared' ? 'pointer-events-none' : ''}
                    `}
                    onClick={() => toggleCategory(categoryName)}
                  >
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full mr-3
                      ${status === 'completed' ? 'bg-green-500/20 border border-green-500/50' : 
                        status === 'in-progress' ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50' : 
                        'bg-gray-800 border border-gray-700'}
                    `}>
                      {getCategoryIcon(categoryName)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{categoryName}</h3>
                      <div className="text-xs text-gray-500">
                        {allTraits.filter(trait => 
                          selections[generateTraitId(categoryName, trait)]
                        ).length} of {allTraits.length} traits rated
                      </div>
                    </div>
                    
                    {viewMode !== 'shared' && (
                      <button className="p-1 text-gray-400 hover:text-white">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    )}
                  </div>
                  
                  {isExpanded && (
                    <div className="mt-3 ml-7 pl-6 border-l border-dashed border-gray-700">
                      <div className="space-y-4 py-2">
                        {allTraits.map(trait => {
                          const traitId = generateTraitId(categoryName, trait);
                          const options = getTraitOptions(trait);
                          
                          return (
                            <div key={traitId} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/80 transition-all">
                              <h4 className="font-medium text-white mb-3">{trait.trait}</h4>
                              <p className="text-gray-400 mb-3">{getTraitDescription(trait)}</p>
                              
                              <div className="space-y-2">
                                {options.map(option => (
                                  <label 
                                    key={option.value} 
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all cursor-pointer 
                                      ${viewMode === 'shared' ? '' : 'hover:bg-gray-700/50'}
                                      ${selections[traitId] === option.value ? 
                                        option.impact > 0 ? 'bg-green-500/10 border border-green-500/30' : 
                                        option.impact < 0 ? 'bg-red-500/10 border border-red-500/30' : 
                                        'bg-gray-700/50 border border-gray-600/30' : 
                                        'border border-transparent'}`}
                                  >
                                    <input 
                                      type="radio" 
                                      name={traitId} 
                                      value={option.value}
                                      checked={selections[traitId] === option.value}
                                      onChange={() => onChange(traitId, option.value)}
                                      disabled={viewMode === 'shared'}
                                      className={`form-radio h-4 w-4 
                                        ${option.impact > 0 ? 'text-green-500' : 
                                          option.impact < 0 ? 'text-red-500' : 
                                          'text-blue-500'}`}
                                    />
                                    <span className="text-gray-200">
                                      {option.label}
                                      {option.impact !== 0 && (
                                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full 
                                          ${option.impact > 0 ? 'bg-green-500/20 text-green-400' : 
                                            option.impact < 0 ? 'bg-red-500/20 text-red-400' : 
                                            'bg-gray-500/20 text-gray-400'}`}>
                                          {option.impact > 0 ? '+' : ''}{option.impact}
                                        </span>
                                      )}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipAssessment;