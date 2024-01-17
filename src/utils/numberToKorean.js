export default function numberToKorean(number) {
  const words = ['천', '만', '억'];
  const limits = [1000, 10000, 100000000];
  let word = '';
  let limit = 1;

  for (let i = 0; i < limits.length; i++) {
    if (number >= limits[i]) {
      limit = limits[i];
      word = words[i];
    }
  }

  const num = Math.floor((number / limit) * 10) / 10;
  return `${num.toFixed(1).replace(/\.0$/, '')}${word}`;
}
