addMarks(){
sum=$(($3 + $4 + $5))
echo $sum
}

getTotal(){
while read split
do
  addMarks $split
done < marksheets.tsv
}

getTotal