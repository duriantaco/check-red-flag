import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  relationshipTraits,
  calculateRelationshipScore,
  calculateRiskLevel,
} from '../relationshipTraitSystem';
import RelationshipAssessment from '../components/RelationshipAssessment';
import RelationshipResults from '../components/RelationshipResults';
import TraitProgress from '../components/TraitProgress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import SharedBanner from '../components/SharedBanner';
import ProfileModal from '../components/modals/ProfileModal';
import CustomFlagModal from '../components/modals/CustomFlagModal';
import ShareModal from '../components/modals/ShareModal';
import { CustomTraitDefinition } from '../components/RelationshipAssessment';
import { X, User, Share2, Download, Plus, Trash, RefreshCw } from 'lucide-react';
import FloatingActionButton from '../components/FloatingActionButton';

export interface CustomTraitsState {
  [category: string]: CustomTraitDefinition[];
}

export interface CustomTraitHandlers {
  addCustomTrait: () => void;
  deleteCustomTrait: (category: string, traitName: string) => void;
}

declare global {
  interface Window {
    domtoimage: {
      toPng: (node: HTMLElement, options?: any) => Promise<string>;
      toJpeg: (node: HTMLElement, options?: any) => Promise<string>;
      toSvg: (node: HTMLElement, options?: any) => Promise<string>;
    };
  }
}

