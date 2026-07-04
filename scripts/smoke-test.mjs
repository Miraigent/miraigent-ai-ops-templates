import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

await runSmokeTest("content-length");
await runSmokeTest("newline");

async function runSmokeTest(framing) {
  const child = spawn(process.execPath, ["mcp/ai-ops-template-server/server.mjs"], {
    stdio: ["pipe", "pipe", "inherit"]
  });

  const responses = [];
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString("utf8");
    assert(!output.includes("Content-Length:"), `${framing}: stdout must not include Content-Length headers`);
    while (readNextResponseLine()) {
      // Keep draining complete newline-delimited responses.
    }
  });

  send(child, framing, { jsonrpc: "2.0", id: 1, method: "initialize", params: {} });
  send(child, framing, { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "list_ai_ops_templates",
      arguments: {}
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "get_ai_ops_template",
      arguments: { id: "human-review-gate-ai-drafts" }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: {
      name: "build_ai_ops_review_checklist",
      arguments: { operation: "customer-support", riskLevel: "high" }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: ["privacy", "faq"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 7,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: {
        operation: "customer-support",
        currentPain: "AI replies are drafted before review rules are clear",
        reviewOwner: "support lead",
        riskLevel: "high"
      }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 8,
    method: "tools/call",
    params: {
      name: "missing_ai_ops_tool",
      arguments: {}
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 9,
    method: "tools/call",
    params: {
      name: "get_ai_ops_template",
      arguments: { id: "missing-template" }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 10,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: {
        operation: "customer-support",
        riskLevel: "critical"
      }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 11,
    method: "tools/call",
    params: {
      name: "build_ai_ops_review_checklist",
      arguments: { workflow: "legacy-support-workflow" }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 12,
    method: "tools/call",
    params: {
      arguments: {}
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 13,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: ["intake"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 14,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: ["review"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 15,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: ["workflow"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 16,
    method: "tools/call",
    params: {
      name: "get_ai_ops_template",
      arguments: {}
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 17,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: "privacy" }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 18,
    method: "tools/call",
    params: {
      name: "list_ai_ops_templates",
      arguments: []
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 19,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: ["privacy", 42] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 20,
    method: "tools/call",
    params: {
      name: "build_ai_ops_review_checklist",
      arguments: { operation: ["customer-support"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 21,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: { reviewOwner: ["support lead"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 22,
    method: "",
    params: {}
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 23,
    method: 42,
    params: {}
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 24,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: ["support"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 25,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: { currentPain: ["unclear review rules"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 26,
    method: "tools/call",
    params: {
      name: "build_ai_ops_review_checklist",
      arguments: { riskLevel: ["high"] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 27,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: { riskLevel: { level: "high" } }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 28,
    method: "tools/call",
    params: {
      name: "build_ai_ops_review_checklist",
      arguments: { operation: "customer-support", riskLevel: " HIGH " }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 29,
    method: "tools/call",
    params: {
      name: "recommend_ai_ops_template_sequence",
      arguments: { operation: "support", priorities: [" FAQ "] }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 30,
    method: "tools/call",
    params: {
      name: "get_ai_ops_template",
      arguments: { id: " HUMAN-REVIEW-GATE-AI-DRAFTS " }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 31,
    method: "tools/call",
    params: {
      name: "build_ai_ops_review_checklist",
      arguments: { operation: "   " }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 32,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: { currentPain: "   " }
    }
  });
  send(child, framing, {
    jsonrpc: "2.0",
    id: 33,
    method: "tools/call",
    params: {
      name: "draft_ai_ops_adoption_plan",
      arguments: { reviewOwner: " support lead " }
    }
  });

  await waitForResponses(responses, 33);
  child.kill();

  assert(responses[0].result.serverInfo.name === "miraigent-ai-ops-template-server", `${framing}: initialize failed`);
  assert(responses[0].result.serverInfo.version === packageJson.version, `${framing}: server version must match package.json`);
  assert(responses[1].result.tools.length === 5, `${framing}: tools/list failed`);
  assert(responses[2].result.content[0].text.includes("Human Review Gate"), `${framing}: template listing failed`);
  assert(responses[3].result.content[0].text.includes("Human Review Gate"), `${framing}: template lookup failed`);
  assert(responses[4].result.content[0].text.includes("escalation owner"), `${framing}: checklist build failed`);
  const sequenceRecommendation = JSON.parse(responses[5].result.content[0].text);
  assert(sequenceRecommendation.note.includes("not a MIRAI Memory engine"), `${framing}: sequence recommendation failed`);
  assert(
    sequenceRecommendation.templates.length === responses[2].result.content[0].text.match(/"id":/g).length,
    `${framing}: sequence recommendation must include the full public template catalog`
  );
  assert(
    sequenceRecommendation.templates.some((template) => template.id === "ai-prompt-risk-review-sheet"),
    `${framing}: sequence recommendation must include prompt risk review sheet`
  );
  assert(responses[6].result.content[0].text.includes("support lead"), `${framing}: adoption plan failed`);
  assert(responses[7].error.message === "Unknown tool: missing_ai_ops_tool", `${framing}: unknown tool error failed`);
  assert(responses[8].error.message === "Unknown template id: missing-template", `${framing}: unknown template error failed`);
  assert(
    responses[9].error.message === "Unsupported riskLevel: critical. Use low, medium, or high.",
    `${framing}: invalid riskLevel error failed`
  );
  assert(
    responses[10].result.content[0].text.includes("legacy-support-workflow"),
    `${framing}: workflow alias checklist failed`
  );
  assert(
    responses[10].result.content[0].text.includes("Use a review gate"),
    `${framing}: default risk level checklist failed`
  );
  assert(
    responses[11].error.message === "tools/call requires a non-empty tool name.",
    `${framing}: missing tool name error failed`
  );
  const intakeRecommendation = JSON.parse(responses[12].result.content[0].text);
  assert(
    indexOfTemplate(intakeRecommendation, "pre-ai-intake-form-questions") <
      indexOfTemplate(intakeRecommendation, "do-not-send-to-ai-list-template"),
    `${framing}: intake priority should move intake before do-not-send list`
  );
  const reviewRecommendation = JSON.parse(responses[13].result.content[0].text);
  assert(
    indexOfTemplate(reviewRecommendation, "human-review-gate-ai-drafts") <
      indexOfTemplate(reviewRecommendation, "pre-ai-intake-form-questions"),
    `${framing}: review priority should move human review gate before intake`
  );
  const workflowRecommendation = JSON.parse(responses[14].result.content[0].text);
  assert(
    indexOfTemplate(workflowRecommendation, "ai-support-workflow-starter-map") <
      indexOfTemplate(workflowRecommendation, "faq-candidate-review-checklist"),
    `${framing}: workflow priority should move support workflow map before FAQ checklist`
  );
  assert(
    responses[15].error.message === "get_ai_ops_template requires a non-empty template id.",
    `${framing}: missing template id error failed`
  );
  assert(
    responses[16].error.message === "recommend_ai_ops_template_sequence priorities must be an array of strings.",
    `${framing}: invalid priorities error failed`
  );
  assert(
    responses[17].error.message === "tools/call arguments must be an object when provided.",
    `${framing}: invalid arguments object error failed`
  );
  assert(
    responses[18].error.message === "recommend_ai_ops_template_sequence priorities must be an array of strings.",
    `${framing}: non-string priorities error failed`
  );
  assert(
    responses[19].error.message ===
      "build_ai_ops_review_checklist operation must be a non-empty string when provided.",
    `${framing}: invalid checklist operation error failed`
  );
  assert(
    responses[20].error.message ===
      "draft_ai_ops_adoption_plan reviewOwner must be a non-empty string when provided.",
    `${framing}: invalid adoption-plan review owner error failed`
  );
  assert(
    responses[21].error.message === "JSON-RPC requests require a non-empty method string.",
    `${framing}: empty JSON-RPC method error failed`
  );
  assert(
    responses[22].error.message === "JSON-RPC requests require a non-empty method string.",
    `${framing}: non-string JSON-RPC method error failed`
  );
  assert(
    responses[23].error.message ===
      "recommend_ai_ops_template_sequence operation must be a non-empty string when provided.",
    `${framing}: invalid sequence operation error failed`
  );
  assert(
    responses[24].error.message ===
      "draft_ai_ops_adoption_plan currentPain must be a non-empty string when provided.",
    `${framing}: invalid adoption-plan current pain error failed`
  );
  assert(
    responses[25].error.message === "riskLevel must be a non-empty string when provided.",
    `${framing}: invalid checklist risk level type error failed`
  );
  assert(
    responses[26].error.message === "riskLevel must be a non-empty string when provided.",
    `${framing}: invalid adoption-plan risk level type error failed`
  );
  assert(
    responses[27].result.content[0].text.includes("escalation owner"),
    `${framing}: risk level normalization failed`
  );
  const trimmedFaqRecommendation = JSON.parse(responses[28].result.content[0].text);
  assert(
    indexOfTemplate(trimmedFaqRecommendation, "faq-candidate-review-checklist") <
      indexOfTemplate(trimmedFaqRecommendation, "ai-safe-crm-notes-template"),
    `${framing}: priority normalization should trim and match FAQ`
  );
  assert(
    responses[29].result.content[0].text.includes("Human Review Gate"),
    `${framing}: template id normalization failed`
  );
  assert(
    responses[30].error.message ===
      "build_ai_ops_review_checklist operation must be a non-empty string when provided.",
    `${framing}: whitespace-only checklist operation error failed`
  );
  assert(
    responses[31].error.message ===
      "draft_ai_ops_adoption_plan currentPain must be a non-empty string when provided.",
    `${framing}: whitespace-only adoption-plan current pain error failed`
  );
  const trimmedReviewOwnerPlan = JSON.parse(responses[32].result.content[0].text);
  assert(
    trimmedReviewOwnerPlan.reviewOwner === "support lead",
    `${framing}: adoption-plan review owner should be trimmed`
  );

  function readNextResponseLine() {
    const lineEnd = output.indexOf("\n");
    if (lineEnd === -1) {
      return false;
    }

    const line = output.slice(0, lineEnd).trim();
    output = output.slice(lineEnd + 1);
    if (line) {
      responses.push(JSON.parse(line));
    }
    return true;
  }
}

function indexOfTemplate(recommendation, id) {
  return recommendation.templates.findIndex((template) => template.id === id);
}

function send(child, framing, payload) {
  const body = JSON.stringify(payload);
  if (framing === "newline") {
    child.stdin.write(`${body}\n`);
    return;
  }

  child.stdin.write(`Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`);
}

async function waitForResponses(responses, count) {
  const started = Date.now();
  while (responses.length < count) {
    if (Date.now() - started > 3000) {
      throw new Error(`Timed out waiting for ${count} responses; got ${responses.length}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
