/*
DataGrid.js
Advanced grid with expandable rows, status pills, row actions.
*/
import React, { useState } from "react";
import { HiOutlineChevronRight, HiOutlinePencil, HiOutlineExternalLink } from "react-icons/hi";
import classNames from "classnames";

const STATUS_COLORS = {
  Active: "bg-primary/20 text-primary",
  Pending: "bg-accent/20 text-accent",
  Closed: "bg-secondary/20 text-secondary"
};

const DataGrid = ({ data, onRowClick, onEdit }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-x-auto shadow">
      <table className="min-w-full border-separate border-spacing-y-1">
        <thead>
          <tr className="text-xs uppercase text-gray-500 bg-gray-50 dark:bg-gray-800">
            <th className="p-2 text-left">Project</th>
            <th className="p-2 text-left">Owner</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Priorities</th>
            <th className="p-2 text-left">Last Updated</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <React.Fragment key={row.id}>
              <tr
                className={classNames("bg-white dark:bg-gray-900", {
                  "shadow-inner border-l-4 border-accent": expanded === idx
                })}
              >
                <td className="p-2 whitespace-nowrap">
                  <button
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    className="flex items-center text-primary gap-2"
                  >
                    <HiOutlineChevronRight
                      className={classNames("w-4 h-4 transition-transform", {
                        "rotate-90": expanded === idx
                      })}
                    />
                    <span className="font-semibold">{row.name}</span>
                  </button>
                </td>
                <td className="p-2">{row.owner}</td>
                <td className="p-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${STATUS_COLORS[row.status] || "bg-gray-200"}`}>{row.status}</span>
                </td>
                <td className="p-2">{row.priorities}</td>
                <td className="p-2">{row.lastUpdate}</td>
                <td className="p-2 space-x-2">
                  <button title="Edit" onClick={() => onEdit(row)} className="text-accent hover:text-primary p-1">
                    <HiOutlinePencil className="w-5 h-5" />
                  </button>
                  <a
                    href={`/projects/${row.id}`}
                    className="text-primary hover:underline p-1"
                    title="Open"
                  >
                    <HiOutlineExternalLink className="w-5 h-5" />
                  </a>
                </td>
              </tr>
              {expanded === idx && (
                <tr className="bg-gray-50 dark:bg-gray-800 text-sm">
                  <td colSpan={6} className="p-4 border-t border-gray-100 dark:border-gray-700">
                    {/* Expandable content for project detail preview */}
                    <div>
                      <div>
                        <strong>Description:</strong> This is a stub description for <span className="font-semibold">{row.name}</span> project. More details and quick stats would go here!
                      </div>
                      <div className="mt-2 text-xs space-x-4">
                        <span className="font-mono">{row.status}</span>
                        <span>Last updated: {row.lastUpdate}</span>
                        <span>Priorities: {row.priorities}</span>
                      </div>
                      <div className="mt-2">
                        <button
                          className="bg-accent text-white rounded px-3 py-1 hover:bg-accent/90"
                          onClick={() => onRowClick && onRowClick(row)}
                        >Open Details</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
