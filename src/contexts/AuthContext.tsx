
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, cpf: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updatedUser: Partial<User>) => void;
}

// Mock user data for demonstration purposes
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as const,
    avatarUrl: '',
    phone: '(41) 98765-4321',
    cpf: '123.456.789-00',
    birthDate: '1980-01-01',
    address: 'Rua Principal, 123 - Curitiba, PR',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'maria@example.com',
    role: 'patient' as const,
    phone: '(41) 91234-5678',
    cpf: '987.654.321-00',
    birthDate: '1990-05-15',
    address: 'Av Cândido de Abreu, 456 - Curitiba, PR',
    createdAt: new Date().toISOString()
  }
];

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const loadSession = () => {
      try {
        const sessionData = localStorage.getItem('user');
        if (sessionData) {
          setUser(JSON.parse(sessionData));
        }
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to simulate API call
    setTimeout(loadSession, 1000);
  }, []);

  // Simulated login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error('Credenciais inválidas');
      }
      
      // In a real app, we would validate the password here
      // For now, any password is accepted for the demo

      // Set user in state and localStorage
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Bem-vindo(a), ${foundUser.name}!`);
    } catch (error) {
      console.error('Login failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Falha ao fazer login';
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated register function
  const register = async (name: string, email: string, password: string, cpf: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Este e-mail já está cadastrado');
      }
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        cpf,
        role: 'patient',
        createdAt: new Date().toISOString()
      };
      
      // In a real app, we would save the user to a database
      mockUsers.push(newUser);
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMsg = error instanceof Error ? error.message : 'Falha ao criar conta';
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Você saiu do sistema');
  };

  const updateUserProfile = (updatedUser: Partial<User>) => {
    if (user) {
      const newUserData = { ...user, ...updatedUser };
      setUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));
      toast.success('Perfil atualizado com sucesso!');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
