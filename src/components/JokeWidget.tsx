'use client';

import React, { useState, useEffect } from 'react';
import { FaLaugh, FaTimes, FaRedo } from 'react-icons/fa';

interface JokeData {
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  category: string;
  safe: boolean;
}

const JokeWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [joke, setJoke] = useState<JokeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch a programming joke (safe for work)
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Joke not available');
      }

      setJoke(data);
    } catch (err) {
      setError('Unable to fetch joke');
      console.error('Joke fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial joke when component mounts
    fetchJoke();
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      if (!joke) {
        fetchJoke();
      }
    }
  };

  const handleNewJoke = () => {
    fetchJoke();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-full shadow-lg hover:from-emerald-400 hover:to-teal-400 hover:scale-105 transition-all duration-300 z-50"
        aria-label="Toggle joke widget"
      >
        <FaLaugh size={20} />
      </button>

      {/* Joke Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <FaLaugh className="text-yellow-400" />
              Daily Joke
            </h3>
            <button
              onClick={handleToggle}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Close joke widget"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Joke Content */}
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button
                  onClick={handleNewJoke}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            ) : joke ? (
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="flex justify-center">
                  <span className="inline-block px-3 py-1 bg-emerald-600/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                    {joke.category}
                  </span>
                </div>

                {/* Joke Text */}
                <div className="text-center">
                  {joke.type === 'single' ? (
                    <p className="text-white text-lg leading-relaxed">{joke.joke}</p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-white text-lg leading-relaxed">{joke.setup}</p>
                      <p className="text-emerald-300 text-lg font-semibold leading-relaxed">{joke.delivery}</p>
                    </div>
                  )}
                </div>

                {/* New Joke Button */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleNewJoke}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-md hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 text-sm"
                  >
                    <FaRedo size={14} />
                    New Joke
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/20 text-center">
            <p className="text-xs text-gray-400">
              Powered by <a href="https://jokeapi.dev/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">JokeAPI</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JokeWidget; 