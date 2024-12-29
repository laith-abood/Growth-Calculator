import * as React from "react";
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Activity, Github, Twitter, Mail, 
  Heart, ExternalLink, Book, HelpCircle 
} from 'lucide-react';
import { Button } from '../ui/button';

const footerLinks = {
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

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-semibold tracking-tight gradient-text text-lg">
                Agency.AI
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering insurance agencies with data-driven valuation and growth analytics.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="glass-hover">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-hover">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="glass-hover">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li
                    key={link.href}
                    whileHover={{ x: 2 }}
                    className="text-sm"
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="h-3 w-3" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2023 Agency.AI. All rights reserved.</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500" /> by Agency.AI Team
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="glass-hover">
                <Book className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button variant="ghost" size="sm" className="glass-hover">
                <HelpCircle className="h-4 w-4 mr-2" />
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
