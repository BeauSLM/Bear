k so my idea of using the api was actually stupid, we should populate the db by calling to knex directly

we can factor out the knex calls into wrappers that are called by both the api and the seed/population scripts
