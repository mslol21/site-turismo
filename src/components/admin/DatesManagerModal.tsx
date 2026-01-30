import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarPlus, Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TourWithDates, AvailableDate } from '@/types/database';
import { cn } from '@/lib/utils';

interface DatesManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: TourWithDates | null;
  onSuccess: () => void;
}

export function DatesManagerModal({ open, onOpenChange, tour, onSuccess }: DatesManagerModalProps) {
  const [dates, setDates] = useState<AvailableDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>();
  const [newTime, setNewTime] = useState('09:00');
  const [newSpots, setNewSpots] = useState('10');

  useEffect(() => {
    if (tour) {
      setDates(tour.available_dates);
    }
  }, [tour]);

  const loadDates = async () => {
    if (!tour) return;
    
    const { data, error } = await supabase
      .from('available_dates')
      .select('*')
      .eq('tour_id', tour.id)
      .order('date', { ascending: true });

    if (!error && data) {
      setDates(data as AvailableDate[]);
    }
  };

  const handleAddDate = async () => {
    if (!tour || !newDate) return;

    setAdding(true);
    try {
      const { error } = await supabase.from('available_dates').insert({
        tour_id: tour.id,
        date: format(newDate, 'yyyy-MM-dd'),
        start_time: newTime,
        spots_available: parseInt(newSpots)
      });

      if (error) throw error;

      toast.success('Data adicionada!');
      await loadDates();
      onSuccess();
      setNewDate(undefined);
      setNewTime('09:00');
      setNewSpots('10');
    } catch (error) {
      console.error('Error adding date:', error);
      toast.error('Erro ao adicionar data');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteDate = async (dateId: string) => {
    try {
      const { error } = await supabase
        .from('available_dates')
        .delete()
        .eq('id', dateId);

      if (error) throw error;

      setDates(dates.filter((d) => d.id !== dateId));
      onSuccess();
      toast.success('Data removida');
    } catch (error) {
      console.error('Error deleting date:', error);
      toast.error('Erro ao remover data');
    }
  };

  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Datas Disponíveis
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{tour.title}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add new date */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <CalendarPlus className="h-4 w-4 text-ocean" />
              Adicionar Data
            </h4>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {newDate ? (
                        format(newDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
                      ) : (
                        <span className="text-muted-foreground">Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newDate}
                      onSelect={setNewDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spots">Vagas</Label>
                  <Input
                    id="spots"
                    type="number"
                    min="1"
                    value={newSpots}
                    onChange={(e) => setNewSpots(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={handleAddDate}
                disabled={!newDate || adding}
                variant="hero"
              >
                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Adicionar Data'}
              </Button>
            </div>
          </div>

          {/* Existing dates */}
          <div className="space-y-3">
            <h4 className="font-semibold">Datas cadastradas</h4>
            
            {dates.length > 0 ? (
              <div className="space-y-2">
                {dates.map((date) => (
                  <div
                    key={date.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                  >
                    <div>
                      <p className="font-medium">
                        {format(new Date(date.date), "EEEE, d 'de' MMMM", { locale: ptBR })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {date.start_time.slice(0, 5)} • {date.spots_available} vagas
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteDate(date.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-muted-foreground">
                Nenhuma data cadastrada
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
