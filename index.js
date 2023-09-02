const argv = require('yargs').argv;
const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
} = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
	try {
		switch (action) {
			case 'list':
				const contacts = await listContacts();
				console.log('Список контактів:', contacts);
				break;

			case 'get':
				if (!id) {
					console.error('Не вказано ідентифікатор контакту для пошуку.');
					return;
				}
				const contact = await getContactById(id);
				console.log('Знайдений контакт:', contact);
				break;

			case 'add':
				if (!name || !email || !phone) {
					console.error(
						"Введіть дані для додавання контакту: ім'я, email, телефон."
					);
					return;
				}
				const newContact = await addContact(name, email, phone);
				console.log('Доданий новий контакт:', newContact);
				break;

			case 'remove':
				if (!id) {
					console.error('Не вказано ідентифікатор контакту для видалення.');
					return;
				}
				const removedContact = await removeContact(id);
				console.log('Видалений контакт:', removedContact);
				break;

			default:
				console.warn('\x1B[31m Невідома дія!');
		}
	} catch (error) {
		console.error('Помилка:', error);
	}
}

invokeAction(argv);
