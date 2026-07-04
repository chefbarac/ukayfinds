import { searchInput, clearButton } from "./el.js";
import { render } from './render.js';

// Toggle visibility class smoothly
searchInput.addEventListener('input', () => {
    if (searchInput.value) {
        clearButton.classList.add('is-visible');
    } else {
        clearButton.classList.remove('is-visible');
    }
});

function resetSearch() {
    searchInput.value = '';
    searchInput.blur();
    clearButton.classList.remove('is-visible');
}

// Clear and blur interaction
clearButton.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    resetSearch();
    render();
});

let focusScrollY = 0;
let buffer = 200;
searchInput.addEventListener('focus', () => {
    focusScrollY = window.scrollY;
});

window.addEventListener('scroll', () => {
    if (
        document.activeElement === searchInput &&
        Math.abs(window.scrollY - focusScrollY) >= buffer
    ) {
        searchInput.blur();
    }
}, { passive: true });

export { resetSearch }