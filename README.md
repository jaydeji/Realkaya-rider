# Realkaya Rider

**Realkaya Rider** is a React Native application for on-demand package delivery, similar to Uber Eats but designed for efficient package and courier management. It leverages Expo for cross-platform compatibility and offers real-time package tracking, booking, and delivery management through a sleek, user-friendly interface.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Build for Production](#build-for-production)

---

## Features

- Real-time package tracking and delivery updates
- Seamless navigation using **React Navigation** and **React Native Maps**
- Integrated Google Places Autocomplete for easy address input
- Built-in support for push notifications and error tracking with Bugsnag
- Optimized for both Android and iOS, with specific builds available for testing and production environments

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** and **npm**
- **Expo CLI**: Install it globally using `npm install -g expo-cli`
- **React Native** setup for either iOS or Android development, or both.

---

## Installation

To set up Realkaya Rider locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jaydeji/Realkaya-rider.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Realkaya-rider
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

---

## Configuration

To improve development and ensure compatibility with **Tailwind CSS** and **Expo**, make the following configurations:

1. **Visual Studio Code Settings (for Tailwind CSS):**

   Open your VS Code settings (`File > Preferences > Settings` or `Ctrl+,`) and add this JSON snippet:

   ```json
   {
     "tailwindCSS.classAttributes": [
       "class",
       "className",
       "textClass",
       "bodyClass"
     ]
   }
   ```

2. **Environment Variables:**

   Use the `.env` file to store sensitive information like API keys. Ensure you have created a `.env` file in the root directory with the necessary configurations. Example:

   ```plaintext
   API_KEY=your_google_maps_api_key
   ```

---

## Usage

To start the app in development mode, use:

```bash
npm start
```

Or directly open it on a specific platform:

- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

The app will open in Expo Go (or a simulator) where you can view live changes as you develop.

---

## Build for Production

Realkaya Rider uses **EAS (Expo Application Services)** for production builds. Commands for different build configurations include:

- **Build for Android**:

  ```bash
  npm run build:a
  ```

- **Preview Android Build**:

  ```bash
  npm run build:a:p
  ```

- **Development Android Build**:

  ```bash
  npm run build:a:d
  ```

These commands will generate optimized builds for deployment on respective platforms.
