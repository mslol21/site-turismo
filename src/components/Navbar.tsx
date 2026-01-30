import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="GuiaTur Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/demo" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Passeios
            </Link>
            {user ? (
              <Button onClick={() => navigate('/admin')} variant="default" size="sm" className="hero-gradient rounded-xl px-6">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Área do Guia
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="outline" size="sm" className="rounded-xl px-6 border-2">
                <LogIn className="h-4 w-4 mr-2" />
                Área do Guia
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Passeios
              </Link>
              {user ? (
                <Button
                  onClick={() => {
                    navigate('/admin');
                    setIsOpen(false);
                  }}
                  variant="default"
                  className="mx-4"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Painel
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="mx-4"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Área do Guia
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
