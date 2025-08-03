/*
Users.js
User management page with role assignments and actions.
*/
import React, { useState } from "react";
import { HiOutlineUserAdd, HiOutlinePencil } from "react-icons/hi";

// Sample mock user data
const MOCK_USERS = [
  { id: 1, name: "Jane Doe", email: "jane.doe@kavia.ai", role: "Admin", status: "Active" },
  { id: 2, name: "John Smith", email: "john.smith@kavia.ai", role: "Reviewer", status: "Active" },
  { id: 3, name: "Clara Lee", email: "clara.lee@kavia.ai", role: "Data Clerk", status: "Suspended" }
];

const ROLE_COLORS = {
  "Admin": "bg-primary/20 text-primary",
  "Reviewer": "bg-accent/20 text-accent",
  "Data Clerk": "bg-secondary/20 text-secondary"
};

const STATUS_COLORS = {
  "Active": "bg-green-100 text-green-800",
  "Suspended": "bg-red-100 text-red-800"
};

const Users = () => {
  const [users] = useState(MOCK_USERS);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <button className="flex items-center bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded shadow">
          <HiOutlineUserAdd className="mr-2" /> Add User
        </button>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${ROLE_COLORS[user.role] || "bg-gray-200"}`}>{user.role}</span>
                </td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${STATUS_COLORS[user.status] || "bg-gray-200"}`}>{user.status}</span>
                </td>
                <td className="py-2">
                  <button title="Edit" className="text-accent hover:text-primary p-1">
                    <HiOutlinePencil className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Empty state */}
        {users.length === 0 && (
          <div className="py-6 text-gray-400 text-center">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Users;
