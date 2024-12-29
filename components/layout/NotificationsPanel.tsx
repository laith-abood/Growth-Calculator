import * as React from "react";
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Bell, X, Check, AlertCircle, 
  Clock, Calendar, Info 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatDate } from '../../lib/utils/format';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationsPanelProps {
  show: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

export function NotificationsPanel({ 
  show, 
  onClose,
  onClearAll 
}: NotificationsPanelProps) {
  // Mock notifications - replace with real data
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'New Feature Available',
      message: 'Check out our new scenario comparison tool!',
      type: 'info',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Calculation Complete',
      message: 'Your valuation report has been generated successfully.',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
    },
    {
      id: '3',
      title: 'Data Update Required',
      message: 'Please update your policy retention rates for more accurate projections.',
      type: 'warning',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
    onClearAll();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 right-4 w-96 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg"
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <ScrollArea className="max-h-[400px]">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 transition-colors hover:bg-muted/50",
                      !notification.read && "bg-primary/5"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(notification.timestamp)}</span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No new notifications</p>
              </div>
            )}
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationsPanel;
