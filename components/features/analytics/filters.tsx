import * as React from "react";
'use client';

import { useState } from "react";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Calendar, Filter as FilterIcon, RefreshCw } from "lucide-react";

export interface FiltersProps {
  onFilterChange: (filters: {
    dateRange: { start: string; end: string };
    searchTerm: string;
  }) => void;
  onRefresh?: () => void;
}

export function Filters({ onFilterChange, onRefresh }: FiltersProps) {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 30 days
    end: new Date().toISOString().split('T')[0],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    onFilterChange({ dateRange: newRange, searchTerm });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ dateRange, searchTerm: value });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-auto"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-auto"
          />
        </div>
        <div className="relative flex-1 max-w-sm">
          <FilterIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter results..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="ml-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      )}
    </div>
  );
}
