import Link from 'next/link';
import QACardList from '@/components/games/qa/QACardList';
import LogoutButton from '@/components/auth/LogoutButton';
import { PlusIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function QAManagePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Q&A Card Manager</h1>
            <p className="text-gray-400">Create and manage your Q&A cards for the typing game</p>
          </div>
          <LogoutButton />
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <Link
            href="/games/qa/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Card
          </Link>
          <Link
            href="/games/qa/play"
            className="flex items-center gap-2 px-6 py-3 border-2 border-emerald-500 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-500/10 transition-all"
          >
            <PlayIcon className="h-5 w-5" />
            Play Game
          </Link>
        </div>

        {/* Cards List */}
        <QACardList />
      </div>
    </main>
  );
}
