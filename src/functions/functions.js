import states from '../states';

const encryptSimpleTransposition = async (plainText, keyword) => {
  //Rona

  plainText = plainText.toUpperCase();
  keyword = keyword.toUpperCase();

  try {
    const hasRepeatingCharacters = (str) => new Set(str).size !== str.length;
    if (hasRepeatingCharacters(keyword)) {
      return 'Keyword should not contain repeated characters.';
    }
    if (plainText.length !== keyword.length) {
      return 'Length of the plain text should be equal to the length of the keyword.';
    }

    const transpositionKey = keyword
      .split('')
      .sort()
      .map((char) => keyword.indexOf(char));
    let encryptedText = '';
    for (let i = 0; i < plainText.length; i += keyword.length) {
      for (let j = 0; j < keyword.length; j++) {
        const index = i + transpositionKey[j];
        if (index < plainText.length) {
          encryptedText += plainText[index];
        }
      }
    }
    return encryptedText;
  } catch (err) {
    console.log('encryptSimpleTransposition -> err', err);
    return 'Encrypted SIMPLE TRANSPOSITION';
  }
};

const decryptSimpleTransposition = async (ciphertext, keyword) => {
  try {
    //Huda

    ciphertext = ciphertext.toUpperCase();
    keyword = keyword.toUpperCase();
    let k_indx = 0;
    let msg_indx = 0;
    const msg_len = ciphertext.length;
    const msg_lst = Array.from(ciphertext);
    const col = keyword.length;
    const row = Math.ceil(msg_len / col);
    const key_lst = Array.from(keyword).sort();
    const dec_cipher = [];

    for (let i = 0; i < row; i++) {
      dec_cipher.push(Array(col).fill(null));
    }

    for (let _ = 0; _ < col; _++) {
      const curr_idx = keyword.indexOf(key_lst[k_indx]);

      for (let j = 0; j < row; j++) {
        dec_cipher[j][curr_idx] = msg_lst[msg_indx];
        msg_indx++;
      }
      k_indx++;
    }

    try {
      ciphertext = dec_cipher.flat().join('');
    } catch (err) {
      throw new Error('Error');
    }

    return ciphertext;
  } catch (err) {
    console.log('decryptSimpleTransposition -> err', err);
    return 'Decrypted SIMPLE TRANSPOSITION';
  }
};

const encryptColumnarTranspositionWithKey = async (text, key) => {
  let encryptedText = '';
  try {
    text = text.toUpperCase().trim();
    key = key.toUpperCase().trim();

    //check if special characters exist in key or the text
    if (!/^[A-Z]+$/.test(text + key)) {
      return 'Error!: No special characters accepted for the key or text';
    }

    var keyLen = key.length;
    var txtLen = text.length;
    var noRows = Math.ceil(txtLen / keyLen);

    let textCounter = 0;
    var dynamicArray = [];

    // put the text into an array
    for (var i = 0; i < noRows; i++) {
      dynamicArray[i] = [];
      for (var j = 0; j < keyLen; j++) {
        dynamicArray[i][j] = text[textCounter];
        textCounter++;
      }
    }

    // save the order of the key
    var dict = {};
    for (var k = 0; k < keyLen; k++) {
      dict[key[k]] = k;
    }

    let orderedKey = key.split('').sort().join('');

    // join the encrypted text
    for (let a = 0; a < keyLen; a++) {
      encryptedText += dynamicArray.map((x) => x[dict[orderedKey[a]]]).join('');
    }

    return encryptedText; //result
  } catch (err) {
    console.log('encryptColumnarTranspositionWithKey -> err', err);
    return 'Encrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const decryptColumnarTranspositionWithKey = async (text, key) => {
  let decrypted = '';

  try {
    text = text.toUpperCase().trim();
    key = key.toUpperCase().trim();

    //check if special characters exist in key or the text
    if (!/^[A-Z]+$/.test(text + key)) {
      return 'Error!: No special characters accepted for the key or text';
    }

    var keyLen = key.length;
    var textLen = text.length;
    var noRows = Math.ceil(textLen / keyLen);
    var noCompleteRows = Math.floor(textLen / keyLen);
    var noCompleteColumns = textLen % keyLen;

    //order the key alphabetically
    let orderedKey = key.split('').sort().join('');
    let textArr = text.split('');

    // save the order of the key
    var dict = {};
    for (var k = 0; k < keyLen; k++) {
      dict[orderedKey[k]] = k;
    }
    //console.log(noCompleteColumns)

    //create an array based on no. rows and columns
    var arr = Array(noRows)
      .fill('')
      .map(() => Array(keyLen));

    for (let i = 0; i < keyLen; i++) {
      let originKeyIndex = key.indexOf(orderedKey[i]);
      console.log(originKeyIndex);

      let iterations = 0;
      if (originKeyIndex < noCompleteColumns) {
        iterations = noRows;
      } else {
        iterations = noCompleteRows;
      }

      for (let j = 0; j < noRows && j < iterations; j++) {
        arr[j][key.indexOf(orderedKey[i])] = textArr.splice(0, 1)[0];
      }
    }

    for (let k = 0; k < noRows; k++) {
      decrypted += arr[k].join('');
    }

    return decrypted; //result
  } catch (err) {
    console.log('decryptColumnarTranspositionWithKey -> err', err);
    return 'Decrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const encryptColumnarTranspositionWithBlockSize = (text, blockSize) => {
  let result = '';

  text = text.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase

  // Padding the text if necessary
  while (text.length % blockSize !== 0) {
    text += 'X'; // Padding with 'X'
  }
  const numRows = Math.ceil(text.length / blockSize);

  console.log(`text: ${text}`);
  console.log(`blockSize: ${blockSize}`);
  console.log(`numRows: ${numRows}`);

  // Encryption process
  for (let col = 0; col < blockSize; col++) {
    console.log(`col: ${col}`);

    for (let row = 0; row < numRows; row++) {
      const charIndex = row * blockSize + col;
      if (charIndex < text.length) {
        console.log(`row: ${row}, charIndex: ${charIndex}`);
        result += text[charIndex];
      }
    }
  }

  console.log(`result: ${result}`);
  return result;
};

// Example usage
const encryptedText = encryptColumnarTranspositionWithBlockSize("BAYARDILZARX", 2);
console.log(encryptedText); // Expected output: "BYRAIDAZLXAR"



const decryptColumnarTranspositionWithBlockSize = async (text, blockSize) => {
  let result = '';

  try {
    const rows = Math.ceil(text.length / blockSize);
    for (let i = 0; i < rows; i++) {
      for (let j = i; j < text.length; j += rows) {
        result += text[j];
      }
    }

    // Remove padding
    result = result.replace(/X+$/, '');

    return result;
  } catch (err) {
    console.log('decryptColumnarTranspositionWithBlockSize -> err', err);
    return `Error: ${JSON.stringify(err)}`;
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

  if (!text || !key || !blockSize) {
    return states.result.set('');
  }
  if (
    selectedCipherType === 'columnarTranspositionWithBlockSize' &&
    !blockSize
  ) {
    return states.result.set('');
  }

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
