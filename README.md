# BJJ Positional Routes - Master Plan Basics

An interactive Next.js application demonstrating Brazilian Jiu-Jitsu positional route progressions with mobile-optimized visualization and progressive enhancement.

## 🥋 Features

- **Interactive Route Visualization**: Explore 5 distinct BJJ positional routes with clickable position nodes
- **Mobile-First Design**: Touch-optimized interactions with responsive layout
- **Progressive Enhancement**: Graceful degradation across device capabilities
- **Accessibility Compliant**: WCAG 2.1 AA standards with full keyboard navigation and screen reader support
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **TypeScript**: Fully typed codebase with strict mode enabled

## 🏗️ Architecture

### Routes Included

1. **The Short Route** - 4 positions: Striking → Takedown → Turtle → Back Mount
2. **The Meat Grinder** - 6 positions: Extended sequence including guard and side mount
3. **The Mount Grinder A** - Branching paths to RFC and Leglock options
4. **The Mount Grinder B** - Alternative mount route with different leglock variations
5. **Attacking The Legs** - Specialized route focusing on leg attack sequences

### Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: Tailwind CSS 3+ with custom design system
- **Animation**: Framer Motion for smooth transitions
- **State**: React Context and hooks for route progress
- **Code Quality**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd positional-routes-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette

Each position type has semantic colors that maintain consistency across all routes:

- **Striking**: Pink/Magenta (`#E91E63`)
- **Takedown**: Red (`#D32F2F`)
- **Guard**: Brown (`#6D4C41`)
- **Mount**: Green (`#2E7D32`)
- **Side Mount**: Blue (`#1976D2`)
- **Turtle**: Orange (`#F57C00`)
- **Back Mount**: Deep Orange (`#E64A19`)
- **Leglock**: Purple (`#7B1FA2`)
- **RFC**: Teal (`#0097A7`)

### Typography

- **Display Font**: Bebas Neue (route titles, headings)
- **Interface Font**: Inter (UI elements, body text)
- **Monospace**: JetBrains Mono (technical annotations)

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliance**: High contrast ratios and proper focus management
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Screen Reader Support**: Comprehensive ARIA implementation and semantic HTML
- **Touch Targets**: Minimum 44px touch targets for mobile usability
- **Reduced Motion**: Respects user's motion preferences

## 📱 Mobile Optimization

- **Touch Gestures**: Optimized for touch interactions
- **Responsive Design**: Fluid layout adaptation across viewport sizes
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Performance**: Optimized for mobile networks with code splitting

## 🧪 Component Architecture

### Core Components

- `RouteSelector` - Homepage with route cards
- `RouteVisualization` - Interactive SVG-based route rendering
- `AnimatedPositionNode` - Individual position with touch interactions
- `AnimatedFlowConnector` - Animated arrows showing route flow

### Data Structure

```typescript
interface RouteDefinition {
  id: string
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  positions: PositionDefinition[]
  connections: ConnectionDefinition[]
  startPosition: string
  endPositions: string[]
  metadata: RouteMetadata
}
```

## 🎯 Performance

- **Bundle Size**: <150KB initial load, <50KB per route
- **Core Web Vitals**: Optimized for LCP <2.5s, FID <100ms, CLS <0.1
- **Code Splitting**: Separate bundles per route for faster loading
- **Lazy Loading**: Position details loaded on demand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by JV Jiu-Jitsu Master Plan Basics
- Built with modern web technologies and accessibility best practices
- Designed for the BJJ community to enhance learning and understanding