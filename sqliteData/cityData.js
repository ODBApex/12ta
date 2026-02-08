"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityData = void 0;
class cityData {
    static async createCityData(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS cityData (
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
    static async addCityData(db, cityInfoData) {
        const result = await db.run('INSERT INTO cityData (id, type, incrementType, increment, occupyAddres, occupyBlock) VALUES (?,?,?,?,?,?)', cityInfoData.id, cityInfoData.type, cityInfoData.incrementType, cityInfoData.increment, cityInfoData.occupyAddres, cityInfoData.occupyBlock);
        return result.lastID;
    }
    static async selectCityDataInfo(db) {
        try {
            return await db.all('SELECT * FROM cityData');
        }
        catch (error) {
            throw new Error(`selectCityDataInfo-failed: ${error}`);
        }
    }
    static async updateCityData(db, occupyAddres, occupyBlock, id) {
        try {
            const result = await db.run('UPDATE cityData SET occupyAddres = ?,occupyBlock = ? WHERE id = ?', occupyAddres, occupyBlock, id);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateCityData-failed: ${error}`);
        }
    }
}
exports.cityData = cityData;
