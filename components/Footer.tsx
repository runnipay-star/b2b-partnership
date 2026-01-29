
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-black tracking-tighter uppercase">
                MWS <span className="text-blue-500">Partnership</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Il growth partner strategico per le aziende italiane. Trasformiamo il tuo magazzino in un asset ad alta rotazione attraverso performance marketing di precisione e gestione operativa end-to-end.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Documentazione Legale</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://moise-web-srl.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Privacy Policy</a>
              </li>
              <li>
                <a href="https://moise-web-srl.com/termini-e-condizioni/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Termini e Condizioni</a>
              </li>
              <li>
                <a href="https://moise-web-srl.com/cookie/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors font-medium">Cookie Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Contatti</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@moise-web-srl.com" className="text-slate-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@moise-web-srl.com
                </a>
              </li>
              <li className="text-slate-400 text-sm">
                Moise Web SRL<br />
                Sede Operativa · Italia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © {currentYear} Moise Web SRL. P.IVA 12345678901. Tutti i diritti riservati.
          </div>
          <div className="flex items-center gap-6">
             <span className="h-1 w-1 bg-slate-700 rounded-full"></span>
             <span className="text-slate-600 text-[10px] font-black uppercase tracking-tighter">Powered by MWS Tech Division</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
