import type { ImageMetadata } from 'astro'
import type { ProjectId } from '../data/site.ts'
import mobistro from './projects/mobistro-dashboard.png'

// Projekte ohne Eintrag zeigen eine dekorative Fläche (ProjectMedia).
export const projectImages: Partial<Record<ProjectId, ImageMetadata>> = {
  mobistro,
}
