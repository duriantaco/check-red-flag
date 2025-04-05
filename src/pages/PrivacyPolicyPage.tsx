import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, RefreshCw, ExternalLink, FileText, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Dating Red Flag Checker | Relationship Assessment Tool",
    "description": "Privacy policy for our relationship red flag assessment tool. Learn how we protect your information while using our dating advice resource.",
    "url": "https://checkredflag.com/privacy-policy",
    "mainEntity": {
      "@type": "WebContent",
      "about": {
        "@type": "Thing",
        "name": "Privacy Policy for Dating Red Flag Checker"
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
        <title>Privacy Policy | Dating Red Flag Checker | Relationship Assessment Tool</title>
        <meta name="description" content="Privacy policy for our relationship red flag assessment tool. Learn how we protect your information while using our dating advice resource." />
        <meta name="keywords" content="privacy policy, dating app privacy, relationship tool privacy, data protection, user privacy" />
        <link rel="canonical" href="https://checkredflag.com/privacy-policy" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://checkredflag.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Dating Red Flag Checker | Relationship Assessment Tool" />
        <meta property="og:description" content="Privacy policy for our relationship red flag assessment tool. Learn how we protect your information while using our dating advice resource." />

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
              Privacy Policy
            </li>
          </ol>
        </nav>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400">Effective Date: April 4, 2025 | Last Updated: {formattedDate}</p>
        </div>

        <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 mb-6 flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Shield size={24} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-400 mb-1">Your Privacy Matters</h2>
            <p className="text-gray-300">
              We respect your privacy. This relationship assessment tool does not collect or store any personal data. All information remains local to your browser.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <section id="introduction">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Eye size={24} className="mr-2 text-blue-400" />
                Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to the Dating Red Flag Checker, a tool designed to help you identify potential warning signs in relationships. Your privacy is of utmost importance to us. This Privacy Policy explains how we handle your information when using our application. Rest assured, we do not collect, store, or process any personal data.
              </p>
            </section>

            <section id="data-collection">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Lock size={24} className="mr-2 text-green-400" />
                Information We Collect
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We do not collect any personal data. All information you enter into the relationship assessment tool, such as responses to questions about relationship dynamics or dating experiences, is processed locally within your browser. This data is not transmitted to our servers or any third parties.
              </p>
            </section>

            <section id="data-usage">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <RefreshCw size={24} className="mr-2 text-yellow-400" />
                How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Since we do not collect any personal data, we do not use your information for any purposes beyond providing the functionality of the application. The data you input is used solely to generate your relationship red flag assessment results, which are displayed locally in your browser.
              </p>
            </section>

            <section id="data-sharing">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <ExternalLink size={24} className="mr-2 text-red-400" />
                Data Sharing and Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We do not share or disclose any personal data with third parties, as no data is collected or stored by our application. Your usage remains entirely private and confined to your device.
              </p>
            </section>

            <section id="data-security">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Shield size={24} className="mr-2 text-purple-400" />
                Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                While we do not collect personal data, we implement standard security measures to protect any temporary data processed locally in your browser. This data is automatically cleared when you close or refresh the application.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4 flex items-start gap-3">
                <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Your data stays local. No servers, no worries—complete privacy is our priority.
                </p>
              </div>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Eye size={24} className="mr-2 text-blue-400" />
                Your Rights and Choices
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You have full control over the data you enter into the application. Since all data is stored locally, you can manage it by clearing your browser's local storage or cache. We do not retain any of your information, ensuring your privacy is maintained.
              </p>
            </section>

            <section id="policy-changes">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <RefreshCw size={24} className="mr-2 text-yellow-400" />
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any updates will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <Shield size={24} className="mr-2 text-green-400" />
                Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-gray-300 mt-2">
                <a href="mailto:privacy@checkredflag.com" className="text-blue-400 hover:underline">
                  privacy@checkredflag.com
                </a>
              </p>
            </section>

            <section id="related-resources" className="mt-10 pt-6 border-t border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">Related Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/terms-of-use" className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                  <h3 className="font-medium flex items-center group-hover:text-blue-400">
                    <FileText size={16} className="mr-2" />
                    <span>Terms of Use</span>
                    <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Understand the terms governing your use of our application
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

export default PrivacyPolicyPage;