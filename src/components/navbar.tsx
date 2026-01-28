"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">BL</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              Broker Listings API
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/listings"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Listings
            </Link>
            <Link
              href="/technology"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Technology
            </Link>
            <Link
              href="/admin/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Admin
            </Link>
            <Link
              href="/broker/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Broker Portal
            </Link>
            <Button asChild size="sm">
              <Link href="/listings">View Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              href="/listings"
              className="block text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Listings
            </Link>
            <Link
              href="/technology"
              className="block text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Technology
            </Link>
            <Link
              href="/admin/login"
              className="block text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Admin
            </Link>
            <Link
              href="/broker/login"
              className="block text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Broker Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
