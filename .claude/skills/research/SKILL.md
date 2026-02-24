---
description: Research best practices and patterns before implementation using Double Diamond approach. Use at the start of any non-trivial task.
context: fork
agent: Explore
---

# Research: $ARGUMENTS

## Before External Research

Read the trusted sources for the domain you're researching:
- Frontend/TypeScript → Read `rules/frontend.md` (Trusted Sources section)
- CSS/Styling → Read `rules/css.md` (Trusted Sources section)
- Testing → Read `rules/test-writing.md` (Trusted Sources section)
- Accessibility → Read `rules/frontend.md` (Accessibility section)

Start with these authoritative sources before searching broadly.

## Source Quality

**Privilege authoritative sources over blog posts and tutorials.**

| Tier | Trust Level | Examples |
|------|-------------|----------|
| 1 | Authoritative | MDN Web Docs, Preact docs, Bun docs, Biome docs, W3C/WHATWG specs, OWASP |
| 2 | High Quality | Vite docs, Storybook docs, TypeScript handbook, maintainer repos |
| 3 | Community | Expert blogs, Stack Overflow (check votes + dates) |
| 4 | Avoid | Outdated tutorials (> 2 years), content farms, undated articles |

### Research Workflow

1. **Start with official docs** - understand the intended approach
2. **Check for recent changes** - APIs and best practices evolve
3. **Cross-reference** - if a blog contradicts official docs, trust the docs
4. **Note version** - solutions for v1 may not apply to v3

### When to Cite

Include source links when:
- Referencing specific API behavior
- Recommending patterns based on official guidance
- Quoting specifications (RFCs, standards)

## Double Diamond Framework

### Diamond 1: Problem Space

**Discover (Diverge)**
- What is the broader context?
- Who are the stakeholders?
- What related problems exist?
- What assumptions are we making?

**Define (Converge)**
- What is the core problem?
- What are the constraints?
- What does success look like?
- What is OUT of scope?

### Diamond 2: Solution Space

**Develop (Diverge)**
- What are ALL the ways we could solve this?
- What do similar systems do?
- What are the tradeoffs?

**Deliver (Converge)**
- Which solution best fits constraints?
- What are we trading off?
- What's the implementation path?

## Phase 1: Discover (Diverge)

### External Research

Search for current best practices (past 2 years):
- Modern approaches to this problem
- Common pitfalls and anti-patterns
- Reference implementations

### Codebase Assessment

- What similar patterns exist in this codebase?
- What conventions are already established?
- What files will likely be touched?

### Stakeholder Context

- Who/what is affected by this change?
- What constraints exist?

## Phase 2: Define (Converge)

### Problem Statement

Clearly state the problem we're solving. If uncertain, STOP and ask.

### Success Criteria

What does "done" look like?

### Scope Boundaries

What is explicitly OUT of scope?

## Opportunity Analysis

While researching, identify:
- What's in poor shape that we'll be touching anyway?
- What's missing? (tests, docs, error handling)
- What patterns are outdated that we could modernize?

## Specialist Recommendations

Based on the task domain, recommend:
- Complex/novel design? → design-advisor (Opus)
- Security implications? → security-expert
- Architectural decisions? → architecture-expert
- Performance concerns? → performance-expert
- Frontend specifics? → frontend-expert

## Output

Write research findings to the plan file, then continue planning:

1. Document findings in the plan file under "## Research Findings"
2. Proceed to design phase (propose implementation approaches)
3. Present plan to user for approval via ExitPlanMode
