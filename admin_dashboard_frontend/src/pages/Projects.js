/*
Projects.js
Projects overview page with advanced data grid: expandable rows, status, filters.
*/
import React, { useState } from "react";
import DataGrid from "../components/DataGrid";
import ProjectModal from "../components/modals/ProjectModal";
import { HiPlus } from "react-icons/hi";

// Mock project data
const MOCK_PROJECTS = [
  {
    id: "fgn",
    name: "FGN Priorities Tracker",
    owner: "Federal Government",
    status: "Active",
    lastUpdate: "2024-02-10",
    priorities: 4
  },
  {
    id: "orosanye",
    name: "Orosanye Report",
    owner: "Civil Service Reform",
    status: "Pending",
    lastUpdate: "2024-01-20",
    priorities: 3
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  // Filtering example
  const [filter, setFilter] = useState("");

  const filteredProjects = projects.filter(
    (p) => !filter || p.status.toLowerCase() === filter
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => { setShowModal(true); setSelected(null); }}
          className="flex items-center bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded shadow"
        >
          <HiPlus className="mr-2" />
          New Project
        </button>
      </div>
      {/* Filters */}
      <div className="flex gap-2 items-center mb-4">
        <span>Status filter:</span>
        <button
          className={`px-3 py-1 rounded ${!filter ? "bg-secondary text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("")}
        >All</button>
        <button
          className={`px-3 py-1 rounded ${filter === "active" ? "bg-secondary text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("active")}
        >Active</button>
        <button
          className={`px-3 py-1 rounded ${filter === "pending" ? "bg-secondary text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("pending")}
        >Pending</button>
      </div>
      {/* Data grid */}
      <DataGrid
        data={filteredProjects}
        onRowClick={proj => setSelected(proj)}
        onEdit={proj => { setShowModal(true); setSelected(proj); }}
      />
      {/* Project modal */}
      <ProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        project={selected}
        onSave={p => {
          setShowModal(false);
          if (selected) {
            setProjects(projects.map(pr => pr.id === p.id ? p : pr));
          } else {
            setProjects([...projects, { ...p, id: `proj-${projects.length+1}` }]);
          }
        }}
      />
    </div>
  );
};

export default Projects;
