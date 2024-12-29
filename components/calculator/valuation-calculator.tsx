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
  Calculator, DollarSign, TrendingUp, 
  RefreshCcw, Save, AlertCircle 
} from 'lucide-react';

export function ValuationCalculator() {
  const { currentScenario, updateMetric } = useAgencyStore();
  const { metrics } = currentScenario;
  const [isSaving, setIsSaving] = React.useState(false);

  const handleMetricChange = (key: keyof typeof metrics, value: number) => {
    updateMetric(key, value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const calculatedValuation = React.useMemo(() => {
    const annualRevenue = metrics.monthlyRevenue * 12;
    const ebitda = annualRevenue * metrics.ebitdaMargin;
    return ebitda * metrics.valuationMultiple;
  }, [metrics.monthlyRevenue, metrics.ebitdaMargin, metrics.valuationMultiple]);

  return (
    <div className="space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Valuation Calculator
        </CardTitle>
      </CardHeader>

      <div className="space-y-8">
        {/* EBITDA Margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="ebitdaMargin" className="text-sm font-medium">
              EBITDA Margin
            </Label>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <Input
                id="ebitdaMargin"
                type="text"
                value={formatPercent(metrics.ebitdaMargin)}
                readOnly
                className="w-32 glass-hover"
              />
            </div>
          </div>
          <div className="pt-2">
            <Slider
              value={[metrics.ebitdaMargin * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) => handleMetricChange('ebitdaMargin', value / 100)}
              className="glass-hover"
            />
          </div>
        </motion.div>

        {/* Valuation Multiple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="valuationMultiple" className="text-sm font-medium">
              Valuation Multiple
            </Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="valuationMultiple"
                type="number"
                value={metrics.valuationMultiple}
                onChange={(e) => handleMetricChange('valuationMultiple', Number(e.target.value))}
                className="w-32 glass-hover"
                step={0.1}
                min={0}
              />
            </div>
          </div>
          <div className="pt-2">
            <Slider
              value={[metrics.valuationMultiple]}
              min={0}
              max={10}
              step={0.1}
              onValueChange={([value]) => handleMetricChange('valuationMultiple', value)}
              className="glass-hover"
            />
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4 space-y-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Annual Revenue</span>
            <span className="font-medium">
              {formatCurrency(metrics.monthlyRevenue * 12)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">EBITDA</span>
            <span className="font-medium">
              {formatCurrency(metrics.monthlyRevenue * 12 * metrics.ebitdaMargin)}
            </span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Estimated Valuation</span>
            <span className="text-primary">
              {formatCurrency(calculatedValuation)}
            </span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between pt-4"
        >
          <Button
            variant="outline"
            size="sm"
            className="glass-hover"
            onClick={() => {
              handleMetricChange('ebitdaMargin', 0.3);
              handleMetricChange('valuationMultiple', 2.5);
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
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </motion.div>

        {/* Warning */}
        {metrics.valuationMultiple > 5 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-yellow-500 pt-4"
          >
            <AlertCircle className="h-4 w-4" />
            <span>High valuation multiple may not be sustainable</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
