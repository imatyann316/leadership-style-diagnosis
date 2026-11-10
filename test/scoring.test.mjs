import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnose, labelSequentially, shuffleAnswers } from '../scoring.js';

test('returns 暴走赤レンジャーお兄さん when A is the most selected answer', () => {
  const result = diagnose(['A', 'A', 'B', 'C', 'D', 'A']);
  assert.equal(result.key, 'A');
  assert.equal(result.type, '暴走赤レンジャーお兄さん');
  assert.deepEqual(result.counts, { A: 3, B: 1, C: 1, D: 1 });
});

test('returns 人たらし女帝お姉さん when B is the most selected answer', () => {
  const result = diagnose(['B', 'B', 'A', 'C', 'D', 'B']);
  assert.equal(result.key, 'B');
  assert.equal(result.type, '人たらし女帝お姉さん');
});

test('returns 破天荒次男 when C is the most selected answer', () => {
  const result = diagnose(['C', 'C', 'A', 'B', 'D', 'C']);
  assert.equal(result.key, 'C');
  assert.equal(result.type, '破天荒次男');
});

test('returns 愛され他力本願末っ子 when D is the most selected answer', () => {
  const result = diagnose(['D', 'D', 'A', 'B', 'C', 'D']);
  assert.equal(result.key, 'D');
  assert.equal(result.type, '愛され他力本願末っ子');
});

test('uses the first answer among tied top types as the primary result and reports the tie', () => {
  const result = diagnose(['C', 'A', 'A', 'C', 'B', 'D']);
  assert.equal(result.key, 'C');
  assert.deepEqual(result.tiedKeys, ['A', 'C']);
});

test('rejects an incomplete diagnosis', () => {
  assert.throws(() => diagnose(['A', 'B']), /6 answers/);
});

test('labels shuffled choices sequentially while retaining original answer keys', () => {
  const shuffled = [['C', 'c text'], ['A', 'a text'], ['D', 'd text'], ['B', 'b text']];
  assert.deepEqual(labelSequentially(shuffled), [
    ['A', 'C', 'c text'],
    ['B', 'A', 'a text'],
    ['C', 'D', 'd text'],
    ['D', 'B', 'b text'],
  ]);
});
test('shuffles display order without changing the answer choices', () => {
  const choices = [['A', 'a'], ['B', 'b'], ['C', 'c'], ['D', 'd']];
  const values = [0, 0, 0];
  const shuffled = shuffleAnswers(choices, () => values.shift());
  assert.deepEqual(shuffled.map(([key]) => key), ['B', 'C', 'D', 'A']);
  assert.deepEqual([...shuffled].map(([key]) => key).sort(), ['A', 'B', 'C', 'D']);
});
