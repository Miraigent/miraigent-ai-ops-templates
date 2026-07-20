# AI Ops Template MCP Server

This is a small, dependency-free Model Context Protocol server for Miraigent's
public AI operations templates.

Files under mcp/ are MIT-licensed. See mcp/LICENSE and the repository root
LICENSE-SCOPE.md.

It helps an MCP client discover practical resources for human-reviewed AI
operations, including prompt risk review, data anonymization, CRM notes, FAQ
review, and support process mapping.

## Run

```bash
npm run --silent mcp
```

The server communicates over stdio with newline-delimited JSON-RPC for standard MCP clients.
Use npm's `--silent` flag so its command banner is not mixed into the JSON-RPC
stdout stream.

It implements:

- `initialize`
- `notifications/initialized`
- `ping`
- `tools/list`
- `tools/call`

## Quickstart

From the repository root, run `npm run --silent mcp`.

The package is published publicly on npm. Run the server without cloning the
repository:

```bash
npx --yes @miraigent/ai-ops-templates
```

For repeatable production configuration, pin the package version in the
command instead of relying on the latest published release.

## Connect an MCP Client Locally

For local development or source review, point an MCP client at the checked-out
server file. Replace `/absolute/path/to/repository` with this repository's
absolute path:

```json
{
  "mcpServers": {
    "miraigent-ai-ops-templates": {
      "command": "node",
      "args": [
        "/absolute/path/to/repository/mcp/ai-ops-template-server/server.mjs"
      ]
    }
  }
}
```

Restart the client after saving its configuration, then verify that it can list
the five tools documented below. The server writes protocol messages to stdout,
so do not wrap this command in another program that adds banners or log output.

## Manual JSON-RPC Examples

The server accepts one JSON-RPC message per line. These examples are safe to run
from the repository root and do not require network access.

Initialize the server:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' \
  | npm run --silent mcp
```

List the available MCP tools:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}' \
  | npm run --silent mcp
```

Check that the server is responsive:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":3,"method":"ping","params":{}}' \
  | npm run --silent mcp
```

Fetch one public template:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"get_ai_ops_template","arguments":{"id":"human-review-gate-ai-drafts"}}}' \
  | npm run --silent mcp
```

Draft a short adoption plan:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"draft_ai_ops_adoption_plan","arguments":{"operation":"customer-support","currentPain":"AI replies are drafted before review rules are clear","reviewOwner":"support lead","riskLevel":"high"}}}' \
  | npm run --silent mcp
```

For the full automated check, run:

```bash
npm test
```

## Tools

### `list_ai_ops_templates`

Returns the public template catalog.

### `get_ai_ops_template`

Returns details for one template.

Input:

```json
{
  "id": "human-review-gate-ai-drafts"
}
```

The server trims extra spaces and accepts uppercase/lowercase variants in direct
JSON-RPC calls.

### `build_ai_ops_review_checklist`

Builds a short review checklist for an AI operations area.

Input:

```json
{
  "operation": "customer-support",
  "riskLevel": "medium"
}
```

Supported `riskLevel` values are `low`, `medium`, and `high`. The server trims
extra spaces and accepts uppercase/lowercase variants in direct JSON-RPC calls.
When omitted, the server uses `medium`.

### `recommend_ai_ops_template_sequence`

Recommends a practical order for applying the public templates.

Input fields:

- operation: support, CRM, FAQ, content, or another operations area
- priorities: optional list such as privacy, faq, crm, intake, or review

Supported `priorities` values are `privacy`, `faq`, `crm`, `intake`,
`review`, and `workflow`. The server trims extra spaces and accepts
uppercase/lowercase variants. Unknown strings are accepted but ignored so
clients can pass their own notes without breaking the request.

### `draft_ai_ops_adoption_plan`

Drafts a short, practical adoption plan for applying the public templates.

Input:

```json
{
  "operation": "customer-support",
  "currentPain": "AI replies are drafted before review rules are clear",
  "reviewOwner": "support lead",
  "riskLevel": "high"
}
```

Supported `riskLevel` values are `low`, `medium`, and `high`. The server trims
extra spaces and accepts uppercase/lowercase variants in direct JSON-RPC calls.
When omitted, the server uses `medium`.

## Why This Exists

Many teams adopt AI before they define the operating layer around it:

- what data can be sent to AI
- what must be masked
- when a human must review output
- how repeated review lessons become reusable operating notes
- how customer support and CRM notes stay useful without exposing private data

This starter server turns those public patterns into MCP-accessible tools.

It is a non-memory AI operations helper. It is not the MIRAI Memory engine and
it is not a working memory MCP.
