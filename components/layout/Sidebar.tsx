import * as React from "react";
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { mainNav, type NavItem } from '../../lib/config/navigation';
import { 
  Activity, ChevronRight, Menu, X, 
  Zap, ExternalLink 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 80,
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
        className="fixed top-0 left-0 h-full glass z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-border/50">
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <Activity className="h-6 w-6 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <span className="font-semibold tracking-tight gradient-text">Agency.AI</span>
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="hover:bg-primary/10"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-6">
              {mainNav.map((section) => (
                <div key={section.title} className="space-y-2">
                  {isOpen && (
                    <h4 className="text-xs font-medium text-muted-foreground px-2">
                      {section.title}
                    </h4>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavItem
                        key={item.href}
                        item={item}
                        isActive={pathname === item.href}
                        isExpanded={isOpen}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 border-t border-border/50"
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-2 button-glow"
              >
                <Zap className="h-4 w-4" />
                Upgrade Plan
              </Button>
            </motion.div>
          ) : (
            <div className="p-4 border-t border-border/50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full glass-hover"
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Upgrade Plan</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
}

function NavItem({ item, isActive, isExpanded }: NavItemProps) {
  const Icon = item.icon;

  const content = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-4 transition-all-200",
        isActive ? "nav-item-active" : "text-muted-foreground hover:text-foreground",
        !isExpanded && "justify-center px-0"
      )}
      asChild
    >
      <Link href={item.href}>
        <Icon className={cn(
          "h-5 w-5",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )} />
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            {item.title}
          </motion.span>
        )}
        {isExpanded && item.external && (
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        )}
        {isExpanded && item.badge && (
          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    </Button>
  );

  if (!isExpanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {item.title}
          {item.badge && (
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
              {item.badge}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export default Sidebar;
