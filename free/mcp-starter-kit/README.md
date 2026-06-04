# MCP Starter Kit

This starter kit points to Miraigent's first public AI operations MCP server.

The goal is to make public AI operations templates accessible to agents through
simple workflow tools, not only static Markdown documents.

## Server

```text
../../mcp/ai-ops-template-server/
```

Run from the repository root:

```bash
npm run mcp
```

Smoke test:

```bash
npm test
```

## Available Tools

- `list_ai_ops_templates`
- `get_ai_ops_template`
- `build_ai_ops_review_checklist`

## What This Free Kit Includes

- Basic MCP workflow structure
- Example template discovery tools
- Human review checklist generation
- Safe input and output boundary examples
- Notes for moving from prototype to operations

## What It Does Not Include

- Complete paid workflow bundles
- Industry-specific private templates
- Private client operating manuals
- Credentials, keys, or internal system details

Use this as the first open implementation path for turning public AI operations
templates into agent-accessible workflow tooling.
