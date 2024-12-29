import * as React from "react";
'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card } from '../../components/ui/card';
import { ContactForm } from '../../components/contact/contact-form';
import { 
  Mail, MessageCircle, Clock, Phone,
  Twitter, Linkedin, Github
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'support@agency.ai',
    value: 'mailto:support@agency.ai',
  },
  {
    icon: Phone,
    title: 'Phone',
    description: '+1 (555) 123-4567',
    value: 'tel:+15551234567',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Available during business hours',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'Mon-Fri, 9:00 AM - 5:00 PM EST',
  },
];

const socialLinks = [
  {
    icon: Twitter,
    title: 'Twitter',
    href: 'https://twitter.com/agency_ai',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    href: 'https://linkedin.com/company/agency-ai',
  },
  {
    icon: Github,
    title: 'GitHub',
    href: 'https://github.com/agency-ai',
  },
];

export default function ContactPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
          <p className="text-muted-foreground">
            Get in touch with our support team
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card key={method.title} className="p-6 glass">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{method.title}</h3>
                      {method.value ? (
                        <a
                          href={method.value}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {method.description}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Social Links */}
            <Card className="p-6 glass">
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                      title={social.title}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </a>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-6 glass">
            <h3 className="text-lg font-semibold mb-6">Send us a Message</h3>
            <ContactForm />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
