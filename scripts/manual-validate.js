/**
 * manual-validate.js
 *
 * Validates all HTML files in the manual/ directory.
 * Checks:
 *   - File exists and is non-empty
 *   - Contains required HTML structural elements
 *   - All internal hrefs resolve to existing files
 *   - No broken nav links
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more validation errors found
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const MANUAL_DIR = path.resolve(__dirname, '..', 'manual');

// Expected files in the manual directory
const EXPECTED_FILES = [
  'manual-homepage.html',
  'manual-plugin-section.html',
  'manual-global-vars.html',
  'manual-blocks.html',
  'manual-integration-html.html',
  'manual-integration-js.html',
  'manual-integration-plugin-ui.html',
  'manual-integration-advanced.html',
];

// Each file must contain these substrings
const REQUIRED_CONTENT = [
  '<html',
  '<head',
  '<body',
  '<nav',
  'manual-homepage.html',
];

/**
 * Extract all href="..." values from an HTML string.
 * @param {string} html
 * @returns {string[]}
 */
function extractHrefs(html) {
  const re = /href="([^"#?]+)"/g;
  const hrefs = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    hrefs.push(m[1]);
  }
  return hrefs;
}

/**
 * Run all validation checks and return an array of error strings.
 * @returns {{ errors: string[], warnings: string[] }}
 */
function validate() {
  const errors   = [];
  const warnings = [];

  // 1. Manual directory must exist
  if (!fs.existsSync(MANUAL_DIR)) {
    errors.push(`Manual directory not found: ${MANUAL_DIR}`);
    return { errors, warnings };
  }

  // 2. All expected files must exist
  for (const file of EXPECTED_FILES) {
    const fullPath = path.join(MANUAL_DIR, file);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing file: ${file}`);
    }
  }

  // 3. Per-file content checks
  const existingFiles = new Set(
    fs.readdirSync(MANUAL_DIR).filter(f => f.endsWith('.html'))
  );

  for (const file of existingFiles) {
    const fullPath = path.join(MANUAL_DIR, file);
    const stat     = fs.statSync(fullPath);

    // Non-empty check
    if (stat.size === 0) {
      errors.push(`Empty file: ${file}`);
      continue;
    }

    const html = fs.readFileSync(fullPath, 'utf8');

    // Required content check
    for (const token of REQUIRED_CONTENT) {
      if (!html.includes(token)) {
        warnings.push(`${file}: missing expected content "${token}"`);
      }
    }

    // Internal link resolution
    const hrefs = extractHrefs(html);
    for (const href of hrefs) {
      // Only check relative .html links (skip http/https)
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto')) continue;
      const target = path.resolve(MANUAL_DIR, href);
      if (!fs.existsSync(target)) {
        errors.push(`${file}: broken link → ${href}`);
      }
    }
  }

  return { errors, warnings };
}

/**
 * Main entry point.
 * When called as a module, exports { validate }.
 * When run directly, prints results and exits with an appropriate code.
 */
if (require.main === module) {
  const { errors, warnings } = validate();

  if (warnings.length > 0) {
    console.warn('\n⚠  Warnings:');
    warnings.forEach(w => console.warn(`   ${w}`));
  }

  if (errors.length > 0) {
    console.error('\n✗  Validation errors:');
    errors.forEach(e => console.error(`   ${e}`));
    process.exit(1);
  }

  console.log(`\n✓  All ${EXPECTED_FILES.length} manual files validated successfully.`);
  process.exit(0);
}

module.exports = { validate, EXPECTED_FILES, MANUAL_DIR };
