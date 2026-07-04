(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const F=document.getElementById("fbMessage"),u=document.getElementById("search"),y=document.getElementById("clear-search"),_=document.getElementById("btnToggleFilters"),v=document.getElementById("controls"),T=document.getElementById("collection"),A=document.getElementById("status"),E=document.getElementById("products"),w=document.getElementById("scrollTopBtn"),S=document.getElementById("btnShowFavorites"),O="/ukayfinds/assets/products-BImsdYEK.json";function x(e,t=2500){let n=document.createElement("div");n.textContent=e,n.style.cssText=`
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
    `,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) translateY(20px)",n.addEventListener("transitionend",()=>n.remove(),{once:!0})},t)}function b(e){let t=[...c];e&&(t=t.filter(a=>!a.is_sold));const n=document.getElementById("search").value.toLowerCase(),i=document.getElementById("collection").dataset.value,s=document.getElementById("size").dataset.value,o=document.getElementById("category").dataset.value,r=document.getElementById("status").dataset.value;if(e||(U({collection:i,size:s,category:o,status:r}),n&&(t=t.filter(a=>a.name.toLowerCase().includes(n))),i&&(t=t.filter(a=>a.collection===i)),s&&(t=t.filter(a=>a.size===s)),o&&(t=t.filter(a=>a.category===o)),r&&(t=t.filter(a=>a.status===r)),h&&(t=t.filter(a=>g.includes(a.id)))),!t.length){E.innerHTML=`
                          <div class="no-result">
                          No products found
                          </div>
                          `;return}const f={"🟤 Sulit":"linear-gradient(135deg, #F6EBDD 0%, #E4CDB2 50%, #CFAF8B 100%)","🟢 Classic":"linear-gradient(135deg, #DCEEEA 0%, #A9CFC8 50%, #6FA8A0 100%)","🟣 Premium":"linear-gradient(135deg, #EDE1EC 0%, #B98BC9 50%, #6B3F7A 100%)"};console.log(t.length),E.innerHTML=t.filter(a=>!a.is_archived).map(a=>{const l=g.includes(a.id);return`
                          <div class="card ${a.is_sold?"sold":""}" style="background:
                            linear-gradient(white, white) padding-box,
                            ${f[a.category]||"#c8c8c8"} border-box;
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
                            <img src="${L(a.images[0])}=w600" class="main-img" style="background: ${f[a.category]||"#c8c8c8"}; padding: 1px;" loading="lazy">
                            <div class="img-spinner"></div>
                            <div class="thumbs">
                              ${a.images.map((m,d)=>`
                                        <img src="${L(m)}=w100" class="thumbnail"  data-product-id="${a.id}"
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

                            <span class="badge" style="background: ${f[a.category]}">
                              ${a.category}
                            </span>

                            <span class="price">
                              <span style="color: gray; text-decoration: line-through; font-style: italic;">₱${a.anchor_price}</span>
                              <span style="color: #e63946; font-weight: bold;">₱${a.price}</span>
                            </span>
                          </div>
                          </div>

                          `}).join("")}function z(e){return e.is_sold?"Sold":e.is_reserved?"Reserved":"Available"}const P={Affordable:"🟤 Sulit",Regular:"🟢 Classic",Premium:"🟣 Premium"};let c=[];async function Y(){c=(await(await fetch(O)).json()||[]).toReversed().map(s=>({...s,images:s.images?s.images.split("||"):[],status:z(s),category:P[s.category]})),M(),N(),j();const{productNumber:n,collectionName:i}=I();b(!n&&!i)}Y();document.querySelectorAll(".filter-group").forEach(function(e){e.addEventListener("click",function(t){var n=t.target.closest(".chip");n&&(e.querySelectorAll(".chip").forEach(function(i){i.classList.remove("active")}),n.classList.add("active"),e.dataset.value=n.dataset.value)})});function I(){const e=new URLSearchParams(window.location.search),t=e.get("p"),n=e.get("c");return{productNumber:t,collectionName:n}}function N(){const{productNumber:e,collectionName:t}=I();if(e){u.value=`#${e} `;const n=new Event("input",{bubbles:!0,cancelable:!0});u.dispatchEvent(n)}else if(t){const n=T.querySelector(`.chip[data-value="${t}"]`);n?n.click():console.warn(`No chip found for collection "${t}"`)}else{const n=A.querySelector('.chip[data-value="Available"]');n&&n.click()}}async function M(){const e=[...new Set(c.map(o=>o.collection).filter(Boolean))].sort().map(o=>({name:o,count:c.filter(r=>r.collection===o).length})),t=[...new Set(c.map(o=>o.size).filter(Boolean))].sort(X).map(o=>({name:o,count:c.filter(r=>r.size===o).length})),n=[...new Set(c.map(o=>o.category).filter(Boolean))].sort(R).map(o=>({name:o,count:c.filter(r=>r.category===o).length})),i=[...new Set(c.map(o=>o.status).filter(Boolean))].sort().map(o=>({name:o,count:c.filter(r=>r.status===o).length})),s=(o,r,f,a)=>{const l=document.getElementById(o);l.querySelectorAll('.chip:not([data-value=""])').forEach(m=>m.remove()),r.forEach(m=>{const d=document.createElement("button");d.className="chip",d.type="button",d.dataset.value=m.name,d.textContent=f(m),l.appendChild(d)})};s("collection",e,o=>`${o.name} (${o.count})`),s("size",t,o=>`${o.name} (${o.count})`),s("category",n,o=>`${o.name.split(" ")[1]} (${o.count})`),s("status",i,o=>`${o.name} (${o.count})`)}function R(e,t){const n=["🟤 Sulit","🟢 Classic","🟣 Premium"],i=n.indexOf(e),s=n.indexOf(t);return i===-1&&s===-1?e.localeCompare(t):i===-1?1:s===-1?-1:i-s}function X(e,t){const n=["XXS","XS","S","M","L","XL","XXL","3XL"],i=n.indexOf(e.toUpperCase()),s=n.indexOf(t.toUpperCase());return i===-1&&s===-1?e.localeCompare(t):i===-1?1:s===-1?-1:i-s}w.addEventListener("click",J),window.addEventListener("scroll",()=>{w.style.display=window.scrollY>300?"block":"none"}),w.style.display="none";let g=JSON.parse(localStorage.getItem("favorites")||"[]"),h=!1;function L(e){return`https://lh3.googleusercontent.com/d/${e}`}function q(e,t){const n=c.find(f=>f.id==e),i=document.querySelector(`#carousel-${e}`),s=i.querySelector(".main-img"),o=i.querySelector(".img-spinner");o.style.display="block";const r=new Image;r.onload=()=>{s.src=r.src,o.style.display="none"},r.onerror=()=>{o.style.display="none"},r.src=L(n.images[t])+"=w600"}function C(e,t){let n;return function(...i){clearTimeout(n),n=setTimeout(()=>e.apply(this,i),t)}}const B=C(function(){const e=document.getElementById("search").value.toLowerCase(),t=document.getElementById("collection").dataset.value,n=document.getElementById("size").dataset.value,i=document.getElementById("category").dataset.value,s=document.getElementById("status").dataset.value;gtag("event","filter_applied",{search:e,collection:t,size:n,category:i,favoriteMode:h,status:s})},3e3),D=C(function(e){gtag("event","button_click",{favorite:e})},3e3);function U(e){const t=Object.values(e).filter(n=>n!==""&&n!=null).length;btnToggleFilters&&(btnToggleFilters.textContent=t>0?`☰ Filters (${t})`:"☰ Filters",btnToggleFilters.classList.toggle("filters-active",t>0))}function j(){E.addEventListener("click",H)}function H(e){e.target.matches(".thumbnail")?q(e.target.dataset.productId,Number(e.target.dataset.index)):e.target.matches(".favorite")?K(Number(e.target.dataset.productId)):e.target.matches(".share-link")&&G(e.target.dataset.productId,e.target.dataset.productName)}function G(e,t){const n=`${window.location.origin}${window.location.pathname}?p=${e}`,i=`${t}
${n}`;navigator.clipboard.writeText(i).then(()=>{x("Product link copied to clipboard!")})}function J(){window.scrollTo({top:0,behavior:"smooth"}),gtag("event","button_click",{button_name:"scroll_back_to_top"})}function K(e){g.includes(e)?(g=g.filter(t=>t!==e),x("Product removed from favorites!")):(g.push(e),x("Product added to favorites!"),D(`#${e}`)),localStorage.setItem("favorites",JSON.stringify(g)),b()}S.addEventListener("click",V);function V(){S.classList.toggle("active"),h=!h,b(),B()}u.addEventListener("input",e=>{b(),B()});document.querySelectorAll(".filter-group").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.closest(".chip");n&&(e.querySelectorAll(".chip").forEach(i=>i.classList.remove("active")),n.classList.add("active"),e.dataset.value=n.dataset.value,b(),B())})});let p=!1;const Q=100;let $=window.scrollY;const W=250;window.addEventListener("scroll",()=>{const e=window.scrollY;e>Q?v.classList.add("collapsed"):v.classList.remove("collapsed"),p?Math.abs(e-$)>W&&(p=!1,v.classList.remove("force-expanded")):$=e},{passive:!0});function Z(){p=!p,v.classList.toggle("force-expanded",p),p&&($=window.scrollY)}_.addEventListener("click",Z);document.addEventListener("click",e=>{if(!p)return;v.contains(e.target)||(p=!1,v.classList.remove("force-expanded"))});u.addEventListener("input",()=>{u.value?y.classList.add("is-visible"):y.classList.remove("is-visible")});y.addEventListener("pointerdown",e=>{e.preventDefault(),u.value="",u.blur(),y.classList.remove("is-visible"),b()});let k=0,ee=200;u.addEventListener("focus",()=>{k=window.scrollY});window.addEventListener("scroll",()=>{document.activeElement===u&&Math.abs(window.scrollY-k)>=ee&&u.blur()},{passive:!0});document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("fb-shown")==="1")return;const e=navigator.userAgent||navigator.vendor;if(/FBAN|FBAV|FB_IAB|Messenger/i.test(e)){const i=`intent://${(window.location.origin+window.location.pathname+window.location.search+window.location.hash).replace(/^https?:\/\//,"")}#Intent;scheme=https;package=com.android.chrome;end`;F.innerHTML=`
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
`,localStorage.setItem("fb-shown","1"),(function(){const s=document.getElementById("fb-tip-banner"),o=document.getElementById("fb-tip-icon"),r=document.getElementById("fb-dots"),f=document.getElementById("fb-arrow"),a=document.getElementById("fb-shimmer");let l=0;function m(){a.animate([{transform:"translateX(-100%)"},{transform:"translateX(200%)"}],{duration:900,easing:"ease-in-out"})}function d(){l===0?(o.animate([{transform:"translateY(0)"},{transform:"translateY(-5px)"},{transform:"translateY(0)"}],{duration:400,easing:"ease-out"}),setTimeout(m,200)):l===1?(r.animate([{background:"#f4f4f4",boxShadow:"none"},{background:"#ddeeff",boxShadow:"0 0 0 2px #5599ee"},{background:"#f4f4f4",boxShadow:"none"}],{duration:700,easing:"ease-in-out"}),f.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"},{opacity:1,transform:"translateY(0)"},{opacity:0}],{duration:1400})):(s.animate([{transform:"scale(1)"},{transform:"scale(1.015)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out"}),setTimeout(m,100)),l=(l+1)%3}d(),setInterval(d,2200)})()}});
