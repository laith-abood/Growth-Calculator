import * as React from "react";
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { ValuationCalculator } from '../../components/calculator/valuation-calculator';
import { RetentionAnalysis } from '../../components/dashboard/retention-analysis';
import { ScenarioManager } from '../../components/dashboard/scenario-manager';
import { GrowthProjections } from '../../components/dashboard/growth-projections';
import { Card } from '../../components/ui/card';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Growth Projections */}
          <Card className="p-6 lg:col-span-2 glass">
            <GrowthProjections />
          </Card>

          {/* Valuation Calculator */}
          <Card className="p-6 glass">
            <ValuationCalculator />
          </Card>
        </div>

        {/* Secondary Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Retention Analysis */}
          <Card className="p-6 glass">
            <RetentionAnalysis />
          </Card>

          {/* Scenario Manager */}
          <Card className="p-6 glass">
            <ScenarioManager />
          </Card>
        </div>

        {/* Floating Action Button */}
        <motion.div
          className="fixed bottom-6 right-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="flex flex-col items-end gap-4">
            <motion.div
              className="flex items-center gap-2 bg-background/95 backdrop-blur-lg border border-border/50 rounded-lg p-4 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString()}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
