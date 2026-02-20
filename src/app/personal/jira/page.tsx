import LogoutButton from '@/components/auth/LogoutButton';
import JiraBoard from '@/components/jira/JiraBoard';

export default function PersonalJiraPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Personal Jira Board</h1>
            <p className="text-gray-400">Track your own tasks with a simple Kanban workflow.</p>
          </div>
          <LogoutButton />
        </div>

        <JiraBoard />
      </div>
    </main>
  );
}
