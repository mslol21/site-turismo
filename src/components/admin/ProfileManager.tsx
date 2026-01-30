import { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Profile } from '@/types/database';

export function ProfileManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<Partial<Profile>>({
    name: 'Ricardo Mendes',
    bio: 'Especialista em roteiros exclusivos e experiências autênticas. Transformo sua viagem em uma jornada inesquecível pelos tesouros escondidos da nossa região.',
    photo_url: '',
    phone: '(21) 98765-4321',
    email: 'admin@guiatur.com',
    location: 'Rio de Janeiro, RJ',
    languages: ['Português', 'Inglês', 'Espanhol']
  });
  const [languagesInput, setLanguagesInput] = useState('Português, Inglês, Espanhol');
  const { user } = useAuth();

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const loadProfile = async () => {
    // In demo mode, we strictly use the fallback data
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save for demo
    setTimeout(() => {
      setSaving(false);
      toast.success('Perfil atualizado (Modo Demo)');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display">Seu Perfil Público</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo preview */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center text-3xl">
                {profileData.photo_url ? (
                  <img
                    src={profileData.photo_url}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>👤</span>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="photo_url">URL da Foto</Label>
                <Input
                  id="photo_url"
                  type="url"
                  value={profileData.photo_url || ''}
                  onChange={(e) => setProfileData({ ...profileData, photo_url: e.target.value })}
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  required
                  value={profileData.name || ''}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Sobre você</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio || ''}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Conte um pouco sobre sua experiência como guia..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail de contato</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email || ''}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="contato@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone || ''}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={profileData.location || ''}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  placeholder="Ex: Rio de Janeiro, RJ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Idiomas (separados por vírgula)</Label>
                <Input
                  id="languages"
                  value={languagesInput}
                  onChange={(e) => setLanguagesInput(e.target.value)}
                  placeholder="Português, Inglês, Espanhol"
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
