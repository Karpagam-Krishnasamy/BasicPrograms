const { map } = require("@laufire/utils/collection");

const items = {
  animals: ["dog", "cat", "wolf", "lion", "dog", "cat", "wolf", "lion", "dog", "tiger"],
  birds: ["parrot", "peacock", "crow", "sparrow", "sparrow", "parrot", "parrot", "crow"]
};

const countItems = (items) =>
  map(items, (item) => item.reduce((acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }), {}));

const displayCount = (itemsCount) => console.log(itemsCount);

const main = (items) => {
  const itemsCount = countItems(items);
  displayCount(itemsCount);
};

main(items);