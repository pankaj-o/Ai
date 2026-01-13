"use client";

import { GameResults as GameResultsType } from './GamePlay';
import Link from 'next/link';

interface GameResultsProps {
  results: GameResultsType;
  onPlayAgain: () => void;
}

export default function GameResults({ results, onPlayAgain }: GameResultsProps) {
  const percentage = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Game Complete!</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-emerald-400">{results.correct}</div>
            <div className="text-sm text-gray-400">Correct</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-400">{results.incorrect}</div>
            <div className="text-sm text-gray-400">Incorrect</div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="text-4xl font-bold text-white">{percentage}%</div>
          <div className="text-gray-400">Accuracy</div>
        </div>

        {results.streak > 0 && (
          <div className="bg-teal-500/10 border border-teal-500/50 rounded-lg p-4 mb-6">
            <div className="text-2xl font-bold text-teal-400">🔥 {results.streak}</div>
            <div className="text-sm text-gray-400">Best Streak</div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all"
          >
            Play Again
          </button>
          <Link
            href="/games/qa/manage"
            className="px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-all"
          >
            Manage Cards
          </Link>
        </div>
      </div>

      {/* Attempts Summary */}
      {results.attempts.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Review Your Answers</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.attempts.map((attempt, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  attempt.isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-red-500/10 border-red-500/50'
                }`}
              >
                <div className="text-sm text-gray-400 mb-1">Question {index + 1}</div>
                <div className="text-white font-medium mb-2">{attempt.question}</div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="text-gray-400">Your answer: </span>
                    <span className={attempt.isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                      {attempt.userAnswer || '(empty)'}
                    </span>
                  </div>
                  {!attempt.isCorrect && (
                    <div>
                      <span className="text-gray-400">Correct: </span>
                      <span className="text-white">{attempt.correctAnswer}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
