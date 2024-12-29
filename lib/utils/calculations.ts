import * as React from 'react';
import { 
  AgencyInputs, 
  ValuationResult, 
  ValuationMultiples,
  Policy,
  Metrics,
  Scenario
} from '../types';

/**
 * Valuation Constants
 * 
 * These constants align with industry benchmarks for Medicare agency valuations:
 * - Small Agencies: 4–6x EBITDA
 * - Mid-sized Agencies: 6–8x EBITDA
 * - Large Agencies: 8–10x EBITDA
 * 
 * Revenue Multiples provide an alternative valuation method (1.57x–2.41x)
 */
export const VALUATION_MULTIPLES: Record<string, ValuationMultiples> = {
  small: { min: 4, max: 6 },
  mid: { min: 6, max: 8 },
  large: { min: 8, max: 10 },
};

export const REVENUE_MULTIPLES = { min: 1.57, max: 2.41 };

export const DEFAULT_BENCHMARKS = {
  retentionRate: 85, // Minimum 85% for reliable income
  ebitdaMargin: 25, // 20%–30% to reflect typical operational profitability
};

/**
 * Calculate EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)
 * Directly matches the specification's example implementation
 * 
 * @param revenue Annual revenue
 * @param margin EBITDA margin percentage
 * @returns EBITDA value
 */
export function calculateEBITDA(revenue: number, margin: number): number {
  return (revenue * margin) / 100;
}

/**
 * Calculate valuation range based on EBITDA and agency size
 * Directly matches the specification's example implementation
 * 
 * @param ebitda Earnings Before Interest, Taxes, Depreciation, and Amortization
 * @param agencySize Size of the agency (small, mid, large)
 * @returns Valuation range with minimum and maximum values
 */
export function calculateValuation(
  ebitda: number, 
  agencySize: 'small' | 'mid' | 'large'
): ValuationResult {
  const multiples = VALUATION_MULTIPLES[agencySize];
  
  return {
    minValuation: ebitda * multiples.min,
    maxValuation: ebitda * multiples.max,
    ebitda
  };
}

/**
 * Calculate total policy revenue
 * @param policies Array of policies
 * @returns Total revenue from policies
 */
export function calculatePolicyRevenue(policies: Policy[]): number {
  return policies.reduce((total, policy) => 
    total + (policy.premium * policy.count), 0);
}

/**
 * Calculate first-year and renewal revenues
 * @param policies Array of policies
 * @returns Object with first-year and renewal revenues
 */
export function calculateRevenueBreakdown(policies: Policy[]): { 
  firstYearRevenue: number, 
  renewalRevenue: number 
} {
  return policies.reduce((acc, policy) => {
    const policyRevenue = policy.premium * policy.count;
    return {
      firstYearRevenue: acc.firstYearRevenue + (policyRevenue * policy.firstYearCommission / 100),
      renewalRevenue: acc.renewalRevenue + (policyRevenue * policy.renewalCommission / 100)
    };
  }, { firstYearRevenue: 0, renewalRevenue: 0 });
}

/**
 * Calculate retention rate
 * @param policies Array of policies
 * @returns Retention rate percentage
 */
export function calculateRetentionRate(policies: Policy[]): number {
  const totalPolicies = policies.reduce((total, policy) => 
    total + policy.count, 0);
  
  return totalPolicies > 0 ? 
    (policies.filter(p => p.renewalCommission > 0).length / policies.length) * 100 
    : 0;
}

/**
 * Calculate valuation metrics for a scenario
 * @param scenario Agency scenario
 * @returns Comprehensive valuation metrics
 */
export function calculateValuationMetrics(scenario: Scenario): Metrics {
  const valuation = performValuation(scenario);
  const { firstYearRevenue, renewalRevenue } = calculateRevenueBreakdown(scenario.policies);
  
  // Net Profit calculation (simplified)
  const netProfit = valuation.ebitda; // In a real scenario, this would be more complex
  const netProfitMargin = (netProfit / scenario.annualRevenue) * 100 || 0;
  
  // Cost to Income Ratio (simplified)
  const costToIncomeRatio = ((scenario.annualRevenue - netProfit) / scenario.annualRevenue) * 100 || 0;

  return {
    ...scenario.metrics,
    valuationMultiple: (valuation.minValuation / scenario.annualRevenue) || 0,
    ebitdaPercentage: (valuation.ebitda / scenario.annualRevenue) * 100 || 0,
    operatingExpenses: scenario.annualRevenue - valuation.ebitda,
    marketGrowthRate: scenario.marketGrowthRate,
    
    // New metrics
    firstYearRevenue,
    renewalRevenue,
    netProfit,
    netProfitMargin,
    costToIncomeRatio,
    totalValuation: valuation.minValuation,
    
    // Existing metrics
    retentionRate: calculateRetentionRate(scenario.policies),
    growthRate: scenario.marketGrowthRate,
    profitMargin: scenario.ebitdaMargin,
    averagePolicyLifespan: calculateAveragePolicyLifespan(scenario.policies)
  };
}

/**
 * Calculate average policy lifespan
 * @param policies Array of policies
 * @returns Average policy lifespan in years
 */
export function calculateAveragePolicyLifespan(policies: Policy[]): number {
  if (policies.length === 0) return 0;
  
  const currentDate = new Date();
  const totalLifespan = policies.reduce((total, policy) => {
    const yearsActive = (currentDate.getTime() - policy.startDate.getTime()) / (1000 * 3600 * 24 * 365);
    return total + yearsActive;
  }, 0);
  
  return totalLifespan / policies.length;
}

/**
 * Update scenario metrics based on current data
 * @param scenario Current scenario
 * @returns Updated scenario with calculated metrics
 */
export function updateScenarioMetrics(scenario: Scenario): Scenario {
  const policyRevenue = calculatePolicyRevenue(scenario.policies);
  const retentionRate = calculateRetentionRate(scenario.policies);
  
  return {
    ...scenario,
    annualRevenue: policyRevenue,
    retentionRate,
    metrics: calculateValuationMetrics(scenario)
  };
}

/**
 * Perform comprehensive valuation calculation
 * @param scenario Agency scenario
 * @returns Comprehensive valuation result
 */
export function performValuation(scenario: Scenario): ValuationResult {
  // Ensure scenario metrics are up to date
  const updatedScenario = updateScenarioMetrics(scenario);
  
  // Calculate EBITDA
  const ebitda = calculateEBITDA(
    updatedScenario.annualRevenue, 
    updatedScenario.ebitdaMargin
  );
  
  // Calculate valuation
  return calculateValuation(ebitda, updatedScenario.agencySize);
}

/**
 * Compare two scenarios
 * @param baseScenario Base scenario for comparison
 * @param comparisonScenario Scenario to compare against base
 * @returns Differences between scenarios
 */
export function compareScenarios(
  baseScenario: Scenario, 
  comparisonScenario: Scenario
) {
  const baseValuation = performValuation(baseScenario);
  const comparisonValuation = performValuation(comparisonScenario);
  
  return {
    totalValuation: {
      base: baseValuation.minValuation,
      comparison: comparisonValuation.minValuation,
      difference: comparisonValuation.minValuation - baseValuation.minValuation
    },
    revenue: {
      base: baseScenario.annualRevenue,
      comparison: comparisonScenario.annualRevenue,
      difference: comparisonScenario.annualRevenue - baseScenario.annualRevenue
    },
    // Add more comparative metrics as needed
  };
}
