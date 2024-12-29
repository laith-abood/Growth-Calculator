import * as React from "react";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgencyStore } from '../../lib/hooks/use-agency-store';
import { Card } from '../ui/card';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, 
  FileText, BarChart, Activity, ArrowRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function ValuationMetrics() {
  const { currentScenario } = useAgencyStore();
  const { metrics } = currentScenario;

  const metricsData = [
    {
      title: 'Total Valuation',
      value: formatCurrency(metrics.totalValuation),
      change: +12.5,
      icon: DollarSign,
      color: 'blue',
      description: 'Based on current metrics and market conditions'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(metrics.monthlyRevenue),
      change: +8.2,
      icon: BarChart,
      color: 'green',
      description: 'Recurring revenue from active policies'
    },
    {
      title: 'Active Policies',
      value: currentScenario.policyCount.toLocaleString(),
      change: +4.1,
      icon: FileText,
      color: 'purple',
      description: 'Total number of active policies'
    },
    {
      title: 'Retention Rate',
      value: formatPercent(metrics.retentionRate),
      change: -2.3,
      icon: Users,
      color: 'orange',
      description: '12-month rolling retention rate'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, i) => (
        <MetricCard key={metric.title} {...metric} delay={i * 0.1} />
      ))}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
  description: string;
  delay?: number;
}

function MetricCard({ title, value, change, icon: Icon, color, description, delay }: MetricCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const colorMap = {
    blue: 'from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10',
    green: 'from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10',
    purple: 'from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10',
    orange: 'from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10'
  };

  const iconColorMap = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 blur transition duration-500 group-hover:opacity-100" />
      <Card className={cn(
        "relative p-6 transition-all duration-300 bg-gradient-to-br",
        colorMap[color as keyof typeof colorMap],
        "hover:shadow-lg hover:shadow-primary/5"
      )}>
        <motion.div animate={{ scale: isHovered ? 1.02 : 1 }} className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
            </div>
            <div className={cn(
              "p-2.5 rounded-lg",
              `bg-${color}-500/10`
            )}>
              <Icon className={cn(
                "h-5 w-5",
                iconColorMap[color as keyof typeof iconColorMap]
              )} />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              change >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {Math.abs(change)}%
            </div>
            <span className="text-sm text-muted-foreground">vs. last month</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              className="text-primary"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
