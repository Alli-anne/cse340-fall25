const routes = require('express').Router();
const myControllers = require('../controllers/index');
const contactsController = require('../controllers/contactsController');


routes.get('/contacts', contactsController.getAllContacts);
routes.get('/contact/:id', contactsController.getContactID);

routes.post('/contacts', contactsController.addPerson);

routes.put('/contact/:id', contactsController.updateContact);
routes.delete('/contact/:id', contactsController.deleteContact);

module.exports = routes;