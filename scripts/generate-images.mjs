// Erzeugt public/apple-touch-icon.png und public/og-image.png aus den
// Logo-SVGs und dem Porträt. Nach Änderungen am Logo oder Porträt:
// `npm run images` ausführen und beide PNGs committen.
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = new URL('../', import.meta.url)
const path = (relative) => fileURLToPath(new URL(relative, root))

const GRAPHITE = '#26292C'
const PAPER = '#F3F2EE'

const icon = await readFile(path('brand/appconcept-icon.svg'))
const inverseIcon = await readFile(path('brand/appconcept-icon-inverse.svg'))

const touchIcon = await sharp(icon, { density: 300 }).resize(132, 132).png().toBuffer()
await sharp({ create: { width: 180, height: 180, channels: 4, background: PAPER } })
  .composite([{ input: touchIcon, top: 24, left: 24 }])
  .png()
  .toFile(path('public/apple-touch-icon.png'))

const ogIcon = await sharp(inverseIcon, { density: 300 }).resize(240, 240).png().toBuffer()
const ogPortrait = await sharp(path('src/assets/portrait.jpg'))
  .resize(460, 630, { fit: 'cover', position: 'top' })
  .toBuffer()
await sharp({ create: { width: 1200, height: 630, channels: 4, background: GRAPHITE } })
  .composite([
    { input: ogIcon, top: 195, left: 170 },
    { input: ogPortrait, top: 0, left: 740 },
  ])
  .png()
  .toFile(path('public/og-image.png'))

console.log('apple-touch-icon.png und og-image.png erzeugt')
