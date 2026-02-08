"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradingList = void 0;
class tradingList {
    static async createTradingList(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS tradingList (
		  did INTEGER PRIMARY KEY AUTOINCREMENT,
		  blockHeight TEXT NOT NULL,
		  blockID TEXT NOT NULL UNIQUE,
		  createAddres TEXT NOT NULL,
		  tradingType TEXT NOT NULL,
		  toType TEXT NOT NULL,
		  toValue TEXT NOT NULL,
		  obtainType TEXT NOT NULL,
		  obtainValue TEXT NOT NULL,
		  heroHash TEXT NOT NULL,
		  toHeroType TEXT NOT NULL,
		  toHeroValue TEXT NOT NULL,
		  equipmentHash TEXT NOT NULL,
		  toEquipmentType TEXT NOT NULL,
		  toEquipmentValue TEXT NOT NULL,
		  tradingState TEXT NOT NULL,
		  buyBlockID TEXT NOT NULL,
		  buyAddres TEXT NOT NULL
		)
	  `);
    }
    static async addTradingList(db, tradingListData) {
        const result = await db.run('INSERT INTO tradingList (blockHeight,blockID,createAddres,tradingType,toType,toValue,obtainType,obtainValue,heroHash,toHeroType,toHeroValue,equipmentHash,toEquipmentType,toEquipmentValue,tradingState,buyBlockID,buyAddres) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', tradingListData.blockHeight, tradingListData.blockID, tradingListData.createAddres, tradingListData.tradingType, tradingListData.toType, tradingListData.toValue, tradingListData.obtainType, tradingListData.obtainValue, tradingListData.heroHash, tradingListData.toHeroType, tradingListData.toHeroValue, tradingListData.equipmentHash, tradingListData.toEquipmentType, tradingListData.toEquipmentValue, tradingListData.tradingState, tradingListData.buyBlockID, tradingListData.buyAddres);
        return result.lastID;
    }
    static async updateTradingListByblockID(db, blockID, buyAddres) {
        try {
            const result = await db.run('UPDATE tradingList SET buyAddres = ? WHERE blockID = ?', buyAddres, blockID);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateTradingListByblockID-failed: ${error}`);
        }
    }
    static async checkTradingExists(db, blockId) {
        const sql = `SELECT * FROM tradingList WHERE blockID = '${blockId}'`;
        const result = await db.get(sql);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    static async updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID) {
        try {
            const result = await db.run('UPDATE tradingList SET tradingState = ?, buyBlockID = ?, buyAddres = ? WHERE blockID = ?', tradingStateHeight, buyTransactionID, buyAddres, blockID);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateTradingListStatus-failed: ${error}`);
        }
    }
    static async selectTradingListOnlineAll(db, other) {
        try {
            let page = Number(other) * 8;
            let sql = `SELECT * FROM tradingList WHERE tradingState="0" ORDER BY did DESC LIMIT 8 OFFSET ${page}`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectTradingListDepositAll(db, other, addres) {
        try {
            let page = Number(other) * 8;
            let sql = `SELECT * FROM tradingList WHERE tradingState="0" and createAddres="${addres}" ORDER BY did DESC LIMIT 8 OFFSET ${page}`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectTradingListDepositAll-failed: ${error}`);
        }
    }
    static async deleteTradingListByblockIDAndCreateAddres(db, blockID, createAddres) {
        try {
            let sql = `DELETE FROM tradingList WHERE blockID = "${blockID}" AND EXISTS ( SELECT 1 FROM tradingList WHERE createAddres = "${createAddres}" AND blockID = "${blockID}" AND tradingState = "0")`;
            const result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`deleteTradingListByblockIDAndCreateAddres-failed: ${error}`);
        }
    }
    static async getTradingListByBlockId(db, blockId) {
        try {
            return await db.get("SELECT * FROM tradingList WHERE blockID = ? and tradingState='0'", blockId);
        }
        catch (error) {
            throw new Error(`getTradingListByBlockId-failed: ${error}`);
        }
    }
}
exports.tradingList = tradingList;
