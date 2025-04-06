import React, { useMemo } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { relationshipTraits, TraitDefinition } from '../relationshipTraitSystem';
import { calculateRelationshipScore, calculateRiskLevel } from '../relationshipTraitSystem';

interface RelationshipResultsProps {
  selections: Record<string, string>;
}

const RelationshipResults: React.FC<RelationshipResultsProps> = ({ selections }) => {
  const { redScore, greenScore, netScore, redTraits, greenTraits } = useMemo(() => 
    calculateRelationshipScore(selections), 
    [JSON.stringify(selections)]
  );
  
  const { level: riskLevel, message: riskMessage, color: _ } = useMemo(() => 
    calculateRiskLevel(redScore), 
    [redScore]
  );
  
  const hasRatedTraits = Object.keys(selections).length > 0;

  const getTraitDetails = (traitId: string): { category: string; traitDef: TraitDefinition | undefined } => {
    const parts = traitId.split('_');
    const categoryIndex = parts.findIndex(part => 
      Object.keys(relationshipTraits).some(cat => 
        cat.toLowerCase().replace(/\s+/g, '_') === part
      )
    );
    
    if (categoryIndex === -1) return { category: '', traitDef: undefined };
    
    const category = Object.keys(relationshipTraits).find(cat => 
      cat.toLowerCase().replace(/\s+/g, '_') === parts[categoryIndex]
    ) || '';
    
    const traitDef = category ? 
      relationshipTraits[category].find(t => 
        traitId.includes(t.trait.toLowerCase().replace(/\s+/g, '_'))
      ) : undefined;
    
    return { category, traitDef };
  };

  const getSelectionDisplay = (value: string, traitDef: TraitDefinition) => {
    if (value === 'very_negative' || value === 'negative') {
      return traitDef.negative;
    } else if (value === 'very_positive' || value === 'positive') {
      return traitDef.positive;
    }
    return 'Neutral';
  };

  const getImpactValue = (value: string, traitDef: TraitDefinition) => {
    if (value === 'very_negative') {
      return -traitDef.negativeWeight;
    } else if (value === 'negative') {
      return Math.round(-traitDef.negativeWeight * 0.7);
    } else if (value === 'positive') {
      return Math.round(traitDef.positiveWeight * 0.7);
    } else if (value === 'very_positive') {
      return traitDef.positiveWeight;
    }
    return 0;
  };

  const generateSatiricalAdvice = (netScore: number) => {
    if (netScore >= 50) {
      return {
        title: "Immediate Action Required",
        advice: "Our analysis indicates your partner is far too stable and supportive. This level of emotional well-being is concerning - you might develop healthy self-esteem and realistic expectations! We recommend immediately sabotaging this relationship and finding someone who treats you worse.",
        tips: [
          "Try picking fights over completely trivial matters",
          "Mention how your ex did everything better",
          "Develop an inexplicable new pet peeve about something they can't change",
          "Start responding to texts with increasing delay until you're ghosting them"
        ],
        icon: "🚩",
        color: "from-red-500/10 to-orange-500/10 border-red-500/30"
      };
    } 
    else if (netScore > 0) {
      return {
        title: "Caution: Healthy Relationship Detected",
        advice: "Your relationship shows concerning signs of mutual respect and communication. How boring! Where's the drama? The tears? The 3 AM crying sessions? We recommend introducing some chaos before you settle into a lifetime of stable happiness.",
        tips: [
          "Start being vague about your whereabouts for no reason",
          "Randomly cancel plans last minute with increasingly bizarre excuses",
          "Start ghosting them for a few days at a time",
          "Start causing drama with their friends and family",
          "Make sure to always be the victim in every situation"
        ],
        icon: "⚠️",
        color: "from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
      };
    }
    else if (netScore > -50) {
      return {
        title: "Promising Toxic Potential",
        advice: "Your relationship shows some red flags, but not nearly enough!",
        tips: [
          "Start keeping score of every minor disagreement",
          "When they apologize, say \"it's fine\" then bring it up 6 months later",
          "Dramatically misinterpret their text messages whenever possible",
        ],
        icon: "👍",
        color: "from-green-500/10 to-teal-500/10 border-green-500/30"
      };
    }
    else {
      return {
        title: "Jackpot! Keeper Alert!",
        advice: "Congratulations! You've found someone truly toxic. This relationship has excellent potential for destroying your mental health, and creating trauma that will take years of therapy to undo. We highly recommend escalating your commitment ASAP.",
        tips: [
          "Consider a spontaneous Las Vegas wedding",
          "Combine all your finances immediately",
          "Ignore friends and family who express concern - they're just jealous",
          "The more red flags, the more passionate the relationship!"
        ],
        icon: "💯",
        color: "from-emerald-500/10 to-green-500/10 border-emerald-500/30"
      };
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/20 to-indigo-500/20">
        <h2 className="font-bold text-xl text-white">Relationship Analysis</h2>
      </div>
      
      <div className="p-5 space-y-6">
        {!hasRatedTraits ? (
          <div className="flex flex-col items-center justify-center py-8">
            <HelpCircle size={48} className="text-gray-500 mb-3" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Traits Rated Yet</h3>
            <p className="text-gray-500 text-center max-w-md mb-4">
              Rate some traits in the assessment above to see your relationship analysis.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-lg p-4 text-center border border-gray-700/50">
                <div className="text-3xl font-bold text-red-500 mb-1">{redScore}</div>
                <div className="text-sm text-gray-400">Red Flags</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-lg p-4 text-center border border-gray-700/50">
                <div className="text-3xl font-bold text-green-500 mb-1">{greenScore}</div>
                <div className="text-sm text-gray-400">Green Flags</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-lg p-4 text-center border border-gray-700/50">
                <div className={`text-3xl font-bold ${netScore >= 0 ? 'text-blue-500' : 'text-red-500'} mb-1`}>
                  {netScore >= 0 ? '+' : ''}{netScore}
                </div>
                <div className="text-sm text-gray-400">Net Score</div>
              </div>
            </div>
            
            <div className={`rounded-lg p-5 border ${
              riskLevel === 'Low' ? 'bg-green-500/10 border-green-500/30' : 
              riskLevel === 'Moderate' ? 'bg-yellow-500/10 border-yellow-500/30' : 
              riskLevel === 'High' ? 'bg-orange-500/10 border-orange-500/30' : 
              'bg-red-500/10 border-red-500/30'
            }`}>
              <h3 className={`text-xl font-bold mb-2 flex items-center ${
                riskLevel === 'Low' ? 'text-green-400' : 
                riskLevel === 'Moderate' ? 'text-yellow-400' : 
                riskLevel === 'High' ? 'text-orange-400' : 
                'text-red-400'
              }`}>
                {riskLevel === 'Low' ? (
                  <CheckCircle size={24} className="mr-2" />
                ) : riskLevel === 'Moderate' ? (
                  <AlertCircle size={24} className="mr-2" />
                ) : (
                  <AlertTriangle size={24} className="mr-2" />
                )}
                {riskLevel} Risk Assessment
              </h3>
              <p className="text-gray-300">{riskMessage}</p>
            </div>
            
            <div className="space-y-6 mt-4">
              {redTraits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    Red Flags
                  </h3>
                  <div className="space-y-2">
                    {redTraits.map((trait) => {
                      const { category, traitDef } = getTraitDetails(trait.id);
                      
                      if (!traitDef) return null;
                      
                      const impactValue = getImpactValue(trait.value, traitDef);
                      
                      return (
                        <div key={trait.id} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div>
                              <div className="text-gray-400 text-xs mb-1">{category}</div>
                              <div className="font-medium text-white">{traitDef.trait}</div>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="inline-block bg-red-500/20 text-red-400 px-2 py-1 rounded-md text-sm">
                                {impactValue}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 text-gray-300 text-sm">
                            {getSelectionDisplay(trait.value, traitDef)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {greenTraits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                    <CheckCircle size={20} className="mr-2" />
                    Green Flags
                  </h3>
                  <div className="space-y-2">
                    {greenTraits.map((trait) => {
                      const { category, traitDef } = getTraitDetails(trait.id);
                      
                      if (!traitDef) return null;
                      
                      const impactValue = getImpactValue(trait.value, traitDef);
                      
                      return (
                        <div key={trait.id} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div>
                              <div className="text-gray-400 text-xs mb-1">{category}</div>
                              <div className="font-medium text-white">{traitDef.trait}</div>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="inline-block bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-sm">
                                +{impactValue}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 text-gray-300 text-sm">
                            {getSelectionDisplay(trait.value, traitDef)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {hasRatedTraits && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 rounded-full mr-2">
                      <AlertTriangle size={18} className="text-pink-400" />
                    </div>
                    Satirical Recommendation
                  </h3>
                  
                  {(() => {
                    const advice = generateSatiricalAdvice(netScore);
                    return (
                      <div className={`p-6 rounded-xl bg-gradient-to-br ${advice.color}`}>
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{advice.icon}</div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">{advice.title}</h4>
                            <p className="text-gray-300 mb-4">{advice.advice}</p>
                            
                            <h5 className="font-medium mb-2 text-gray-200">Expert Tips:</h5>
                            <ul className="space-y-2">
                              {advice.tips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-pink-400 mr-2">•</span>
                                  <span className="text-gray-300">{tip}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-4 pt-3 border-t border-gray-700 text-sm text-gray-400 italic">
                              Note: This advice is 100% satirical. Please do the exact opposite of everything suggested here.
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RelationshipResults;