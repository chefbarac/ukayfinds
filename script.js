console.log("v=1.1.7");

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

products = (products || []).toReversed().map((p) => {
    return {
        ...p,
        images: p.images ? p.images.split("||") : [],
        status: getStatus(p),
        category: categoryMap[p.category],
    };
});

document.querySelectorAll(".filter-group").forEach(function (group) {
    group.addEventListener("click", function (e) {
        var btn = e.target.closest(".chip");
        if (!btn) return;
        group.querySelectorAll(".chip").forEach(function (c) {
            c.classList.remove("active");
        });
        btn.classList.add("active");
        group.dataset.value = btn.dataset.value; // read this wherever you used select.value before
    });
});

function cleanParams() {
    const url = new URL(window.location);

    // Modify your parameters
    url.searchParams.delete("p");
    url.searchParams.delete("c");

    // Clean up: If no parameters remain, strip the '?'
    const cleanUrl = url.searchParams.toString() ? url.toString() : url.toString().split("?")[0];

    window.history.replaceState({}, "", cleanUrl);
}

/*
function handleParams() {
    // 1. Get the query string from the URL (e.g., ?p=javascript)
    const urlParams = new URLSearchParams(window.location.search);

    // 2. Extract the value of the 'p' parameter
    const productNumber = urlParams.get("p");
    const collectionName = urlParams.get("c");
    // cleanParams();

    // 3. If 'p' exists in the URL, populate the input field
    if (productNumber) {
        const searchInput = document.getElementById("search");
        searchInput.value = `#${productNumber} `;
        // 2. Create a new 'input' event
        const event = new Event("input", {
            bubbles: true, // Allows the event to bubble up the DOM tree
            cancelable: true, // Allows the event to be canceled
        });

        // 3. Dispatch the event on the input element
        searchInput.dispatchEvent(event);
    }
    if (collectionName) {
        const collectionInput = document.getElementById("collection");
        collectionInput.value = `${collectionName}`;
        // 2. Create a new 'input' event
        const event = new Event("input", {
            bubbles: true, // Allows the event to bubble up the DOM tree
            cancelable: true, // Allows the event to be canceled
        });

        // 3. Dispatch the event on the input element
        collectionInput.dispatchEvent(event);
    }
}*/

function handleParams() {
    // 1. Get the query string from the URL (e.g., ?p=javascript)
    const urlParams = new URLSearchParams(window.location.search);

    // 2. Extract the value of the 'p' parameter
    const productNumber = urlParams.get("p");
    const collectionName = urlParams.get("c");
    // cleanParams();

    // 3. If 'p' exists in the URL, populate the input field
    if (productNumber) {
        const searchInput = document.getElementById("search");
        searchInput.value = `#${productNumber} `;
        const event = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        searchInput.dispatchEvent(event);
    }

    if (collectionName) {
        const collectionGroup = document.getElementById("collection");
        const targetChip = collectionGroup.querySelector(`.chip[data-value="${collectionName}"]`);
        if (targetChip) {
            targetChip.click(); // triggers your existing delegated click handler
            /*const event = new Event("click", {
                bubbles: true,
                cancelable: true,
            });
            targetChip.dispatchEvent(event);*/
        } else {
            console.warn(`No chip found for collection "${collectionName}"`);
        }
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
    const btn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // hide initially
    btn.style.display = "none";
})();

// COLLAPSE FILTER ON SCROLL
let lastScrollY = window.scrollY;
let filtersForceExpanded = false;
const controlsEl = document.getElementById("controls");
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

