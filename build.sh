BUILD_DIR="public1"
if [[ ! -d "$BUILD_DIR" ]]; then
  echo \'$BUILD_DIR\' does not exist. Creating build directory.
  mkdir $BUILD_DIR
fi
echo copying files.
cp -r src/* $BUILD_DIR
echo build done.


