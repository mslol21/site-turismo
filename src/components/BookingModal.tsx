import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, Clock, MapPin, Users, X, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TourWithDates, AvailableDate } from '@/types/database';

interface BookingModalProps {
  tour: TourWithDates | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ tour, open, onOpenChange }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<AvailableDate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: '1',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour || !selectedDate) return;

    setLoading(true);
    // Simulate API call for demo
    setTimeout(() => {
      toast.success('Agendamento enviado com sucesso. O guia entrará em contato.');
      onOpenChange(false);
      setFormData({ name: '', email: '', phone: '', participants: '1', notes: '' });
      setSelectedDate(null);
      setLoading(false);
    }, 1000);
  };

  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Agendar Passeio</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tour info */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
            <h3 className="font-display font-bold text-lg">{tour.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-ocean" />
                <span>{Number(tour.duration_hours)}h</span>
              </div>
              {tour.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-ocean" />
                  <span>{tour.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-coral font-semibold">
                R$ {Number(tour.price).toFixed(0)} por pessoa
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date selection */}
            <div className="space-y-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-ocean" />
                Data e Horário
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {tour.available_dates?.map((date) => (
                  <button
                    key={date.id}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group/btn ${
                      selectedDate?.id === date.id
                        ? 'border-ocean bg-ocean-light/50 ring-4 ring-ocean/5'
                        : 'border-border/50 hover:border-ocean/30 hover:bg-ocean-light/20'
                    }`}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold uppercase tracking-tight ${selectedDate?.id === date.id ? 'text-ocean' : 'text-foreground/80'}`}>
                          {format(new Date(date.date), "d 'de' MMMM", { locale: ptBR })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Início às {date.start_time.slice(0, 5)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-black px-2 py-1 rounded-full uppercase ${selectedDate?.id === date.id ? 'bg-ocean text-white' : 'bg-muted text-muted-foreground'}`}>
                          {date.spots_available} vagas
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal info */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="participants" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-ocean" />
                  Participantes
                </Label>
                <Select
                  value={formData.participants}
                  onValueChange={(value) => setFormData({ ...formData, participants: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} {n === 1 ? 'pessoa' : 'pessoas'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Alguma informação adicional..."
                  rows={3}
                />
              </div>
            </div>

            {/* Total */}
            {selectedDate && (
              <div className="bg-ocean-light rounded-xl p-4 flex justify-between items-center">
                <span className="font-medium">Total estimado:</span>
                <span className="text-2xl font-display font-bold text-ocean">
                  R$ {(Number(tour.price) * parseInt(formData.participants)).toFixed(0)}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full hero-gradient h-14 text-lg rounded-xl shadow-md hover:scale-[1.02] transition-transform"
                disabled={!selectedDate || loading}
              >
                {loading ? 'Enviando...' : 'Solicitar agendamento'}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium bg-sand py-2 rounded-lg">
                <CheckCircle2 className="h-3.5 w-3.5 text-ocean" />
                Este pedido será registrado normalmente no painel do guia
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
