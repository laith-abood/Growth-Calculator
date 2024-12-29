import * as React from "react";
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart, Shield, TrendingUp, LucideIcon } from 'lucide-react';
import { Button } from '../components/ui/button';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/80">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Hero Section */}
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl/tight sm:text-6xl/tight font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Medicare LOA Agency Valuation
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg/relaxed text-muted-foreground">
              Make data-driven decisions with our powerful financial growth projection tools.
              Model scenarios, analyze trends, and optimize your business strategy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push('/dashboard')}
              >
                Get Started
                <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/docs')}
                className="border-blue-600/20 hover:bg-blue-600/10"
              >
                Learn More
                <BarChart className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-blue-600/10 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-blue-600/30 hover:bg-blue-600/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-blue-500" />
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const features: Feature[] = [
  {
    title: 'Real-time Valuation',
    description: 'Get instant agency valuations based on your policy portfolio and market conditions.',
    icon: TrendingUp
  },
  {
    title: 'Secure Analysis',
    description: 'Your data is protected with enterprise-grade security and encryption.',
    icon: Shield
  },
  {
    title: 'Advanced Analytics',
    description: 'Deep insights into your agency\'s performance with detailed metrics and projections.',
    icon: BarChart
  }
];

export default HomePage;
