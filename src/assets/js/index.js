import productsUrl from '../products.json?url';
import productsSoldUrl from '../products_sold.json?url';
import { searchInput, productContainer, scrollTopBtn, btnToggleFavorites, collectionGroup, statusGroup, btnClearFilters } from './el.js';
import { showToast } from './toast.js'
import { render } from './render.js';
import { showClearSearch } from './search_micro_interact.js';
import { throttleScroll } from '../lib/scroll.js';
import { resetFilters } from './render.js';

let products = [];
let summary = {};
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
let favoriteMode = false;
let isSoldProductsFetched = false;

function getStatus(item) {
    if (item.is_sold) {
        return "Sold";
    }

    if (item.is_reserved) {
        return "Reserved";
    }

    return "Available";
}

// NOTE: contains emojis
const categoryMap = {
    Affordable: "🟤 Sulit",
    Regular: "🟢 Classic",
    Premium: "🟣 Premium",
};

async function loadProducts() {
    const res = await fetch(productsUrl);
    const data = await res.json(); // or parse module export
    // data = {summary: {}, data: []}
    const product_list = data.data;
    summary = data.summary;

    products = formatProducts((product_list || []).toReversed())

    populateFilters();
    initProductEvents();

    const { productNumber, collectionName } = getParams();
    handleParams(productNumber, collectionName);
    render(!productNumber && !collectionName);

    // Filter chips: click replaces input
    document.querySelectorAll(".filter-group:not([id='status'])").forEach((group) => {
        group.addEventListener("click", async (e) => {
            const btn = e.target.closest(".chip");
            selectChip(group, btn);

            render();
            trackFilter();
        });
    });
    // handle status filter clicks separately
    document.querySelectorAll('#status .chip').forEach(chip => {
        chip.addEventListener('click', async () => {
            const val = chip.dataset.value;
            if (['', 'Sold'].includes(val)) {
                // means fetch sold products if not done yet
                if (!isSoldProductsFetched) {
                    const res = await fetch(productsSoldUrl);
                    const data = await res.json().catch(() => showToast('Error fetching the sold products!'));

                    if (data?.data) {
                        let newProducts = formatProducts(data.data);
                        newProducts = [...products, ...newProducts];
                        products = newProducts.sort((a, b) => b.id - a.id);
                        isSoldProductsFetched = true;
                        showToast('Sold products have been fetched!')
                    } else {
                        return;
                    }
                }
            }

            const group = chip.closest('.filter-group');
            selectChip(group, chip);

            render();
            trackFilter();
        })
    })
}

function formatProducts(products) {
    return products.map(p => {
        return {
            ...p,
            images: p.images ? p.images.split("||") : [],
            status: getStatus(p),
            category: categoryMap[p.category],
        }
    });
}

function selectChip(group, chip) {
    if (!chip) return;

    group.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    group.dataset.value = chip.dataset.value;
}

loadProducts();

function cleanParams() {
    const url = new URL(window.location);

    // Modify your parameters
    url.searchParams.delete("p");
    url.searchParams.delete("c");

    // Clean up: If no parameters remain, strip the '?'
    const cleanUrl = url.searchParams.toString() ? url.toString() : url.toString().split("?")[0];

    window.history.replaceState({}, "", cleanUrl);
}

function getParams() {
    // 1. Get the query string from the URL (e.g., ?p=javascript)
    const urlParams = new URLSearchParams(window.location.search);

    // 2. Extract the value of the 'p' parameter
    const productNumber = urlParams.get("p");
    const collectionName = urlParams.get("c");
    return { productNumber, collectionName }
}


function handleParams(productNumber, collectionName) {
    if (productNumber) {
        searchInput.value = `#${productNumber} `;
        showClearSearch();
    }
    else if (collectionName) {
        const targetChip = collectionGroup.querySelector(`.chip[data-value="${collectionName}"]`);
        selectChip(collectionGroup, targetChip);
    } else {
        const targetChip = statusGroup.querySelector(`.chip[data-value="Available"]`);
        selectChip(statusGroup, targetChip);
    }
}

async function populateFilters() {
    const collections = [...new Set(products.map((p) => p.collection).filter(Boolean))].sort().map((collection) => ({
        name: collection,
        count: products.filter((p) => p.collection === collection).length,
    }));
    const sizes = [...new Set(products.map((p) => p.size).filter(Boolean))].sort(sizeComparator).map((size) => ({
        name: size,
        count: products.filter((p) => p.size === size).length,
    }));
    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort(categoryComparator).map((category) => ({
        name: category,
        count: products.filter((p) => p.category === category).length,
    }));
    const statuses = [...new Set(products.map((p) => p.status).filter(Boolean))].sort().map((status) => ({
        name: status,
        count: products.filter((p) => p.status === status).length,
    }));

    const fillSelect = (id, items, labelFn, valueFn) => {
        const group = document.getElementById(id);
        // remove every chip except the "All ..." default (the one with empty value)
        group.querySelectorAll('.chip:not([data-value=""])').forEach((c) => c.remove());

        items.forEach((item) => {
            const chip = document.createElement("button");
            chip.className = "chip";
            chip.type = "button";
            chip.dataset.value = valueFn ? valueFn(item) : item.name;
            chip.textContent = labelFn(item);
            group.appendChild(chip);
        });
    };

    fillSelect("collection", collections, (c) => `${c.name} (${c.count})`);
    fillSelect("size", sizes, (s) => `${s.name} (${s.count})`);
    /* fillSelect(
        "price",
        prices,
        (p) => `₱${p.name} (${p.count})`,
        (p) => String(p.name),
    ); */
    fillSelect("category", categories, (c) => `${c.name.split(" ")[1]} (${c.count})`);
    // fillSelect("status", statuses, (c) => `${c.name} (${c.count})`);
    statusGroup.querySelectorAll('.chip:not([data-value=""])').forEach(el => {
        const status = el.dataset.value;
        const count = summary[status];
        if (!count && status === 'Reserved') {
            el.style = "display: none";
        }
        el.innerText = `${el.dataset.value} (${count})`;
    })
}

