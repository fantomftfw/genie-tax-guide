
import { useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Calculator, 
  UploadCloud, 
  Lightbulb,
  Settings, 
  HelpCircle,
  User,
  Wallet,
  BookOpen,
  LineChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  collapsed?: boolean;
}

function SidebarItem({ icon, title, path, collapsed }: SidebarItemProps) {
  return collapsed ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={path}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center h-10 w-10 rounded-lg transition-all",
                isActive 
                  ? "bg-accent/20 text-accent" 
                  : "text-muted-foreground hover:bg-muted hover:text-accent"
              )
            }
          >
            {icon}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          isActive 
            ? "bg-accent/20 text-accent" 
            : "text-muted-foreground hover:bg-muted hover:text-accent"
        )
      }
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
}

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();
  
  return (
    <div className={cn("flex h-full flex-col gap-2 p-2", collapsed && "items-center")}>
      {!collapsed && (
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">TaxGenie</h2>
          <div className="mb-8 px-4">
            <div className="relative h-2 rounded-full bg-muted overflow-hidden mb-1">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: "35%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">35% profile complete</p>
          </div>
        </div>
      )}
      
      {collapsed && <div className="h-16"></div>}
      
      <div className={cn("space-y-1", collapsed ? "px-0" : "px-3")}>
        <SidebarItem icon={<Home size={20} />} title="Dashboard" path="/" collapsed={collapsed} />
        <SidebarItem icon={<User size={20} />} title="Profile" path="/profile" collapsed={collapsed} />
        <SidebarItem icon={<UploadCloud size={20} />} title="Upload Docs" path="/documents" collapsed={collapsed} />
        <SidebarItem icon={<Calculator size={20} />} title="Tax Calculator" path="/calculator" collapsed={collapsed} />
        <SidebarItem icon={<LineChart size={20} />} title="Tax Insights" path="/insights" collapsed={collapsed} />
        <SidebarItem icon={<Wallet size={20} />} title="Tax Savings" path="/savings" collapsed={collapsed} />
        <SidebarItem icon={<BookOpen size={20} />} title="Tax Guide" path="/guide" collapsed={collapsed} />
      </div>
      
      <div className={cn("mt-auto", collapsed ? "px-0" : "px-3 py-2")}>
        <div className={cn("space-y-1", collapsed ? "px-0" : "")}>
          <SidebarItem icon={<Settings size={20} />} title="Settings" path="/settings" collapsed={collapsed} />
          <SidebarItem icon={<HelpCircle size={20} />} title="Help & Support" path="/help" collapsed={collapsed} />
        </div>
        
        {!collapsed && (
          <div className="mt-6 px-4 py-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Pro Tip</p>
                <p className="text-xs text-muted-foreground">Upload Form 16 to automatically calculate tax</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
