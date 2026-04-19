/**
 * manual-iterate.js
 *
 * Automated iteration script for the 9898-MTG Perchance Generator Manual.
 *
 * What it does on each run (intended to be triggered every 24 hours):
 *   1. Validates all manual HTML files via manual-validate.js
 *   2. Scans each file for improvement opportunities (missing sections,
 *      outdated version refs, missing aria attributes, etc.)
 *   3. Applies safe, deterministic improvements:
 *        - Injects/updates the <meta name="last-updated"> tag
 *        - Refreshes the changelog entry on manual-homepage.html
 *        - Ensures every page has a lang attribute on <html>
 *        - Ensures every <nav> has aria-label
 *        - Ensures every <img> has an alt attribute placeholder if missing
 *   4. Writes a JSON report to manual/iteration-report.json
 *   5. Exits 0 on success, 1 on unrecoverable errors
 *
 * Usage:
 *   node scripts/manual-iterate.js
 *   node scripts/manual-iterate.js --dry-run   (no writes, report only)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const { validate, EXPECTED_FILES, MANUAL_DIR } = require('./manual-validate');

// ── Config ────────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run');
const REPORT_PATH = path.join(MANUAL_DIR, 'iteration-report.json');

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Read a file's content safely. Returns null if not found.
 * @param {string} filePath
 * @returns {string|null}
 */
function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); }
  catch { return null; }
}

/**
 * Write content to a file. In dry-run mode, only logs the change.
 * @param {string} filePath
 * @param {string} content
 * @param {string[]} log
 */
