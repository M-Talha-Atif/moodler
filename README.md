# Moodler - Mood Tracking & Experience Booking App

A React Native mobile application for tracking daily moods and booking wellness experiences, built with Expo.

## Key Features

### User Features
- **Daily Mood Check-In**: Record mood with emotion selection, notes, photos, and voice recordings
- **Mood Tracking**: Track emotional patterns with sentiment analysis
- **Experience Discovery**: Browse and search wellness experiences (virtual & in-person)
- **Booking Management**: Book experiences, view booking details, and manage reservations
- **Insights & Analytics**: View mood trends and personal insights with charts
- **Profile Management**: Edit profile, password, and privacy settings
- **Notifications**: Real-time notifications for bookings and updates

### Host Features
- **Experience Hosting**: Create, edit, and manage wellness experiences
- **Booking Analytics**: View booking trends and statistics with charts
- **Experience Management**: Handle multiple experiences with filtering and search
- **Profile Management**: Host-specific profile and settings

### Core Functionality
- **Role-Based Access**: Separate flows for users and hosts
- **Authentication**: Secure login/signup with token refresh
- **Onboarding**: Guided onboarding flow for new users
- **Privacy & Security**: End-to-end encryption for sensitive data

## Tech Stack

### Core Framework
- **React Native** `0.81.4` - Cross-platform mobile framework
- **Expo** `~54.0.10` - Development platform and tooling
- **Expo Router** `^6.0.10` - File-based routing system

### State Management & Data Fetching
- **Zustand** `^5.0.8` - Lightweight state management (auth store, daily check-in store)
- **TanStack Query** `^5.90.9` - Server state management and data fetching

### UI & Styling
- **NativeWind** `^4.2.1` - Tailwind CSS for React Native
- **Tailwind CSS** `^3.3.2` - Utility-first CSS framework
- **React Native Reanimated** `~4.1.1` - Animation library
- **Moti** `^0.30.0` - Declarative animations
- **React Native Gifted Charts** `^1.3.27` - Charting library

### Forms & Validation
- **React Hook Form** `^7.64.0` - Form state management
- **Zod** `^3.25.76` - Schema validation
- **@hookform/resolvers** `^5.2.2` - Form validation resolvers

### Navigation
- **React Navigation** - Navigation library
  - `@react-navigation/native` `^7.1.17`
  - `@react-navigation/bottom-tabs` `^7.4.7`
  - `@react-navigation/stack` `^7.4.8`

### API & Storage
- **Axios** `^1.12.2` - HTTP client with interceptors for token refresh
- **AsyncStorage** `2.2.0` - Async key-value storage
- **Expo Secure Store** `~15.0.7` - Secure credential storage

### Expo Modules
- **expo-image** `~3.0.8` - Image component
- **expo-image-picker** `~17.0.8` - Image picker
- **expo-av** `~16.0.7` - Audio/video recording
- **expo-haptics** `~15.0.7` - Haptic feedback
- **expo-font** `~14.0.8` - Custom fonts (Nunito, Poppins, Inter)
- **expo-splash-screen** `~31.0.10` - Splash screen management

### UI Components
- **@gorhom/bottom-sheet** `^5.2.6` - Bottom sheet modals
- **React Native Modal** `^14.0.0-rc.1` - Modal components
- **React Native Paper** `^5.14.5` - Material Design components
- **Lucide React Native** `^0.544.0` - Icon library
- **React Native Toast Message** `^2.3.3` - Toast notifications

### Utilities
- **date-fns** `^4.1.0` - Date manipulation
- **dayjs** `^1.11.18` - Date parsing and formatting
- **lodash** `^4.17.21` - Utility functions

### Development Tools
- **TypeScript** `~5.9.2` - Type safety
- **ESLint** `^9.25.0` - Code linting
- **Babel** - JavaScript compiler

## Project Structure

```
moodler/
├── app/                    # Expo Router file-based routes
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── (user)/        # User tab screens
│   │   └── (host)/        # Host tab screens
│   └── onboarding/        # Onboarding flow
├── modules/               # Feature modules
│   ├── auth/             # Authentication
│   ├── dailyCheckIn/     # Daily mood check-in
│   ├── user/             # User features
│   │   ├── bookings/     # Booking management
│   │   ├── experiences/  # Experience browsing
│   │   ├── explore/      # Experience discovery
│   │   ├── home/         # Home dashboard
│   │   ├── insights/     # Mood insights
│   │   ├── notifications/# Notifications
│   │   └── profile/      # User profile
│   ├── host/             # Host features
│   │   ├── experiences/  # Experience hosting
│   │   ├── home/         # Host dashboard
│   │   └── profile/      # Host profile
│   └── onboarding/       # Onboarding logic
├── store/                 # Zustand stores
├── services/              # API services
├── components/            # Shared UI components
└── constants/             # App constants
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on platform**
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

## Architecture Highlights

- **File-based routing** with Expo Router for type-safe navigation
- **Modular architecture** with feature-based module structure
- **State management** split between Zustand (client state) and TanStack Query (server state)
- **Token refresh** implemented via Axios interceptors
- **Role-based routing** with separate user and host flows
- **Form validation** using React Hook Form + Zod schemas
