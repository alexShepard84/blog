import test from 'node:test'
import assert from 'node:assert/strict'
import { documentFor } from '../helpers/dist.mjs'

for (const id of ['mobistro', 'crew', 'botane', 'charging']) {
  test(`${id} zeigt ein Bild mit Alt-Text`, async () => {
    const doc = await documentFor('index.html')
    const img = doc.querySelector(`article[data-project="${id}"] img`)
    assert.ok(img, `${id}: kein Bild`)
    assert.ok((img.getAttribute('alt') ?? '').length > 0)
  })
}
