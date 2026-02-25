---
paths:
  - "src/**"
---

# Test Evaluation

## Philosophy

**Tests are part of implementation, not a separate phase.**

- Every change should include relevant test updates
- Write tests alongside code, not as an afterthought

## When to Write Tests First (TDD)

Consider test-first when:

- Requirements are unclear (tests clarify expected behavior)
- Algorithm is complex (tests prevent regressions)
- Edge cases are numerous (tests document them)
- API design is uncertain (tests reveal awkward interfaces)

## When to Write Tests Alongside

Write tests with implementation when:

- Requirements are clear and simple
- Following established patterns
- Making small, focused changes
- Modifying existing tested code

## Coverage Philosophy

- Aim for meaningful coverage, not 100%
- Critical paths deserve thorough testing
- Don't write tests for trivial code (getters, setters)
- Edge cases and error paths need coverage
- **Only test public contracts** — if the test would break from a refactor
  that doesn't change behavior, the test is testing implementation details
