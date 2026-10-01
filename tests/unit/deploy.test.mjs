import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

const script = new URL('../../scripts/deploy.sh', import.meta.url).pathname

function run(env) {
  const result = spawnSync('bash', [script], { env: { PATH: process.env.PATH, ...env }, encoding: 'utf8' })
  return { status: result.status, stderr: result.stderr }
}

const valid = {
  DEPLOY_SSH_KEY: 'dummy',
  DEPLOY_KNOWN_HOSTS: 'dummy',
  DEPLOY_TARGET: 'user@host.example:/srv/site/',
}

test('ohne Zugangsdaten bricht das Deployment ab', () => {
  const { status, stderr } = run({})
  assert.notEqual(status, 0)
  assert.match(stderr, /DEPLOY_SSH_KEY/)
})

test('ein Ziel ohne absoluten Pfad mit abschließendem Schrägstrich wird abgelehnt', () => {
  for (const target of ['user@host.example:/srv/site', 'user@host.example:site/', 'host.example']) {
    const { status, stderr } = run({ ...valid, DEPLOY_TARGET: target })
    assert.notEqual(status, 0, target)
    assert.match(stderr, /DEPLOY_TARGET/, target)
  }
})
