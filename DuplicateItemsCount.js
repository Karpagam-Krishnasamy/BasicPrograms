const animals=["dog","cat","wolf","lion","dog","cat","wolf","lion","dog","tiger"];

const main=(animals)=> animals.reduce((acc, c)=> ({...acc, [c]: (acc[c] || 0) + 1}) ,{})

console.log(main(animals));