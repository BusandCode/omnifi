# My Fintech App

My Fintech App is a mobile-first fintech UI built with Expo and React Native. It is currently focused on the frontend experience and provides a polished banking-style interface for exploring account activity, investments, cards, payments, and lifestyle offers.

## What has been implemented

The project already includes a working Expo Router app with a bottom tab navigation structure and the following main screens:

- Home dashboard with balance, account list, quick actions, and recent transactions
- Investment screen with portfolio overview, category cards, watchlist content, and insights
- Cards screen with a card carousel, action shortcuts, recent transactions, and limits
- Pay screen with search, quick payment actions, bills, and recent activity
- Lifestyle screen with offers, rewards, and refer-and-earn content

The UI is organized as reusable feature components under the src/components folder, with shared styling defined in the theme layer.

## Tech stack

- React Native
- Expo SDK 54
- Expo Router
- TypeScript
- React Navigation
- NativeWind / Tailwind CSS
- Ionicons and SVG-based visuals

## Project structure

- app/ - route entry points and tab-based screen files
- app/(tabs)/ - main bottom-tab screens
- src/components/ - reusable UI components grouped by feature area
- src/constants/ - shared constants and tab metadata
- src/theme/ - theme values and color definitions
- assets/ - app images and static assets

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- Expo CLI (optional, but recommended)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

You can then launch the app with:

```bash
npm run android
npm run ios
npm run web
```

## Available scripts

- npm start - Start the Expo development server
- npm run android - Launch the app on Android
- npm run ios - Launch the app on iOS
- npm run web - Launch the app in the browser
- npm run lint - Run lint checks

## Development notes for other contributors

- Keep new screens inside app/ or app/(tabs)/ depending on the navigation pattern.
- Place reusable UI in the appropriate feature folder inside src/components.
- Prefer shared colors and theme values from src/theme instead of hardcoding style values.
- Follow the existing structure of screen components and keep them composable.
- This project is currently UI-focused; backend integration, authentication, real data fetching, and state management are not yet implemented.

## Suggested next steps

- Connect the screens to real API data
- Add global state management such as Zustand or Redux Toolkit
- Implement authentication and protected routes
- Add tests and component-level coverage
- Expand the design system for reusable cards, buttons, and form elements
