import { products, updateFilterCount, favoriteMode, favorites, toDriveUrl } from ".";
import { productContainer } from "./el";


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
                          class="favorite ${fav ? " active" : ""}"
                          data-product-id="${product.id}"
                          >
                            ${fav ? "❤️" : "♡"}
                          </button>
                          <button
                            class="share-link"
                            data-product-id="${product.id}"
                            data-product-name="${product.name}">
                                ${"🔗"}
                            </button>

                          <div class="carousel" id="carousel-${product.id}">
                            <img src="${toDriveUrl(product.images[0])}=w600" class="main-img" style="background: ${imageColors[product.category] || "#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${product.images
                    .map(
                        (img, i) => `
                                        <img src="${toDriveUrl(img)}=w100" class="thumbnail"  data-product-id="${product.id}"
        data-index="${i}"  loading="lazy">
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

export { render }