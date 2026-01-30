import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Tour, TourWithDates } from '@/types/database';
import { TourFormModal } from './TourFormModal';
import { DatesManagerModal } from './DatesManagerModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Mock data for demo mode
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
  }
];

export function ToursManager() {
  const [toursList, setToursList] = useState<TourWithDates[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [selectedTour, setSelectedTour] = useState<TourWithDates | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) loadTours();
  }, [user]);

  const loadTours = async () => {
    // In demo mode, we strictly use the fallback data
    setToursList(DEMO_TOURS);
    setLoading(false);
  };

  const handleDelete = async () => {
    toast.success('Passeio excluído (Modo Demo)');
    setDeleteId(null);
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormOpen(true);
  };

  const handleManageDates = (tour: TourWithDates) => {
    setSelectedTour(tour);
    setDatesOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Seus Passeios</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie seus passeios e datas disponíveis
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} variant="hero">
          <Plus className="h-4 w-4 mr-2" />
          Novo Passeio
        </Button>
      </div>

      {/* Tours list */}
      {toursList.length > 0 ? (
        <div className="grid gap-4">
          {toursList.map((tour) => (
            <Card key={tour.id} className="shadow-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {tour.image_url ? (
                      <img
                        src={tour.image_url}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        📷
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-lg truncate">
                        {tour.title}
                      </h3>
                      <Badge variant={tour.is_active ? 'default' : 'secondary'}>
                        {tour.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    
                    {tour.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {tour.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="font-semibold text-coral">
                        R$ {Number(tour.price).toFixed(0)}
                      </span>
                      <span className="text-muted-foreground">
                        {Number(tour.duration_hours)}h de duração
                      </span>
                      <span className="text-muted-foreground">
                        {tour.available_dates.length} datas disponíveis
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageDates(tour)}
                    >
                      <Calendar className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Datas</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(tour)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(tour.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl">🗺️</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Nenhum passeio cadastrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Comece adicionando seu primeiro passeio
            </p>
            <Button onClick={() => setFormOpen(true)} variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Criar Passeio
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <TourFormModal
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingTour(null);
        }}
        tour={editingTour}
        onSuccess={() => {
          loadTours();
          setFormOpen(false);
          setEditingTour(null);
        }}
      />

      <DatesManagerModal
        open={datesOpen}
        onOpenChange={setDatesOpen}
        tour={selectedTour}
        onSuccess={loadTours}
      />

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir passeio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as datas e reservas associadas serão removidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
