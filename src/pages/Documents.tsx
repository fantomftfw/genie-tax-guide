
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploadCard } from "@/components/FileUploadCard";
import { Eye, Download, Trash2, FileText } from "lucide-react";

export default function Documents() {
  // Mock data for uploaded documents
  const documents = [
    {
      id: 1,
      name: "Form 16 (2023-24).pdf",
      type: "Form 16",
      date: "May 15, 2024",
      size: "1.2 MB"
    },
    {
      id: 2,
      name: "Salary Slip - March 2024.pdf",
      type: "Salary Slip",
      date: "Apr 5, 2024",
      size: "842 KB"
    },
    {
      id: 3,
      name: "Health Insurance Premium Receipt.pdf",
      type: "Insurance",
      date: "Jan 18, 2024",
      size: "546 KB"
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Document Vault</h1>
        <p className="text-muted-foreground">
          Securely store and manage all your tax-related documents
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <div className="border-b pb-2">
          <TabsList className="w-auto">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="income">Income Proof</TabsTrigger>
            <TabsTrigger value="investment">Investments</TabsTrigger>
            <TabsTrigger value="deduction">Deductions</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FileUploadCard
              title="Upload Documents"
              description="Drag and drop your documents or click to browse"
            />
            
            <FileUploadCard
              title="Scan a Document"
              description="Use your camera to capture documents"
            />
            
            <Card className="flex flex-col justify-center border-dashed p-6">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tax-light mb-4">
                  <FileText className="h-6 w-6 text-tax-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Auto-Extract</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Extract data automatically from your documents
                </p>
                <Button>Extract Document Data</Button>
              </div>
            </Card>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Date Added</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Size</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-t">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                        {doc.type}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                        {doc.date}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                        {doc.size}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="pt-6">
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Income Documents</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your Form 16, salary slips, and other income proofs
            </p>
            <Button>Upload Income Documents</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="investment" className="pt-6">
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Investment Documents</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your investment proofs like PPF, ELSS, etc.
            </p>
            <Button>Upload Investment Documents</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="deduction" className="pt-6">
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Deduction Documents</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your housing loan, medical bills, etc.
            </p>
            <Button>Upload Deduction Documents</Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
