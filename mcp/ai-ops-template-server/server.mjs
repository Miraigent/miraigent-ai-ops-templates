#!/usr/bin/env node

const templates = [
  {
    id: "before-you-send-it-to-ai-checklist",
    title: "Before You Send It to AI Checklist",
    useCase: "Decide whether a prompt is safe enough to send to AI.",
    url: "https://miraigent.gumroad.com/l/before-you-send-it-to-ai-checklist",
    reviewPoints: ["private data", "purpose fit", "human review", "logging"]
  },
  {
    id: "faq-candidate-review-checklist",
    title: "FAQ Candidate Review Checklist",
    useCase: "Turn repeated inquiries into safer FAQ knowledge.",
    url: "https://miraigent.gumroad.com/l/faq-candidate-review-checklist",
    reviewPoints: ["repeatability", "accuracy", "exceptions", "approval owner"]
  },
  {
    id: "ai-prompt-risk-review-sheet",
    title: "AI Prompt Risk Review Sheet",
    useCase: "Decide what to send, mask, rewrite, or stop.",
    url: "https://miraigent.gumroad.com/l/ai-prompt-risk-review-sheet",
    reviewPoints: ["risk level", "masking", "rewrite need", "stop condition"]
  },
  {
    id: "human-review-gate-ai-drafts",
    title: "Human Review Gate for AI Drafts",
    useCase: "Approve, revise, escalate, or stop before sending customer replies.",
    url: "https://miraigent.gumroad.com/l/human-review-gate-ai-drafts",
    reviewPoints: ["approval", "revision", "escalation", "send/no-send"]
  },
  {
    id: "ai-safe-crm-notes-template",
    title: "AI-Safe CRM Notes Template",
    useCase: "Keep context useful while removing unnecessary private details.",
    url: "https://miraigent.gumroad.com/l/ai-safe-crm-notes-template",
    reviewPoints: ["anonymization", "business context", "next action", "retention"]
  },
  {
    id: "pre-ai-intake-form-questions",
    title: "Pre-AI Intake Form Questions",
    useCase: "Collect the context needed before AI starts drafting.",
    url: "https://miraigent.gumroad.com/l/pre-ai-intake-form-questions",
    reviewPoints: ["goal", "constraint", "audience", "review owner"]
  },
  {
    id: "do-not-send-to-ai-list-template",
    title: "Do Not Send to AI List Template",
    useCase: "Define what to block, mask, rewrite, or review.",
    url: "https://miraigent.gumroad.com/l/do-not-send-to-ai-list-template",
    reviewPoints: ["blocked data", "masking rule", "rewrite rule", "review path"]
  },
  {
    id: "ai-output-review-checklist",
    title: "AI Output Review Checklist",
    useCase: "Check source accuracy, privacy, tone, and risk.",
    url: "https://miraigent.gumroad.com/l/ai-output-review-checklist",
    reviewPoints: ["accuracy", "privacy", "tone", "policy risk"]
  },
  {
    id: "customer-data-anonymization-mini-guide",
    title: "Customer Data Anonymization Mini Guide",
    useCase: "Keep the lesson, remove the identifying details.",
    url: "https://miraigent.gumroad.com/l/customer-data-anonymization-mini-guide",
    reviewPoints: ["identifiers", "sensitive facts", "useful lesson", "audit trail"]
  },
  {
    id: "ai-support-workflow-starter-map",
    title: "AI Support Workflow Starter Map",
    useCase: "Map intake, AI drafts, human review, exceptions, and logs.",
    url: "https://miraigent.gumroad.com/l/ai-support-workflow-starter-map",
    reviewPoints: ["intake", "AI draft", "review gate", "exception log"]
  }
];

