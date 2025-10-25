# LAID FIBA Engine - Fraud Detection Dashboard

A modern React + TypeScript dashboard for SASSA fraud detection, built with a dark theme and real-time updates.

## Features

- **Real-time Dashboard**: Auto-updating stats and alerts every 3 seconds
- **Live Alert Feed**: Scrollable list of fraud alerts with severity indicators
- **Risk Visualization**: Interactive scatter plot showing transaction risk distribution
- **Modern UI**: Dark theme with Tailwind CSS and Lucide icons
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## Dashboard Components

### Header
- LAID FIBA Engine logo and title
- Live system status indicator (Online/Offline)

### Stats Cards
- **Alerts Today**: Number of fraud alerts detected
- **Risk Score**: Current system risk level (0-100)
- **Fraud Prevented**: Amount saved in ZAR currency
- **Active Cases**: Number of ongoing investigations

### Live Alert Feed
- Real-time fraud alerts with severity colors
- Alert type, timestamp, and risk score
- "Investigate" button for each alert
- Auto-scrolling with latest alerts at top

### Risk Visualization
- Interactive scatter plot showing transaction risk distribution
- X-axis: Transaction Volume
- Y-axis: Risk Level
- Tooltips with detailed information

## Mock Data

The dashboard uses simulated data that updates every 3 seconds:
- Random fraud alerts with different severity levels
- Fluctuating risk scores and statistics
- Dynamic scatter plot data points
- Occasional system status changes

## Styling

- Dark theme with custom color palette
- Modern card-based layout
- Responsive grid system
- Smooth transitions and hover effects
- Professional SASSA fraud detection interface

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.