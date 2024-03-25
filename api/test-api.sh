#!/bin/sh

npm run populate-db

sleep 1

npm start &

sleep 1

postman collection run $POSTMAN_API

# XXX(beau): hehe
killall node
