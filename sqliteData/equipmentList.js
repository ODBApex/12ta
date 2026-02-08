"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipmentList = void 0;
class equipmentList {
    static async createEquipmentList(db) {
        await db.exec(`
		
		CREATE TABLE IF NOT EXISTS equipmentList (
		  did INTEGER PRIMARY KEY AUTOINCREMENT,
		  block TEXT NOT NULL,
		  blockHeight TEXT NOT NULL,
		  blockID TEXT NOT NULL,
		  equipmentAddres TEXT NOT NULL,
		  ownerAddres TEXT NOT NULL,
		  equipmentType TEXT NOT NULL,
		  equipmentValueType TEXT NOT NULL,
		  equipmentValue TEXT NOT NULL,
		  gem TEXT NOT NULL,
		  enhance TEXT NOT NULL,
		  isTrading TEXT NOT NULL,
		  tradingID TEXT NOT NULL,
		  tradeHistory TEXT NOT NULL
		)
	  `);
    }
    static async addEquipmentList(db, equipmentListData) {
        const result = await db.run('INSERT INTO equipmentList (block,blockHeight,blockID,equipmentAddres,ownerAddres,equipmentType,equipmentValueType,equipmentValue,gem,enhance,isTrading,tradingID,tradeHistory) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', equipmentListData.block, equipmentListData.blockHeight, equipmentListData.blockID, equipmentListData.equipmentAddres, equipmentListData.ownerAddres, equipmentListData.equipmentType, equipmentListData.equipmentValueType, equipmentListData.equipmentValue, equipmentListData.gem, equipmentListData.enhance, equipmentListData.isTrading, equipmentListData.tradingID, equipmentListData.tradeHistory);
        return result.lastID;
    }
    static async updateEquipmentListByblockID(db, blockID, ownerAddres) {
        try {
            const result = await db.run('UPDATE equipmentList SET ownerAddres = ? WHERE blockID = ?', ownerAddres, blockID);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateEquipmentListByblockID-failed: ${error}`);
        }
    }
    static async updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading) {
        try {
            const result = await db.run('UPDATE equipmentList SET isTrading = ? WHERE blockID = ?', isTrading, blockID);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateEquipmentListByBlockIDUIsTrading-failed: ${error}`);
        }
    }
    static async updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        try {
            const sql = `UPDATE equipmentList SET ownerAddres = '${ownerAddres}',isTrading = '${isTrading}',tradingID = '${blockHeight}',tradeHistory = tradeHistory||',${tradeID}' WHERE blockID = '${blockID}'`;
            const result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateEquipmentListByBlockIDENDTrading-failed: ${error}`);
        }
    }
    static async selectEquipmentListByAddres(db, ownerAddres) {
        try {
            return await db.all('SELECT * FROM equipmentList WHERE ownerAddres = ?', ownerAddres);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectEquipmentListByEquipmentHash(db, equipmentHash, ownerAddres) {
        try {
            let sql = `SELECT * FROM equipmentList WHERE blockID = '${equipmentHash}' and ownerAddres = '${ownerAddres}'`;
            return await db.get(sql);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash) {
        try {
            let equipment = await db.get('SELECT * FROM equipmentList WHERE blockID = ?', equipmentHash);
            return equipment;
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectAddresEquipmentNum(db, ownerAddres) {
        try {
            let sql = `SELECT COUNT(*) AS num FROM equipmentList WHERE ownerAddres = '${ownerAddres}'`;
            let num = await db.get(sql);
            return num;
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
}
exports.equipmentList = equipmentList;
