# Contributing

Thank you for helping improve Miraigent AI Ops Templates.

This repository publishes public AI operations templates and non-memory helper
tools. It intentionally does not publish the MIRAI Memory engine, working memory
MCPs, private client materials, credentials, or full paid product files.

## Contribution Scope

Welcome:

- AI operations checklist improvements
- safer wording for human review gates
- non-memory MCP helper tools
- documentation fixes
- examples that improve privacy, reviewability, or operational clarity

Do not submit:

- API keys, tokens, cookies, or passwords
- private client information
- Re-BIRTH internal repository content
- MIRAI Memory engine code
- working memory MCP implementations
- full paid product files
- copyrighted third-party content without permission

## Before Opening a Pull Request

1. Run npm run install-hooks once after cloning so the versioned pre-commit hook runs locally.
2. Run npm test.
3. Run npm run check.
4. Confirm that your change stays within the public boundary.
5. Confirm that no secrets or private content are included.
6. Update CHANGELOG.md when the change affects public behavior.

## License

See LICENSE-SCOPE.md.

Code under free/ and mcp/ is MIT-licensed with path-scoped LICENSE files.
The paid/ directory is only a public index and is not MIT-licensed.
