// TODO: connection config for dev and prod
module.exports = {
  client: "better-sqlite3",
  connection: {
    filename: __dirname + "/dev.sqlite3",
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
};
