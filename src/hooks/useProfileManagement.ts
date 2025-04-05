import { useState, useEffect } from 'react';

export interface Profile {
  [key: string]: Record<string, string>;
}

export function useProfileManagement() {
  const [currentProfile, setCurrentProfile] = useState<string>('Default');
  const [profileName, setProfileName] = useState<string>('Dating Profile');
  const [profiles, setProfiles] = useState<Profile>({ Default: {} });
  const [traitSelections, setTraitSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedProfiles = localStorage.getItem('traitProfiles');
    if (savedProfiles) {
      const parsedProfiles = JSON.parse(savedProfiles);
      setProfiles(parsedProfiles);
      setTraitSelections(parsedProfiles[currentProfile] || {});
    }
  }, [currentProfile]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('traitProfiles', JSON.stringify(profiles));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [profiles]);

  const addNewProfile = (newProfileName: string) => {
    if (newProfileName.trim()) {
      setProfiles(prev => ({ ...prev, [newProfileName]: {} }));
      setCurrentProfile(newProfileName);
      setProfileName(newProfileName);
      setTraitSelections({});
      return true;
    }
    return false;
  };

  const deleteCurrentProfile = () => {
    if (currentProfile === 'Default') return false;
    
    setProfiles(prev => {
      const newProfiles = {...prev};
      delete newProfiles[currentProfile];
      return newProfiles;
    });
    
    setCurrentProfile('Default');
    setProfileName('Default');
    setTraitSelections(profiles['Default'] || {});
    return true;
  };

  const changeProfile = (profileId: string) => {
    setCurrentProfile(profileId);
    setProfileName(profileId);
    setTraitSelections(profiles[profileId] || {});
  };

  const resetSelections = () => {
    setTraitSelections({});
    setProfiles(prev => ({ ...prev, [currentProfile]: {} }));
  };

  const updateTraitSelection = (traitId: string, value: string) => {
    setTraitSelections(prev => ({
      ...prev,
      [traitId]: value
    }));
    
    setProfiles(prev => ({
      ...prev,
      [currentProfile]: {
        ...prev[currentProfile],
        [traitId]: value
      },
    }));
  };

  return {
    currentProfile,
    profileName,
    profiles,
    traitSelections,
    setProfileName,
    addNewProfile,
    deleteCurrentProfile,
    changeProfile,
    resetSelections,
    updateTraitSelection
  };
}