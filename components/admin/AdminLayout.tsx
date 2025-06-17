import React from 'react';

// AdminLayout: wraps all admin pages and provides navigation
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-100 px-4 py-2 border-b">
        {/* TODO: Add admin navigation links */}
        <span className="font-bold">Admin Dashboard</span>
      </nav>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
