(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const q=document.getElementById("fbMessage"),g=document.getElementById("search"),E=document.getElementById("clear-search"),N=document.getElementById("btnToggleFilters"),S=document.getElementById("controls"),x=document.getElementById("collection"),C=document.getElementById("size"),k=document.getElementById("category"),w=document.getElementById("status"),v=document.getElementById("products"),L=document.getElementById("scrollTopBtn"),F=document.getElementById("btnToggleFavorites"),M=document.getElementById("btnClearFilters"),R="/ukayfinds/assets/products-YRQZsh1W.json";function B(e,t=2500){let s=document.createElement("div");s.textContent=e,s.style.cssText=`
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #1f2937;
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        pointer-events: none;
    `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(-50%) translateY(20px)",s.addEventListener("transitionend",()=>s.remove(),{once:!0})},t)}g.addEventListener("input",()=>{T()});function T(){g.value?E.classList.add("is-visible"):E.classList.remove("is-visible")}function A(){g.value="",g.blur(),E.classList.remove("is-visible")}E.addEventListener("pointerdown",e=>{e.preventDefault(),A(),y()});g.addEventListener("focus",()=>{});function y(e){let t=[...d];e&&(t=t.filter(n=>!n.is_sold));const s=document.getElementById("search").value.toLowerCase(),r=document.getElementById("collection").dataset.value,a=document.getElementById("size").dataset.value,o=document.getElementById("category").dataset.value,i=document.getElementById("status").dataset.value;if(W({search:s,collection:r,size:a,category:o,status:i}),e||(s&&(t=t.filter(n=>n.name.toLowerCase().includes(s))),r&&(t=t.filter(n=>n.collection===r)),a&&(t=t.filter(n=>n.size===a)),o&&(t=t.filter(n=>n.category===o)),i&&(t=t.filter(n=>n.status===i)),h&&(t=t.filter(n=>f.includes(n.id)))),!t.length){v.innerHTML=`
                          <div class="no-result">
                            <p class="no-result-text">No products found...</p>
                            <button class="btn-modern-red">Clear Filters</button>
                        </div>
                          `,v.querySelector("button").addEventListener("click",_),v.classList.add("empty-products");return}const u={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};v.classList.remove("empty-products"),v.innerHTML=t.filter(n=>!n.is_archived).map(n=>{const l=f.includes(n.id);return`
                          <div class="card product-card ${n.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${u[n.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${n.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${n.is_reserved&&!n.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${n.is_new&&!n.is_sold&&!n.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="floating-buttons favorite ${l?" active":""}"
                          data-product-id="${n.id}"
                          >
                            ${l?"❤️":"♡"}
                          </button>
                          <button
                            class="floating-buttons share-link"
                            data-product-id="${n.id}"
                            data-product-name="${n.name}">
                                🔗
                            </button>

                          <div class="carousel" id="carousel-${n.id}">
                            <img src="${$(n.images[0])}=w600" class="main-img" style="background: ${u[n.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${n.images.map((c,O)=>`
                                        <img src="${$(c)}=w100" class="thumbnail"  data-product-id="${n.id}"
        data-index="${O}"  loading="lazy">
                                    `).join("")}
                            </div>
                          </div>

                          <div class="card-body">
                            <h3>${n.name}</h3>
                            <p>${n.description}</p>
                            <span class="badge">${n.collection}</span>
                            <span class="badge">Size ${n.size}</span>

                            <br><br>

                            <span class="badge" style="background: ${u[n.category]}">
                              ${n.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${n.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${n.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join(""),document.querySelectorAll(".main-img").forEach(n=>{n.addEventListener("pointerdown",l=>{const c=l.target.closest(".product-card");c&&c.classList.add("pressing")})}),document.addEventListener("contextmenu",n=>{n.target.matches(".product-card img")&&n.preventDefault()}),["pointerup","pointercancel","contextmenu","visibilitychange"].forEach(n=>{document.addEventListener(n,l=>{document.querySelectorAll(".product-card.pressing").forEach(c=>c.classList.remove("pressing"))})})}function _(){A(),p(x,x.querySelectorAll(".chip")[0]),p(C,C.querySelectorAll(".chip")[0]),p(k,k.querySelectorAll(".chip")[0]),p(w,w.querySelectorAll(".chip")[0]),h&&P(!0),y()}function D(e){let t=!1;return function(){t||(requestAnimationFrame(()=>{e(),t=!1}),t=!0)}}let d=[],f=JSON.parse(localStorage.getItem("favorites")||"[]"),h=!1;function X(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const Y={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};async function U(){d=(await(await fetch(R)).json()||[]).toReversed().map(a=>({...a,images:a.images?a.images.split("||"):[],status:X(a),category:Y[a.category]})),H(),Z();const{productNumber:s,collectionName:r}=j();G(s,r),y(!s&&!r),document.querySelectorAll(".filter-group").forEach(a=>{a.addEventListener("click",o=>{const i=o.target.closest(".chip");p(a,i),y(),I()})})}function p(e,t){t&&(e.querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),t.classList.add("active"),e.dataset.value=t.dataset.value)}U();function j(){const e=new URLSearchParams(window.location.search),t=e.get("p"),s=e.get("c");return{productNumber:t,collectionName:s}}function G(e,t){if(e)g.value=`#${e} `,T();else if(t){const s=x.querySelector(`.chip[data-value="${t}"]`);p(x,s)}else{const s=w.querySelector('.chip[data-value="Available"]');p(w,s)}}async function H(){const e=[...new Set(d.map(o=>o.collection).filter(Boolean))].sort().map(o=>({name:o,count:d.filter(i=>i.collection===o).length})),t=[...new Set(d.map(o=>o.size).filter(Boolean))].sort(K).map(o=>({name:o,count:d.filter(i=>i.size===o).length})),s=[...new Set(d.map(o=>o.category).filter(Boolean))].sort(J).map(o=>({name:o,count:d.filter(i=>i.category===o).length})),r=[...new Set(d.map(o=>o.status).filter(Boolean))].sort().map(o=>({name:o,count:d.filter(i=>i.status===o).length})),a=(o,i,u,m)=>{const n=document.getElementById(o);n.querySelectorAll('.chip:not([data-value=""])').forEach(l=>l.remove()),i.forEach(l=>{const c=document.createElement("button");c.className="chip",c.type="button",c.dataset.value=l.name,c.textContent=u(l),n.appendChild(c)})};a("collection",e,o=>`${o.name} (${o.count})`),a("size",t,o=>`${o.name} (${o.count})`),a("category",s,o=>`${o.name.split(" ")[1]} (${o.count})`),a("status",r,o=>`${o.name} (${o.count})`)}function J(e,t){const s=["🟤 Sulit","🟢 Classic","🟣 Premium"],r=s.indexOf(e),a=s.indexOf(t);return r===-1&&a===-1?e.localeCompare(t):r===-1?1:a===-1?-1:r-a}function K(e,t){const s=["XXS","XS","S","M","L","XL","XXL","3XL"],r=s.indexOf(e.toUpperCase()),a=s.indexOf(t.toUpperCase());return r===-1&&a===-1?e.localeCompare(t):r===-1?1:a===-1?-1:r-a}(()=>{L.addEventListener("click",ne);const e=D(()=>{L.style.display=window.scrollY>300?"block":"none"});window.addEventListener("scroll",e,{passive:!0}),L.style.display="none"})();function $(e){return`https://lh3.googleusercontent.com/d/${e}`}function Q(e,t){const s=d.find(n=>n.id==e),r=document.querySelector(`#carousel-${e}`),a=r.querySelector(".main-img"),o=r.querySelector(".img-spinner"),u=setTimeout(()=>{o.style.display="block"},200),m=new Image;m.onload=()=>{clearTimeout(u),a.src=m.src,o.style.display="none"},m.onerror=()=>{clearTimeout(u),o.style.display="none"},m.src=$(s.images[t])+"=w600"}function z(e,t){let s;return function(...r){clearTimeout(s),s=setTimeout(()=>e.apply(this,r),t)}}const I=z(function(){const e=document.getElementById("search").value.toLowerCase(),t=document.getElementById("collection").dataset.value,s=document.getElementById("size").dataset.value,r=document.getElementById("category").dataset.value,a=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:t,size:s,category:r,favoriteMode:h,status:a})},3e3),V=z(function(e){gtag("event","button_click",{favorite:e})},3e3);function W(e){const t=Object.values(e).filter(s=>s!==""&&s!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=t>0?`☰ Filters (${t})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",t>0))}function Z(){v.addEventListener("click",ee)}function ee(e){e.target.matches(".thumbnail")?Q(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?oe(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&te(e.target.dataset.productId,e.target.dataset.productName)}function te(e,t){const s=`${window.location.origin}${window.location.pathname}?p=${e}`,r=`${t}
${s}`;navigator.clipboard.writeText(r).then(()=>{B("Product link copied to clipboard!")})}function ne(){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:e?"auto":"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function oe(e){f.includes(e)?(f=f.filter(t=>t!==e),B("Product removed from favorites!")):(f.push(e),B("Product added to favorites!"),V(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(f)),y()}F.addEventListener("click",P);function P(e){F.classList.toggle("active"),h=!h,e!==!0&&(y(),I())}g.addEventListener("input",e=>{y(),I()});M.addEventListener("click",_);let b=!1;function se(){b=!b,S.classList.toggle("force-expanded",b)}N.addEventListener("click",se);document.addEventListener("click",e=>{if(!b)return;(!S.contains(e.target)||e.target.id==="btnClearFilters")&&(b=!1,S.classList.remove("force-expanded"))});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const r=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;q.innerHTML=`
  <div id="fb-tip-banner" style="
  margin-top: 20px;
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
`,localStorage.setItem("fb-shown","1"),(function(){const a=document.getElementById("fb-tip-banner"),o=document.getElementById("fb-tip-icon"),i=document.getElementById("fb-dots"),u=document.getElementById("fb-arrow"),m=document.getElementById("fb-shimmer");let n=0;function l(){m.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function c(){n===0?(o.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(l,200)):n===1?(i.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),u.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(a.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(l,100)),n=(n+1)%3}c(),setInterval(c,2200)})()}});
