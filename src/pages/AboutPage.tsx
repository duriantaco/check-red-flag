import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Info, AlertTriangle, CheckCircle, ArrowRight, MessageSquare, Mail, Github, Coffee, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const animationStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

@keyframes floatFast {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-8px) rotate(45deg); }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.animate-float-slow {
  animation: floatSlow 7s ease-in-out infinite;
}

.animate-float-fast {
  animation: floatFast 4s ease-in-out infinite;
}

.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
`;

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'disclaimer' | 'faq' | 'contact'>('about');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tab = queryParams.get('tab');
    if (tab && ['about', 'disclaimer', 'faq', 'contact'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeTab === 'about') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', activeTab);
    }
    window.history.pushState({}, '', url);
  }, [activeTab]);

  const getMetaTitle = () => {
    switch (activeTab) {
      case 'about':
        return 'About Dating Red Flag Checker | Identify Relationship Warning Signs';
      case 'disclaimer':
        return 'Disclaimer | Dating Red Flag Checker | Relationship Warning Signs Tool';
      case 'faq':
        return 'FAQ | Dating Red Flag Checker | Common Relationship Questions';
      case 'contact':
        return 'Contact Us | Dating Red Flag Checker | Relationship Assessment Tool';
      default:
        return 'About Dating Red Flag Checker | Identify Relationship Warning Signs';
    }
  };
  
  const getMetaDescription = () => {
    switch (activeTab) {
      case 'about':
        return 'Learn about our Dating Red Flag Checker tool designed to help identify potential warning signs in relationships. Spot red flags early and make better dating decisions.';
      case 'disclaimer':
        return 'Important disclaimer about our relationship assessment tool. While entertaining, real relationships require professional guidance, not internet quizzes.';
      case 'faq':
        return 'Frequently asked questions about our relationship red flag assessment tool. Learn how to use the Dating Red Flag Checker and interpret your results.';
      case 'contact':
        return 'Get in touch with the Dating Red Flag Checker team. Share feedback or questions about our relationship assessment tool or suggest new features.';
      default:
        return 'Learn about our Dating Red Flag Checker tool designed to help identify potential warning signs in relationships. Spot red flags early and make better dating decisions.';
    }
  };
  
  const getSchemaData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `https://checkredflag.com/about${activeTab !== 'about' ? `?tab=${activeTab}` : ''}`,
      "name": getMetaTitle(),
      "description": getMetaDescription(),
      "publisher": {
        "@type": "Organization",
        "name": "Check Red Flag",
        "logo": {
          "@type": "ImageObject",
          "url": "https://checkredflag.com/logo.png"
        }
      },
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "url": "https://checkredflag.com/",
        "name": "Dating Red Flag Checker",
        "description": "Identify relationship warning signs and make better dating decisions",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://checkredflag.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    };
    
    if (activeTab === 'faq') {
      return {
        ...baseSchema,
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this backed by psychological research?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely not! This is pure satire and entertainment. The questions and scoring are made up for laughs and should not be confused with legitimate psychological assessment tools."
            }
          },
          {
            "@type": "Question",
            "name": "Is this a substitute for therapy or counseling?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No way! This is just a humorous website that pokes fun at dating stereotypes. For actual relationship help, please consult with a licensed therapist or relationship counselor."
            }
          },
          {
            "@type": "Question",
            "name": "Is my data private?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we take privacy seriously even for a joke site. All data is stored locally in your browser. We don't collect or store any of your responses on our servers."
            }
          },
          {
            "@type": "Question",
            "name": "How should I interpret my results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With laughter! These results are meant to be amusing, not accurate. Don't make any real-life decisions based on what our silly quiz tells you. It's about as scientific as a fortune cookie."
            }
          },
          {
            "@type": "Question",
            "name": "What if my real relationship has problems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Please seek help from qualified professionals. If you're concerned about your relationship, talk to a licensed therapist, counselor, or call the National Domestic Violence Hotline at 1-800-799-7233 if you feel unsafe."
            }
          }
        ]
      };
    }

    if (activeTab === 'contact') {
      return {
        ...baseSchema,
        "@type": "ContactPage",
        "mainContentOfPage": {
          "@type": "WebPageElement",
          "potentialAction": {
            "@type": "CommunicateAction",
            "name": "Contact Dating Red Flag Checker",
            "target": "mailto:jokes@redflagchecker.com",
            "description": "Send an email to the Dating Red Flag Checker team"
          }
        }
      };
    }
    
    return baseSchema;
  };

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const getBreadcrumbSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://checkredflag.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://checkredflag.com/about"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
          "item": `https://checkredflag.com/about?tab=${activeTab}`
        }
      ]
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      <Helmet>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content="relationship red flags, dating warning signs, toxic relationship indicators, relationship assessment, dating quiz, relationship tool, relationship advice, dating help, relationship problems" />
        
        <link rel="canonical" href={`https://checkredflag.com/about${activeTab !== 'about' ? `?tab=${activeTab}` : ''}`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://checkredflag.com/about${activeTab !== 'about' ? `?tab=${activeTab}` : ''}`} />
        <meta property="og:title" content={getMetaTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:site_name" content="Dating Red Flag Checker" />

        <script type="application/ld+json">
          {JSON.stringify(getSchemaData())}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbSchema())}
        </script>
      </Helmet>
      
      <Header viewMode="edit" setViewMode={() => {}} />
      
      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <ol className="flex items-center space-x-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white hover:underline">Home</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/about" className="hover:text-white hover:underline">About</Link>
            </li>
            {activeTab !== 'about' && (
              <>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-white">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-500/30">
          <div className="p-4 flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <AlertTriangle size={24} className="text-red-400" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-400 mb-1">Disclaimer</h2>
              <p className="text-gray-300">
                This website is a <strong>satirical creation</strong> intended for entertainment purposes only. 
                For actual relationship advice, please consult a licensed therapist or counselor. Remember, real 
                relationships are complex and deserve professional guidance. 
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-10">
          <div className="relative">
            <div className="h-64 bg-gradient-to-r from-pink-500 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-indigo-600/40"></div>
              
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md transform -rotate-15 animate-float-slow" aria-hidden="true"></div>
              <div className="absolute bottom-10 right-40 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md animate-float" aria-hidden="true"></div>
              <div className="absolute top-10 right-20 w-16 h-16 rounded-lg bg-white/10 backdrop-blur-md rotate-45 animate-float-fast" aria-hidden="true"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <Heart className="text-white mb-4" size={48} fill="white" stroke="white" aria-hidden="true" />
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                Dating Red Flag Checker
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Identifying relationship warning signs to help you make better dating decisions
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center mb-8 gap-2" role="tablist" aria-label="About page sections">
          {[
            { id: 'about', label: 'About', icon: <Info size={16} aria-hidden="true" /> },
            { id: 'disclaimer', label: 'Disclaimer', icon: <AlertTriangle size={16} aria-hidden="true" /> },
            { id: 'faq', label: 'FAQ', icon: <MessageSquare size={16} aria-hidden="true" /> },
            { id: 'contact', label: 'Contact', icon: <Mail size={16} aria-hidden="true" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              className={`px-5 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-500/20 font-medium'
                  : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/20 to-indigo-500/20">
            <h2 className="font-bold text-xl text-white">
              {activeTab === 'about' && 'About This Relationship Assessment Tool'}
              {activeTab === 'disclaimer' && 'Important Disclaimer About Relationship Advice'}
              {activeTab === 'faq' && 'Frequently Asked Questions About Relationship Red Flags'}
              {activeTab === 'contact' && 'Get in Touch With Our Relationship Assessment Team'}
            </h2>
          </div>
          
          <div className="p-6 md:p-8" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
                    What is the Dating Red Flag Checker?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    The Dating Red Flag Checker is a <span className="text-pink-400 font-medium">relationship assessment tool</span> designed 
                    to help you identify potential warning signs in relationships. While presented in an entertaining format, 
                    our goal is to help you recognize patterns that might indicate compatibility issues or concerning behaviors.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We combine relationship psychology concepts with a light-hearted approach to help you reflect on your dating 
                    experiences. Remember that while our tool can provide insights, it's not a substitute for professional advice 
                    when dealing with serious relationship concerns.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
                    <div className="bg-pink-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <AlertTriangle className="text-pink-400" size={24} aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Identify Warning Signs</h4>
                    <p className="text-gray-400">
                      Learn to recognize red flags in relationships before they become serious problems.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                    <div className="bg-green-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <CheckCircle className="text-green-400" size={24} aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Make Better Decisions</h4>
                    <p className="text-gray-400">
                      Gain insights about relationship patterns to help guide your dating choices.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                    <div className="bg-blue-500/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      <Heart className="text-blue-400" size={24} aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Build Healthier Relationships</h4>
                    <p className="text-gray-400">
                      Understanding red flags is the first step toward creating better relationship dynamics.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                    How to Use Our Relationship Assessment Tool
                  </h3>
                  <ol className="space-y-6">
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 mr-4 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Take the Relationship Quiz</h4>
                        <p className="text-gray-300">
                          Answer questions about your relationship or a potential partner to identify patterns of behavior.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 mr-4 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Review Your Results</h4>
                        <p className="text-gray-300">
                          Get a personalized assessment highlighting potential relationship red flags and positive indicators.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 mr-4 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Learn and Reflect</h4>
                        <p className="text-gray-300">
                          Use our resources to understand what these indicators mean and how they might impact your relationship decisions.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4">Related Relationship Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link to="/quiz" className="p-4 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-medium flex items-center group-hover:text-blue-400">
                        <span>Take the Red Flag Quiz</span>
                        <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">Identify potential warning signs in your relationship</p>
                    </Link>
                    <Link to="/calculator" className="p-4 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-medium flex items-center group-hover:text-blue-400">
                        <span>Dating Pool Calculator</span>
                        <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">Understand realistic dating expectations</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'disclaimer' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
                    Understanding Relationship Red Flags: Important Context
                  </h3>
                  <div className="p-5 border-l-4 border-red-500 bg-red-500/10 rounded-r-lg">
                    <p className="text-gray-300 leading-relaxed">
                      The Dating Red Flag Checker tool provides information about potential relationship warning signs. 
                      While we aim to offer helpful insights, this tool is <strong className="text-red-400">NOT</strong> a substitute for professional advice, 
                      particularly in situations involving abuse, violence, or significant psychological distress.
                    </p>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Healthy relationships involve nuanced understanding, open communication, and sometimes professional guidance. 
                    Our assessment can be a starting point for reflection, but should not replace seeking professional help for 
                    serious relationship issues.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                    Professional Resources for Relationship Help
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you're experiencing relationship difficulties or have concerns about warning signs, 
                    please consider these legitimate resources:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-bold text-white mb-2 flex items-center group-hover:text-blue-400">
                        <span>Licensed Therapists</span>
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Find qualified professionals who can provide personalized guidance for your specific situation.
                      </p>
                    </a>
                    
                    <a href="https://www.gottman.com/couples/" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-bold text-white mb-2 flex items-center group-hover:text-blue-400">
                        <span>Relationship Counseling</span>
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Couples therapy can help address communication issues and other relationship challenges.
                      </p>
                    </a>
                    
                    <a href="https://www.thehotline.org/" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-bold text-white mb-2 flex items-center group-hover:text-blue-400">
                        <span>Domestic Violence Hotline</span>
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-gray-400 text-sm">
                        For safety concerns: National Domestic Violence Hotline at 1-800-799-7233
                      </p>
                    </a>
                    
                    <a href="https://www.betterhelp.com/" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-bold text-white mb-2 flex items-center group-hover:text-blue-400">
                        <span>Online Therapy Services</span>
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Resources like BetterHelp or Talkspace connect you with licensed professionals online.
                      </p>
                    </a>
                  </div>
                </div>
                
                <div className="p-5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">Legal Information</h3>
                  <p className="text-gray-300 text-sm">
                    The Dating Red Flag Checker provides information for educational and entertainment purposes. 
                    While we strive for accuracy, we make no warranties regarding the completeness or reliability of content. 
                    By using this site, you acknowledge it is for general information only, and you will exercise your own judgment 
                    regarding serious relationship decisions. We are not responsible for actions taken based solely on the content of this site.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">Is this backed by psychological research?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        While our tool incorporates concepts from relationship psychology, it is primarily designed as an educational resource with an entertaining presentation. 
                        The assessment draws from common relationship warning signs identified in psychological literature, but should not be confused with clinical diagnostic tools 
                        or validated psychological assessments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">Is this a substitute for therapy or counseling?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        No. This tool is meant to provide general insights about relationship warning signs, but cannot address your specific situation with the nuance it deserves. 
                        For relationship issues or concerns, please consult with a licensed therapist, counselor, or mental health professional who can provide personalized guidance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">Is my data private?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        Yes, we take privacy seriously. All data is stored locally in your browser. We don't collect or store your responses on our servers. 
                        Your assessment results remain private unless you choose to share them. For more details, please review our Privacy Policy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">How should I interpret my results?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        Your results should be seen as a starting point for reflection, not definitive judgments about your relationship. 
                        Consider the patterns identified in your assessment and reflect on how they might impact your relationship satisfaction and wellbeing. 
                        Remember that context matters—what's a deal-breaker for one person might be manageable for another. 
                        Use the insights as conversation starters or areas for personal growth rather than absolute verdicts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">What if my real relationship has problems?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        If you're concerned about your relationship, please seek help from qualified professionals. Talk to a licensed therapist, 
                        counselor, or mental health provider who specializes in relationships. For immediate concerns about safety, 
                        the National Domestic Violence Hotline (1-800-799-7233) provides 24/7 support. Remember that reaching out for help 
                        is a sign of strength, not weakness.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">What are common relationship red flags?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        Common relationship red flags include controlling behavior, disrespect of boundaries, frequent lying, 
                        emotional manipulation, isolation from friends and family, refusal to take responsibility, consistent patterns 
                        of broken promises, and any form of abuse (emotional, physical, financial). Our assessment tool helps identify 
                        these and other potential warning signs, but remember that context matters when evaluating behaviors.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-lg font-bold mb-2 text-white" itemProp="name">How can I share my results?</h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-300" itemProp="text">
                        After completing your assessment, you'll see options to share your results via email, social media, 
                        or through a unique link. You can also download your results as an image. All sharing is optional—your 
                        results remain private unless you choose to share them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
                    Get in Touch With Our Team
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Have feedback about our relationship assessment tool or want to suggest new features? We'd love to hear from you! 
                    Our team is committed to improving the Dating Red Flag Checker to help people identify relationship warning signs.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                        <Mail className="text-blue-400" size={24} aria-hidden="true" />
                      </div>
                      <h4 className="text-lg font-bold">Email Us</h4>
                    </div>
                    <p className="text-gray-400 mb-4">
                      For feedback, feature suggestions, or questions about our assessment tool.
                    </p>
                    <a 
                      href="mailto:contact@checkredflag.com" 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
                      aria-label="Send email to Dating Red Flag Checker team"
                    >
                      <span>Send Email</span>
                      <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                    </a>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                        <Github className="text-purple-400" size={24} aria-hidden="true" />
                      </div>
                      <h4 className="text-lg font-bold">GitHub</h4>
                    </div>
                    <p className="text-gray-400 mb-4">
                      This project is open source! Contribute to the code or suggest new assessment features.
                    </p>
                    <a 
                      href="https://github.com/checkredflag" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300"
                      aria-label="Visit our GitHub repository"
                    >
                      <span>Visit Repository</span>
                      <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-amber-500/20 p-3 rounded-lg">
                      <Coffee className="text-amber-400" size={24} aria-hidden="true" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Support This Project</h4>
                  <p className="text-gray-300 mb-4 max-w-lg mx-auto">
                    If you find our relationship red flag assessment tool helpful, consider supporting the continued 
                    development of this resource to help more people identify warning signs.
                  </p>
                  <a 
                    href="#support" 
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20"
                    aria-label="Support our project with a donation"
                  >
                    <span className="font-medium">Support Our Project</span>
                    <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                  </a>
                </div>

                <div className="p-6 bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4">Explore More Relationship Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link to="/quiz" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-pink-500/30 transition-all group">
                      <h4 className="font-medium group-hover:text-pink-400 flex items-center">
                        <span>Red Flag Assessment Quiz</span>
                        <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Take our interactive assessment to identify potential relationship warning signs
                      </p>
                    </Link>
                    <Link to="/calculator" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-indigo-500/30 transition-all group">
                      <h4 className="font-medium group-hover:text-indigo-400 flex items-center">
                        <span>Dating Pool Calculator</span>
                        <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Understand realistic dating expectations based on preferences and demographics
                      </p>
                    </Link>
                    <Link to="/advice" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                      <h4 className="font-medium group-hover:text-blue-400 flex items-center">
                        <span>Relationship Advice</span>
                        <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Tips for navigating common relationship challenges and warning signs
                      </p>
                    </Link>
                    <a href="https://www.psychologytoday.com/us/basics/relationships" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-green-500/30 transition-all group">
                      <h4 className="font-medium group-hover:text-green-400 flex items-center">
                        <span>Professional Relationship Resources</span>
                        <ExternalLink size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        Find expert guidance from Psychology Today's relationship section
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

    </div>
  );
};

export default AboutPage;