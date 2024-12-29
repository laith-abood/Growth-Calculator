# Component Documentation

## Shared Components

### Button
```tsx
import { Button } from "@/components/shared/button";

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/shared/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input
```tsx
import { Input } from "@/components/shared/input";

<Input type="text" placeholder="Enter text" />
<Input type="email" required />
<Input disabled value="Disabled" />
```

### Table
```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/shared/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Header</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Toast
```tsx
import { useToast } from "@/components/shared/use-toast";

const { toast } = useToast();

// Usage
toast({
  title: "Success",
  description: "Operation completed",
  variant: "default" // or "destructive"
});
```

## Feature Components

### Analytics

#### MetricsGrid
```tsx
import { MetricsGrid } from "@/components/features/analytics/metrics-grid";

<MetricsGrid
  metrics={[
    { label: "Revenue", value: "$10,000", change: 15 },
    { label: "Users", value: "1,234", change: -5 }
  ]}
/>
```

#### TrendChart
```tsx
import { TrendChart } from "@/components/features/analytics/trend-chart";

<TrendChart
  data={[
    { date: "2023-01", value: 100 },
    { date: "2023-02", value: 150 }
  ]}
  xAxis="date"
  yAxis="value"
/>
```

#### DataTable
```tsx
import { DataTable } from "@/components/features/analytics/data-table";

<DataTable
  columns={[
    { header: "Date", accessor: "date" },
    { header: "Value", accessor: "value" }
  ]}
  data={[
    { date: "2023-01-01", value: 100 },
    { date: "2023-01-02", value: 150 }
  ]}
/>
```

#### Filters
```tsx
import { Filters } from "@/components/features/analytics/filters";

<Filters
  onFilterChange={(filters) => {
    console.log(filters);
  }}
  options={{
    dateRange: true,
    metrics: ["revenue", "users"],
    segments: ["region", "platform"]
  }}
/>
```

### Contact

#### ContactForm
```tsx
import { ContactForm } from "@/components/features/contact/contact-form";

<ContactForm
  onSubmit={async (data) => {
    // Handle form submission
  }}
  initialValues={{
    name: "",
    email: "",
    message: ""
  }}
/>
```

## Custom Hooks

### useAuth
```tsx
import { useAuth } from "@/lib/hooks/use-auth";

const { user, signIn, signOut, loading } = useAuth();
```

### useApiKeys
```tsx
import { useApiKeys } from "@/lib/hooks/use-api-keys";

const { keys, createKey, deleteKey, loading } = useApiKeys();
```

### useChartConfig
```tsx
import { useChartConfig } from "@/lib/hooks/use-chart-config";

const { config, updateConfig } = useChartConfig();
```

### useScenariosStore
```tsx
import { useScenariosStore } from "@/lib/hooks/use-scenarios-store";

const { scenarios, addScenario, updateScenario, deleteScenario } = useScenariosStore();
```

## Utility Functions

### Calculations
```tsx
import { calculateGrowthRate, calculateValuation } from "@/lib/utils/calculations";

const growthRate = calculateGrowthRate(startValue, endValue, periods);
const valuation = calculateValuation(revenue, multiplier, adjustments);
```

### Formatting
```tsx
import { formatCurrency, formatPercentage, formatDate } from "@/lib/utils/format";

const currency = formatCurrency(1000); // "$1,000"
const percentage = formatPercentage(0.15); // "15%"
const date = formatDate(new Date()); // "January 1, 2023"
