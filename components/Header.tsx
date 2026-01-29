
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const navLinks = [
    { name: 'Come Funziona', href: 'processo' },
    { name: 'Vantaggi', href: 'vantaggi' },
    { name: 'Chi Siamo', href: 'chi-sono' },
    { name: 'Requisiti', href: 'requisiti' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#hero" onClick={(e) => handleAnchorClick(e, 'hero')} className="flex items-center group">
          <img 
            src="https://moise-web-srl.com/wp-content/uploads/2025/07/web-app-manifest-512x512-2.png" 
            alt="MWS Logo" 
            className="max-h-[50px] w-auto transition-transform group-hover:scale-105"
          />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#candidati-ora"
            onClick={(e) => handleAnchorClick(e, 'candidati-ora')}
            className="primary-btn text-white px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest shadow-md"
          >
            Candidati Ora
          </a>
        </nav>

        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`} 
              className="text-lg font-bold text-slate-800" 
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#candidati-ora" 
            className="primary-btn text-white py-4 rounded-xl text-center font-bold uppercase" 
            onClick={(e) => handleAnchorClick(e, 'candidati-ora')}
          >
            Candidati Ora
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
