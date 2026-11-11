import { ALBUMS, PHOTOS, POUSADA, STAYS, buildWhatsAppUrl } from "../src/data/pousada.ts";

const iconPaths = {
  menu: '<path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
  tv: '<rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>',
  coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  utensils: '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>',
  bath: '<path d="M10 4 8 6"/><path d="M17 19v2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
};

function icon(name, size = 22) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] ?? ""}</svg>`;
}

document.querySelectorAll("[data-icon]").forEach((element) => {
  const name = element.dataset.icon;
  const size = name === "menu" || name === "close"
    ? element.closest("#modal-close") ? 28 : 24
    : name === "message" || name === "arrow-right"
      ? element.classList.contains("h-4") ? 16 : 26
      : name === "pin" || name === "clock"
        ? 18
        : name === "navigation" || name === "external"
          ? 15
          : (name === "left" || name === "right") && element.closest("#gallery-modal")
            ? 34
            : 22;
  element.innerHTML = icon(element.dataset.icon, size);
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
document.querySelector("#photo-count").textContent = `${PHOTOS.length} fotos`;
document.querySelector("#gallery-description").textContent =
  `${PHOTOS.filter((photo) => photo.album === "quartos").length} fotografias — veja os quartos, a piscina, o café da manhã e os outros ambientes da pousada.`;
document.querySelectorAll("[data-pousada-address]").forEach((element) => {
  element.textContent = POUSADA.address;
});
document.querySelectorAll("[data-pousada-cep]").forEach((element) => {
  element.textContent = POUSADA.cep;
});
document.querySelector("[data-pousada-checkin]").textContent = POUSADA.checkin;
document.querySelector("[data-pousada-checkout]").textContent = POUSADA.checkout;
const coordinates = `${POUSADA.coords.lat},${POUSADA.coords.lng}`;
document.querySelector("#map-direction").href =
  `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
document.querySelector("#map-place").href = POUSADA.mapsUrl;
document.querySelector("#map-embed").src =
  `https://maps.google.com/maps?q=${coordinates}&z=16&output=embed`;

const staysList = document.querySelector("#stays-list");
staysList.innerHTML = STAYS.map(
  (stay, index) => `
    <div class="reveal" style="transition-delay: ${index * 70}ms">
      <article class="flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-card shadow-soft">
        <img src="${stay.photo.src}" alt="${stay.photo.alt}" width="${stay.photo.w}" height="${stay.photo.h}" loading="lazy" decoding="async" class="h-56 w-full object-cover" />
        <div class="flex flex-1 flex-col p-6">
          <h3 class="font-serif text-2xl text-ink">${stay.name}</h3>
          <p class="mt-2 text-sm leading-relaxed text-moss">${stay.text}</p>
          <ul class="mt-4 flex flex-wrap gap-2">${stay.points
            .map((point) => `<li class="rounded-full bg-linen px-3 py-1 text-xs font-medium text-moss">${point}</li>`)
            .join("")}</ul>
          <a href="#reservas" class="mt-6 inline-flex text-sm font-semibold text-clay hover:text-claydark">Pedir esta estadia</a>
        </div>
      </article>
    </div>`,
).join("");

const staySelect = document.querySelector("#guest-stay");
staySelect.innerHTML =
  STAYS.map((stay) => `<option>${stay.id}</option>`).join("") +
  '<option>Ainda não sei — quero uma sugestão</option>';

const whatsappInfo = buildWhatsAppUrl(
  "Olá! Vim pelo site da Pousada Recanto da Paz e gostaria de mais informações.",
);
const whatsappReserve = buildWhatsAppUrl(
  "Olá! Vim pelo site da Pousada Recanto da Paz e gostaria de fazer uma reserva.",
);
document.querySelector('[data-whatsapp="info"]').href = whatsappInfo;
document.querySelector('[data-whatsapp="reserve"]').href = whatsappReserve;

const siteHeader = document.querySelector("#site-header");
const brandName = document.querySelector("#brand-name");
const mobileMenu = document.querySelector("#mobile-nav");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
let menuOpen = false;