const RedFlagApp = () => {
  const resultCardRef = useRef<HTMLDivElement>(null);
  
  const [traitSelections, setTraitSelections] = useState<Record<string, string>>({});
  const [currentProfile, setCurrentProfile] = useState<string>('Default');
  const [profileName, setProfileName] = useState<string>('Dating Profile');
  const [profiles, setProfiles] = useState<{ [key: string]: Record<string, string> }>({ Default: {} });
  const [newProfileName, setNewProfileName] = useState<string>('');
  const [customTrait, setCustomTrait] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('Communication');
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showCustomTraitModal, setShowCustomTraitModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareableLink, setShareableLink] = useState<string>('');
  const [viewMode, setViewMode] = useState<'edit' | 'shared'>('edit');
  const [customTraits, setCustomTraits] = useState<Record<string, CustomTraitDefinition[]>>({});
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#share=')) {
      try {
        const base64Part = hash.substring(7);
        const jsonString = atob(base64Part);
        const decoded = JSON.parse(jsonString);
        
        setViewMode('shared');
        
        if (decoded.n || decoded.name) {
          setProfileName(decoded.n || decoded.name);
        } else {
          setProfileName('Shared Profile');
        }
        
        const selections = decoded.s || decoded.selections || {};
        setTraitSelections(selections);
      } catch (e) {
        console.error('Failed to parse shared data:', e);
        alert('Failed to load shared profile. The link may be corrupted.');
      }
    }
  }, []);

  useEffect(() => {
    if (viewMode === 'edit') {
      const savedProfiles = localStorage.getItem('traitProfiles');
      if (savedProfiles) {
        try {
          const parsedProfiles = JSON.parse(savedProfiles);
          setProfiles(parsedProfiles);
          setTraitSelections(parsedProfiles[currentProfile] || {});
        } catch (e) {
          console.error('Failed to parse saved profiles:', e);
        }
      }
    }
  }, [viewMode, currentProfile]);
  
  useEffect(() => {
    if (viewMode === 'edit') {
      localStorage.setItem('traitProfiles', JSON.stringify(profiles));
    }
  }, [profiles, viewMode]);

  const handleTraitChange = useCallback((traitId: string, value: string) => {
    if (viewMode === 'shared') return; 
    
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
  }, [viewMode, currentProfile]);;

  const resetSelections = () => {
    if (viewMode === 'shared') return;
    
    setTraitSelections({});
    setProfiles(prev => ({ ...prev, [currentProfile]: {} }));
  };

  const addNewProfile = () => {
    if (newProfileName.trim()) {
      setProfiles(prev => ({ ...prev, [newProfileName]: {} }));
      setCurrentProfile(newProfileName);
      setProfileName(newProfileName);
      setTraitSelections({});
      setNewProfileName('');
      setShowProfileModal(false);
    }
  };

  const addCustomTrait = () => {
    if (!customTrait.trim()) {
      setShowCustomTraitModal(false);
      return;
    }
    
    const newTrait: CustomTraitDefinition = {
      trait: customTrait,
      negative: `Shows ${customTrait.toLowerCase()}`,
      positive: `Doesn't show ${customTrait.toLowerCase()}`,
      negativeWeight: 30,
      positiveWeight: 30,
      isCustom: true,      
      createdAt: Date.now()
    };
    
    setCustomTraits(prev => {
      const updatedTraits = { ...prev };
      if (!updatedTraits[customCategory]) {
        updatedTraits[customCategory] = [];
      }
      updatedTraits[customCategory] = [...updatedTraits[customCategory], newTrait];
      return updatedTraits;
    });
    
    setCustomTrait('');
    setShowCustomTraitModal(false);
    
    localStorage.setItem('customTraits', JSON.stringify({
      ...customTraits,
      [customCategory]: [...(customTraits[customCategory] || []), newTrait]
    }));
  };

  useEffect(() => {
    const savedCustomTraits = localStorage.getItem('customTraits');
    if (savedCustomTraits) {
      setCustomTraits(JSON.parse(savedCustomTraits));
    }
  }, []);

  const deleteCurrentProfile = () => {
    if (currentProfile === 'Default' || viewMode === 'shared') return;
    
    const newProfiles = {...profiles};
    delete newProfiles[currentProfile];
    setProfiles(newProfiles);
    setCurrentProfile('Default');
    setProfileName('Default');
    setTraitSelections(newProfiles['Default'] || {});
  };

  const generateShareableLink = useCallback(() => {
    try {
      const shareData = {
        s: traitSelections,
        n: profileName,
        v: '1.0'
      };
      
      const jsonString = JSON.stringify(shareData);
      const encoded = btoa(jsonString);
      
      const link = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
      
      setShareableLink(link);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error generating shareable link:', error);
      alert('Could not generate shareable link. Please try again.');
    }
  }, [traitSelections, profileName]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const downloadAsImage = async () => {
    if (!resultCardRef.current) return;
    
    try {
      const loadingToast = document.createElement('div');
      loadingToast.innerText = 'Generating image...';
      loadingToast.className = 'fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(loadingToast);
      
    } catch (error) {
      console.error('Error generating image:', error);
      
    }
  };

  const { redScore, greenScore, netScore } = calculateRelationshipScore(traitSelections);
  const { level: riskLevel, message: _, color: riskColor } = calculateRiskLevel(redScore);
  const ratedTraitsCount = Object.keys(traitSelections).length;
  const totalTraitsCount = Object.values(relationshipTraits).reduce((sum, traits) => sum + traits.length, 0);

  const renderMobileSidebar = () => {
    if (!showMobileSidebar || !isMobileView) return null;
    
    return (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setShowMobileSidebar(false)}>
        <div 
          className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-gray-900 p-4 overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Profile Options</h3>
            <button onClick={() => setShowMobileSidebar(false)}>
              <X size={24} className="text-gray-400 hover:text-white" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Profile
              </label>
              <select
                value={currentProfile}
                onChange={(e) => {
                  setCurrentProfile(e.target.value);
                  setProfileName(e.target.value);
                  setTraitSelections(profiles[e.target.value] || {});
                }}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              >
                {Object.keys(profiles).map(profile => (
                  <option key={profile} value={profile}>{profile}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <User size={20} className="mb-1 text-blue-400" />
                <span className="text-xs text-gray-300">New Profile</span>
              </button>
              
              <button
                onClick={deleteCurrentProfile}
                disabled={currentProfile === 'Default'}
                className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                  currentProfile === 'Default' ? 'bg-gray-800 opacity-50' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <Trash size={20} className="mb-1 text-red-400" />
                <span className="text-xs text-gray-300">Delete</span>
              </button>
              
              <button
                onClick={() => setShowCustomTraitModal(true)}
                className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Plus size={20} className="mb-1 text-green-400" />
                <span className="text-xs text-gray-300">Add Trait</span>
              </button>
              
              <button
                onClick={resetSelections}
                className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <RefreshCw size={20} className="mb-1 text-yellow-400" />
                <span className="text-xs text-gray-300">Reset</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={generateShareableLink}
                className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Share2 size={20} className="mb-1 text-pink-400" />
                <span className="text-xs text-gray-300">Share Link</span>
              </button>
              
              <button
                onClick={downloadAsImage}
                className="flex flex-col items-center justify-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Download size={20} className="mb-1 text-purple-400" />
                <span className="text-xs text-gray-300">Download</span>
              </button>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="font-bold text-lg text-white mb-2">Assessment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Red Flags:</span>
                  <span className="text-red-400">{redScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Green Flags:</span>
                  <span className="text-green-400">{greenScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Net Score:</span>
                  <span className={netScore >= 0 ? "text-green-400" : "text-red-400"}>{netScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Risk Level:</span>
                  <span className={`text-${riskColor}-400`}>{riskLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Traits Rated:</span>
                  <span className="text-blue-400">{ratedTraitsCount}/{totalTraitsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      <Helmet>
        <title>
          {viewMode === 'shared'
            ? `Relationship Assessment Results for ${profileName}`
            : 'Relationship Red Flag Assessment Tool'}
        </title>
        <meta
          name="description"
          content={
            viewMode === 'shared'
              ? `View the relationship assessment results for ${profileName}. Identify potential red flags and green flags in your relationship.`
              : 'Use our free tool to assess potential red flags and green flags in your relationship. Get instant results and insights.'
          }
        />
      </Helmet>
      <Header viewMode={viewMode} setViewMode={setViewMode} />

      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {viewMode === 'edit' && !isMobileView && (
            <ProfileSidebar 
              profileName={profileName}
              setProfileName={setProfileName}
              currentProfile={currentProfile}
              profiles={profiles}
              setCurrentProfile={setCurrentProfile}
              setTraitSelections={setTraitSelections}
              setShowProfileModal={setShowProfileModal}
              deleteCurrentProfile={deleteCurrentProfile}
              generateShareableLink={generateShareableLink}
              downloadAsImage={downloadAsImage}
              resetSelections={resetSelections}
              setShowCustomTraitModal={setShowCustomTraitModal}
              riskLevel={riskLevel}
              riskColor={riskColor}
              redScore={redScore}
              greenScore={greenScore}
              netScore={netScore}
              ratedTraitsCount={ratedTraitsCount}
              totalTraitsCount={totalTraitsCount}
            />
          )}
          
          <div className={viewMode === 'edit' && !isMobileView ? "md:w-3/4" : "w-full"}>
            {viewMode === 'shared' && (
              <SharedBanner 
                profileName={profileName}
                generateShareableLink={generateShareableLink}
              />
            )}
            
            {(!isMobileView || viewMode === 'shared') && (
              <TraitProgress selections={traitSelections} />
            )}
            
            <div className="grid grid-cols-1 gap-6">
              <RelationshipAssessment 
                selections={traitSelections}
                onChange={handleTraitChange}
                viewMode={viewMode}
                customTraits={customTraits} 
              />
              
              <div ref={resultCardRef}>
                <RelationshipResults selections={traitSelections} />
              </div>
            </div>
          </div>
        </div>
      </main>
            
      {renderMobileSidebar()}
      
      {viewMode === 'edit' && (
        <FloatingActionButton 
          onAddProfile={() => setShowProfileModal(true)}
          onAddTrait={() => setShowCustomTraitModal(true)}
          onShare={generateShareableLink}
          onDownload={downloadAsImage}
          onReset={resetSelections}
        />
      )}

      {showProfileModal && (
        <ProfileModal 
          newProfileName={newProfileName}
          setNewProfileName={setNewProfileName}
          setShowProfileModal={setShowProfileModal}
          addNewProfile={addNewProfile}
        />
      )}

      {showCustomTraitModal && (
        <CustomFlagModal 
          customFlag={customTrait}
          setCustomFlag={setCustomTrait}
          customCategory={customCategory}
          setCustomCategory={setCustomCategory}
          setShowCustomFlagModal={setShowCustomTraitModal}
          addCustomFlag={addCustomTrait}
          categoryData={{} as any}
        />
      )}

      {showShareModal && (
        <ShareModal 
          shareableLink={shareableLink}
          copied={copied}
          setShowShareModal={setShowShareModal}
          copyToClipboard={copyToClipboard}
          downloadAsImage={downloadAsImage}
        />
      )}

      <Footer />
    </div>
  );
};

export default RedFlagApp;