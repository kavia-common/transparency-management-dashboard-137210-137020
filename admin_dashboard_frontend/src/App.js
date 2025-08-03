/*
App.js
Root of the admin dashboard: includes sidebar, topbar, routes, and global modals
*/
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ReviewApproval from "./pages/ReviewApproval";
import Tasks from "./pages/Tasks";

// Mock user for role-based widgets
const FAKE_USER = {
  name: "Jane Doe",
  email: "jane.doe@kavia.ai",
  role: "reviewer" // or "data_clerk" or "admin"
};

// PUBLIC_INTERFACE
function App() {
  // Theme auto
  useEffect(() => {
    const cls = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', cls === 'dark');
  }, []);

  return (
    <Router>
      <Layout user={FAKE_USER}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard user={FAKE_USER} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id/*" element={<ProjectDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/review/:id" element={<ReviewApproval />} />
          <Route path="/tasks" element={<Tasks user={FAKE_USER} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