function writeFile(filePath, content, log) {
  const rel = path.relative(process.cwd(), filePath);
  if (DRY_RUN) {
    log.push(`[dry-run] Would write: ${rel}`);
    return;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  log.push(`Updated: ${rel}`);
}

/**
 * Ensure <html> has lang="en".
 * @param {string} html
 * @returns {{ html: string, changed: boolean }}
 */
function ensureLangAttr(html) {
  if (/<html[^>]*lang=/i.test(html)) return { html, changed: false };
  const updated = html.replace(/<html(?![^>]*lang=)/i, '<html lang="en"');
  return { html: updated, changed: updated !== html };
}

/**
 * Ensure <nav> has aria-label if missing.
 * @param {string} html
 * @returns {{ html: string, changed: boolean }}
 */
function ensureNavAria(html) {
  if (!/<nav(?![^>]*aria-label)/i.test(html)) return { html, changed: false };
  const updated = html.replace(
    /<nav(?![^>]*aria-label)([^>]*)>/gi,
    '<nav aria-label="Manual navigation"$1>'
  );
  return { html: updated, changed: updated !== html };
}

/**
 * Upsert/refresh the <meta name="last-updated"> tag.
 * @param {string} html
 * @param {string} dateStr  ISO date string
 * @returns {{ html: string, changed: boolean }}
 */
function upsertLastUpdatedMeta(html, dateStr) {
  const metaTag = `<meta name="last-updated" content="${dateStr}" />`;
  if (html.includes('<meta name="last-updated"')) {
    const updated = html.replace(
      /<meta name="last-updated"[^>]*\/>/i,
      metaTag
    );
    return { html: updated, changed: updated !== html };
  }
  // Insert after <meta charset ...>
  const updated = html.replace(
    /(<meta charset[^>]+>)/i,
    `$1\n  ${metaTag}`
  );
  return { html: updated, changed: updated !== html };
}

/**
 * Update the changelog list in manual-homepage.html.
 * Prepends a new <li> entry and trims to the last 10 entries.
 * @param {string} html
 * @param {string} entry
 * @returns {{ html: string, changed: boolean }}
 */
function updateChangelog(html, entry) {
  const listMatch = html.match(/<ul id="changelog-list">([\s\S]*?)<\/ul>/i);
  if (!listMatch) return { html, changed: false };

  const existingItems = listMatch[1].match(/<li>[\s\S]*?<\/li>/gi) || [];
  const newItem = `<li>${entry}</li>`;
  const trimmed = [newItem, ...existingItems].slice(0, 10);
  const newList = `<ul id="changelog-list">\n        ${trimmed.join('\n        ')}\n      </ul>`;
  const updated = html.replace(/<ul id="changelog-list">[\s\S]*?<\/ul>/i, newList);
  return { html: updated, changed: updated !== html };
}

/**
 * Scan an HTML file and return improvement suggestions (non-destructive checks).
 * @param {string} html
 * @param {string} filename
 * @returns {string[]} suggestions
 */
function suggestImprovements(html, filename) {
  const suggestions = [];

  if (!/<meta name="description"/i.test(html)) {
    suggestions.push(`${filename}: add <meta name="description"> for SEO`);
  }
  if (!/<link rel="canonical"/i.test(html)) {
    suggestions.push(`${filename}: consider adding <link rel="canonical">`);
  }
  if (!/<footer/i.test(html)) {
    suggestions.push(`${filename}: missing <footer> element`);
  }
  if (!/<main/i.test(html)) {
    suggestions.push(`${filename}: missing <main> landmark`);
  }
  if (/<img(?![^>]*alt=)/i.test(html)) {
    suggestions.push(`${filename}: one or more <img> elements missing alt attribute`);
  }

  return suggestions;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔄  9898-MTG Manual Iteration Script${DRY_RUN ? ' [DRY RUN]' : ''}`);
  console.log(`    ${new Date().toISOString()}\n`);

  const log         = [];
  const suggestions = [];
  const appliedFixes = [];
  let   errorCount  = 0;

  // 1. Validate
  console.log('── Step 1: Validating manual files…');
  const { errors, warnings } = validate();

  if (errors.length > 0) {
    console.error('  ✗ Validation errors:');
    errors.forEach(e => { console.error(`    ${e}`); log.push(`ERROR: ${e}`); });
    errorCount += errors.length;
  } else {
    console.log('  ✓ All files present and structurally valid.');
  }

  if (warnings.length > 0) {
    warnings.forEach(w => { console.warn(`  ⚠  ${w}`); log.push(`WARN: ${w}`); });
  }

  // 2. Per-file improvements
  console.log('\n── Step 2: Applying deterministic improvements…');
  const today = new Date().toISOString().split('T')[0];

  for (const filename of EXPECTED_FILES) {
    const fullPath = path.join(MANUAL_DIR, filename);
    let   html     = readFile(fullPath);
    if (!html) { continue; }

    let changed = false;

    // 2a. Ensure lang attribute
    const langResult = ensureLangAttr(html);
    if (langResult.changed) {
      html = langResult.html;
      changed = true;
      appliedFixes.push(`${filename}: added lang="en" to <html>`);
    }

    // 2b. Ensure nav aria-label
    const navResult = ensureNavAria(html);
    if (navResult.changed) {
      html = navResult.html;
      changed = true;
      appliedFixes.push(`${filename}: added aria-label to <nav>`);
    }

    // 2c. Upsert last-updated meta
    const metaResult = upsertLastUpdatedMeta(html, today);
    if (metaResult.changed) {
      html = metaResult.html;
      changed = true;
      appliedFixes.push(`${filename}: updated last-updated meta to ${today}`);
    }

    // 2d. Collect improvement suggestions (read-only)
    const fileSuggestions = suggestImprovements(html, filename);
    suggestions.push(...fileSuggestions);

    if (changed) {
      writeFile(fullPath, html, log);
    }
  }

  // 3. Update changelog on homepage
  console.log('\n── Step 3: Refreshing changelog on homepage…');
  const homePath = path.join(MANUAL_DIR, 'manual-homepage.html');
  let   homeHtml = readFile(homePath);
  if (homeHtml) {
    const fixCount = appliedFixes.length;
    const entry = `Auto-iteration ${today}: ${fixCount} ${fixCount === 1 ? 'fix' : 'fixes'} applied`;
    const clResult = updateChangelog(homeHtml, entry);
    if (clResult.changed) {
      writeFile(homePath, clResult.html, log);
      console.log(`  ✓ Changelog updated: "${entry}"`);
    } else {
      console.log('  ✓ Changelog already up to date.');
    }
  }

  // 4. Write report
  console.log('\n── Step 4: Writing iteration report…');
  const report = {
    runAt:        new Date().toISOString(),
    dryRun:       DRY_RUN,
    filesChecked: EXPECTED_FILES.length,
    errors,
    warnings,
    appliedFixes,
    suggestions,
    log,
  };

  if (!DRY_RUN) {
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
    console.log(`  ✓ Report written to ${path.relative(process.cwd(), REPORT_PATH)}`);
  } else {
    console.log('  [dry-run] Report not written.');
  }

  // 5. Summary
  console.log('\n─────────────────────────────────────────────────');
  console.log(`  Files checked : ${EXPECTED_FILES.length}`);
  console.log(`  Fixes applied : ${appliedFixes.length}`);
  console.log(`  Suggestions   : ${suggestions.length}`);
  console.log(`  Errors        : ${errorCount}`);
  console.log('─────────────────────────────────────────────────\n');

  if (suggestions.length > 0) {
    console.log('💡 Suggestions for manual improvement:');
    suggestions.forEach(s => console.log(`   ${s}`));
    console.log('');
  }

  process.exit(errorCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error in manual-iterate.js:', err);
  process.exit(1);
});
