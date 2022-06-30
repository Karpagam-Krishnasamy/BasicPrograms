const randomNumber = (min, max) => (Math.floor(Math.random() * (max-min+1)) + min);
const randomChar = () => randomNumber(0,15).toString(16);
const randomString = (charCount) => 
  Array(charCount).fill(null).map(randomChar).join('');
const getUUID = () => ([8,4,4,4,12].map(charCount => randomString(charCount))).join('-');
console.log(getUUID());
