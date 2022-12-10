const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.filter(contact => contact.id.includes(contactId));
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactIndex = data.findIndex(item => item.id == contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [removedContact] = data.splice(contactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf-8');
  return removedContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const contact = { id: uuidv4(), name, email, phone };
  data.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf-8');
  return data;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
