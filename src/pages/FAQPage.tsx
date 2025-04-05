import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HelpCircle, Plus, Minus, ArrowRight, MessageSquare, AlertTriangle, Book, Heart } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: 'general' | 'usage' | 'technical' | 'relationship';
}

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const faqItems: FAQItem[] = [
    {
      id: 'what-is-red-flag',
      question: 'What is a "red flag" in a relationship?',
      answer: (
        <p>
          A "red flag" in relationships refers to warning signs or behaviors that might indicate potential problems. 
          These can range from communication issues to more serious concerns like controlling behavior or dishonesty. 
          Our tool helps identify these patterns early, though remember that context matters—what's a deal-breaker 
          for one person might be manageable for another.
        </p>
      ),
      category: 'general'
    },
    {
      id: 'tool-purpose',
      question: 'What is the purpose of this tool?',
      answer: (
        <div>
          <p className="mb-3">
            The Dating Red Flag Checker serves multiple purposes:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Raising awareness about common relationship warning signs</li>
            <li>Creating a starting point for personal reflection</li>
          </ul>
          <p>
            While we do or at least try to use humor and satire, our underlying goal is helping people identify 
            potentially problematic relationship patterns.
          </p>
        </div>
      ),
      category: 'general'
    },
    {
      id: 'scientific-basis',
      question: 'Is this tool backed by psychological research?',
      answer: (
        <p>
          While our assessment includes SOME concepts from relationship psychology literature, 
          it is not a validated psychological assessment tool. I repeat, this is NOT a psychological assessment tool.
          The red flags and green flags we highlight are based on commonly recognized relationship dynamics, 
          but the scoring system and assessment methodology are not scientifically validated. This tool is designed 
          primarily for entertainment only. 
        </p>
      ),
      category: 'general'
    },
    {
      id: 'data-privacy',
      question: 'How is my data stored and protected?',
      answer: (
        <p>
          Your privacy is a top priority. All data from your assessment is stored locally in your browser 
          and never sent to our servers. We don't collect, store, or process any personal information. 
          Your responses remain private unless you actively choose to share your results. For more details, 
          please review our <Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
        </p>
      ),
      category: 'technical'
    },
    {
      id: 'how-to-use',
      question: 'How do I use the assessment tool?',
      answer: (
        <div>
          <p className="mb-3">
            Using our relationship assessment tool is simple:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to the <Link to="/quiz" className="text-blue-400 hover:underline">Quiz page</Link></li>
            <li>Rate each relationship trait on the spectrum from negative to positive</li>
            <li>Review your results, including red flags, green flags, and overall assessment</li>
            <li>Optionally, save or share your results if you find them helpful</li>
          </ol>
        </div>
      ),
      category: 'usage'
    },
    {
      id: 'result-interpretation',
      question: 'How should I interpret my results?',
      answer: (
        <div>
          <p className="mb-3">
            Your results should be viewed as a starting point for reflection, NOT as definitive judgments 
            about your relationship. Consider the patterns identified in your assessment and reflect on 
            how they might impact your relationship satisfaction and wellbeing.
          </p>
          <p className="mb-3">
            Remember that context matters—what's concerning in one relationship might be manageable in 
            another. Use the insights as conversation starters or areas for personal growth rather than 
            absolute verdicts.
          </p>
          <p>
            The satirical recommendations are just for fun—please don't actually follow them! You might actually
            want to consider the opposite of what they suggest. This is meant to be a lighthearted way to
            engage with serious topics, but we take relationship red flags seriously.
          </p>
        </div>
      ),
      category: 'usage'
    },
    {
      id: 'relationship-problems',
      question: 'What if my real relationship has problems?',
      answer: (
        <div>
          <p className="mb-3">
            If you're genuinely concerned about your relationship, we strongly encourage you to seek help 
            from qualified professionals. Our tool can help identify potential issues, but it's not a 
            substitute for professional help.
          </p>
          <p className="mb-3">
            Consider reaching out to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>A licensed therapist or counselor</li>
            <li>Relationship counseling services</li>
            <li>Support groups focused on healthy relationships</li>
            <li>National Domestic Violence Hotline: 1-800-799-7233 (if safety is a concern)</li>
          </ul>
        </div>
      ),
      category: 'relationship'
    },
    {
      id: 'common-red-flags',
      question: 'What are common relationship red flags?',
      answer: (
        <div>
          <p className="mb-3">
            While every relationship is unique, some commonly recognized red flags include:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Controlling behavior or excessive jealousy</li>
            <li>Frequent criticism or belittling</li>
            <li>Cheating</li>
            <li>Playing mindgames</li>
            <li>Disrespect of personal boundaries</li>
            <li>Patterns of dishonesty or secretive behavior</li>
            <li>Emotional manipulation or gaslighting</li>
            <li>Isolation from friends and family</li>
            <li>Refusal to take responsibility for actions</li>
            <li>Will never compromise. My way or the highway kind of attitude</li>
            <li>Substance abuse issues that affect the relationship</li>
            <li>Any form of physical, emotional, or financial abuse</li>
          </ul>
        </div>
      ),
      category: 'relationship'
    },
    {
      id: 'green-flags',
      question: 'What are green flags in a relationship?',
      answer: (
        <div>
          <p className="mb-3">
            Green flags are positive indicators of a healthy relationship. Some examples include:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Open, honest communication</li>
            <li>Mutual respect for boundaries</li>
            <li>Supporting each other's independence and growth</li>
            <li>Healthy conflict resolution without manipulation</li>
            <li>Consistency between words and actions</li>
            <li>Equal effort and investment in the relationship</li>
            <li>Ability to compromise and find win-win solutions</li>
            <li>Emotional support during difficult times</li>
          </ul>
        </div>
      ),
      category: 'relationship'
    },
    {
      id: 'share-results',
      question: 'How can I share my results?',
      answer: (
        <p>
          After completing your assessment, you'll see options to share your results via a unique link 
          or download your results as an image. All sharing is optional—your results remain private unless 
          you choose to share them. The shareable link contains only your assessment data with no personally 
          identifying information.
        </p>
      ),
      category: 'technical'
    },
    {
      id: 'browser-support',
      question: 'Which browsers are supported?',
      answer: (
        <p>
          Our tool supports all modern browsers including Chrome, Firefox, Safari, and Edge. For the best 
          experience, we recommend using the latest version of your preferred browser. The tool is also 
          optimized for both desktop and mobile devices, so you can complete your relationship assessment 
          on any device with a web browser.
        </p>
      ),
      category: 'technical'
    },
    {
      id: 'satire-purpose',
      question: 'Why does this tool include satirical content?',
      answer: (
        <p>
          We include satirical elements to make serious relationship topics more approachable and engaging. 
          Humor can help reduce the anxiety that sometimes comes with evaluating relationship dynamics. 
          However, we take relationship red flags seriously—our satirical recommendations are clearly marked 
          and are meant to entertain, not to undermine the importance of recognizing genuine warning signs.
        </p>
      ),
      category: 'general'
    }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof item.answer === 'string' 
          ? item.answer 
          : 'Please visit our website to view the complete answer to this question.'
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      <Helmet>
        <title>Frequently Asked Questions | Dating Red Flag Checker | Relationship Assessment Tool</title>
        <meta name="description" content="Find answers to common questions about our relationship assessment tool. Learn about relationship red flags and how to use our quiz." />
        <meta name="keywords" content="relationship FAQ, dating red flags questions, relationship assessment help, relationship quiz FAQ" />
        <link rel="canonical" href="https://checkredflag.com/faq" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://checkredflag.com/faq" />
        <meta property="og:title" content="Frequently Asked Questions | Dating Red Flag Checker | Relationship Assessment Tool" />
        <meta property="og:description" content="Find answers to common questions about our relationship assessment tool. Learn about relationship red flags and how to use our quiz." />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
            <li className="text-white">
              FAQ
            </li>
          </ol>
        </nav>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our relationship assessment tool and how to identify red flags in relationships.
          </p>
        </div>

        <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 mb-6 flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <HelpCircle size={24} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-400 mb-1">Have More Questions?</h2>
            <p className="text-gray-300">
              Raise an issue in Github @ https://github.com/duriantaco/check-red-flag
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-4 py-2 rounded-full transition-all flex items-center ${
                activeCategory === 'general'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <HelpCircle size={16} className="mr-1" />
              General
            </button>
            <button
              onClick={() => setActiveCategory('usage')}
              className={`px-4 py-2 rounded-full transition-all flex items-center ${
                activeCategory === 'usage'
                  ? 'bg-gradient-to-r from-pink-500 to-red-600 shadow-lg shadow-pink-500/20'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <Book size={16} className="mr-1" />
              Usage
            </button>
            <button
              onClick={() => setActiveCategory('technical')}
              className={`px-4 py-2 rounded-full transition-all flex items-center ${
                activeCategory === 'technical'
                  ? 'bg-gradient-to-r from-green-500 to-teal-600 shadow-lg shadow-green-500/20'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <MessageSquare size={16} className="mr-1" />
              Technical
            </button>
            <button
              onClick={() => setActiveCategory('relationship')}
              className={`px-4 py-2 rounded-full transition-all flex items-center ${
                activeCategory === 'relationship'
                  ? 'bg-gradient-to-r from-red-500 to-orange-600 shadow-lg shadow-red-500/20'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              <Heart size={16} className="mr-1" />
              Relationship
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 md:p-8 space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">No FAQs found in this category.</p>
              </div>
            ) : (
              filteredFAQs.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className={`w-full p-4 flex items-center justify-between text-left transition-all ${
                      expandedId === item.id
                        ? 'bg-gradient-to-r from-gray-700/80 to-gray-800/80'
                        : 'bg-gradient-to-r from-gray-800/60 to-gray-900/60 hover:from-gray-700/60 hover:to-gray-800/60'
                    }`}
                    aria-expanded={expandedId === item.id}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <h3 className="font-semibold text-lg pr-8">{item.question}</h3>
                    <div className={`flex-shrink-0 transition-transform duration-300 ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}>
                      {expandedId === item.id ? (
                        <Minus size={20} className="text-gray-400" />
                      ) : (
                        <Plus size={20} className="text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {expandedId === item.id && (
                    <div 
                      id={`faq-answer-${item.id}`}
                      className="p-4 bg-gray-800/30 border-t border-gray-700/50 text-gray-300"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-10 p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl border border-gray-700/50">
          <h2 className="text-2xl font-semibold mb-4 text-center">Still Have Questions?</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Link to="/quiz" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-pink-500/30 transition-all group">
              <h3 className="font-medium flex items-center text-lg mb-1 group-hover:text-pink-400">
                <span>Try Our Red Flag Quiz</span>
                <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-400">
                See how our assessment works firsthand by taking the quiz
              </p>
            </Link>
            <Link to="/disclaimer" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/30 transition-all group">
              <h3 className="font-medium flex items-center text-lg mb-1 group-hover:text-yellow-400">
                <AlertTriangle size={18} className="mr-2" />
                <span>Read Our Full Disclaimer</span>
                <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-400">
                Important information about the purpose and limitations of our tool
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;