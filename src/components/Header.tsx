"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import LogoutButton from './auth/LogoutButton';

export default function Header() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      // Try to fetch a protected endpoint to check if user is authenticated
      const response = await fetch('/api/qa-cards', {
        method: 'GET',
        credentials: 'include',
      });
      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Don't show button on login/signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      {loading ? (
        <div className="w-20 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
      ) : isAuthenticated ? (
        <div className="flex items-center gap-2">
          <Link
            href="/games/qa/manage"
            className="px-4 py-2 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 rounded-lg transition-all text-sm"
          >
            Q&A Game
          </Link>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg">
            <LogoutButton />
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Login
        </Link>
      )}
    </div>
  );
}
