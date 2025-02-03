#!/bin/bash

package_json="dist/package.json"

ignorable_version="0.0.0-semantic-version"
current_version=$(grep version $package_json | awk -F \" '{print $4}')

echo "$ignorable_version != $current_version"
if [ "$ignorable_version" != "$current_version" ] ; then
  echo "Overriding package json with new name"
  echo "Running sed with \"s/$1/$2/g\" on $package_json"
  sed -i "s/$1/$2/g" $package_json

  cd dist
  cat package.json
  echo "Running npm publish"
  npm publish --userconfig ../.npmrc
else
  echo "versions $ignorable_version and $current_version match, aborting!"
fi

