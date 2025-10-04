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

const addPerson = async (req, res) => {
    try{
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const db = getDb();
        const newContact = {
            firstName: "Allison",
            lastName: "Price",
            email: "alisonprice@gmail.com",
            favoriteColor: "purple",
            birthday: "2005-06-04"
        };
        const result = await db.collection('Contact').insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });
        res.status(201).json({ id: result.insertedId });
    }
    catch(err){
        console.log(err);
    }
};

const updateContact = async (req, res) => {
    try{
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const db = getDb();
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const contact = await db.collection('Contact').findOne({ _id: objectId });
        if (!contact){
            return res.status(404).json({ error: 'Contact not found' });
        }
        const updatedContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };
        await db.collection('Contact').updateOne({ _id: objectId }, { $set: updatedContact });
        res.status(200).json({ message: 'Contact updated successfully' });
    }
    catch(err){
        console.log(err);
    }
};

const deleteContact = async (req, res) => {
    try{
        const db = getDb();
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const contact = await db.collection('Contact').findOne({ _id: objectId });
        if (!contact){
            return res.status(404).json({ error: 'Contact not found' });
        }
        await db.collection('Contact').deleteOne({ _id: objectId });
        res.status(200).json({ message: 'Contact deleted successfully' });
    }
    catch(err){
        console.log(err);
    }
}
module.exports = { getAllContacts, getContactID, addPerson, updateContact, deleteContact };
console.log('getAllContacts hit');
