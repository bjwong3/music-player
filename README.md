# Music Player App

A cross-platform music player built with React Native and Expo, designed for local audio playback, playlist management, and a modern, responsive user interface. This project demonstrates mobile development skills, including file system access, custom audio controls, and dynamic UI updates.

---

## Features

- **Local Audio Library Scanning**

  - Automatically scans the device for `.mp3` files and extracts metadata (title, artist, album art) for a seamless music library experience.

- **Modern Player Interface**

  - Floating mini-player for quick access to playback controls from anywhere in the app.
  - Full player screen with animated backgrounds, track details, and progress bar.  
    <img src="https://github.com/bjwong3/music-player/blob/master/assets/gifs/songs_tab.gif" width="300">

- **Playlist Management**

  - Create, edit, and delete playlists.
  - Add or remove tracks from playlists via contextual menus.  
    <img src="https://github.com/bjwong3/music-player/blob/master/assets/gifs/playlists_tab.gif" width="300">

- **Artist and Song Browsing**

  - Browse your library by artist or by all songs.
  - Search and filter functionality for quick navigation.  
    <img src="https://github.com/bjwong3/music-player/blob/master/assets/gifs/artists_tab.gif" width="300">

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

---

## Technical Highlights

- **React Native & Expo**: Leverages Expo for rapid development and deployment.
- **File System Access**: Reads device storage to build a dynamic music library.
- **Custom Audio Engine**: Integrates with `react-native-audio-pro` for advanced playback features.
- **State Management**: Uses local storage and React state for persistence and reactivity.
- **TypeScript**: Ensures type safety and maintainability.

---

## Project Structure

```
src/
├── app/         # Main app screens and navigation
├── components/  # Reusable UI components (player, lists, controls)
├── constants/   # Theme and layout constants
├── helpers/     # Utility functions and types
├── hooks/       # Custom React hooks
├── store/       # State management
├── styles/      # Shared styles
└── types/       # TypeScript type definitions
```

---

## Why This Project?

This app was built as a hands-on opportunity to:

- Explore mobile UI/UX design principles
- Gain experience with native device integration (file system, audio)
- Learn state management and persistence techniques in a real-world context
- Develop modular, maintainable code architecture using modern tools
