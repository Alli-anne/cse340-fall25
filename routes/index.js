const routes = require('express').Router();
const myControllers = require('../controllers/index');

routes.get('/cool', myControllers.coolName);
routes.get('/', myControllers.personName);

module.exports = routes;