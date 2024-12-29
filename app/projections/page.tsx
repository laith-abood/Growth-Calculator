import * as React from "react";
'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { TrendingUp, Download, Filter, Calendar } from 'lucide-react';

export default function ProjectionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projections</h2>
            <p className="text-muted-foreground">
              Analyze and forecast your agency&apos;s growth trajectory
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Projection Controls */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Projection Settings</h3>
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Set Time Range
            </Button>
          </div>

          <Tabs defaultValue="growth" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="growth">Growth Rate</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>
            <TabsContent value="growth" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Current Growth Rate</h4>
                  <p className="text-2xl font-bold">15.8%</p>
                  <div className="mt-2 flex items-center gap-2 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+2.4% from last month</span>
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Projected Growth Rate</h4>
                  <p className="text-2xl font-bold">18.2%</p>
                  <p className="mt-2 text-sm text-muted-foreground">Next 12 months</p>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Market Average</h4>
                  <p className="text-2xl font-bold">12.5%</p>
                  <p className="mt-2 text-sm text-green-500">Above market average</p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="revenue" className="mt-6">
              <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
                <p className="text-muted-foreground">Revenue Projections Coming Soon</p>
              </div>
            </TabsContent>
            <TabsContent value="policies" className="mt-6">
              <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
                <p className="text-muted-foreground">Policy Projections Coming Soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Projection Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Growth Trajectory</h3>
            <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
              <p className="text-muted-foreground">Growth Chart Coming Soon</p>
            </div>
          </Card>

          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Revenue Forecast</h3>
            <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
              <p className="text-muted-foreground">Revenue Chart Coming Soon</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
