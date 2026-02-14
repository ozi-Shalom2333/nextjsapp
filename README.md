# NomadAI - Professional AI Travel Planner

A next-generation travel planning application that combines the power of DeepSeek AI with immersive Unsplash imagery to create personalized, visually stunning travel itineraries.

## Project Overview

NomadAI is a modern, full-stack web application designed to allow users to generate comprehensive travel guides for any destination. It features a polished, human-centric UI with smooth animations, dark/light mode support, and a responsive design that works seamlessly across devices.

## Key Features

- **AI-Powered Recommendations**: Generates detailed, structured travel itineraries using DeepSeek AI.
- **Immersive Visuals**: dynamically fetches high-resolution, curated images from Unsplash.
- **Interactive UI**: Enhanced with **Framer Motion** for smooth entrances, hover effects, and layout transitions.
- **Theme Support**: Fully integrated **Dark/Light mode** with system preference detection, designed for visual comfort.
- **Responsive Design**: Optimized for everything from mobile phones to large desktop screens.
- **Modern Components**: Built with **Shadcn UI** for a accessible, professional-grade component library.

## Technical Stack

### Core Framework
- **Next.js 16.0.3**: App Router architecture for robust routing and server-side rendering.
- **React 19**: Leveraging the latest React features for efficient UI rendering.
- **Node.js**: Server-side runtime environment.

### Styling & UI
- **Tailwind CSS v4**: Utility-first CSS framework for rapid, responsive styling.
- **Shadcn UI**: Reusable, accessible component components (Buttons, Cards, Dialogs, etc.) built on Radix UI.
- **Framer Motion**: Production-ready animation library for React.
- **Lucide React**: Beautiful, consistent icon set.
- **next-themes**: Seamless theme switching (Light/Dark/System).
- **tw-animate-css**: Tailwind plugin for classical CSS animations.

### AI & Data Services
- **DeepSeek Chat API** (via OpenRouter): Provides intelligent, context-aware travel advice.
- **Unsplash API**: Delivers high-quality, relevant destination photography.

## Getting Started

### Prerequisites
- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nomad-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   # AI Service Configuration (OpenRouter)
   DEEPSEEK_API_KEY=your_openrouter_api_key_here

   # Image Service Configuration (Unsplash)
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with ThemeProvider
│   └── globals.css        # Global styles & Tailwind directives
├── components/
│   ├── ui/                # Shadcn UI components (Button, Card, etc.)
│   ├── TravelBot.js       # Main application logic & interface
│   ├── ImageGallery.js    # Interactive image grid & lightbox
│   ├── mode-toggle.jsx    # Theme switcher component
│   └── theme-provider.jsx # Next-themes provider wrapper
├── hooks/
│   └── useRecommendation.js # Custom hook for API logic
└── lib/
    └── utils.js           # Utility functions (cn, etc.)
```

## Implementation Highlights

- **Theming**: The application uses CSS variables and `next-themes` to support a default light mode that switches gracefully to a refined dark mode. Colors are carefully selected (using `oklch` color space) to ensure readability and aesthetic appeal in all contexts.
- **Animations**: Components utilize `framer-motion` for complex interactions (like the lightbox expansion) and standard CSS transitions for micro-interactions, creating a "alive" feel.
- **Accessibility**: Built on Radix UI primitives ensures keyboard navigation and screen reader support for interactive elements.

## License

This project is licensed under the MIT License.