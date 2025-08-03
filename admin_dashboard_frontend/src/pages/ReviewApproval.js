/*
ReviewApproval.js
Review & approval screen with rich diff view and decision actions.
*/
import React, { useState } from "react";
import DiffViewer from "react-diff-viewer-continued";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlinePencilAlt } from "react-icons/hi";

// Example mock: previous and proposed project update
const OLD_TEXT = `{
  "priority": "Reduce cost of governance",
  "owner": "Civil Service Bureau",
  "status": "Pending",
  "notes": "Initial submission"
}`;
const NEW_TEXT = `{
  "priority": "Reduce cost of governance and enhance transparency",
  "owner": "Civil Service Bureau",
  "status": "Active",
  "notes": "Suggest increasing reporting frequency"
}`;

const ReviewApproval = () => {
  const [decision, setDecision] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = () => setDecision("approved");
  const handleReject = () => setDecision("rejected");
  const handleEdit = () => setDecision("edit");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-2">Review Update</h1>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-3">Change Details</h2>
        {/* Diff viewer */}
        <DiffViewer
          oldValue={OLD_TEXT}
          newValue={NEW_TEXT}
          splitView={true}
          useDarkTheme={false}
          styles={{
            diffContainer: { fontSize: 14, borderRadius: 8 }
          }}
        />
        {/* Decision Actions */}
        {decision === null && (
          <div className="flex gap-3 mt-6">
            <button
              className="flex items-center px-5 py-2 rounded bg-primary text-white font-medium shadow hover:bg-primary/90"
              onClick={handleApprove}
            >
              <HiOutlineCheckCircle className="w-5 h-5 mr-1" /> Approve
            </button>
            <button
              className="flex items-center px-5 py-2 rounded bg-red-600 text-white font-medium shadow hover:bg-red-700"
              onClick={handleReject}
            >
              <HiOutlineXCircle className="w-5 h-5 mr-1" /> Reject
            </button>
            <button
              className="flex items-center px-5 py-2 rounded bg-secondary text-white font-medium shadow hover:bg-secondary/90"
              onClick={handleEdit}
            >
              <HiOutlinePencilAlt className="w-5 h-5 mr-1" /> Edit & Approve
            </button>
          </div>
        )}
        {decision === "approved" && (
          <div className="mt-6 text-green-700 font-semibold">Update approved ✅</div>
        )}
        {decision === "rejected" && (
          <div className="mt-6">
            <div className="font-medium mb-2">Please provide a reason for rejection:</div>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              rows={3}
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
            />
            <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => setDecision(null)}>Submit</button>
          </div>
        )}
        {decision === "edit" && (
          <div className="mt-6">
            <div className="font-medium mb-2">Edit proposed update (not implemented in mock):</div>
            <input
              className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded"
              defaultValue={NEW_TEXT}
              disabled
            />
            <button className="mt-2 px-4 py-2 bg-primary text-white rounded" onClick={() => setDecision("approved")}>
              Save & Approve
            </button>
            <button className="mt-2 ml-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setDecision(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewApproval;
