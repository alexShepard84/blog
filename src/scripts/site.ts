// Inhalte bleiben immer sichtbar. Nur die Verbindung des Arbeitsablaufs
// wird beim ersten Eintritt animiert; ohne JS ist der Ablauf vollständig da.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
const motionTargets = document.querySelectorAll<HTMLElement>('[data-motion-once]')

if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || motionPreference.matches) continue
        const target = entry.target as HTMLElement
        target.dataset.motion = 'played'
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.15 },
  )
  motionTargets.forEach((target) => observer.observe(target))
  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches) return
    observer.disconnect()
    motionTargets.forEach((target) => delete target.dataset.motion)
  })
}

const mobileMenu = document.querySelector<HTMLDetailsElement>('header details')
if (mobileMenu) {
  for (const link of mobileMenu.querySelectorAll('a')) {
    link.addEventListener('click', () => { mobileMenu.open = false })
  }
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !mobileMenu.open) return
    mobileMenu.open = false
    mobileMenu.querySelector('summary')?.focus()
  })
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !mobileMenu.contains(event.target)) mobileMenu.open = false
  })
}