const tools = [
  {
    name: "list_ai_ops_templates",
    description: "List Miraigent public AI operations templates.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "get_ai_ops_template",
    description: "Get one AI operations template by id.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Template id, such as human-review-gate-ai-drafts."
        }
      },
      required: ["id"]
    }
  },
  {
    name: "build_ai_ops_review_checklist",
    description: "Build a short human-review checklist for an AI operation.",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          description: "Operations area, such as customer-support, CRM, FAQ, or content."
        },
        workflow: {
          type: "string",
          description: "Deprecated alias for operation."
        },
        riskLevel: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Expected risk level for the operation."
        }
      },
      required: []
    }
  },
  {
    name: "recommend_ai_ops_template_sequence",
    description: "Recommend a practical order for applying the public AI operations templates.",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          description: "Operations area, such as support, CRM, FAQ, or content."
        },
        priorities: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Priorities such as privacy, review, intake, CRM, FAQ, or workflow."
        }
      }
    }
  },
  {
    name: "draft_ai_ops_adoption_plan",
    description: "Draft a short adoption plan for applying Miraigent public AI operations templates.",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          description: "Operations area, such as customer support, CRM, FAQ, or content review."
        },
        currentPain: {
          type: "string",
          description: "Main problem the team wants to reduce."
        },
        reviewOwner: {
          type: "string",
          description: "Role or team that owns human review."
        },
        riskLevel: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Expected risk level for the operation."
        }
      }
    }
  }
];

let buffer = Buffer.alloc(0);
process.stdin.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (readNextMessage()) {
    // Keep draining complete messages.
  }
});

function readNextMessage() {
  if (startsWithContentLength(buffer)) {
    return readContentLengthMessage();
  }

  return readNewlineMessage();
}

function startsWithContentLength(input) {
  return input.slice(0, 15).toString("utf8").toLowerCase().startsWith("content-length:");
}

function readContentLengthMessage() {
  const separator = buffer.indexOf("\r\n\r\n");
  if (separator === -1) {
    return false;
  }

  const header = buffer.slice(0, separator).toString("utf8");
  const match = header.match(/Content-Length: (\d+)/i);
  if (!match) {
    respond(null, null, { code: -32600, message: "Missing Content-Length header" });
    buffer = Buffer.alloc(0);
    return false;
  }

  const contentLength = Number(match[1]);
  const bodyStart = separator + 4;
  const bodyEnd = bodyStart + contentLength;
  if (buffer.length < bodyEnd) {
    return false;
  }

  const body = buffer.slice(bodyStart, bodyEnd).toString("utf8");
  buffer = buffer.slice(bodyEnd);
  handleMessage(body);
  return true;
}

function readNewlineMessage() {
  const lineEnd = buffer.indexOf("\n");
  if (lineEnd === -1) {
    return false;
  }

  const line = buffer.slice(0, lineEnd).toString("utf8").trim();
  buffer = buffer.slice(lineEnd + 1);
  if (!line) {
    return true;
  }

  handleMessage(line);
  return true;
}

function handleMessage(body) {
  let request;
  try {
    request = JSON.parse(body);
  } catch (error) {
    respond(null, null, { code: -32700, message: "Parse error", data: error.message });
    return;
  }

  try {
    const result = route(request.method, request.params ?? {});
    if (request.id !== undefined) {
      respond(request.id, result);
    }
  } catch (error) {
    respond(request.id ?? null, null, {
      code: -32603,
      message: error.message
    });
  }
}

function route(method, params) {
  if (method === "initialize") {
    return {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {}
      },
      serverInfo: {
        name: "miraigent-ai-ops-template-server",
        version: "0.1.8"
      }
    };
  }

  if (method === "tools/list") {
    return { tools };
  }

  if (method === "tools/call") {
    return callTool(params.name, params.arguments ?? {});
  }

  throw new Error(`Unsupported method: ${method}`);
}

function callTool(name, args) {
  if (name === "list_ai_ops_templates") {
    return textResult(JSON.stringify(templates, null, 2));
  }

  if (name === "get_ai_ops_template") {
    const template = templates.find((item) => item.id === args.id);
    if (!template) {
      throw new Error(`Unknown template id: ${args.id}`);
    }
    return textResult(JSON.stringify(template, null, 2));
  }

  if (name === "build_ai_ops_review_checklist") {
    const riskLevel = args.riskLevel ?? "medium";
    const operation = args.operation ?? args.workflow ?? "general-ai-operations";
    const checklist = buildChecklist(operation, riskLevel);
    return textResult(checklist.map((item) => `- ${item}`).join("\n"));
  }

  if (name === "recommend_ai_ops_template_sequence") {
    return textResult(JSON.stringify(recommendTemplateSequence(args), null, 2));
  }

  if (name === "draft_ai_ops_adoption_plan") {
    return textResult(JSON.stringify(draftAdoptionPlan(args), null, 2));
  }

  throw new Error(`Unknown tool: ${name}`);
}

