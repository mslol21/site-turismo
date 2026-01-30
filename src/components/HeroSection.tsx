import { MapPin, Star, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/database';

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1920" 
          alt="Natureza e Viagem" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Profile photo */}
          <div className="relative shrink-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[40px] overflow-hidden border-4 border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 animate-scale-in">
              <img
                src={profile?.photo_url || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"}
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-coral rounded-2xl p-4 shadow-xl border-2 border-white animate-bounce-slow">
              <Star className="h-6 w-6 text-white fill-current" />
            </div>
          </div>

          {/* Profile info */}
          <div className="text-center md:text-left text-white animate-slide-up space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest">
              <MapPin className="h-4 w-4 text-coral" />
              {profile?.location || 'Explorando o Paraíso'}
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              {profile?.name || 'Ricardo Mendes'}
              <span className="block text-2xl md:text-3xl font-medium mt-4 text-white/80 tracking-normal font-sans">
                Descubra o extraordinário ao meu lado.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-medium">
              {profile?.bio || 'Especialista em roteiros exclusivos e experiências autênticas. Transformo sua viagem em uma jornada inesquecível pelos tesouros escondidos da nossa região.'}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
              <Button size="lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="h-16 px-10 rounded-2xl bg-white text-foreground hover:bg-white/90 font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95">
                Ver Experiências
              </Button>
              
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-black/20 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center text-xs font-bold uppercase tracking-wider text-white/60">
                <span>+500 Turistas</span>
                <span className="text-white">Encantados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}
