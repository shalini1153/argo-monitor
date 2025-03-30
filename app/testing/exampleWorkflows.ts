export const exampleWorkflows = {
  metadata: { resourceVersion: "18392" },
  items: [
    {
      metadata: {
        name: "fantastic-poochenheimer-fxdjk",
        namespace: "argo",
        uid: "83ed3fb3-793d-4c78-833e-33a24f63a9f1",
        creationTimestamp: "2025-03-28T15:29:10Z",
        labels: {
          "default-label": "thisLabelIsFromWorkflowDefaults",
          example: "true",
          "submit-from-ui": "true",
          "workflows.argoproj.io/completed": "true",
          "workflows.argoproj.io/phase": "Succeeded",
          "workflows.argoproj.io/workflow-template": "fantastic-poochenheimer",
        },
        annotations: { "workflows.argoproj.io/pod-name-format": "v2" },
      },
      spec: { arguments: {} },
      status: {
        phase: "Succeeded",
        startedAt: "2025-03-28T15:29:10Z",
        finishedAt: "2025-03-28T15:29:17Z",
        progress: "1/1",
      },
    },
    {
      metadata: {
        name: "fantastic-poochenheimer-jq9mx",
        namespace: "argo",
        uid: "dc8e1610-03b2-4443-9e1b-979a642e7eff",
        creationTimestamp: "2025-03-28T15:29:15Z",
        labels: {
          "default-label": "thisLabelIsFromWorkflowDefaults",
          example: "true",
          "submit-from-ui": "true",
          "workflows.argoproj.io/completed": "true",
          "workflows.argoproj.io/phase": "Succeeded",
          "workflows.argoproj.io/workflow-template": "fantastic-poochenheimer",
        },
        annotations: { "workflows.argoproj.io/pod-name-format": "v2" },
      },
      spec: { arguments: {} },
      status: {
        phase: "Succeeded",
        startedAt: "2025-03-28T15:29:15Z",
        finishedAt: "2025-03-28T15:29:21Z",
        progress: "1/1",
      },
    },
    {
      metadata: {
        name: "fantastic-poochenheimer-rzxl7",
        namespace: "argo",
        uid: "58be5544-5fe5-4854-948b-10964be1c9c9",
        creationTimestamp: "2025-03-28T15:29:19Z",
        labels: {
          "default-label": "thisLabelIsFromWorkflowDefaults",
          example: "true",
          "submit-from-ui": "true",
          "workflows.argoproj.io/completed": "true",
          "workflows.argoproj.io/phase": "Succeeded",
          "workflows.argoproj.io/workflow-template": "fantastic-poochenheimer",
        },
        annotations: { "workflows.argoproj.io/pod-name-format": "v2" },
      },
      spec: { arguments: {} },
      status: {
        phase: "Succeeded",
        startedAt: "2025-03-28T15:29:19Z",
        finishedAt: "2025-03-28T15:29:25Z",
        estimatedDuration: 7,
        progress: "1/1",
      },
    },
    {
      metadata: {
        name: "hello-world-9xgmm",
        namespace: "argo",
        uid: "77d21b3b-1853-4443-8cb9-dcc2d4565dc6",
        creationTimestamp: "2025-03-27T11:31:31Z",
        labels: {
          "default-label": "thisLabelIsFromWorkflowDefaults",
          "workflows.argoproj.io/archive-strategy": "false",
          "workflows.argoproj.io/completed": "true",
          "workflows.argoproj.io/phase": "Succeeded",
        },
        annotations: {
          "workflows.argoproj.io/description":
            "This is a simple hello world example.\n",
          "workflows.argoproj.io/pod-name-format": "v2",
        },
      },
      spec: { arguments: {} },
      status: {
        phase: "Succeeded",
        startedAt: "2025-03-27T11:31:31Z",
        finishedAt: "2025-03-27T11:31:37Z",
        progress: "1/1",
      },
    },
  ],
};
