const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  return console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);
  const getContact = parsedData.filter(contact => contact.id.includes(contactId));
  return console.log(getContact);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);
  const getContact = parsedData.filter(contact => contact.id !== contactId);
  console.table(getContact);
  fs.writeFile(contactsPath, JSON.stringify(getContact), 'utf-8');
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  const id = uuidv4();
  const contact = { id, name, email, phone };
  const parsedData = JSON.parse(data);
  parsedData.push(contact);
  console.table(parsedData);
  fs.writeFile(contactsPath, JSON.stringify(parsedData), 'utf-8');
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
