# Problem Solving

## Fix Architecture, Not Symptoms

When a skill, rule, or process is broken, fix the design — don't add a workaround in a different layer.

**Signs you're patching a symptom:**
- Adding a check that compensates for a missing constraint elsewhere
- Duplicating logic because the original is in the wrong place
- Adding a "just in case" guard for something that should be structurally impossible

**What to do instead:**
- Identify where the root cause lives
- Fix or redesign at that layer
- Remove the workarounds that are no longer needed

## Don't Resist Architectural Fixes

If a proposed fix addresses the root cause, don't push back just because it touches more files or changes more structure. Present concerns about risk — don't silently patch around them.

**Acceptable pushback:**
- "This fix is correct but risky because [specific reason] — can we mitigate with [approach]?"
- "There's a simpler structural fix that achieves the same goal"

**Not acceptable:**
- Silently working around the broken design
- Adding complexity to avoid changing existing structure
- Deferring indefinitely ("we can fix the real issue later")

## Escalate Design Concerns Early

If you notice a structural problem while working on something else, flag it rather than working around it.

- Mention what you observed and why it matters
- Suggest whether it should be fixed now or tracked for later
- Don't silently absorb the cost of a bad design into your current work
