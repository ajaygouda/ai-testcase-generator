# Vation.ai Dashboard

A modern AI-powered test automation dashboard built with Next.js and Tailwind CSS.

## Features

- 📊 Real-time metrics and analytics
- 🤖 AI Agent integration for test case generation
- 📋 Execution logs and monitoring
- 🎯 Clean, modern dark theme UI
- ⚡ Fast and responsive interface

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vation-ai-dashboard
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with sidebar
│   ├── page.tsx         # Dashboard page
│   └── globals.css      # Global styles and theme
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── MetricCard.tsx   # Metric display component
│   ├── ExecutionLogs.tsx # Execution logs widget
│   ├── ChatWidget.tsx   # AI chat interface
│   ├── NeeTimeWidget.tsx # Time tracking widget
│   └── Chart.tsx        # Chart placeholder
public/                  # Static assets
tailwind.config.ts       # Tailwind configuration
postcss.config.js        # PostCSS configuration
tsconfig.json           # TypeScript configuration
```

## License

MIT