function updateHeader() {
  const scrolled = window.scrollY > 24;
  siteHeader.classList.toggle("border-b", scrolled || menuOpen);
  siteHeader.classList.toggle("border-hairline", scrolled || menuOpen);
  siteHeader.classList.toggle("bg-sand/92", scrolled || menuOpen);
  siteHeader.classList.toggle("backdrop-blur-md", scrolled || menuOpen);
  brandName.classList.toggle("text-ink", scrolled || menuOpen);
  brandName.classList.toggle("text-sand", !scrolled && !menuOpen);
  navLinks.forEach((link) => {
    link.classList.toggle("text-moss", scrolled);
    link.classList.toggle("text-sand/90", !scrolled);
  });
  menuToggle.classList.toggle("text-ink", scrolled || menuOpen);
  menuToggle.classList.toggle("text-sand", !scrolled && !menuOpen);
}

window.addEventListener("scroll", updateHeader, { passive: true });
menuToggle.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("hidden", !menuOpen);
  mobileMenu.classList.toggle("flex", menuOpen);
  menuToggle.setAttribute("aria-expanded", String(menuOpen));
  menuToggle.setAttribute("aria-label", menuOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.querySelector("svg").outerHTML = icon(menuOpen ? "close" : "menu", 24);
  updateHeader();
});
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.querySelector("svg").outerHTML = icon("menu", 24);
    updateHeader();
  });
});
updateHeader();

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-on");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("reveal-on"));
}

const albumFilters = document.querySelector("#album-filters");
const galleryDescription = document.querySelector("#gallery-description");
const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryPosition = document.querySelector("#gallery-position");
const galleryThumbnails = document.querySelector("#gallery-thumbnails");
const galleryModal = document.querySelector("#gallery-modal");
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");
const carousel = document.querySelector("#gallery-carousel");
let activeAlbum = "quartos";
let activeIndex = 0;
let modalOpen = false;
let carouselPaused = false;
let dragStart = null;
let suppressClick = false;
let carouselTimer;

function filteredPhotos() {
  return activeAlbum === "todas"
    ? PHOTOS
    : PHOTOS.filter((photo) => photo.album === activeAlbum);
}

function updateCarousel() {
  const photos = filteredPhotos();
  const current = photos[activeIndex] ?? photos[0];
  if (!current) return;
  galleryImage.src = current.src;
  galleryImage.alt = current.alt;
  galleryImage.width = current.w;
  galleryImage.height = current.h;
  document.querySelector("#gallery-open").setAttribute("aria-label", `Ampliar: ${current.alt}`);
  galleryCaption.textContent = current.alt;
  galleryPosition.textContent = `${activeIndex + 1} / ${photos.length}`;
  galleryDescription.textContent =
    `${photos.length} ${photos.length === 1 ? "fotografia" : "fotografias"} — veja os quartos, a piscina, o café da manhã e os outros ambientes da pousada.`;
  galleryThumbnails.innerHTML = photos
    .map(
      (photo, index) => `
        <button type="button" data-photo-index="${index}" aria-label="${photo.alt}" aria-current="${index === activeIndex}" class="h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-linen ${index === activeIndex ? "ring-clay" : "ring-transparent"}">
          <img src="${photo.src}" alt="" loading="lazy" class="h-full w-full object-cover" />
        </button>`,
    )
    .join("");
  galleryThumbnails.querySelectorAll("[data-photo-index]").forEach((button) => {
    button.addEventListener("click", () => {
      activeIndex = Number(button.dataset.photoIndex);
      updateCarousel();
    });
  });
  if (modalOpen) updateModal(current, photos.length);
}

function renderFilters() {
  albumFilters.innerHTML = ALBUMS.map(
    (album) => `
      <button type="button" data-album="${album.id}" aria-pressed="${activeAlbum === album.id}" class="shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeAlbum === album.id ? "bg-pine text-sand" : "bg-card text-moss hover:text-ink"}">
        ${album.label}
      </button>`,
  ).join("");
  albumFilters.querySelectorAll("[data-album]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAlbum = button.dataset.album;
      activeIndex = 0;
      closeModal();
      renderFilters();
      updateCarousel();
    });
  });
}

function stepPhoto(step) {
  const photos = filteredPhotos();
  activeIndex = (activeIndex + step + photos.length) % photos.length;
  updateCarousel();
}

function updateModal(current, total) {
  modalImage.src = current.src;
  modalImage.alt = current.alt;
  modalCaption.textContent = `${current.alt} — ${activeIndex + 1}/${total}`;
}

