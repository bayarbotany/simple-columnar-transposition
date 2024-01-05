import { hookstate } from '@hookstate/core';

// cipherMode is 
const cipherMode = hookstate({
  value: 'encrypt',
  label: 'Encrypt',
  options: [
    { value: 'encrypt', label: 'Encrypt' },
    { value: 'decrypt', label: 'Decrypt' },
  ],
});
const cipherType = hookstate({
  value: 'simpleTransposition',
  label: 'Simple Transposition',
  options: [
    { value: 'simpleTransposition', label: 'Simple Transposition' },
    {
      value: 'columnarTranspositionWithKey',
      label: 'Columnar Transposition With Key',
    },
    {
      value: 'columnarTranspositionWithBlockSize',
      label: 'Columnar Transposition With Block Size',
    },
  ],
});

const key = hookstate('');

const blockSize = hookstate('');

const text = hookstate('');

const result = hookstate('');

const loading = hookstate(false);

const error = hookstate('');

export const states = {
  cipherMode,
  cipherType,
  key,
  blockSize,
  text,
  result,
  loading,
  error,
};

export default states;
