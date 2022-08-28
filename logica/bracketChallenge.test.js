const assert = require('assert');

const isBalanced = require('./bracketChallenge');

const firstCase = '()()()';
const secondCase = '[{()}](){}';
const thirdCase = '[]{()';
const fourthCase = '[{)]';
const fifthCase = '[][][]{{})()([]';
const sixthCase = '{[()]()}';

const validMessage = 'É válido'
const invalidMessage = 'Não é válido'

const firstTest = isBalanced(firstCase);
const secondTest = isBalanced(secondCase);
const thirdTest = isBalanced(thirdCase);
const fourthTest = isBalanced(fourthCase);
const fifthTest = isBalanced(fifthCase);
const sixthTest = isBalanced(sixthCase);

assert.strictEqual(firstTest, validMessage, new TypeError('Não é igual'));
assert.strictEqual(secondTest, validMessage, new TypeError('Não é igual'));
assert.strictEqual(thirdTest, invalidMessage, new TypeError('Não é igual'));
assert.strictEqual(fourthTest, invalidMessage, new TypeError('Não é igual'));
assert.strictEqual(fifthTest, invalidMessage, new TypeError('Não é igual'));
assert.strictEqual(sixthTest, validMessage, new TypeError('Não é igual'));