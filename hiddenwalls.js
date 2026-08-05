document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     LIGHTBOX
     ========================= */

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeBtn = document.querySelector(".lightbox__close");

  if (lightbox && lightboxImage && closeBtn) {
    const zoomableImages = document.querySelectorAll(
      ".process-image, " +
      ".target-card, " +
      ".process-gallery img, " +
      ".visual-identity-image, " +
      ".wireframes-showcase img, " +
      ".testing-grid img, " +
      ".product-grid img"
    );

    let scale = 1;

    function updateZoom() {
      lightboxImage.style.transform = `scale(${scale})`;
      lightboxImage.classList.toggle("is-zoomed", scale > 1);
    }

    function openLightbox(img) {
      lightboxImage.src = img.currentSrc || img.src;
      lightboxImage.alt = img.alt || "";

      scale = 1;
      updateZoom();

      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lightboxImage.src = "";

      scale = 1;
      updateZoom();
    }

    zoomableImages.forEach((img) => {
      img.addEventListener("click", () => openLightbox(img));
    });

    lightboxImage.addEventListener("click", (event) => {
      event.stopPropagation();

      scale = scale === 1 ? 2 : 1;
      updateZoom();
    });

    lightboxImage.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        const zoomDirection = event.deltaY < 0 ? 0.2 : -0.2;
        scale = Math.min(4, Math.max(1, scale + zoomDirection));

        updateZoom();
      },
      { passive: false }
    );

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (!lightbox.classList.contains("active")) return;

      if (event.key === "+" || event.key === "=") {
        scale = Math.min(4, scale + 0.2);
        updateZoom();
      }

      if (event.key === "-") {
        scale = Math.max(1, scale - 0.2);
        updateZoom();
      }
    });
  }

  /* =========================
     ACTIVE CASE NAVIGATION
     ========================= */

  const caseNavLinks = document.querySelectorAll(
    ".case-sectionnav__link"
  );

  const caseSections = document.querySelectorAll(
    "#context, #process, #product"
  );

  function setActiveCaseLink(sectionId) {
    caseNavLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (visibleSections.length > 0) {
        setActiveCaseLink(
          visibleSections[0].target.id
        );
      }
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5]
    }
  );

  caseSections.forEach((section) => {
    sectionObserver.observe(section);
  });
});