function openModal() {
  const photos = filteredPhotos();
  const current = photos[activeIndex];
  if (!current) return;
  modalOpen = true;
  updateModal(current, photos.length);
  galleryModal.classList.remove("hidden");
  galleryModal.classList.add("flex");
  document.body.style.overflow = "hidden";
  resetCarouselTimer();
}

function closeModal() {
  modalOpen = false;
  galleryModal.classList.add("hidden");
  galleryModal.classList.remove("flex");
  document.body.style.overflow = "";
  resetCarouselTimer();
}

function resetCarouselTimer() {
  window.clearInterval(carouselTimer);
  if (
    carouselPaused ||
    modalOpen ||
    filteredPhotos().length < 2 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }
  carouselTimer = window.setInterval(() => stepPhoto(1), 5500);
}

renderFilters();
updateCarousel();
resetCarouselTimer();
carousel.addEventListener("mouseenter", () => {
  carouselPaused = true;
  resetCarouselTimer();
});
carousel.addEventListener("mouseleave", () => {
  carouselPaused = false;
  resetCarouselTimer();
});
carousel.addEventListener("focusin", () => {
  carouselPaused = true;
  resetCarouselTimer();
});
carousel.addEventListener("focusout", () => {
  carouselPaused = false;
  resetCarouselTimer();
});
document.querySelectorAll("[data-gallery-step]").forEach((button) => {
  button.addEventListener("click", () => stepPhoto(Number(button.dataset.galleryStep)));
});
document.querySelector("#gallery-open").addEventListener("click", () => {
  if (suppressClick) {
    suppressClick = false;
    return;
  }
  openModal();
});
document.querySelector("#gallery-stage").addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  dragStart = event.clientX;
});
document.querySelector("#gallery-stage").addEventListener("pointerup", (event) => {
  if (dragStart === null) return;
  const delta = event.clientX - dragStart;
  dragStart = null;
  if (Math.abs(delta) > 48) {
    suppressClick = true;
    stepPhoto(delta > 0 ? -1 : 1);
  }
});
document.querySelector("#gallery-stage").addEventListener("pointercancel", () => {
  dragStart = null;
});
document.querySelector("#modal-close").addEventListener("click", closeModal);
galleryModal.addEventListener("click", (event) => {
  if (event.target === galleryModal) closeModal();
});
document.querySelector("#modal-figure").addEventListener("click", (event) => event.stopPropagation());
document.querySelectorAll("[data-modal-step]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    stepPhoto(Number(button.dataset.modalStep));
  });
});
window.addEventListener("keydown", (event) => {
  if (!modalOpen) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowRight") stepPhoto(1);
  if (event.key === "ArrowLeft") stepPhoto(-1);
});

const reservationForm = document.querySelector("#reservation-form");
const toast = document.querySelector("#reservation-toast");
let toastTimer;

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(reservationForm);
  const values = Object.fromEntries(form.entries());
  const errors = {};
  if (values.name.trim().length < 3) errors.name = "Informe seu nome completo.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = "DDD + número, ex: (19) 99999-9999.";
  }
  if (!values.checkin) errors.checkin = "Escolha o check-in.";
  if (!values.checkout) errors.checkout = "Escolha o check-out.";
  if (values.checkin && values.checkout && values.checkout <= values.checkin) {
    errors.checkout = "O check-out precisa ser depois do check-in.";
  }
  document.querySelectorAll("[data-error]").forEach((element) => {
    element.textContent = errors[element.dataset.error] ?? "";
  });
  if (Object.keys(errors).length) return;

  const message = [
    "Olá! Gostaria de reservar na Pousada Recanto da Paz.",
    "",
    `• Nome: ${values.name.trim()}`,
    `• Telefone: ${values.phone.trim()}`,
    `• Estadia: ${values.stay}`,
    `• Check-in: ${formatDate(values.checkin)}`,
    `• Check-out: ${formatDate(values.checkout)}`,
    `• Hóspedes: ${values.guests}`,
    values.notes.trim() ? `• Observações: ${values.notes.trim()}` : "",
    "",
    "Enviado pelo site da pousada.",
  ]
    .filter(Boolean)
    .join("\n");
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  reservationForm.reset();
  document.querySelector("#reservation-fallback").classList.remove("hidden");
  toast.classList.remove("hidden");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.add("hidden"), 4500);
});
