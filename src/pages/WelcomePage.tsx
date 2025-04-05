import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Github, ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const WelcomePage = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const xPercentage = clientX / windowWidth;
      const yPercentage = clientY / windowHeight;
      
      backgroundRef.current.style.background = `
        radial-gradient(
          circle at ${xPercentage * 100}% ${yPercentage * 100}%, 
          rgba(138, 43, 226, 0.2) 0%, 
          rgba(0, 0, 0, 0) 50%
        ),
        radial-gradient(
          circle at ${100 - xPercentage * 100}% ${100 - yPercentage * 100}%, 
          rgba(255, 105, 180, 0.15) 0%, 
          rgba(0, 0, 0, 0) 40%
        ),
        linear-gradient(to bottom, #111111, #0a0a0a)
      `;
      
      const elements = document.querySelectorAll('.floating-element');
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '1');
        const offsetX = (xPercentage - 0.5) * 20 * speed;
        const offsetY = (yPercentage - 0.5) * 20 * speed;
        
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Dating Red Flag Checker | Spot Relationship Warning Signs | CheckRedFlag.com</title>
        <meta name="description" content="Identify relationship red flags and make better dating decisions with our free interactive tool. Take the quiz and learn to spot warning signs early. Check your relationship today!" />
        <meta name="keywords" content="red flags in relationships, dating red flags, relationship warning signs, relationship checker, toxic relationship signs, healthy relationship quiz" />
        
        <link rel="canonical" href="https://checkredflag.com" />
        
        <html lang="en" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://checkredflag.com/" />
        <meta property="og:title" content="Dating Red Flag Checker | Spot Warning Signs Early" />
        <meta property="og:description" content="Our free interactive tool helps you identify relationship red flags and make better dating decisions. See if your relationship has warning signs." />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Dating Red Flag Checker",
              "url": "https://checkredflag.com",
              "description": "An interactive tool to identify relationship warning signs and make better dating decisions",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "CheckRedFlag.com",
                "url": "https://checkredflag.com"
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://checkredflag.com/quiz"
              }
            }
          `}
        </script>
      </Helmet>

      <main itemScope itemType="https://schema.org/WebPage" className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
        <div 
          ref={backgroundRef} 
          className="absolute inset-0 bg-gray-950 transition-all duration-1000 ease-out"
          aria-hidden="true"
        ></div>
        
        <a 
          href="https://github.com/duriantaco" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-800/60 border border-gray-700 hover:bg-gray-700/60 transition-all duration-300 backdrop-blur-sm"
          aria-label="View source code on GitHub"
        >
          <Github className="text-white w-6 h-6" />
        </a>

        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div 
            className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full opacity-20 floating-element" 
            data-speed="0.5"
            style={{
              background: 'radial-gradient(circle, rgba(255,105,180,0.3) 0%, rgba(255,105,180,0) 70%)',
              filter: 'blur(40px)'
            }}
          ></div>
          
          <div 
            className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full opacity-20 floating-element" 
            data-speed="0.7"
            style={{
              background: 'radial-gradient(circle, rgba(138,43,226,0.3) 0%, rgba(138,43,226,0) 70%)',
              filter: 'blur(50px)'
            }}
          ></div>
          
          <div 
            className="absolute top-[15%] left-[25%] w-40 h-40 opacity-15 floating-element" 
            data-speed="0.3"
            style={{
              background: 'radial-gradient(circle, rgba(0,191,255,0.3) 0%, rgba(0,191,255,0) 70%)',
              filter: 'blur(30px)'
            }}
          ></div>
          
          <div 
            className="absolute top-[35%] right-[30%] w-24 h-24 floating-element" 
            data-speed="1.2"
            style={{
              background: 'rgba(255, 105, 180, 0.05)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              transform: 'rotate(30deg)',
              boxShadow: '0 0 40px rgba(255, 105, 180, 0.15)'
            }}
          ></div>
          
          <div 
            className="absolute bottom-[25%] right-[20%] w-20 h-20 floating-element" 
            data-speed="0.9"
            style={{
              background: 'rgba(138, 43, 226, 0.05)',
              borderRadius: '63% 37% 30% 70% / 50% 45% 55% 50%',
              transform: 'rotate(-15deg)',
              boxShadow: '0 0 40px rgba(138, 43, 226, 0.15)'
            }}
          ></div>
          
          <div 
            className="absolute top-[20%] left-[35%] w-16 h-16 floating-element" 
            data-speed="1.5"
            style={{
              background: 'rgba(0, 191, 255, 0.05)',
              borderRadius: '40% 60% 54% 46% / 40% 44% 56% 60%',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 30px rgba(0, 191, 255, 0.15)'
            }}
          ></div>
          
          <div 
            className="absolute bottom-[20%] left-[25%] transform -rotate-12 floating-element" 
            data-speed="0.8"
            style={{ opacity: 0.15 }}
          >
            <div className="w-1 h-20 bg-gradient-to-t from-red-500 to-red-600 rounded-full"></div>
            <div className="w-14 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-sm"></div>
          </div>
          
          <div 
            className="absolute top-[30%] right-[15%] transform rotate-12 floating-element" 
            data-speed="1.1"
            style={{ opacity: 0.15 }}
          >
            <div className="w-1 h-14 bg-gradient-to-t from-pink-500 to-pink-600 rounded-full"></div>
            <div className="w-10 h-7 bg-gradient-to-r from-pink-500 to-pink-600 rounded-sm"></div>
          </div>
          
          <div 
            className="absolute top-[15%] left-[15%] transform rotate-12 floating-element" 
            data-speed="0.6"
          >
            <Heart size={24} className="text-pink-500/10" />
          </div>
          
          <div 
            className="absolute bottom-[30%] right-[30%] transform -rotate-12 floating-element" 
            data-speed="1.3"
          >
            <Heart size={32} className="text-pink-500/10" />
          </div>
          
          <div 
            className="absolute top-[45%] left-[40%] transform rotate-45 floating-element" 
            data-speed="0.4"
          >
            <Heart size={16} className="text-pink-500/10" />
          </div>
        </div>
        
        <section itemProp="mainContentOfPage" className="relative z-10 max-w-5xl mx-auto text-center p-6">
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <div className="absolute -top-6 -left-6 animate-pulse opacity-50">
                <Heart size={24} className="text-pink-500" fill="currentColor" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-4 -right-4 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}>
                <Heart size={20} className="text-pink-500" fill="currentColor" aria-hidden="true" />
              </div>
              
              <div className="relative">
                <Heart className="text-pink-500 w-16 h-16 md:w-24 md:h-24" fill="currentColor" aria-hidden="true" />
                <div className="absolute inset-0 blur-md bg-pink-500 opacity-50 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <h1 itemProp="headline" className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight">
            <span className="text-white">Dating </span>
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                Red Flag
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500/50 to-purple-500/50 blur-sm"></span>
            </span>
            <span className="text-white"> Checker</span>
          </h1>
          
          <p itemProp="description" className="text-gray-400 text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Identify relationship warning signs and make better dating decisions with our free assessment tool
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/about"
              className="group relative px-8 py-4 rounded-full bg-gray-800/60 border border-gray-700 text-white hover:bg-gray-700/60 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              aria-label="Learn more about relationship red flags"
            >
              <span className="relative z-10 flex items-center justify-center">
                Learn More
                <ArrowUpRight size={18} className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700/0 via-gray-700/30 to-gray-700/0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            </Link>
            
            <Link
              to="/quiz"
              className="group relative px-8 py-4 rounded-full overflow-hidden"
              aria-label="Start the relationship red flag assessment quiz"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative z-10 flex items-center justify-center text-white">
                Get Started
                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/0 via-white/20 to-pink-500/0 transform -skew-x-30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </Link>
          </div>
          
          <div className="mt-8">
            <a 
              href="https://github.com/duriantaco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700 text-white hover:bg-gray-700/60 transition-all duration-300 backdrop-blur-sm group"
              aria-label="View source code on GitHub"
            >
              <Github size={20} aria-hidden="true" />
              <span>View on GitHub</span>
              <div className="w-0 overflow-hidden group-hover:w-5 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
            </a>
          </div>
        </section>

        <div className="sr-only" aria-hidden="true">
          <h2>Identify Dating Red Flags</h2>
          <p>
            Our relationship red flag checker helps you identify warning signs of toxic relationships.
            Learn about common red flags in dating, relationship warning signs, and how to spot unhealthy relationship patterns.
            Find out if your relationship has concerning issues with our quick assessment tool.
          </p>
          <h2>Relationship Assessment Tool</h2>
          <p>
            Take our relationship quiz to evaluate the health of your relationship.
            CheckRedFlag.com provides a free interactive tool to help you make better dating decisions.
          </p>
        </div>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes pulse-glow {
              0%, 100% { filter: blur(40px) brightness(1); }
              50% { filter: blur(45px) brightness(1.2); }
            }
            
            .animate-float {
              animation: float 5s ease-in-out infinite;
            }
          `}
        </style>
      </main>
    </>
  );
};

export default WelcomePage;