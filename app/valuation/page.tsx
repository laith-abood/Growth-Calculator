import * as React from "react";
'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calculator, TrendingUp, DollarSign, Download, BarChart } from 'lucide-react';

export default function ValuationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Agency Valuation</h2>
            <p className="text-muted-foreground">
              Calculate and analyze your agency&apos;s value
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Value Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Current Valuation</h3>
                <p className="text-2xl font-bold">$2.45M</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Growth Rate</h3>
                <p className="text-2xl font-bold">+15.8%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Market Position</h3>
                <p className="text-2xl font-bold">Top 15%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Valuation Calculator */}
          <Card className="p-6 glass">
            <div className="flex items-center gap-4 mb-6">
              <Calculator className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Valuation Calculator</h3>
            </div>

            <div className="space-y-6">
              {/* Revenue Input */}
              <div className="space-y-2">
                <Label htmlFor="revenue">Annual Revenue</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Enter annual revenue"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Growth Rate Slider */}
              <div className="space-y-4">
                <Label>Growth Rate</Label>
                <Slider
                  defaultValue={[15]}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Policy Count */}
              <div className="space-y-2">
                <Label htmlFor="policies">Active Policies</Label>
                <Input
                  id="policies"
                  type="number"
                  placeholder="Number of active policies"
                />
              </div>

              <Button className="w-full">Calculate Valuation</Button>
            </div>
          </Card>

          {/* Valuation Metrics */}
          <Card className="p-6 glass">
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                <TabsTrigger value="comparison">Market Comparison</TabsTrigger>
              </TabsList>
              <TabsContent value="metrics" className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Revenue Multiple</span>
                    <span className="font-semibold">2.5x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Policy Value</span>
                    <span className="font-semibold">$1,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Retention Rate</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Client Lifetime Value</span>
                    <span className="font-semibold">$4,800</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="comparison" className="mt-6">
                <div className="h-[200px] flex items-center justify-center border border-border/50 rounded-lg">
                  <p className="text-muted-foreground">Market Comparison Chart Coming Soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Historical Valuations */}
        <Card className="p-6 glass">
          <h3 className="text-lg font-semibold mb-4">Historical Valuations</h3>
          <div className="h-[300px] flex items-center justify-center border border-border/50 rounded-lg">
            <p className="text-muted-foreground">Historical Valuation Chart Coming Soon</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
