# Music Player App

A cross-platform music player built with React Native and Expo, designed for local audio playback, playlist management, and a modern, responsive user interface. This project demonstrates mobile development skills, including file system access, custom audio controls, and dynamic UI updates.

---

## Features

- **Local Audio Library Scanning**

  - Automatically scans the device for `.mp3` files and extracts metadata (title, artist, album art) for a seamless music library experience.

- **Modern Player Interface**

  - Floating mini-player for quick access to playback controls from anywhere in the app.
  - Full player screen with animated backgrounds, track details, and progress bar.
  - ![Floating player and full player transition](assets/gifs/songs_tab.gif)

- **Playlist Management**

  - Create, edit, and delete playlists.
  - Add or remove tracks from playlists via contextual menus.
  - ![Creating and managing playlists](assets/gifs/playlists_tab.gif)

- **Artist and Song Browsing**

  - Browse your library by artist or by all songs.
  - Search and filter functionality for quick navigation.
  - ![Browsing by artist and searching songs](assets/gifs/artists_tab.gif)

- **Queue and Shuffle Controls**

  - Play or shuffle the entire library or any playlist with a single tap.

- **Background Playback & Media Controls**

  - Continue listening to music while the app is in the background.
  - Supports media controls from the lock screen and notification shade (where supported).

- **Persistent State**
  - Uses local storage to persist the music library, playlists, and playback state across app restarts.

---

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

   - Open in a development build, Android emulator, iOS simulator, or Expo Go.

3. **Reset the project (optional)**
   ```bash
   npm run reset-project
   ```

---

## Technical Highlights

- **React Native & Expo**: Leverages Expo for rapid development and deployment.
- **File System Access**: Reads device storage to build a dynamic music library.
- **Custom Audio Engine**: Integrates with `react-native-audio-pro` for advanced playback features.
- **State Management**: Uses local storage and React state for persistence and reactivity.
- **TypeScript**: Ensures type safety and maintainability.

---

## Project Structure

The following tree illustrates the high-level structure of the project:

src/
├── app/ # Main app screens and navigation
├── components/ # Reusable UI components (player, lists, controls)
├── helpers/ # Utility functions and types
├── store/ # State management
├── constants/ # Theme and layout constants
├── hooks/ # Custom React hooks
├── types/ # TypeScript type definitions
└── styles/ # Shared styles

---

## Why This Project?

This app was built as a hands-on opportunity to:

- Explore mobile UI/UX design principles
- Gain experience with native device integration (file system, audio)
- Learn state management and persistence techniques in a real-world context
- Develop modular, maintainable code architecture using modern tools
