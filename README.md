# Growth Calculator

A comprehensive business growth and valuation calculator built with Next.js 13+.

## Features

- 📊 Growth Projections
- 💰 Valuation Metrics
- 📈 Analytics Dashboard
- 👥 Client Management
- ⚙️ Customizable Settings
- 🔒 Secure Authentication
- 🌙 Dark Mode Support

## Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **State Management:** Custom Hooks
- **Forms:** React Hook Form
- **Charts:** Recharts

## Project Structure

```
├── app/                   # Next.js 13 App Router
│   ├── analytics/        # Analytics pages
│   ├── clients/          # Client management
│   ├── dashboard/        # Main dashboard
│   ├── projections/      # Growth projections
│   ├── settings/         # User settings
│   └── valuation/        # Valuation tools
├── components/
│   ├── shared/          # Reusable UI components
│   └── features/        # Feature-specific components
│       ├── analytics/   # Analytics components
│       └── contact/     # Contact form components
├── lib/
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
└── public/              # Static assets
```

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/growth-calculator.git
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Environment Variables

Required environment variables:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
\`\`\`

## Component Documentation

### Shared Components

Located in `components/shared/`:

- `Button`: Customizable button component with variants
- `Card`: Container component with consistent styling
- `Input`: Form input component with validation
- `Table`: Data table component with sorting
- `Toast`: Notification system
- `Toaster`: Toast notification manager

### Feature Components

Located in `components/features/`:

#### Analytics
- `MetricsGrid`: Display key metrics in a grid layout
- `TrendChart`: Visualize trends over time
- `DataTable`: Interactive data table with filtering
- `Filters`: Data filtering controls

#### Contact
- `ContactForm`: Contact form with validation

## API Documentation

### Firebase Authentication

Authentication methods available:
- Email/Password
- Google Sign-In
- Magic Link (Passwordless)

### Firestore Collections

- `users`: User profiles and settings
- `clients`: Client information
- `projections`: Growth projection data
- `valuations`: Valuation calculations

## Custom Hooks

Located in `lib/hooks/`:

- `useAuth`: Authentication state management
- `useApiKeys`: API key management
- `useChartConfig`: Chart configuration
- `useScenariosStore`: Scenario management

## Utility Functions

Located in `lib/utils/`:

- `calculations.ts`: Financial calculations
- `format.ts`: Data formatting utilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details
