"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

type IssueStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
type IssuePriority = 'LOW' | 'MEDIUM' | 'HIGH';

interface JiraIssue {
  _id: string;
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  tags: string[];
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

const columns: Array<{ key: IssueStatus; label: string }> = [
  { key: 'TODO', label: 'To Do' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'DONE', label: 'Done' },
];

export default function JiraBoard() {
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [draggedIssueId, setDraggedIssueId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<IssueStatus | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as IssuePriority,
    tags: '',
    dueDate: '',
  });

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/jira-issues');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }

      const data = await response.json();
      setIssues(data.issues || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const groupedIssues = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.key] = issues.filter((issue) => issue.status === column.key);
      return acc;
    }, {} as Record<IssueStatus, JiraIssue[]>);
  }, [issues]);

  const handleCreateIssue = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      setCreating(true);
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const response = await fetch('/api/jira-issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          tags,
          dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create issue');
      }

      const data = await response.json();
      setIssues((prev) => [data.issue, ...prev]);
      setFormData({
        title: '',
        description: '',
        priority: 'MEDIUM',
        tags: '',
        dueDate: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create issue');
    } finally {
      setCreating(false);
    }
  };

  const updateIssue = async (id: string, payload: Partial<JiraIssue>) => {
    try {
      setUpdatingId(id);

      const response = await fetch(`/api/jira-issues/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update issue');
      }

      const data = await response.json();
      setIssues((prev) => prev.map((issue) => (issue._id === id ? data.issue : issue)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update issue');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteIssue = async (id: string) => {
    try {
      setUpdatingId(id);

      const response = await fetch(`/api/jira-issues/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete issue');
      }

      setIssues((prev) => prev.filter((issue) => issue._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDropToColumn = async (status: IssueStatus) => {
    if (!draggedIssueId) {
      return;
    }

    const draggedIssue = issues.find((issue) => issue._id === draggedIssueId);
    if (!draggedIssue) {
      setDraggedIssueId(null);
      setDragOverStatus(null);
      return;
    }

    setDraggedIssueId(null);
    setDragOverStatus(null);

    if (draggedIssue.status === status) {
      return;
    }

    await updateIssue(draggedIssue._id, { status });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreateIssue} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-semibold text-white">Create New Issue</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Issue title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <select
            value={formData.priority}
            onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value as IssuePriority }))}
            className="px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
          </select>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
            className="px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
            className="px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={creating}
          className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60"
        >
          {creating ? 'Creating...' : 'Create Issue'}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-300 rounded-lg p-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-400">Loading issues...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div
              key={column.key}
              className={`bg-gray-900/50 border rounded-xl p-4 transition-colors ${
                dragOverStatus === column.key ? 'border-emerald-500' : 'border-gray-700'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragOverStatus !== column.key) {
                  setDragOverStatus(column.key);
                }
              }}
              onDragLeave={() => {
                if (dragOverStatus === column.key) {
                  setDragOverStatus(null);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDropToColumn(column.key);
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">{column.label}</h3>
              <div className="space-y-3 min-h-28">
                {groupedIssues[column.key].length === 0 ? (
                  <p className="text-sm text-gray-500">No issues</p>
                ) : (
                  groupedIssues[column.key].map((issue) => (
                    <article
                      key={issue._id}
                      draggable
                      onDragStart={() => setDraggedIssueId(issue._id)}
                      onDragEnd={() => {
                        setDraggedIssueId(null);
                        setDragOverStatus(null);
                      }}
                      className={`bg-gray-800/70 border rounded-lg p-3 space-y-3 cursor-grab active:cursor-grabbing ${
                        draggedIssueId === issue._id ? 'border-emerald-500/70 opacity-70' : 'border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-white font-semibold text-sm leading-tight">{issue.title}</h4>
                        <button
                          type="button"
                          onClick={() => deleteIssue(issue._id)}
                          disabled={updatingId === issue._id}
                          className="text-red-300 hover:text-red-200 disabled:opacity-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {issue.description && (
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{issue.description}</p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {issue.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-teal-500/20 text-teal-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={issue.status}
                          onChange={(e) => updateIssue(issue._id, { status: e.target.value as IssueStatus })}
                          className="text-xs px-2 py-1 bg-gray-900 border border-gray-700 rounded text-gray-200"
                          disabled={updatingId === issue._id}
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DONE">Done</option>
                        </select>
                        <select
                          value={issue.priority}
                          onChange={(e) => updateIssue(issue._id, { priority: e.target.value as IssuePriority })}
                          className="text-xs px-2 py-1 bg-gray-900 border border-gray-700 rounded text-gray-200"
                          disabled={updatingId === issue._id}
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                        </select>
                      </div>

                      {issue.dueDate && (
                        <p className="text-xs text-amber-300">
                          Due: {new Date(issue.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </article>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
