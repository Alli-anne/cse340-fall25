const routes = require('express').Router();
const myControllers = require('../controllers/index');
const swagger = require('./swagger');

routes.get('/cool', myControllers.coolName);
routes.get('/', myControllers.personName);



module.exports = routes;