import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight, Upload, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  
  const completeOnboarding = async () => {
    setLoading(true);
    try {
      await updateProfile({ onboarding_completed: true });
      
      toast({
        title: "Welcome to TaxGenie!",
        description: "You're all set to start saving time on your taxes.",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">Upload instead of typing</h1>
              <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
                TaxGenie can automatically extract tax information from your documents 
                so you don't have to enter data manually.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Form 16</h3>
                    <p className="text-sm text-muted-foreground">We extract all tax details automatically</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Salary Slips</h3>
                    <p className="text-sm text-muted-foreground">Monthly income details are captured instantly</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Investment Proofs</h3>
                    <p className="text-sm text-muted-foreground">We detect eligible tax savings automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">Upload your first document</h1>
              <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
                Start by uploading your Form 16 or any salary slip to immediately
                see how much tax you can save.
              </p>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-8 bg-card/50 cursor-pointer hover:bg-card/80 transition-colors">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium">Drag & drop your document here</h3>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
                <Button variant="outline" className="mt-2">
                  Choose file
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              You can also do this later from your dashboard
            </p>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">You're all set!</h1>
              <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
                Welcome to TaxGenie. We're here to make tax filing simple
                and help you maximize your savings.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">What you can do now:</h3>
              
              <div className="flex flex-col gap-3">
                <div className="border border-border rounded-lg p-4 bg-card flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Upload className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Upload tax documents</h3>
                    <p className="text-sm text-muted-foreground">Let us extract and organize your tax data</p>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4 bg-card flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">View tax insights</h3>
                    <p className="text-sm text-muted-foreground">See personalized recommendations to save taxes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 flex flex-col justify-center min-h-screen">
        <div className="bg-background/70 backdrop-blur-lg w-full max-w-md mx-auto rounded-2xl shadow-lg p-6 sm:p-8 border border-border/40">
          {/* Progress bar */}
          <div className="mb-8">
            <Progress value={(step / 3) * 100} className="h-1.5" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Welcome</span>
              <span>Upload</span>
              <span>Done</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="my-6">
            {getStepContent()}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8 gap-4">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={loading}
              >
                Back
              </Button>
            ) : (
              <div></div> 
            )}
            
            <Button
              onClick={() => {
                if (step === 3) {
                  completeOnboarding();
                } else {
                  setStep(step + 1);
                }
              }}
              disabled={loading}
              className="flex-1"
            >
              {step === 3 
                ? (loading ? 'Finishing...' : 'Go to Dashboard')
                : 'Continue'}
              {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
