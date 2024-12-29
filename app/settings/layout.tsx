import * as React from "react";
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { cn } from '../../lib/utils';
import { Settings, Shield, Zap } from 'lucide-react';

const settingsNav = [
  {
    title: 'General',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: Shield,
  },
  {
    title: 'Integrations',
    href: '/settings/integrations',
    icon: Zap,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                    pathname === item.href 
                      ? "bg-accent" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </DashboardLayout>
  );
}
