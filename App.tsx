
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

interface Product {
  name: string;
  link: string;
  qty: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    nameSurname: '',
    phone: '',
    email: '',
    message: '',
    privacyAccepted: false
  });

  const [products, setProducts] = useState<Product[]>([
    { name: '', link: '', qty: '' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // State per l'animazione della timeline
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setActiveSteps((prev) => [...prev, index]);
            }, 200 + index * 500);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const steps = [
    {
      id: '01',
      title: 'Candidatura & Analisi',
      description: 'Valutiamo attentamente il potenziale commerciale del tuo prodotto e la sua scalabilità sui mercati Meta e TikTok attraverso uno studio preventivo dei margini.',
    },
    {
      id: '02',
      title: 'Setup & Integrazione',
      description: 'Ti diamo accesso al portale ordini e colleghiamo i tuoi sistemi di magazzino ai nostri tracciamenti per una sincronizzazione perfetta dei flussi.',
    },
    {
      id: '03',
      title: 'Scale-up & Marketing',
      description: 'Noi lanciamo le campagne con il nostro budget pubblicitario. Tu ricevi gli ordini già confermati telefonicamente, pronti solo da etichettare e spedire.',
    },
    {
      id: '04',
      title: 'Incasso & Profitto',
      description: 'Tu spedisci e incassi direttamente dal corriere. Dividiamo l’utile esclusivamente sulle vendite andate a buon fine. Guadagniamo solo se guadagni tu.',
    }
  ];

  const faqs = [
    { q: "Che tipo di prodotti accettate?", a: "Cerchiamo prodotti di massa ad alto appeal visivo: gadget innovativi, articoli per la casa, beauty, fitness e accessori tech. Lo stock deve essere fisicamente presente in Italia." },
    { q: "Quanto costa iniziare la partnership?", a: "Assolutamente zero. MWS investe il proprio capitale in pubblicità, creatività e gestione. Guadagniamo solo quando tu vendi e incassi." },
    { q: "Come avvengono i pagamenti?", a: "Il cliente finale paga a te tramite contrassegno (COD). Tu incassi il totale dal corriere e, a fine mese, giri a noi la commissione pattuita sul venduto confermato." },
    { q: "C'è un vincolo contrattuale a lungo termine?", a: "No. La nostra partnership si basa sui risultati. Se smettiamo di vendere, sei libero di interrompere la collaborazione in qualsiasi momento senza penali." }
  ];

  const handleAddProduct = () => products.length < 20 && setProducts([...products, { name: '', link: '', qty: '' }]);
  const handleUpdateProduct = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };
  const handleRemoveProduct = (index: number) => products.length > 1 && setProducts(products.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.nameSurname || !formData.phone || !formData.email || !formData.privacyAccepted) {
      setError('Compila i campi obbligatori.'); return;
    }
    const productsText = products.filter(p => p.name.trim() !== '').map((p, i) => `${i + 1}. ${p.name} - Qty: ${p.qty}`).join('\n');
    setIsSubmitting(true);
    try {
      const response = await fetch('https://hook.eu1.make.com/abxqpi0l9pq95gi7latiy2pa0l1xsosi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, product_list: productsText, submitted_at: new Date().toISOString() }),
      });
      if (response.ok) window.location.href = 'https://moise-web-srl.com/grazie';
      else throw new Error('Errore server.');
    } catch { setError('Errore nell\'invio.'); setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.05),transparent_40%)]"></div>
          <div className="container mx-auto px-6 relative animate-fade-in">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 mb-8 text-xs font-black tracking-[0.2em] text-blue-600 uppercase border border-blue-200 rounded-full bg-blue-50">
                MWS PARTNERSHIP PROGRAM
              </span>
              <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-[1.1]">
                Trasforma il tuo Stock in <br/>
                <span className="text-blue-600">Liquidità immediata.</span> <br/>
                Noi portiamo gli Ordini, tu Spedisci.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl font-medium leading-relaxed">
                Hai prodotti in Italia pronti alla consegna? Smetti di preoccuparti del marketing. Il nostro team investe il budget pubblicitario e gestisce i clienti al posto tuo. Ricevi ordini confermati ogni giorno e paghi una commissione solo a vendita conclusa.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a 
                  href="#candidati-ora" 
                  onClick={(e) => handleAnchorClick(e, 'candidati-ora')}
                  className="primary-btn px-12 py-5 rounded-2xl text-lg font-bold uppercase tracking-wider w-full sm:w-auto text-center"
                >
                  Inizia a Vendere Subito
                </a>
                <a 
                  href="#processo" 
                  onClick={(e) => handleAnchorClick(e, 'processo')}
                  className="px-12 py-5 rounded-2xl text-lg font-bold border border-slate-200 text-slate-700 hover:bg-white hover:shadow-lg transition-all w-full sm:w-auto text-center"
                >
                  Scopri come funziona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-white py-12 border-y border-slate-100 relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center">
              <div>
                <p className="text-3xl font-black text-blue-600 mb-1">Oltre €500.000</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generati per i nostri partner</p>
              </div>
              <div className="border-x border-slate-100 px-6">
                <p className="text-3xl font-black text-blue-600 mb-1">5 Anni</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Di esperienza in Performance Marketing</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-600 mb-1">100% Italia</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Focus totale su E-commerce Italiano</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chi Siamo Section (Brand Authority) */}
        <section id="chi-sono" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative group w-full">
                {/* Custom Graph Integration */}
                <div className="chart-wrapper">
                    <div className="chart-header">
                        <h3>Crescita dei Partner</h3>
                        <p>Performance aggregate · ultimi 5 anni</p>
                    </div>

                    <div className="chart-pie-label">Quota di crescita</div>
                    <div className="chart-pie"></div>

                    <div className="chart-bars">
                        <div className="chart-bar" style={{ "--h": "80px" } as any}><span>2021</span></div>
                        <div className="chart-bar" style={{ "--h": "110px" } as any}><span>2022</span></div>
                        <div className="chart-bar" style={{ "--h": "150px" } as any}><span>2023</span></div>
                        <div className="chart-bar" style={{ "--h": "200px" } as any}><span>2024</span></div>
                        <div className="chart-bar" style={{ "--h": "250px" } as any}><span>2025</span></div>
                    </div>
                </div>
              </div>
              <div>
                <span className="text-blue-600 font-black text-sm uppercase tracking-widest block mb-4">Chi Siamo</span>
                <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 uppercase leading-tight">Il tuo Growth Partner, <br/><span className="text-blue-600">non la solita agenzia.</span></h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p>Non sono qui per venderti un servizio o una consulenza fine a se stessa. Moise Web SRL nasce per essere il tuo partner di crescita operativa, un'estensione della tua azienda focalizzata sulla performance pura.</p>
                  <p>Mettiamo le nostre competenze, il nostro team creativo e, soprattutto, il nostro capitale pubblicitario a tua completa disposizione. Il nostro modello di business elimina il conflitto di interessi tipico delle agenzie tradizionali.</p>
                  <p className="font-bold text-slate-900">Mettiamo la pelle nel gioco: se tu non guadagni, noi non guadagniamo. Siamo allineati al 100% verso lo scaling del tuo profitto netto.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Noi vs Agenzie Section */}
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-slate-900 uppercase">La Differenza <span className="text-blue-600">Sostanziale</span></h2>
              <p className="text-slate-500 mt-4">Perché i produttori scelgono il rischio zero di MWS.</p>
            </div>
            
            <div className="comparison-grid max-w-5xl mx-auto">
              <div className="clean-card p-12 opacity-70">
                <h3 className="text-xl font-black mb-8 uppercase text-slate-500">Agenzie Tradizionali</h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-slate-400">
                    <span className="cross-icon font-bold">✕</span> Fee mensili fisse da €1.000+
                  </li>
                  <li className="flex items-center gap-4 text-slate-400">
                    <span className="cross-icon font-bold">✕</span> Budget pubblicitario pagato da te
                  </li>
                  <li className="flex items-center gap-4 text-slate-400">
                    <span className="cross-icon font-bold">✕</span> Nessuna garanzia di ROI o vendite
                  </li>
                  <li className="flex items-center gap-4 text-slate-400">
                    <span className="cross-icon font-bold">✕</span> Vincoli contrattuali semestrali o annuali
                  </li>
                </ul>
              </div>

              <div className="clean-card p-12 border-2 border-blue-600 relative overflow-hidden ring-4 ring-blue-50">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1 uppercase tracking-tighter">Recommended</div>
                <h3 className="text-xl font-black mb-8 uppercase text-blue-600">MWS Partnership</h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-slate-900 font-bold">
                    <span className="check-icon font-bold">✓</span> Zero costi di avvio e zero fee mensili
                  </li>
                  <li className="flex items-center gap-4 text-slate-900 font-bold">
                    <span className="check-icon font-bold">✓</span> Budget Ads interamente coperto da noi
                  </li>
                  <li className="flex items-center gap-4 text-slate-900 font-bold">
                    <span className="check-icon font-bold">✓</span> Paghi solo a risultato ottenuto
                  </li>
                  <li className="flex items-center gap-4 text-slate-900 font-bold">
                    <span className="check-icon font-bold">✓</span> Nessun vincolo: lavoriamo per i tuoi risultati
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Processo Section */}
        <section id="processo" className="py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <div className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 uppercase">Flusso Operativo</h2>
                  <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
                  <p className="mt-8 text-slate-500 text-lg max-w-md leading-relaxed">
                    Un sistema collaudato progettato per minimizzare i tempi di attivazione e massimizzare il volume di vendite fin dal primo giorno.
                  </p>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full" ref={timelineRef}>
                {/* Custom Timeline Integration */}
                <div className="timeline">
                  {steps.map((step, index) => (
                    <div key={index} className={`step ${activeSteps.includes(index) ? 'active' : ''}`}>
                      <div className="step-circle">{step.id}</div>
                      <div className="step-content">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vantaggi Section */}
        <section id="vantaggi" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase mb-4">I Tuoi <span className="text-blue-600">Vantaggi Esclusivi</span></h2>
              <p className="text-slate-500 text-lg">Massima resa operativa con il minimo sforzo finanziario.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { t: "Investimento a Rischio Zero", d: "Non spenderai un solo euro in pubblicità. Copriamo noi l’intero budget marketing necessario per svuotare il tuo magazzino.", c: "border-blue-500" },
                { t: "Scaling Rapido (7 Giorni)", d: "Portiamo i tuoi prodotti da 0 a 100+ ordini al giorno in tempi record grazie a creatività virali e strategie ads aggressive.", c: "border-slate-300" },
                { t: "Efficienza Operativa Totale", d: "Ci occupiamo noi di customer service, conferme telefoniche e assistenza. Tu devi solo pensare a preparare i pacchi.", c: "border-slate-300" }
              ].map((v, i) => (
                <div key={i} className={`clean-card p-10 border-t-4 ${v.c}`}>
                  <h3 className="text-xl font-black mb-4 text-slate-900 uppercase">{v.t}</h3>
                  <p className="text-slate-600 leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 uppercase">Domande Frequenti</h2>
              <p className="text-slate-500 mt-4">Tutto quello che devi sapere per iniziare.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`faq-item clean-card !rounded-2xl border border-slate-100 cursor-pointer ${activeFaq === idx ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="px-8 py-6 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-slate-900 pr-8">{faq.q}</h4>
                    <svg className="faq-icon h-6 w-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="faq-answer px-8 text-slate-500 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requisiti Section */}
        <section id="requisiti" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase">Requisiti di Partnership</h2>
              <p className="text-slate-500 max-w-2xl mx-auto mt-4">Collaboriamo solo con aziende che garantiscono standard operativi eccellenti.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {[
                { t: "Stock Reale in Italia", d: "Devi avere merce pronta a terra nel tuo magazzino italiano per garantire affidabilità e controllo.", i: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
                { t: "Evasione in 24/48h", d: "La velocità è fondamentale. Devi essere in grado di evadere gli ordini massivi immediatamente dopo la conferma.", i: "M13 10V3L4 14h7v7l9-11h-7z" },
                { t: "Pagamento Contrassegno", d: "L’accettazione del contrassegno (COD) è obbligatoria per dominare il mercato italiano e massimizzare il conversion rate.", i: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2", highlight: true }
              ].map((r, i) => (
                <div key={i} className={`clean-card p-10 text-center ${r.highlight ? 'border-2 border-blue-600 shadow-xl' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${r.highlight ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={r.i} />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 uppercase ${r.highlight ? 'text-blue-600' : 'text-slate-900'}`}>{r.t}</h3>
                  <p className="text-slate-600 text-sm">{r.d}</p>
                </div>
              ))}
            </div>
            <div className="text-center max-w-xl mx-auto">
              <a 
                href="#candidati-ora" 
                onClick={(e) => handleAnchorClick(e, 'candidati-ora')}
                className="primary-btn inline-block px-12 py-5 rounded-2xl text-xl uppercase tracking-tighter w-full shadow-xl"
              >
                Invia la tua Candidatura
              </a>
            </div>
          </div>
        </section>

        {/* Candidatura Section */}
        <section id="candidati-ora" className="py-32 bg-white scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto clean-card p-8 md:p-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase">Candidatura Partner</h2>
                <p className="text-slate-500 mt-4">Analizziamo la tua richiesta entro 24 ore lavorative.</p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" required className="clean-input w-full px-6 py-4" placeholder="Nome & Cognome *" value={formData.nameSurname} onChange={(e)=>setFormData({...formData, nameSurname: e.target.value})}/>
                  <input type="tel" required className="clean-input w-full px-6 py-4" placeholder="Telefono Diretto *" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})}/>
                </div>
                <input type="email" required className="clean-input w-full px-6 py-4" placeholder="Email Aziendale *" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})}/>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase text-blue-600 tracking-widest">Stock Disponibile</h4>
                  {products.map((p, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="md:col-span-5"><input type="text" className="clean-input w-full px-4 py-3 text-sm" placeholder="Nome Prodotto" value={p.name} onChange={(e)=>handleUpdateProduct(i,'name',e.target.value)}/></div>
                      <div className="md:col-span-4"><input type="url" className="clean-input w-full px-4 py-3 text-sm" placeholder="Link (facoltativo)" value={p.link} onChange={(e)=>handleUpdateProduct(i,'link',e.target.value)}/></div>
                      <div className="md:col-span-2"><input type="text" className="clean-input w-full px-4 py-3 text-sm" placeholder="Quantità" value={p.qty} onChange={(e)=>handleUpdateProduct(i,'qty',e.target.value)}/></div>
                      <div className="md:col-span-1 flex justify-center items-center">
                        <button type="button" onClick={()=>handleRemoveProduct(i)} className="text-slate-400 hover:text-red-600 transition-colors" disabled={products.length===1}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddProduct} className="text-blue-600 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:underline">+ Aggiungi Prodotto</button>
                </div>

                <textarea className="clean-input w-full px-6 py-4 h-32" placeholder="Note Aggiuntive..." value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})}></textarea>

                <div className="flex items-start gap-4">
                  <input type="checkbox" required className="mt-1 h-5 w-5 accent-blue-600" checked={formData.privacyAccepted} onChange={(e)=>setFormData({...formData, privacyAccepted: e.target.checked})}/>
                  <label className="text-xs text-slate-500 uppercase font-bold">Autorizzo il trattamento dati secondo la Privacy Policy.</label>
                </div>

                {error && <p className="text-red-600 text-sm font-bold uppercase text-center">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="primary-btn w-full py-6 rounded-2xl text-xl shadow-lg">
                  {isSubmitting ? "Invio in corso..." : "Lancia Partnership"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