document.addEventListener('click', (e) => {
    if (!filtersForceExpanded) return;

    const clickedInsideControls = controlsEl.contains(e.target);

    if (!clickedInsideControls) {
        filtersForceExpanded = false;
        controlsEl.classList.remove('force-expanded');
    }
});
// END COLLAPSE FILTER ON SCROLL

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded!");
    const ua = navigator.userAgent || navigator.vendor;

    // const isFacebookBrowser = ua.includes("FBAN") || ua.includes("FBAV") || ua.includes("Messenger");
    const isFacebookOrMessenger = /FBAN|FBAV|FB_IAB|Messenger/i.test(ua);

    if (isFacebookOrMessenger) {
        const fbMsgEl = document.getElementById("fbMessage");
        const currentURL = window.location.origin + window.location.pathname + window.location.search + window.location.hash;
        const intentURL = `intent://${currentURL.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
        // In your JS, set fbMsgEl to this HTML
        fbMsgEl.innerHTML = `
  <div id="fb-tip-banner" style="
  color: black !important;
    display: flex; align-items: flex-start; gap: 10px;
    background: #fff8e6; border: 0.5px solid #f5c842;
    border-radius: 8px; padding: 12px 14px;
    position: relative; overflow: hidden; font-size: 14px;
  ">
    <span id="fb-tip-icon" style="font-size:20px;flex-shrink:0;margin-top:1px;">💡</span>
    <span>
      Tip: <a href="${intentURL}" style="color:#1a6fbf;font-weight:500;text-decoration:underline;">
        Open in External Browser
      </a>
      using the
      <span id="fb-dots" style="
        display:inline-flex;align-items:center;gap:3px;
        background:#f4f4f4;border:0.5px solid #ccc;
        border-radius:4px;padding:1px 6px;font-weight:500;font-size:13px;
        position:relative;white-space:nowrap;transition:background 0.3s,box-shadow 0.3s;
      ">
        <span style="letter-spacing:1px;">⋮</span> 3 dots
        <span id="fb-arrow" style="
          position:absolute;top:-26px;right:-6px;
          font-size:11px;color:#c47a00;font-weight:600;
          opacity:0;white-space:nowrap;transition:opacity 0.4s;
        ">top-right ↗</span>
      </span>
      on the top-right corner for smoother experience.
    </span>
    <span id="fb-shimmer" style="
      position:absolute;inset:0;pointer-events:none;
      background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.4) 50%,transparent 100%);
      transform:translateX(-100%);
    "></span>
  </div>
