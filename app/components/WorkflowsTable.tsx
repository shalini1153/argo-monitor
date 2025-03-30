"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { exampleWorkflows } from "../testing/exampleWorkflows";
import { WorkflowCard } from "./WorkflowCard";

export const WorkflowsTable = () => {
  const [workflows, setWorkflows] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('/api/v1/workflows/argo', {
        params: {
          "listOptions.limit": "50",
          nameFilter: "Contains",
          sort: "startedAt",
          orderBy: "desc",
          fields:
            "metadata,items.metadata.uid,items.metadata.name,items.metadata.namespace,items.metadata.creationTimestamp,items.metadata.labels,items.metadata.annotations,items.status.phase,items.status.message,items.status.finishedAt,items.status.startedAt,items.status.estimatedDuration,items.status.progress,items.spec.suspend",
        },
      })
      .then((results) => {
        console.log(results.data);
        setWorkflows(results.data.items);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-2/3 max-w-200 py-16 h-full flex flex-col gap-4 overflow-y-auto">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.metadata.uid} workflow={workflow} />
      ))}
    </div>
  );
};
