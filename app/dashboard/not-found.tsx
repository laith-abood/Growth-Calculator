import * as React from "react";
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Home, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

export default function DashboardNotFound() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-lg w-full p-6 glass">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-muted/10 p-3">
              <FileQuestion className="h-6 w-6 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Page Not Found
              </h3>
              <p className="text-sm text-muted-foreground max-w-[500px]">
                Sorry, we could not find the dashboard page you&apos;re looking for.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 form-input-focused"
                />
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                variant="default"
                onClick={() => window.location.href = '/dashboard'}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="gap-2"
              >
                Go Back
              </Button>
            </div>

            {/* Quick Links */}
            <div className="w-full pt-6 mt-6 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Popular Pages</h4>
              <div className="grid gap-2">
                {[
                  { title: 'Growth Projections', href: '/dashboard/growth' },
                  { title: 'Valuation Calculator', href: '/dashboard/valuation' },
                  { title: 'Retention Analysis', href: '/dashboard/retention' },
                  { title: 'Settings', href: '/settings' },
                ].map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="h-1 w-1 rounded-full bg-muted-foreground group-hover:bg-foreground transition-colors" />
                    {link.title}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
