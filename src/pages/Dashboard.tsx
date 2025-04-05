
import { TaxSummaryCard } from "@/components/TaxSummaryCard";
import { RegimeComparison } from "@/components/RegimeComparison";
import { TaxSavingCard } from "@/components/TaxSavingCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ArrowRight, FileText, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  // Mock data
  const currentUser = { name: "Jay" };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your tax situation for FY 2024-25
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TaxSummaryCard 
          title="Total Income"
          amount={1200000}
          previousAmount={1100000}
          percentChange={9.1}
          variant="income"
        />
        <TaxSummaryCard 
          title="Tax Liability"
          amount={124800}
          previousAmount={110000}
          percentChange={13.45}
          variant="expense"
        />
        <TaxSummaryCard 
          title="Potential Savings"
          amount={52000}
          variant="saving"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tax Filing Status</h2>
          <Card className="p-6">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">FY 2024-25</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                  In Progress
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Due: July 31, 2025</p>
            </div>
            
            <div className="my-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Information Completion</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm">Personal Information</span>
                </div>
                <span className="text-sm text-green-600">Complete</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm">Income Details</span>
                </div>
                <span className="text-sm text-green-600">Complete</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <span className="text-sm">Deductions & Exemptions</span>
                </div>
                <span className="text-sm text-amber-600">In Progress</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
                  </div>
                  <span className="text-sm">Documents Verification</span>
                </div>
                <span className="text-sm text-muted-foreground">Not Started</span>
              </div>
            </div>
            
            <Button className="w-full mt-6" variant="secondary">
              Continue Filing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Tax Regime Comparison</h2>
          <RegimeComparison 
            oldRegimeTax={124800}
            newRegimeTax={156000}
            savings={31200}
            recommendedRegime="old"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tax Saving Opportunities</h2>
          <Button variant="ghost" size="sm" className="text-tax-primary">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaxSavingCard
            title="ELSS Investment"
            description="Invest in Equity Linked Saving Schemes for tax benefits"
            section="Section 80C"
            maxAmount={150000}
            usedAmount={80000}
            potentialSaving={21000}
            onClick={() => {}}
          />
          
          <TaxSavingCard
            title="NPS Contribution"
            description="Additional tax benefit beyond 80C limit"
            section="Section 80CCD(1B)"
            maxAmount={50000}
            usedAmount={0}
            potentialSaving={15000}
            onClick={() => {}}
          />
          
          <Card className="flex flex-col items-center justify-center p-6 border-dashed bg-tax-lightgray/50">
            <Button variant="outline" className="h-auto p-3 rounded-full mb-3">
              <PlusCircle className="h-5 w-5" />
            </Button>
            <h3 className="font-medium text-base mb-1">Explore More</h3>
            <p className="text-sm text-muted-foreground text-center">
              Discover more tax saving opportunities based on your profile
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
