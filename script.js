const gallery = [
  { src: 'public/images/product-open.png', alt: 'Open cognac travel jewelry organizer filled with gold jewelry', caption: 'Open organizer / product view' },
  { src: 'public/images/product-closed.png', alt: 'Closed cognac travel jewelry case with gold zipper', caption: 'Closed case / ready to carry' },
  { src: 'public/images/product-detail.png', alt: 'Close detail of gold jewelry inside the organizer', caption: 'Interior detail / every piece has a place' },
  { src: 'public/images/travel-suitcase.png', alt: 'Open jewelry organizer packed in a cream suitcase', caption: 'Travel use / packed for the journey' },
  { src: 'public/images/human-selection.png', alt: 'Hands selecting a necklace from the open jewelry organizer', caption: 'In use / a softer daily ritual' },
  { src: 'public/images/final-editorial.png', alt: 'Closed jewelry organizer styled on cream linen', caption: 'Editorial view / wherever you go next' },
  { src: 'public/images/product-studio.png', alt: 'Open jewelry organizer styled on a cream pedestal', caption: 'Studio view / considered storage' },
];

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const stageImage = document.querySelector('.gallery-image');
const galleryCount = document.querySelector('.gallery-count');
const thumbs = [...document.querySelectorAll('.thumb')];
const dialog = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxCount = document.querySelector('.lightbox-count');
let activeIndex = 0;
let lastFocusedElement = null;

window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 8), { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Open navigation' : 'Close navigation';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  menuToggle.querySelector('.sr-only').textContent = 'Open navigation';
}));

function setGallery(index) {
  activeIndex = (index + gallery.length) % gallery.length;
  const item = gallery[activeIndex];
  stageImage.src = item.src;
  stageImage.alt = item.alt;
  galleryCount.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
  thumbs.forEach((thumb, thumbIndex) => thumb.classList.toggle('is-selected', thumbIndex === activeIndex));
}

function renderLightbox(index) {
  activeIndex = (index + gallery.length) % gallery.length;
  const item = gallery[activeIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
  lightboxCount.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
}

function openLightbox(index, trigger) {
  lastFocusedElement = trigger;
  renderLightbox(index);
  dialog.showModal();
  document.querySelector('.lightbox-close').focus();
}

document.querySelectorAll('[data-gallery-index]').forEach((control) => control.addEventListener('click', () => {
  const index = Number(control.dataset.galleryIndex);
  if (control.classList.contains('thumb') || control.classList.contains('gallery-arrow')) setGallery(index);
  if (control.classList.contains('image-button')) openLightbox(index, control);
}));

document.querySelector('.gallery-prev').addEventListener('click', () => setGallery(activeIndex - 1));
document.querySelector('.gallery-next').addEventListener('click', () => setGallery(activeIndex + 1));
document.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
document.querySelector('.prev').addEventListener('click', () => renderLightbox(activeIndex - 1));
document.querySelector('.next').addEventListener('click', () => renderLightbox(activeIndex + 1));

dialog.addEventListener('close', () => {
  lightboxImage.src = '';
  if (lastFocusedElement) lastFocusedElement.focus();
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener('keydown', (event) => {
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') renderLightbox(activeIndex - 1);
  if (event.key === 'ArrowRight') renderLightbox(activeIndex + 1);
});
