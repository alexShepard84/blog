import { readFile, readdir } from 'node:fs/promises'
import { JSDOM } from 'jsdom'

export const distRoot = new URL('../../dist/', import.meta.url)

export function distFile(path) {
  return new URL(path.replace(/^\//, ''), distRoot)
}

export async function readDist(path) {
  return readFile(distFile(path), 'utf8')
}

export async function documentFor(path = 'index.html') {
  return new JSDOM(await readDist(path)).window.document
}

export async function htmlFiles(dir = distRoot, prefix = '') {
  const files = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`
    if (entry.isDirectory()) {
      files.push(...(await htmlFiles(new URL(`${entry.name}/`, dir), `${relative}/`)))
    } else if (entry.name.endsWith('.html')) {
      files.push(relative)
    }
  }
  return files
}

export function text(node) {
  return (node?.textContent ?? '').replace(/\s+/g, ' ').trim()
}

export async function pngSize(path) {
  const buffer = await readFile(distFile(path))
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
}
