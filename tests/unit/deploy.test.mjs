import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

const script = new URL('../../scripts/deploy.sh', import.meta.url).pathname

function run(env) {
  const result = spawnSync('bash', [script], { env: { PATH: process.env.PATH, ...env }, encoding: 'utf8' })
  return { status: result.status, stderr: result.stderr }
}

const valid = {
  DEPLOY_FTP_HOST: 'web.example',
  DEPLOY_FTP_USER: 'user',
  DEPLOY_FTP_PASSWORD: 'dummy',
  DEPLOY_FTP_DIR: '/srv/site/',
}

test('ohne Zugangsdaten bricht das Deployment ab', () => {
  for (const name of Object.keys(valid)) {
    const { status, stderr } = run({ ...valid, [name]: '' })
    assert.notEqual(status, 0, name)
    assert.match(stderr, new RegExp(name), name)
  }
})

test('ein Zielordner ohne absoluten Pfad mit abschließendem Schrägstrich wird abgelehnt', () => {
  for (const dir of ['/srv/site', 'srv/site/', '']) {
    const { status, stderr } = run({ ...valid, DEPLOY_FTP_DIR: dir })
    assert.notEqual(status, 0, dir)
    assert.match(stderr, /DEPLOY_FTP_DIR/, dir)
  }
})

test('das Passwort erscheint nie in der Ausgabe', () => {
  const { stderr } = run({ ...valid, DEPLOY_FTP_PASSWORD: 'geheim-123', DEPLOY_FTP_DIR: 'kaputt' })
  assert.equal(stderr.includes('geheim-123'), false)
})
