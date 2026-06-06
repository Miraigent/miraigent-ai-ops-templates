# Publication Plan

This plan explains what Miraigent will publish in this repository and connected
public channels.

The goal is to make the public work easy to inspect: templates, MCP starter
tools, examples, safety checks, release notes, and technical articles should
move forward in small reviewed updates.

## Publishing Principles

- Publish practical AI operations resources, not private customer work.
- Prefer small weekly releases that reviewers can inspect.
- Keep the public boundary clear: no credentials, no customer records, no MIRAI
  Memory engine, and no working memory MCPs.
- Every code or template update should pass npm run check.
- Public articles should link back to the resource hub and this repository.

## Current Public Base

- Resource hub: https://miraigent.com/resources.html
- GitHub repository: https://github.com/Miraigent/miraigent-ai-ops-templates
- npm package: https://www.npmjs.com/package/@miraigent/ai-ops-templates
- Qiita: https://qiita.com/Miraigent
- Zenn: https://zenn.dev/miraigent
- note: https://note.com/miraigent

## 14-Day Public Schedule

### Day 1: Reviewer Readiness

Status: published.

- Add OPEN_SOURCE_READINESS.md.
- Link readiness from README.
- Confirm CI passes on the public repository.
- Confirm the readiness page is available on GitHub.

### Day 2: Publication Plan

Status: this document.

- Add this PUBLICATION_PLAN.md.
- Link it from README and OPEN_SOURCE_READINESS.md.
- Make the next two weeks of public work visible.

### Day 3: MCP Tool Documentation

Publish:

- A clearer MCP tool catalog in mcp/ai-ops-template-server/README.md.
- One example request and response for each public MCP tool.
- A short note about what the starter server does not automate.
- Free MCP candidate documentation and issue feedback routing.

Public article:

- Qiita or Zenn article explaining how the MCP starter server helps review AI
  operations templates before automation.

### Day 4: Template Metadata

Publish:

- Machine-readable metadata for the free templates.
- Template categories such as review, privacy, CRM, FAQ, and workflow.
- A smoke-test check that verifies every listed template has a public route.

### Day 5: Human Review Gate Example

Publish:

- A practical example showing how a team records AI draft approval before
  sending a customer-facing response.
- A sample log schema without private customer data.

Public article:

- Qiita or Zenn implementation note for a simple approval queue.

### Day 6: FAQ Candidate Workflow Example

Publish:

- A public example that converts inquiry patterns into FAQ candidates.
- A safe status flow: candidate, approved, needs_revision, rejected.
- A note about separating public FAQ, internal FAQ, and human-review rules.

### Day 7: Weekly Review and Release Notes

Publish:

- A changelog update.
- One summarized weekly maintenance note.
- If the package changed, a version tag and npm release after checks pass.

### Day 8: AI-Safe CRM Notes Example

Publish:

- A CRM note example that separates customer facts, AI suggestions, human
  decisions, and follow-up tasks.
- A do-not-send-raw-data-to-AI checklist reference.

### Day 9: Secret and Boundary Checks

Publish:

- Stronger repository boundary checks if needed.
- Documentation for the secret-scan patterns and local pre-commit hook.
- A short reviewer note about why paid files and private engines are excluded.

### Day 10: Starter Sequence Tool Example

Publish:

- Example usage for recommending a template sequence.
- A small no-network demo script if it adds clarity.
- Test coverage for the example behavior.

### Day 11: Free Diagnosis Connection

Publish:

- A public explanation of how repository resources connect to the free diagnosis
  flow on Miraigent.
- A non-customer sample path from diagnosis intake to checklist selection.

### Day 12: Article Backlinks and Resource Hub Refresh

Publish:

- Update technical article footers when needed.
- Confirm public resource hub links to GitHub, npm, Qiita, Zenn, note, and Agent
  Memories.
- Record broken-link checks in the site or content pipeline repository.

### Day 13: Contributor Onboarding

Publish:

- A short contributor quickstart.
- Expected review boundaries for template improvements.
- Issue examples for template improvement and MCP starter bug reports.

### Day 14: Public Review Package

Publish:

- A short summary of what changed over the two weeks.
- Links to the readiness page, this plan, changelog, CI runs, npm package,
  technical articles, and resource hub.
- A list of next public improvements for the following two weeks.

## Backlog After 14 Days

- Add more example workflows for support, sales intake, FAQ updates, and safe
  CRM notes.
- Add more MCP starter tools only when they remain non-memory and reviewable.
- Promote free MCP candidates from documented candidate to alpha tool after
  smoke tests and public examples are ready.
- Keep expanding technical articles that explain practical AI operations.
- Improve machine-readable template metadata.
- Add docs for how teams can adapt the free templates internally.

## Stop Conditions

Do not publish if an update includes:

- Credentials, cookies, tokens, or private keys.
- Customer records or private company notes.
- Private MIRAI Memory engine details.
- Working memory MCP behavior.
- Full paid product files.
- Claims that imply the starter repository is a production automation platform.

If a planned item crosses one of these lines, keep it private and publish only a
safe explanation of the boundary.
