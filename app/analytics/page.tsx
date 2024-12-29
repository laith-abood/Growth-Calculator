import * as React from "react";
'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card } from '../../components/ui/card';
import { LineChart, BarChart, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        </div>

        {/* Analytics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Revenue Metrics */}
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Revenue Growth</h3>
                <p className="text-2xl font-bold">+24.5%</p>
              </div>
            </div>
          </Card>

          {/* Policy Metrics */}
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Active Policies</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Performance Score</h3>
                <p className="text-2xl font-bold">92.8</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Growth Trends */}
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Growth Trends</h3>
            <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
              <p className="text-muted-foreground">Growth Chart Coming Soon</p>
            </div>
          </Card>

          {/* Revenue Distribution */}
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Revenue Distribution</h3>
            <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
              <p className="text-muted-foreground">Distribution Chart Coming Soon</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
