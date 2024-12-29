import * as React from 'react';
import { create } from 'zustand';

export interface Metrics {
  totalValuation: number;
  monthlyRevenue: number;
  retentionRate: number;
  marketGrowthRate: number;
  ebitdaPercentage: number;
  firstYearCommission: number;
  renewalCommission: number;
  firstYearRevenue: number;
  renewalRevenue: number;
  valuationMultiple: number;
  netProfit: number;
  netProfitMargin: number;
  ebitdaMargin: number;
}

export interface Policy {
  id: string;
  type: string;
  count: number;
  startDate: Date;
  firstYearCommission: number;
}

export interface Scenario {
  id: string;
  name: string;
  policyCount: number;
  policies: Policy[];
  metrics: Metrics;
  createdAt: Date;
  updatedAt: Date;
  agencySize: 'small' | 'medium' | 'large';
  annualRevenue: number;
}

interface AgencyStore {
  scenarios: Scenario[];
  currentScenario: Scenario;
  addScenario: (scenario: Omit<Scenario, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateScenario: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
  setCurrentScenario: (id: string) => void;
  updateMetric: (metricKey: keyof Metrics, value: number) => void;
}

const defaultMetrics: Metrics = {
  totalValuation: 1000000,
  monthlyRevenue: 25000,
  retentionRate: 0.85,
  marketGrowthRate: 0.12,
  ebitdaPercentage: 0.3,
  firstYearCommission: 1200,
  renewalCommission: 600,
  firstYearRevenue: 120000,
  renewalRevenue: 60000,
  valuationMultiple: 2.5,
  netProfit: 300000,
  netProfitMargin: 0.25,
  ebitdaMargin: 0.3,
};

const defaultScenario: Scenario = {
  id: '1',
  name: 'Default Scenario',
  policyCount: 100,
  policies: [],
  metrics: defaultMetrics,
  createdAt: new Date(),
  updatedAt: new Date(),
  agencySize: 'medium',
  annualRevenue: 300000,
};

export const useAgencyStore = create<AgencyStore>((set) => ({
  scenarios: [defaultScenario],
  currentScenario: defaultScenario,
  addScenario: (scenario) => {
    const newScenario: Scenario = {
      ...scenario,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      scenarios: [...state.scenarios, newScenario],
    }));
  },
  updateScenario: (updatedScenario) =>
    set((state) => ({
      scenarios: state.scenarios.map((scenario) =>
        scenario.id === updatedScenario.id ? updatedScenario : scenario
      ),
      currentScenario:
        state.currentScenario.id === updatedScenario.id
          ? updatedScenario
          : state.currentScenario,
    })),
  deleteScenario: (id) =>
    set((state) => ({
      scenarios: state.scenarios.filter((scenario) => scenario.id !== id),
    })),
  setCurrentScenario: (id) =>
    set((state) => ({
      currentScenario:
        state.scenarios.find((scenario) => scenario.id === id) || defaultScenario,
    })),
  updateMetric: (metricKey, value) =>
    set((state) => ({
      currentScenario: {
        ...state.currentScenario,
        metrics: {
          ...state.currentScenario.metrics,
          [metricKey]: value,
        },
        updatedAt: new Date(),
      },
    })),
}));

// Helper function to calculate derived metrics
export function calculateDerivedMetrics(metrics: Metrics): Partial<Metrics> {
  const annualRevenue = metrics.monthlyRevenue * 12;
  const netProfit = annualRevenue * metrics.netProfitMargin;
  const ebitda = annualRevenue * metrics.ebitdaMargin;
  const totalValuation = ebitda * metrics.valuationMultiple;

  return {
    totalValuation,
    netProfit,
  };
}
