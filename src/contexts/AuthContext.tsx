
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  email?: string;
};

export type AuthState = {
  user: User | null;
  session: any;
  isLoading: boolean;
};

type ProfileData = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
};

type AuthContextType = {
  authState: AuthState;
  profile: ProfileData | null;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
  });
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('profile');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        session: { user },
        isLoading: false,
      });
      
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } else {
      setAuthState({
        user: null,
        session: null,
        isLoading: false,
      });
    }
  }, []);

  // Mock authentication functions
  const signIn = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // Here we're just creating a mock user
      if (email && password) {
        const user = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          email,
        };
        
        const mockProfile = {
          id: user.id,
          full_name: email.split('@')[0],
          avatar_url: null,
          onboarding_completed: false,
        };
        
        setAuthState({
          user,
          session: { user },
          isLoading: false,
        });
        
        setProfile(mockProfile);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('profile', JSON.stringify(mockProfile));
        
        return { error: null };
      }
      
      return { error: { message: "Invalid credentials" } };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    // In a real app, this would be different from signIn
    // For this mock version, we'll use the same implementation
    return signIn(email, password);
  };

  const signOut = async () => {
    setAuthState({
      user: null,
      session: null,
      isLoading: false,
    });
    setProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    localStorage.setItem('profile', JSON.stringify(updatedProfile));
  };

  return (
    <AuthContext.Provider value={{ 
      authState, 
      profile, 
      signIn, 
      signUp, 
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
