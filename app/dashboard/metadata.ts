import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Agency.AI - Medicare LOA Agency Valuation',
  description: 'Interactive dashboard for analyzing and managing Medicare Licensed Only Agent agency valuations, growth projections, and performance metrics.',
  keywords: [
    'Dashboard',
    'Agency Analytics',
    'Growth Projections',
    'Valuation Calculator',
    'Retention Analysis',
    'Scenario Management',
    'Medicare Agency',
    'LOA Performance',
  ],
  authors: [{ name: 'Agency.AI Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agency.ai/dashboard',
    title: 'Dashboard | Agency.AI - Medicare LOA Agency Valuation',
    description: 'Interactive dashboard for analyzing and managing Medicare Licensed Only Agent agency valuations.',
    siteName: 'Agency.AI',
    images: [
      {
        url: '/og-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Agency.AI Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | Agency.AI',
    description: 'Interactive dashboard for Medicare LOA agency valuations and analytics.',
    creator: '@AgencyAI',
    images: ['/og-dashboard.png'],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  category: 'Dashboard',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Agency.AI Dashboard',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#09090b',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#09090b',
  },
  alternates: {
    canonical: 'https://agency.ai/dashboard',
    languages: {
      'en-US': 'https://agency.ai/dashboard',
    },
  },
  applicationName: 'Agency.AI',
  referrer: 'origin-when-cross-origin',
  creator: 'Agency.AI Team',
  publisher: 'Agency.AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agency.ai'),
  appleWebApp: {
    capable: true,
    title: 'Agency.AI Dashboard',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const icons = {
  icon: '/favicon.ico',
  shortcut: '/favicon-16x16.png',
  apple: '/apple-touch-icon.png',
  other: [
    {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#09090b',
    },
  ],
};

export default metadata;
