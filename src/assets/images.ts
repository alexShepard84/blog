import type { ImageMetadata } from 'astro'
import type { ProjectId } from '../data/site.ts'
import botane from './projects/botane-hero.jpg'
import charging from './projects/charging-emobility.jpg'
import crew from './projects/crew-aviation.jpg'
import mobistro from './projects/mobistro-dashboard.png'
import rtlplus from './projects/rtlplus-streaming.jpg'

// Projekte ohne Eintrag zeigen eine dekorative Fläche (ProjectMedia).
export const projectImages: Partial<Record<ProjectId, ImageMetadata>> = {
  mobistro,
  crew,
  botane,
  rtlplus,
  charging,
}
