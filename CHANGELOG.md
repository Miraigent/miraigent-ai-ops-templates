# Changelog

All notable public changes to this repository are documented here.

This project follows the spirit of Keep a Changelog and uses semantic versioning
for public starter releases.

## [Unreleased]

### Changed

- Corrected the MCP README to document that unsupported template-sequence
  priorities return a validation error instead of being silently ignored.
- Clarified that the checked-out MCP client configuration is for local
  development or source review, removing outdated pre-publication wording.
- Replaced outdated pre-publication npm wording with the working `npx` command
  and version-pinning guidance for repeatable MCP client configuration.
- Updated local MCP run examples to use npm's silent mode so command banners do
  not pollute the JSON-RPC stdout stream.
- Added a local MCP client configuration example that runs the checked-out
  server directly without implying that the npm package is already published.

### Added

- Added MCP smoke-test coverage that preserves valid `null` and zero JSON-RPC
  request ids in responses.
- Added MCP smoke-test coverage for missing and unsupported JSON-RPC protocol
  versions and non-object requests.
- Expanded repository boundary checks to reject common root license filenames,
  preventing an accidental repository-wide license from overriding scoped MIT
  licensing.
- Expanded scoped-license boundary checks to reject root `LICENCE*` and
  `COPYING.*` variants as well as root `LICENSE*` files.
- Added smoke-test coverage for malformed JSON-RPC input and the standard
  parse-error response across supported input framing modes.
- Added MCP `ping` support and smoke-test coverage so clients can verify that
  the starter server is responsive.
- Added smoke-test coverage that `notifications/initialized` is accepted
  without sending an extra JSON-RPC response.
- Added smoke-test coverage that unsupported JSON-RPC notifications do not
  produce a response.
- Added smoke-test coverage for compact MCP `Content-Length` headers.
- Added smoke-test coverage for MCP tool schemas that require template ids and
  advertise supported `riskLevel` values.
- Added supported template-sequence priorities to the MCP input schema and
  smoke-test coverage so clients can discover the accepted values.
- Added smoke-test coverage for whitespace-only MCP operation and adoption-plan
  inputs.
- Added smoke-test coverage for whitespace-only JSON-RPC method and MCP tool
  name values.
- Added smoke-test coverage for case and whitespace normalization in MCP
  `riskLevel` and template-sequence `priorities` inputs.
- Added smoke-test coverage for case and whitespace normalization in MCP
  template id lookups.
- Documented supported MCP `riskLevel` and template-sequence `priorities`
  values in the MCP server README.
- Added a manual MCP initialize example to the MCP server README so reviewers can
  verify the standard handshake before calling tools.
- Added pull request checklist items for the scoped-license boundary and public
  non-memory MCP positioning.
- Added smoke-test coverage for empty and non-string JSON-RPC method values.
- Added smoke-test coverage for non-string MCP checklist operations.
- Added smoke-test coverage for non-string MCP adoption-plan review owners.
- Added smoke-test coverage for non-string MCP adoption-plan current-pain values.
- Added smoke-test coverage for non-string MCP template-sequence operations.
- Added smoke-test coverage for non-string MCP template-sequence priorities.
- Added smoke-test coverage for non-string MCP risk-level inputs.
- Added smoke-test coverage for the MCP checklist tool's legacy `workflow`
  alias and default risk-level handling.
- Added smoke-test coverage for malformed MCP `tools/call` requests that omit
  the tool name.
- Added smoke-test coverage for malformed MCP `tools/call` requests that pass
  non-object arguments.
- Added smoke-test coverage for malformed MCP `tools/call` requests that pass
  non-object params.

### Fixed

- Reject unsupported template-sequence priorities at runtime instead of
  silently ignoring values outside the advertised MCP input schema.
- Reject requests that do not declare JSON-RPC 2.0 instead of processing them
  as valid MCP messages.
- Accept the standard MCP `notifications/initialized` notification as a no-op
  so clients do not receive an unsupported-method error after initialization.
- Suppress error responses for unsupported JSON-RPC notifications, as required
  for requests without an id.
- Accept compact MCP `Content-Length` headers without requiring a space after
  the colon.
- Trim MCP checklist and adoption-plan string inputs before validation so
  whitespace-only values are rejected consistently.
- Normalize MCP `riskLevel` and template-sequence `priorities` inputs before
  validation so direct JSON-RPC clients can pass uppercase or space-padded
  values.
- Normalize MCP template id lookups before matching so direct JSON-RPC clients
  can pass uppercase or space-padded values.
- Return a clear MCP error when JSON-RPC requests omit a valid method string.
- Return a clear MCP error when JSON-RPC method or MCP tool name values contain
  only whitespace.
- Return a clear MCP error when `build_ai_ops_review_checklist` receives a
  non-string operation value.
- Return a clear MCP error when `draft_ai_ops_adoption_plan` receives a
  non-string review owner.
- Return a clear MCP error when `recommend_ai_ops_template_sequence` receives
  a non-string operation value.
- Return a clear MCP error when `recommend_ai_ops_template_sequence` receives
  non-string priority values.
- Return a clear MCP error when `recommend_ai_ops_template_sequence` receives
  a non-array `priorities` value.
- Return a clear MCP error when MCP tools receive non-string `riskLevel` values.
- Return a clear MCP error when `get_ai_ops_template` omits the template id.
- Return a clear MCP error when `tools/call` receives non-object arguments.
- Return a clear MCP error when `tools/call` receives non-object params.
- Honored the documented `review`, `intake`, and `workflow` priorities in MCP
  template sequence recommendations and added smoke-test coverage for them.
- Return a clear MCP error when `tools/call` omits the tool name.
- Read the MCP server initialize version from package.json to prevent manual
  version drift.
- Aligned the MCP server initialize version with package.json and added smoke
  test coverage to catch future version drift.
- Added runtime validation and smoke-test coverage for unsupported MCP
  `riskLevel` values.
- Included the AI Prompt Risk Review Sheet in MCP template sequence
  recommendations and added smoke-test coverage for full catalog inclusion.

## [0.1.10] - 2026-06-10

### Added

- Added smoke-test coverage for unknown MCP tool and template-id error
  responses.

### Changed

- Added manual JSON-RPC examples to the MCP server README so reviewers can try
  tool listing, template lookup, and adoption-plan drafting without extra
  client setup.
- Expanded npm keywords to improve discovery: mcp-server, model-context-protocol,
  agent-memories, human-in-the-loop, workflow-automation, customer-support, crm,
  faq, review-gate, claude-desktop, cursor-mcp, developer-tools, npx.

## [0.1.9] - 2026-06-06

### Added

- Added OPEN_SOURCE_READINESS.md with public scope, reviewer quick checks, maintained signals, and resource routes.
- Added PUBLICATION_PLAN.md with a 14-day public release schedule, connected article plan, backlog, and stop conditions.
- Added FREE_MCP_CANDIDATES.md and a GitHub issue template for public free MCP candidate feedback.

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
