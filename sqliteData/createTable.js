"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = void 0;
class createTable {
    static async createTable(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS users (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  name TEXT NOT NULL,
		  email TEXT NOT NULL UNIQUE
		)
	  `);
    }
    static async addUser(db, user) {
        const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', user.name, user.email);
        return result.lastID;
    }
}
exports.createTable = createTable;
