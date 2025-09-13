import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import ExplorerPage from './pages/ExplorerPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stories/:slug" element={<StoryPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;