function recommendTemplateSequence(args) {
  const priorities = new Set((args.priorities ?? []).map((item) => String(item).toLowerCase()));
  const sequence = [
    "before-you-send-it-to-ai-checklist",
    "do-not-send-to-ai-list-template",
    "pre-ai-intake-form-questions",
    "human-review-gate-ai-drafts",
    "ai-output-review-checklist",
    "faq-candidate-review-checklist",
    "ai-safe-crm-notes-template",
    "customer-data-anonymization-mini-guide",
    "ai-support-workflow-starter-map"
  ];

  if (priorities.has("privacy")) {
    moveBefore(sequence, "customer-data-anonymization-mini-guide", "human-review-gate-ai-drafts");
    moveBefore(sequence, "do-not-send-to-ai-list-template", "pre-ai-intake-form-questions");
  }

  if (priorities.has("faq")) {
    moveBefore(sequence, "faq-candidate-review-checklist", "ai-safe-crm-notes-template");
  }

  if (priorities.has("crm")) {
    moveBefore(sequence, "ai-safe-crm-notes-template", "faq-candidate-review-checklist");
  }

  return {
    operation: args.operation ?? "general-ai-operations",
    note: "This is a non-memory AI operations helper sequence. It is not a MIRAI Memory engine or working memory MCP.",
    nextSteps: buildNextSteps(),
    templates: sequence.map((id) => templates.find((template) => template.id === id))
  };
}

function buildNextSteps() {
  return {
    label: "Learn more",
    note: "Use these public templates as a starting point, then review Miraigent and Agent Memories resources for practical AI operations support.",
    links: []
  };
}

function draftAdoptionPlan(args) {
  const operation = args.operation ?? "general-ai-operations";
  const currentPain = args.currentPain ?? "AI usage is happening before review rules are clear";
  const reviewOwner = args.reviewOwner ?? "human reviewer";
  const riskLevel = args.riskLevel ?? "medium";

  return {
    operation,
    currentPain,
    reviewOwner,
    riskLevel,
    boundary: "This is a non-memory AI operations helper plan. It is not a MIRAI Memory engine or working memory MCP.",
    steps: [
      {
        day: 1,
        action: "Define what must not be sent to AI.",
        templateId: "do-not-send-to-ai-list-template"
      },
      {
        day: 2,
        action: "Create the intake questions needed before AI drafts anything.",
        templateId: "pre-ai-intake-form-questions"
      },
      {
        day: 3,
        action: `Assign ${reviewOwner} as the human review gate before external use.`,
        templateId: "human-review-gate-ai-drafts"
      },
      {
        day: 4,
        action: "Review AI output for privacy, accuracy, tone, and policy risk.",
        templateId: "ai-output-review-checklist"
      },
      {
        day: 5,
        action: "Turn repeated review points into FAQ candidates or CRM notes.",
        templateId: riskLevel === "high" ? "customer-data-anonymization-mini-guide" : "faq-candidate-review-checklist"
      }
    ],
    recommendedFirstCheck: buildChecklist(operation, riskLevel)
  };
}

function moveBefore(items, target, before) {
  const targetIndex = items.indexOf(target);
  const beforeIndex = items.indexOf(before);
  if (targetIndex === -1 || beforeIndex === -1 || targetIndex < beforeIndex) {
    return;
  }
  items.splice(targetIndex, 1);
  items.splice(beforeIndex, 0, target);
}

function buildChecklist(workflow, riskLevel) {
  const base = [
    `Define the workflow goal before using AI: ${workflow}.`,
    "Remove or mask customer identifiers that are not needed for the AI task.",
    "Mark which outputs require human approval before use.",
    "Record the final decision and the reason for future review."
  ];

  if (riskLevel === "high") {
    return [
      ...base,
      "Add an escalation owner before AI output can be sent externally.",
      "Keep a no-send list for data, claims, and decisions AI must not handle."
    ];
  }

  if (riskLevel === "low") {
    return [
      ...base,
      "Sample-check outputs regularly and convert repeated review points into FAQ notes."
    ];
  }

  return [
    ...base,
    "Use a review gate for uncertain tone, policy, privacy, or factual claims."
  ];
}

function textResult(text) {
  return {
    content: [
      {
        type: "text",
        text
      }
    ]
  };
}

function respond(id, result = null, error = null) {
  const message = {
    jsonrpc: "2.0",
    id
  };
  if (error) {
    message.error = error;
  } else {
    message.result = result;
  }
  const body = JSON.stringify(message);
  process.stdout.write(`${body}\n`);
}
