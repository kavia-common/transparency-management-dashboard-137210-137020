/*
ProjectModal.js
Nested modal workflow for project create/edit. Uses HeadlessUI Dialog.
*/
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

const defaultForm = { name: "", owner: "", status: "Active", priorities: 1 };

const ProjectModal = ({ show, onClose, project, onSave }) => {
  const [form, setForm] = useState(project || defaultForm);

  useEffect(() => {
    setForm(project || defaultForm);
  }, [project, show]);

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={!!show} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
      <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <Dialog.Title className="font-bold text-lg mb-4">{project ? "Edit Project" : "New Project"}</Dialog.Title>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              required
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Owner</label>
            <input
              required
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              value={form.owner}
              onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Priorities</label>
            <input
              type="number"
              min={1}
              className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              value={form.priorities}
              onChange={e => setForm(f => ({ ...f, priorities: parseInt(e.target.value, 10) }))}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700"
            >Cancel</button>
            <button
              type="submit"
              className="px-4 py-1 rounded bg-primary text-white"
            >{project ? "Update" : "Create"}</button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ProjectModal;
