import * as React from "react";
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../shared/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber, formatCurrency, formatDate } from "../../lib/utils";

export interface TrendChartProps {
  title: string;
  data: Array<{
    date: string | Date;
    value: number;
  }>;
  format?: "number" | "currency";
  color?: string;
  description?: string;
}

export function TrendChart({
  title,
  data,
  format = "number",
  color = "hsl(var(--primary))",
  description,
}: TrendChartProps) {
  const formatValue = (value: number) => {
    return format === "currency" ? formatCurrency(value) : formatNumber(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={color}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={color}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => formatDate(date)}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                tickFormatter={formatValue}
                width={80}
                className="text-xs text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Date
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {formatDate(payload[0].payload.date)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Value
                            </span>
                            <span className="font-bold">
                              {formatValue(payload[0].value as number)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fillOpacity={1}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
