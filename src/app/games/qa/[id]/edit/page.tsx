"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QACardForm from '@/components/games/qa/QACardForm';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function QAEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [card, setCard] = useState<{ question: string; answer: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id: cardId }) => {
      setId(cardId);
      fetchCard(cardId);
    });
  }, [params]);

  const fetchCard = async (cardId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/qa-cards/${cardId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Card not found');
        } else if (response.status === 401) {
          setError('Unauthorized. Please log in.');
        } else {
          setError('Failed to load card');
        }
        return;
      }

      const data = await response.json();
      setCard(data.card);
    } catch (err) {
      setError('Failed to load card');
      console.error('Error fetching card:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !card || !id) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/games/qa/manage"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Manager
          </Link>
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-red-400">
            <p className="font-semibold text-lg mb-2">Error</p>
            <p className="mb-4">{error || 'Card not found'}</p>
            <button
              onClick={() => router.push('/games/qa/manage')}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
            >
              Back to Manager
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/games/qa/manage"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Manager
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Edit Q&A Card</h1>
          <p className="text-gray-400">Update your question and answer</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <QACardForm
            initialData={{
              question: card.question,
              answer: card.answer,
              meaning: card.meaning,
            }}
            cardId={id}
          />
        </div>
      </div>
    </main>
  );
}
