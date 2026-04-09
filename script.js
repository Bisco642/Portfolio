 /* ═══════════════════════════════════════════════════
       script.js — mobile nav toggle + active nav links
       ═══════════════════════════════════════════════════ */
    (function () {
      "use strict";

      /* ── MOBILE NAV TOGGLE ──────────────────────────── */
      const toggle   = document.getElementById("navToggle");
      const navLinks = document.getElementById("navLinks");

      if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
          const expanded = toggle.getAttribute("aria-expanded") === "true";
          toggle.setAttribute("aria-expanded", String(!expanded));
          navLinks.classList.toggle("is-open");
          document.body.style.overflow = expanded ? "" : "hidden";
        });

        navLinks.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            toggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("is-open");
            document.body.style.overflow = "";
          });
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
            toggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("is-open");
            document.body.style.overflow = "";
          }
        });
      }

      /* ── ACTIVE NAV LINK (IntersectionObserver) ─────── */
      const sections    = document.querySelectorAll("section[id]");
      const allNavLinks = document.querySelectorAll(".nav__links a");

      if ("IntersectionObserver" in window && sections.length && allNavLinks.length) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                allNavLinks.forEach((a) => {
                  a.style.color = a.getAttribute("href") === `#${entry.target.id}`
                    ? "var(--color-text)"
                    : "";
                });
              }
            });
          },
          { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach((s) => observer.observe(s));
      }

    })();