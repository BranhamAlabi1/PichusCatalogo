// ====== PICHUS CONTACT CONFIGURATION ======
// Complete with the real commercial data. Leave "" to disable that channel.
// whatsapp: digits only with country code, e.g. "503701234567"
const PICHUS_CONTACT = {
  whatsapp: "",
  instagram: "https://www.instagram.com/pichus.sv_/",
  facebook: "https://www.facebook.com/profile.php?id=61591234725969",
};

// ====== CONTACT LINKS ======

function buildWhatsAppUrl(phoneNumber, message) {
  return "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
}

function wireWhatsAppLinks() {
  const waLinks = document.querySelectorAll("a[data-wa]");
  waLinks.forEach(function (link) {
    const message = link.getAttribute("data-wa") || "";
    if (PICHUS_CONTACT.whatsapp) {
      link.setAttribute("href", buildWhatsAppUrl(PICHUS_CONTACT.whatsapp, message));
    }
    // Sin número en config: se conserva el href authoring (links wa.link originales del sitio).
  });
}

function wireSocialLinks() {
  const socialLinks = document.querySelectorAll("a[data-social]");
  socialLinks.forEach(function (link) {
    const network = link.getAttribute("data-social");
    const url = network ? PICHUS_CONTACT[network] : "";
    if (url) {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    } else {
      link.hidden = true;
    }
  });
}

// ====== MOBILE MENU ======

function setupMobileMenu() {
  const toggleButton = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (!toggleButton || !navMenu) return;

  const desktopQuery = window.matchMedia("(min-width: 900px)");

  function openMenu() {
    navMenu.classList.add("is-open");
    toggleButton.setAttribute("aria-expanded", "true");
  }

  function closeMenu(returnFocus) {
    navMenu.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
    if (returnFocus) toggleButton.focus();
  }

  function isMenuOpen() {
    return navMenu.classList.contains("is-open");
  }

  toggleButton.addEventListener("click", function () {
    if (isMenuOpen()) {
      closeMenu(false);
    } else {
      openMenu();
    }
  });

  navMenu.addEventListener("click", function (event) {
    const clickedLink = event.target.closest("a");
    if (clickedLink && isMenuOpen()) {
      closeMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu(true);
    }
  });

  function handleViewportChange(event) {
    if (event.matches && isMenuOpen()) {
      closeMenu(false);
    }
  }

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", handleViewportChange);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(handleViewportChange);
  }
}

// ====== SCROLL REVEAL ======

function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}

// ====== GALLERY LIGHTBOX ======

function setupGalleryLightbox() {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (!galleryImages.length) return;

  // Overlay único creado una sola vez con la API DOM (sin innerHTML)
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Vista ampliada de la foto");

  const overlayImage = document.createElement("img");
  overlayImage.alt = "";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "lightbox-close";
  closeButton.setAttribute("aria-label", "Cerrar");
  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";
  closeIcon.setAttribute("aria-hidden", "true");
  closeButton.appendChild(closeIcon);

  overlay.appendChild(overlayImage);
  overlay.appendChild(closeButton);
  document.body.appendChild(overlay);

  let openerElement = null;

  function openLightbox(image) {
    openerElement = image;
    overlayImage.src = image.src;
    overlayImage.alt = image.alt;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLightbox() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (openerElement) {
      openerElement.focus();
      openerElement = null;
    }
  }

  function isLightboxOpen() {
    return overlay.classList.contains("is-open");
  }

  galleryImages.forEach(function (image) {
    // Hacemos cada foto enfocable y activable con teclado
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Ver completa: " + image.alt);

    image.addEventListener("click", function () {
      openLightbox(image);
    });

    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  // Clic en el fondo (solo si el destino es el overlay mismo, no la imagen)
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeLightbox();
  });

  // Escape: solo actuamos si el lightbox está abierto (no pisa el menú nav)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isLightboxOpen()) {
      closeLightbox();
    }
  });
}

// ====== INIT ======

function initPichus() {
  wireWhatsAppLinks();
  wireSocialLinks();
  setupMobileMenu();
  setupScrollReveal();
  setupGalleryLightbox();
}

document.addEventListener("DOMContentLoaded", initPichus);
