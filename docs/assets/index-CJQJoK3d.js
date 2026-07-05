(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const R=document.getElementById("fbMessage"),y=document.getElementById("search"),x=document.getElementById("clear-search"),D=document.getElementById("btnToggleFilters"),I=document.getElementById("controls"),S=document.getElementById("collection"),k=document.getElementById("size"),F=document.getElementById("category"),b=document.getElementById("status"),v=document.getElementById("products"),$=document.getElementById("scrollTopBtn"),_=document.getElementById("btnToggleFavorites"),X=document.getElementById("btnClearFilters"),Y="/ukayfinds/assets/products-2Z08whkv.json",U="/ukayfinds/assets/products_sold-DwSDFrLc.json";function E(e,n=2500){let s=document.createElement("div");s.textContent=e,s.style.cssText=`
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
    `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(-50%) translateY(20px)",s.addEventListener("transitionend",()=>s.remove(),{once:!0})},n)}y.addEventListener("input",()=>{P()});function P(){y.value?x.classList.add("is-visible"):x.classList.remove("is-visible")}function z(){y.value="",y.blur(),x.classList.remove("is-visible")}x.addEventListener("pointerdown",e=>{e.preventDefault(),z(),p()});y.addEventListener("focus",()=>{});function p(e){let n=[...d];e&&(n=n.filter(o=>!o.is_sold));const s=document.getElementById("search").value.toLowerCase(),r=document.getElementById("collection").dataset.value,t=document.getElementById("size").dataset.value,a=document.getElementById("category").dataset.value,i=document.getElementById("status").dataset.value;if(ne({search:s,collection:r,size:t,category:a,status:i}),e||(s&&(n=n.filter(o=>o.name.toLowerCase().includes(s))),r&&(n=n.filter(o=>o.collection===r)),t&&(n=n.filter(o=>o.size===t)),a&&(n=n.filter(o=>o.category===a)),i&&(n=n.filter(o=>o.status===i)),w&&(n=n.filter(o=>g.includes(o.id)))),!n.length){v.innerHTML=`
                          <div class="no-result">
                            <p class="no-result-text">No products found...</p>
                            <button class="btn-modern-red">Clear Filters</button>
                        </div>
                          `,v.querySelector("button").addEventListener("click",q),v.classList.add("empty-products");return}const l={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};v.classList.remove("empty-products"),v.innerHTML=n.filter(o=>!o.is_archived).map(o=>{const c=g.includes(o.id);return`
                          <div class="card product-card ${o.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${l[o.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${o.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${o.is_reserved&&!o.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${o.is_new&&!o.is_sold&&!o.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="floating-buttons favorite ${c?" active":""}"
                          data-product-id="${o.id}"
                          >
                            ${c?"❤️":"♡"}
                          </button>
                          <button
                            class="floating-buttons share-link"
                            data-product-id="${o.id}"
                            data-product-name="${o.name}">
                                🔗
                            </button>

                          <div class="carousel" id="carousel-${o.id}">
                            <div class="main-img-container">
                                <img src="${C(o.images[0])}=w600" class="main-img" style="background: ${l[o.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                                </div>
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${o.images.map((f,B)=>`
                                        <div class="thumbnail-container"
                                        data-product-id="${o.id}"
                                        data-index="${B}"  >
                                        <img src="${C(f)}=w100" class="thumbnail"  loading="lazy">
                                        </div>
                                    `).join("")}
                            </div>
                          </div>

                          <div class="card-body">
                            <h3>${o.name}</h3>
                            <p>${o.description||""}</p>
                            <span class="badge">${o.collection}</span>
                            <span class="badge">Size ${o.size}</span>

                            <br><br>

                            <span class="badge" style="background: ${l[o.category]}">
                              ${o.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${o.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${o.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join(""),document.querySelectorAll(".main-img-container").forEach(o=>{o.addEventListener("pointerdown",c=>{const f=c.target.closest(".product-card");f&&f.classList.toggle("pressed")})})}function q(){z(),m(S,S.querySelectorAll(".chip")[0]),m(k,k.querySelectorAll(".chip")[0]),m(F,F.querySelectorAll(".chip")[0]),m(b,b.querySelectorAll(".chip")[0]),w&&M(!0),p()}function j(e){let n=!1;return function(){n||(requestAnimationFrame(()=>{e(),n=!1}),n=!0)}}let d=[],O={},g=JSON.parse(localStorage.getItem("favorites")||"[]"),w=!1,T=!1;function G(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const H={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};async function J(){const n=await(await fetch(Y)).json(),s=n.data;O=n.summary,d=A((s||[]).toReversed()),Z(),oe();const{productNumber:r,collectionName:t}=K();V(r,t),p(!r&&!t),document.querySelectorAll(".filter-group:not([id='status'])").forEach(a=>{a.addEventListener("click",async i=>{const l=i.target.closest(".chip");m(a,l),p(),L()})}),document.querySelectorAll("#status .chip").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.value;if(["","Sold"].includes(i)&&!T){const o=await(await fetch(U)).json().catch(()=>E("Error fetching the sold products!"));if(o!=null&&o.data){let c=A(o.data);c=[...d,...c],d=c.sort((f,B)=>B.id-f.id),T=!0,E("Sold products have been fetched!")}else return}const l=a.closest(".filter-group");m(l,a),p(),L()})})}function A(e){return e.map(n=>({...n,images:n.images?n.images.split("||"):[],status:G(n),category:H[n.category]}))}function m(e,n){n&&(e.querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),n.classList.add("active"),e.dataset.value=n.dataset.value)}J();function K(){const e=new URLSearchParams(window.location.search),n=e.get("p"),s=e.get("c");return{productNumber:n,collectionName:s}}function V(e,n){if(e)y.value=`#${e} `,P();else if(n){const s=S.querySelector(`.chip[data-value="${n}"]`);m(S,s)}else{const s=b.querySelector('.chip[data-value="Available"]');m(b,s)}}async function Z(){const e=[...new Set(d.map(t=>t.collection).filter(Boolean))].sort().map(t=>({name:t,count:d.filter(a=>a.collection===t).length})),n=[...new Set(d.map(t=>t.size).filter(Boolean))].sort(W).map(t=>({name:t,count:d.filter(a=>a.size===t).length})),s=[...new Set(d.map(t=>t.category).filter(Boolean))].sort(Q).map(t=>({name:t,count:d.filter(a=>a.category===t).length}));[...new Set(d.map(t=>t.status).filter(Boolean))].sort().map(t=>({name:t,count:d.filter(a=>a.status===t).length}));const r=(t,a,i,l)=>{const u=document.getElementById(t);u.querySelectorAll('.chip:not([data-value=""])').forEach(o=>o.remove()),a.forEach(o=>{const c=document.createElement("button");c.className="chip",c.type="button",c.dataset.value=o.name,c.textContent=i(o),u.appendChild(c)})};r("collection",e,t=>`${t.name} (${t.count})`),r("size",n,t=>`${t.name} (${t.count})`),r("category",s,t=>`${t.name.split(" ")[1]} (${t.count})`),b.querySelectorAll('.chip:not([data-value=""])').forEach(t=>{const a=t.dataset.value,i=O[a];!i&&a==="Reserved"&&(t.style="display: none"),t.innerText=`${t.dataset.value} (${i})`})}function Q(e,n){const s=["🟤 Sulit","🟢 Classic","🟣 Premium"],r=s.indexOf(e),t=s.indexOf(n);return r===-1&&t===-1?e.localeCompare(n):r===-1?1:t===-1?-1:r-t}function W(e,n){const s=["XXS","XS","S","M","L","XL","XXL","3XL"],r=s.indexOf(e.toUpperCase()),t=s.indexOf(n.toUpperCase());return r===-1&&t===-1?e.localeCompare(n):r===-1?1:t===-1?-1:r-t}(()=>{$.addEventListener("click",re);const e=j(()=>{$.style.display=window.scrollY>300?"block":"none"});window.addEventListener("scroll",e,{passive:!0}),$.style.display="none"})();function C(e){return`https://lh3.googleusercontent.com/d/${e}`}function ee(e,n){const s=d.find(o=>o.id==e),r=document.querySelector(`#carousel-${e}`),t=r.querySelector(".main-img"),a=r.querySelector(".img-spinner"),l=setTimeout(()=>{a.style.display="block"},200),u=new Image;u.onload=()=>{clearTimeout(l),t.src=u.src,a.style.display="none"},u.onerror=()=>{clearTimeout(l),a.style.display="none"},u.src=C(s.images[n])+"=w600"}function N(e,n){let s;return function(...r){clearTimeout(s),s=setTimeout(()=>e.apply(this,r),n)}}const L=N(function(){const e=document.getElementById("search").value.toLowerCase(),n=document.getElementById("collection").dataset.value,s=document.getElementById("size").dataset.value,r=document.getElementById("category").dataset.value,t=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:n,size:s,category:r,favoriteMode:w,status:t})},3e3),te=N(function(e){gtag("event","button_click",{favorite:e})},3e3);function ne(e){const n=Object.values(e).filter(s=>s!==""&&s!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=n>0?`☰ Filters (${n})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",n>0))}function oe(){v.addEventListener("click",se)}function se(e){e.target.matches(".thumbnail-container")?ee(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?ie(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&ae(e.target,e.target.dataset.productId,e.target.dataset.productName)}function ae(e,n,s){const r=`${window.location.origin}${window.location.pathname}?p=${n}`,t=`${s}
${r}`;navigator.clipboard.writeText(t).then(()=>{E("Product link copied to clipboard!"),e.classList.add("copied"),setTimeout(()=>e.classList.remove("copied"),2500)})}function re(){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:e?"auto":"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function ie(e){g.includes(e)?(g=g.filter(n=>n!==e),E("Product removed from favorites!")):(g.push(e),E("Product added to favorites!"),te(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(g)),p()}_.addEventListener("click",M);function M(e){_.classList.toggle("active"),w=!w,e!==!0&&(p(),L())}y.addEventListener("input",e=>{p(),L()});X.addEventListener("click",q);let h=!1;function ce(){h=!h,I.classList.toggle("force-expanded",h)}D.addEventListener("click",ce);document.addEventListener("click",e=>{if(!h)return;(!I.contains(e.target)||e.target.id==="btnClearFilters")&&(h=!1,I.classList.remove("force-expanded"))});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const r=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;R.innerHTML=`
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
`,localStorage.setItem("fb-shown","1"),(function(){const t=document.getElementById("fb-tip-banner"),a=document.getElementById("fb-tip-icon"),i=document.getElementById("fb-dots"),l=document.getElementById("fb-arrow"),u=document.getElementById("fb-shimmer");let o=0;function c(){u.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function f(){o===0?(a.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(c,200)):o===1?(i.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),l.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(t.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(c,100)),o=(o+1)%3}f(),setInterval(f,2200)})()}});
