import React, { useState } from "react";
import WorkflowMonitor from "./WorkflowMonitor";

interface Workflow {
  metadata: {
    name: string;
    namespace: string;
  };
  status: {
    startedAt: string;
    finishedAt: string;
    phase: string;
  };
}

interface WorkflowCardProps {
  workflow: Workflow;
}

export const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  const [showMonitor, setShowMonitor] = useState(false);

  // Helper function to calculate duration
  const calculateDuration = (startedAt: string, finishedAt: string): string => {
    const start = new Date(startedAt);
    const finish = finishedAt ? new Date(finishedAt) : new Date();
    const durationMs = finish.getTime() - start.getTime();

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 border-b border-gray-200 pb-2">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Started At</div>
        <div className="col-span-2">Finished At</div>
        <div className="col-span-2">Duration</div>
        <div className="col-span-2">Status</div>
      </div>

      {/* Workflow Row */}
      <div
        className="grid grid-cols-12 gap-4 py-2 text-gray-800 border-b border-gray-100 hover:bg-gray-100 transition-colors"
      >
        {/* Make the name clickable */}
        <div className="col-span-3">
          <button
            onClick={() => setShowMonitor(!showMonitor)}
            className="text-blue-600 hover:underline"
          >
            {workflow.metadata.name}
          </button>
        </div>
        <div className="col-span-3">{workflow.status.startedAt}</div>
        <div className="col-span-2">
          {workflow.status.finishedAt || "In Progress"}
        </div>
        <div className="col-span-2">
          {calculateDuration(
            workflow.status.startedAt,
            workflow.status.finishedAt
          )}
        </div>
        <div
          className={`col-span-2 font-medium ${
            workflow.status.phase === "Running"
              ? "text-green-600"
              : workflow.status.phase === "Failed"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {workflow.status.phase}
        </div>
      </div>

      {/* Render WorkflowMonitor if showMonitor is true */}
      {showMonitor && (
        <WorkflowMonitor workflowName={workflow.metadata.name} />
      )}
    </div>
  );
};
