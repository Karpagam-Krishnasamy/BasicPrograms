function randomRange(min, max) {
  return (Math.floor(Math.random() * (max-1-min)) + min + 1);
}
console.log(randomRange(2,9));

module.exports = randomRange;
