// Progressive enhancement: the complete page remains readable without JavaScript.
const navigation = document.querySelector('.site-nav');
const toggle = document.querySelector('.menu-toggle');
const links = [...document.querySelectorAll('.nav-links a')];

function closeMenu() {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menu';
}

if (navigation && toggle) {
  navigation.classList.add('is-enhanced');
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Close menu' : 'Menu';
  });
  links.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);
}

// Use one animation-frame callback so scrolling does not trigger repeated layout work.
const sections = links.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;
function updateCurrentSection() {
  scheduled = false;
  let current = null;
  for (const section of sections) {
    if (section && section.getBoundingClientRect().top <= 150) current = section.id;
  }
  for (const link of links) {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateCurrentSection);
  }
}, { passive: true });
updateCurrentSection();
