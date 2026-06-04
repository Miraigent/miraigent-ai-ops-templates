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

The server communicates over stdio with newline-delimited JSON-RPC for standard MCP clients.

It implements:

- `initialize`
- `tools/list`
- `tools/call`

## Quickstart

From the repository root, run npm run mcp.

After npm publication, the intended command will be npx @miraigent/ai-ops-templates.

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
  "operation": "customer-support",
  "riskLevel": "medium"
}
```

### `recommend_ai_ops_template_sequence`

Recommends a practical order for applying the public templates.

Input fields:

- operation: support, CRM, FAQ, content, or another operations area
- priorities: optional list such as privacy, faq, crm, intake, or review

## Why This Exists

Many teams adopt AI before they define the operating layer around it:

- what data can be sent to AI
- what must be masked
- when a human must review output
- how repeated review lessons become reusable memory
- how customer support and CRM notes stay useful without exposing private data

This starter server turns those public patterns into MCP-accessible tools.

It is a non-memory AI operations helper. It is not the MIRAI Memory engine and
it is not a working memory MCP.
