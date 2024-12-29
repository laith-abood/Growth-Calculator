import * as React from "react";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgencyStore } from '../../lib/hooks/use-agency-store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { formatPercent } from '../../lib/utils';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { 
  Users, Calendar, Download, 
  ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

export function RetentionAnalysis() {
  const { currentScenario } = useAgencyStore();
  const { metrics } = currentScenario;

  const retentionData = React.useMemo(() => {
    const retained = Math.round(currentScenario.policyCount * metrics.retentionRate);
    const churned = currentScenario.policyCount - retained;
    
    return [
      { name: 'Retained', value: retained },
      { name: 'Churned', value: churned },
    ];
  }, [currentScenario.policyCount, metrics.retentionRate]);

  const COLORS = ['hsl(var(--success))', 'hsl(var(--destructive))'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="text-sm font-medium mb-1">{data.name} Policies</p>
          <p className="text-sm">
            {data.value.toLocaleString()} ({formatPercent(data.value / currentScenario.policyCount)})
          </p>
        </div>
      );
    }
    return null;
  };

  const retentionTrend = metrics.retentionRate > 0.8 ? 'positive' : metrics.retentionRate > 0.6 ? 'neutral' : 'negative';

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Retention Analysis
        </CardTitle>
      </CardHeader>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={retentionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {retentionData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index]} 
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Retention Rate</p>
          <p className="text-2xl font-semibold tracking-tight">
            {formatPercent(metrics.retentionRate)}
          </p>
          <div className={`flex items-center gap-1 text-sm ${
            retentionTrend === 'positive' 
              ? 'text-green-500' 
              : retentionTrend === 'negative' 
                ? 'text-red-500' 
                : 'text-yellow-500'
          }`}>
            {retentionTrend === 'positive' ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {retentionTrend === 'positive' 
              ? 'Strong Retention'
              : retentionTrend === 'negative'
                ? 'Needs Improvement'
                : 'Moderate Retention'
            }
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Retained Policies</p>
          <p className="text-2xl font-semibold tracking-tight">
            {Math.round(currentScenario.policyCount * metrics.retentionRate).toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            of {currentScenario.policyCount.toLocaleString()} total
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" size="sm" className="glass-hover">
          <Calendar className="h-4 w-4 mr-2" />
          View History
        </Button>
        <Button variant="outline" size="sm" className="glass-hover">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Recommendations */}
      {metrics.retentionRate < 0.7 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pt-4 space-y-2"
        >
          <p className="text-sm font-medium">Recommendations:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Implement regular client check-ins
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Review policy pricing strategy
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Enhance customer support services
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
