const markSheets= [
  {
      student: 'Sriram',
      rollNo: 11,
      tamil: 80,
      english: 90,
      science: 86,
      maths: 97,
      social: 76,
  },
  {
      student: 'Ram',
      rollNo: 16,
      tamil: 90,
      english: 97,
      science: 100,
      maths: 34,
      social: 96,
      
  },
  {
      student: 'sri',
      rollNo: 18,
      tamil: 60,
      english: 90,
      science: 66,
      maths: 93,
      social: 46,
  },
  {
      student: 'mani',
      rollNo: 20,
      tamil: 40,
      english: 70,
      science: 86,
      maths: 73,
      social: 86,
  },
  {
      student: 'praveen',
      rollNo: 80,
      tamil: 90,
      english: 80,
      science: 86,
      maths: 96,
      social: 77,

  },
  {
      student: 'thiru',
      rollNo: 81,
      tamil: 90,
      english: 80,
      science: 86,
      maths: 96,
      social: 77,

  }
  ,
  {
      student: 'manikandan',
      rollNo: 82,
      tamil: 100,
      english: 100,
      science: 34,
      maths: 100,
      social: 100,

  }
];
let totalFail; 
const getRank = (studentRecord) => {
let rank=1;
studentRecord.sort((firstRecord, secondRecord ) => secondRecord.total - firstRecord.total);
const result = studentRecord.map(element => ({
    ...element,rank : (element.passOrFail === 'P')?rank++:"-"
  })
    )
totalFail = studentRecord.length - (--rank);
   return result;
};

const getCounts = (studentRecord) => {
  studentRecord["count"] ={};
  studentRecord["count"]["pass"] = studentRecord.length - totalFail;
  studentRecord["count"]["fail"] = totalFail;
  return studentRecord;
};

const passOrFail = (studentRecord) =>
  studentRecord.map(element => ({  
      ...element,passOrFail : (element.tamil <35 || element.english <35 || element.maths<35 || element.science <35 || element.social<35?"F":"P")
})
  );

const processMarkSheet = (studentRecord) => 
  studentRecord.map(element=>({
      ...element,total : element.tamil + element.english + element.maths + element.science + element.social
    })
);


const processMarkSheets = (marSheets)=> {
const recordWithTotal = processMarkSheet(marSheets);
const result= passOrFail(recordWithTotal);
return getCounts(getRank(result));
};

console.log(processMarkSheets(markSheets));