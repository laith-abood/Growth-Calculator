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
  MoreHorizontal, Users, UserPlus, Mail 
} from 'lucide-react';

const clients = [
  {
    id: 'CLT-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    policies: 2,
    status: 'Active',
    joinDate: '2023-01-15',
  },
  {
    id: 'CLT-002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    policies: 1,
    status: 'Active',
    joinDate: '2023-03-22',
  },
  {
    id: 'CLT-003',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    phone: '(555) 345-6789',
    policies: 3,
    status: 'Inactive',
    joinDate: '2023-06-01',
  },
];

export default function ClientsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground">
              Manage your client relationships
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Total Clients</h3>
                <p className="text-2xl font-bold">856</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">New This Month</h3>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Communications</h3>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Clients Table */}
        <Card className="p-6 glass">
          {/* Table Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1 max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
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
                  <TableHead>Client ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Policies</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.policies}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {client.status}
                      </span>
                    </TableCell>
                    <TableCell>{client.joinDate}</TableCell>
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
