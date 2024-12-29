import * as React from "react";
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../shared/card";
import { formatNumber, formatPercentage, formatCurrency } from "../../lib/utils";

export interface MetricsGridProps {
  metrics: {
    id: string;
    label: string;
    value: number;
    change: number;
    format?: "number" | "percentage" | "currency";
    description?: string;
  }[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case "percentage":
        return formatPercentage(value);
      case "currency":
        return formatCurrency(value);
      default:
        return formatNumber(value);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatValue(metric.value, metric.format)}
            </div>
            <div className="flex items-center space-x-2">
              <p className={`text-xs ${
                metric.change > 0 
                  ? "text-success" 
                  : metric.change < 0 
                  ? "text-destructive" 
                  : "text-muted-foreground"
              }`}>
                {metric.change > 0 ? "+" : ""}
                {formatPercentage(metric.change)}
              </p>
              {metric.description && (
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
