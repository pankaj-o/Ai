import QACardForm from '@/components/games/qa/QACardForm';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function QANewPage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">Create New Q&A Card</h1>
          <p className="text-gray-400">Add a new question and answer to your collection</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <QACardForm />
        </div>
      </div>
    </main>
  );
}
