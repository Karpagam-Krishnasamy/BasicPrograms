filterNonGitFolders()
{
  for topdir in ./*/;
do
    [ ! "$(find "$topdir" -name .git)" ] &&
    echo "$topdir"
done
}

filterNonGitFolders