# Open Source Readiness

This page summarizes what reviewers can inspect in this public repository.

Miraigent AI Ops Templates is a public resource set for teams that want to adopt
AI in customer operations with human review, data-handling boundaries, and
operational logs.

## What Is Public

- Free AI operations templates under free/.
- A dependency-free starter MCP server under mcp/ai-ops-template-server/.
- Public documentation for template discovery, human review gates, FAQ
  candidate workflows, and AI-safe CRM notes.
- CI checks for repository boundaries, secret scanning, and MCP smoke tests.

## What Is Not Public

- Private customer data.
- Credentials, tokens, cookies, or deployment secrets.
- The private MIRAI Memory engine.
- Working memory MCP servers.
- Paid product files beyond public names, previews, and sales-page references.

## Reviewer Quick Checks

Run the local checks:

    npm run check
    npm test

Run the starter MCP server:

    npm run mcp

Inspect the MCP server source:

    mcp/ai-ops-template-server/server.mjs

Inspect the public template catalog:

    free/

## Maintained Public Signals

- GitHub Actions run on every push.
- CHANGELOG.md records public updates.
- MAINTENANCE.md documents boundary and daily maintenance rules.
- PUBLICATION_PLAN.md shows the next public releases and review schedule.
- CONTRIBUTING.md documents contribution and safety expectations.
- LICENSE-SCOPE.md explains the path-scoped MIT license.

## Public Resource Routes

- Resource hub: https://miraigent.com/resources.html
- Free diagnosis: https://miraigent.com/diagnosis.html
- Free template library: https://miraigent.com/en/free-ai-operations-templates.html
- npm package: https://www.npmjs.com/package/@miraigent/ai-ops-templates
- Technical articles: https://qiita.com/Miraigent and https://zenn.dev/miraigent

## Current Maturity

This repository is an early public starter. It is useful for checking practical
AI operations patterns and running a small MCP template-discovery server.

It does not claim to be a full production automation platform.

The goal is to keep the public layer simple, inspectable, and safe while private
customer-specific implementation remains outside this repository.

Next public releases are tracked in PUBLICATION_PLAN.md.
