# Medicare LOA Agency Growth Calculator

An interactive tool for valuing and analyzing Medicare Licensed Only Agent agencies. Built with Next.js 13, TypeScript, and Tailwind CSS.

## Features

- Real-time agency valuation calculations
- Interactive growth projections over 24 months
- Policy retention analysis
- Revenue breakdown by policy type
- Dark mode optimized UI
- Responsive design with mobile support

## Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **UI Components:** Radix UI
- **Theme:** Custom dark theme with CSS variables
- **Forms:** React Hook Form + Zod

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page
│   ├── globals.css         # Global styles
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # App providers
├── components/             # React components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/               # Reusable UI components
├── lib/                   # Application logic
│   ├── hooks/            # Custom hooks
│   ├── theme/            # Theme configuration
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

### Dashboard Components

- **GrowthProjections:** Interactive charts for policy growth visualization
- **ValuationMetrics:** Financial metrics and valuation analysis
- **PolicyInputs:** Configuration for policy counts and commission rates

### Core Features

- Real-time calculations for agency valuation
- Dynamic growth projections based on user inputs
- Policy retention analysis and breakdown
- Revenue forecasting by policy type
- Interactive data visualization

## State Management

The application uses Zustand for state management with two main stores:

- **AgencyStore:** Manages policy data and agency metrics
- **ProjectionsStore:** Handles growth projections and calculations

## Theme System

Custom theme implementation with:

- CSS variables for dynamic values
- Dark mode optimization
- Consistent color palette
- Responsive design utilities
- Accessibility considerations

## Development Guidelines

1. **TypeScript:**
   - Use strict type checking
   - Define interfaces for all data structures
   - Avoid any type when possible

2. **Components:**
   - Keep components focused and single-responsibility
   - Use composition over inheritance
   - Implement proper error boundaries
   - Add loading states for async operations

3. **Styling:**
   - Use Tailwind CSS utilities
   - Follow BEM naming for custom CSS
   - Maintain consistent spacing scale
   - Ensure responsive design

4. **Performance:**
   - Implement proper memoization
   - Optimize re-renders
   - Use dynamic imports for code splitting
   - Monitor bundle size

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
