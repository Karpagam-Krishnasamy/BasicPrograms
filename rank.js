const { values } = require("@laufire/utils/collection");

const markSheets= [
  {
    student: 'Sriram',
    rollNo: 11,
},
{
    student: 'Ram',
    rollNo: 16,    
},
{
    student: 'sri',
    rollNo: 18,
},
{
    student: 'mani',
    rollNo: 20,
},
{
    student: 'praveen',
    rollNo: 80,
},
{
    student: 'thiru',
    rollNo: 81,
}
,
{
    student: 'manikandan',
    rollNo: 82,
}
];
const marks={
  11: {
    tamil: 80,
    english: 90,
    science: 86,
    maths: 97,
    social: 76,
  },
  16: { 
    tamil: 90,
    english: 97,
    science: 100,
    maths: 34,
    social: 96,
  },
  18: {
    tamil: 60,
    english: 90,
    science: 63,
    maths: 93,
    social: 46,
  },
  20: {
    tamil: 79,
    english: 80,
    science: 91,
    maths: 93,
    social: 86,
  },
  80: {
    tamil: 90,
    english: 80,
    science: 86,
    maths: 96,
    social: 77,
  },
  81: {
    tamil: 90,
    english: 40,
    science: 80,
    maths: 68,
    social: 77,
  },
  82: {
    tamil: 100,
    english: 100,
    science: 34,
    maths: 100,
    social: 100,
}
}

let rank =1; 

const getTotal = (studentDetail, marks) => 
  values(marks[studentDetail.rollNo]).reduce((acc, c)=> acc + c);

const passOrFail = (studentDetail, marks) =>
    Math.min(...values(marks[studentDetail.rollNo])) > 35 
      ? 'P'
      : 'F'

const getRank = (studentRecord) =>
studentRecord.map((data, index, array) =>
  data.passOrFail === 'P'
  ? (index === 0 || data.total === array[index-1]['total'] 
    ? {...data, Rank: rank}
    : ((rank = index+1), ({...data, Rank: rank})))
  : {...data, Rank: '-'});

const getCount = (studentRecord) => (
  [...studentRecord, {count:{Pass: rank, Fail: studentRecord.length - rank}}]
    );


const processMarkSheets = (marSheets, marks)=>{
  const studentRecord = marSheets.map(data =>({
     ...data, total: getTotal(data,marks), passOrFail: passOrFail(data, marks)
    })).sort((a, b)=> b.passOrFail.localeCompare(a.passOrFail) || b.total - a.total);
    return getCount(getRank(studentRecord));
  };

console.table(processMarkSheets(markSheets, marks));