`;

        // Animate
        (function () {
            const banner = document.getElementById("fb-tip-banner");
            const icon = document.getElementById("fb-tip-icon");
            const dots = document.getElementById("fb-dots");
            const arrow = document.getElementById("fb-arrow");
            const shimmer = document.getElementById("fb-shimmer");
            let t = 0;

            function sweep() {
                shimmer.animate([{ transform: "translateX(-100%)" }, { transform: "translateX(200%)" }], { duration: 900, easing: "ease-in-out" });
            }

            function cycle() {
                if (t === 0) {
                    icon.animate([{ transform: "translateY(0)" }, { transform: "translateY(-5px)" }, { transform: "translateY(0)" }], { duration: 400, easing: "ease-out" });
                    setTimeout(sweep, 200);
                } else if (t === 1) {
                    dots.animate(
                        [
                            { background: "#f4f4f4", boxShadow: "none" },
                            { background: "#ddeeff", boxShadow: "0 0 0 2px #5599ee" },
                            { background: "#f4f4f4", boxShadow: "none" },
                        ],
                        { duration: 700, easing: "ease-in-out" },
                    );
                    arrow.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }, { opacity: 1, transform: "translateY(0)" }, { opacity: 0 }], {
                        duration: 1400,
                    });
                } else {
                    banner.animate([{ transform: "scale(1)" }, { transform: "scale(1.015)" }, { transform: "scale(1)" }], { duration: 300, easing: "ease-out" });
                    setTimeout(sweep, 100);
                }
                t = (t + 1) % 3;
            }

            cycle();
            setInterval(cycle, 2200);
        })();
    }

    populateFilters();
    handleParams();
});

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

let favoriteMode = false;

const productContainer = document.getElementById("products");

const activeImageIndex = {};

function toDriveUrl(id) {
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
    const btn = document.getElementById("btnToggleFilters");
    if (btn) {
        btn.textContent = activeCount > 0 ? `☰ Filters (${activeCount})` : `☰ Filters`;
        btn.classList.toggle("filters-active", activeCount > 0);
    }
}

function render() {
    let list = [...products];

    const search = document.getElementById("search").value.toLowerCase();
    const collection = document.getElementById("collection").dataset.value;
    const size = document.getElementById("size").dataset.value;
    // const price = document.getElementById("price").dataset.value;
    const category = document.getElementById("category").dataset.value;
    const status = document.getElementById("status").dataset.value;

    updateFilterCount({ collection, size, category, status });

    if (search) list = list.filter((x) => x.name.toLowerCase().includes(search));
    if (collection) list = list.filter((x) => x.collection === collection);
    if (size) list = list.filter((x) => x.size === size);
    // if (price) list = list.filter((x) => x.price === Number(price));
    if (category) list = list.filter((x) => x.category === category);
    if (status) list = list.filter((x) => x.status === status);

    if (favoriteMode) list = list.filter((x) => favorites.includes(x.id));

    if (!list.length) {
        productContainer.innerHTML = `
                          <div class="no-result">
                          No products found
                          </div>
                          `;

        return;
    }

    const imageColors = {
        "🟤 Sulit": "linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)",
        "🟢 Classic": "linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)",
        "🟣 Premium": "linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)",
    };

    productContainer.innerHTML = list
        .filter((p) => !p.is_archived)
        .map((product) => {
            const fav = favorites.includes(product.id);

            /*
             style="background:
                linear-gradient(white, white) padding-box,
                ${imageColors[product.category] || "#c8c8c8"} border-box;
                border: 1px solid transparent;
                border-radius: 12px;"
                */

            return `
                          <div class="card ${product.is_sold ? "sold" : ""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${imageColors[product.category] || "#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${product.is_sold ? `<div class="banner sold-banner">Sold</div>` : ""}
                              ${product.is_reserved && !product.is_sold ? `<div class="banner reserved-banner">Reserved</div>` : ""}
                              ${product.is_new && !product.is_sold && !product.is_reserved ? `<div class="banner new-banner">New</div>` : ""}
                          <button
                          class="favorite ${fav ? "active" : ""}"
                          onclick="toggleFavorite(${product.id})">
                            ${fav ? "❤️" : "♡"}
                          </button>
                          <button
                            class="share-link"
                            onclick="copyShareLink(${product.id})">
                                ${"🔗"}
                            </button>

                          <div class="carousel" id="carousel-${product.id}">
                            <img src="${toDriveUrl(product.images[0])}=w600" class="main-img" style="background: ${imageColors[product.category] || "#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${product.images
                    .map(
                        (img, i) => `
                                        <img src="${toDriveUrl(img)}=w100" onclick="setImage(${product.id}, ${i})"  loading="lazy">
                                    `,
                    )
                    .join("")}
                            </div>
                          </div>

                          <div class="card-body">
                            <h3>
                                ${product.name}
                            </h3>

                            <p>
                                ${product.description}
                            </p>

                            <span class="badge">
                              ${product.collection}
                            </span>

                            <span class="badge">
                                Size ${product.size}
                            </span>

                            <br><br>

                            <span class="badge" style="background: ${imageColors[product.category]}">
                              ${product.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${product.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${product.price}</span>
                            </span>
                          </div>
                          </div>

                          `;
        })
        .join("");
}

function copyProductLink(productId) {
    const link = `https://chefbarac.github.io/ukayfinds/?p=${productId}`;
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
        alert(`Product link copied to clipboard!`);
    });
}

function copyShareLink(productId) {
    const url = `${window.location.origin}${window.location.pathname}?p=${productId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("Product link now copied to clipboard!");
        // optional: show a brief "Copied!" toast
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
    } else {
        favorites.push(id);
        trackFavorite(`#${id}`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    render();
}

function showFavorites() {
    document.getElementById("btnShowFavorites").classList.toggle("active");
    favoriteMode = !favoriteMode;

    /*
    const btn = document.getElementById("btnShowFavorites");
    if (btn) btn.innerText = favoriteMode ? "♡ Favorites" : "❤️ Favorites"; */

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
document.getElementById("search").addEventListener("input", (e) => {
    render();
    trackFilter();
});

// Filter chips: click replaces input
document.querySelectorAll(".filter-group").forEach((group) => {
    group.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;

        group.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        group.dataset.value = btn.dataset.value;

        render();
        trackFilter();
    });
});

// SEARCH
const searchInput = document.getElementById('search');
const clearButton = document.getElementById('clear-search');

// Toggle visibility class smoothly
searchInput.addEventListener('input', () => {
    if (searchInput.value) {
        clearButton.classList.add('is-visible');
    } else {
        clearButton.classList.remove('is-visible');
    }
});

// Clear and blur interaction
clearButton.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    searchInput.value = '';
    searchInput.blur();
    clearButton.classList.remove('is-visible');
    render();
});
// END SEARCH


render();