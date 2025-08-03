/*
ProjectDetail.js
Displays details for a single project with tabs for priorities, deliverables, indicators, and initiatives.
Implements nested modal workflows for create/edit flows.
*/
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiPlus } from "react-icons/hi";
import ProjectModal from "../components/modals/ProjectModal";

// Stubs for tabs
const TABS = [
  { key: "priorities", label: "Priorities" },
  { key: "deliverables", label: "Deliverables" },
  { key: "indicators", label: "Indicators" },
  { key: "initiatives", label: "Initiatives" }
];

// Example stub data for entries by tab
const MOCK_DATA = {
  priorities: [
    { id: 1, name: "Reduce cost of governance", owner: "Admin", status: "Active" },
    { id: 2, name: "Boost public sector efficiency", owner: "Analyst", status: "Pending" }
  ],
  deliverables: [
    { id: 1, name: "Publish Q1 Report", owner: "Data Clerk", status: "Active" }
  ],
  indicators: [
    { id: 1, name: "Number of Ministries Rationalized", owner: "Analyst", status: "Active" }
  ],
  initiatives: [
    { id: 1, name: "Civil Service Reform Act", owner: "Project Lead", status: "Pending" }
  ]
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(TABS[0].key);
  const [showModal, setShowModal] = useState(false);

  const projectName =
    id === 'fgn'
      ? "FGN Priorities Tracker"
      : id === 'orosanye'
        ? "Orosanye Report"
        : "Project";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-accent/10 hover:bg-accent/20"
          title="Back"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{projectName}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Tab Navigation */}
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                tab === t.key
                  ? "bg-primary text-white shadow"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1"></div>
        {/* New button for current tab */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-3 py-2 rounded bg-accent text-white font-medium shadow"
        >
          <HiPlus className="mr-1" /> New {TABS.find((x) => x.key === tab)?.label}
        </button>
      </div>
      {/* List for selected tab */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Owner</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {(MOCK_DATA[tab] || []).map((entry) => (
              <tr key={entry.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="py-2">{entry.name}</td>
                <td className="py-2">{entry.owner}</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    entry.status === "Active"
                      ? "bg-primary/20 text-primary"
                      : entry.status === "Pending"
                        ? "bg-accent/20 text-accent"
                        : "bg-secondary/20 text-secondary"
                  }`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Empty case */}
        {(!MOCK_DATA[tab] || MOCK_DATA[tab].length === 0) && (
          <div className="py-4 text-gray-400 text-center">No {tab} found.</div>
        )}
      </div>
      {/* Nested modal for create/edit */}
      <ProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        project={null} // You might want to swap for workflow-specific modal
        onSave={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProjectDetail;
