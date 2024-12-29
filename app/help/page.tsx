import * as React from "react";
'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Search, HelpCircle, Book, MessageCircle,
  FileText, Video, Lightbulb, ArrowRight
} from 'lucide-react';

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using the platform',
    icon: Book,
    articles: [
      'Platform Overview',
      'Setting Up Your Account',
      'First Steps Guide',
    ],
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides for key features',
    icon: Video,
    articles: [
      'Creating Your First Policy',
      'Managing Clients',
      'Running Reports',
    ],
  },
  {
    title: 'Best Practices',
    description: 'Tips and recommendations for optimal use',
    icon: Lightbulb,
    articles: [
      'Security Guidelines',
      'Data Management Tips',
      'Workflow Optimization',
    ],
  },
  {
    title: 'FAQs',
    description: 'Common questions and answers',
    icon: MessageCircle,
    articles: [
      'Account Management',
      'Billing Questions',
      'Technical Support',
    ],
  },
];

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Help Center</h2>
          <p className="text-muted-foreground">
            Find answers and get support
          </p>
        </div>

        {/* Search */}
        <Card className="p-6 glass">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {helpCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="p-6 glass">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 text-sm"
                        >
                          <FileText className="h-4 w-4" />
                          {article}
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Need More Help */}
        <Card className="p-6 glass">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Need More Help?</h3>
              <p className="text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
            </div>
            <Button>Contact Support</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
