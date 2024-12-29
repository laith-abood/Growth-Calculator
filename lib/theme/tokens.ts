import * as React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme token types
export type ColorScale = {
  50: string;
  100: string;
  200?: string;
  300?: string;
  400?: string;
  500: string;
  600: string;
  700?: string;
  800?: string;
  900?: string;
};

export type ThemeTokens = typeof tokens;

export const tokens = {
  colors: {
    ui: {
      background: {
        primary: 'hsl(222, 47%, 11%)',
        secondary: 'hsl(217, 33%, 17%)',
        tertiary: 'hsl(222, 47%, 15%)',
      },
      text: {
        primary: 'hsl(214, 32%, 91%)',
        secondary: 'hsl(215, 20%, 65%)',
        disabled: 'hsl(215, 20%, 45%)',
      },
      border: {
        default: 'hsl(215, 20%, 25%)',
        hover: 'hsl(215, 20%, 35%)',
        focus: 'hsl(217, 91%, 60%)',
      },
    },
    brand: {
      primary: {
        50: 'hsl(217, 91%, 95%)',
        100: 'hsl(217, 91%, 90%)',
        200: 'hsl(217, 91%, 80%)',
        300: 'hsl(217, 91%, 70%)',
        400: 'hsl(217, 91%, 65%)',
        500: 'hsl(217, 91%, 60%)',
        600: 'hsl(217, 91%, 55%)',
        700: 'hsl(217, 91%, 45%)',
        800: 'hsl(217, 91%, 35%)',
        900: 'hsl(217, 91%, 25%)',
      } as ColorScale,
      secondary: {
        50: 'hsl(172, 66%, 95%)',
        100: 'hsl(172, 66%, 90%)',
        200: 'hsl(172, 66%, 80%)',
        300: 'hsl(172, 66%, 70%)',
        400: 'hsl(172, 66%, 60%)',
        500: 'hsl(172, 66%, 50%)',
        600: 'hsl(172, 66%, 45%)',
        700: 'hsl(172, 66%, 35%)',
        800: 'hsl(172, 66%, 25%)',
        900: 'hsl(172, 66%, 15%)',
      } as ColorScale,
    },
    semantic: {
      success: {
        50: 'hsl(142, 76%, 95%)',
        100: 'hsl(142, 76%, 90%)',
        500: 'hsl(142, 76%, 36%)',
        600: 'hsl(142, 76%, 31%)',
      } as ColorScale,
      warning: {
        50: 'hsl(37, 91%, 95%)',
        100: 'hsl(37, 91%, 90%)',
        500: 'hsl(37, 91%, 55%)',
        600: 'hsl(37, 91%, 50%)',
      } as ColorScale,
      error: {
        50: 'hsl(0, 91%, 95%)',
        100: 'hsl(0, 91%, 90%)',
        500: 'hsl(0, 91%, 55%)',
        600: 'hsl(0, 91%, 50%)',
      } as ColorScale,
      info: {
        50: 'hsl(200, 91%, 95%)',
        100: 'hsl(200, 91%, 90%)',
        500: 'hsl(200, 91%, 55%)',
        600: 'hsl(200, 91%, 50%)',
      } as ColorScale,
    },
    chart: {
      1: 'hsl(217, 91%, 60%)',
      2: 'hsl(172, 66%, 50%)',
      3: 'hsl(272, 66%, 50%)',
      4: 'hsl(327, 66%, 50%)',
      5: 'hsl(47, 66%, 50%)',
    },
  },
  typography: {
    fonts: {
      sans: 'var(--font-inter)',
      mono: 'JetBrains Mono, monospace',
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    sizes: {
      '2xs': '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

// Export theme hooks and utilities
export const getThemeColor = (path: string): string => {
  return path.split('.').reduce((obj, key) => obj[key], tokens.colors as any) || '';
};

export const getThemeValue = (
  category: keyof ThemeTokens,
  path: string
): string => {
  return path.split('.').reduce((obj, key) => obj[key], tokens[category] as any) || '';
};
