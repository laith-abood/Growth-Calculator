import * as React from "react";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgencyStore } from '../../lib/hooks/use-agency-store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Plus, Copy, Trash2, Save, FileText,
  AlertCircle, CheckCircle2
} from 'lucide-react';

export function ScenarioManager() {
  const { scenarios, currentScenario, addScenario, deleteScenario } = useAgencyStore();
  const [newScenarioName, setNewScenarioName] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleCreateScenario = () => {
    if (!newScenarioName) return;

    const newScenario = {
      name: newScenarioName,
      policyCount: currentScenario.policyCount,
      policies: [...currentScenario.policies],
      metrics: { ...currentScenario.metrics },
      agencySize: currentScenario.agencySize,
      annualRevenue: currentScenario.annualRevenue,
    };

    addScenario(newScenario);
    setNewScenarioName('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Scenario Management
        </CardTitle>
      </CardHeader>

      {/* Create New Scenario */}
      <Card className="card-hover-effect glass">
        <CardContent className="pt-6">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="scenarioName">New Scenario Name</Label>
              <Input
                id="scenarioName"
                value={newScenarioName}
                onChange={(e) => setNewScenarioName(e.target.value)}
                placeholder="Enter scenario name"
                className="glass-hover"
              />
            </div>
            <Button
              onClick={handleCreateScenario}
              disabled={!newScenarioName}
              className="button-glow"
            >
              {showSuccess ? (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {showSuccess ? 'Created!' : 'Create Scenario'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scenario List */}
      <div className="space-y-4">
        {scenarios.map((scenario) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group"
          >
            <Card className={`card-hover-effect glass ${
              scenario.id === currentScenario.id ? 'border-primary/50' : ''
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{scenario.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {scenario.policyCount.toLocaleString()} Policies
                      </span>
                      <span>•</span>
                      <span>
                        {scenario.agencySize.charAt(0).toUpperCase() + 
                         scenario.agencySize.slice(1)} Agency
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-hover"
                      onClick={() => {
                        const copy = {
                          name: `${scenario.name} (Copy)`,
                          policyCount: scenario.policyCount,
                          policies: [...scenario.policies],
                          metrics: { ...scenario.metrics },
                          agencySize: scenario.agencySize,
                          annualRevenue: scenario.annualRevenue,
                        };
                        addScenario(copy);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {scenarios.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-hover hover:text-red-500"
                        onClick={() => deleteScenario(scenario.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Warning */}
      {scenarios.length === 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 text-sm text-yellow-500"
        >
          <AlertCircle className="h-4 w-4" />
          <span>Create multiple scenarios to compare different growth strategies</span>
        </motion.div>
      )}
    </div>
  );
}
