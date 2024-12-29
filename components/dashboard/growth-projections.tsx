import * as React from "react";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgencyStore } from '../../lib/hooks/use-agency-store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { formatCurrency, formatPercent } from '../../lib/utils/format';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { 
  TrendingUp, Calendar, Download, 
  ZoomIn, ZoomOut, RefreshCcw 
} from 'lucide-react';

export function GrowthProjections() {
  const { currentScenario } = useAgencyStore();
  const [timeRange, setTimeRange] = React.useState('1y');
  const [isZoomed, setIsZoomed] = React.useState(false);

  const generateProjections = React.useCallback(() => {
    const months = timeRange === '1y' ? 12 : timeRange === '2y' ? 24 : 36;
    const data = [];
    let currentRevenue = currentScenario.metrics.monthlyRevenue;
    let currentPolicies = currentScenario.policyCount;

    for (let i = 0; i <= months; i++) {
      const retentionFactor = Math.pow(currentScenario.metrics.retentionRate, i / 12);
      const growthFactor = Math.pow(1 + currentScenario.metrics.marketGrowthRate, i / 12);
      
      const projectedPolicies = currentPolicies * retentionFactor * growthFactor;
      const projectedRevenue = currentRevenue * retentionFactor * growthFactor;
      const projectedValuation = projectedRevenue * 12 * currentScenario.metrics.ebitdaMargin * currentScenario.metrics.valuationMultiple;

      data.push({
        month: i,
        policies: Math.round(projectedPolicies),
        revenue: projectedRevenue,
        valuation: projectedValuation,
      });
    }

    return data;
  }, [currentScenario, timeRange]);

  const projectionData = React.useMemo(() => generateProjections(), [generateProjections]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="text-sm font-medium mb-2">Month {label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-500">
              Valuation: {formatCurrency(payload[0].value)}
            </p>
            <p className="text-green-500">
              Revenue: {formatCurrency(payload[1].value)}
            </p>
            <p className="text-purple-500">
              Policies: {payload[2].value.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Growth Projections
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tabs value={timeRange} onValueChange={setTimeRange} className="h-8">
              <TabsList className="glass">
                <TabsTrigger value="1y" className="text-xs">1Y</TabsTrigger>
                <TabsTrigger value="2y" className="text-xs">2Y</TabsTrigger>
                <TabsTrigger value="3y" className="text-xs">3Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 glass-hover"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {isZoomed ? (
                <ZoomOut className="h-4 w-4" />
              ) : (
                <ZoomIn className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className={`transition-all duration-300 ${isZoomed ? 'h-[500px]' : 'h-[300px]'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={projectionData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => `M${value}`}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => formatCurrency(value)}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => value.toLocaleString()}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="valuation"
              name="Valuation"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="policies"
              name="Policies"
              stroke="hsl(var(--purple))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {timeRange === '1y' ? '12-Month' : timeRange === '2y' ? '24-Month' : '36-Month'} Growth
          </p>
          <p className="text-sm text-muted-foreground">
            Based on {formatPercent(currentScenario.metrics.marketGrowthRate)} market growth rate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="glass-hover">
            <Calendar className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" className="glass-hover">
            <Download className="h-4 w-4 mr-2" />
            Download Chart
          </Button>
        </div>
      </div>
    </div>
  );
}
