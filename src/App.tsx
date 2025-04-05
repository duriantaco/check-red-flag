import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ProfileProvider } from './contexts/ProfileContext';

const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const RedFlagChecker = lazy(() => import('./pages/RedFlagChecker'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdvicePage = lazy(() => import('./pages/AdvicePage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div role="status" className="animate-pulse">
      <div className="h-10 w-48 bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-4 w-32 bg-gray-700 rounded-lg mx-auto"></div>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ProfileProvider>
        <Router>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Dating Red Flag Checker | Identify Relationship Warning Signs</title>
            <meta name="description" content="Evaluate your relationship with our free Dating Red Flag Checker. Identify potential warning signs and make better dating decisions." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#111827" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/logo192.png" />
            <meta name="robots" content="index, follow" />
            
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://checkredflag.com/" />
            <meta property="og:title" content="Dating Red Flag Checker | Identify Relationship Warning Signs" />
            <meta property="og:description" content="Evaluate your relationship with our free Dating Red Flag Checker. Identify potential warning signs and make better dating decisions." />
            
            <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Dating Red Flag Checker",
                "url": "https://checkredflag.com",
                "description": "A tool to identify relationship warning signs and make better dating decisions.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://checkredflag.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}</script>
          </Helmet>
          
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/quiz" element={<RedFlagChecker />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/advice" element={<AdvicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ProfileProvider>
    </HelmetProvider>
  );
};

export default App;