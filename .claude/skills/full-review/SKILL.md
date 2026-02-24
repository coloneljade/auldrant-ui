---
description: Comprehensive multi-domain review. Orchestrates multiple specialists for thorough code review.
---

# Full Review

Conduct a comprehensive review of the changes.

## Review Orchestration

### Always Run (in parallel)

1. **architecture-reviewer** → check for structural issues
2. **security-reviewer** → check for vulnerabilities

### Run If Applicable

3. **accessibility-reviewer** → if frontend/UI code present
4. **performance-reviewer** → if algorithms or data processing

### Escalation

After initial reviews complete:
- Check confidence levels from each reviewer
- If any reviewer reports MEDIUM or LOW confidence, escalate to corresponding expert
- Run expert reviews for flagged areas

### Expert Reviews (if escalated)

- **architecture-expert** → for complex structural concerns
- **security-expert** → for complex security concerns
- **performance-expert** → for complex performance concerns

## Synthesis

After all reviews complete:

1. Collect all findings
2. Prioritize by severity:
   - **Critical**: Security vulnerabilities, data loss risks
   - **High**: Architectural issues, performance problems
   - **Medium**: Code quality, maintainability
   - **Low**: Style, minor improvements

3. If decisions needed, use decision-brief format

## Output Format

```
## Full Review Summary

### Reviewers Consulted
- [x] architecture-reviewer (confidence: HIGH)
- [x] security-reviewer (confidence: MEDIUM → escalated)
- [x] security-expert
- [ ] accessibility-reviewer (not applicable)
- [ ] performance-reviewer (not applicable)

### Critical Issues
[None / List]

### High Priority
[Findings]

### Medium Priority
[Findings]

### Low Priority
[Findings]

### Opportunities
[Improvements identified across reviews]

### Decision Points
[If any decisions need user input]
```
