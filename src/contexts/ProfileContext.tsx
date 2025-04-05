import { createContext, useContext, ReactNode } from 'react';
import { useProfileManagement, Profile } from '../hooks/useProfileManagement';

interface ProfileContextType {
  currentProfile: string;
  profileName: string;
  profiles: Profile;
  traitSelections: Record<string, string>;
  setProfileName: (name: string) => void;
  addNewProfile: (name: string) => boolean;
  deleteCurrentProfile: () => boolean;
  changeProfile: (profileId: string) => void;
  resetSelections: () => void;
  updateTraitSelection: (traitId: string, value: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const profileManagement = useProfileManagement();
  
  return (
    <ProfileContext.Provider value={profileManagement}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
