require('dotenv').config({path:__dirname+'/.env'})
module.exports = {
  "development": {
    "username": "root",
    "password": "task",
    "database": "database_development",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "task",
    "database": "database_test",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password":  "task",
    "database": "database_production",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}
