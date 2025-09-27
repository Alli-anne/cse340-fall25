const { getDb } = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
    const db = getDb();
    const contacts = await db.collection('Contact').find();
    contacts.toArray().then(lists => {
        console.log(lists);  // you didn’t see anything printed
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(lists);
    });
};

const getContactID = async (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const contact = await db.collection('Contact').findOne({ _id: objectId });
    res.json(contact);
};

module.exports = { getAllContacts, getContactID };
console.log('getAllContacts hit');
