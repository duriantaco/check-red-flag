import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfUsePage = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Use | Dating Red Flag Checker | Relationship Assessment Tool",
    "description": "Terms and conditions for using our relationship red flag assessment tool. Learn about our policies for this dating advice resource.",
    "url": "https://checkredflag.com/terms-of-use",
    "mainEntity": {
      "@type": "WebContent",
      "about": {
        "@type": "Thing",
        "name": "Terms of Service for Dating Red Flag Checker"
      },
      "datePublished": "2025-04-04",
      "dateModified": formattedDate
    },
    "publisher": {
      "@type": "Organization",
      "name": "Check Red Flag",
      "logo": {
        "@type": "ImageObject",
        "url": "https://checkredflag.com/logo.png"
      }
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
        <title>Terms of Use | Dating Red Flag Checker | Relationship Assessment Tool</title>
        <meta name="description" content="Terms and conditions for using our relationship red flag assessment tool. Learn about our policies for this dating advice resource." />
        <meta name="keywords" content="terms of use, dating red flags, relationship assessment tool, dating site terms, relationship website policies" />
        <link rel="canonical" href="https://checkredflag.com/terms-of-use" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://checkredflag.com/terms-of-use" />
        <meta property="og:title" content="Terms of Use | Dating Red Flag Checker | Relationship Assessment Tool" />
        <meta property="og:description" content="Terms and conditions for using our relationship red flag assessment tool. Learn about our policies for this dating advice resource." />

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
              Terms of Use
            </li>
          </ol>
        </nav>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Use</h1>
          <p className="text-gray-400">Effective Date: April 4, 2025 | Last Updated: {formattedDate}</p>
        </div>

        <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4 mb-6 flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Shield size={24} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-400 mb-1">Legal Agreement</h2>
            <p className="text-gray-300">
              By using the Dating Red Flag Checker, you agree to these Terms of Use. This tool is for entertainment and educational purposes related to relationship dynamics and dating warning signs.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <section id="introduction">
              <h2 className="text-2xl font-semibold text-white mb-3">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to the Dating Red Flag Checker, a tool designed to help identify potential warning signs in relationships. By accessing or using this application, you agree to comply with and be bound by these Terms of Use. If you do not agree with these terms, please do not use the application.
              </p>
            </section>

            <section id="purpose">
              <h2 className="text-2xl font-semibold text-white mb-3">Purpose of the Relationship Assessment Tool</h2>
              <p className="text-gray-300 leading-relaxed">
                The Dating Red Flag Checker is an educational tool designed to help users identify potential warning signs in relationships. While we present relationship concepts in an entertaining format, this tool should not be used as a substitute for professional relationship advice or counseling. It is intended to promote awareness of common relationship red flags and dating compatibility issues.
              </p>
            </section>

            <section id="data-privacy">
              <h2 className="text-2xl font-semibold text-white mb-3">Data Privacy & Protection</h2>
              <p className="text-gray-300 leading-relaxed">
                We prioritize your privacy. The Dating Red Flag Checker does not collect, store, or process any personal data on servers. All information you enter into the relationship assessment remains local to your browser and is not transmitted to any external entities. You are responsible for managing any data stored locally in your browser.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4 flex items-start gap-3">
                <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Your privacy matters to us. Learn more about how we protect your information in our <Link to="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </section>

            <section id="user-conduct">
              <h2 className="text-2xl font-semibold text-white mb-3">User Conduct</h2>
              <p className="text-gray-300 leading-relaxed">
                When using our relationship assessment tool, you agree to use the application only for lawful purposes and in a manner that does not infringe upon the rights of others. The application is intended for personal, non-commercial use related to relationship guidance and dating advice. You may not use the application to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Harass, harm, or defame any individual or entity</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to reverse-engineer, modify, or hack the application</li>
                <li>Use the tool to make critical relationship decisions without professional guidance</li>
                <li>Misrepresent the tool's purpose or capabilities to others</li>
              </ul>
            </section>

            <section id="content-disclaimer">
              <h2 className="text-2xl font-semibold text-white mb-3">Content Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed">
                The Dating Red Flag Checker provides general information about relationship warning signs and dating compatibility. While we strive to include commonly recognized relationship red flags, the content is not a replacement for personalized professional advice. The creators of this relationship assessment tool are not responsible for any actions taken based solely on the content or results provided.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4 flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  For serious relationship concerns or if you're experiencing relationship abuse, please consult a licensed therapist or call the National Domestic Violence Hotline at 1-800-799-7233.
                </p>
              </div>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold text-white mb-3">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                The Dating Red Flag Checker is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of the content related to relationship warning signs or dating advice. To the fullest extent permitted by law, the creators of this relationship assessment application shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the application.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-white mb-3">Changes to These Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update these Terms of Use from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any changes will be reflected on this page with an updated effective date. We encourage you to review these terms periodically to stay informed about your rights and responsibilities when using our relationship assessment tool.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold text-white mb-3">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions or concerns about these Terms of Use or our relationship assessment tool, please contact us at:
              </p>
              <p className="text-gray-300 mt-2">
                <a href="mailto:terms@checkredflag.com" className="text-blue-400 hover:underline">
                  terms@checkredflag.com
                </a>
              </p>
            </section>

            <section id="related-resources" className="mt-10 pt-6 border-t border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">Related Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/privacy-policy" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-blue-400">
                    <FileText size={16} className="mr-2" />
                    <span>Privacy Policy</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Learn how we protect your information and privacy
                  </p>
                </Link>
                <Link to="/about?tab=disclaimer" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-indigo-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-indigo-400">
                    <AlertTriangle size={16} className="mr-2" />
                    <span>Disclaimer Information</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Important information about our relationship assessment tool
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
                <Link to="/about?tab=faq" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-green-400">
                    <span>Frequently Asked Questions</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Common questions about our relationship assessment
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

export default TermsOfUsePage;