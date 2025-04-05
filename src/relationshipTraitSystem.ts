export interface TraitOption {
    value: string;
    label: string;
    impact: number;
  }
  
  export interface Trait {
    id: string;
    title: string;
    description: string;
    options: TraitOption[];
  }
  
  export interface TraitSelection {
    id: string;
    value: string;
  }
  
  export interface RelationshipScoreResult {
    redScore: number;
    greenScore: number;
    netScore: number;
    redTraits: TraitSelection[];
    greenTraits: TraitSelection[];
  }
  
  export interface TraitDefinition {
    trait: string;
    negative: string;
    positive: string;
    negativeWeight: number;
    positiveWeight: number;
  }
  
  export interface RelationshipTraits {
    [category: string]: TraitDefinition[];
  }
  
  export const relationshipTraits: RelationshipTraits = {    
    
    "Communication": [
      {
        trait: "Communication Style",
        negative: "Dismisses feelings or concerns",
        positive: "Listens actively and validates feelings",
        negativeWeight: 35,
        positiveWeight: 35
      },
      {
        trait: "Conflict Resolution",
        negative: "Uses silent treatment or emotional withdrawal",
        positive: "Discusses issues calmly and seeks solutions",
        negativeWeight: 30,
        positiveWeight: 30
      },
      {
        trait: "Honesty",
        negative: "Lies or hides important information",
        positive: "Communicates openly and truthfully",
        negativeWeight: 50,
        positiveWeight: 40
      },
      {
        trait: "Apologies",
        negative: "Never apologizes or takes responsibility",
        positive: "Admits mistakes and makes genuine apologies",
        negativeWeight: 35,
        positiveWeight: 35
      }
    ],
    "Respect & Boundaries": [
      {
        trait: "Personal Boundaries",
        negative: "Pushes or ignores your boundaries",
        positive: "Respects and upholds your boundaries",
        negativeWeight: 60,
        positiveWeight: 50
      },
      {
        trait: "Privacy",
        negative: "Monitors your communications or location",
        positive: "Respects your privacy and personal space",
        negativeWeight: 55,
        positiveWeight: 40
      },
      {
        trait: "Physical Boundaries",
        negative: "Uses physical intimidation or force",
        positive: "Is gentle and respects physical boundaries",
        negativeWeight: 100,
        positiveWeight: 40
      }
    ],
    "Independence": [
      {
        trait: "Social Connections",
        negative: "Isolates you from friends and family",
        positive: "Encourages your outside relationships",
        negativeWeight: 70,
        positiveWeight: 45
      },
      {
        trait: "Jealousy & Control",
        negative: "Shows excessive jealousy or controlling behavior",
        positive: "Trusts you and supports your independence",
        negativeWeight: 55,
        positiveWeight: 45
      },
      {
        trait: "Decision Making",
        negative: "Makes important decisions without your input",
        positive: "Makes decisions together as a team",
        negativeWeight: 40,
        positiveWeight: 35
      }
    ],
    "Emotional Patterns": [
      {
        trait: "Anger Management",
        negative: "Has explosive reactions to minor issues",
        positive: "Manages emotions in healthy ways",
        negativeWeight: 50,
        positiveWeight: 40
      },
      {
        trait: "Emotional Support",
        negative: "Is absent or dismissive during difficult times",
        positive: "Provides comfort and support when needed",
        negativeWeight: 35,
        positiveWeight: 40
      },
      {
        trait: "Mood Stability",
        negative: "Has unpredictable mood swings",
        positive: "Maintains emotional consistency",
        negativeWeight: 30,
        positiveWeight: 30
      }
    ],
    "Trust": [
      {
        trait: "Faithfulness",
        negative: "Has cheated or acts suspiciously",
        positive: "Is faithful and transparent",
        negativeWeight: 65,
        positiveWeight: 45
      },
      {
        trait: "Reliability",
        negative: "Frequently breaks promises or commitments",
        positive: "Keeps promises and follows through",
        negativeWeight: 40,
        positiveWeight: 40
      },
      {
        trait: "Past Relationships",
        negative: "Still overly connected with ex-partners",
        positive: "Has healthy boundaries with exes",
        negativeWeight: 30,
        positiveWeight: 25
      }
    ],
    "Lifestyle": [
      {
        trait: "Financial Responsibility",
        negative: "Is financially irresponsible or secretive",
        positive: "Manages money responsibly and transparently",
        negativeWeight: 35,
        positiveWeight: 30
      },
      {
        trait: "Substance Use",
        negative: "Has problematic substance use patterns",
        positive: "Has healthy attitudes toward substances",
        negativeWeight: 45,
        positiveWeight: 30
      },
      {
        trait: "Life Goals",
        negative: "Has incompatible or constantly changing goals",
        positive: "Shares or supports your key life goals",
        negativeWeight: 35,
        positiveWeight: 40
      }
    ],
    "Character": [
      {
        trait: "Treatment of Others",
        negative: "Treats service workers or strangers poorly",
        positive: "Is kind and respectful to everyone",
        negativeWeight: 40,
        positiveWeight: 35
      },
      {
        trait: "Friends & Family",
        negative: "Is rude to your friends or family",
        positive: "Makes genuine effort with your loved ones",
        negativeWeight: 35,
        positiveWeight: 30
      },
      {
        trait: "Accountability",
        negative: "Blames others for their problems",
        positive: "Takes responsibility for their actions",
        negativeWeight: 40,
        positiveWeight: 35
      }
    ]
  };
  
  export const spectrumLevels = [
    { value: "very_negative", label: "Very Concerning", color: "bg-red-600" },
    { value: "negative", label: "Concerning", color: "bg-red-400" },
    { value: "neutral", label: "Neutral", color: "bg-gray-500" },
    { value: "positive", label: "Positive", color: "bg-green-400" },
    { value: "very_positive", label: "Very Positive", color: "bg-green-600" }
  ];
  
  export const calculateRelationshipScore = (selections: Record<string, string>): RelationshipScoreResult => {
    let redScore = 0;
    let greenScore = 0;
    const redTraits: TraitSelection[] = [];
    const greenTraits: TraitSelection[] = [];
    
    Object.keys(relationshipTraits).forEach(category => {
      relationshipTraits[category].forEach(trait => {
        const traitId = `${category}_${trait.trait}`.replace(/\s+/g, '_').toLowerCase();
        const selection = selections[traitId];
        
        if (selection === "very_negative") {
          redScore += trait.negativeWeight;
          redTraits.push({ id: traitId, value: selection });
        } else if (selection === "negative") {
          redScore += trait.negativeWeight * 0.7;
          redTraits.push({ id: traitId, value: selection });
        } else if (selection === "positive") {
          greenScore += trait.positiveWeight * 0.7;
          greenTraits.push({ id: traitId, value: selection });
        } else if (selection === "very_positive") {
          greenScore += trait.positiveWeight;
          greenTraits.push({ id: traitId, value: selection });
        }
      });
    });
    
    const netScore = greenScore - redScore;
    
    return {
      redScore: Math.min(redScore, 100),
      greenScore: Math.min(greenScore, 100),
      netScore: Math.max(-100, Math.min(netScore, 100)),
      redTraits,
      greenTraits
    };
  };
  
  export const calculateRiskLevel = (redScore: number): {
    level: 'Low' | 'Moderate' | 'High' | 'Severe';
    message: string;
    color: string;
  } => {
    if (redScore < 30) {
      return {
        level: 'Low',
        message: "Low Risk - Few concerning behaviors identified. Continue to pay attention to the relationship dynamics.",
        color: "bg-green-500"
      };
    } else if (redScore < 60) {
      return {
        level: 'Moderate',
        message: "Moderate Risk - Some concerning patterns detected. Consider discussing these issues openly.",
        color: "bg-yellow-500"
      };
    } else if (redScore < 80) {
      return {
        level: 'High',
        message: "High Risk - Significant concerns detected. Seriously reflect on whether this relationship is healthy for you.",
        color: "bg-red-500"
      };
    } else {
      return {
        level: 'Severe',
        message: "Severe Risk - Very serious concerns detected. This relationship shows multiple danger signs that should not be ignored.",
        color: "bg-red-600"
      };
    }
  };
  
  export interface RelationshipVerdict {
    title: string;
    description: string;
    color: string;
    emoji: string;
  }
  
  export const getRelationshipVerdict = (netScore: number): RelationshipVerdict => {
    if (netScore >= 70) {
      return {
        title: "Exceptional Match",
        description: "This relationship shows many healthy traits and few concerns. The positives significantly outweigh any issues.",
        color: "text-green-500",
        emoji: "💚"
      };
    } else if (netScore >= 40) {
      return {
        title: "Very Promising",
        description: "This relationship has strong potential with many more positives than negatives. Any issues appear manageable.",
        color: "text-green-400",
        emoji: "✨"
      };
    } else if (netScore >= 10) {
      return {
        title: "Generally Positive",
        description: "The relationship has more strengths than weaknesses, though there are some areas that could use attention.",
        color: "text-green-300",
        emoji: "👍"
      };
    } else if (netScore >= -10) {
      return {
        title: "Mixed Signals",
        description: "This relationship has roughly equal positive and concerning elements. Consider whether the issues can be addressed.",
        color: "text-yellow-400",
        emoji: "⚖️"
      };
    } else if (netScore >= -40) {
      return {
        title: "Concerning Imbalance",
        description: "The negatives outweigh the positives. Reflect on whether these issues can realistically be improved.",
        color: "text-orange-400",
        emoji: "⚠️"
      };
    } else if (netScore >= -70) {
      return {
        title: "Seriously Problematic",
        description: "This relationship shows multiple serious concerns with few redeeming qualities. Consider if this is healthy for you.",
        color: "text-red-400",
        emoji: "🚩"
      };
    } else {
      return {
        title: "Run, Don't Walk",
        description: "The negative aspects of this relationship dramatically outweigh any positives. This shows signs of a toxic situation.",
        color: "text-red-500",
        emoji: "🏃"
      };
    }
  };
  
  export const generateRelationshipAdvice = (
    netScore: number, 
    selections: Record<string, string>
  ): string[] => {
    const advice: string[] = [];
    const criticalConcerns: string[] = [];
    const positiveStrengths: string[] = [];
    
    Object.keys(relationshipTraits).forEach(category => {
      relationshipTraits[category].forEach(trait => {
        const traitId = `${category}_${trait.trait}`.replace(/\s+/g, '_').toLowerCase();
        const selection = selections[traitId];
        
        if (selection === "very_negative" && trait.negativeWeight >= 50) {
          criticalConcerns.push(trait.negative);
        } else if (selection === "very_positive" && trait.positiveWeight >= 40) {
          positiveStrengths.push(trait.positive);
        }
      });
    });
    
    if (netScore >= 40) {
      advice.push("Continue nurturing the positive aspects of your relationship that are working well.");
      advice.push("Remember that even good relationships require ongoing effort and communication.");
    } else if (netScore >= 0) {
      advice.push("Focus on strengthening the positive elements while addressing the concerning behaviors.");
      advice.push("Have honest conversations about the areas of concern in a non-confrontational way.");
    } else if (netScore >= -40) {
      advice.push("Consider whether the concerning behaviors are dealbreakers or issues that can be addressed.");
      advice.push("Set clear boundaries around behaviors that you find problematic.");
      advice.push("Think about whether this relationship is meeting your core needs and values.");
    } else {
      advice.push("Prioritize your wellbeing and safety when considering next steps.");
      advice.push("Reach out to trusted friends or family for support and perspective.");
      advice.push("Consider speaking with a professional therapist or counselor about your situation.");
    }
    
    if (criticalConcerns.length > 0) {
      if (criticalConcerns.some(concern => 
        concern.includes("physical") || 
        concern.includes("force") || 
        concern.includes("isolates")
      )) {
        advice.push("Some of these behaviors (like physical intimidation or isolation) are serious warning signs that should not be ignored.");
      }
      
      if (criticalConcerns.some(concern => 
        concern.includes("cheated") || 
        concern.includes("lies")
      )) {
        advice.push("Issues with honesty and trust are foundational problems that are very difficult to rebuild once broken.");
      }
    }
    
    if (positiveStrengths.length > 0 && netScore < 0) {
      advice.push("Despite the concerns, there are meaningful strengths in this relationship that could serve as a foundation for improvement.");
    }
    
    return advice;
  };
  
  export const generateCompatibilityDescription = (netScore: number): string => {
    if (netScore >= 70) {
      return "You two are like avocado and toast - naturally perfect together.";
    } else if (netScore >= 40) {
      return "Like coffee and cream - better together than apart.";
    } else if (netScore >= 10) {
      return "Like pizza with pineapple - controversial but works for some people.";
    } else if (netScore >= -10) {
      return "Like oil and vinegar - can blend temporarily but naturally separate.";
    } else if (netScore >= -40) {
      return "Like orange juice after brushing your teeth - technically possible but why would you?";
    } else if (netScore >= -70) {
      return "Like a fish and a bicycle - one of you might be in the wrong environment.";
    } else {
      return "Like a cat in a bathtub - fundamentally incompatible and someone's getting hurt.";
    }
  };