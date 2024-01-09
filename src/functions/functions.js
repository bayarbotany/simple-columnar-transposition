import states from '../states';

const encryptSimpleTransposition = async (plainText, keyword) => {
  //Rona

  plainText = plainText.toUpperCase();
  keyword = keyword.toUpperCase();

  try {
    states.addInstruction('1. Convert the plain text to uppercase.');
    states.addInstruction('2. Convert the keyword to uppercase.');

    const hasRepeatingCharacters = (str) => new Set(str).size !== str.length;
    states.addInstruction('3. Check if the keyword has repeating characters.');
    if (hasRepeatingCharacters(keyword)) {
      states.addInstruction('4. The keyword has repeating characters.');
      return 'Keyword should not contain repeated characters.';
    }
    states.addInstruction('4. The keyword does not have repeating characters.');

    if (plainText.length !== keyword.length) {
      states.addInstruction(
        '5. The length of the plain text should be equal to the length of the keyword.'
      );
      return 'Length of the plain text should be equal to the length of the keyword.';
    }
    states.addInstruction(
      '5. The length of the plain text is equal to the length of the keyword.'
    );

    states.addInstruction('6. Arrange the keyword in alphabetical order.');
    const transpositionKey = keyword
      .split('')
      .sort()
      .map((char) => keyword.indexOf(char));
    states.addInstruction(`7. The transposition key is ${transpositionKey}.`);

    let encryptedText = '';
    for (let i = 0; i < plainText.length; i += keyword.length) {
      states.addInstruction(
        `8. Get the characters of the plain text at index ${i} to ${
          i + keyword.length - 1
        }.`
      );

      for (let j = 0; j < keyword.length; j++) {
        states.addInstruction(
          `9. Get the character at index ${i + transpositionKey[j]}.`
        );
        const index = i + transpositionKey[j];
        states.addInstruction(
          `10. The character at index ${index} is ${plainText[index]}.`
        );

        if (index < plainText.length) {
          states.addInstruction(
            `11. Append the character at index ${index} to the encrypted text.`
          );
          encryptedText += plainText[index];
        }
      }
    }
    states.addInstruction(`12. The encrypted text is ${encryptedText}.`);

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
    states.addInstruction('1. Convert the ciphertext to uppercase.');
    keyword = keyword.toUpperCase();
    states.addInstruction('2. Convert the keyword to uppercase.');
    let k_indx = 0;
    let msg_indx = 0;
    const msg_len = ciphertext.length;
    const msg_lst = Array.from(ciphertext);
    const col = keyword.length;
    const row = Math.ceil(msg_len / col);
    const key_lst = Array.from(keyword).sort();
    const dec_cipher = [];

    states.addInstruction(
      `3. The length of the ciphertext is ${msg_len} and the length of the keyword is ${col}.`
    );
    states.addInstruction(
      `4. The number of rows is ${row} and the number of columns is ${col}.`
    );

    for (let i = 0; i < row; i++) {
      states.addInstruction(`5. Create an array of ${col} columns.`);
      dec_cipher.push(Array(col).fill(null));
    }

    for (let _ = 0; _ < col; _++) {
      states.addInstruction(
        `6. Get the index of the character ${key_lst[k_indx]} in the keyword.`
      );

      const curr_idx = keyword.indexOf(key_lst[k_indx]);

      for (let j = 0; j < row; j++) {
        states.addInstruction(
          `7. Put the character ${msg_lst[msg_indx]} at index ${curr_idx} of the array.`
        );

        dec_cipher[j][curr_idx] = msg_lst[msg_indx];
        msg_indx++;
      }
      k_indx++;
    }

    try {
      states.addInstruction(
        `8. Join the array of arrays into a single array and then join the characters into a string.`
      );
      ciphertext = dec_cipher.flat().join('');
    } catch (err) {
      throw new Error('Error');
    }
    states.addInstruction(`9. The decrypted text is ${ciphertext}.`);

    return ciphertext;
  } catch (err) {
    console.log('decryptSimpleTransposition -> err', err);
    return 'Decrypted SIMPLE TRANSPOSITION';
  }
};

