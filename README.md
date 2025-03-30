# argo-monitor

**argo-monitor** is a lightweight integration layer between [Argo Workflows](https://argoproj.github.io/workflows/) and [Kubecost](https://www.kubecost.com/), designed to provide visibility into resource utilization and cost metrics for individual workflows running on Kubernetes.

## 🚀 Project Goals

- Track the real-time and historical **costs of Argo workflows**
- Use **Kubecost APIs** to fetch cost and usage metrics
- Map cost data to workflows using **Argo's pod labels**
- Optionally enforce budgets or trigger alerts based on cost

---

## 🧩 How It Works

### 🔁 Workflow Execution

1. Argo Workflows submits jobs/pods to your Kubernetes cluster.
2. Each pod is automatically labeled with:
   - `workflows.argoproj.io/workflow=<workflow-name>`
   - Other metadata like `workflow-template`, etc.

### 📊 Cost Monitoring with Kubecost

1. Kubecost continuously monitors all pods and collects:
   - Resource usage (CPU, memory, storage)
   - Cost data from cloud billing APIs or custom pricing
2. Using the labels applied by Argo, Kubecost groups costs **per workflow**.

### 🔍 Integration Layer (`argo-monitor`)

This project queries Kubecost’s API to:
- Fetch **per-workflow cost breakdowns**
- Estimate the cost of upcoming workflows
- Optionally display cost info via CLI, dashboard, or Argo UI extensions

---

## 🔧 Setup

### Prerequisites

- A Kubernetes cluster with Argo Workflows installed
- Kubecost deployed in the same cluster
- Access to Kubecost API (usually exposed as a service in the `kubecost` namespace)

### Deploy Kubecost
```bash
helm repo add kubecost https://kubecost.github.io/cost-analyzer/
helm install kubecost kubecost/cost-analyzer --namespace kubecost --create-namespace
```

## Features Roadmap
- Slack/email alerts on budget breach

- UI integration with Argo Dashboard

- Workflow-level budget enforcement

- ML basedrecommendation on efficient resource usage