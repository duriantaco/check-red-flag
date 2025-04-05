import React, { useState, useCallback } from 'react';
import { relationshipTraits, TraitDefinition } from '../relationshipTraitSystem';
import { 
    ChevronDown, 
    ChevronUp,
    MessageSquare,
    Shield,
    User,
    Heart,
    Lock,
    Briefcase,
    UserCircle
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
  viewMode
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(relationshipTraits).reduce((acc, category) => ({
      ...acc,
      [category]: true,
    }), {})
  );

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
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
        return <MessageSquare size={20} className="mr-2 text-indigo-400" />;
      case 'Respect & Boundaries':
        return <Shield size={20} className="mr-2 text-pink-400" />;
      case 'Independence':
        return <User size={20} className="mr-2 text-teal-400" />;
      case 'Emotional Patterns':
        return <Heart size={20} className="mr-2 text-violet-400" />;
      case 'Trust':
        return <Lock size={20} className="mr-2 text-red-400" />;
      case 'Lifestyle':
        return <Briefcase size={20} className="mr-2 text-yellow-400" />;
      case 'Character':
        return <UserCircle size={20} className="mr-2 text-green-400" />;
      default:
        return <MessageSquare size={20} className="mr-2 text-gray-400" />;
    }
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
        
        <div className="space-y-6">
          {Object.entries(relationshipTraits).map(([category, traits]) => (
            <div 
              key={category} 
              className="border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 bg-gray-800/30 hover:bg-gray-800/50"
            >
              <button 
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-left"
              >
                <div className="flex items-center">
                  {getCategoryIcon(category)}
                  <h3 className="font-bold text-lg text-white">{category}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">
                    {traits.filter(trait => {
                      const traitId = generateTraitId(category, trait);
                      return selections[traitId];
                    }).length} / {traits.length}
                  </span>
                  {expandedCategories[category] ? 
                    <ChevronUp size={20} className="text-gray-400" /> : 
                    <ChevronDown size={20} className="text-gray-400" />
                  }
                </div>
              </button>
              
              {expandedCategories[category] && (
                <div className="p-4 space-y-4">
                  {traits.map(trait => {
                    const traitId = generateTraitId(category, trait);
                    const options = getTraitOptions(trait);
                    
                    return (
                      <div key={traitId} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
                        <h4 className="text-lg font-semibold text-white mb-2">{trait.trait}</h4>
                        <p className="text-gray-400 mb-3">{getTraitDescription(trait)}</p>
                        
                        <div className="space-y-2">
                          {options.map(option => (
                            <label 
                              key={option.value} 
                              className={`flex items-center space-x-3 p-2 rounded-lg transition-all cursor-pointer 
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationshipAssessment;