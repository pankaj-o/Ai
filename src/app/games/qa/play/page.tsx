"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameSettings, { GameSettings as GameSettingsType } from '@/components/games/qa/GameSettings';
import GamePlay, { GameResults } from '@/components/games/qa/GamePlay';
import GameResultsComponent from '@/components/games/qa/GameResults';
import { QACard } from '@/components/games/qa/QACardList';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function QAPlayPage() {
  const [cards, setCards] = useState<QACard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameResults, setGameResults] = useState<GameResults | null>(null);
  const [settings, setSettings] = useState<GameSettingsType>({
    randomOrder: false,
    strictMode: false,
    ignorePunctuation: false,
    reverseOrder: false,
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/qa-cards');
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in.');
        }
        throw new Error('Failed to fetch cards');
      }

      const data = await response.json();
      setCards(data.cards || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cards');
      console.error('Error fetching cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    if (cards.length === 0) {
      setError('You need at least one card to play. Create some cards first!');
      return;
    }
    setGameStarted(true);
    setGameComplete(false);
    setGameResults(null);
  };

  const handleGameComplete = (results: GameResults) => {
    setGameComplete(true);
    setGameResults(results);
  };

  const handlePlayAgain = () => {
    setGameStarted(false);
    setGameComplete(false);
    setGameResults(null);
  };

  const handleExitGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setGameResults(null);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !gameStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/games/qa/manage"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Manager
          </Link>
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-red-400">
            <p className="font-semibold text-lg mb-2">Error</p>
            <p className="mb-4">{error}</p>
            {error.includes('Unauthorized') ? (
              <p className="text-sm text-gray-400">
                Please implement authentication in <code className="bg-gray-900 px-2 py-1 rounded">src/lib/games/qa/auth.ts</code>
              </p>
            ) : (
              <button
                onClick={fetchCards}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (cards.length === 0 && !gameStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/games/qa/manage"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Manager
          </Link>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">No Cards Available</h1>
            <p className="text-gray-400 mb-6">
              You need to create at least one Q&A card before you can play.
            </p>
            <Link
              href="/games/qa/manage"
              className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all"
            >
              Go to Manager
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {!gameStarted && !gameComplete && (
          <div className="mb-8">
            <Link
              href="/games/qa/manage"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Manager
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">Q&A Typing Game</h1>
            <p className="text-gray-400">Test your knowledge by typing the answers</p>
          </div>
        )}

        {/* Game Setup */}
        {!gameStarted && !gameComplete && (
          <div className="space-y-6">
            <GameSettings settings={settings} onChange={setSettings} />
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <p className="text-white text-lg mb-2">
                  You have <span className="font-bold text-emerald-400">{cards.length}</span> card{cards.length !== 1 ? 's' : ''} ready to play
                </p>
              </div>
              <button
                onClick={handleStartGame}
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all text-lg"
              >
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Game Play */}
        {gameStarted && !gameComplete && (
          <GamePlay
            cards={cards}
            settings={settings}
            onComplete={handleGameComplete}
            onExit={handleExitGame}
          />
        )}

        {/* Game Results */}
        {gameComplete && gameResults && (
          <GameResultsComponent
            results={gameResults}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </main>
  );
}
