(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const O=document.getElementById("fbMessage"),g=document.getElementById("search"),w=document.getElementById("clear-search"),P=document.getElementById("btnToggleFilters"),E=document.getElementById("controls"),x=document.getElementById("collection"),C=document.getElementById("size"),k=document.getElementById("category"),L=document.getElementById("status"),v=document.getElementById("products"),B=document.getElementById("scrollTopBtn"),F=document.getElementById("btnToggleFavorites"),q="/ukayfinds/assets/products-BImsdYEK.json";function $(e,t=2500){let s=document.createElement("div");s.textContent=e,s.style.cssText=`
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
    `,document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(-50%) translateY(20px)",s.addEventListener("transitionend",()=>s.remove(),{once:!0})},t)}g.addEventListener("input",()=>{T()});function T(){g.value?w.classList.add("is-visible"):w.classList.remove("is-visible")}function _(){g.value="",g.blur(),w.classList.remove("is-visible")}w.addEventListener("pointerdown",e=>{e.preventDefault(),_(),y()});g.addEventListener("focus",()=>{});function y(e){let t=[...c];e&&(t=t.filter(a=>!a.is_sold));const s=document.getElementById("search").value.toLowerCase(),r=document.getElementById("collection").dataset.value,o=document.getElementById("size").dataset.value,n=document.getElementById("category").dataset.value,i=document.getElementById("status").dataset.value;if(K({collection:r,size:o,category:n,status:i}),e||(s&&(t=t.filter(a=>a.name.toLowerCase().includes(s))),r&&(t=t.filter(a=>a.collection===r)),o&&(t=t.filter(a=>a.size===o)),n&&(t=t.filter(a=>a.category===n)),i&&(t=t.filter(a=>a.status===i)),h&&(t=t.filter(a=>p.includes(a.id)))),!t.length){v.innerHTML=`
                          <div class="no-result">
                            <p class="no-result-text">No products found...</p>
                            <button class="btn-modern-red">Clear Filters</button>
                        </div>
                          `,v.querySelector("button").addEventListener("click",M),v.classList.add("empty-products");return}const u={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};v.classList.remove("empty-products"),v.innerHTML=t.filter(a=>!a.is_archived).map(a=>{const l=p.includes(a.id);return`
                          <div class="card ${a.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${u[a.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${a.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${a.is_reserved&&!a.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${a.is_new&&!a.is_sold&&!a.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="favorite ${l?" active":""}"
                          data-product-id="${a.id}"
                          >
                            ${l?"❤️":"♡"}
                          </button>
                          <button
                            class="share-link"
                            data-product-id="${a.id}"
                            data-product-name="${a.name}">
                                🔗
                            </button>

                          <div class="carousel" id="carousel-${a.id}">
                            <img src="${S(a.images[0])}=w600" class="main-img" style="background: ${u[a.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${a.images.map((f,d)=>`
                                        <img src="${S(f)}=w100" class="thumbnail"  data-product-id="${a.id}"
        data-index="${d}"  loading="lazy">
                                    `).join("")}
                            </div>
                          </div>

                          <div class="card-body">
                            <h3>
                                ${a.name}
                            </h3>

                            <p>
                                ${a.description}
                            </p>

                            <span class="badge">
                              ${a.collection}
                            </span>

                            <span class="badge">
                                Size ${a.size}
                            </span>

                            <br><br>

                            <span class="badge" style="background: ${u[a.category]}">
                              ${a.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${a.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${a.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join("")}function M(){_(),m(x,x.querySelectorAll(".chip")[0]),m(C,C.querySelectorAll(".chip")[0]),m(k,k.querySelectorAll(".chip")[0]),m(L,L.querySelectorAll(".chip")[0]),h&&z(!0),y()}let c=[],p=JSON.parse(localStorage.getItem("favorites")||"[]"),h=!1;function R(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const Y={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};async function N(){c=(await(await fetch(q)).json()||[]).toReversed().map(o=>({...o,images:o.images?o.images.split("||"):[],status:R(o),category:Y[o.category]})),U(),V();const{productNumber:s,collectionName:r}=X();D(s,r),y(!s&&!r),document.querySelectorAll(".filter-group").forEach(o=>{o.addEventListener("click",n=>{const i=n.target.closest(".chip");m(o,i),y(),I()})})}function m(e,t){t&&(e.querySelectorAll(".chip").forEach(s=>s.classList.remove("active")),t.classList.add("active"),e.dataset.value=t.dataset.value)}N();function X(){const e=new URLSearchParams(window.location.search),t=e.get("p"),s=e.get("c");return{productNumber:t,collectionName:s}}function D(e,t){if(e)g.value=`#${e} `,T();else if(t){const s=x.querySelector(`.chip[data-value="${t}"]`);m(x,s)}else{const s=L.querySelector('.chip[data-value="Available"]');m(L,s)}}async function U(){const e=[...new Set(c.map(n=>n.collection).filter(Boolean))].sort().map(n=>({name:n,count:c.filter(i=>i.collection===n).length})),t=[...new Set(c.map(n=>n.size).filter(Boolean))].sort(H).map(n=>({name:n,count:c.filter(i=>i.size===n).length})),s=[...new Set(c.map(n=>n.category).filter(Boolean))].sort(j).map(n=>({name:n,count:c.filter(i=>i.category===n).length})),r=[...new Set(c.map(n=>n.status).filter(Boolean))].sort().map(n=>({name:n,count:c.filter(i=>i.status===n).length})),o=(n,i,u,a)=>{const l=document.getElementById(n);l.querySelectorAll('.chip:not([data-value=""])').forEach(f=>f.remove()),i.forEach(f=>{const d=document.createElement("button");d.className="chip",d.type="button",d.dataset.value=f.name,d.textContent=u(f),l.appendChild(d)})};o("collection",e,n=>`${n.name} (${n.count})`),o("size",t,n=>`${n.name} (${n.count})`),o("category",s,n=>`${n.name.split(" ")[1]} (${n.count})`),o("status",r,n=>`${n.name} (${n.count})`)}function j(e,t){const s=["🟤 Sulit","🟢 Classic","🟣 Premium"],r=s.indexOf(e),o=s.indexOf(t);return r===-1&&o===-1?e.localeCompare(t):r===-1?1:o===-1?-1:r-o}function H(e,t){const s=["XXS","XS","S","M","L","XL","XXL","3XL"],r=s.indexOf(e.toUpperCase()),o=s.indexOf(t.toUpperCase());return r===-1&&o===-1?e.localeCompare(t):r===-1?1:o===-1?-1:r-o}B.addEventListener("click",Z),window.addEventListener("scroll",()=>{B.style.display=window.scrollY>300?"block":"none"}),B.style.display="none";function S(e){return`https://lh3.googleusercontent.com/d/${e}`}function G(e,t){const s=c.find(u=>u.id==e),r=document.querySelector(`#carousel-${e}`),o=r.querySelector(".main-img"),n=r.querySelector(".img-spinner");n.style.display="block";const i=new Image;i.onload=()=>{o.src=i.src,n.style.display="none"},i.onerror=()=>{n.style.display="none"},i.src=S(s.images[t])+"=w600"}function A(e,t){let s;return function(...r){clearTimeout(s),s=setTimeout(()=>e.apply(this,r),t)}}const I=A(function(){const e=document.getElementById("search").value.toLowerCase(),t=document.getElementById("collection").dataset.value,s=document.getElementById("size").dataset.value,r=document.getElementById("category").dataset.value,o=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:t,size:s,category:r,favoriteMode:h,status:o})},3e3),J=A(function(e){gtag("event","button_click",{favorite:e})},3e3);function K(e){const t=Object.values(e).filter(s=>s!==""&&s!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=t>0?`☰ Filters (${t})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",t>0))}function V(){v.addEventListener("click",Q)}function Q(e){e.target.matches(".thumbnail")?G(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?ee(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&W(e.target.dataset.productId,e.target.dataset.productName)}function W(e,t){const s=`${window.location.origin}${window.location.pathname}?p=${e}`,r=`${t}
${s}`;navigator.clipboard.writeText(r).then(()=>{$("Product link copied to clipboard!")})}function Z(){window.scrollTo({top:0,behavior:"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function ee(e){p.includes(e)?(p=p.filter(t=>t!==e),$("Product removed from favorites!")):(p.push(e),$("Product added to favorites!"),J(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(p)),y()}F.addEventListener("click",z);function z(e){F.classList.toggle("active"),h=!h,e!==!0&&(y(),I())}g.addEventListener("input",e=>{y(),I()});let b=!1;const te=100;window.addEventListener("scroll",()=>{const t=window.scrollY>te;E.classList.toggle("collapsed",t)},{passive:!0});function ne(){b=!b,E.classList.toggle("force-expanded",b)}P.addEventListener("click",ne);document.addEventListener("click",e=>{if(!b)return;E.contains(e.target)||(b=!1,E.classList.remove("force-expanded"))});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const r=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;O.innerHTML=`
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
`,localStorage.setItem("fb-shown","1"),(function(){const o=document.getElementById("fb-tip-banner"),n=document.getElementById("fb-tip-icon"),i=document.getElementById("fb-dots"),u=document.getElementById("fb-arrow"),a=document.getElementById("fb-shimmer");let l=0;function f(){a.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function d(){l===0?(n.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(f,200)):l===1?(i.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),u.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(o.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(f,100)),l=(l+1)%3}d(),setInterval(d,2200)})()}});
