
import { 
  Home, 
  FileText, 
  Calculator, 
  UploadCloud, 
  Lightbulb,
  Settings, 
  HelpCircle,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
}

function SidebarItem({ icon, title, path }: SidebarItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          isActive 
            ? "bg-tax-light text-tax-primary" 
            : "text-muted-foreground hover:bg-tax-lightgray hover:text-tax-primary"
        )
      }
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">TaxGenie</h2>
        <div className="space-y-1">
          <SidebarItem icon={<Home size={20} />} title="Dashboard" path="/" />
          <SidebarItem icon={<User size={20} />} title="Profile" path="/profile" />
          <SidebarItem icon={<Calculator size={20} />} title="Tax Calculator" path="/calculator" />
          <SidebarItem icon={<UploadCloud size={20} />} title="Document Vault" path="/documents" />
          <SidebarItem icon={<Lightbulb size={20} />} title="Tax Savings" path="/savings" />
          <SidebarItem icon={<FileText size={20} />} title="Reports" path="/reports" />
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <div className="space-y-1">
          <SidebarItem icon={<Settings size={20} />} title="Settings" path="/settings" />
          <SidebarItem icon={<HelpCircle size={20} />} title="Help & Support" path="/help" />
        </div>
      </div>
    </div>
  );
}
