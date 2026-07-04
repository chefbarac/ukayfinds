(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const P=document.getElementById("fbMessage"),g=document.getElementById("search"),E=document.getElementById("clear-search"),q=document.getElementById("btnToggleFilters"),$=document.getElementById("controls"),x=document.getElementById("collection"),C=document.getElementById("size"),k=document.getElementById("category"),w=document.getElementById("status"),v=document.getElementById("products"),B=document.getElementById("scrollTopBtn"),F=document.getElementById("btnToggleFavorites"),M=document.getElementById("btnClearFilters"),N="/ukayfinds/assets/products-BImsdYEK.json";function L(e,t=2500){let o=document.createElement("div");o.textContent=e,o.style.cssText=`
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
    `,document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) translateY(20px)",o.addEventListener("transitionend",()=>o.remove(),{once:!0})},t)}g.addEventListener("input",()=>{T()});function T(){g.value?E.classList.add("is-visible"):E.classList.remove("is-visible")}function A(){g.value="",g.blur(),E.classList.remove("is-visible")}E.addEventListener("pointerdown",e=>{e.preventDefault(),A(),y()});g.addEventListener("focus",()=>{});function y(e){let t=[...l];e&&(t=t.filter(a=>!a.is_sold));const o=document.getElementById("search").value.toLowerCase(),r=document.getElementById("collection").dataset.value,s=document.getElementById("size").dataset.value,n=document.getElementById("category").dataset.value,i=document.getElementById("status").dataset.value;if(Q({collection:r,size:s,category:n,status:i}),e||(o&&(t=t.filter(a=>a.name.toLowerCase().includes(o))),r&&(t=t.filter(a=>a.collection===r)),s&&(t=t.filter(a=>a.size===s)),n&&(t=t.filter(a=>a.category===n)),i&&(t=t.filter(a=>a.status===i)),h&&(t=t.filter(a=>m.includes(a.id)))),!t.length){v.innerHTML=`
                          <div class="no-result">
                            <p class="no-result-text">No products found...</p>
                            <button class="btn-modern-red">Clear Filters</button>
                        </div>
                          `,v.querySelector("button").addEventListener("click",_),v.classList.add("empty-products");return}const u={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};v.classList.remove("empty-products"),v.innerHTML=t.filter(a=>!a.is_archived).map(a=>{const c=m.includes(a.id);return`
                          <div class="card ${a.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${u[a.category]||"#c8c8c8"} border-box;
                            border: 1px solid transparent;
                            border-radius: 12px;">
                              ${a.is_sold?'<div class="banner sold-banner">Sold</div>':""}
                              ${a.is_reserved&&!a.is_sold?'<div class="banner reserved-banner">Reserved</div>':""}
                              ${a.is_new&&!a.is_sold&&!a.is_reserved?'<div class="banner new-banner">New</div>':""}
                          <button
                          class="favorite ${c?" active":""}"
                          data-product-id="${a.id}"
                          >
                            ${c?"❤️":"♡"}
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

                          `}).join("")}function _(){A(),p(x,x.querySelectorAll(".chip")[0]),p(C,C.querySelectorAll(".chip")[0]),p(k,k.querySelectorAll(".chip")[0]),p(w,w.querySelectorAll(".chip")[0]),h&&O(!0),y()}function X(e){let t=!1;return function(){t||(requestAnimationFrame(()=>{e(),t=!1}),t=!0)}}let l=[],m=JSON.parse(localStorage.getItem("favorites")||"[]"),h=!1;function R(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const Y={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};async function D(){l=(await(await fetch(N)).json()||[]).toReversed().map(s=>({...s,images:s.images?s.images.split("||"):[],status:R(s),category:Y[s.category]})),G(),W();const{productNumber:o,collectionName:r}=U();j(o,r),y(!o&&!r),document.querySelectorAll(".filter-group").forEach(s=>{s.addEventListener("click",n=>{const i=n.target.closest(".chip");p(s,i),y(),I()})})}function p(e,t){t&&(e.querySelectorAll(".chip").forEach(o=>o.classList.remove("active")),t.classList.add("active"),e.dataset.value=t.dataset.value)}D();function U(){const e=new URLSearchParams(window.location.search),t=e.get("p"),o=e.get("c");return{productNumber:t,collectionName:o}}function j(e,t){if(e)g.value=`#${e} `,T();else if(t){const o=x.querySelector(`.chip[data-value="${t}"]`);p(x,o)}else{const o=w.querySelector('.chip[data-value="Available"]');p(w,o)}}async function G(){const e=[...new Set(l.map(n=>n.collection).filter(Boolean))].sort().map(n=>({name:n,count:l.filter(i=>i.collection===n).length})),t=[...new Set(l.map(n=>n.size).filter(Boolean))].sort(J).map(n=>({name:n,count:l.filter(i=>i.size===n).length})),o=[...new Set(l.map(n=>n.category).filter(Boolean))].sort(H).map(n=>({name:n,count:l.filter(i=>i.category===n).length})),r=[...new Set(l.map(n=>n.status).filter(Boolean))].sort().map(n=>({name:n,count:l.filter(i=>i.status===n).length})),s=(n,i,u,a)=>{const c=document.getElementById(n);c.querySelectorAll('.chip:not([data-value=""])').forEach(f=>f.remove()),i.forEach(f=>{const d=document.createElement("button");d.className="chip",d.type="button",d.dataset.value=f.name,d.textContent=u(f),c.appendChild(d)})};s("collection",e,n=>`${n.name} (${n.count})`),s("size",t,n=>`${n.name} (${n.count})`),s("category",o,n=>`${n.name.split(" ")[1]} (${n.count})`),s("status",r,n=>`${n.name} (${n.count})`)}function H(e,t){const o=["🟤 Sulit","🟢 Classic","🟣 Premium"],r=o.indexOf(e),s=o.indexOf(t);return r===-1&&s===-1?e.localeCompare(t):r===-1?1:s===-1?-1:r-s}function J(e,t){const o=["XXS","XS","S","M","L","XL","XXL","3XL"],r=o.indexOf(e.toUpperCase()),s=o.indexOf(t.toUpperCase());return r===-1&&s===-1?e.localeCompare(t):r===-1?1:s===-1?-1:r-s}(()=>{B.addEventListener("click",te);const e=X(()=>{B.style.display=window.scrollY>300?"block":"none"});window.addEventListener("scroll",e,{passive:!0}),B.style.display="none"})();function S(e){return`https://lh3.googleusercontent.com/d/${e}`}function K(e,t){const o=l.find(u=>u.id==e),r=document.querySelector(`#carousel-${e}`),s=r.querySelector(".main-img"),n=r.querySelector(".img-spinner");n.style.display="block";const i=new Image;i.onload=()=>{s.src=i.src,n.style.display="none"},i.onerror=()=>{n.style.display="none"},i.src=S(o.images[t])+"=w600"}function z(e,t){let o;return function(...r){clearTimeout(o),o=setTimeout(()=>e.apply(this,r),t)}}const I=z(function(){const e=document.getElementById("search").value.toLowerCase(),t=document.getElementById("collection").dataset.value,o=document.getElementById("size").dataset.value,r=document.getElementById("category").dataset.value,s=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:t,size:o,category:r,favoriteMode:h,status:s})},3e3),V=z(function(e){gtag("event","button_click",{favorite:e})},3e3);function Q(e){const t=Object.values(e).filter(o=>o!==""&&o!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=t>0?`☰ Filters (${t})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",t>0))}function W(){v.addEventListener("click",Z)}function Z(e){e.target.matches(".thumbnail")?K(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?ne(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&ee(e.target.dataset.productId,e.target.dataset.productName)}function ee(e,t){const o=`${window.location.origin}${window.location.pathname}?p=${e}`,r=`${t}
${o}`;navigator.clipboard.writeText(r).then(()=>{L("Product link copied to clipboard!")})}function te(){window.scrollTo({top:0,behavior:"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function ne(e){m.includes(e)?(m=m.filter(t=>t!==e),L("Product removed from favorites!")):(m.push(e),L("Product added to favorites!"),V(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(m)),y()}F.addEventListener("click",O);function O(e){F.classList.toggle("active"),h=!h,e!==!0&&(y(),I())}g.addEventListener("input",e=>{y(),I()});M.addEventListener("click",_);let b=!1;function oe(){b=!b,$.classList.toggle("force-expanded",b)}q.addEventListener("click",oe);document.addEventListener("click",e=>{if(!b)return;(!$.contains(e.target)||e.target.id==="btnClearFilters")&&(b=!1,$.classList.remove("force-expanded"))});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const r=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;P.innerHTML=`
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
`,localStorage.setItem("fb-shown","1"),(function(){const s=document.getElementById("fb-tip-banner"),n=document.getElementById("fb-tip-icon"),i=document.getElementById("fb-dots"),u=document.getElementById("fb-arrow"),a=document.getElementById("fb-shimmer");let c=0;function f(){a.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function d(){c===0?(n.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(f,200)):c===1?(i.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),u.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(s.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(f,100)),c=(c+1)%3}d(),setInterval(d,2200)})()}});
