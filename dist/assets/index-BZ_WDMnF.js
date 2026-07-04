(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(n){if(n.ep)return;n.ep=!0;const t=o(n);fetch(n.href,t)}})();console.log("v=1.1.12");document.getElementById("fbMessage");document.getElementById("search");document.getElementById("clear-search");document.getElementById("btnToggleFilters");document.getElementById("controls");document.getElementById("collection");document.getElementById("products");function g(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const v={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};products=(products||[]).toReversed().map(e=>({...e,images:e.images?e.images.split("||"):[],status:g(e),category:v[e.category]}));document.querySelectorAll(".filter-group").forEach(function(e){e.addEventListener("click",function(a){var o=a.target.closest(".chip");o&&(e.querySelectorAll(".chip").forEach(function(r){r.classList.remove("active")}),o.classList.add("active"),e.dataset.value=o.dataset.value)})});function h(){const e=new URLSearchParams(window.location.search),a=e.get("p"),o=e.get("c");if(a){searchInput.value=`#${a} `;const r=new Event("input",{bubbles:!0,cancelable:!0});searchInput.dispatchEvent(r)}if(o){const r=collectionGroup.querySelector(`.chip[data-value="${o}"]`);r?r.click():console.warn(`No chip found for collection "${o}"`)}}async function b(){const e=[...new Set(products.map(t=>t.collection).filter(Boolean))].sort().map(t=>({name:t,count:products.filter(i=>i.collection===t).length})),a=[...new Set(products.map(t=>t.size).filter(Boolean))].sort(E).map(t=>({name:t,count:products.filter(i=>i.size===t).length})),o=[...new Set(products.map(t=>t.category).filter(Boolean))].sort(y).map(t=>({name:t,count:products.filter(i=>i.category===t).length})),r=[...new Set(products.map(t=>t.status).filter(Boolean))].sort().map(t=>({name:t,count:products.filter(i=>i.status===t).length})),n=(t,i,s,u)=>{const l=document.getElementById(t);l.querySelectorAll('.chip:not([data-value=""])').forEach(c=>c.remove()),i.forEach(c=>{const d=document.createElement("button");d.className="chip",d.type="button",d.dataset.value=c.name,d.textContent=s(c),l.appendChild(d)})};n("collection",e,t=>`${t.name} (${t.count})`),n("size",a,t=>`${t.name} (${t.count})`),n("category",o,t=>`${t.name.split(" ")[1]} (${t.count})`),n("status",r,t=>`${t.name} (${t.count})`)}function y(e,a){const o=["🟤 Sulit","🟢 Classic","🟣 Premium"],r=o.indexOf(e),n=o.indexOf(a);return r===-1&&n===-1?e.localeCompare(a):r===-1?1:n===-1?-1:r-n}function E(e,a){const o=["XXS","XS","S","M","L","XL","XXL","3XL"],r=o.indexOf(e.toUpperCase()),n=o.indexOf(a.toUpperCase());return r===-1&&n===-1?e.localeCompare(a):r===-1?1:n===-1?-1:r-n}(()=>{const e=document.getElementById("scrollTopBtn");window.addEventListener("scroll",()=>{e.style.display=window.scrollY>300?"block":"none"}),e.style.display="none"})();document.addEventListener("DOMContentLoaded",()=>{console.log("DOMContentLoaded!"),b(),h()});let w=JSON.parse(localStorage.getItem("favorites")||"[]"),L=!1;function p(e){return`https://lh3.googleusercontent.com/d/${e}`}function x(e,a){let o;return function(...r){clearTimeout(o),o=setTimeout(()=>e.apply(this,r),a)}}const m=x(function(){const e=document.getElementById("search").value.toLowerCase(),a=document.getElementById("collection").dataset.value,o=document.getElementById("size").dataset.value,r=document.getElementById("category").dataset.value,n=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:a,size:o,category:r,favoriteMode:L,status:n})},3e3);function B(e){const a=Object.values(e).filter(o=>o!==""&&o!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=a>0?`☰ Filters (${a})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",a>0))}function f(){let e=[...products];const a=document.getElementById("search").value.toLowerCase(),o=document.getElementById("collection").dataset.value,r=document.getElementById("size").dataset.value,n=document.getElementById("category").dataset.value,t=document.getElementById("status").dataset.value;if(B({collection:o,size:r,category:n,status:t}),a&&(e=e.filter(s=>s.name.toLowerCase().includes(a))),o&&(e=e.filter(s=>s.collection===o)),r&&(e=e.filter(s=>s.size===r)),n&&(e=e.filter(s=>s.category===n)),t&&(e=e.filter(s=>s.status===t)),!e.length){productContainer.innerHTML=`
                          <div class="no-result">
                          No products found
                          </div>
                          `;return}const i={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};productContainer.innerHTML=e.filter(s=>!s.is_archived).map(s=>{const u=w.includes(s.id);return`
                          <div class="card ${s.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${i[s.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${s.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${s.is_reserved&&!s.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${s.is_new&&!s.is_sold&&!s.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="favorite ${u?"active":""}"
                          onclick="toggleFavorite(${s.id})">
                            ${u?"❤️":"♡"}
                          </button>
                          <button
                            class="share-link"
                            onclick="copyShareLink(${s.id})">
                                🔗
                            </button>

                          <div class="carousel" id="carousel-${s.id}">
                            <img src="${p(s.images[0])}=w600" class="main-img" style="background: ${i[s.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${s.images.map((l,c)=>`
                                        <img src="${p(l)}=w100" onclick="setImage(${s.id}, ${c})"  loading="lazy">
                                    `).join("")}
                            </div>
                          </div>

                          <div class="card-body">
                            <h3>
                                ${s.name}
                            </h3>

                            <p>
                                ${s.description}
                            </p>

                            <span class="badge">
                              ${s.collection}
                            </span>

                            <span class="badge">
                                Size ${s.size}
                            </span>

                            <br><br>

                            <span class="badge" style="background: ${i[s.category]}">
                              ${s.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${s.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${s.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join("")}searchInput.addEventListener("input",e=>{f(),m()});document.querySelectorAll(".filter-group").forEach(e=>{e.addEventListener("click",a=>{const o=a.target.closest(".chip");o&&(e.querySelectorAll(".chip").forEach(r=>r.classList.remove("active")),o.classList.add("active"),e.dataset.value=o.dataset.value,f(),m())})});f();(()=>{let e=!1;const a=100;let o=window.scrollY;const r=250;window.addEventListener("scroll",()=>{const n=window.scrollY;n>a?controlsEl.classList.add("collapsed"):controlsEl.classList.remove("collapsed"),e?Math.abs(n-o)>r&&(e=!1,controlsEl.classList.remove("force-expanded")):o=n},{passive:!0}),window.__toggleFilters=()=>{e=!e,controlsEl.classList.toggle("force-expanded",e),e&&(o=window.scrollY)},document.addEventListener("click",n=>{if(!e)return;controlsEl.contains(n.target)||(e=!1,controlsEl.classList.remove("force-expanded"))})})();(()=>{searchInput.addEventListener("input",()=>{searchInput.value?clearButton.classList.add("is-visible"):clearButton.classList.remove("is-visible")}),clearButton.addEventListener("pointerdown",o=>{o.preventDefault(),searchInput.value="",searchInput.blur(),clearButton.classList.remove("is-visible"),render()});let e=0,a=200;searchInput.addEventListener("focus",()=>{e=window.scrollY}),window.addEventListener("scroll",()=>{document.activeElement===searchInput&&Math.abs(window.scrollY-e)>=a&&searchInput.blur()},{passive:!0})})();document.addEventListener("DOMContentLoaded",()=>{const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const r=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;fbMsgEl.innerHTML=`
  <div id="fb-tip-banner" style="
  color: black !important;
    display: flex; align-items: flex-start; gap: 10px;
    background: #fff8e6; border: 0.5px solid #f5c842;
    border-radius: 8px; padding: 12px 14px;
    position: relative; overflow: hidden; font-size: 14px;
  ">
    <span id="fb-tip-icon" style="font-size:20px;flex-shrink:0;margin-top:1px;">💡</span>
    <span>
      Tip: <a href="${r}" style="color:#1a6fbf;font-weight:500;text-decoration:underline;">
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
`,(function(){const n=document.getElementById("fb-tip-banner"),t=document.getElementById("fb-tip-icon"),i=document.getElementById("fb-dots"),s=document.getElementById("fb-arrow"),u=document.getElementById("fb-shimmer");let l=0;function c(){u.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function d(){l===0?(t.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(c,200)):l===1?(i.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(n.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(c,100)),l=(l+1)%3}d(),setInterval(d,2200)})()}});
