import { controlsEl, btnToggleFilters } from "./el";


let lastScrollY = window.scrollY;
let filtersForceExpanded = false;
const SCROLL_THRESHOLD = 100; // pixels scrolled before collapsing
// auto collapse on scroll
let scrollAnchorY = window.scrollY; // reset point for measuring delta
const FORCE_COLLAPSE_DELTA = 250; // pixels of movement before force-closing filters

window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY > SCROLL_THRESHOLD) {
        controlsEl.classList.add('collapsed');
    } else {
        controlsEl.classList.remove('collapsed');
    }

    if (filtersForceExpanded) {
        const delta = Math.abs(currentY - scrollAnchorY);
        if (delta > FORCE_COLLAPSE_DELTA) {
            filtersForceExpanded = false;
            controlsEl.classList.remove('force-expanded');
        }
    } else {
        // keep anchor fresh while not force-expanded, so next open starts from a clean baseline
        scrollAnchorY = currentY;
    }

    lastScrollY = currentY;
}, { passive: true });

function toggleFilters() {
    filtersForceExpanded = !filtersForceExpanded;
    controlsEl.classList.toggle('force-expanded', filtersForceExpanded);

    if (filtersForceExpanded) {
        scrollAnchorY = window.scrollY; // start measuring from here
    }
}

btnToggleFilters.addEventListener('click', toggleFilters);

document.addEventListener('click', (e) => {
    if (!filtersForceExpanded) return;

    const clickedInsideControls = controlsEl.contains(e.target);

    if (!clickedInsideControls) {
        filtersForceExpanded = false;
        controlsEl.classList.remove('force-expanded');
    }
});