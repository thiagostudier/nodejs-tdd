const routes = require('express').Router();
const { User } = require('./app/models');

User.create({
  name: "Thiago",
  email: "thiago@mail",
  password_hash: "123456789"
})

// DEFININDO ROTAS

module.exports = routes;

