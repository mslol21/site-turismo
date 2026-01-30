import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, X, Loader2, Mail, Phone, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface BookingWithDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  participants: number;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  tour: { title: string };
  available_date: { date: string; start_time: string };
}

export function BookingsManager() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) loadBookings();
  }, [user]);

  const loadBookings = async () => {
    // In demo mode, we don't load from Supabase
    // setBookings([]); // Original line
    // Mock data for bookings
    setBookings([
      {
        id: 'mock-booking-1',
        customer_name: 'Ana Silva',
        customer_email: 'ana.silva@example.com',
        customer_phone: '5511987654321',
        participants: 2,
        notes: 'Preferimos um guia que fale inglês, se possível.',
        status: 'pending',
        created_at: new Date().toISOString(),
        tour: { title: 'Passeio Histórico pelo Centro' },
        available_date: { date: '2024-07-20', start_time: '10:00:00' },
      },
      {
        id: 'mock-booking-2',
        customer_name: 'Bruno Costa',
        customer_email: 'bruno.costa@example.com',
        customer_phone: null,
        participants: 1,
        notes: null,
        status: 'confirmed',
        created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        tour: { title: 'Trilha Ecológica na Floresta' },
        available_date: { date: '2024-07-25', start_time: '08:30:00' },
      },
      {
        id: 'mock-booking-3',
        customer_name: 'Carla Dias',
        customer_email: 'carla.dias@example.com',
        customer_phone: '5521912345678',
        participants: 4,
        notes: 'Somos uma família com duas crianças pequenas (5 e 7 anos).',
        status: 'pending',
        created_at: new Date(Date.now() - 172800000).toISOString(), // Two days ago
        tour: { title: 'Tour Gastronômico Local' },
        available_date: { date: '2024-08-01', start_time: '19:00:00' },
      },
    ]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      // In demo mode, we simulate the update
      // const { error } = await supabase
      //   .from('bookings')
      //   .update({ status })
      //   .eq('id', id);

      // if (error) throw error;

      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
      toast.success(status === 'confirmed' ? 'Agendamento confirmado!' : 'Agendamento recusado');
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Erro ao atualizar agendamento');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-forest text-forest-foreground">Confirmado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Recusado</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
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
      <div>
        <h2 className="text-xl font-bold text-foreground">Pedidos de Agendamento</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie os pedidos recebidos através do seu site
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="shadow-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Main info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-lg">
                          {booking.customer_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.tour.title}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-ocean" />
                        <span>
                          {format(new Date(booking.available_date.date), "d 'de' MMM", { locale: ptBR })}
                          {' '}às {booking.available_date.start_time.slice(0, 5)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-ocean" />
                        <span>{booking.participants} pessoa{booking.participants > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 text-ocean" />
                        <span className="truncate">{booking.customer_email}</span>
                      </div>
                      {booking.customer_phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 text-ocean" />
                          <span>{booking.customer_phone}</span>
                        </div>
                      )}
                    </div>

                    {booking.notes && (
                      <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">
                        <strong>Obs:</strong> {booking.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {booking.status === 'pending' && (
                    <div className="flex gap-2 lg:flex-col">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="flex-1 lg:flex-none"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 lg:flex-none text-destructive hover:text-destructive"
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 text-foreground">
              Nenhum pedido recebido
            </h3>
            <p className="text-muted-foreground">
              Os agendamentos solicitados pelos turistas aparecerão nesta lista.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
