"use client";

import { useState, useEffect, FormEvent } from 'react';
import { checkAnswer, AnswerCheckOptions } from '@/lib/games/qa/answer-checker';
import { GameSettings } from './GameSettings';

export interface QACard {
  _id: string;
  question: string;
  answer: string;
  meaning?: string;
}

interface GamePlayProps {
  cards: QACard[];
  settings: GameSettings;
  onComplete: (results: GameResults) => void;
  onExit?: () => void;
}

export interface GameResults {
  total: number;
  correct: number;
  incorrect: number;
  streak: number;
  attempts: Array<{
    cardId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
}

export default function GamePlay({ cards, settings, onComplete, onExit }: GamePlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [displayedCorrectAnswer, setDisplayedCorrectAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0, streak: 0, maxStreak: 0 });
  const [attempts, setAttempts] = useState<GameResults['attempts']>([]);
  const [submitting, setSubmitting] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<QACard[]>([]);

  useEffect(() => {
    // Shuffle cards if random order is enabled
    if (settings.randomOrder) {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    } else {
      setShuffledCards(cards);
    }
  }, [cards, settings.randomOrder]);

  const currentCard = shuffledCards[currentIndex];

  // Determine what to show as question and what to check as answer based on reverseOrder
  const displayQuestion = currentCard ? (settings.reverseOrder ? currentCard.answer : currentCard.question) : '';
  const correctAnswerValue = currentCard ? (settings.reverseOrder ? currentCard.question : currentCard.answer) : '';
  const displayMeaning = currentCard?.meaning;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!currentCard || submitting) return;

    setSubmitting(true);

    // Check answer (compare user input against the correct answer)
    const options: AnswerCheckOptions = {
      trimWhitespace: true,
      caseSensitive: settings.strictMode,
      ignoreExtraSpaces: true,
      ignorePunctuation: settings.ignorePunctuation,
    };

    const result = checkAnswer(userAnswer, correctAnswerValue, options);
    
    setIsCorrect(result.isCorrect);
    setDisplayedCorrectAnswer(correctAnswerValue);
    setShowFeedback(true);

    // Update score
    const newCorrect = result.isCorrect ? score.correct + 1 : score.correct;
    const newTotal = score.total + 1;
    const newStreak = result.isCorrect ? score.streak + 1 : 0;
    const newMaxStreak = Math.max(score.maxStreak, newStreak);

    setScore({
      correct: newCorrect,
      total: newTotal,
      streak: newStreak,
      maxStreak: newMaxStreak,
    });

    // Record attempt
    setAttempts([
      ...attempts,
      {
        cardId: currentCard._id,
        question: displayQuestion,
        userAnswer: userAnswer.trim(),
        correctAnswer: correctAnswerValue,
        isCorrect: result.isCorrect,
      },
    ]);

    setSubmitting(false);
  };

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      // Game complete
      onComplete({
        total: score.total + 1,
        correct: isCorrect ? score.correct + 1 : score.correct,
        incorrect: isCorrect ? score.total - score.correct : score.total - score.correct + 1,
        streak: score.maxStreak,
        attempts: [
          ...attempts,
          {
            cardId: currentCard._id,
            question: displayQuestion,
            userAnswer: userAnswer.trim(),
            correctAnswer: correctAnswerValue,
            isCorrect,
          },
        ],
      });
    }
  };

  if (shuffledCards.length === 0) {
    return null;
  }

  const progress = ((currentIndex + (showFeedback ? 1 : 0)) / shuffledCards.length) * 100;

  const handleExit = () => {
    if (confirm('Are you sure you want to exit the game? Your progress will be lost.')) {
      if (onExit) {
        onExit();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Exit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleExit}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Exit Game
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{score.correct}</div>
          <div className="text-sm text-gray-400">Correct</div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{score.total}</div>
          <div className="text-sm text-gray-400">Total</div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-teal-400">{score.streak}</div>
          <div className="text-sm text-gray-400">Streak</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
        <div className="text-sm text-gray-400 mb-2">
          Question {currentIndex + 1} of {shuffledCards.length}
          {settings.reverseOrder && (
            <span className="ml-2 text-emerald-400">(Reverse Mode)</span>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">
          {displayQuestion}
        </h2>
        {displayMeaning && (
          <p className="text-gray-400 text-sm mb-6 italic">
            {displayMeaning}
          </p>
        )}

        {!showFeedback ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={!userAnswer.trim() || submitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Checking...' : 'Submit Answer'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border-2 ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                  : 'bg-red-500/10 border-red-500 text-red-400'
              }`}
            >
              <div className="font-semibold text-lg mb-2">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              {!isCorrect && (
                <div className="mt-2">
                  <div className="text-sm text-gray-400 mb-1">Your answer:</div>
                  <div className="text-white">{userAnswer.trim() || '(empty)'}</div>
                  <div className="text-sm text-gray-400 mb-1 mt-3">Correct answer:</div>
                  <div className="text-white">{displayedCorrectAnswer}</div>
                </div>
              )}
            </div>
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all"
            >
              {currentIndex < shuffledCards.length - 1 ? 'Next Question' : 'Finish Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
