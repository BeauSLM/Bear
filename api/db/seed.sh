#!/bin/sh

# NOTE(beau): This script's purpose is seeding the database with reasonable defaults,
# where the foreign keys of each of the records point to other existing records.
# It does so by calling our API to add the default values in the database. I
# think this is easiest because the functionality to interact with the database
# while preserving foreign-key correctness is already implemented by the API.
# There's no point in re-implementing it separately in the knex seed scripts.
#
# - Beau

rm dev.sqlite3

knex migrate:latest
knex seed:run

npm start &
npm_pid=$!

base_url="http://localhost:3001/"

curl $base_url

kill $npm_pid
wait $npm_pid
