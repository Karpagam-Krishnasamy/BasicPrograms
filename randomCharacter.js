const randomNumber = (min, max) => {
    return (Math.floor(Math.random() * (max-min+1)) + min);
};
const randomChar = () =>
{
  return String.fromCharCode(randomNumber(97,122));
}
const randomStr = (strCount) => {
let char ='';
for(let i=0;i<strCount;i++){
  char += randomChar();
}
return char;
};
console.log(randomStr(6));
