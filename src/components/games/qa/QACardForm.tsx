"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export interface QACardFormData {
  question: string;
  answer: string;
  meaning?: string;
}

interface QACardFormProps {
  initialData?: QACardFormData;
  cardId?: string;
  onCancel?: () => void;
}

export default function QACardForm({ initialData, cardId, onCancel }: QACardFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<QACardFormData>(
    initialData || { question: '', answer: '', meaning: '' }
  );
  const [errors, setErrors] = useState<{ question?: string; answer?: string; meaning?: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: { question?: string; answer?: string; meaning?: string } = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    } else if (formData.question.length > 5000) {
      newErrors.question = 'Question must be 5000 characters or less';
    }

    if (!formData.answer.trim()) {
      newErrors.answer = 'Answer is required';
    } else if (formData.answer.length > 5000) {
      newErrors.answer = 'Answer must be 5000 characters or less';
    }

    if (formData.meaning && formData.meaning.length > 5000) {
      newErrors.meaning = 'Meaning must be 5000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const url = cardId ? `/api/qa-cards/${cardId}` : '/api/qa-cards';
      const method = cardId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Failed to save card (${response.status})`;
        
        // Add more context for common errors
        if (response.status === 401) {
          throw new Error('Unauthorized. Please check your authentication setup.');
        } else if (response.status === 400 && errorData.details) {
          throw new Error(`Validation error: ${errorData.details.map((d: any) => d.message).join(', ')}`);
        } else if (response.status === 500) {
          throw new Error(errorMessage + ' Check your MongoDB connection and server logs.');
        }
        
        throw new Error(errorMessage);
      }

      // Redirect to manage page on success
      router.push('/games/qa/manage');
      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save card');
      console.error('Error saving card:', err);
    } finally {
      setLoading(false);
    }
  };

  const questionCharCount = formData.question.length;
  const answerCharCount = formData.answer.length;
  const meaningCharCount = (formData.meaning || '').length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
          {submitError}
        </div>
      )}

      {/* Question Field */}
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
          Question *
        </label>
        <textarea
          id="question"
          value={formData.question}
          onChange={(e) => {
            setFormData({ ...formData, question: e.target.value });
            if (errors.question) {
              setErrors({ ...errors, question: undefined });
            }
          }}
          rows={4}
          maxLength={5000}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors.question
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-emerald-500'
          }`}
          placeholder="Enter your question..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.question && (
            <span className="text-sm text-red-400">{errors.question}</span>
          )}
          <span className={`text-sm ml-auto ${questionCharCount > 4800 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {questionCharCount} / 5000
          </span>
        </div>
      </div>

      {/* Answer Field */}
      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-2">
          Answer *
        </label>
        <textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => {
            setFormData({ ...formData, answer: e.target.value });
            if (errors.answer) {
              setErrors({ ...errors, answer: undefined });
            }
          }}
          rows={4}
          maxLength={5000}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors.answer
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-emerald-500'
          }`}
          placeholder="Enter the correct answer..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.answer && (
            <span className="text-sm text-red-400">{errors.answer}</span>
          )}
          <span className={`text-sm ml-auto ${answerCharCount > 4800 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {answerCharCount} / 5000
          </span>
        </div>
      </div>

      {/* Meaning Field */}
      <div>
        <label htmlFor="meaning" className="block text-sm font-medium text-gray-300 mb-2">
          Question Meaning <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <textarea
          id="meaning"
          value={formData.meaning || ''}
          onChange={(e) => {
            setFormData({ ...formData, meaning: e.target.value });
            if (errors.meaning) {
              setErrors({ ...errors, meaning: undefined });
            }
          }}
          rows={3}
          maxLength={5000}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors.meaning
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-emerald-500'
          }`}
          placeholder="Enter the meaning or explanation of the question (optional)..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.meaning && (
            <span className="text-sm text-red-400">{errors.meaning}</span>
          )}
          <span className={`text-sm ml-auto ${meaningCharCount > 4800 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {meaningCharCount} / 5000
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : cardId ? 'Update Card' : 'Create Card'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (onCancel) {
              onCancel();
            } else {
              router.push('/games/qa/manage');
            }
          }}
          disabled={loading}
          className="px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
