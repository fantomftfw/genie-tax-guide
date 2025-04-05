
import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="w-64 fixed left-0 top-16 bottom-0 hidden md:block border-r bg-background overflow-y-auto">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1 md:pl-64 pt-6 pb-12 px-4 md:px-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
