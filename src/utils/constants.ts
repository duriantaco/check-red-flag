export interface FlagInfo {
    flag: string;
    weight: number;
  }
    
  export const categories: { [key: string]: string[] } = {
    Behavioral: [
      "Doesn't respect your boundaries",
      "Is overly controlling or jealous",
      "Has anger management issues",
      "Has physically intimidated you",
      "Isolates you from friends or family",
    ],
    Communication: [
      "Is dismissive of your feelings",
      "Pressures you into things you're not comfortable with",
      "Gaslights you about past events",
      "Never apologizes for anything",
    ],
    Lifestyle: [
      "Has a history of cheating or lying",
      "Has substance abuse problems",
      "Treats service workers poorly",
    ],
    "Trust & Honesty": [
      "Lies about small things unnecessarily",
      "Hides their phone when you're around",
      "Caught in major lies about their past",
      "Makes you feel crazy for suspecting anything",
    ],
    Dating: [
      "Still active on dating apps after exclusivity",
      "Love-bombs you early in the relationship",
      "Is still hung up on their ex",
    ],
    "Future & Goals": [
      "Dismisses your life goals as unimportant",
      "Expects you to change major life plans for them",
      "Makes big decisions without consulting you",
    ],
  };
    
  export const allFlags: FlagInfo[] = Object.values(categories)
    .flat()
    .map(flag => ({ flag, weight: 1 }));