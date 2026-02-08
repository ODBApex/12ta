"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockInfo = void 0;
class blockInfo {
    static async createBlockInfo(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS blockInfo (
		  did INTEGER PRIMARY KEY AUTOINCREMENT,
		  id TEXT NOT NULL,
		  height TEXT NOT NULL UNIQUE,
		  date TEXT NOT NULL,
		  data TEXT NOT NULL
		)
	  `);
    }
    static async addBlockInfo(db, blockInfoData) {
        const result = await db.run('INSERT INTO blockInfo (id, height, date, data) VALUES (?,?,?,?)', blockInfoData.id, blockInfoData.height, blockInfoData.date, blockInfoData.data);
        return result.lastID;
    }
    static async selectBlockInfo(db) {
        try {
            return await db.all('SELECT * FROM blockInfo');
        }
        catch (error) {
            throw new Error(`selectBlockInfo-failed: ${error}`);
        }
    }
    static async selectBlockInfoByHeight(db, height) {
        try {
            return await db.get('SELECT * FROM blockInfo WHERE height = ?', height);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectMaxBlockInfoHeight(db) {
        try {
            return await db.get('SELECT MAX(height+0) as maxHeight FROM blockInfo');
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async updateBlockInfo(db, data, height) {
        try {
            const result = await db.run('UPDATE blockInfo SET data = ? WHERE height = ?', data, height);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateBlockInfo-failed: ${error}`);
        }
    }
    static async deleteBlockInfo(db, height) {
        try {
            const result = await db.run('DELETE FROM blockInfo WHERE height = ?', height);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`deleteBlockInfo-failed: ${error}`);
        }
    }
}
exports.blockInfo = blockInfo;
