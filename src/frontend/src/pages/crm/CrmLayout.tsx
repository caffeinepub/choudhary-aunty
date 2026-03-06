import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

// ============================================
// CRM ROLES & SESSION
// ============================================

export type CrmRole = "admin" | "crm-manager" | "marketing-manager";

export const CRM_PASSWORDS: Record<string, CrmRole> = {
  "crm-admin-2024": "admin",
  "crm-manager-2024": "crm-manager",
  "crm-marketing-2024": "marketing-manager",
};

export const CRM_ROLE_LABELS: Record<CrmRole, string> = {
  admin: "🔑 Admin",
  "crm-manager": "📋 CRM Manager",
  "marketing-manager": "📣 Marketing Manager",
};

export function getCrmSession(): CrmRole | null {
  const role = sessionStorage.getItem("crm_role") as CrmRole | null;
  return role;
}

export function setCrmSession(role: CrmRole) {
  sessionStorage.setItem("crm_role", role);
}

export function clearCrmSession() {
  sessionStorage.removeItem("crm_role");
}

// ============================================
// SIDEBAR NAV ITEMS
// ============================================

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: CrmRole[];
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/crm",
    icon: LayoutDashboard,
    roles: ["admin", "crm-manager", "marketing-manager"],
    ocid: "crm.dashboard_link",
  },
  {
    label: "Customers",
    href: "/crm/customers",
    icon: Users,
    roles: ["admin", "crm-manager"],
    ocid: "crm.customers_link",
  },
  {
    label: "Campaigns",
    href: "/crm/campaigns",
    icon: Megaphone,
    roles: ["admin", "crm-manager"],
    ocid: "crm.campaigns_link",
  },
  {
    label: "Analytics",
    href: "/crm/analytics",
    icon: BarChart3,
    roles: ["admin", "crm-manager", "marketing-manager"],
    ocid: "crm.analytics_link",
  },
  {
    label: "Settings",
    href: "/crm/settings",
    icon: Settings,
    roles: ["admin"],
    ocid: "crm.settings_link",
  },
];

// ============================================
// SIDEBAR COMPONENT
// ============================================

interface SidebarProps {
  role: CrmRole;
  onLogout: () => void;
}

export function CrmSidebar({ role, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside
      className={cn(
        "flex flex-col bg-burgundy text-cream transition-all duration-300 min-h-screen shrink-0 relative",
        collapsed ? "w-14" : "w-56",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-cream/10">
        {!collapsed && (
          <div>
            <p className="font-display font-bold text-sm text-cream leading-tight">
              CRM Portal
            </p>
            <p className="text-cream/50 text-[10px] font-body">
              Choudhary Aunty
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-cream/10 transition-colors text-cream/60 hover:text-cream"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-3 py-2 mx-3 mt-3 mb-1 rounded-xl bg-cream/8 border border-cream/10">
          <p className="text-cream/80 text-xs font-body font-semibold">
            {CRM_ROLE_LABELS[role]}
          </p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {visibleItems.map((navItem) => {
          const Icon = navItem.icon;
          const isActive = location.pathname === navItem.href;
          return (
            <Link
              key={navItem.href}
              to={navItem.href}
              data-ocid={navItem.ocid}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all",
                isActive
                  ? "bg-saffron text-cream shadow-warm"
                  : "text-cream/70 hover:bg-cream/8 hover:text-cream",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{navItem.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-cream/10">
        <button
          type="button"
          onClick={onLogout}
          data-ocid="crm.logout_button"
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-body text-cream/60 hover:text-cream hover:bg-cream/8 transition-all",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
