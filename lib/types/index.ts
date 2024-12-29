import * as React from 'react';
export interface Policy {
  id: string;
  type: string;
  premium: number;
  startDate: Date;
  name: string;
  count: number;
  firstYearCommission: number;
  renewalCommission: number;
}

export interface Metrics {
  retentionRate: number;
  growthRate: number;
  profitMargin: number;
  averagePolicyLifespan: number;
  ebitdaPercentage: number;
  operatingExpenses: number;
  marketGrowthRate: number;
  valuationMultiple: number;
  
  // Additional metrics
  firstYearRevenue: number;
  renewalRevenue: number;
  netProfit: number;
  netProfitMargin: number;
  costToIncomeRatio: number;
  totalValuation: number;
}

export interface ScenarioComparison {
  scenarioId: string;
  comparedScenarioId: string;
  differences: Record<string, number>;
  baseScenario: Scenario;
  comparisonScenario: Scenario;
}

export interface ValuationMultiples {
  min: number;
  max: number;
}

export interface AgencyInputs {
  policyCount: number;
  retentionRate: number;
  annualRevenue: number;
  ebitdaMargin: number;
  marketGrowthRate: number;
  agencySize: 'small' | 'mid' | 'large';
}

export interface ValuationResult {
  minValuation: number;
  maxValuation: number;
  ebitda: number;
}

export interface Scenario extends AgencyInputs {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  policies: Policy[];
  metrics: Metrics;
}

// Utility type to make all properties optional
export type PartialPolicy = Partial<Policy>;
export type PartialMetrics = Partial<Metrics>;
export type PartialScenario = Partial<Scenario>;

// Default values for creating new scenarios
export const DEFAULT_SCENARIO: Scenario = {
  id: '',
  name: 'New Scenario',
  policyCount: 0,
  retentionRate: 85,
  annualRevenue: 0,
  ebitdaMargin: 25,
  marketGrowthRate: 5,
  agencySize: 'small',
  createdAt: new Date().toISOString(),
  policies: [],
  metrics: {
    retentionRate: 85,
    growthRate: 5,
    profitMargin: 25,
    averagePolicyLifespan: 5,
    ebitdaPercentage: 25,
    operatingExpenses: 0,
    marketGrowthRate: 5,
    valuationMultiple: 6,
    firstYearRevenue: 0,
    renewalRevenue: 0,
    netProfit: 0,
    netProfitMargin: 0,
    costToIncomeRatio: 0,
    totalValuation: 0
  }
};
