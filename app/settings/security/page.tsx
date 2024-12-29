import * as React from "react";
'use client';

import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Shield, Key, Smartphone, Lock,
  UserCog, History, AlertTriangle
} from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Settings</h2>
          <p className="text-muted-foreground">
            Manage your account security and authentication settings
          </p>
        </div>

        {/* Security Status */}
        <Card className="p-6 glass">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold">Security Status</h3>
              <p className="text-sm text-muted-foreground">Your account is well-protected</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Secure
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border border-border/50">
              <Key className="h-5 w-5 text-primary mb-2" />
              <h4 className="font-medium">2FA Enabled</h4>
              <p className="text-sm text-muted-foreground">Two-factor authentication is active</p>
            </div>
            <div className="p-4 rounded-lg border border-border/50">
              <Lock className="h-5 w-5 text-primary mb-2" />
              <h4 className="font-medium">Strong Password</h4>
              <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
            </div>
            <div className="p-4 rounded-lg border border-border/50">
              <History className="h-5 w-5 text-primary mb-2" />
              <h4 className="font-medium">Recent Activity</h4>
              <p className="text-sm text-muted-foreground">No suspicious activity detected</p>
            </div>
          </div>
        </Card>

        {/* Password Settings */}
        <Card className="p-6 glass">
          <h3 className="text-lg font-semibold mb-6">Password Settings</h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
              />
            </div>
            <Button>Update Password</Button>
          </div>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Smartphone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Button variant="outline">Configure 2FA</Button>
          </div>

          <div className="rounded-lg border border-border/50 p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Recovery Codes</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate new recovery codes for emergency access to your account.
                  Keep these codes in a safe place.
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Generate New Codes
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Session Management */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <UserCog className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Active Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your active sessions and devices
                </p>
              </div>
            </div>
            <Button variant="outline" className="text-red-500 hover:text-red-600">
              Sign Out All Devices
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">iPhone 13 Pro</h4>
                  <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
    </div>
  );
}
