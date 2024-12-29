import * as React from 'react';
import { useTheme } from 'next-themes';

export interface ChartConfig {
  margin: { top: number; right: number; left: number; bottom: number };
  gridProps: {
    strokeDasharray: string;
    opacity: number;
    className: string;
  };
  axisProps: {
    fontSize: number;
    stroke: string;
    tickLine: boolean;
    axisLine: boolean;
  };
  tooltipStyles: {
    contentStyle: {
      backgroundColor: string;
      border: string;
      borderRadius: string;
    };
    labelStyle: {
      color: string;
    };
  };
}

export function useChartConfig(): ChartConfig {
  const { theme } = useTheme();

  return {
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
    gridProps: {
      strokeDasharray: '3 3',
      opacity: 0.5,
      className: 'stroke-muted',
    },
    axisProps: {
      fontSize: 12,
      stroke: 'currentColor',
      tickLine: false,
      axisLine: false,
    },
    tooltipStyles: {
      contentStyle: {
        backgroundColor: 'hsl(var(--popover))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
      },
      labelStyle: {
        color: 'hsl(var(--popover-foreground))',
      },
    },
  };
}