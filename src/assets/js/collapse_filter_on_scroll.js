import { throttleScroll } from "../lib/scroll";
import { controlsEl, btnToggleFilters } from "./el";


let lastScrollY = window.scrollY;
let filtersForceExpanded = false;
const SCROLL_THRESHOLD = 100; // pixels scrolled before collapsing
// auto collapse on scroll
let scrollAnchorY = window.scrollY; // reset point for measuring delta
const FORCE_COLLAPSE_DELTA = 500; // pixels of movement before force-closing filters

// const handleScroll = throttleScroll(() => {
//     const currentY = window.scrollY;
//     const shouldCollapse = currentY > SCROLL_THRESHOLD;

//     controlsEl.classList.toggle('collapsed', shouldCollapse);

//     if (shouldCollapse) {
//         window.removeEventListener('scroll', handleScroll);
//     }
// });

// window.addEventListener('scroll', handleScroll, { passive: true });
// handleScroll(); // sync initial state on load

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

    if (!clickedInsideControls || e.target.id === "btnClearFilters") {
        filtersForceExpanded = false;
        controlsEl.classList.remove('force-expanded');
    }
});