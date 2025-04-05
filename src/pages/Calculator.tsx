
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RegimeComparison } from "@/components/RegimeComparison";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("income");
  const [formData, setFormData] = useState({
    basic: "",
    hra: "",
    special: "",
    lta: "",
    other: "",
    epf: "",
    professionalTax: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    if (activeTab === "income") {
      setActiveTab("deductions");
    } else if (activeTab === "deductions") {
      setActiveTab("result");
    }
  };

  const handleBack = () => {
    if (activeTab === "deductions") {
      setActiveTab("income");
    } else if (activeTab === "result") {
      setActiveTab("deductions");
    }
  };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Tax Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your tax liability under both old and new tax regimes
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader className="border-b">
          <CardTitle>FY 2024-25 Tax Calculation</CardTitle>
          <CardDescription>
            Enter your income and deduction details to calculate your tax
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="income">Income Details</TabsTrigger>
              <TabsTrigger value="deductions">Deductions</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <TabsContent value="income" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic">Basic Salary</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="basic" 
                        name="basic" 
                        placeholder="600,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.basic}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hra">HRA</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="hra" 
                        name="hra" 
                        placeholder="240,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.hra}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="special">Special Allowance</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="special" 
                        name="special" 
                        placeholder="300,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.special}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lta">LTA</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="lta" 
                        name="lta" 
                        placeholder="50,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.lta}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="epf">EPF Contribution (12% of Basic)</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="epf" 
                        name="epf" 
                        placeholder="72,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.epf}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="professionalTax">Professional Tax</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="professionalTax" 
                        name="professionalTax" 
                        placeholder="2,400" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.professionalTax}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="other">Other Income (Interest, etc.)</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="other" 
                        name="other" 
                        placeholder="10,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        value={formData.other}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deductions" className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Section 80C (Limit: ₹1,50,000)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="epf80c">EPF Contribution</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="epf80c" 
                        placeholder="72,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                        readOnly
                        defaultValue="72,000"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="elss">ELSS Investment</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="elss" 
                        placeholder="50,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insurance">Life Insurance Premium</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="insurance" 
                        placeholder="25,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tuition">Tuition Fees</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="tuition" 
                        placeholder="0" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium pt-2">Section 80D (Health Insurance)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="selfHealth">Self & Family</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="selfHealth" 
                        placeholder="25,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="parentsHealth">Parents</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="parentsHealth" 
                        placeholder="0" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium pt-2">Other Deductions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeLoan">Home Loan Interest (Sec 24b)</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="homeLoan" 
                        placeholder="200,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nps">NPS Contribution (Sec 80CCD(1B))</Label>
                    <div className="input-field flex">
                      <span className="text-muted-foreground mr-2">₹</span>
                      <Input 
                        id="nps" 
                        placeholder="50,000" 
                        className="border-0 p-0 focus-visible:ring-0" 
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="result">
              <div className="space-y-6">
                <div className="bg-tax-lightgray rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-y-2">
                    <p className="text-sm">Gross Total Income:</p>
                    <p className="text-sm font-medium text-right">₹ 1,200,000</p>
                    
                    <p className="text-sm">Total Deductions:</p>
                    <p className="text-sm font-medium text-right">₹ 424,000</p>
                    
                    <p className="text-sm">Taxable Income:</p>
                    <p className="text-sm font-medium text-right">₹ 776,000</p>
                    
                    <div className="col-span-2 border-t my-2"></div>
                    
                    <p className="text-sm font-medium">Tax (Old Regime):</p>
                    <p className="text-sm font-medium text-right">₹ 67,600</p>
                    
                    <p className="text-sm">Cess (4%):</p>
                    <p className="text-sm text-right">₹ 2,704</p>
                    
                    <p className="text-sm font-medium">Total Tax:</p>
                    <p className="text-sm font-medium text-right">₹ 70,304</p>
                    
                    <p className="text-sm">TDS Deducted:</p>
                    <p className="text-sm text-right">₹ 60,000</p>
                    
                    <div className="col-span-2 border-t my-2"></div>
                    
                    <p className="text-sm font-bold">Remaining Tax Payable:</p>
                    <p className="text-sm font-bold text-right">₹ 10,304</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <RegimeComparison
                    oldRegimeTax={70304}
                    newRegimeTax={102000}
                    savings={31696}
                    recommendedRegime="old"
                  />
                </div>
                
                <div className="mt-6 p-4 bg-tax-light rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-accent w-8 h-8 flex items-center justify-center text-white text-sm mt-1">
                      <span>💡</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Tax Savings Opportunities</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You can save an additional ₹ 8,400 by maxing out your 80C deductions. Consider investing the remaining ₹ 3,000 in PPF or ELSS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-6">
            {activeTab !== "income" && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeTab !== "result" ? (
              <Button className="ml-auto" onClick={handleNext}>
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button className="ml-auto">
                Download Report
              </Button>
            )}
          </CardFooter>
        </Tabs>
      </Card>
    </DashboardLayout>
  );
}
