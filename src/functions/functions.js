import states from '../states';

const encryptSimpleTransposition = async (plainText, keyword) => {
  let result = '';
  try {

    const hasRepeatingCharacters = str => new Set(str).size !== str.length;
    if (hasRepeatingCharacters(keyword)) {
        return 'Keyword should not contain repeated characters.'
    }
    if (plainText.length !== keyword.length) {
        return "Length of the plain text should be equal to the length of the keyword."
    }
    
    const transpositionKey = keyword.split('').sort().map(char => keyword.indexOf(char));
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
  let encryptedText = "";
  try {

    text = text.toUpperCase().trim();
    key = key.toUpperCase().trim();
    
    //check if special characters exist in key or the text
    if(! /^[A-Z]+$/.test(text+key)){return "Error!: No special characters accepted for the key or text"}



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
    for(var k = 0; k < keyLen; k++){
      dict[key[k]] = k;
    }

    let orderedKey = key.split("").sort().join("");

    // join the encrypted text
    for(let a = 0; a < keyLen; a++){
        encryptedText += dynamicArray.map(x=> x[dict[orderedKey[a]]]).join("")
    }

    return encryptedText;  //result

    
   
  } catch (err) {
    console.log('encryptColumnarTranspositionWithKey -> err', err);
    return 'Encrypted COLUMNAR TRANSPOSITION WITH KEY';
  }
};

const decryptColumnarTranspositionWithKey = async (text, key) => {
  let decrypted = "";

  try {

    text = text.toUpperCase().trim();
    key = key.toUpperCase().trim();
    
    //check if special characters exist in key or the text
    //if(! /^[A-Z]+$/.test(text+key)){return "Error!: No special characters accepted for the key or text"}
    
    var keyLen = key.length;
    var textLen = text.length;
    var noRows = Math.ceil(textLen / keyLen);

    //order the key alphabetically    
    let orderedKey = key.split("").sort().join("");
    
    //create an array based on no. rows and columns
    var arr = Array(noRows).fill("").map(() => Array(keyLen));
    
    //put the text in the array based on the order of the key
    for(let i = 0; i < keyLen; i++){
        let startIndex = orderedKey.indexOf(key[i]) * 2; 
        
        for(let j = 0; j < noRows && startIndex < textLen; j++){
            arr[j][i]= text[startIndex];
            startIndex++;
        }
        
    }
 
    
    for(let k = 0; k < noRows; k++){
        decrypted += arr[k].join("");
    }
    
    return decrypted; //result


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
