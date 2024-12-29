import * as React from 'react';
import { User } from 'firebase/auth';
import {
  DocumentData,
  DocumentReference,
  CollectionReference,
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

// Base interface for all Firestore documents
export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
}

// User Profile
export interface UserProfile extends BaseDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  lastLogin: Timestamp;
  settings: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailNotifications: boolean;
  };
}

// Agency Document
export interface Agency extends BaseDocument {
  name: string;
  description?: string;
  logo?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    email: string;
    phone?: string;
    website?: string;
  };
  metrics: {
    totalPolicies: number;
    activeAgents: number;
    monthlyRevenue: number;
    retentionRate: number;
  };
  settings: {
    currency: string;
    fiscalYearStart: number;
    timezone: string;
  };
}

// Policy Document
export interface Policy extends BaseDocument {
  agencyId: string;
  policyNumber: string;
  type: 'medicare' | 'medicaid' | 'other';
  status: 'active' | 'pending' | 'cancelled' | 'expired';
  client: {
    name: string;
    email: string;
    phone?: string;
    dateOfBirth: Timestamp;
  };
  details: {
    carrier: string;
    plan: string;
    premium: number;
    commission: number;
    effectiveDate: Timestamp;
    expirationDate: Timestamp;
  };
  history: {
    timestamp: Timestamp;
    action: string;
    performedBy: string;
    notes?: string;
  }[];
}

// Scenario Document
export interface Scenario extends BaseDocument {
  agencyId: string;
  name: string;
  description?: string;
  assumptions: {
    growthRate: number;
    retentionRate: number;
    commissionRate: number;
    operatingExpenses: number;
    marketConditions: 'optimistic' | 'neutral' | 'pessimistic';
  };
  projections: {
    month: number;
    policies: number;
    revenue: number;
    expenses: number;
    profit: number;
    valuation: number;
  }[];
  comparison?: {
    baselineId: string;
    differences: {
      metric: string;
      value: number;
      percentage: number;
    }[];
  };
}

// Analytics Document
export interface Analytics extends BaseDocument {
  agencyId: string;
  period: {
    start: Timestamp;
    end: Timestamp;
  };
  metrics: {
    newPolicies: number;
    cancelledPolicies: number;
    netGrowth: number;
    revenue: number;
    expenses: number;
    profit: number;
    retentionRate: number;
    averagePremium: number;
    averageCommission: number;
  };
  trends: {
    timestamp: Timestamp;
    metric: string;
    value: number;
  }[];
}

// Converter functions for Firestore
export const converters = {
  userProfile: {
    toFirestore(user: UserProfile): DocumentData {
      return { ...user };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): UserProfile {
      const data = snapshot.data(options);
      return { id: snapshot.id, ...data } as UserProfile;
    },
  },
  agency: {
    toFirestore(agency: Agency): DocumentData {
      return { ...agency };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Agency {
      const data = snapshot.data(options);
      return { id: snapshot.id, ...data } as Agency;
    },
  },
  policy: {
    toFirestore(policy: Policy): DocumentData {
      return { ...policy };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Policy {
      const data = snapshot.data(options);
      return { id: snapshot.id, ...data } as Policy;
    },
  },
  scenario: {
    toFirestore(scenario: Scenario): DocumentData {
      return { ...scenario };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Scenario {
      const data = snapshot.data(options);
      return { id: snapshot.id, ...data } as Scenario;
    },
  },
  analytics: {
    toFirestore(analytics: Analytics): DocumentData {
      return { ...analytics };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Analytics {
      const data = snapshot.data(options);
      return { id: snapshot.id, ...data } as Analytics;
    },
  },
};

// Type guards
export function isUserProfile(doc: any): doc is UserProfile {
  return doc && doc.uid && doc.email && doc.role;
}

export function isAgency(doc: any): doc is Agency {
  return doc && doc.name && doc.contact && doc.metrics;
}

export function isPolicy(doc: any): doc is Policy {
  return doc && doc.policyNumber && doc.type && doc.status;
}

export function isScenario(doc: any): doc is Scenario {
  return doc && doc.name && doc.assumptions && doc.projections;
}

export function isAnalytics(doc: any): doc is Analytics {
  return doc && doc.period && doc.metrics && doc.trends;
}

// Collection names
export const collections = {
  users: 'users',
  agencies: 'agencies',
  policies: 'policies',
  scenarios: 'scenarios',
  analytics: 'analytics',
} as const;

// Collection references with types
export type CollectionRefs = {
  users: CollectionReference<UserProfile>;
  agencies: CollectionReference<Agency>;
  policies: CollectionReference<Policy>;
  scenarios: CollectionReference<Scenario>;
  analytics: CollectionReference<Analytics>;
};

// Document references with types
export type DocumentRefs = {
  users: DocumentReference<UserProfile>;
  agencies: DocumentReference<Agency>;
  policies: DocumentReference<Policy>;
  scenarios: DocumentReference<Scenario>;
  analytics: DocumentReference<Analytics>;
};
