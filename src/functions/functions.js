import states from '../states';

const encryptSimpleTransposition = async (text, key) => {
  let result = '';
  try {
    //write code here
    return result;
  } catch (err) {
    console.log('encryptSimpleTransposition -> err', err);
    return 'Encrypted SIMPLE TRANSPOSITION';
  }
};

const decryptSimpleTransposition = async (text, key) => {
  let result = '';
  try {
    //write code here
    return result;
  } catch (err) {
    console.log('decryptSimpleTransposition -> err', err);
    return 'Decrypted SIMPLE TRANSPOSITION';
  }
};

const encryptColumnarTranspositionWithKey = async (text, key) => {
  let result = '';
  try {
    //write code here
    return result;
  } catch (err) {
    console.log('encryptColumnarTranspositionWithKey -> err', err);
    return 'Encrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const decryptColumnarTranspositionWithKey = async (text, key) => {
  let result = '';

  try {
    //write code here
    return result;
  } catch (err) {
    console.log('decryptColumnarTranspositionWithKey -> err', err);
    return 'Decrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const encryptColumnarTranspositionWithBlockSize = async (text, blockSize) => {
  let result = '';

  try {
    //write code here
    return result;
  } catch (err) {
    console.log('encryptColumnarTranspositionWithBlockSize -> err', err);
    return 'Encrypted COLUMNAR TRANSPOSITION WITH BLOCK SIZE';
  }
};

const decryptColumnarTranspositionWithBlockSize = (text, blockSize) => {
  let result = '';

  try {
    //write code here
    return result;
  } catch (err) {
    console.log('decryptColumnarTranspositionWithBlockSize -> err', err);
    return 'Decrypted COLUMNAR TRANSPOSITION WITH BLOCK SIZE';
  }
};

const compute = () => {
  // value can be simpleTransposition, columnarTranspositionWithKey, columnarTranspositionWithBlockSize
  const selectedCipherType = states.cipherType.get().value;

  // value can be encrypt or decrypt
  const selectedCipherMode = states.cipherMode.get().value;

  const key = states.key.get();

  const blockSize = states.blockSize.get();

  const text = states.text.get();

  switch (selectedCipherType) {
    case 'simpleTransposition':
      if (selectedCipherMode === 'encrypt') {
        states.result.set(encryptSimpleTransposition(text, key));
      } else {
        states.result.set(decryptSimpleTransposition(text, key));
      }
      break;
    case 'columnarTranspositionWithKey':
      if (selectedCipherMode === 'encrypt') {
        states.result.set(encryptColumnarTranspositionWithKey(text, key));
      } else {
        states.result.set(decryptColumnarTranspositionWithKey(text, key));
      }
      break;
    case 'columnarTranspositionWithBlockSize':
      if (selectedCipherMode === 'encrypt') {
        states.result.set(
          encryptColumnarTranspositionWithBlockSize(text, blockSize)
        );
      } else {
        states.result.set(
          decryptColumnarTranspositionWithBlockSize(text, blockSize)
        );
      }
      break;
    default:
      break;
  }
};

export const functions = {
  compute,
};

export default functions;