function categoryComparator(a, b) {
    const ORDER = ["🟤 Sulit", "🟢 Classic", "🟣 Premium"];
    const ai = ORDER.indexOf(a);
    const bi = ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
}

function sizeComparator(a, b) {
    const ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"];
    const ai = ORDER.indexOf(a.toUpperCase());
    const bi = ORDER.indexOf(b.toUpperCase());
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
}

/* scroll to top */
(() => {
    scrollTopBtn.addEventListener('click', scrollBackToTop)

    const handleScroll = throttleScroll(() => {
        scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    })

    window.addEventListener("scroll", handleScroll, { passive: true });

    // hide initially
    scrollTopBtn.style.display = "none";
})();

const activeImageIndex = {};

function toDriveUrl(id) {
    // NOTE: don't flood google drive cdn on development
    if (import.meta.env.DEV) {
        return "";
    }
    return `https://lh3.googleusercontent.com/d/${id}`;
}

function setImage(productId, index) {
    const product = products.find((p) => p.id == productId);
    const carousel = document.querySelector(`#carousel-${productId}`);
    const imgEl = carousel.querySelector(".main-img");
    const spinner = carousel.querySelector(".img-spinner");

    const SPINNER_DELAY = 200; // ms before spinner appears

    // delay showing spinner so fast loads don't flash it
    const spinnerTimeout = setTimeout(() => {
        spinner.style.display = "block";
    }, SPINNER_DELAY);

    const full = new Image();
    full.onload = () => {
        clearTimeout(spinnerTimeout);
        imgEl.src = full.src;
        spinner.style.display = "none";
    };
    full.onerror = () => {
        clearTimeout(spinnerTimeout);
        spinner.style.display = "none";
    };
    full.src = toDriveUrl(product.images[index]) + "=w600";

    activeImageIndex[productId] = index;
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// your gtag tracking call
const trackFilter = debounce(function () {

    const search = document.getElementById("search").value.toLowerCase();
    const collection = document.getElementById("collection").dataset.value;
    const size = document.getElementById("size").dataset.value;
    // const price = document.getElementById("price").dataset.value;
    const category = document.getElementById("category").dataset.value;
    const status = document.getElementById("status").dataset.value;

    gtag("event", "filter_applied", {
        search,
        collection,
        size,
        category,
        favoriteMode,
        status,
    });
}, 3000); // wait 3 second after user stops typing

const trackFavorite = debounce(function (favorite) {
    gtag("event", "button_click", {
        favorite,
    });
}, 3000); // wait 3 second after user stops typing

function updateFilterCount(filters) {
    const activeCount = Object.values(filters).filter((v) => v !== "" && v != null).length;
    if (btnToggleFilters) {
        btnToggleFilters.textContent = activeCount > 0 ? `☰ Filters (${activeCount})` : `☰ Filters`;
        btnToggleFilters.classList.toggle("filters-active", activeCount > 0);
    }
}

function initProductEvents() {
    productContainer.addEventListener("click", handleProductClick);
}

function handleProductClick(e) {
    if (e.target.matches(".thumbnail-container")) {
        setImage(
            e.target.dataset.productId,
            Number(e.target.dataset.index)
        );
    }
    else if (e.target.matches(".favorite")) {
        toggleFavorite(Number(e.target.dataset.productId));
    }
    else if (e.target.matches(".share-link")) {
        copyShareLink(e.target.dataset.productId, e.target.dataset.productName);
    }
}

function copyShareLink(productId, productName) {
    const url = `${window.location.origin}${window.location.pathname}?p=${productId}`;
    const text = `${productName}\n${url}`
    navigator.clipboard.writeText(text).then(() => {
        showToast("Product link copied to clipboard!");
    });
}

function scrollBackToTop() {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    gtag("event", "button_click", {
        button_name: "scroll_back_to_top",
    });
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter((x) => x !== id);
        showToast("Product removed from favorites!");
    } else {
        favorites.push(id);
        showToast("Product added to favorites!");
        trackFavorite(`#${id}`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    render();
}

btnToggleFavorites.addEventListener('click', toggleFavoriteMode)

function toggleFavoriteMode(isReset) {
    btnToggleFavorites.classList.toggle("active");
    favoriteMode = !favoriteMode;

    if (isReset === true) return;
    render();
    trackFilter();

}

// Search input still works the same way
searchInput.addEventListener("input", (e) => {
    render();
    trackFilter();
});

btnClearFilters.addEventListener('click', resetFilters)

export { initProductEvents, products, updateFilterCount, favoriteMode, favorites, toDriveUrl, selectChip, toggleFavoriteMode }