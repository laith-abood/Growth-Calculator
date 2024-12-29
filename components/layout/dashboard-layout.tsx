import * as React from "react";
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { NotificationsPanel } from './NotificationsPanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('7d');
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Searching for:', query);
  };

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    // Update data based on new time range
    console.log('Time range changed to:', range);
  };

  const handleNotificationsClear = () => {
    // Handle notifications clear
    console.log('Notifications cleared');
  };

  // Handle escape key to close notifications
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background/95 to-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300 relative",
        isSidebarOpen ? "ml-[280px]" : "ml-[80px]"
      )}>
        {/* Header */}
        <Header
          onSearch={handleSearch}
          onTimeRangeChange={handleTimeRangeChange}
          onNotificationsToggle={() => setShowNotifications(!showNotifications)}
          showNotifications={showNotifications}
          searchQuery={searchQuery}
          selectedTimeRange={selectedTimeRange}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grid Background Effect */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-ring/5" />
            <div className="absolute inset-0 grid-background opacity-[0.02]" />
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Notifications Panel */}
        <NotificationsPanel
          show={showNotifications}
          onClose={() => setShowNotifications(false)}
          onClearAll={handleNotificationsClear}
        />

        {/* Backdrop for notifications on mobile */}
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowNotifications(false)}
          />
        )}
      </main>
    </div>
  );
}

export default DashboardLayout;
