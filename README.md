# TakeUForward Calendar

A Simple-to-use interactive wall calendar application built with Next.js, featuring date range selection, notes, holiday markers, and responsive design.

## Features

- **Wall Calendar Aesthetic**: Hero image anchoring with overlay labels and zoom animations
- **Date Range Selection**: Click to select start and end dates with clear visual feedback
- **Integrated Notes**: Add personal notes to individual dates or date ranges
- **User-Defined Holidays**: Right-click on any date to mark/unmark it as a holiday (red background), or use the "Mark as Holiday" button when a single date is selected
- **Theme Switching**: Dynamic theme changes based on month images
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Flip Card Animation**: Interactive day cells with smooth animations
- **Previous/Next Month Dates**: Faded grey dates for context in empty grid spaces
- **Monthly Memos**: General notes for each month
- **Premium UI**: Hover glow, shadow effects, and micro-interactions

## Technology Stack

- **Framework**: Next.js 16.2.3 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **Build Tool**: Turbopack
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calendar-app
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

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
calendar-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Calendar.module.css
│   ├── calendar.tsx
│   ├── DayCell.tsx
│   ├── Header.tsx
│   └── NotesPanel.tsx
├── public/
│   └── images/
├── utils/
│   ├── calendar.ts
│   └── theme.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── vercel.json
└── README.md
```

## Key Components

- **Calendar**: Main calendar component with selection logic and UI
- **DayCell**: Individual day cell with interactive states
- **Header**: Navigation and theme controls
- **NotesPanel**: Note input interface

## Deployment

This app is configured for deployment on Vercel. The `vercel.json` file contains the necessary build settings.

## License

This project is licensed under the MIT License.
