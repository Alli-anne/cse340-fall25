const routes = require('express').Router();
const myControllers = require('../controllers/index');
const contactsController = require('../controllers/contactsController');


routes.get('/contact', contactsController.getAllContacts);
routes.get('/contact/:id', contactsController.getContactID);

module.exports = routes;