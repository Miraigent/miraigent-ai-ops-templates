# Agent Memories and MIRAI Memory MCP

Agent Memories is Miraigent's product direction for turning operational memory into reusable AI workflow assets.

MIRAI Memory MCP is the larger concept: an external memory layer that helps agents use skills correctly across models, tasks, and teams.

## Core Idea

Teams do not only need prompts or skills.

They need memory:

- what failed
- what worked
- what should not be repeated
- what needs human approval
- what context must be preserved
- what should never be sent to AI
- what decision should be reused next time

Agent Memories turns these records into practical templates for AI operations.

## Product Layers

### Skill MCP

Skill MCP expands what an agent can do.

Examples:

- write an article
- check a support reply
- create a CRM note
- generate an FAQ candidate
- review a prompt before sending it to AI

Skill alone is easy to distribute, but it is not enough.

Without memory, a skill does not know the user's context, rules, repeated mistakes, or current workflow.

### Memory MCP

Memory MCP stores context outside a single model.

It helps a single agent remember:

- user preferences
- company context
- workflow rules
- past decisions
- blocked data types
- reusable checklists
- lessons from previous tasks

This is the core value of Agent Memories for personal and small-team use.

### Router MCP

Router MCP is the organizational layer.

It decides which agent, skill, and memory should be used for a task.

This matters when a company has:

- multiple AI agents
- multiple departments
- different permissions
- different memory profiles
- different review responsibilities
- task cards, decision logs, and handoff summaries

Router MCP is not necessary for simple one-agent use. It becomes important when an organization wants an AI team, not just one assistant.

## Personal vs Organizational Use

### Personal / B2C

One agent can work with:

- Skill MCP
- Memory MCP
- companion-style continuity
- lightweight task memory

This is the Agent Memories entry point.

The user keeps their memory outside the model, so different models or tasks can still use the same context.

### Organizational / B2B

An organization needs:

- Memory MCP
- Router MCP
- role-specific memory profiles
- permission-aware memory access
- Task Cards
- Decision Logs
- Handoff Summaries
- Boards

This is the MIRAI Memory Pro direction.

## Memory Profiles

Different agents should not read the same memory in the same way.

### Deep Judge

For reviewers, risk checks, approvals, and legal/quality decisions.

Reads:

- decision memory
- evidence memory
- risk criteria
- exception logs
- approval history

### Fast Worker

For execution, drafting, and production work.

Reads:

- task card
- constraints
- allowed files or systems
- completion criteria

### Balanced Operator

For writing, organizing, summarizing, and handoff work.

Reads:

- summary memory
- handoff notes
- selected source files
- current status

## Shared Operating Objects

When multiple agents work together, synchronizing through conversation is too slow and error-prone.

MIRAI Memory uses structured objects instead:

- Task Card: what to do, owner, allowed scope, stop conditions
- Decision Log: what was decided, why, and by whom
- Handoff Summary: what the next agent needs to know
- Board: current status, blockers, review state, and owner

## Current Entry Points

Free AI operations templates:

https://miraigent.com/en/free-ai-operations-templates.html

MIRAI Memory MCP concept page:

https://miraigent.com/en/mirai-memory-mcp.html

Free diagnosis:

https://miraigent.com/en/diagnosis.html

## Japanese

Agent Memoriesは、AI運用で必要になる「判断の記憶」「失敗の記憶」「承認の記憶」「繰り返してはいけないこと」を、再利用できるテンプレートとして整理する考え方です。

MIRAI Memory MCPは、その上位概念です。

- 個人向け: Skill MCP + Memory MCP + コンパニオン的な継続性
- 組織向け: Memory MCP + Router MCP + 役割別メモリー + Task Card / Decision Log / Handoff / Board

「全部覚えるAI」ではなく、「役割に合わせて必要な記憶だけを正しく使うAI」を目指します。
