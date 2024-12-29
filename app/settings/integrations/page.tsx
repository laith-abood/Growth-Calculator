import * as React from "react";
'use client';

import React from 'react';
import { useApiKeys } from '../../../lib/hooks/use-api-keys';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Zap, Database, Cloud, Link,
  CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';

const integrations = [
  {
    name: 'CRM System',
    description: 'Connect your CRM to sync client data',
    status: 'connected',
    icon: Database,
    lastSync: '5 minutes ago',
  },
  {
    name: 'Analytics Platform',
    description: 'Integration for advanced analytics and reporting',
    status: 'disconnected',
    icon: Cloud,
    lastSync: null,
  },
  {
    name: 'Document Storage',
    description: 'Cloud storage for policy documents',
    status: 'pending',
    icon: Link,
    lastSync: null,
  },
];

export default function IntegrationsPage() {
  const { getDisplayKey, toggleKeyVisibility, keys } = useApiKeys();

  return (
    <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Manage your third-party integrations and connections
          </p>
        </div>

        {/* API Keys */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Zap className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">API Access</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your API keys and access tokens
                </p>
              </div>
            </div>
            <Button>Generate New Key</Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Production API Key</Label>
              <div className="relative">
                <Input
                  type={getDisplayKey('production').includes('•') ? 'password' : 'text'}
                  value={getDisplayKey('production')}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => toggleKeyVisibility('production')}
                >
                  {getDisplayKey('production').includes('•') ? 'Show' : 'Hide'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Last used: {keys.production.lastUsed} from {keys.production.lastUsedFrom}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Test API Key</Label>
              <div className="relative">
                <Input
                  type={getDisplayKey('test').includes('•') ? 'password' : 'text'}
                  value={getDisplayKey('test')}
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => toggleKeyVisibility('test')}
                >
                  {getDisplayKey('test').includes('•') ? 'Show' : 'Hide'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Last used: {keys.test.lastUsed} from {keys.test.lastUsedFrom}
              </p>
            </div>
          </div>
        </Card>

        {/* Integrations List */}
        <div className="grid gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.name} className="p-6 glass">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {integration.status === 'connected' && (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-500">Connected</span>
                          </>
                        )}
                        {integration.status === 'disconnected' && (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span className="text-sm text-red-500">Disconnected</span>
                          </>
                        )}
                        {integration.status === 'pending' && (
                          <>
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            <span className="text-sm text-yellow-500">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                    {integration.lastSync && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Last synced: {integration.lastSync}
                      </p>
                    )}
                    <div className="mt-4">
                      <Button
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                      >
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Webhooks */}
        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Webhooks</h3>
              <p className="text-sm text-muted-foreground">
                Configure webhook endpoints for real-time updates
              </p>
            </div>
            <Button>Add Webhook</Button>
          </div>

          <div className="rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">https://api.example.com/webhooks</h4>
                <p className="text-sm text-muted-foreground">
                  Receiving: policy updates, client changes
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                Remove
              </Button>
            </div>
          </div>
        </Card>
    </div>
  );
}
