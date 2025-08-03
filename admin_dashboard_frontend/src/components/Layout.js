/*
Layout.js
Wraps main app UI with persistent sidebar, topbar, and mobile/desktop support.
*/
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar controls for responsive layouts
  const toggleSidebar = () => setSidebarOpen((v) => !v);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user} onMenu={toggleSidebar} />
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
