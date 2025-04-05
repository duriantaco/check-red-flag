import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertTriangle, AlertCircle, Shield, Info, ArrowRight, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer | Dating Red Flag Checker | Relationship Assessment Tool",
    "description": "Important disclaimer about our relationship assessment tool. While entertaining, real relationships require professional guidance, not internet quizzes.",
    "url": "https://checkredflag.com/disclaimer",
    "mainEntity": {
      "@type": "WebContent",
      "about": {
        "@type": "Thing",
        "name": "Disclaimer for Dating Red Flag Checker"
      },
      "datePublished": "2025-04-04",
      "dateModified": formattedDate
    },
    "publisher": {
      "@type": "Organization",
      "name": "Check Red Flag"
    },
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://checkredflag.com/",
      "name": "Dating Red Flag Checker",
      "description": "Identify relationship warning signs and make better dating decisions"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      <Helmet>
        <title>Disclaimer | Dating Red Flag Checker | Relationship Assessment Tool</title>
        <meta name="description" content="Important disclaimer about our relationship assessment tool. While entertaining, real relationships require professional guidance, not internet quizzes." />
        <meta name="keywords" content="relationship disclaimer, dating red flags disclaimer, relationship assessment tool, dating advice disclaimer" />
        <link rel="canonical" href="https://checkredflag.com/disclaimer" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://checkredflag.com/disclaimer" />
        <meta property="og:title" content="Disclaimer | Dating Red Flag Checker | Relationship Assessment Tool" />
        <meta property="og:description" content="Important disclaimer about our relationship assessment tool. While entertaining, real relationships require professional guidance, not internet quizzes." />
        
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
              Disclaimer
            </li>
          </ol>
        </nav>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Disclaimer</h1>
          <p className="text-gray-400">Effective Date: April 4, 2025 | Last Updated: {formattedDate}</p>
        </div>

        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 mb-6 flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <AlertTriangle size={24} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-400 mb-1">Satirical Tool Disclaimer</h2>
            <p className="text-gray-300">
              This relationship assessment tool is intended for entertainment and educational purposes only. It is not a substitute for professional advice, counseling, or therapy. Please read the full disclaimer below.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <section id="entertainment-purpose">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Info size={24} className="mr-2 text-blue-400" />
                Entertainment Purpose
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The Dating Red Flag Checker is designed primarily for entertainment and educational purposes. The assessment provided is not scientifically validated and should not be taken as definitive guidance for your relationship decisions. We've created this tool to help raise awareness about common relationship warning signs in a light-hearted way, but it should not replace your own judgment or professional advice.
              </p>
            </section>

            <section id="not-professional-advice">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <AlertCircle size={24} className="mr-2 text-orange-400" />
                Not Professional Advice
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The content, assessment results, and recommendations provided by this tool do not constitute professional advice, therapy, counseling, or mental health services. The creators and operators of this tool are not licensed psychologists, therapists, or relationship counselors. If you're experiencing relationship issues, we strongly encourage you to seek help from qualified professionals.
              </p>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-4">
                <p className="text-gray-300 text-sm">
                  For serious relationship concerns, please consult with licensed mental health professionals, therapists, or counselors who can provide personalized guidance tailored to your specific situation.
                </p>
              </div>
            </section>

            <section id="accuracy-limitations">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Shield size={24} className="mr-2 text-yellow-400" />
                Accuracy Limitations
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The information and assessment provided by this tool are based on general knowledge about relationships and common warning signs. However, every relationship is unique and complex. The tool cannot account for the full context, history, or nuances of your specific relationship. As such, the results may not accurately reflect your situation and should be viewed as general information rather than specific guidance.
              </p>
            </section>

            <section id="satire-element">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Info size={24} className="mr-2 text-pink-400" />
                Satirical Elements
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Some aspects of our Dating Red Flag Checker are intentionally satirical. We use humor to make serious topics more approachable, but this should not diminish the importance of recognizing genuine relationship warning signs. The satirical recommendations and content are not meant to be followed and are provided purely for entertainment value.
              </p>
            </section>

            <section id="risk-assumption">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <AlertTriangle size={24} className="mr-2 text-red-400" />
                Assumption of Risk
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By using this tool, you acknowledge and agree that you assume all risks associated with relying on the information provided. The Dating Red Flag Checker and its creators are not responsible for any decisions or actions you take based on the content or assessment results from this tool. You are solely responsible for evaluating the relevance, accuracy, and appropriateness of the information for your specific circumstances.
              </p>
            </section>

            <section id="emergency-situations">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <AlertTriangle size={24} className="mr-2 text-red-400" />
                Emergency Situations
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This tool is not equipped to address emergency situations or crises. If you are experiencing abuse, violence, or fear for your safety in a relationship, please contact emergency services immediately or reach out to specialized help resources such as:
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4 space-y-2">
                <p className="text-gray-300">
                  <strong className="text-white">National Domestic Violence Hotline:</strong> 1-800-799-7233
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">Crisis Text Line:</strong> Text HOME to 741741
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">Emergency Services:</strong> 911 (US) or your local emergency number
                </p>
              </div>
            </section>

            <section id="external-resources">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <ExternalLink size={24} className="mr-2 text-blue-400" />
                Professional Resources
              </h2>
              <p className="text-gray-300 leading-relaxed">
                For reliable relationship guidance, we recommend consulting these professional resources:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2">
                  <ArrowRight size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">American Psychological Association:</strong> Find a licensed psychologist for relationship counseling.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">Psychology Today's Therapist Directory:</strong> Search for qualified relationship therapists in your area.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">The Gottman Institute:</strong> Research-based relationship resources and therapist referrals.
                  </span>
                </li>
              </ul>
            </section>

            <section id="contact-information" className="mt-8 pt-6 border-t border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white mb-3">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this disclaimer, please contact us at:
              </p>
              <p className="text-gray-300 mt-2">
                <a href="mailto:disclaimer@checkredflag.com" className="text-blue-400 hover:underline">
                  disclaimer@checkredflag.com
                </a>
              </p>
            </section>

            <section id="related-links" className="mt-10 pt-6 border-t border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">Related Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/privacy-policy" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-blue-400">
                    <Shield size={16} className="mr-2" />
                    <span>Privacy Policy</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Learn how we protect your information
                  </p>
                </Link>
                <Link to="/terms-of-use" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-purple-400">
                    <Info size={16} className="mr-2" />
                    <span>Terms of Use</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Understand the terms governing your use of our application
                  </p>
                </Link>
                <Link to="/faq" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-yellow-400">
                    <AlertCircle size={16} className="mr-2" />
                    <span>Frequently Asked Questions</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Common questions about our relationship assessment
                  </p>
                </Link>
                <Link to="/quiz" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-pink-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-pink-400">
                    <span>Dating Red Flag Quiz</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Take our quiz to identify relationship warning signs
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DisclaimerPage;