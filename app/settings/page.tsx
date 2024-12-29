import * as React from "react";
'use client';

import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { 
  Settings, User, Shield, Zap, Bell,
  Moon, Sun, Globe, Palette
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Quick Settings */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Profile</h3>
                <p className="text-sm text-muted-foreground">Manage your profile information</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Security</h3>
                <p className="text-sm text-muted-foreground">Configure security settings</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Integrations</h3>
                <p className="text-sm text-muted-foreground">Manage connected services</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Settings */}
        <Card className="p-6 glass">
          <div className="flex items-center gap-4 mb-6">
            <Settings className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">General Settings</h3>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Preferences</h4>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <h5 className="font-medium">Notifications</h5>
                      <p className="text-sm text-muted-foreground">Email notifications enabled</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <Moon className="h-5 w-5 text-primary" />
                    <div>
                      <h5 className="font-medium">Theme</h5>
                      <p className="text-sm text-muted-foreground">Dark mode active</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <h5 className="font-medium">Language</h5>
                      <p className="text-sm text-muted-foreground">English (US)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Select</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <Palette className="h-5 w-5 text-primary" />
                    <div>
                      <h5 className="font-medium">Appearance</h5>
                      <p className="text-sm text-muted-foreground">Customize the interface</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Customize</Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </Card>
    </div>
  );
}
