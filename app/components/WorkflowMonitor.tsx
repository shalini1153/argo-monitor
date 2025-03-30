"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface MetricsData {
  cpuUsage: number;
  memoryUsage: number;
  cost: number;
}

const WorkflowMonitor = ({ workflowName }: { workflowName: string }) => {
  const [metricsData, setMetricsData] = useState<MetricsData>({
    cpuUsage: 0,
    memoryUsage: 0,
    cost: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your Kubecost API endpoint
  const kubecostApiUrl = "http://localhost:9091/model/allocation";

  const fetchMetrics = async () => {
    try {
      setLoading(true);

      // Construct the correct URL
      const queryParams = new URLSearchParams({
        window: "2d",
        aggregate: "label:workflows_argoproj_io",
        filter: `label[workflows.argoproj.io/workflow]:"${workflowName}"`,
      });

      const response = await fetch(`${kubecostApiUrl}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }

      const responseData = await response.json();

      // Parse the API response
      let cpuUsage = 0;
      let memoryUsage = 0;
      let cost = 0;

      // Iterate through data array to extract metrics
      responseData.data.forEach((entry: any) => {
        if (entry) {
          const idleMetrics = entry["__idle__"];
          const unallocatedMetrics = entry["__unallocated__"];

          if (idleMetrics) {
            cpuUsage += idleMetrics.cpuCoreHours || 0;
            memoryUsage += idleMetrics.ramByteHours || 0;
            cost += idleMetrics.totalCost || 0;
            console.log("idleMetrics.totalCost",idleMetrics.totalCost)
          }

          if (unallocatedMetrics) {
            cpuUsage += unallocatedMetrics.cpuCoreHours || 0;
            memoryUsage += unallocatedMetrics.ramByteHours || 0;
            cost += unallocatedMetrics.totalCost || 0;
          }
        }
      });

      setMetricsData({ cpuUsage, memoryUsage, cost });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [workflowName]);

  if (loading) {
    return <div>Loading metrics...</div>;
  }

  if (error) {
    return <div>Error fetching metrics: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Workflow Monitoring for {workflowName}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">CPU Usage</h2>
          <p className="text-2xl font-bold">{metricsData.cpuUsage.toFixed(2)} Core Hours</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Memory Usage</h2>
          <p className="text-2xl font-bold">{(metricsData.memoryUsage / (1024 ** 3)).toFixed(2)} GB Hours</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Cost</h2>
          <p className="text-2xl font-bold">${metricsData.cost.toFixed(2)}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4">Resource Distribution</h2>
        <Pie
          data={{
            labels: ["CPU Usage", "Memory Usage", "Total Cost"],
            datasets: [
              {
                label: "Resource Distribution",
                data: [metricsData.cpuUsage, metricsData.memoryUsage / (1024 ** 3), metricsData.cost],
                backgroundColor: [
                  "rgba(75,192,192,0.5)", // CPU
                  "rgba(153,102,255,0.5)", // Memory
                  "rgba(255,99,132,0.5)", // Cost
                ],
                borderColor: [
                  "rgba(75,192,192,1)", // CPU
                  "rgba(153,102,255,1)", // Memory
                  "rgba(255,99,132,1)", // Cost
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WorkflowMonitor;
