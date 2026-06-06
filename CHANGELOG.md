# Changelog

All notable public changes to this repository are documented here.

This project follows the spirit of Keep a Changelog and uses semantic versioning
for public starter releases.

## [0.1.9] - 2026-06-06

### Added

- Added OPEN_SOURCE_READINESS.md with public scope, reviewer quick checks, maintained signals, and resource routes.
- Added PUBLICATION_PLAN.md with a 14-day public release schedule, connected article plan, backlog, and stop conditions.

### Changed

- Updated the free MCP starter kit README so its tool list matches the current public AI operations MCP server.
- Clarified MCP README wording around reusable operating notes without implying a memory MCP.

## [0.1.8] - 2026-06-05

### Changed

- Added prominent Start Here routes in README for the Miraigent public resource hub, free diagnosis, npm package, Agent Memories, Qiita, and Zenn.
- Updated package homepage to the Japanese public resource hub.

## [0.1.7] - 2026-06-05

### Changed

- Aligned scripts/secret-scan.mjs with organization-level pre-commit token families for GitHub, Google, OpenAI, Stripe, AWS, Slack, Discord, npm, and private-key blocks.

### Notes

- The scanner runs through both npm run check and the versioned pre-commit hook.
- This release remains a non-memory AI operations helper.

## [0.1.6] - 2026-06-05

### Added

- Added scripts/secret-scan.mjs and included it in npm run check.
- Added a versioned pre-commit hook under .githooks/ plus npm run install-hooks.
- Added MAINTENANCE.md with daily update, public-boundary, scoped-license, and no-empty-commit rules.

### Notes

- This release remains a non-memory AI operations helper.
- Public wording must stay within the general AI operations templates / ops MCP starter boundary.

## [0.1.5] - 2026-06-05

### Added

- Added `draft_ai_ops_adoption_plan`, a non-memory MCP tool that turns an operations area, pain point, review owner, and risk level into a five-step template adoption plan.
- Added smoke-test coverage for the adoption-plan tool in both newline JSON-RPC and Content-Length input modes.

### Notes

- This release remains a non-memory AI operations helper.
- It is not a MIRAI Memory engine implementation or working memory MCP.

## [0.1.4] - 2026-06-05

### Added

- Added a conservative nextSteps response block for future Miraigent and Agent Memories runtime links.

### Notes

- The nextSteps links remain empty until the final landing URL is confirmed.
- This release remains a non-memory AI operations helper.

## [0.1.3] - 2026-06-05

### Fixed

- Added newline-delimited JSON-RPC input support for standard MCP stdio clients.
- Changed MCP stdio responses to newline-delimited JSON-RPC for standard MCP client compatibility.
- Added smoke-test coverage that fails if stdout contains Content-Length headers.

### Notes

- This release remains a non-memory AI operations helper.
- It is not a MIRAI Memory engine implementation or working memory MCP.

## [0.1.1] - 2026-06-04

### Added

- Added recommend_ai_ops_template_sequence MCP tool for non-memory AI operations template sequencing.
- Added npm bin entry for future npx execution after publication.
- Expanded starter MCP README with npx intent and quickstart notes.

### Notes

- This release remains a non-memory AI operations helper.
- npm publication is prepared but not executed until Miraigent account/QC approval.

## [0.1.0] - 2026-06-04

### Added

- Public AI operations template index.
- Dependency-free starter MCP server for AI operations templates.
- MCP smoke test for initialize, tools/list, and tools/call.
- Path-scoped MIT licensing for free/ and mcp/.
- Public boundary notes that keep MIRAI Memory engine and working memory MCPs private.
- Contribution guide, issue templates, pull request template, and CI workflow.

### Notes

- The starter MCP server is a non-memory AI operations helper.
- It is not a MIRAI Memory engine implementation.
- It is not a working memory MCP.
