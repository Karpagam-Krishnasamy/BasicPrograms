for topdir in ./*/;
do
    [ ! "$(find "$topdir" -type d -name .git)" ] &&
    echo "$topdir"
done