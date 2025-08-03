/*
Dashboard.js
Mission control dashboard with dense widgets, role-based tasks.
*/
import React from "react";
import { HiOutlineCheckCircle, HiOutlineExclamation, HiOutlineChartBar, HiOutlineDocumentReport } from "react-icons/hi";

const WIDGETS = [
  {
    name: "Pending Reviews",
    count: 5,
    icon: HiOutlineExclamation,
    color: "bg-accent text-white"
  },
  {
    name: "My Open Tasks",
    count: 7,
    icon: HiOutlineCheckCircle,
    color: "bg-primary text-white"
  },
  {
    name: "Active Projects",
    count: 2,
    icon: HiOutlineDocumentReport,
    color: "bg-secondary text-white"
  }
];

const ACTIVITY = [
  { id: 1, desc: "You approved 'Budget 2024 Q1 update'", time: "2h ago" },
  { id: 2, desc: "Data Clerk submitted deliverable for 'Orosanye'", time: "3h ago" },
  { id: 3, desc: "Created new priority: 'Civil Service Reform'", time: "Yesterday" }
];

const Dashboard = ({ user }) => {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight">Mission Control</h1>
        <div className="text-sm text-secondary">Welcome back, {user.name}! Here’s an overview of your workspace.</div>
      </div>
      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {WIDGETS.map((widget) => (
          <div
            key={widget.name}
            className={`rounded-xl p-5 flex items-center space-x-4 shadow bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700`}
          >
            <span className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${widget.color}`}>
              <widget.icon className="w-6 h-6" />
            </span>
            <div>
              <div className="text-2xl font-bold">{widget.count}</div>
              <div className="text-gray-600 dark:text-gray-400">{widget.name}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Role-based tasks */}
      {user.role && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Your Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Reviewer tasks */}
            {user.role === "reviewer" && (
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow space-y-1">
                <div className="font-medium text-primary">Review Project Update: Orosanye</div>
                <div className="text-xs text-gray-500 mb-2">Due today</div>
                <div className="flex space-x-2 text-sm">
                  <a className="text-accent hover:underline" href="/review/orosanye">Review Now</a>
                  <span className="text-gray-400">|</span>
                  <button className="hover:underline text-secondary">Delegate</button>
                </div>
              </div>
            )}
            {/* Data clerk tasks */}
            {user.role === "data_clerk" && (
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow space-y-1">
                <div className="font-medium text-primary">Submit Deliverable: Budget 2024 Q1</div>
                <div className="text-xs text-gray-500 mb-2">Assigned: 2 days ago</div>
                <div className="flex space-x-2 text-sm">
                  <button className="text-accent hover:underline">Upload Now</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Activity stream */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Activity Stream</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl p-0 overflow-hidden shadow">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {ACTIVITY.map(act => (
              <li key={act.id} className="flex items-center justify-between px-4 py-2">
                <span className="truncate">{act.desc}</span>
                <span className="text-xs text-gray-400">{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
