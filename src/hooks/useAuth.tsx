import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Mock User and Session types to avoid breaking imports
interface MockUser {
  id: string;
  email?: string;
  user_metadata: {
    name?: string;
  };
}

interface MockSession {
  user: MockUser;
}

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static Mock User for Demo
const MOCK_USER: MockUser = {
  id: 'demo-user-id',
  email: 'admin@guiatur.com',
  user_metadata: {
    name: 'Guia de Demonstração'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent mock session
    const savedUser = localStorage.getItem('demo_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setSession({ user: parsedUser });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Standard mock credentials
    if (email === 'admin@guiatur.com' && password === 'senha123') {
      setUser(MOCK_USER);
      setSession({ user: MOCK_USER });
      localStorage.setItem('demo_user', JSON.stringify(MOCK_USER));
      return { error: null };
    }
    return { error: new Error('Credenciais de demonstração incorretas. Use admin@guiatur.com / senha123') };
  };

  const signUp = async (email: string, password: string, name: string) => {
    // In demo mode, sign up just logs you in with the provided name
    const newUser = { ...MOCK_USER, email, user_metadata: { name } };
    setUser(newUser);
    setSession({ user: newUser });
    localStorage.setItem('demo_user', JSON.stringify(newUser));
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
