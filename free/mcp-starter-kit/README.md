# MCP Starter Kit

This starter kit points to Miraigent's first public AI operations MCP server.

The goal is to make public AI operations templates accessible to agents through
simple MCP tools, not only static Markdown documents.

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
- `recommend_ai_ops_template_sequence`
- `draft_ai_ops_adoption_plan`

## What This Free Kit Includes

- Basic MCP server structure
- Example template discovery tools
- Human review checklist generation
- Template sequence and adoption-plan examples
- Safe input and output boundary examples
- Notes for moving from prototype to operations

## What It Does Not Include

- Complete paid tooling bundles
- Industry-specific private templates
- Private client operating manuals
- Credentials, keys, or internal system details

Use this as the first open implementation path for turning public AI operations
templates into agent-accessible MCP tooling.
