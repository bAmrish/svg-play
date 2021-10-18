echo deploying to firebase.

firebase deploy

RET_VAL=$?

if [ $RET_VAL -eq 0 ]; then
  echo deployment done.
else
  echo deployment failed with errors.
fi
