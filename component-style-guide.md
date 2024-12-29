# Component Style Guide

## Introduction

This style guide outlines the design and usage specifications for all UI components used in the Medicare LOA Agency Valuation web application. It ensures consistency, accessibility, and efficiency throughout the development process.

---

## Typography

- **Font Family**: [Inter](https://fonts.google.com/specimen/Inter), sans-serif
- **Font Weights**:
  - Regular: 400
  - Medium: 500
  - Semi-bold: 600
  - Bold: 700
- **Headings**:
  - H1: 36px, Bold, Line Height: 44px
  - H2: 30px, Semi-bold, Line Height: 38px
  - H3: 24px, Semi-bold, Line Height: 32px
  - H4: 20px, Medium, Line Height: 28px
  - H5: 18px, Medium, Line Height: 26px
  - H6: 16px, Medium, Line Height: 24px
- **Body Text**: 16px, Regular, Line Height: 24px
- **Caption**: 14px, Regular, Line Height: 20px

---

## Color Palette

### Primary Colors

- **Primary**: `#1E40AF` (Blue 800)
- **Primary Variant**: `#1D4ED8` (Blue 700)
- **On Primary**: `#FFFFFF` (White)

### Secondary Colors

- **Secondary**: `#64748B` (Blue Gray 500)
- **Secondary Variant**: `#475569` (Blue Gray 600)
- **On Secondary**: `#FFFFFF` (White)

### Accent Colors

- **Accent**: `#10B981` (Green 500)
- **On Accent**: `#FFFFFF` (White)

### Neutral Colors

- **Background**: `#F9FAFB` (Gray 50)
- **Surface**: `#FFFFFF` (White)
- **Error**: `#EF4444` (Red 500)
- **On Background/Surface**: `#111827` (Gray 900)
- **On Error**: `#FFFFFF` (White)

---

## Spacing System

- **Base Unit**: 8px
- **Spacing Scale**:
  - 4px (0.5x)
  - 8px (1x)
  - 12px (1.5x)
  - 16px (2x)
  - 24px (3x)
  - 32px (4x)
  - 40px (5x)
  - 48px (6x)

---

## Buttons

### Variants

- **Primary Button**
  - Background Color: Primary (`#1E40AF`)
  - Text Color: On Primary (`#FFFFFF`)
  - Hover State: Darken background by 10%
  - Disabled State: Opacity 50%, no hover effect
- **Secondary Button**
  - Background Color: Secondary (`#64748B`)
  - Text Color: On Secondary (`#FFFFFF`)
  - Hover State: Darken background by 10%
- **Outline Button**
  - Background Color: Transparent
  - Border: 1px solid Primary (`#1E40AF`)
  - Text Color: Primary (`#1E40AF`)
  - Hover State: Background color `#E0E7FF` (Indigo 100)
- **Text Button**
  - Background Color: Transparent
  - Text Color: Primary (`#1E40AF`)
  - Hover State: Underline text

### Sizes

- **Large**
  - Padding: 12px 24px
  - Font Size: 18px
- **Medium**
  - Padding: 8px 16px
  - Font Size: 16px
- **Small**
  - Padding: 4px 12px
  - Font Size: 14px

### Icon Buttons

- Include icons using the [Lucide](https://lucide.dev/) icon set.
- Maintain consistent icon size (24px for medium buttons).

---

## Forms

### Input Fields

- **Text Input**
  - Height: 40px
  - Padding: 8px
  - Border: 1px solid Neutral (`#D1D5DB`, Gray 300)
  - Border Radius: 4px
  - Focus State: Border color Primary (`#1E40AF`), box-shadow 0 0 0 1px Primary
- **Select Dropdown**
  - Same styling as Text Input
  - Include a caret icon on the right

### Labels

- Font Size: 14px
- Font Weight: Medium (500)
- Color: On Background (`#111827`)

### Error Messages

- Font Size: 12px
- Color: Error (`#EF4444`)
- Icon: Include an error icon from Lucide

---

## Cards

- **Background Color**: Surface (`#FFFFFF`)
- **Border**: 1px solid Neutral (`#E5E7EB`, Gray 200)
- **Border Radius**: 8px
- **Shadow**: Small drop shadow for elevation
- **Padding**: 16px (2x base unit)
- **Header**:
  - Font Size: 18px
  - Font Weight: Semi-bold (600)
- **Body**:
  - Font Size: 16px
  - Line Height: 24px

---

## Modals

- **Overlay**: Semi-transparent overlay with color `rgba(17, 24, 39, 0.5)` (Gray 900 at 50% opacity)
- **Content**:
  - Background Color: Surface (`#FFFFFF`)
  - Border Radius: 8px
  - Padding: 24px
  - Max Width: 600px
  - Responsive: Full width on small screens with adequate padding
- **Close Button**:
  - Positioned at the top-right corner
  - Icon Button style using the Close icon from Lucide

---

## Transitions and Animations

- **Button Hover**:
  - Transition: Background color, border color, and box-shadow over 200ms
- **Modals**:
  - Fade-in and slide-up animation over 300ms
- **Accordion Components**:
  - Smooth height transition when expanding/collapsing

---

## Accessibility

- Ensure all components are accessible via keyboard navigation.
- Use semantic HTML elements where appropriate.
- Provide `aria-labels` and `aria-describedby` for interactive elements.
- Maintain a color contrast ratio of at least 4.5:1 for text.

---

## Iconography

- Use [Lucide Icons](https://lucide.dev/) across the application.
- Maintain consistent icon sizes:
  - 24px for standard icons
  - 16px for small contexts like inline text

---

## Usage Guidelines

- **Consistency**: Always use components from this guide to maintain a consistent look and feel.
- **Customization**: When customization is necessary, ensure it aligns with the overall design principles outlined here.
- **Components Composition**: Build complex components by composing smaller, reusable components.

---

## Development Notes

- Components should be developed using React and TypeScript.
- Utilize [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- Leverage CSS variables for theming and color management.
- Document all components with PropTypes or TypeScript interfaces.

---

## Example Code Snippets

### Button Component Usage

```tsx
import { Button } from '../components/ui/button';

function Example() {
  return (
    <>
      <Button variant="primary" size="medium">
        Primary Button
      </Button>
      <Button variant="secondary" size="medium">
        Secondary Button
      </Button>
      <Button variant="outline" size="medium">
        Outline Button
      </Button>
    </>
  );
}
```

---

## References

- **Design System Inspiration**: [Material Design](https://material.io/), [Ant Design](https://ant.design/)
- **Accessibility Guidelines**: [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- **Typography**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
