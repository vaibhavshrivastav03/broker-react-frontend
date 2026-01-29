"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import type { UserRole } from "@/lib/roles";


interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  menuItems: { label: string; value: string; icon: ReactNode }[];
  activeTab: string;
  onTabChange: (value: string) => void;
  userRole: UserRole;
}

export function DashboardLayout({
  children,
  title,
  menuItems,
  activeTab,
  onTabChange,
  userRole,
}: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    if (userRole === "broker") {
      localStorage.removeItem("demo_broker_id");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BL</span>
                </div>
                <span className="font-semibold text-lg hidden sm:inline-block">
                  {title}
                </span>
              </Link>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-2 sticky top-24">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => onTabChange(item.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.value
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
