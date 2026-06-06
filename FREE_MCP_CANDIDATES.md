# Free MCP Candidates

This page lists free MCP tools Miraigent may publish as public alpha candidates.

The goal is to start with small, reviewable tools that help teams prepare AI
operations before they automate customer-facing work.

These candidates are not production promises. They are public candidates for
feedback, bug reports, and practical use cases.

## Candidate Policy

- Keep each tool small enough to inspect.
- Avoid network access unless a future release clearly documents why it is
  needed.
- Do not process private customer data in examples.
- Do not publish MIRAI Memory engine behavior.
- Do not publish working memory MCPs.
- Prefer tools that turn messy operations into reviewable checklists, logs, or
  templates.

## How Feedback Should Arrive

Use GitHub issues for:

- bugs in the starter MCP server
- unclear tool output
- missing fields in a checklist or workflow
- candidate priority requests
- real-world examples that can be shared publicly without private data

Issue template:

    .github/ISSUE_TEMPLATE/free_mcp_candidate_feedback.md

## Candidate List

### 1. Prompt Risk Review MCP

Status: candidate.

Purpose:

- Review a prompt or AI task before it is used in operations.
- Identify privacy, legal, customer-facing, and human-review risks.
- Return a short checklist, not a final legal judgment.

Expected inputs:

- operation
- promptSummary
- dataTypes
- customerFacing
- riskLevel

Expected output:

- risk flags
- human review checklist
- do-not-send notes
- safer next step

### 2. Human Review Gate MCP

Status: candidate.

Purpose:

- Help teams decide when an AI draft needs human approval.
- Turn draft type, audience, and risk flags into a review gate.

Expected inputs:

- draftType
- audience
- riskFlags
- reviewOwner
- sendMode

Expected output:

- gate status: auto_ok, review_required, or stop
- reviewer checklist
- log fields to keep
- escalation note

### 3. FAQ Candidate Review MCP

Status: candidate.

Purpose:

- Turn repeated inquiry patterns into FAQ candidates.
- Separate public FAQ, internal FAQ, human-review rule, and reject decisions.

Expected inputs:

- inquiryPattern
- frequency
- responseCost
- riskLevel
- currentAnswer

Expected output:

- recommended status
- FAQ outline
- review owner
- public/internal boundary note

### 4. AI-Safe CRM Notes MCP

Status: candidate.

Purpose:

- Convert support or sales notes into safer CRM notes.
- Separate customer facts, AI suggestions, human decisions, and next actions.

Expected inputs:

- rawNoteSummary
- channel
- containsPersonalData
- nextAction
- owner

Expected output:

- CRM note structure
- masked fields checklist
- decision log fields
- follow-up task

### 5. Customer Data Masking Checklist MCP

Status: candidate.

Purpose:

- Help teams identify what should be masked before AI processing.
- This is a checklist helper, not an automatic anonymizer.

Expected inputs:

- dataSource
- dataTypes
- destination
- retentionNeed

Expected output:

- mask before AI list
- do not send list
- safe summary suggestion
- human review warning

### 6. Diagnosis Intake Log MCP

Status: candidate.

Purpose:

- Help teams structure a free diagnosis intake log before AI-assisted analysis.
- Keep intake short enough for humans to submit while preserving operational
  context.

Expected inputs:

- businessType
- inquiryChannels
- currentPain
- desiredOutcome

Expected output:

- intake fields
- follow-up questions
- risk flags
- recommended template sequence

### 7. Decision Log MCP

Status: candidate.

Purpose:

- Record what humans decided before AI automation expands.
- Make approvals, holds, and rejected automation paths visible.

Expected inputs:

- sourceType
- decisionType
- requestedBy
- owner
- reason
- options

Expected output:

- decision log row
- missing decision fields
- next action
- review cadence

### 8. Support Workflow Starter Map MCP

Status: candidate.

Purpose:

- Turn a support workflow into a simple map: intake, classify, draft, review,
  send, log, improve.

Expected inputs:

- channels
- currentTools
- reviewOwner
- automationGoal
- riskLevel

Expected output:

- workflow map
- first three templates to use
- review checkpoints
- issue candidates for implementation

## Suggested Public Order

1. Human Review Gate MCP
2. FAQ Candidate Review MCP
3. AI-Safe CRM Notes MCP
4. Prompt Risk Review MCP
5. Customer Data Masking Checklist MCP
6. Diagnosis Intake Log MCP
7. Decision Log MCP
8. Support Workflow Starter Map MCP

This order starts with reviewability and support operations before broader
automation. It should make early feedback easier because users can test the
tools without connecting private systems.

## Publication Rule

Each candidate should move through this path:

1. candidate documented
2. alpha tool added to the starter MCP server
3. smoke test added
4. README example added
5. GitHub issue feedback monitored
6. Qiita or Zenn article published
7. changelog updated

If a candidate needs private data, customer-specific implementation, or memory
engine behavior to be useful, it should not be published as a free MCP.
