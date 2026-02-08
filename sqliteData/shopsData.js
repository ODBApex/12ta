"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopsData = void 0;
class shopsData {
    static async createShopsData(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS shopsData (
		  did INTEGER PRIMARY KEY AUTOINCREMENT,
		  id TEXT NOT NULL UNIQUE,
		  type TEXT NOT NULL,
		  incrementType TEXT NOT NULL,
		  increment TEXT NOT NULL,
		  occupyAddres TEXT NOT NULL,
		  occupyBlock TEXT NOT NULL
		)
	  `);
    }
    static async addShopsData(db, shopsInfoData) {
        const result = await db.run('INSERT INTO shopsData (id, type, incrementType, increment, occupyAddres, occupyBlock) VALUES (?,?,?,?,?,?)', shopsInfoData.id, shopsInfoData.type, shopsInfoData.incrementType, shopsInfoData.increment, shopsInfoData.occupyAddres, shopsInfoData.occupyBlock);
        return result.lastID;
    }
    static async selectShopsDataInfo(db) {
        try {
            return await db.all('SELECT * FROM shopsData');
        }
        catch (error) {
            throw new Error(`selectShopsDataInfo-failed: ${error}`);
        }
    }
    static async updateShopsData(db, occupyAddres, occupyBlock, id) {
        try {
            const result = await db.run('UPDATE shopsData SET occupyAddres = ?,occupyBlock = ? WHERE id = ?', occupyAddres, occupyBlock, id);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateShopsData-failed: ${error}`);
        }
    }
}
exports.shopsData = shopsData;
