import * as React from 'react';
import { 
  LayoutDashboard, LineChart, FileText, Users, 
  Settings, BookOpen, BarChart3, Calculator,
  Shield, Zap, HelpCircle, Mail
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  description?: string;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const mainNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Overview of your agency metrics and performance',
      },
      {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Detailed analysis and reporting',
      },
      {
        title: 'Projections',
        href: '/projections',
        icon: LineChart,
        description: 'Growth and revenue projections',
      },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Policies',
        href: '/policies',
        icon: FileText,
        description: 'Manage and track policies',
      },
      {
        title: 'Clients',
        href: '/clients',
        icon: Users,
        description: 'Client management and relationships',
      },
      {
        title: 'Valuation',
        href: '/valuation',
        icon: Calculator,
        description: 'Agency valuation calculator',
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'General',
        href: '/settings',
        icon: Settings,
        description: 'Application settings and preferences',
      },
      {
        title: 'Security',
        href: '/settings/security',
        icon: Shield,
        description: 'Security settings and API keys',
      },
      {
        title: 'Integrations',
        href: '/settings/integrations',
        icon: Zap,
        description: 'Third-party integrations and connections',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        title: 'Documentation',
        href: '/docs',
        icon: BookOpen,
        description: 'Guides and documentation',
      },
      {
        title: 'Help Center',
        href: '/help',
        icon: HelpCircle,
        description: 'Get help and support',
      },
      {
        title: 'Contact',
        href: '/contact',
        icon: Mail,
        description: 'Contact our support team',
      },
    ],
  },
];

export const userNav = [
  {
    title: 'Profile',
    href: '/profile',
  },
  {
    title: 'Settings',
    href: '/settings',
  },
  {
    title: 'Billing',
    href: '/billing',
  },
  {
    title: 'API Keys',
    href: '/settings/api-keys',
  },
];

export const footerNav = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API', href: '/api' },
  ],
  resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Community', href: '/community' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
    { label: 'Status', href: '/status' },
  ],
};

export const socialLinks = [
  {
    title: 'Twitter',
    href: 'https://twitter.com/agency_ai',
    icon: 'twitter',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/agency-ai',
    icon: 'github',
  },
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/company/agency-ai',
    icon: 'linkedin',
  },
];
