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
  const entries = Object.entries(contact);

  entries.forEach(([key, value]) => {
    console.log(`Key: ${key}, Value: ${value}`);
  });
  const insertQuery = `INSERT INTO Contacts (name, mobile, email) VALUES (?, ?, ?)`;
  try {
    db.runAsync(insertQuery, contact.name, contact.email, contact.mobile);
    //db.closeAsync();
    console.log('db path ' + db.databasePath);
  } catch (error) {
    console.error('Errors:' + error);
    throw Error("Failed to add contact");
  }
}

export const getContacts = async (db: SQLiteDatabase) => {
  try {
    const contacts : MyKeyValuePair[] = [];
    const results = await db.execAsync("SELECT * FROM Contacts");
    console.log('Here results ' + results);
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        contacts.push(result.rows.item(index));
        console.log('Row ' + index + ' ' + result.rows(index));
      }
    })
    return contacts;
  } catch (error) {
    console.error(error)
    throw Error("Failed to get Contacts from database")
  }
}

export const updateContact = async (db: SQLiteDatabase, updatedContact: MyKeyValuePair
) => {
  const updateQuery = `UPDATE Contacts SET name = ?, mobile = ?, email = ? WHERE id = ?`;
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

export const deleteContact = async (db: SQLiteDatabase, contact: MyKeyValuePair) => {
  const deleteQuery = `DELETE FROM Contacts WHERE id = ?`;
  const values = [contact.id];
  try {
    return db.runAsync(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove contact")
  }
}