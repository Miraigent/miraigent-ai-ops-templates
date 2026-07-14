# Miraigent AI Ops Templates

[![check](https://github.com/Miraigent/miraigent-ai-ops-templates/actions/workflows/check.yml/badge.svg)](https://github.com/Miraigent/miraigent-ai-ops-templates/actions/workflows/check.yml)

Open AI operations templates and starter MCP tooling for teams that want to use AI with practical human review.

Keywords: MCP, AI operations templates, agent tools, prompt safety review, human review gate, AI support process, AI-safe CRM notes, customer data anonymization, FAQ candidate review.

This repository is the public home for Miraigent's free AI operations resources and open MCP starter tools.

It is designed for teams that want to use AI for customer support, CRM notes, FAQ creation, workflow documentation, or internal operations while keeping human review, privacy, and decision logs visible.

## Start Here

- Public resource hub: https://miraigent.com/resources.html
- Free diagnosis: https://miraigent.com/diagnosis.html
- Free template library: https://miraigent.com/en/free-ai-operations-templates.html
- npm package: https://www.npmjs.com/package/@miraigent/ai-ops-templates
- Agent Memories: https://agentmemories.jp/
- Technical articles: https://qiita.com/Miraigent and https://zenn.dev/miraigent
- Open source readiness: OPEN_SOURCE_READINESS.md
- Publication plan: PUBLICATION_PLAN.md
- Free MCP candidates: FREE_MCP_CANDIDATES.md

日本語で確認したい方は、まず Miraigent の公開リソース導線をご確認ください。

- 公開リソース: https://miraigent.com/resources.html
- 無料診断: https://miraigent.com/diagnosis.html
- 技術記事: https://qiita.com/Miraigent / https://zenn.dev/miraigent

## Open Source Scope

This repository is not under one repository-wide MIT license. The open source
scope is limited by LICENSE-SCOPE.md.

MIT-licensed paths:

- public AI operations templates
- a dependency-free MCP server for template discovery
- starter MCP tools for human-reviewed AI operations

The paid/ directory is not MIT-licensed. It is a public index for paid product
names, sample previews, sales-page links, and update notes only.

The MIT license does not grant rights to full paid product files, private client
materials, the MIRAI Memory engine, or working memory MCPs.

This repository does not include private customer records, credentials,
company-specific internal manuals, or unpublished product specifications.

## Public Boundary

MIRAI Memory is the private memory engine. This repository does not open-source
the MIRAI Memory engine itself.

Memory MCP servers that would make MIRAI Memory usable as a working memory
engine are also private and must not be published here.

The public layer is limited to tools and resources that can sit around that
engine:

- free AI operations templates
- the starter MCP server in mcp/
- non-memory skill resources
- non-memory AI operations helper MCP tools
- public Agent Memories guidance

In short: this repository opens free support tools, not the MIRAI Memory engine
and not a working memory MCP.

## Naming Layers

Miraigent uses these public names consistently:

- Service: Agent Memories
- Private engine / memory concept: MIRAI Memory
- Public repository: Miraigent AI Ops Templates

In Japanese materials:

- サービス名: エージェントメモリーズ
- 非公開エンジン名 / 記憶コンセプト: MIRAI Memory
- 公開repo名: Miraigent AI Ops Templates

## MCP Starter Server

Run the starter Model Context Protocol server:

```bash
npm run --silent mcp
```

The `--silent` flag keeps npm's command banner out of the server's JSON-RPC
stdout stream.

Run the smoke test:

```bash
npm test
```

Run all repository checks:

```bash
npm run check
```

Server path:

```text
mcp/ai-ops-template-server/
```

The server exposes tools for listing the public template catalog, fetching one template, building a short AI operations review checklist, recommending a practical template sequence, and drafting a short adoption plan.

This repository currently publishes a starter MCP server. It does not claim to provide a full orchestration or automation engine.
The server uses newline-delimited JSON-RPC over stdio for standard MCP clients.

After npm publication, the intended command will be npx @miraigent/ai-ops-templates.
Because this is a scoped public npm package, publication uses npm publish --access public.

## Maintenance

This repository includes:

- CHANGELOG.md for public release notes
- CONTRIBUTING.md for contribution rules and public-boundary checks
- MAINTENANCE.md for daily update, boundary, and secret-scan rules
- OPEN_SOURCE_READINESS.md for reviewer-facing public scope, run commands, and inspection routes
- PUBLICATION_PLAN.md for the next public releases, article plan, and stop conditions
- FREE_MCP_CANDIDATES.md for public alpha MCP candidates and feedback routing
- issue and pull request templates
- GitHub Actions for syntax checks, repository boundary checks, secret scans, and MCP smoke tests
- a Codex-ready workflow that is prepared for future Miraigent-owned Codex credentials but does not claim active Codex usage before those credentials are configured

Enable the local pre-commit check:

    npm run install-hooks

## Free Template Library

Download the current free template set:

https://miraigent.com/en/free-ai-operations-templates.html

The set includes 10 free resources:

1. Before You Send It to AI Checklist
2. FAQ Candidate Review Checklist
3. AI Prompt Risk Review Sheet
4. Human Review Gate for AI Drafts
5. AI-Safe CRM Notes Template
6. Pre-AI Intake Form Questions
7. Do Not Send to AI List Template
8. AI Output Review Checklist
9. Customer Data Anonymization Mini Guide
10. AI Support Workflow Starter Map

## What This Repository Covers

- AI operations checklists
- prompt safety review
- human review gate design
- CRM and FAQ workflow templates
- customer data anonymization patterns
- public starter templates
- workflow documentation patterns

## Why This Exists

Most AI adoption problems are not solved by adding another prompt.

Teams also need to decide:

- what AI may receive
- what must be masked or rewritten
- what humans must review
- what should never be sent to AI as raw text
- what should be logged after AI output is used

Miraigent templates are built around that operating layer.

## Repository Structure

- free/ - free templates, starter kits, and public links
- mcp/ - runnable MCP servers and examples
- agent-memories/ - lightweight public introduction to reusable AI operating notes
- paid/ - paid product indexes and sample previews
- ja/ - Japanese guidance for domestic buyers
- LICENSE-SCOPE.md - license scope and paid-directory boundary
- NAMING.md - naming rules for files, folders, products, and URLs

## How to Use This Repo

1. Browse the free template library:
   https://miraigent.com/en/free-ai-operations-templates.html
2. Run the starter MCP server with `npm run mcp`.
3. Read free/ for the public resource map.
4. Use agent-memories/ for a lightweight overview of reusable AI operating notes.
5. Check paid/ for paid kit previews.

## Agent Memories

Agent Memories is a public-facing concept for turning repeated AI operating lessons into reusable notes and templates.

Examples:

- repeated review points
- safe handling notes
- writing preferences
- FAQ candidate rules
- prompt safety checklists
- customer data anonymization examples

This repository only contains public-facing resources and tool-layer examples. The MIRAI Memory engine itself and working memory MCPs are private and are not included here. Private company context, internal operating manuals, credentials, customer records, and deep product specifications should not be stored here.

Public introduction page:

https://miraigent.com/en/mirai-memory-mcp.html

## Roadmap

- Follow the 14-day public schedule in PUBLICATION_PLAN.md.
- Prepare free MCP candidates listed in FREE_MCP_CANDIDATES.md and collect public issue feedback before expanding automation.
- Add MCP tools for safe prompt review, FAQ candidate review, and AI-safe CRM notes.
- Publish more template metadata as machine-readable JSON.
- Add practical examples that show how human-review gates connect to AI agents.
- Keep free resources open while reserving private customer-specific implementation details for private workspaces.

## Japanese

このリポジトリは、MiraigentのAI運用テンプレートと公開向けスターターリソースを置く場所です。

国内向けには、まず「AI導入前に何を整えるべきか」をわかりやすく整理します。noteでは考え方や導入前チェックを発信し、BOOTHでは日本語テンプレート、チェックリスト、ワークシートを販売する想定です。

公開repoには、無料テンプレートと軽い紹介だけを置きます。深い商品仕様、内部運用、顧客情報、非公開の判断基準は置きません。

## Links

- Free templates: https://miraigent.com/en/free-ai-operations-templates.html
- MIRAI Memory public introduction: https://miraigent.com/en/mirai-memory-mcp.html
- Free diagnosis: https://miraigent.com/en/diagnosis.html
- Website: https://miraigent.com/
- note: https://note.com/miraigent
- X: https://x.com/miraigent
