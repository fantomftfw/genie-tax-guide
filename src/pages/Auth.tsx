
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Lock, Mail, User } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    checkUser();

    // Setup auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Welcome to TaxGenie! Please verify your email if required.",
      });
      
      // Navigate to next step or home based on whether email confirmation is required
      if (data.user && !data.user.email_confirmed_at) {
        setStep(4); // Email verification step
      } else {
        navigate("/onboarding");
      }
      
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Auth state change listener will handle navigation
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 w-full max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Welcome to TaxGenie</h1>
              <p className="text-muted-foreground mt-2">
                Say goodbye to manual tax calculations
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-12 text-base gap-3 bg-accent"
              >
                Create an account
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => { setIsSignUp(false); setStep(3); }}
                className="w-full h-12 text-base"
              >
                I already have an account
              </Button>
            </div>
          </div>
        );
        
      case 2: // Sign up form
        return (
          <form onSubmit={handleSignUp} className="space-y-4 w-full max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="text-muted-foreground mt-2">
                Join thousands saving time on taxes
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="pl-11 h-12"
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="pl-11 h-12"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="pl-11 h-12"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base bg-accent"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
            
            <p className="text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setStep(3); }}
                className="text-accent hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        );
        
      case 3: // Sign in form
        return (
          <form onSubmit={handleSignIn} className="space-y-4 w-full max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your account
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="pl-11 h-12"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="pl-11 h-12"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base bg-accent"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setStep(2); }}
                className="text-accent hover:underline"
              >
                Create one
              </button>
            </p>
          </form>
        );
        
      case 4: // Email verification
        return (
          <div className="space-y-6 w-full max-w-sm mx-auto text-center">
            <div className="mx-auto bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">Check your inbox</h1>
              <p className="text-muted-foreground mt-2">
                We've sent a verification link to {email}
              </p>
            </div>
            
            <Button 
              onClick={() => setStep(3)}
              variant="outline" 
              className="w-full h-12 text-base"
            >
              Back to sign in
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background to-accent/5">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary"></div>
      
      {/* Floating blobs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container relative z-10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 flex flex-col justify-center min-h-screen">
        <div className="bg-background/70 backdrop-blur-lg w-full max-w-md mx-auto rounded-2xl shadow-lg p-6 sm:p-8 border border-border/40">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
