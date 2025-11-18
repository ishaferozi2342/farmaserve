import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types (tumhara types file se)
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: 'customer' | 'provider';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'customer' | 'provider') => Promise<void>;
  signup: (name: string, email: string, password: string, userType?: 'customer' | 'provider') => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, userType: 'customer' | 'provider' = 'customer'): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        userType: userType,
      };
      
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, userType: 'customer' | 'provider' = 'customer'): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Password length validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        userType: userType,
      };
      
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate cleanup/API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};