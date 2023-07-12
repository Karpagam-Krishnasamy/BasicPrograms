addMarks(){
sum=$(($3 + $4 + $5))
}

getTotal(){
while read data
do
  IFS=$","
  addMarks $data
  echo $sum
done < marksheets.csv
}

getTotal