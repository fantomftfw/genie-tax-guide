
import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop sidebar */}
        <aside 
          className={cn(
            "hidden md:block fixed left-0 top-16 bottom-0 bg-background border-r shadow-sm z-20 transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          <div className="h-full relative">
            <Sidebar collapsed={sidebarCollapsed} />
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-background border shadow-sm flex items-center justify-center"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-3 w-3" />
              ) : (
                <ChevronLeft className="h-3 w-3" />
              )}
            </Button>
          </div>
        </aside>
        
        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 z-30"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="md:hidden fixed left-0 top-16 bottom-0 w-64 bg-background border-r shadow-lg z-40"
              >
                <Sidebar collapsed={false} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300 pt-16 pb-12 px-4 animate-fade-in overflow-y-auto",
            !isMobile && (sidebarCollapsed ? "md:pl-16" : "md:pl-64"),
            "md:px-8"
          )}
        >
          <div className="w-full max-w-7xl mx-auto py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
