# Maintenance Policy

This repository should show real maintenance activity, not activity padding.

## Daily Review Standard

Before any public update:

- pull with git pull --ff-only
- inspect git status --short --branch
- make only a meaningful improvement
- run npm run check
- run git diff --check
- commit only when checks pass

Meaningful improvements include:

- MCP server behavior that stays inside the non-memory AI operations helper boundary
- smoke-test or CI coverage
- clearer README, MCP README, or contribution guidance
- issue template improvements
- public template catalog clarity

Do not commit:

- empty activity updates
- date-only README changes
- root LICENSE changes that imply repository-wide MIT licensing
- private MIRAI Memory engine details
- working memory MCPs
- credentials, customer data, internal manuals, or full paid product files

## Boundary Rule

Public positioning must read as general AI operations templates and an ops MCP
starter. It must not read as an agent-memory MCP, a working memory MCP, or the
MIRAI Memory engine.

Code and wording are both part of the boundary.

## Secret Scan

npm run check includes scripts/secret-scan.mjs.

To enable the versioned pre-commit hook locally:

    npm run install-hooks

The hook runs npm run check before each commit.
