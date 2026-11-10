import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('presents the enrollment four-type survey framing', () => {
  assert.match(page, /新しい時代の人を巻き込む/);
  assert.match(page, /エンロールメント4タイプサーベイ/);
  assert.match(page, /あなたは、どの巻き込みタイプでしょうか？/);
});

test('includes all four enrollment archetypes and their cautions', () => {
  for (const text of [
    '暴走赤レンジャーお兄さんタイプ',
    '人たらし女帝お姉さんタイプ',
    '破天荒次男タイプ',
    '愛され他力本願末っ子タイプ',
    '振り返ったら誰もいない危険あり（笑）',
    '永遠に出発できない危険あり（笑）',
    '本人だけ次の祭りに行ってる危険あり（笑）',
    'ただの丸投げ社長になる危険あり（笑）',
    '一人で500万円を稼ぐ経営者から、3人で6,000万円を生み出す経営者へ',
  ]) {
    assert.match(page, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('keeps the time estimate horizontal on narrow screens', () => {
  assert.match(page, /\.rule b \{[^}]*white-space:nowrap/);
  assert.match(page, /現在の自分に最も近い答えをお選びください/);
});
test('keeps all four answer keys in every enrollment survey question', () => {
  const questionLines = page.split('\n').filter((line) => line.trim().startsWith("['") && line.includes("[['A'"));
  assert.equal(questionLines.length, 6);
  questionLines.forEach((line) => {
    for (const key of ['A', 'B', 'C', 'D']) assert.match(line, new RegExp(`\\['${key}'`));
  });
});
