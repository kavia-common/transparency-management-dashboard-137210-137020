/*
Topbar.js
Fixed top header with global actions: menu (mobile), search, notifications, profile
*/
import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineBell, HiOutlineSearch, HiChevronDown } from "react-icons/hi";
import classNames from "classnames";

const Topbar = ({ user, onMenu }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 flex items-center h-16 bg-white/90 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-800 px-4 z-20 backdrop-blur shadow">
      {/* Hamburger for mobile */}
      <button
        onClick={onMenu}
        className="md:hidden mr-2 p-2 rounded hover:bg-accent/10 outline-none focus:ring-2"
        aria-label="Open sidebar"
      >
        <HiOutlineMenu className="w-6 h-6 text-primary" />
      </button>
      {/* Search */}
      <div className="relative flex-1 max-w-lg mr-4">
        <span className="absolute left-3 top-3 text-secondary">
          <HiOutlineSearch className="w-5 h-5" />
        </span>
        <input
          className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-accent outline-none transition"
          type="search"
          placeholder="Search (Ctrl + K)..."
          aria-label="search"
        />
      </div>
      {/* Actions */}
      <button className="mx-2 p-2 relative hover:bg-accent/10 rounded-lg">
        <HiOutlineBell className="w-6 h-6 text-secondary" />
        <span className="absolute right-1 top-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
      </button>
      {/* Profile dropdown */}
      <div className="ml-2 relative">
        <button
          className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-accent/10"
          onClick={() => setProfileOpen((v) => !v)}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-lg font-bold text-primary">{user.name[0]}</span>
          <span className="hidden md:block font-medium truncate">{user.name}</span>
          <HiChevronDown className="w-4 h-4" />
        </button>
        {profileOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md z-10"
            onBlur={() => setProfileOpen(false)}
            tabIndex={-1}
          >
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-secondary">{user.email}</div>
            </div>
            <button className="w-full text-left px-4 py-2 hover:bg-accent/10">Profile</button>
            <button className="w-full text-left px-4 py-2 hover:bg-accent/10">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
