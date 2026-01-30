import { Clock, MapPin, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TourWithDates } from '@/types/database';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TourCardProps {
  tour: TourWithDates;
  onBook: (tour: TourWithDates) => void;
}

export function TourCard({ tour, onBook }: TourCardProps) {
  const nextDate = tour.available_dates?.[0];
  const hasAvailability = tour.available_dates && tour.available_dates.length > 0;

  return (
    <Card className="group flex flex-col h-full overflow-hidden bg-card border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 rounded-[32px]">
      <div className="relative aspect-[4/5] overflow-hidden">
        {tour.image_url ? (
          <img
            src={tour.image_url}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ocean-light to-forest-light flex items-center justify-center">
            <MapPin className="h-12 w-12 text-ocean/40" />
          </div>
        )}
        
        {/* Overlay gradiente inferior para leitura de texto se necessário */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
            <Star className="h-3.5 w-3.5 text-coral fill-coral" />
            <span className="text-xs font-black text-foreground">5.0</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-ocean/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
            <span className="text-white font-black text-lg">
              R$ {Number(tour.price).toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-display text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-ocean transition-colors line-clamp-2">
            {tour.title}
          </h3>
          
          {tour.description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">
              {tour.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">
            <div className="flex items-center gap-2 bg-secondary/80 px-3 py-2 rounded-xl">
              <Clock className="h-3.5 w-3.5 text-ocean" />
              <span>{Number(tour.duration_hours)}h</span>
            </div>
            {tour.max_participants && (
              <div className="flex items-center gap-2 bg-secondary/80 px-3 py-2 rounded-xl">
                <Users className="h-3.5 w-3.5 text-ocean" />
                <span>Até {tour.max_participants}</span>
              </div>
            )}
          </div>
        </div>

        {nextDate && (
          <div className="pt-4 mt-auto border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Próxima Saída</span>
                <span className="text-sm font-bold text-foreground">
                  {format(new Date(nextDate.date), "d 'de' MMM", { locale: ptBR })}
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onBook(tour)} 
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-all active:scale-95 hero-gradient border-none"
          disabled={!hasAvailability}
        >
          {hasAvailability ? 'Reservar Agora' : 'Esgotado'}
        </Button>
      </CardFooter>
    </Card>
  );
}
