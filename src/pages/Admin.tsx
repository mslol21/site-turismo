import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  ClipboardList, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ToursManager } from '@/components/admin/ToursManager';
import { BookingsManager } from '@/components/admin/BookingsManager';
import { ProfileManager } from '@/components/admin/ProfileManager';

type Tab = 'tours' | 'bookings' | 'profile';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('tours');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const tabs = [
    { id: 'tours' as Tab, label: 'Meus Passeios', icon: Map },
    { id: 'bookings' as Tab, label: 'Agenda de Pedidos', icon: ClipboardList },
    { id: 'profile' as Tab, label: 'Meu Perfil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.png" alt="GuiaTur Logo" className="h-10 w-auto" />
            </div>
            <button
              className="lg:hidden text-muted-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-3 px-4 truncate font-medium">
              Conectado como {user.email}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da conta
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center px-4 lg:px-6">
          <button
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-display text-xl font-bold ml-2 lg:ml-0 text-foreground">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-sand/30">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'tours' && <ToursManager />}
            {activeTab === 'bookings' && <BookingsManager />}
            {activeTab === 'profile' && <ProfileManager />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
