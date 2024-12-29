# API Documentation

## Authentication

### Firebase Authentication

```typescript
// Sign in with email/password
await signInWithEmailAndPassword(auth, email, password);

// Sign in with Google
await signInWithPopup(auth, googleProvider);

// Sign out
await signOut(auth);
```

## Firestore Collections

### Users Collection

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Timestamp;
  settings: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
  };
}

// Path: /users/{userId}
```

### Clients Collection

```typescript
interface Client {
  id: string;
  name: string;
  industry: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metrics: {
    revenue: number;
    employees: number;
    growthRate: number;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// Path: /clients/{clientId}
```

### Projections Collection

```typescript
interface Projection {
  id: string;
  clientId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  scenarios: {
    id: string;
    name: string;
    assumptions: {
      growthRate: number;
      margins: number;
      churnRate: number;
    };
    projections: {
      revenue: number[];
      profit: number[];
      customers: number[];
    };
  }[];
}

// Path: /projections/{projectionId}
```

### Valuations Collection

```typescript
interface Valuation {
  id: string;
  clientId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metrics: {
    revenue: number;
    ebitda: number;
    growthRate: number;
  };
  multiples: {
    revenueMultiple: number;
    ebitdaMultiple: number;
  };
  adjustments: {
    type: string;
    amount: number;
    description: string;
  }[];
  result: {
    enterpriseValue: number;
    equityValue: number;
  };
}

// Path: /valuations/{valuationId}
```

## API Endpoints

### Client Management

```typescript
// Create client
POST /api/clients
{
  name: string;
  industry: string;
  metrics: {
    revenue: number;
    employees: number;
    growthRate: number;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// Update client
PUT /api/clients/{clientId}
{
  name?: string;
  industry?: string;
  metrics?: {
    revenue?: number;
    employees?: number;
    growthRate?: number;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

// Delete client
DELETE /api/clients/{clientId}
```

### Projections

```typescript
// Create projection
POST /api/projections
{
  clientId: string;
  scenarios: {
    name: string;
    assumptions: {
      growthRate: number;
      margins: number;
      churnRate: number;
    };
  }[];
}

// Update projection
PUT /api/projections/{projectionId}
{
  scenarios?: {
    id: string;
    name?: string;
    assumptions?: {
      growthRate?: number;
      margins?: number;
      churnRate?: number;
    };
  }[];
}

// Delete projection
DELETE /api/projections/{projectionId}
```

### Valuations

```typescript
// Create valuation
POST /api/valuations
{
  clientId: string;
  metrics: {
    revenue: number;
    ebitda: number;
    growthRate: number;
  };
  multiples: {
    revenueMultiple: number;
    ebitdaMultiple: number;
  };
  adjustments: {
    type: string;
    amount: number;
    description: string;
  }[];
}

// Update valuation
PUT /api/valuations/{valuationId}
{
  metrics?: {
    revenue?: number;
    ebitda?: number;
    growthRate?: number;
  };
  multiples?: {
    revenueMultiple?: number;
    ebitdaMultiple?: number;
  };
  adjustments?: {
    type: string;
    amount: number;
    description: string;
  }[];
}

// Delete valuation
DELETE /api/valuations/{valuationId}
```

## Error Handling

### Error Responses

```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}

// Example error codes
const ErrorCodes = {
  UNAUTHORIZED: 'auth/unauthorized',
  NOT_FOUND: 'data/not-found',
  VALIDATION_ERROR: 'validation/error',
  INTERNAL_ERROR: 'internal/error'
} as const;
```

### Rate Limiting

- API requests are limited to 100 requests per minute per user
- Bulk operations are limited to 50 items per request

### Authentication Errors

```typescript
// Invalid credentials
{
  code: 'auth/invalid-credentials',
  message: 'Invalid email or password'
}

// Token expired
{
  code: 'auth/token-expired',
  message: 'Authentication token has expired'
}

// Insufficient permissions
{
  code: 'auth/insufficient-permissions',
  message: 'User does not have required permissions'
}
```

## Webhooks

### Available Events

```typescript
type WebhookEvent =
  | 'client.created'
  | 'client.updated'
  | 'client.deleted'
  | 'projection.created'
  | 'projection.updated'
  | 'valuation.created'
  | 'valuation.updated';

interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  data: unknown;
}
```

### Webhook Configuration

```typescript
// Create webhook
POST /api/webhooks
{
  url: string;
  events: WebhookEvent[];
  secret: string;
}

// Update webhook
PUT /api/webhooks/{webhookId}
{
  url?: string;
  events?: WebhookEvent[];
  secret?: string;
}

// Delete webhook
DELETE /api/webhooks/{webhookId}
