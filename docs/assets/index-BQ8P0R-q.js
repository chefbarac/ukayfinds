(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(a){if(a.ep)return;a.ep=!0;const t=n(a);fetch(a.href,t)}})();const k=document.getElementById("fbMessage"),c=document.getElementById("search"),y=document.getElementById("clear-search"),F=document.getElementById("btnToggleFilters"),g=document.getElementById("controls");document.getElementById("collection");const E=document.getElementById("products"),w=document.getElementById("scrollTopBtn"),S=document.getElementById("btnShowFavorites"),T="/ukayfinds/assets/products-BImsdYEK.json";function x(e,s=2500){let n=document.createElement("div");n.textContent=e,n.style.cssText=`
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
    `,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) translateY(20px)",n.addEventListener("transitionend",()=>n.remove(),{once:!0})},s)}function v(){let e=[...l];const s=document.getElementById("search").value.toLowerCase(),n=document.getElementById("collection").dataset.value,i=document.getElementById("size").dataset.value,a=document.getElementById("category").dataset.value,t=document.getElementById("status").dataset.value;if(X({collection:n,size:i,category:a,status:t}),s&&(e=e.filter(o=>o.name.toLowerCase().includes(s))),n&&(e=e.filter(o=>o.collection===n)),i&&(e=e.filter(o=>o.size===i)),a&&(e=e.filter(o=>o.category===a)),t&&(e=e.filter(o=>o.status===t)),h&&(e=e.filter(o=>p.includes(o.id))),!e.length){E.innerHTML=`
                          <div class="no-result">
                          No products found
                          </div>
                          `;return}const r={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};E.innerHTML=e.filter(o=>!o.is_archived).map(o=>{const b=p.includes(o.id);return`
                          <div class="card ${o.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${r[o.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${o.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${o.is_reserved&&!o.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${o.is_new&&!o.is_sold&&!o.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="favorite ${b?" active":""}"
                          data-product-id="${o.id}"
                          >
                            ${b?"❤️":"♡"}
                          </button>
                          <button
                            class="share-link"
                            data-product-id="${o.id}"
                            data-product-name="${o.name}">
                                🔗
                            </button>

                          <div class="carousel" id="carousel-${o.id}">
                            <img src="${L(o.images[0])}=w600" class="main-img" style="background: ${r[o.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${o.images.map((d,u)=>`
                                        <img src="${L(d)}=w100" class="thumbnail"  data-product-id="${o.id}"
        data-index="${u}"  loading="lazy">
                                    `).join("")}
                            </div>
                          </div>

                          <div class="card-body">
                            <h3>
                                ${o.name}
                            </h3>

                            <p>
                                ${o.description}
                            </p>

                            <span class="badge">
                              ${o.collection}
                            </span>

                            <span class="badge">
                                Size ${o.size}
                            </span>

                            <br><br>

                            <span class="badge" style="background: ${r[o.category]}">
                              ${o.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${o.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${o.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join("")}function _(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const O={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};let l=[];async function A(){l=(await(await fetch(T)).json()||[]).toReversed().map(n=>({...n,images:n.images?n.images.split("||"):[],status:_(n),category:O[n.category]})),Y(),z(),D(),v()}A();document.querySelectorAll(".filter-group").forEach(function(e){e.addEventListener("click",function(s){var n=s.target.closest(".chip");n&&(e.querySelectorAll(".chip").forEach(function(i){i.classList.remove("active")}),n.classList.add("active"),e.dataset.value=n.dataset.value)})});function z(){const e=new URLSearchParams(window.location.search),s=e.get("p"),n=e.get("c");if(s){c.value=`#${s} `;const i=new Event("input",{bubbles:!0,cancelable:!0});c.dispatchEvent(i)}if(n){const i=collectionGroup.querySelector(`.chip[data-value="${n}"]`);i?i.click():console.warn(`No chip found for collection "${n}"`)}}async function Y(){const e=[...new Set(l.map(t=>t.collection).filter(Boolean))].sort().map(t=>({name:t,count:l.filter(r=>r.collection===t).length})),s=[...new Set(l.map(t=>t.size).filter(Boolean))].sort(M).map(t=>({name:t,count:l.filter(r=>r.size===t).length})),n=[...new Set(l.map(t=>t.category).filter(Boolean))].sort(P).map(t=>({name:t,count:l.filter(r=>r.category===t).length})),i=[...new Set(l.map(t=>t.status).filter(Boolean))].sort().map(t=>({name:t,count:l.filter(r=>r.status===t).length})),a=(t,r,o,b)=>{const d=document.getElementById(t);d.querySelectorAll('.chip:not([data-value=""])').forEach(u=>u.remove()),r.forEach(u=>{const f=document.createElement("button");f.className="chip",f.type="button",f.dataset.value=u.name,f.textContent=o(u),d.appendChild(f)})};a("collection",e,t=>`${t.name} (${t.count})`),a("size",s,t=>`${t.name} (${t.count})`),a("category",n,t=>`${t.name.split(" ")[1]} (${t.count})`),a("status",i,t=>`${t.name} (${t.count})`)}function P(e,s){const n=["🟤 Sulit","🟢 Classic","🟣 Premium"],i=n.indexOf(e),a=n.indexOf(s);return i===-1&&a===-1?e.localeCompare(s):i===-1?1:a===-1?-1:i-a}function M(e,s){const n=["XXS","XS","S","M","L","XL","XXL","3XL"],i=n.indexOf(e.toUpperCase()),a=n.indexOf(s.toUpperCase());return i===-1&&a===-1?e.localeCompare(s):i===-1?1:a===-1?-1:i-a}w.addEventListener("click",j),window.addEventListener("scroll",()=>{w.style.display=window.scrollY>300?"block":"none"}),w.style.display="none";let p=JSON.parse(localStorage.getItem("favorites")||"[]"),h=!1;function L(e){return`https://lh3.googleusercontent.com/d/${e}`}function N(e,s){const n=l.find(o=>o.id==e),i=document.querySelector(`#carousel-${e}`),a=i.querySelector(".main-img"),t=i.querySelector(".img-spinner");t.style.display="block";const r=new Image;r.onload=()=>{a.src=r.src,t.style.display="none"},r.onerror=()=>{t.style.display="none"},r.src=L(n.images[s])+"=w600"}function I(e,s){let n;return function(...i){clearTimeout(n),n=setTimeout(()=>e.apply(this,i),s)}}const B=I(function(){const e=document.getElementById("search").value.toLowerCase(),s=document.getElementById("collection").dataset.value,n=document.getElementById("size").dataset.value,i=document.getElementById("category").dataset.value,a=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:s,size:n,category:i,favoriteMode:h,status:a})},3e3),R=I(function(e){gtag("event","button_click",{favorite:e})},3e3);function X(e){const s=Object.values(e).filter(n=>n!==""&&n!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=s>0?`☰ Filters (${s})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",s>0))}function D(){E.addEventListener("click",q)}function q(e){e.target.matches(".thumbnail")?N(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?H(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&U(e.target.dataset.productId,e.target.dataset.productName)}function U(e,s){const n=`${window.location.origin}${window.location.pathname}?p=${e}`,i=`${s}
