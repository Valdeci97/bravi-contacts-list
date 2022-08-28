function countBracket(arr, leftComparator, rightComparator) {
  let right = 0;
  let left = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === leftComparator) {
      left += 1;
    }
    if (arr[i] === rightComparator) {
      right += 1;
    }
  }
  const isValid = right - left === 0;
  return isValid;
}

function isBalanced(exp) {
  const filter = [
    countBracket(exp, '(', ')'),
    countBracket(exp, '[', ']'),
    countBracket(exp, '{', '}'),
  ];
  const isValid = filter.every((element) => element);
  return isValid ? 'É válido' : 'Não é válido';
}

module.exports = isBalanced;

