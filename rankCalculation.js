const { map } = require('@laufire/utils/collection');
const { index } = require('@laufire/utils/crunch');
const csv = require('csv-parser');
const fs = require('fs');
const input = [];

const indexData = (data) => index(data, ['class', 'section']);

const processIndexedData = (data) => {

  const getTotal = ({ tamil, english, maths, science, social }) =>
    [tamil, english, maths, science, social].reduce((acc, c) => acc + parseInt(c), 0);

  const passOrFail = ({ tamil, english, maths, science, social }) =>
    Math.min(tamil, english, maths, science, social) > 35
      ? 'P'
      : 'F'

  const getRank = (studentRecord) =>
    studentRecord.map((data, index, array) => ({
      ...data,
      Rank: data.passOrFail === 'P'
        ? array.filter((item) => item.total > data.total && item.passOrFail !== 'F').length + 1
        : '-',
    })
    );

  const getCount = (studentRecord) => (
    [...studentRecord,
    {
      count: studentRecord.reduce((acc, c) =>
        c.passOrFail === 'P' ? { ...acc, pass: ++acc.pass } : { ...acc, fail: ++acc.fail }
        , { pass: 0, fail: 0 })
    }]
  );

  const processData = (data) => {
    const studentRecord = data.map(data => ({
      ...data,
      total: getTotal(data),
      passOrFail: passOrFail(data)
    }))
    return getCount(getRank(studentRecord));
  };

  const processSection = (data ) => map(data, processData);

  const processedClass = map(data, processSection);

  return processedClass;
};

const displayData = (data) => console.log(JSON.stringify(data));


const indexInput = () => {
  const indexedData = indexData(input);
  const processedData = processIndexedData(indexedData);
  displayData(processedData);
}

const getInputObj = () => fs.createReadStream('markSheets.csv')
  .pipe(csv())
  .on('data', (data) => input.push(data))
  .on('end', () => {
    indexInput();
  });

const main = () => {
  getInputObj();
};

main();