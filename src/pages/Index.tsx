import React, { useState, useEffect } from 'react';
import { Loader2, Star, CheckCircle2, MapPin, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TourCard } from '@/components/TourCard';
import { BookingModal } from '@/components/BookingModal';
import { Profile, TourWithDates } from '@/types/database';
import SEO from '@/components/SEO';

// Demo Fallback Data
const DEMO_PROFILE: Profile = {
  id: 'demo-profile',
  user_id: 'demo',
  name: 'Ricardo Mendes',
  bio: 'Especialista em roteiros exclusivos e experiências autênticas. Transformo sua viagem em uma jornada inesquecível pelos tesouros escondidos da nossa região.',
  photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
  phone: '(21) 98765-4321',
  email: 'contato@guiatur.com',
  location: 'Rio de Janeiro, RJ',
  languages: ['Português', 'Inglês', 'Espanhol'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const DEMO_TOURS: TourWithDates[] = [
  {
    id: 'demo-1',
    user_id: 'demo',
    title: 'Tour Histórico: O Coração da Cidade',
    description: 'Explore os segredos e monumentos mais icônicos do centro histórico com um guia local apaixonado.',
    image_url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800',
    price: 120,
    duration_hours: 4,
    location: 'Rio de Janeiro',
    max_participants: 10,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    available_dates: [
      { id: 'd1', tour_id: 'demo-1', date: new Date(Date.now() + 86400000).toISOString(), start_time: '09:00', spots_available: 5, created_at: '' },
      { id: 'd2', tour_id: 'demo-1', date: new Date(Date.now() + 172800000).toISOString(), start_time: '09:00', spots_available: 8, created_at: '' }
    ]
  },
  {
    id: 'demo-2',
    user_id: 'demo',
    title: 'Trilha Secreta e Banho de Cachoeira',
    description: 'Uma experiência imersiva na natureza, longe dos pontos turísticos tradicionais. Perfeito para fotos!',
    image_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    price: 180,
    duration_hours: 6,
    location: 'Paraty',
    max_participants: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    available_dates: [
      { id: 'd3', tour_id: 'demo-2', date: new Date(Date.now() + 259200000).toISOString(), start_time: '08:30', spots_available: 4, created_at: '' }
    ]
  },
  {
    id: 'demo-3',
    user_id: 'demo',
    title: 'Gastronomia Local e Sabores Autênticos',
    description: 'Deguste os melhores pratos da região em locais que só os moradores conhecem. Uma viagem pelo paladar.',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    price: 250,
    duration_hours: 3,
    location: 'Salvador',
    max_participants: 8,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    available_dates: [
      { id: 'd4', tour_id: 'demo-3', date: new Date(Date.now() + 345600000).toISOString(), start_time: '12:00', spots_available: 6, created_at: '' }
    ]
  }
];

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tours, setTours] = useState<TourWithDates[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<TourWithDates | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // In demo mode, we strictly use the fallback data
    setTimeout(() => {
      setProfile(DEMO_PROFILE);
      setTours(DEMO_TOURS);
      setLoading(false);
    }, 500);
  };

  const handleBook = (tour: TourWithDates) => {
    setSelectedTour(tour);
    setBookingOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Passeios e Experiências"
        description="Confira nossos roteiros exclusivos e agende sua próxima aventura com um guia local experiente."
      />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "GuiaTur Pro - Ricardo Mendes",
          "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
          "description": "Guias turísticos profissionais e roteiros exclusivos.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rio de Janeiro",
            "addressRegion": "RJ",
            "addressCountry": "BR"
          },
          "url": "https://guiaturpro.com.br/demo"
        })}
      </script>
      {/* Top Banner - Demo Mode */}
      <div className="bg-ocean text-white py-2 text-center text-xs font-semibold tracking-wider uppercase">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Exemplo real de site profissional em funcionamento
        </span>
      </div>

      <Navbar />
      
      <main className="pt-16">
        <HeroSection profile={profile} />

        {/* Demo Explanation Header */}
        <section className="bg-sand border-y border-border/40 py-8 relative overflow-hidden">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto shadow-xl bg-white rounded-[32px] p-8 border border-ocean/5 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shrink-0">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Este é o seu futuro site de agendamentos.</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Nesta demonstração, você pode navegar pelos passeios, conferir a agenda e <strong>simular um agendamento real</strong>. Tudo o que você vê aqui é exatamente o que entregaremos no seu projeto personalizado.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/5 rounded-full blur-3xl -z-0"></div>
        </section>

        {/* Authority Section */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=800" 
                    alt="Guia em ação" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-border/50 max-w-[240px] animate-slide-up">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-coral text-coral" />)}
                  </div>
                  <p className="text-sm font-bold text-foreground leading-tight">
                    "A melhor experiência que já tive em uma viagem!"
                  </p>
                </div>
              </div>
              
              <div className="space-y-8 animate-fade-in">
                <div>
                  <span className="text-ocean font-bold tracking-widest uppercase text-xs">Excelência em cada detalhe</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-2 leading-tight">
                    Por que escolher este guia?
                  </h2>
                </div>
                
                <div className="grid gap-6">
                  {[
                    { title: "Guia Local Experiente", desc: "Nascido e criado na região, conheço cada segredo e história local." },
                    { title: "Grupos Reduzidos", desc: "Foco na qualidade e atenção personalizada, sem aglomerações." },
                    { title: "Roteiros Exclusivos", desc: "Fuja do óbvio com caminhos e vivências que você não encontra no Google." },
                    { title: "Atendimento Direto", desc: "Fale diretamente comigo em todas as etapas, do agendamento à tour." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center shrink-0 group-hover:bg-ocean group-hover:text-white transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-ocean group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Section */}
        <section id="catalog" className="py-24 bg-sand/30">
          <div className="container">
            <div className="text-center mb-16 animate-fade-in px-4">
              <span className="text-ocean font-bold tracking-widest uppercase text-xs">Catálogo de Experiências</span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-foreground mt-2 mb-4">
                Meus Roteiros e Vivências
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore as maravilhas da nossa região com segurança, conforto e histórias inesquecíveis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 px-4">
              {tours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TourCard tour={tour} onBook={handleBook} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof CTA */}
        <section className="py-20 bg-foreground text-white">
          <div className="container px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Pronto para viver uma experiência inesquecível?</h2>
              <p className="text-white/70 text-lg">Milhares de turistas já vivenciaram nossos roteiros. Reserve sua vaga hoje e garanta memórias que durarão a vida toda.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="accent-gradient h-14 px-8 rounded-xl font-bold hover:scale-105 transition-transform">
                  Ver Disponibilidade
                </Button>
                <div className="w-full sm:w-auto h-14 px-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Star className="h-5 w-5 text-coral fill-coral mr-2" />
                  <span className="font-bold uppercase tracking-wider text-xs">Avaliado em 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-16 border-t border-border/40">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center shadow-sm">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-display text-lg font-bold text-foreground">
                    {profile?.name || 'Seu Guia Profissional'}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Criando memórias inesquecíveis e revelando o melhor da nossa terra para o mundo.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
                <div className="flex gap-6 text-sm font-semibold text-foreground">
                  <Link to="/demo" className="hover:text-ocean transition-colors">Passeios</Link>
                  <a href="#about" className="hover:text-ocean transition-colors">Sobre Mim</a>
                  <a href="/" className="hover:text-ocean transition-colors">Quero um Site Assim</a>
                </div>
                <p className="text-muted-foreground text-xs">
                  © {new Date().getFullYear()} {profile?.name || 'Seu Guia'}. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <BookingModal
        tour={selectedTour}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  );
};

export default Index;
