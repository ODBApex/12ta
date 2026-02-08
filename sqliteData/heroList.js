"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroList = void 0;
class heroList {
    static async createHeroList(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS heroList (
		  did INTEGER PRIMARY KEY AUTOINCREMENT,
		  block TEXT NOT NULL,
		  blockHeight TEXT NOT NULL,
		  blockID TEXT NOT NULL,
		  heroAddres TEXT NOT NULL,
		  ownerAddres TEXT NOT NULL,
		  heroType TEXT NOT NULL,
		  heroValue TEXT NOT NULL,
		  isTrading TEXT NOT NULL,
		  tradingID TEXT NOT NULL,
		  tradeHistory TEXT NOT NULL
		)
	  `);
    }
    static async addHeroList(db, heroListData) {
        const result = await db.run('INSERT INTO heroList (block,blockHeight,blockID,heroAddres,ownerAddres,heroType,heroValue,isTrading,tradingID,tradeHistory) VALUES (?,?,?,?,?,?,?,?,?,?)', heroListData.block, heroListData.blockHeight, heroListData.blockID, heroListData.heroAddres, heroListData.ownerAddres, heroListData.heroType, heroListData.heroValue, heroListData.isTrading, heroListData.tradingID, heroListData.tradeHistory);
        return result.lastID;
    }
    static async updateHeroListByBlockID(db, blockID, ownerAddres) {
        try {
            const result = await db.run('UPDATE heroList SET ownerAddres = ? WHERE blockID = ?', ownerAddres, blockID);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateHeroList-failed: ${error}`);
        }
    }
    static async updateHeroListByBlockIDUIsTrading(db, blockID, isTrading) {
        try {
            const result = await db.run('UPDATE heroList SET isTrading = ? WHERE blockID = ?', isTrading, blockID);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateHeroListByBlockIDUIsTrading-failed: ${error}`);
        }
    }
    static async updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        try {
            const sql = `UPDATE heroList SET ownerAddres = '${ownerAddres}',isTrading = '${isTrading}',tradingID = '${blockHeight}',tradeHistory = tradeHistory||',${tradeID}' WHERE blockID = '${blockID}'`;
            const result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateHeroListByBlockIDUIsTrading-failed: ${error}`);
        }
    }
    static async selectHeroListByAddres(db, ownerAddres) {
        try {
            return await db.all('SELECT * FROM heroList WHERE ownerAddres = ?', ownerAddres);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectHeroListByHeroHash(db, heroHash) {
        try {
            return await db.get('SELECT * FROM heroList WHERE blockID = ?', heroHash);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres) {
        try {
            let sql = `SELECT * FROM heroList WHERE blockID = '${heroHash}' and ownerAddres = '${ownerAddres}'`;
            let heroListData = await db.get(sql);
            return heroListData;
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectAddresHeroNum(db, ownerAddres) {
        try {
            let sql = `SELECT COUNT(*) AS num FROM heroList WHERE ownerAddres = '${ownerAddres}'`;
            let num = await db.get(sql);
            return num;
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
}
exports.heroList = heroList;
