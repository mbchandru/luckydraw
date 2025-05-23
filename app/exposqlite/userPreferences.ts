import * as SQLite from "expo-sqlite";
import 'setimmediate';

type SingleUserPreference = "colorPreference" | "languagePreference"

// This function works for both inserting and updating one user preference
// It can be color preference or language preference
export const updateSingleUserPreference = async (
  db: SQLite.SQLiteDatabase,
  singleUserPreference: SingleUserPreference,
  newValue: string
) => {
  const query = `
      INSERT INTO UserPreferences (id, ${singleUserPreference})
      VALUES (1, ?)
      ON CONFLICT(id) DO UPDATE SET ${singleUserPreference} = ?
  `
  try {
    return db.execAsync(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to update ${singleUserPreference}`)
  }
}
export const getUserPreferences = async (
  db: SQLite.SQLiteDatabase,
) => {
  const query = `SELECT * FROM UserPreferences WHERE id = 1`
  try {
    const results = await db.execAsync(query)
    if (results[0]?.rows?.length) {
      return results[0].rows.item(0)
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    throw Error("Failed to get user preferences from database")
  }
}

// Here is another version if you need to retrieve only one user preference.

export const getSingleUserPreference = async (
  db: SQLite.SQLiteDatabase,
  userPreference: SingleUserPreference
): Promise<string | null> => {
  const query = `SELECT ${userPreference} FROM UserPreferences WHERE id = 1`
  try {
    const results = await db.execAsync(query)
    if (results[0]?.rows?.length) {
      return results[0].rows.item(0)[userPreference]
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    throw Error(`Failed to get ${userPreference} from database`)
  }
}