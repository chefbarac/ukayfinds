(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const Y=document.getElementById("fbMessage"),m=document.getElementById("search"),L=document.getElementById("clear-search"),U=document.getElementById("btnToggleFilters"),$=document.getElementById("controls"),S=document.getElementById("collection"),C=document.getElementById("size"),F=document.getElementById("category"),w=document.getElementById("status"),h=document.getElementById("products"),B=document.getElementById("scrollTopBtn"),z=document.getElementById("btnToggleFavorites"),j=document.getElementById("btnClearFilters"),T=document.getElementById("resultInfo"),G=document.getElementById("resultCounter"),H="/ukayfinds/assets/products-BgRQG6di.json",W="/ukayfinds/assets/products_sold-CRz2l8sR.json";function x(e,n=2500){let s=document.createElement("div");s.textContent=e,s.style.cssText=`
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
    `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(-50%) translateY(20px)",s.addEventListener("transitionend",()=>s.remove(),{once:!0})},n)}m.addEventListener("input",()=>{q()});m.addEventListener("keydown",e=>{e.key==="Escape"&&(e.preventDefault(),m.blur())});function q(){m.value?L.classList.add("is-visible"):L.classList.remove("is-visible")}function O(){m.value="",m.blur(),L.classList.remove("is-visible")}L.addEventListener("pointerdown",e=>{e.preventDefault(),O(),p()});m.addEventListener("focus",()=>{});function p(e){let n=[...l];e&&(n=n.filter(o=>!o.is_sold));const s=document.getElementById("search").value.toLowerCase(),r=document.getElementById("collection").dataset.value,t=document.getElementById("size").dataset.value,a=document.getElementById("category").dataset.value,i=document.getElementById("status").dataset.value;if(re({search:s,collection:r,size:t,category:a,status:i}),e||(s&&(n=n.filter(o=>o.name.toLowerCase().includes(s))),r&&(n=n.filter(o=>o.collection===r)),t&&(n=n.filter(o=>o.size===t)),a&&(n=n.filter(o=>o.category===a)),i&&(n=n.filter(o=>o.status===i)),b&&(n=n.filter(o=>y.includes(o.id)))),(s||r||t||a||b)&&n.length>0?(G.innerText=n.length,T.style.display="flex"):T.style.display="none",!n.length){h.innerHTML=`
                          <div class="no-result">
                            <p class="no-result-text">No products found...</p>
                            <button class="btn-modern-red">Clear Filters</button>
                        </div>
                          `,h.querySelector("button").addEventListener("click",R),h.classList.add("empty-products");return}const d={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};h.classList.remove("empty-products"),h.innerHTML=n.filter(o=>!o.is_archived).map(o=>{const f=y.includes(o.id);return`
                          <div class="card product-card ${o.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${d[o.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${o.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${o.is_reserved&&!o.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${o.is_new&&!o.is_sold&&!o.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="floating-buttons favorite ${f?" active":""}"
                          data-product-id="${o.id}"
                          >
                            ${f?"❤️":"♡"}
                          </button>
                          <button
                            class="floating-buttons share-link"
                            data-product-id="${o.id}"
                            data-product-name="${o.name}">
                                🔗
                            </button>

                          <div class="carousel" id="carousel-${o.id}">
                            <div class="main-img-container">
                                <img src="${k(o.images[0])}=w600" class="main-img" style="background: ${d[o.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                                </div>
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${o.images.map((v,X)=>`
                                        <div class="thumbnail-container"
                                        data-product-id="${o.id}"
                                        data-index="${X}"  >
                                        <img src="${k(v)}=w100" class="thumbnail"  loading="lazy">
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

                            <span class="badge" style="background: ${d[o.category]}">
                              ${o.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${o.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${o.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join(""),document.querySelectorAll(".main-img-container").forEach(o=>{o.addEventListener("click",f=>{const v=f.target.closest(".product-card");v&&v.classList.toggle("pressed")})})}function R(){O(),g(S,S.querySelectorAll(".chip")[0]),g(C,C.querySelectorAll(".chip")[0]),g(F,F.querySelectorAll(".chip")[0]),g(w,w.querySelectorAll(".chip")[0]),b&&D(!0),p()}function J(e){let n=!1;return function(){n||(requestAnimationFrame(()=>{e(),n=!1}),n=!0)}}let l=[],M={},y=JSON.parse(localStorage.getItem("favorites")||"[]"),b=!1,A=!1;function K(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const Q={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};async function V(){const n=await(await fetch(H)).json(),s=n.data;M=n.summary,l=P((s||[]).toReversed()),l=_(l),te(),ie();const{productNumber:r,collectionName:t}=Z();ee(r,t),p(!r&&!t),document.querySelectorAll(".filter-group:not([id='status'])").forEach(a=>{a.addEventListener("click",async i=>{const u=i.target.closest(".chip");g(a,u),p(),I()})}),document.querySelectorAll("#status .chip").forEach(a=>{a.addEventListener("click",async()=>{const i=a.dataset.value;if(["","Sold"].includes(i)&&!A){const c=await(await fetch(W)).json().catch(()=>x("Error fetching the sold products!"));if(c!=null&&c.data){let o=P(c.data);o=[...l,...o],o=o.sort((f,v)=>v.id-f.id),l=_(o),A=!0,x("Sold products have been fetched!")}else return}const u=a.closest(".filter-group");g(u,a),p(),I()})})}function P(e){return e.map(s=>({...s,images:s.images?s.images.split("||"):[],status:K(s),category:Q[s.category]}))}function _(e){if(e.length>0){const n=Math.floor(Math.random()*e.length),[s]=e.splice(n,1);return[s,...e]}return e}function g(e,n){n&&(e.querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),n.classList.add("active"),e.dataset.value=n.dataset.value)}V();function Z(){const e=new URLSearchParams(window.location.search),n=e.get("p"),s=e.get("c");return{productNumber:n,collectionName:s}}function ee(e,n){if(e)m.value=`#${e} `,q();else if(n){const s=S.querySelector(`.chip[data-value="${n}"]`);g(S,s)}else{const s=w.querySelector('.chip[data-value="Available"]');g(w,s)}}async function te(){const e=[...new Set(l.map(t=>t.collection).filter(Boolean))].sort().map(t=>({name:t,count:l.filter(a=>a.collection===t).length})),n=[...new Set(l.map(t=>t.size).filter(Boolean))].sort(oe).map(t=>({name:t,count:l.filter(a=>a.size===t).length})),s=[...new Set(l.map(t=>t.category).filter(Boolean))].sort(ne).map(t=>({name:t,count:l.filter(a=>a.category===t).length}));[...new Set(l.map(t=>t.status).filter(Boolean))].sort().map(t=>({name:t,count:l.filter(a=>a.status===t).length}));const r=(t,a,i,u)=>{const d=document.getElementById(t);d.querySelectorAll('.chip:not([data-value=""])').forEach(c=>c.remove()),a.forEach(c=>{const o=document.createElement("button");o.className="chip",o.type="button",o.dataset.value=c.name,o.textContent=i(c),d.appendChild(o)})};r("collection",e,t=>`${t.name} (${t.count})`),r("size",n,t=>`${t.name} (${t.count})`),r("category",s,t=>`${t.name.split(" ")[1]} (${t.count})`),w.querySelectorAll('.chip:not([data-value=""])').forEach(t=>{const a=t.dataset.value,i=M[a];!i&&a==="Reserved"&&(t.style="display: none"),t.innerText=`${t.dataset.value} (${i})`})}function ne(e,n){const s=["🟤 Sulit","🟢 Classic","🟣 Premium"],r=s.indexOf(e),t=s.indexOf(n);return r===-1&&t===-1?e.localeCompare(n):r===-1?1:t===-1?-1:r-t}function oe(e,n){const s=["XXS","XS","S","M","L","XL","XXL","3XL"],r=s.indexOf(e.toUpperCase()),t=s.indexOf(n.toUpperCase());return r===-1&&t===-1?e.localeCompare(n):r===-1?1:t===-1?-1:r-t}(()=>{B.addEventListener("click",de);const e=J(()=>{B.style.display=window.scrollY>300?"block":"none"});window.addEventListener("scroll",e,{passive:!0}),B.style.display="none"})();function k(e){return`https://lh3.googleusercontent.com/d/${e}`}function se(e,n){const s=l.find(c=>c.id==e),r=document.querySelector(`#carousel-${e}`),t=r.querySelector(".main-img"),a=r.querySelector(".img-spinner"),u=setTimeout(()=>{a.style.display="block"},200),d=new Image;d.onload=()=>{clearTimeout(u),t.src=d.src,a.style.display="none"},d.onerror=()=>{clearTimeout(u),a.style.display="none"},d.src=k(s.images[n])+"=w600"}function N(e,n){let s;return function(...r){clearTimeout(s),s=setTimeout(()=>e.apply(this,r),n)}}const I=N(function(){const e=document.getElementById("search").value.toLowerCase(),n=document.getElementById("collection").dataset.value,s=document.getElementById("size").dataset.value,r=document.getElementById("category").dataset.value,t=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:n,size:s,category:r,favoriteMode:b,status:t})},3e3),ae=N(function(e){gtag("event","button_click",{favorite:e})},3e3);function re(e){const n=Object.values(e).filter(s=>s!==""&&s!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=n>0?`☰ Filters (${n})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",n>0))}function ie(){h.addEventListener("click",ce)}function ce(e){e.target.matches(".thumbnail-container")?se(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?ue(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&le(e.target,e.target.dataset.productId,e.target.dataset.productName)}function le(e,n,s){const r=`${window.location.origin}${window.location.pathname}?p=${n}`,t=`${s}
${r}`;navigator.clipboard.writeText(t).then(()=>{x("Product link copied to clipboard!"),e.classList.add("copied"),setTimeout(()=>e.classList.remove("copied"),2500)})}function de(){const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:e?"auto":"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function ue(e){y.includes(e)?(y=y.filter(n=>n!==e),x("Product removed from favorites!")):(y.push(e),x("Product added to favorites!"),ae(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(y)),p()}z.addEventListener("click",D);function D(e){z.classList.toggle("active"),b=!b,e!==!0&&(p(),I())}m.addEventListener("input",e=>{p(),I()});j.addEventListener("click",R);let E=!1;function fe(){E=!E,$.classList.toggle("force-expanded",E)}U.addEventListener("click",fe);document.addEventListener("click",e=>{if(!E)return;(!$.contains(e.target)||e.target.id==="btnClearFilters")&&(E=!1,$.classList.remove("force-expanded"))});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const r=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;Y.innerHTML=`
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
`,localStorage.setItem("fb-shown","1"),(function(){const t=document.getElementById("fb-tip-banner"),a=document.getElementById("fb-tip-icon"),i=document.getElementById("fb-dots"),u=document.getElementById("fb-arrow"),d=document.getElementById("fb-shimmer");let c=0;function o(){d.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function f(){c===0?(a.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(o,200)):c===1?(i.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),u.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(t.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(o,100)),c=(c+1)%3}f(),setInterval(f,2200)})()}});if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js")});let e=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{e||(e=!0,window.location.reload())})}
