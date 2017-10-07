module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "database": "Nansen",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "Nansen",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "",
    "database": "Nansen",
    "host": process.env.CLEARDB_DATABASE_URL,
    "dialect": "mysql"
  }
};