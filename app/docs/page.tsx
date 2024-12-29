import * as React from "react";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  BookOpen, Code, Calculator, Users, Shield, 
  LineChart, Settings, Zap
} from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BookOpen,
      content: [
        {
          title: 'Getting Started',
          description: 'Welcome to the Agency Valuation platform. This tool helps you calculate and analyze your agency\'s value based on various metrics and scenarios.',
          items: [
            'Real-time valuation calculations',
            'Growth projections and analysis',
            'Policy management',
            'Scenario comparison',
            'Retention tracking'
          ]
        },
        {
          title: 'Key Features',
          description: 'Our platform offers comprehensive tools for agency valuation and analysis:',
          items: [
            'Interactive dashboards with real-time updates',
            'Advanced scenario modeling',
            'Detailed retention analysis',
            'Customizable growth projections',
            'Policy lifecycle management'
          ]
        }
      ]
    },
    {
      id: 'calculations',
      title: 'Calculations',
      icon: Calculator,
      content: [
        {
          title: 'Valuation Methods',
          description: 'Understanding how we calculate your agency\'s value:',
          items: [
            'Revenue multiple approach',
            'EBITDA-based calculations',
            'Growth rate adjustments',
            'Risk factor analysis',
            'Market comparisons'
          ]
        },
        {
          title: 'Key Metrics',
          description: 'Essential metrics used in our calculations:',
          items: [
            'Monthly recurring revenue (MRR)',
            'Client retention rates',
            'Policy renewal rates',
            'Growth trajectory',
            'Operating margins'
          ]
        }
      ]
    },
    {
      id: 'scenarios',
      title: 'Scenarios',
      icon: LineChart,
      content: [
        {
          title: 'Creating Scenarios',
          description: 'Learn how to model different growth paths:',
          items: [
            'Define growth assumptions',
            'Set retention targets',
            'Adjust market conditions',
            'Model acquisition strategies',
            'Compare outcomes'
          ]
        }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              Documentation
            </h1>
            <p className="text-muted-foreground">
              Learn how to use the Agency Valuation platform effectively
            </p>
          </div>

          {/* Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="glass">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="gap-2">
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Content */}
            {sections.map((section) => (
              activeTab === section.id && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6"
                >
                  {section.content.map((block, index) => (
                    <Card key={block.title} className="card-hover-effect glass">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <section.icon className="h-5 w-5 text-primary" />
                          {block.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          {block.description}
                        </p>
                        <ul className="space-y-2">
                          {block.items.map((item, i) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )
            ))}
          </Tabs>
        </motion.div>

        {/* Grid Background Effect */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-ring/5" />
          <div className="absolute inset-0 grid-background opacity-[0.02]" />
        </div>
      </div>
    </DashboardLayout>
  );
}
