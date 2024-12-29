import * as React from "react";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgencyStore } from '../../lib/hooks/use-agency-store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { formatCurrency, formatPercent } from '../../lib/utils';
import { 
  FileText, DollarSign, TrendingUp, Save,
  RefreshCcw, AlertCircle, CheckCircle2
} from 'lucide-react';

export function PolicyInputs() {
  const { currentScenario, updateScenario } = useAgencyStore();
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handlePolicyCountChange = (value: number) => {
    updateScenario({
      ...currentScenario,
      policyCount: value,
    });
  };

  const handleCommissionChange = (value: number) => {
    updateScenario({
      ...currentScenario,
      metrics: {
        ...currentScenario.metrics,
        firstYearCommission: value,
      },
    });
  };

  const handleRetentionChange = (value: number[]) => {
    updateScenario({
      ...currentScenario,
      metrics: {
        ...currentScenario.metrics,
        retentionRate: value[0] / 100,
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Policy Configuration
        </CardTitle>
      </CardHeader>

      <div className="space-y-8">
        {/* Policy Count Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="policyCount" className="text-sm font-medium">
              Active Policies
            </Label>
            <Input
              id="policyCount"
              type="number"
              value={currentScenario.policyCount}
              onChange={(e) => handlePolicyCountChange(Number(e.target.value))}
              className="w-32 glass-hover"
            />
          </div>
          <div className="pt-2">
            <Slider
              value={[currentScenario.policyCount]}
              min={0}
              max={1000}
              step={10}
              onValueChange={([value]) => handlePolicyCountChange(value)}
              className="glass-hover"
            />
          </div>
        </motion.div>

        {/* Commission Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="commission" className="text-sm font-medium">
              First Year Commission
            </Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="commission"
                type="number"
                value={currentScenario.metrics.firstYearCommission}
                onChange={(e) => handleCommissionChange(Number(e.target.value))}
                className="w-32 glass-hover"
              />
            </div>
          </div>
          <div className="pt-2">
            <Slider
              value={[currentScenario.metrics.firstYearCommission]}
              min={0}
              max={5000}
              step={100}
              onValueChange={([value]) => handleCommissionChange(value)}
              className="glass-hover"
            />
          </div>
        </motion.div>

        {/* Retention Rate Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="retention" className="text-sm font-medium">
              Retention Rate
            </Label>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <Input
                id="retention"
                type="text"
                value={formatPercent(currentScenario.metrics.retentionRate)}
                readOnly
                className="w-32 glass-hover"
              />
            </div>
          </div>
          <div className="pt-2">
            <Slider
              value={[currentScenario.metrics.retentionRate * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleRetentionChange}
              className="glass-hover"
            />
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4 space-y-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly Revenue</span>
            <span className="font-medium">
              {formatCurrency(currentScenario.metrics.monthlyRevenue)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Annual Revenue</span>
            <span className="font-medium">
              {formatCurrency(currentScenario.metrics.monthlyRevenue * 12)}
            </span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between pt-4"
        >
          <Button
            variant="outline"
            size="sm"
            className="glass-hover"
            onClick={() => {
              // Reset to defaults
            }}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            size="sm"
            className="button-glow"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="loading-spinner mr-2" />
            ) : showSuccess ? (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {showSuccess ? 'Saved!' : 'Save Changes'}
          </Button>
        </motion.div>

        {/* Warning */}
        {currentScenario.metrics.retentionRate < 0.7 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-yellow-500 pt-4"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Low retention rate may impact valuation negatively</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
