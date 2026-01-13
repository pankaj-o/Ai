"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface QACard {
  _id: string;
  question: string;
  answer: string;
  meaning?: string;
  createdAt: string;
  updatedAt: string;
}

interface QACardListProps {
  onDelete?: (id: string) => void;
}

export default function QACardList({ onDelete }: QACardListProps) {
  const [cards, setCards] = useState<QACard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await fetch(`/api/qa-cards/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete card');
      }

      setCards(cards.filter(card => card._id !== id));
      if (onDelete) {
        onDelete(id);
      }
    } catch (err) {
      alert('Failed to delete card. Please try again.');
      console.error('Error deleting card:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredCards = cards.filter(card => {
    const query = searchQuery.toLowerCase();
    return (
      card.question.toLowerCase().includes(query) ||
      card.answer.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
        <button
          onClick={fetchCards}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search questions or answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Cards List */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {searchQuery ? (
            <>
              <p className="text-lg mb-2">No cards match your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <p className="text-lg mb-4">No Q&A cards yet.</p>
              <Link
                href="/games/qa/new"
                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all"
              >
                Create Your First Card
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCards.map((card) => (
            <div
              key={card._id}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {card.question}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {card.answer}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    href={`/games/qa/${card._id}/edit`}
                    className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(card._id)}
                    disabled={deleteLoading === card._id}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleteLoading === card._id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400"></div>
                    ) : (
                      <TrashIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {cards.length > 0 && (
        <div className="text-sm text-gray-400 text-center pt-4">
          Showing {filteredCards.length} of {cards.length} card{cards.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
