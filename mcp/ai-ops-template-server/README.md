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
npm run mcp
```

The server communicates over stdio with JSON-RPC `Content-Length` framing and implements:

- `initialize`
- `tools/list`
- `tools/call`

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

### `build_ai_ops_review_checklist`

Builds a short review checklist for an AI operations area.

Input:

```json
{
  "workflow": "customer-support",
  "riskLevel": "medium"
}
```

## Why This Exists

Many teams adopt AI before they define the operating layer around it:

- what data can be sent to AI
- what must be masked
- when a human must review output
- how repeated review lessons become reusable memory
- how customer support and CRM notes stay useful without exposing private data

This starter server turns those public patterns into MCP-accessible tools.
