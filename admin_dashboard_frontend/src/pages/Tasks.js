import React from "react";

/**
 * Tasks.js
 * Minimal placeholder for Tasks page to ensure build succeeds.
 * Extend this with proper features as needed.
 */

// PUBLIC_INTERFACE
const Tasks = ({ user }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <h1 className="text-2xl font-bold mb-2">My Tasks</h1>
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow p-6">
      <p className="text-secondary">No tasks available. Task management features coming soon.</p>
    </div>
  </div>
);

export default Tasks;
