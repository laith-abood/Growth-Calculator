import * as React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Scenario, 
  ScenarioComparison, 
  DEFAULT_SCENARIO,
  Policy,
  Metrics
} from '../types';
import { 
  compareScenarios, 
  performValuation,
  calculateValuationMetrics
} from '../utils/calculations';

interface ScenariosState {
  scenarios: Scenario[];
  activeScenario: Scenario | null;
  activeComparison: ScenarioComparison | null;
  
  addScenario: (scenario: Scenario) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  removeScenario: (id: string) => void;
  deleteScenario: (id: string) => void;
  setActiveScenario: (scenario: Scenario) => void;
  compareScenarios: (baseScenarioId: string, comparisonScenarioId: string, baseScenario?: Scenario, comparisonScenario?: Scenario) => void;
  clearComparison: () => void;
}

export const useScenariosStore = create<ScenariosState>()(
  persist(
    (set, get) => ({
      scenarios: [DEFAULT_SCENARIO],
      activeScenario: DEFAULT_SCENARIO,
      activeComparison: null,

      addScenario: (scenario) => set(state => {
        const newScenario = {
          ...scenario,
          id: `scenario-${Date.now()}`,
          createdAt: new Date().toISOString(),
          metrics: calculateValuationMetrics(scenario)
        };

        return {
          scenarios: [...state.scenarios, newScenario],
          activeScenario: newScenario
        };
      }),

      updateScenario: (id, updates) => set(state => {
        const updatedScenarios = state.scenarios.map(scenario => 
          scenario.id === id 
            ? {
                ...scenario,
                ...updates,
                metrics: updates.policies 
                  ? calculateValuationMetrics({
                      ...scenario,
                      ...updates
                    })
                  : {
                      ...scenario.metrics,
                      ...updates.metrics
                    }
              }
            : scenario
        );

        const updatedActiveScenario = updatedScenarios.find(s => s.id === id) || state.activeScenario;

        return {
          scenarios: updatedScenarios,
          activeScenario: updatedActiveScenario
        };
      }),

      removeScenario: (id) => set(state => {
        const updatedScenarios = state.scenarios.filter(scenario => scenario.id !== id);
        
        return {
          scenarios: updatedScenarios,
          activeScenario: updatedScenarios[0] || null
        };
      }),

      deleteScenario: (id) => set(state => {
        const updatedScenarios = state.scenarios.filter(scenario => scenario.id !== id);
        
        return {
          scenarios: updatedScenarios,
          activeScenario: updatedScenarios[0] || null,
          activeComparison: null
        };
      }),

      setActiveScenario: (scenario) => set(() => ({
        activeScenario: scenario
      })),

      compareScenarios: (baseScenarioId, comparisonScenarioId, baseScenario, comparisonScenario) => set(state => {
        // If scenarios are not provided, find them in the store
        const foundBaseScenario = baseScenario || state.scenarios.find(s => s.id === baseScenarioId);
        const foundComparisonScenario = comparisonScenario || state.scenarios.find(s => s.id === comparisonScenarioId);

        if (!foundBaseScenario || !foundComparisonScenario) {
          return { activeComparison: null };
        }

        const comparisonResult = compareScenarios(foundBaseScenario, foundComparisonScenario);

        return {
          activeComparison: {
            scenarioId: baseScenarioId,
            comparedScenarioId: comparisonScenarioId,
            baseScenario: foundBaseScenario,
            comparisonScenario: foundComparisonScenario,
            differences: {
              totalValuation: comparisonResult.totalValuation.difference,
              revenue: comparisonResult.revenue.difference,
              // Add more comparative metrics as needed
            }
          }
        };
      }),

      clearComparison: () => set(() => ({
        activeComparison: null
      })),
    }),
    {
      name: 'scenarios-storage',
      partialize: (state) => ({ 
        scenarios: state.scenarios,
        activeScenario: state.activeScenario,
        activeComparison: state.activeComparison
      }),
    }
  )
);
