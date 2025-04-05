import { useState, useEffect, useRef } from 'react';
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

  const handleTraitChange = (traitId: string, value: string) => {
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
  };

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

  const generateShareableLink = () => {
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
  };

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
      
      if (typeof window.domtoimage === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js';
        script.async = true;
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        
        if (!window.domtoimage) {
          throw new Error('Failed to load dom-to-image library');
        }
      }
      
      const resultCard = resultCardRef.current;
      const originalStyleBgColor = resultCard.style.backgroundColor;
      const originalStylePadding = resultCard.style.padding;
      
      resultCard.style.backgroundColor = '#1f2937';
      resultCard.style.padding = '12px';
      
      const dataUrl = await window.domtoimage.toPng(resultCard, {
        bgcolor: '#1f2937',
        height: resultCard.offsetHeight,
        width: resultCard.offsetWidth,
        style: {
          padding: '12px',
          'border-radius': '12px',
        }
      });
      
      resultCard.style.backgroundColor = originalStyleBgColor;
      resultCard.style.padding = originalStylePadding;
      
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `${profileName.replace(/\s+/g, '-').toLowerCase()}-relationship-assessment-${new Date().toISOString().slice(0,10)}.png`;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      document.body.removeChild(loadingToast);
      const successToast = document.createElement('div');
      successToast.innerText = 'Image downloaded successfully!';
      successToast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(successToast);
      
      setTimeout(() => {
        document.body.removeChild(successToast);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating image:', error);
      
      try {
        const loadingToast = document.querySelector('.fixed.bottom-4.right-4.bg-blue-600');
        if (loadingToast && loadingToast.parentNode) {
          loadingToast.parentNode.removeChild(loadingToast);
        }
      } catch (e) {
      }
      
      const errorToast = document.createElement('div');
      errorToast.innerText = 'Failed to generate image. Please try again.';
      errorToast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      document.body.appendChild(errorToast);
      
      setTimeout(() => {
        document.body.removeChild(errorToast);
      }, 3000);
    }
  };
  

  const { redScore, greenScore, netScore } = calculateRelationshipScore(traitSelections);
  const { level: riskLevel, message: _, color: riskColor } = calculateRiskLevel(redScore);
  const ratedTraitsCount = Object.keys(traitSelections).length;
  const totalTraitsCount = Object.values(relationshipTraits).reduce((sum, traits) => sum + traits.length, 0);

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
        {viewMode === 'shared' && (
          <>
            <meta property="og:title" content={`Relationship Assessment Results for ${profileName}`} />
            <meta
              property="og:description"
              content={`Check out the relationship assessment results for ${profileName}. See the red flags and green flags identified.`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
          </>
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Relationship Red Flag Checker",
            "description": "A tool to assess potential red flags and green flags in relationships.",
            "url": "https://checkredflag.com",
            "applicationCategory": "Lifestyle",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      <Header viewMode={viewMode} setViewMode={setViewMode} />

      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {viewMode === 'edit' && (
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
          
          <div className={viewMode === 'edit' ? "md:w-3/4" : "w-full"}>
            {viewMode === 'shared' && (
              <SharedBanner 
                profileName={profileName}
                generateShareableLink={generateShareableLink}
              />
            )}
            
            <TraitProgress selections={traitSelections} />
            
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