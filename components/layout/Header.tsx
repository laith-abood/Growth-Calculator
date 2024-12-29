import * as React from "react";
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, Search, Filter, Settings, 
  User, LogOut, ChevronDown 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { userNav } from '../../lib/config/navigation';
import { cn } from '../../lib/utils';

interface HeaderProps {
  onSearch: (query: string) => void;
  onTimeRangeChange: (range: string) => void;
  onNotificationsToggle: () => void;
  showNotifications: boolean;
  searchQuery: string;
  selectedTimeRange: string;
}

export function Header({
  onSearch,
  onTimeRangeChange,
  onNotificationsToggle,
  showNotifications,
  searchQuery,
  selectedTimeRange,
}: HeaderProps) {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    // Implement logout functionality
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Search and Filters */}
          <form 
            onSubmit={handleSearch}
            className="flex items-center gap-4 flex-1 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scenarios, metrics..."
                className="pl-10 form-input-focused"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <Button 
              type="button"
              variant="outline" 
              size="icon" 
              className="shrink-0 glass-hover"
            >
              <Filter size={18} />
            </Button>
          </form>

          {/* Time Range Selector */}
          <div className="hidden md:flex items-center gap-2">
            <Tabs value={selectedTimeRange} onValueChange={onTimeRangeChange}>
              <TabsList className="glass">
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative glass-hover"
              onClick={onNotificationsToggle}
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="glass-hover gap-2"
                >
                  <User size={18} />
                  <span className="hidden md:inline">John Doe</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userNav.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
