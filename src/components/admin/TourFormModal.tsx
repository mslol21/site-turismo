import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Tour } from '@/types/database';

interface TourFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: Tour | null;
  onSuccess: () => void;
}

export function TourFormModal({ open, onOpenChange, tour, onSuccess }: TourFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    price: '',
    duration_hours: '',
    location: '',
    max_participants: '',
    is_active: true
  });
  const { user } = useAuth();

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title,
        description: tour.description || '',
        image_url: tour.image_url || '',
        price: String(tour.price),
        duration_hours: String(tour.duration_hours),
        location: tour.location || '',
        max_participants: String(tour.max_participants || 10),
        is_active: tour.is_active ?? true
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image_url: '',
        price: '',
        duration_hours: '',
        location: '',
        max_participants: '10',
        is_active: true
      });
    }
  }, [tour, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save for demo
    setTimeout(() => {
      setLoading(false);
      toast.success(tour ? 'Passeio atualizado (Modo Demo)' : 'Passeio criado (Modo Demo)');
      onSuccess();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {tour ? 'Editar Passeio' : 'Novo Passeio'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Passeio pela Cidade Histórica"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o passeio..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">URL da Imagem</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="100.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duração (horas) *</Label>
              <Input
                id="duration"
                type="number"
                step="0.5"
                min="0.5"
                required
                value={formData.duration_hours}
                onChange={(e) => setFormData({ ...formData, duration_hours: e.target.value })}
                placeholder="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Centro Histórico"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_participants">Máx. Participantes</Label>
              <Input
                id="max_participants"
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                placeholder="10"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="is_active" className="cursor-pointer">
              Passeio ativo (visível publicamente)
            </Label>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" variant="hero" className="flex-1" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : tour ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
