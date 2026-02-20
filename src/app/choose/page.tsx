import Link from 'next/link';
import LogoutButton from '@/components/auth/LogoutButton';

export default function ChooseAppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Choose Where To Go</h1>
            <p className="text-gray-400">Select your workspace for this session.</p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/games/qa/manage"
            className="block rounded-xl border border-gray-700 bg-gray-800/40 p-6 hover:border-emerald-500/60 hover:bg-gray-800/70 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">Q&A Game</h2>
            <p className="text-gray-300">Create cards and play the typing game.</p>
          </Link>

          <Link
            href="/personal/jira"
            className="block rounded-xl border border-gray-700 bg-gray-800/40 p-6 hover:border-emerald-500/60 hover:bg-gray-800/70 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">Personal Jira</h2>
            <p className="text-gray-300">Manage your tasks on the Kanban board.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
