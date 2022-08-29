#!/bin/bash

printf "\n> Install frontend\n"
frontDir="./app/frontend"
frontCache="/tmp/frontend-cache"
rm -rf $frontCache
npm_config_loglevel=silent npm i --prefix ${frontDir} --cache $frontCache

printf "\n> Install backend\n"
backDir="./app/backend"
backCache="/tmp/backend-cache"
rm -rf $backCache
npm_config_loglevel=silent npm i --prefix ${backDir} --cache $backCache