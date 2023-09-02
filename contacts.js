const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

let cachedContacts = null;

const readContactsFromFile = async () => {
	try {
		const data = await fs.readFile(contactsPath, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		throw error;
	}
};

const listContacts = async () => {
	if (cachedContacts === null) {
		cachedContacts = await readContactsFromFile();
	}
	return cachedContacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((c) => c.id === contactId);
	return contact || null;
};

const removeContact = async (contactId) => {
	try {
		const contacts = await listContacts();
		const indexToRemove = contacts.findIndex(
			(contact) => contact.id === contactId
		);

		if (indexToRemove === -1) {
			return null;
		}
		contacts.splice(indexToRemove, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return contacts[indexToRemove];
	} catch (error) {
		throw error;
	}
};

const addContact = async (name, email, phone) => {
	const contacts = await listContacts();
	const newContact = {
		id: Math.random().toString(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	cachedContacts = contacts;
	return newContact;
};

module.exports = {
	contactsPath,
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
