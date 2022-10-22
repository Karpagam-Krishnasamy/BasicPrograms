const { map } = require('@laufire/utils/collection');
const { index } = require('@laufire/utils/crunch');
const csv = require('csv-parser');
const fs = require('fs');
const markSheets = [];

const groupMarkSheets = (markSheets) => index(markSheets, ['class', 'section']);

const processMarkSheets = (markSheets) => {
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

  const processMarkSheet = (markSheets) => {
    const studentRecord = markSheets.map(data => ({
      ...data,
      total: getTotal(data),
      passOrFail: passOrFail(data)
    }))
    return getCount(getRank(studentRecord));
  };

  return map(markSheets, processMarkSheet);
};

const displayMarkSheets = (markSheets) => console.log(JSON.stringify(markSheets));


const groupInput = () => {
  const groupedMarkSheets = groupMarkSheets(markSheets);
  const processedMarkSheets = map(groupedMarkSheets, processMarkSheets);
  displayMarkSheets(processedMarkSheets);
}

const getInputObj = () => fs.createReadStream('markSheets.csv')
  .pipe(csv())
  .on('data', (data) => markSheets.push(data))
  .on('end', () => {
    groupInput();
  });

const main = () => {
  getInputObj();
};

main();