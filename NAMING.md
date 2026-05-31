# Naming Rules

These rules are the source of truth for naming files, folders, products, and public URLs in this repository.

## Core Rule

Use English, lowercase, and hyphen-separated names for GitHub paths.

Good:

- `mcp-starter-kit`
- `ai-readiness-checklist`
- `agent-memories-starter-kit`

Avoid:

- `MCPStarterKit`
- `mcp_starter_kit`
- `MCPテンプレ集`
- `new-template-final-v2`

## Folder Names

Folder names must use:

- lowercase English
- hyphens between words
- no spaces
- no Japanese characters
- no version words such as `final`, `latest`, or `new`

Examples:

- `free/mcp-starter-kit/`
- `free/ai-readiness-checklist/`
- `agent-memories/basic-memory-log-template/`
- `paid/ai-ops-template-bundle/`
- `ja/booth-products/`

## Product Names

Use the English product name as the canonical name.

Japanese names can be used as localized descriptions.

Example:

- Canonical: `Agent Memories Starter Kit`
- Japanese description: `Agent Memories 導入スターターキット`

## File Names

Use lowercase English and hyphens.

Examples:

- `README.md`
- `template.md`
- `checklist.md`
- `workflow.md`
- `example-output.md`

When a date is required, use `YYYY-MM-DD`.

Example:

- `release-plan-2026-05-31.md`

## Language Policy

GitHub paths use English.

Documents can include both English and Japanese. For global-facing pages, write English first and add a Japanese section below it.

For domestic-only materials, Japanese can be the main language, but file and folder names still stay in English.

## URL Stability

Do not rename public folders after they are linked from:

- X
- note
- BOOTH
- Zenn
- Qiita
- GitHub README
- paid sales pages

If a folder name must change, keep a redirect note in the old folder instead of deleting it immediately.

