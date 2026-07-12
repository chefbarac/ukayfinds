// Post-build step: scans docs/, builds a precache list of every emitted
// asset, and injects it into docs/sw.js in place of the placeholder.
// Also stamps a content-based CACHE_VERSION so the SW auto-busts old
// caches whenever the build output changes.

import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const DIST_DIR = 'docs';
const SW_PATH = join(DIST_DIR, 'sw.js');

function walk(dir, files = []) {
    for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath, files);
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = walk(DIST_DIR).filter((f) => f !== SW_PATH);

// Convert filesystem paths to root-relative URL paths, e.g. "/assets/index-a1b2c3.js"
const precacheUrls = allFiles.map((f) => {
    const rel = relative(DIST_DIR, f).split(sep).join('/');
    return '/' + rel;
});

// Always include the app shell entry point explicitly.
if (!precacheUrls.includes('/index.html')) {
    precacheUrls.push('/index.html');
}

// Content hash across all files -> stable version id that changes
// whenever the build output changes (forces old caches to be dropped).
const hash = createHash('sha256');
for (const f of allFiles) {
    hash.update(readFileSync(f));
}
const version = hash.digest('hex').slice(0, 10);

let swSource = readFileSync(SW_PATH, 'utf8');
swSource = swSource.replace(
    '[/* PRECACHE_MANIFEST_PLACEHOLDER */]',
    JSON.stringify(precacheUrls, null, 2)
);
swSource = swSource.replace('__CACHE_VERSION__', version);

writeFileSync(SW_PATH, swSource);

console.log(`[generate-sw] Precached ${precacheUrls.length} files, cache version ${version}`);
