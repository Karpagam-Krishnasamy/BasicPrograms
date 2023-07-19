addMarks(){
local sum=$(($3 + $4 + $5))
echo $sum
}

getTotal(){
while read data
do
  IFS=$","
  total=$(addMarks $data)
  echo $data $total
done < marksheets.csv
}

getTotal