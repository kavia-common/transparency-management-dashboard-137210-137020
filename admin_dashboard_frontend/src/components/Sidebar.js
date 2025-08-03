/*
Sidebar.js
Persistent sidebar navigation with collapsible project menu.
*/
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineFolderOpen,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineChevronDown
} from "react-icons/hi";
import classNames from "classnames";

// Static project list
const PROJECTS = [
  { id: "fgn", name: "FGN Priorities Tracker" },
  { id: "orosanye", name: "Orosanye Report" }
];

// Main nav structure
const NAV = [
  { label: "Dashboard", icon: HiOutlineViewGrid, path: "/dashboard" },
  {
    label: "Projects",
    icon: HiOutlineFolderOpen,
    path: "/projects",
    hasChildren: true
  },
  { label: "Users", icon: HiOutlineUsers, path: "/users" },
  { label: "Settings", icon: HiOutlineCog, path: "/settings" }
];

const Sidebar = ({ user, open, onClose }) => {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={classNames(
        "fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-850 border-r border-gray-200 dark:border-gray-700 z-40 flex flex-col select-none transition-transform duration-200 lg:translate-x-0",
        {
          "-translate-x-full": !open,
          "translate-x-0": open,
          "md:translate-x-0": true
        }
      )}
      style={{ transition: "all 0.2s" }}
    >
      {/* Brand */}
      <div className="flex items-center h-16 px-4 font-bold text-xl text-primary border-b border-gray-200 dark:border-gray-800">
        <span className="inline-block w-8 h-8 bg-accent rounded-full mr-2" />
        Admin Dash
      </div>
      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-1">
        {NAV.map((item) =>
          item.label === "Projects" ? (
            <div key={item.label}>
              <button
                className={classNames(
                  "flex items-center w-full px-2 py-2 rounded-lg hover:bg-accent/10 dark:hover:bg-secondary/15 text-gray-800 dark:text-gray-100 font-medium",
                  { "bg-accent/10 dark:bg-secondary/15": projectsOpen }
                )}
                onClick={() => setProjectsOpen((v) => !v)}
                tabIndex={0}
                aria-expanded={projectsOpen}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
                <HiOutlineChevronDown
                  className={classNames("ml-auto transition-transform", {
                    "rotate-180": projectsOpen
                  })}
                />
              </button>
              {/* Collapsible project menu */}
              {projectsOpen && (
                <ul className="ml-7 mt-1 space-y-0.5">
                  {PROJECTS.map((proj) => (
                    <li key={proj.id}>
                      <NavLink
                        to={`/projects/${proj.id}`}
                        className={({ isActive }) =>
                          classNames(
                            "block px-2 py-1 rounded transition font-normal text-sm hover:bg-accent/20 dark:hover:bg-accent/20",
                            {
                              "bg-accent/20 text-primary font-semibold": isActive
                            }
                          )
                        }
                      >
                        {proj.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <NavLink
              end
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  "flex items-center px-2 py-2 rounded-lg hover:bg-accent/10 dark:hover:bg-secondary/15 text-gray-800 dark:text-gray-100 font-medium transition",
                  {
                    "bg-accent/10 text-primary font-semibold": isActive
                  }
                )
              }
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </NavLink>
          )
        )}
      </nav>
      {/* User info (bottom) */}
      <div className="py-4 px-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-lg font-bold text-primary">
          {user.name[0]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="truncate font-semibold">{user.name}</div>
          <div className="truncate text-sm text-gray-500 dark:text-gray-400">
            {user.role.replace("_", " ")}
          </div>
        </div>
      </div>
      {/* Sidebar close button (mobile) */}
      <button
        className="absolute top-3 right-3 md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        onClick={onClose}
        aria-label="Close sidebar"
        style={{ display: open ? "block" : "none" }}
      >
        ×
      </button>
    </aside>
  );
};

export default Sidebar;
