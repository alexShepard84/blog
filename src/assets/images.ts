import type { ImageMetadata } from 'astro'
import type { ProjectId } from '../data/site.ts'
import charging from './projects/charging-emobility.jpg'
import crew from './projects/crew-aviation.jpg'
import mobistro from './projects/mobistro-dashboard.png'

// Projekte ohne Eintrag zeigen eine dekorative Fläche (ProjectMedia).
export const projectImages: Partial<Record<ProjectId, ImageMetadata>> = {
  mobistro,
  crew,
  charging,
}
