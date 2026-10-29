// Run with: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOTS, clamp01, smoothstep, hostOf, dotRanks } from './story-math.js';

test('dotRanks is a permutation — every dot lights exactly once', () => {
  const rank = dotRanks();
  assert.equal(rank.length, DOTS);
  assert.deepEqual([...rank].sort((a, b) => a - b), Array.from({ length: DOTS }, (_, i) => i));
});

test('dotRanks is deterministic and actually shuffled', () => {
  const a = dotRanks();
  assert.deepEqual(a, dotRanks());
  assert.notDeepEqual(a, Array.from({ length: DOTS }, (_, i) => i));
});

test('clamp01 pins the scroll progress to 0..1', () => {
  assert.equal(clamp01(-3), 0);
  assert.equal(clamp01(0.42), 0.42);
  assert.equal(clamp01(7), 1);
});

test('smoothstep eases without overshooting the ends', () => {
  assert.equal(smoothstep(0), 0);
  assert.equal(smoothstep(1), 1);
  assert.equal(smoothstep(0.5), 0.5);
  assert.ok(smoothstep(0.25) < 0.25); // slow start
});

test('hostOf strips the scheme and trailing slash, and names local apps', () => {
  assert.equal(hostOf('https://almaanac.vercel.app/'), 'almaanac.vercel.app');
  assert.equal(hostOf('http://example.com/path'), 'example.com/path');
  assert.equal(hostOf(undefined), 'local application');
});
