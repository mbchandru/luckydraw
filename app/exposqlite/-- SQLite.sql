-- SQLite
SELECT * FROM Contacts;


-- SQLite
INSERT INTO Contacts (id, name, mobile, email)
   VALUES (2, 'nM', '9445435843', 'mbchandru@gmail.com');


DELETE FROM Contacts WHERE id = 1


DROP TABLE IF EXISTS UserPreferences;
DROP TABLE IF EXISTS Contacts;


CREATE TABLE IF NOT EXISTS UserPreferences (
   id INTEGER DEFAULT 1,
   colorPreference TEXT,
   languagePreference TEXT,
   PRIMARY KEY(id))


CREATE TABLE IF NOT EXISTS Contacts (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT,
   mobile TEXT,
   email TEXT)