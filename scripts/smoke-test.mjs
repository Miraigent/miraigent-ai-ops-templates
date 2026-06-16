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

  await waitForResponses(responses, 11);
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
