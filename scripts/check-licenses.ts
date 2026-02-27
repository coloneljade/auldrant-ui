/**
 * Validates that every runtime dependency has an approved license and
 * a corresponding entry in the NOTICES file, and that NOTICES contains
 * no stale entries for removed dependencies.
 *
 * Usage:
 *   bun run licenses          — check only (CI / pre-commit)
 *   bun run licenses --fix    — auto-generate missing NOTICES entries
 *
 * Exit 0 = all checks pass. Exit 1 = one or more failures.
 */

const APPROVED_LICENSES = new Set(['MIT', 'ISC', 'Apache-2.0', '0BSD', 'Unlicense', 'CC0-1.0']);

const SECTION_DIVIDER = '='.repeat(80);

const fixMode = process.argv.includes('--fix');
const errors: string[] = [];

// 1. Read runtime dependencies from package.json
const pkg = await Bun.file('package.json').json();
const deps = Object.keys(pkg.dependencies ?? {});

// 2. Read NOTICES and parse into sections keyed by package name
const notices = await Bun.file('NOTICES').text();
const noticesEntries = new Set(
	[...notices.matchAll(/^(.+?) — /gm)].map((m) => {
		const [, name] = m;
		return name as string;
	})
);

// 3. Resolve repo URL from a dependency's package.json
function repoUrl(depPkg: { repository?: string | { url?: string } }): string {
	const repo = depPkg.repository;
	if (!repo) {
		return 'UNKNOWN';
	}
	const raw = typeof repo === 'string' ? repo : (repo.url ?? 'UNKNOWN');
	return raw.replace(/^git\+/, '').replace(/\.git$/, '');
}

// 4. Find and read a LICENSE file from a package directory
async function readLicense(dep: string): Promise<string | null> {
	const candidates = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENCE', 'license'];
	for (const name of candidates) {
		const file = Bun.file(`node_modules/${dep}/${name}`);
		if (await file.exists()) {
			return file.text();
		}
	}
	return null;
}

// 5. Check each dependency
const missing: string[] = [];

for (const dep of deps) {
	const depPkgPath = `node_modules/${dep}/package.json`;
	const depPkgFile = Bun.file(depPkgPath);

	if (!(await depPkgFile.exists())) {
		errors.push(`[MISSING] ${dep} — not installed (run bun install)`);
		continue;
	}

	const depPkg = await depPkgFile.json();
	const license: string = depPkg.license ?? 'UNKNOWN';

	// Validate license is approved
	if (!APPROVED_LICENSES.has(license)) {
		errors.push(`[LICENSE] ${dep} — "${license}" is not in the approved list`);
	}

	// Check NOTICES has an entry for this dep
	if (!noticesEntries.has(dep)) {
		missing.push(dep);
		if (!fixMode) {
			errors.push(`[MISSING] ${dep} — no entry in NOTICES`);
		}
	}

	noticesEntries.delete(dep);
}

// 6. Check for stale NOTICES entries
const stale = [...noticesEntries];
if (!fixMode) {
	for (const name of stale) {
		errors.push(`[STALE]   ${name} — in NOTICES but not in dependencies`);
	}
}

// 7. Fix mode: generate missing entries and remove stale ones
if (fixMode && (missing.length > 0 || stale.length > 0)) {
	let updated = notices;

	// Remove stale sections
	for (const name of stale) {
		const pattern = new RegExp(
			`\n${SECTION_DIVIDER}\n\n${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} — [^\n]*\n[\\s\\S]*?(?=\n${SECTION_DIVIDER}\n|$)`
		);
		updated = updated.replace(pattern, '');
	}

	// Append missing entries
	for (const dep of missing) {
		const depPkg = await Bun.file(`node_modules/${dep}/package.json`).json();
		const url = repoUrl(depPkg);
		const licenseText = await readLicense(dep);

		if (!licenseText) {
			errors.push(`[NO-FILE] ${dep} — no LICENSE file found in node_modules/${dep}/`);
			continue;
		}

		const entry = `\n${SECTION_DIVIDER}\n\n${dep} — ${url}\nTODO: describe what we use this for\n\n${licenseText.trimEnd()}\n`;
		updated += entry;
	}

	await Bun.write('NOTICES', updated);

	if (missing.length > 0) {
		console.log(`Added ${missing.length} NOTICES entry(s): ${missing.join(', ')}`);
		console.log('Review the generated entries and fill in the TODO descriptions.');
	}
	if (stale.length > 0) {
		console.log(`Removed ${stale.length} stale entry(s): ${stale.join(', ')}`);
	}
}

// 8. Report
if (errors.length > 0) {
	console.error('License check failed:\n');
	for (const err of errors) {
		console.error(`  ${err}`);
	}
	console.error(`\n${errors.length} error(s) found.`);
	process.exit(1);
} else {
	console.log(`License check passed — ${deps.length} dependencies verified.`);
}
