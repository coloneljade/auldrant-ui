# Versioning Rules

## Do NOT Edit Versions Manually

Version bumps and CHANGELOG entries are owned by the merge bot (`/merge` on PR).
**Never** edit the `version` field in `package.json` or CHANGELOG version sections
during normal workflow.

## Single Source of Truth

| Setting | Location | Never Duplicate To |
|---------|----------|-------------------|
| Version | `package.json` (`version` field) | Other config files |
| Package Name | `package.json` (`name` field) | Other config files |
| TypeScript Config | `tsconfig.json` | Vite config |
| Biome Config | `biome.json` | Editor config overrides |