const encryptColumnarTranspositionWithKey = async (text, key) => {
  let encryptedText = '';
  try {
    text = text.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase
    key = key.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase
    states.addInstruction(`1. Convert the text to uppercase. ${text}`);
    states.addInstruction(`2. Convert the key to uppercase. ${key}`);

    if (key.length < 2) {
      states.addInstruction(`3. The length of the key is less than 2.`);
      return 'Error!: Key should be at least 2 characters';
    }
    states.addInstruction(
      `3. The length of the key is greater than or equal to 2.`
    );

    //key must not have repeating characters
    if (new Set(key).size !== key.length) {
      states.addInstruction(`4. The key has repeating characters.`);
      return 'Error!: Key should not have repeating characters';
    }
    states.addInstruction(`4. The key does not have repeating characters.`);

    if (text.length < key.length) {
      states.addInstruction(
        `5. The length of the text is less than the length of the key.`
      );
      return 'Error!: Text should be at least the length of the key';
    }

    states.addInstruction(
      `5. The length of the text is greater than or equal to the length of the key.`
    );

    var keyLen = key.length;
    var txtLen = text.length;
    var noRows = Math.ceil(txtLen / keyLen);

    let textCounter = 0;
    var dynamicArray = [];

    states.addInstruction(`6. The number of rows is ${noRows}.`);
    states.addInstruction(`7. Create an array of ${noRows} rows.`);
    // put the text into an array
    for (var i = 0; i < noRows; i++) {
      states.addInstruction(`8. Create an array of ${keyLen} columns.`);
      dynamicArray[i] = [];
      for (var j = 0; j < keyLen; j++) {
        states.addInstruction(
          `9. Put the character ${text[textCounter]} at index ${j} of the array.`
        );
        dynamicArray[i][j] = text[textCounter];
        textCounter++;
      }
    }

    states.addInstruction(`10. The array is ${JSON.stringify(dynamicArray)}.`);

    // save the order of the key
    var dict = {};
    for (var k = 0; k < keyLen; k++) {
      states.addInstruction(
        `11. Get the index of the character ${key[k]} in the key.`
      );
      dict[key[k]] = k;
    }
    states.addInstruction(`12. The dictionary is ${JSON.stringify(dict)}.`);
    let orderedKey = key.split('').sort().join('');
    states.addInstruction(`13. The ordered key is ${orderedKey}.`);

    states.addInstruction(
      `14. Join the characters of the array based on the order of the key.`
    );
    // join the encrypted text
    for (let a = 0; a < keyLen; a++) {
      states.addInstruction(
        `15. Get the index of the character ${orderedKey[a]} in the key.`
      );
      encryptedText += dynamicArray.map((x) => x[dict[orderedKey[a]]]).join('');
    }
    states.addInstruction(`16. The encrypted text is ${encryptedText}.`);
    return encryptedText; //result
  } catch (err) {
    console.log('encryptColumnarTranspositionWithKey -> err', err);
    return 'Encrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const decryptColumnarTranspositionWithKey = async (text, key) => {
  let decrypted = '';

  try {
    text = text.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase
    key = key.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase
    states.addInstruction(`1. Convert the text to uppercase. ${text}`);
    states.addInstruction(`2. Convert the key to uppercase. ${key}`);

    //check if special characters exist in key or the text
    if (!/^[A-Z]+$/.test(text + key)) {
      states.addInstruction(`3. The text or the key has special characters.`);
      return 'Error!: No special characters accepted for the key or text';
    }
    states.addInstruction(
      `3. The text and the key do not have special characters.`
    );

    var keyLen = key.length;
    var textLen = text.length;
    var noRows = Math.ceil(textLen / keyLen);
    var noCompleteRows = Math.floor(textLen / keyLen);
    var noCompleteColumns = textLen % keyLen;

    states.addInstruction(`4. The number of rows is ${noRows}.`);
    states.addInstruction(
      `5. The number of complete rows is ${noCompleteRows}.`
    );
    states.addInstruction(
      `6. The number of complete columns is ${noCompleteColumns}.`
    );

    //order the key alphabetically
    let orderedKey = key.split('').sort().join('');
    states.addInstruction(`7. The ordered key is ${orderedKey}.`);
    let textArr = text.split('');
    states.addInstruction(`8. The text array is ${JSON.stringify(textArr)}.`);

    // save the order of the key
    var dict = {};
    for (var k = 0; k < keyLen; k++) {
      states.addInstruction(
        `9. Get the index of the character ${orderedKey[k]} in the key.`
      );
      dict[orderedKey[k]] = k;
    }
    states.addInstruction(`10. The dictionary is ${JSON.stringify(dict)}.`);
    //console.log(noCompleteColumns)

    //create an array based on no. rows and columns
    var arr = Array(noRows)
      .fill('')
      .map(() => Array(keyLen));

    states.addInstruction(`11. Create an array of ${noRows} rows.`);

    for (let i = 0; i < keyLen; i++) {
      states.addInstruction(
        `12. Get the index of the character ${orderedKey[i]} in the key.`
      );
      let originKeyIndex = key.indexOf(orderedKey[i]);
      console.log(originKeyIndex);

      let iterations = 0;
      if (originKeyIndex < noCompleteColumns) {
        states.addInstruction(
          `13. The index of the character ${orderedKey[i]} in the key is less than the number of complete columns.`
        );
        iterations = noRows;
      } else {
        states.addInstruction(
          `13. The index of the character ${orderedKey[i]} in the key is greater than or equal to the number of complete columns.`
        );
        iterations = noCompleteRows;
      }

      states.addInstruction(`14. The number of iterations is ${iterations}.`);
      for (let j = 0; j < noRows && j < iterations; j++) {
        states.addInstruction(
          `15. Put the character ${textArr[0]} at index ${j} of the array.`
        );
        arr[j][key.indexOf(orderedKey[i])] = textArr.splice(0, 1)[0];
      }
    }
    states.addInstruction(`16. The array is ${JSON.stringify(arr)}.`);

    states.addInstruction(`17. Join the characters of the array.`);
    for (let k = 0; k < noRows; k++) {
      decrypted += arr[k].join('');
    }

    states.addInstruction(`18. The decrypted text is ${decrypted}.`);

    return decrypted; //result
  } catch (err) {
    console.log('decryptColumnarTranspositionWithKey -> err', err);
    return 'Decrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const encryptColumnarTranspositionWithBlockSize = (text, blockSize) => {
  let result = '';

  if (blockSize < 2) {
    states.addInstruction(`1. The block size is less than 2.`);
    return 'Error!: Block size should be at least 2';
  }
  states.addInstruction(`1. The block size is greater than or equal to 2.`);

  //if not number
  if (isNaN(blockSize)) {
    states.addInstruction(`2. The block size is not a number.`);
    return 'Error!: Block size should be a number';
  }
  states.addInstruction(`2. The block size is a number.`);

  text = text.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase
  states.addInstruction(`1. Convert the text to uppercase. ${text}`);

  // Padding the text if necessary
  while (text.length % blockSize !== 0) {
    states.addInstruction(
      `2. The length of the text is not divisible by the block size.`
    );
    states.addInstruction(`3. Append the character 'X' to the text.`);
    text += 'X'; // Padding with 'X'
    states.addInstruction(`4. The text is now ${text}.`);
  }
  const numRows = Math.ceil(text.length / blockSize);
  states.addInstruction(`5. The number of rows is ${numRows}.`);

  console.log(`text: ${text}`);
  console.log(`blockSize: ${blockSize}`);
  console.log(`numRows: ${numRows}`);

  // Encryption process
  for (let col = 0; col < blockSize; col++) {
    console.log(`col: ${col}`);
    states.addInstruction(`6. Get the characters at index ${col}.`);
    for (let row = 0; row < numRows; row++) {
      states.addInstruction(
        `7. Get the character at index ${row * blockSize + col}.`
      );

      const charIndex = row * blockSize + col;
      states.addInstruction(
        `8. The character at index ${charIndex} is ${text[charIndex]}.`
      );

      if (charIndex < text.length) {
        states.addInstruction(
          `8. Append the character at index ${charIndex} to the result.`
        );

        console.log(`row: ${row}, charIndex: ${charIndex}`);
        result += text[charIndex];
      }
    }
  }
  states.addInstruction(`9. The encrypted text is ${result}.`);

  console.log(`result: ${result}`);
  return result;
};

const decryptColumnarTranspositionWithBlockSize = async (text, blockSize) => {
  let result = '';

  try {
    if (blockSize < 2) {
      states.addInstruction(`1. The block size is less than 2.`);
      return 'Error!: Block size should be at least 2';
    }

    states.addInstruction(`1. The block size is greater than or equal to 2.`);
    //if not number
    if (isNaN(blockSize)) {
      states.addInstruction(`2. The block size is not a number.`);
      return 'Error!: Block size should be a number';
    }
    states.addInstruction(`2. The block size is a number.`);
    
    text = text.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters and convert to uppercase
    states.addInstruction(`1. Convert the text to uppercase. ${text}`);

    // Padding the text if necessary
    while (text.length % blockSize !== 0) {
      states.addInstruction(
        `2. The length of the text is not divisible by the block size.`
      );
      states.addInstruction(`3. Append the character 'X' to the text.`);
      text += 'X'; // Padding with 'X'
      states.addInstruction(`4. The text is now ${text}.`);
    }


    const rows = Math.ceil(text.length / blockSize);
    states.addInstruction(`1. The number of rows is ${rows}.`);
    for (let i = 0; i < rows; i++) {
      states.addInstruction(`2. Get the characters at index ${i}.`);
      for (let j = i; j < text.length; j += rows) {
        states.addInstruction(`3. Get the character at index ${j}.`);
        result += text[j];
      }
    }

    states.addInstruction(`4. The decrypted text is ${result}.`);

    // Remove padding
    result = result.replace(/X+$/, '');

    states.addInstruction(`5. Remove the padding.`);
    states.addInstruction(`6. The decrypted text is ${result}.`);

    return result;
  } catch (err) {
    console.log('decryptColumnarTranspositionWithBlockSize -> err', err);
    return `Error: ${JSON.stringify(err)}`;
  }
};

const compute = () => {
  states.clearInstruction();
  // value can be simpleTransposition, columnarTranspositionWithKey, columnarTranspositionWithBlockSize
  const selectedCipherType = states.cipherType.get().value;

  // value can be encrypt or decrypt
  const selectedCipherMode = states.cipherMode.get().value;

  const key = states.key.get();

  const blockSize = states.blockSize.get();

  const text = states.text.get();

  if (!text) {
    return states.result.set(`Please fill in all the fields.`);
  }
  if (
    selectedCipherType === 'columnarTranspositionWithBlockSize' &&
    !blockSize
  ) {
    return states.result.set('Please fill in the block size field.');
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
