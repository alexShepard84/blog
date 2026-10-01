// Abschnitte beim Scrollen dezent einblenden. Ohne JavaScript, bei einem
// Skriptfehler oder bei reduzierter Bewegung bleibt alles sofort sichtbar:
// Ausgeblendet wird nur unter .reveal-ready, und das setzt erst dieses Skript.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  for (const section of document.querySelectorAll<HTMLElement>('main > section:not(#top)')) {
    section.dataset.reveal = ''
    observer.observe(section)
  }
  document.documentElement.classList.add('reveal-ready')
}

// Mobiles Menü nach Klick auf einen Eintrag schließen.
for (const link of document.querySelectorAll<HTMLAnchorElement>('header details a')) {
  link.addEventListener('click', () => link.closest('details')?.removeAttribute('open'))
}
