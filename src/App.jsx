import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateBookPage from './pages/CreateBookPage';
import StorySelectPage from './pages/StorySelectPage';
import StoryReaderPage from './pages/StoryReaderPage';
import ColoringPage from './pages/ColoringPage';

// Register service worker for PWA
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // Show an update prompt if needed, or rely on autoUpdate
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateBookPage />} />
        <Route path="/stories" element={<StorySelectPage />} />
        <Route path="/read/:storyId" element={<StoryReaderPage />} />
        <Route path="/color/:storyId/:pageIndex" element={<ColoringPage />} />
      </Routes>
    </Router>
  );
}