${n}`;navigator.clipboard.writeText(i).then(()=>{x("Product link copied to clipboard!")})}function j(){window.scrollTo({top:0,behavior:"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function H(e){p.includes(e)?(p=p.filter(s=>s!==e),x("Product removed from favorites!")):(p.push(e),x("Product added to favorites!"),R(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(p)),v()}S.addEventListener("click",J);function J(){S.classList.toggle("active"),h=!h,v(),B()}c.addEventListener("input",e=>{v(),B()});document.querySelectorAll(".filter-group").forEach(e=>{e.addEventListener("click",s=>{const n=s.target.closest(".chip");n&&(e.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),n.classList.add("active"),e.dataset.value=n.dataset.value,v(),B())})});let m=!1;const K=100;let $=window.scrollY;const G=250;window.addEventListener("scroll",()=>{const e=window.scrollY;e>K?g.classList.add("collapsed"):g.classList.remove("collapsed"),m?Math.abs(e-$)>G&&(m=!1,g.classList.remove("force-expanded")):$=e},{passive:!0});function V(){m=!m,g.classList.toggle("force-expanded",m),m&&($=window.scrollY)}F.addEventListener("click",V);document.addEventListener("click",e=>{if(!m)return;g.contains(e.target)||(m=!1,g.classList.remove("force-expanded"))});c.addEventListener("input",()=>{c.value?y.classList.add("is-visible"):y.classList.remove("is-visible")});y.addEventListener("pointerdown",e=>{e.preventDefault(),c.value="",c.blur(),y.classList.remove("is-visible"),v()});let C=0,Q=200;c.addEventListener("focus",()=>{C=window.scrollY});window.addEventListener("scroll",()=>{document.activeElement===c&&Math.abs(window.scrollY-C)>=Q&&c.blur()},{passive:!0});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const i=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;k.innerHTML=`
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
      Tip: <a href="${i}" style="color:#1a6fbf;font-weight:500;text-decoration:underline;">
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
`,localStorage.setItem("fb-shown","1"),(function(){const a=document.getElementById("fb-tip-banner"),t=document.getElementById("fb-tip-icon"),r=document.getElementById("fb-dots"),o=document.getElementById("fb-arrow"),b=document.getElementById("fb-shimmer");let d=0;function u(){b.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function f(){d===0?(t.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(u,200)):d===1?(r.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),o.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(a.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(u,100)),d=(d+1)%3}f(),setInterval(f,2200)})()}});
