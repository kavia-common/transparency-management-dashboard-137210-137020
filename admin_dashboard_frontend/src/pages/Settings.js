/*
Settings.js
App settings, preferences, and admin controls screen.
*/
import React, { useState } from "react";

const THEMES = ["Auto", "Light", "Dark"];

const Settings = () => {
  const [theme, setTheme] = useState("Auto");
  const [notifEnabled, setNotifEnabled] = useState(true);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      {/* Appearance */}
      <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow p-6 space-y-4">
        <h2 className="font-semibold mb-1 text-lg">Appearance</h2>
        <div className="flex items-center gap-4">
          <div>Theme:</div>
          <div className="flex gap-2">
            {THEMES.map(opt => (
              <button
                key={opt}
                onClick={() => setTheme(opt)}
                className={`px-4 py-1 rounded font-medium border border-gray-200 dark:border-gray-700 ${theme === opt ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Notifications */}
      <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow p-6 space-y-4">
        <h2 className="font-semibold mb-1 text-lg">Notifications</h2>
        <div className="flex items-center gap-3">
          <input
            id="notifenabled"
            type="checkbox"
            checked={notifEnabled}
            onChange={e => setNotifEnabled(e.target.checked)}
            className="accent-accent w-5 h-5"
          />
          <label htmlFor="notifenabled" className="font-medium">
            Enable email notifications for assigned tasks, reviews, and workflow updates
          </label>
        </div>
      </section>
      {/* Danger zone for Admin */}
      <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow p-6">
        <h2 className="font-semibold mb-2 text-lg text-red-600">Danger Zone</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-800 font-medium">
          Reset Application Data (Admin Only)
        </button>
      </section>
    </div>
  );
};

export default Settings;
