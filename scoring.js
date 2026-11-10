const TYPES = {
  A: '暴走赤レンジャーお兄さん',
  B: '人たらし女帝お姉さん',
  C: '破天荒次男',
  D: '愛され他力本願末っ子',
};

export function diagnose(answers) {
  if (!Array.isArray(answers) || answers.length !== 6) {
    throw new Error('A diagnosis needs exactly 6 answers');
  }
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((answer) => {
    if (!Object.hasOwn(counts, answer)) throw new Error('Answers must be A, B, C, or D');
    counts[answer] += 1;
  });
  const max = Math.max(...Object.values(counts));
  const tiedKeys = Object.keys(counts).filter((key) => counts[key] === max);
  const key = answers.find((answer) => tiedKeys.includes(answer));
  return { key, type: TYPES[key], counts, tiedKeys };
}

export function shuffleAnswers(choices, random = Math.random) {
  const shuffled = [...choices];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function labelSequentially(choices) {
  return choices.map(([answerKey, text], index) => [
    String.fromCharCode(65 + index),
    answerKey,
    text,
  ]);
}

export { TYPES };
