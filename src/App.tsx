
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

type User = {
  id: string;
  email?: string;
} | null;

export type AuthState = {
  user: User;
  session: any;
  isLoading: boolean;
};

const App = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
  });
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          isLoading: false,
        });

        // If user is logged in, fetch their profile
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        isLoading: false,
      });

      // If user is logged in, fetch their profile
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
    if (authState.isLoading) {
      // Show loading state
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      );
    }

    if (!authState.user) {
      return <Navigate to="/auth" replace />;
    }

    // If user hasn't completed onboarding, redirect to onboarding
    if (profile && !profile.onboarding_completed) {
      return <Navigate to="/onboarding" replace />;
    }

    return <>{children}</>;
  };

  const UnAuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
    if (authState.isLoading) {
      // Show loading state
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      );
    }

    if (authState.user) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Authenticated routes */}
            <Route path="/" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
            <Route path="/calculator" element={<AuthenticatedRoute><Calculator /></AuthenticatedRoute>} />
            <Route path="/documents" element={<AuthenticatedRoute><Documents /></AuthenticatedRoute>} />
            <Route path="/onboarding" element={<AuthenticatedRoute><Onboarding /></AuthenticatedRoute>} />

            {/* Unauthenticated routes */}
            <Route path="/auth" element={<UnAuthenticatedRoute><Auth /></UnAuthenticatedRoute>} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
