import { spawn } from "node:child_process";

await runSmokeTest("content-length");
await runSmokeTest("newline");

async function runSmokeTest(framing) {
  const child = spawn(process.execPath, ["mcp/ai-ops-template-server/server.mjs"], {
    stdio: ["pipe", "pipe", "inherit"]
  });

  const responses = [];
  let buffer = Buffer.alloc(0);
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, Buffer.from(chunk, "utf8")]);
    while (readNextResponse()) {
      // Keep draining complete messages.
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

  await waitForResponses(responses, 6);
  child.kill();

  assert(responses[0].result.serverInfo.name === "miraigent-ai-ops-template-server", `${framing}: initialize failed`);
  assert(responses[1].result.tools.length === 4, `${framing}: tools/list failed`);
  assert(responses[2].result.content[0].text.includes("Human Review Gate"), `${framing}: template listing failed`);
  assert(responses[3].result.content[0].text.includes("Human Review Gate"), `${framing}: template lookup failed`);
  assert(responses[4].result.content[0].text.includes("escalation owner"), `${framing}: checklist build failed`);
  assert(responses[5].result.content[0].text.includes("not a MIRAI Memory engine"), `${framing}: sequence recommendation failed`);

  function readNextResponse() {
    const separator = buffer.indexOf("\r\n\r\n");
    if (separator === -1) {
      return false;
    }

    const header = buffer.slice(0, separator).toString("utf8");
    const match = header.match(/Content-Length: (\d+)/i);
    if (!match) {
      throw new Error(`${framing}: Missing Content-Length in response: ${header}`);
    }

    const bodyStart = separator + 4;
    const bodyEnd = bodyStart + Number(match[1]);
    if (buffer.length < bodyEnd) {
      return false;
    }

    const body = buffer.slice(bodyStart, bodyEnd).toString("utf8");
    buffer = buffer.slice(bodyEnd);
    responses.push(JSON.parse(body));
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
