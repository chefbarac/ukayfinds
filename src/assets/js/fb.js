import { fbMsgEl } from "./el";

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('fb-shown') === '1') return;
    const ua = navigator.userAgent || navigator.vendor;

    // const isFacebookBrowser = ua.includes("FBAN") || ua.includes("FBAV") || ua.includes("Messenger");
    const isFacebookOrMessenger = /FBAN|FBAV|FB_IAB|Messenger/i.test(ua);

    if (isFacebookOrMessenger) {
        const currentURL = window.location.origin + window.location.pathname + window.location.search + window.location.hash;
        const intentURL = `intent://${currentURL.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
        // In your JS, set fbMsgEl to this HTML
        fbMsgEl.innerHTML = `
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

        localStorage.setItem('fb-shown', '1');

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
});