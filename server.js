const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const port = 3001

const USERS = require('')

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
  operatorsAliases: false,
  define: {
    freezeTableName: true,
  },
})

const User = connection.define('User', {
name: Sequelize.STRING,
email: {
  type: Sequelize.STRING,
  validate: {
    isEmail: true
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true
    }
  }
}
})

app.get('/', (req, res) => {
  User.create({
    name: 'Ty',
    bio: 'Test bio',
  })
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(404).send(error)
    })
})

connection
  .sync({
    logging: console.log,
    force: true,
  })
  .then(() => {
    User.create({
      name: 'Ty',
      bio: 'New bio entry 1',
    })
  })
  .then(() => {
    console.log('Connection to database established!')
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err)
  })

app.listen(port, () => {
  console.log('Running on port ' + port)
})
