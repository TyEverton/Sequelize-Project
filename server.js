const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const port = 3001

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost', 
  dialect: 'sqlite',
  storage: 'db.sqlite',
  operatorsAliases: false 
})

const User = connection.define('User', {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT
})

connection
  .sync({
    logging: console.log
  })
  .then(() => {
    User.create({
      name: 'Ty',
      bio: 'New bio entry'
    })
  })
  .then(() => {
    console.log("Connection to database established!")
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err)
  })

app.listen(port, () => {
  console.log('Running on port ' + port)
})