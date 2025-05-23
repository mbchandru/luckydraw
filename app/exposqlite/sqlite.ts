
//export const db = SQLite.openDatabaseAsync('luckydraw.db');
//const db = useSQLiteContext();

import { useSQLiteContext } from "expo-sqlite";

export async function initializeDatabase() {
  const db = useSQLiteContext();
  console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'));
  try {
    const userPreferencesQuery = `CREATE TABLE IF NOT EXISTS UserPreferences (id INTEGER DEFAULT 1, colorPreference TEXT, languagePreference TEXT, PRIMARY KEY(id))`;
    const contactsQuery = `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, email TEXT)`;
    db.execAsync(userPreferencesQuery);
    db.execAsync(contactsQuery);

    console.log('Database and tables created successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
}

/*export const getTableNames = async (db: SQLite.SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = []
    const results = await db.execAsync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name)
      }
    })
    return tableNames
  } catch (error) {
    console.error(error)
    throw Error("Failed to get table names from database")
  }
}

export const removeTable = async (db: SQLite.SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`
  try {
    await db.execAsync(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop table ${tableName}`)
  }
} */