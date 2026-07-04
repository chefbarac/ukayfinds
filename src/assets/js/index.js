import productsUrl from '../products.json?url';
import { searchInput, productContainer, scrollTopBtn, btnToggleFavorites, collectionGroup, statusGroup, btnClearFilters } from './el.js';
import { showToast } from './toast.js'
import { render } from './render.js';
import { showClearSearch } from './search_micro_interact.js';
import { throttleScroll } from '../lib/scroll.js';
import { resetFilters } from './render.js';

let products = [];
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
let favoriteMode = false;

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
    const product_list = await res.json(); // or parse module export

    products = (product_list || []).toReversed().map((p) => {
        return {
            ...p,
            images: p.images ? p.images.split("||") : [],
            status: getStatus(p),
            category: categoryMap[p.category],
        };
    });

    populateFilters();
    initProductEvents();

    const { productNumber, collectionName } = getParams();
    handleParams(productNumber, collectionName);
    render(!productNumber && !collectionName);

    // Filter chips: click replaces input
    document.querySelectorAll(".filter-group").forEach((group) => {
        group.addEventListener("click", (e) => {
            const btn = e.target.closest(".chip");
            selectChip(group, btn);

            render();
            trackFilter();
        });
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
    /* const prices = [...new Set(products.map((p) => p.price).filter((v) => v != null))]
        .sort((a, b) => a - b)
        .map((price) => ({
            name: price,
            count: products.filter((p) => p.price === price).length,
        })); */
    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort(categoryComparator).map((category) => ({
        name: category,
        count: products.filter((p) => p.category === category).length,
    }));
    const statuses = [...new Set(products.map((p) => p.status).filter(Boolean))].sort().map((status) => ({
        name: status,
        count: products.filter((p) => p.status === status).length,
    }));

    /*
    const fillSelect = (id, items, labelFn, valueFn) => {
        const select = document.getElementById(id);
        select.querySelectorAll('option:not([value=""])').forEach((o) => o.remove());
        items.forEach((item) => {
            const opt = document.createElement("option");
            opt.value = valueFn ? valueFn(item) : item.name;
            opt.textContent = labelFn(item);
            select.appendChild(opt);
        });
    };*/

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
    fillSelect("status", statuses, (c) => `${c.name} (${c.count})`);
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

/* window.addEventListener("popstate", (e) => {
    // Re-push state to keep trapping the back button
    history.pushState(null, "", window.location.href);
    window.scrollTo({ top: 0, behavior: "smooth" });
}); */

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

// COLLAPSE FILTER ON SCROLL
// ...
// END COLLAPSE FILTER ON SCROLL

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOMContentLoaded!");
// });

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

    // show spinner
    spinner.style.display = "block";
    // imgEl.style.opacity = "0";

    const full = new Image();
    full.onload = () => {
        imgEl.src = full.src;
        // imgEl.style.opacity = "1";
        spinner.style.display = "none";
    };
    full.onerror = () => {
        spinner.style.display = "none";
        // imgEl.style.opacity = "1";
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
    /* const search = document.getElementById("search").value.toLowerCase();
    const collection = document.getElementById("collection").value;
    const size = document.getElementById("size").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value; */

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
    if (e.target.matches(".thumbnail")) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    /*
    const btn = document.getElementById("btnToggleFavorites");
    if (btn) btn.innerText = favoriteMode ? "♡ Favorites" : "❤️ Favorites"; */


    if (isReset === true) return;
    render();
    trackFilter();

}

/*
document.querySelectorAll("input,select").forEach((x) =>
    x.addEventListener("input", (e) => {
        render();
        trackFilter(e.target.value); // gtag waits for pause
    }),
);*/

// Search input still works the same way
searchInput.addEventListener("input", (e) => {
    render();
    trackFilter();
});

btnClearFilters.addEventListener('click', resetFilters)

export { initProductEvents, products, updateFilterCount, favoriteMode, favorites, toDriveUrl, selectChip, toggleFavoriteMode }