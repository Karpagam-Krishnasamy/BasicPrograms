var rates = {
  Carrot: 10,
  Apple: 200,
  Guava: 50,
};

var discounts = {
  // values are in percentages.
  Apple: 10
};

var taxes = {
  // values are in percentages.
  Carrot: 5,
  Guava: 10
};

var purchases = [
  {
    item: 'Carrot',
    units: 20,
  },
  {
    item: 'Apple',
    units: 2,
  },
  {
    item: 'Guava',
    units: 1,
  }
];

/* Functions */
var getDiscountPercent = function (productName) {
  if(discounts.hasOwnProperty(productName)){
  return rates[productName] * (discounts[productName]/parseFloat(100));
  }
  else
    return 0;
};

var getTaxPercent = function (productName) {
  if(taxes.hasOwnProperty(productName)){
 return taxes[productName]/parseFloat(100);
  }
  else
    return 0;
};
var getUnitPrice = function (itemName) {
  return rates[itemName];
};

/*var getLineItemPrice = function (lineItem) {

};*/

var getSum = function () {
  let sum = 0;
  for(let i = 0; i < purchases.length; i++) {
    let total = 0;
    total = ((getUnitPrice(purchases[i].item) * purchases[i].units) - (getDiscountPercent(purchases[i].item) * purchases[i].units));   
    total += (total * (getTaxPercent(purchases[i].item))); 
    sum +=  total;
  }
  return sum;
};

// Do not change below this line.
/* Main Function */
var main = function main() {
  console.log(getSum());
  }

main();