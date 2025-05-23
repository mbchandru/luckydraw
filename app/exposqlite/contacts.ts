/* import {
  SQLiteDatabase,
} from "react-native-sqlite-storage"; */

import { SQLiteDatabase } from "expo-sqlite";

interface MyKeyValuePair {
  [key: string]: any;
}

let contact: MyKeyValuePair = {
  name: '',
  email: '',
  mobile: '',
};

export const addContact = async (db: SQLiteDatabase, contact: MyKeyValuePair) => {
  //console.log('C--sqlite version', db.getFirstSync('SELECT sqlite_version()'));
  const entries = Object.entries(contact);

  entries.forEach(([key, value]) => {
    console.log(`Key: ${key}, Value: ${value}`);
  });
  const insertQuery = `
   INSERT INTO Contacts (name, mobile, email) VALUES (?, ?, ?)`;

  //console.log('contact email ' + contact.email);
    const values = [
      contact.name,
      contact.email,
      contact.mobile,
    ];
  try {
    //const statement = await db.prepareAsync(insertQuery);
    //return await statement.executeAsync([contact.name, contact.email, contact.mobile]);
    db.runAsync(insertQuery, contact.name, contact.email, contact.mobile);
    console.log('db path ' + db.databasePath);
  } catch (error) {
    console.error(error)
    throw Error("Failed to add contact")
  }
}


/*export const getContacts = async (db: SQLite.SQLiteDatabase): Promise<Contact[]> => {
  try {
    const contacts: Contact[] = []
    const results = await db.execAsync("SELECT * FROM Contacts")
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        contacts.push(result.rows.item(index))
      }
    })
    return contacts
  } catch (error) {
    console.error(error)
    throw Error("Failed to get Contacts from database")
  }
}

export const updateContact = async (
  db: SQLite.SQLiteDatabase,
  updatedContact: Contact
) => {
  const updateQuery = `
    UPDATE Contacts
    SET name = ?, mobile = ?, email = ?
    WHERE id = ?
  `
  const values = [
    updatedContact.name,
    updatedContact.mobile,
    updatedContact.email,
    updatedContact.id,
  ]
  try {
    return db.runAsync(updateQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to update contact")
  }
}

export const deleteContact = async (db: SQLite.SQLiteDatabase, contact: Contact) => {
  const deleteQuery = `
    DELETE FROM Contacts
    WHERE id = ?
  `
  const values = [contact.id]
  try {
    return db.runAsync(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove contact")
  }
} */