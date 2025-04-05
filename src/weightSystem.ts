const flagWeightMap: Record<string, number> = {
    // SEVERE RED FLAGS - Immediate danger signs (50%+ impact)
    "Has physically intimidated you": 70,
    "Isolates you from friends or family": 55,
    "Has a history of cheating or lying": 50,
    "Gaslights you about past events": 50,
    
    // HIGH SEVERITY - Major concerns (25-35% impact)
    "Doesn't respect your boundaries": 30,
    "Is overly controlling or jealous": 25,
    "Has anger management issues": 35,
    "Makes you feel crazy for suspecting anything": 30,
    "Pressures you into things you're not comfortable with": 30,
    "Still active on dating apps after exclusivity": 30,
    "Never compromises on anything": 25,
    "Blames you for everything": 25,
    
    // MEDIUM SEVERITY - Significant issues (15-20% impact)
    "Is dismissive of your feelings": 20,
    "Never apologizes for anything": 20,
    "Has substance abuse problems": 20,
    "Caught in major lies about their past": 20,
    "Lies about small things unnecessarily": 15,
    "Hides their phone when you're around": 15,
    "Never contacts you first": 15,
    
    // LOWER SEVERITY - Early warning signs (5-10% impact)
    "Treats service workers poorly": 10,
    "Love-bombs you early in the relationship": 10,
    "Is still hung up on their ex": 20,
    "Dismisses your life goals as unimportant": 10,
    "Expects you to change major life plans for them": 10, 
    "Makes big decisions without consulting you": 10,
    "Never pays for anything": 10,
  };
  
  const DEFAULT_WEIGHT = 15;
  
  export const getFlagWeight = (flag: string): number => {
    return flagWeightMap[flag] || DEFAULT_WEIGHT; 
  };
  
  export const calculateWeightedScore = (selectedFlags: string[]): number => {
    if (selectedFlags.length === 0) return 0;
    
    return selectedFlags.reduce((acc, flag) => {
      return acc + getFlagWeight(flag);
    }, 0);
  };
  
  export const calculateMaxPossibleScore = (allFlags: string[]): number => {
    return allFlags.reduce((acc, flag) => acc + getFlagWeight(flag), 0);
  };
  
  export const calculateProgress = (score: number, _: number): number => {
    if (score === 0) return 0;
    
    let rawPercentage = (score / 100) * 100;
    
    return Math.min(rawPercentage, 100);
  };
  
  export const getSeverityLevel = (progress: number): { level: string, description: string, color: string } => {
    if (progress < 20) {
      return {
        level: "Very Low Risk",
        description: "Few concerning behaviors detected. Continue to maintain healthy boundaries.",
        color: "text-green-400"
      };
    } else if (progress < 40) {
      return {
        level: "Low Risk",
        description: "Some minor concerns. Pay attention to these behaviors but they may not be dealbreakers.",
        color: "text-green-500"
      };
    } else if (progress < 60) {
      return {
        level: "Moderate Risk",
        description: "Several concerning patterns. Consider having an open conversation about these issues.",
        color: "text-yellow-500"
      };
    } else if (progress < 80) {
      return {
        level: "High Risk",
        description: "Significant red flags present. These issues may indicate serious compatibility or safety concerns.",
        color: "text-orange-500"
      };
    } else {
      return {
        level: "Very High Risk",
        description: "Multiple severe red flags detected. Strongly consider whether this relationship is healthy for you.",
        color: "text-red-500"
      };
    }
  };
  
  export const generateExcuse = (flag: string): string => {
    const excuses: Record<string, string[]> = {
      "Doesn't respect your boundaries": [
        "They're just really passionate about us",
        "They don't understand that boundary yet",
        "They're trying to help you grow",
      ],
      "Is overly controlling or jealous": [
        "They just care about me a lot",
        "They've been hurt before",
        "It's actually kind of flattering",
      ],
      "Has anger management issues": [
        "They're just passionate",
        "They had a rough day",
        "It's not that bad when we're alone",
      ],
      "Doesn't communicate openly": [
        "They're the strong, silent type",
        "They're just processing internally",
        "They'll open up eventually",
      ],
      "DEFAULT": [
        "It's just a phase",
        "They're working on it",
        "Everyone has flaws",
        "Nobody's perfect",
        "They only do this when stressed",
        "They don't mean anything by it",
        "They had a rough childhood",
        "They're actually getting better about it",
        "It's not as bad as it sounds",
        "They're really good in other ways",
      ]
    };
    
    const flagExcuses = excuses[flag] || excuses["DEFAULT"];
    const randomIndex = Math.floor(Math.random() * flagExcuses.length);
    return flagExcuses[randomIndex];
  };
  
  export const generateSoundtrack = (selectedFlags: string[]): {song: string, artist: string}[] => {
    const severeFlags = selectedFlags.filter(flag => getFlagWeight(flag) >= 30);
    const moderateFlags = selectedFlags.filter(flag => getFlagWeight(flag) >= 15 && getFlagWeight(flag) < 30);
    
    const songs: {song: string, artist: string}[] = [];
    
    if (severeFlags.length > 2) {
      songs.push({song: "Toxic", artist: "Britney Spears"});
      songs.push({song: "Before He Cheats", artist: "Carrie Underwood"});
      songs.push({song: "You Oughta Know", artist: "Alanis Morissette"});
    } else if (moderateFlags.length > 3) {
      songs.push({song: "We Are Never Ever Getting Back Together", artist: "Taylor Swift"});
      songs.push({song: "I Will Survive", artist: "Gloria Gaynor"});
    } else {
      songs.push({song: "Thank U, Next", artist: "Ariana Grande"});
    }
    
    if (selectedFlags.length > 5) {
      songs.push({song: "Red Flag", artist: "Billy Talent"});
    }
    
    const fillerSongs = [
      {song: "Ex's & Oh's", artist: "Elle King"},
      {song: "So What", artist: "Pink"},
      {song: "Since U Been Gone", artist: "Kelly Clarkson"},
      {song: "Fighter", artist: "Christina Aguilera"},
      {song: "Irreplaceable", artist: "Beyoncé"}
    ];
    
    const numberOfFillers = Math.min(3, 5 - songs.length);
    for (let i = 0; i < numberOfFillers; i++) {
      const randomIndex = Math.floor(Math.random() * fillerSongs.length);
      songs.push(fillerSongs[randomIndex]);
      fillerSongs.splice(randomIndex, 1); 
    }
    
    return songs;
  };