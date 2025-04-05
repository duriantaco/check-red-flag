import React, { useState } from 'react';
import { Book, Coffee, UserRound, Users, Heart, AlertTriangle, ArrowRight, Dumbbell } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const animationStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
`;

const AdvicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'social' | 'dating' | 'breakup'>('dating');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

  const getMetaTitle = () => {
    switch (activeTab) {
      case 'dating':
        return 'Dating Etiquette Guide | Satirical Dating Advice | Red Flag Checker';
      case 'breakup':
        return 'Breakup Recovery Guide | Satirical Breakup Advice | Red Flag Checker';
      default:
        return 'Dating & Social Etiquette | Satirical Relationship Advice | Red Flag Checker';
    }
  };
  
  const getMetaDescription = () => {
    switch (activeTab) {
      case 'dating':
        return 'Explore our satirical dating etiquette guide full of tongue-in-cheek advice on first dates, texting tactics, and relationship milestones that you definitely shouldn\'t follow.';
      case 'breakup':
        return 'Check out our humorous breakup recovery guide complete with workout plans and emotional protein shake recipes to make you smile during tough times.';
      default:
        return 'Browse our satirical guides on dating etiquette and breakup recovery. A humorous take on relationship advice that will make you laugh.';
    }
  };
  
  const getSchemaData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": `https://checkredflag.com/advice${activeTab !== 'dating' ? `?tab=${activeTab}` : ''}`,
      "name": getMetaTitle(),
      "description": getMetaDescription(),
      "publisher": {
        "@type": "Organization",
        "name": "Check Red Flag",
        "logo": {
          "@type": "ImageObject",
          "url": "https://checkredflag.com/logo.png"
        }
      }
    };
    
    if (activeTab === 'breakup') {
      return {
        ...baseSchema,
        "mainEntity": {
          "@type": "HowTo",
          "name": "Ultimate Post-Breakup Workout Plan",
          "description": "A satirical workout routine to help recover from a breakup",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Bench Press",
              "text": "Perform 4 sets of 8-10 reps to push away memories of your ex"
            },
            {
              "@type": "HowToStep",
              "name": "Deadlifts",
              "text": "Perform 3 sets of 5-8 reps to help pick up the pieces of your broken heart"
            },
            {
              "@type": "HowToStep",
              "name": "Squats",
              "text": "Perform 4 sets of 8-12 reps to build strength to carry emotional baggage"
            },
            {
              "@type": "HowToStep",
              "name": "Weekly Schedule",
              "text": "Follow the weekly breakup recovery schedule with different muscle groups each day"
            }
          ]
        }
      };
    }
    
    if (activeTab === 'dating') {
      return {
        ...baseSchema,
        "mainEntity": {
          "@type": "Article",
          "headline": "Dating Etiquette: A Satirical Handbook",
          "description": "A tongue-in-cheek guide to making your romantic life even more chaotic than it already is",
          "author": {
            "@type": "Organization",
            "name": "Dating Red Flag Checker"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Check Red Flag",
            "logo": {
              "@type": "ImageObject",
              "url": "https://checkredflag.com/logo.png"
            }
          },
          "datePublished": "2025-04-04"
        }
      };
    }
    
    return baseSchema;
  };


  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">

        <Helmet>
            <title>{getMetaTitle()}</title>
            <meta name="description" content={getMetaDescription()} />
            <meta name="keywords" content="dating advice, relationship tips, breakup recovery, satirical dating guide, dating humor, relationship jokes, dating etiquette, breakup workout, dating red flags" />
            
            <link rel="canonical" href={`https://checkredflag.com/advice${activeTab !== 'dating' ? `?tab=${activeTab}` : ''}`} />
            
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://checkredflag.com/advice${activeTab !== 'dating' ? `?tab=${activeTab}` : ''}`} />
            <meta property="og:title" content={getMetaTitle()} />
            <meta property="og:description" content={getMetaDescription()} />
            <script type="application/ld+json">
            {JSON.stringify(getSchemaData())}
            </script>
        </Helmet>

      <Header viewMode="edit" setViewMode={() => {}} />
      
      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-500/30">
          <div className="p-4 flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-400 mb-1">Humor Disclaimer</h2>
              <p className="text-gray-300">
                This advice is satirical and meant for entertainment purposes only. For actual relationship 
                or social advice, please consult a licensed therapist or counselor.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-10">
          <div className="relative">
            <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 to-purple-600/40"></div>
              
              <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-white/10 backdrop-blur-md"></div>
              <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <Book className="text-white mb-4" size={48} />
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                Dating & Social Etiquette
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Satirical tips and advice for navigating modern social situations
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center mb-8 gap-4">       
          <button
            onClick={() => setActiveTab('dating')}
            className={`px-5 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
              activeTab === 'dating'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/20 font-medium'
                : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white'
            }`}
          >
            <Heart size={18} className="mr-2" />
            <span>Dating Etiquette</span>
          </button>
          
          <button
            onClick={() => setActiveTab('breakup')}
            className={`px-5 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
              activeTab === 'breakup'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/20 font-medium'
                : 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white'
            }`}
          >
            <Dumbbell size={18} className="mr-2" />
            <span>Breakup Advice</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm">
          <div className={`px-6 py-4 border-b border-gray-700/50 ${
            activeTab === 'social' 
              ? 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20' 
              : activeTab === 'dating'
              ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20'
              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20'
          }`}>
            <h2 className="font-bold text-xl text-white">
              {activeTab === 'social' ? 'Social Etiquette Guide' : 
               activeTab === 'dating' ? 'Dating Etiquette Guide' : 
               'Breakup Recovery Guide'}
            </h2>
          </div>
          
          <div className="p-6 md:p-8">           
            {activeTab === 'dating' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                    Dating Etiquette: A Satirical Handbook
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Dating in the modern world is complicated. Here's our completely tongue-in-cheek guide 
                    to making your romantic life even more chaotic than it already is.
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-3 text-pink-400 flex items-center">
                      <Heart size={20} className="mr-2" />
                      First Date Essentials
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Show up 30 minutes late.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Talk exclusively about your ex for the first 45 minutes.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Tell them that you are dating multiple people at once and make it known.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Give mixed signals and lead your date on</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-3 text-pink-400 flex items-center">
                      <UserRound size={20} className="mr-2" />
                      Texting Tactics
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Wait a 24h-48h before responding to their messages"</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Send short boring texts.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Respond to their heartfelt message with a heart or a thumbs up emoji.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Do not communicate properly and gaslight them.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-3 text-pink-400 flex items-center">
                      <Coffee size={20} className="mr-2" />
                      Dating App Strategy
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Use photos that are at least 10 years old.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Start every conversation with "Hey" and nothing else. Creativity is overrated.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Match with someone, chat for weeks, then ghost them when they suggest actually meeting.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>List your height as 6'5" regardless of reality.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-3 text-pink-400 flex items-center">
                      <Users size={20} className="mr-2" />
                      Relationship Milestones
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Say "I love you" on the first date to really make an impression.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Ask for their social media passwords to "prove they have nothing to hide."</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Join your finances together.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-400 mr-2">•</span>
                        <span>Get matching tattoos of each other's faces on your first month anniversary.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <h4 className="text-xl font-bold mb-3 text-purple-400">The Fine Print</h4>
                  <p className="text-gray-300">
                    If you couldn't tell already, this is all terrible advice. Please do not actually do any of 
                    these things unless your goal is to be single forever. For real dating advice, consult a 
                    relationship counselor or trusted friend. Or you can just do the opposite of everything
                  </p>
                </div>

                <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 border border-yellow-500/50 relative overflow-hidden">
                    
                    <h4 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 flex items-center">
                        ✨ Golden Advice: How To Actually Treat Someone ✨
                    </h4>
                    
                    <div className="relative z-10">
                        <ul className="space-y-3 text-amber-200">
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Be authentic and honest from the beginning—no games or manipulations.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Listen actively when they speak and validate their feelings.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Respect boundaries and consent in every aspect of the relationship.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Respect their time. If you do not want to be with them, let them know. Don't waste their time. If you are messaging them, 
                                don't leave them on read for hours or days. If you are busy, let them know.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Communicate openly about expectations, desires, and concerns—don't make them guess. Communication is KEY. 
                                And I don't mean the style. No matter the style of communication, the message should always be clear to both parties.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Support their independence and growth as a person outside of the relationship.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Take responsibility for your own mistakes and learn from them together.</span>
                        </li>

                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Date/relationships should be comfortable. Sure there will be ups and downs, but you should feel safe and happy with your partner. It should not be confusing. 
                            </span>
                        </li>

                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>If they like you enough, they will be willing to work on the relationship with you, they will be willing to compromise and communicate. If they are not willing to work on the relationship, then they are not the one for you.</span>
                        </li>

                        <li className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>Remember, a relationship is like building a house. You need a solid foundation, and you need to be on the same page. It always takes 2 parties. If you guys want to have a "my way or the highway" kinda attitude, 
                                welcome to the singles club.
                            </span>
                        </li>

                        </ul>
                    </div>
                    
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"></div>
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"></div>
                </div>

              </div>
            )}
            
            {activeTab === 'breakup' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                    Essential Breakup Recovery Guide
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Going through a painful breakup? Don't worry, we've got you covered with this 
                    comprehensive exercise routine to help you move on and thrive.
                  </p>
                </div>
                
                <div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50">
                  <h4 className="text-xl font-bold mb-4 text-center text-orange-400 flex items-center justify-center">
                    <Dumbbell size={20} className="mr-2" />
                    Ultimate Post-Breakup Workout Plan
                  </h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-red-500/20 to-orange-500/20">
                          <th className="p-3 text-left border border-gray-700">Exercise</th>
                          <th className="p-3 text-center border border-gray-700">Sets</th>
                          <th className="p-3 text-center border border-gray-700">Reps</th>
                          <th className="p-3 text-left border border-gray-700">Emotional Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Bench Press</td>
                          <td className="p-3 border border-gray-700 text-center">4</td>
                          <td className="p-3 border border-gray-700 text-center">8-10</td>
                          <td className="p-3 border border-gray-700">Pushes away memories of your ex</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Deadlifts</td>
                          <td className="p-3 border border-gray-700 text-center">3</td>
                          <td className="p-3 border border-gray-700 text-center">5-8</td>
                          <td className="p-3 border border-gray-700">Helps pick up the pieces of your broken heart</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Squats</td>
                          <td className="p-3 border border-gray-700 text-center">4</td>
                          <td className="p-3 border border-gray-700 text-center">8-12</td>
                          <td className="p-3 border border-gray-700">Builds strength to carry emotional baggage</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Pull-ups</td>
                          <td className="p-3 border border-gray-700 text-center">3</td>
                          <td className="p-3 border border-gray-700 text-center">8-10</td>
                          <td className="p-3 border border-gray-700">Pulls you out of depression</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Shoulder Press</td>
                          <td className="p-3 border border-gray-700 text-center">3</td>
                          <td className="p-3 border border-gray-700 text-center">10-12</td>
                          <td className="p-3 border border-gray-700">Shrugs off negative thoughts</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Bicep Curls</td>
                          <td className="p-3 border border-gray-700 text-center">4</td>
                          <td className="p-3 border border-gray-700 text-center">12-15</td>
                          <td className="p-3 border border-gray-700">Curl up with a good book instead of texting them</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Lunges</td>
                          <td className="p-3 border border-gray-700 text-center">3</td>
                          <td className="p-3 border border-gray-700 text-center">10 each</td>
                          <td className="p-3 border border-gray-700">Steps forward into your new single life</td>
                        </tr>
                        <tr className="hover:bg-gray-800/30">
                          <td className="p-3 border border-gray-700 font-medium">Planks</td>
                          <td className="p-3 border border-gray-700 text-center">3</td>
                          <td className="p-3 border border-gray-700 text-center">60 sec</td>
                          <td className="p-3 border border-gray-700">Stabilizes your emotional core</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-3 text-orange-400 flex items-center">
                      <Dumbbell size={20} className="mr-2" />
                      Weekly Breakup Recovery Schedule
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Monday:</strong> Chest & Triceps</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Tuesday:</strong> Back & Biceps</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Wednesday:</strong> Legs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Thursday:</strong> Shoulders & Abs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Friday:</strong> Full Body</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Weekend:</strong> Rest & recover</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-3 text-orange-400 flex items-center">
                      <Heart size={20} className="mr-2" />
                      Emotional Protein Shake Recipes
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>The Ex-Terminator:</strong> 2 scoops protein, 1 banana</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Ghosted & Shredded:</strong> Vanilla protein, almond milk, ice cubes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Moving On Mocha:</strong> Chocolate protein, coffee</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-400 mr-2">•</span>
                        <span><strong>Revenge Body Blend:</strong> Triple protein, creatine</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30">
                  <h4 className="text-xl font-bold mb-3 text-red-400">Important Note</h4>
                  <p className="text-gray-300">
                    In case it wasn't obvious, this is satirical advice. If you're going through a breakup, 
                    exercise can indeed be helpful, but it's also important to process your emotions in healthy ways.
                    Consider talking to friends, family, or a professional if you're struggling.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-lg border border-gray-700/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Looking for Real Advice?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              This page is all in good fun, but real relationship and social skills are important. 
              Consider checking out these legitimate resources if you're looking for actual guidance:
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <a 
                href="https://www.psychologytoday.com/us/basics/relationships" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <h4 className="font-bold mb-2 group-hover:text-blue-400 transition-colors">Psychology Today</h4>
                <p className="text-gray-400 text-sm mb-2">Scientifically based relationship articles</p>
                <div className="flex justify-end">
                  <ArrowRight size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
              
              <a 
                href="https://www.gottman.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <h4 className="font-bold mb-2 group-hover:text-blue-400 transition-colors">The Gottman Institute</h4>
                <p className="text-gray-400 text-sm mb-2">Research-based relationship skills</p>
                <div className="flex justify-end">
                  <ArrowRight size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
              
              <a 
                href="https://www.betterhelp.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <h4 className="font-bold mb-2 group-hover:text-blue-400 transition-colors">BetterHelp</h4>
                <p className="text-gray-400 text-sm mb-2">Online therapy and counseling services</p>
                <div className="flex justify-end">
                  <ArrowRight size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />

    </div>
  );
};

export default AdvicePage;