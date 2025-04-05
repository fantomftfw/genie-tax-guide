
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { authState, profile } = useAuth();

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
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
