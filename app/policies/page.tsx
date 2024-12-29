import * as React from "react";
'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '../../components/ui/table';
import { 
  Plus, Search, Filter, Download, 
  MoreHorizontal, FileText, Shield, Clock 
} from 'lucide-react';

const policies = [
  {
    id: 'POL-001',
    client: 'John Smith',
    type: 'Medicare Advantage',
    status: 'Active',
    premium: '$245.00',
    startDate: '2023-01-15',
    renewalDate: '2024-01-15',
  },
  {
    id: 'POL-002',
    client: 'Sarah Johnson',
    type: 'Medicare Supplement',
    status: 'Active',
    premium: '$198.50',
    startDate: '2023-03-22',
    renewalDate: '2024-03-22',
  },
  {
    id: 'POL-003',
    client: 'Michael Brown',
    type: 'Medicare Advantage',
    status: 'Pending',
    premium: '$267.75',
    startDate: '2023-06-01',
    renewalDate: '2024-06-01',
  },
];

export default function PoliciesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Policies</h2>
            <p className="text-muted-foreground">
              Manage and track your policy portfolio
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Policy
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Total Policies</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Active Policies</h3>
                <p className="text-2xl font-bold">1,198</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Pending Renewal</h3>
                <p className="text-2xl font-bold">36</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Policies Table */}
        <Card className="p-6 glass">
          {/* Table Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1 max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search policies..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.id}</TableCell>
                    <TableCell>{policy.client}</TableCell>
                    <TableCell>{policy.type}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        policy.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {policy.status}
                      </span>
                    </TableCell>
                    <TableCell>{policy.premium}</TableCell>
                    <TableCell>{policy.startDate}</TableCell>
                    <TableCell>{policy.renewalDate}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
