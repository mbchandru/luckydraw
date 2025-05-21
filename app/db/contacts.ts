import 'setimmediate';

export const addContact = async (db: SQLiteDatabase, contact: Contact) => {
  const insertQuery = `
   INSERT INTO Contacts (name, phoneNumber, email)
   VALUES (?, ?, ?)
 `
  const values = [
    contact.name,
    contact.phoneNumber,
    contact.email,
  ]
  try {
    return db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to add contact")
  }
}

export const getContacts = async (db: SQLiteDatabase): Promise<Contact[]> => {
  try {
    const contacts: Contact[] = []
    const results = await db.executeSql("SELECT * FROM Contacts")
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
  db: SQLiteDatabase,
  updatedContact: Contact
) => {
  const updateQuery = `
    UPDATE Contacts
    SET name = ?, phoneNumber = ?, email = ?
    WHERE id = ?
  `
  const values = [
    updatedContact.name,
    updatedContact.phoneNumber,
    updatedContact.email,
    updatedContact.id,
  ]
  try {
    return db.executeSql(updateQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to update contact")
  }
}

export const deleteContact = async (db: SQLiteDatabase, contact: Contact) => {
  const deleteQuery = `
    DELETE FROM Contacts
    WHERE id = ?
  `
  const values = [contact.id]
  try {
    return db.executeSql(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove contact")
  }
}