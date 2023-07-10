addMarks(){
sum=$(($3 + $4 + $5))
echo $sum
}

getTotal(){
while read data
do
  IFS=$","
  marks=$data
  addMarks $marks
done < marksheets.csv
}

getTotal