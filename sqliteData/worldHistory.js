"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldHistory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sqlite3_1 = require("sqlite3");
class worldHistory {
    static async createWorldHistory(db) {
        await db.exec(`
        CREATE TABLE IF NOT EXISTS worldHistory (
          did INTEGER PRIMARY KEY AUTOINCREMENT,
          worldDataID TEXT NOT NULL,
          worldDatatype TEXT NOT NULL,
          blockReplaceTime TEXT NOT NULL,
          applicantNumber TEXT NOT NULL,
          applicantList TEXT NOT NULL,
          winAddress TEXT NOT NULL,
          generateBlock TEXT NOT NULL,
          playBack1 TEXT NOT NULL,
          playBack2 TEXT NOT NULL,
          playBack3 TEXT NOT NULL,
          playBack4 TEXT NOT NULL,
          playBack5 TEXT NOT NULL
        )
      `);
    }
    static async addWorldHistory(db, worldInfoData) {
        const result = await db.run('INSERT INTO worldHistory (worldDataID, worldDatatype, blockReplaceTime, applicantNumber, applicantList, winAddress, generateBlock,playBack1,playBack2,playBack3,playBack4,playBack5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', worldInfoData.worldDataID, worldInfoData.worldDatatype, worldInfoData.blockReplaceTime, worldInfoData.applicantNumber, worldInfoData.applicantList, worldInfoData.winAddress, worldInfoData.generateBlock, worldInfoData.playBack1, worldInfoData.playBack2, worldInfoData.playBack3, worldInfoData.playBack4, worldInfoData.playBack5);
        return result.lastID;
    }
    static async selectWorldDataInfo(db) {
        try {
            return await db.all('SELECT * FROM worldHistory');
        }
        catch (error) {
            throw new Error(`selectWorldDataInfo-failed: ${error}`);
        }
    }
    static async selectWorldHistoryPage6(db, other, worldDataID) {
        try {
            let page = Number(other) * 6;
            let sql = `SELECT * FROM worldHistory WHERE worldDataID="${worldDataID}" ORDER BY did DESC LIMIT 6 OFFSET ${page}`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectWorldHistoryPage6-failed: ${error}`);
        }
    }
    static async updateWorldHistoryPlayBack(db, worldDataID, blockReplaceTime, winAddress, playBack1, playBack2, playBack3, playBack4, playBack5) {
        try {
            let sql = `UPDATE worldHistory SET winAddress='${winAddress}',playBack1='${playBack1}',playBack2='${playBack2}',playBack3='${playBack3}',playBack4='${playBack4}',playBack5='${playBack5}' WHERE worldDataID = '${worldDataID}' and blockReplaceTime = '${blockReplaceTime}'`;
            const result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateWorldData-failed: ${error}`);
        }
    }
    static async deleteWorldHistoryByBlockReplaceTime(db, blockHeight) {
        try {
            let sql = `delete from worldHistory where blockReplaceTime<='${blockHeight}'`;
            const result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`deleteWorldHistoryByBlockReplaceTime-failed: ${error}`);
        }
    }
    static async backupAndCleanupTable(db, blockHeight) {
        const allowedTables = ['worldHistory'];
        const tableName = 'worldHistory';
        if (!allowedTables.includes(tableName)) {
            throw new Error(`Tables that are not allowed to be operated on: ${tableName}`);
        }
        const uBlockReplaceTime = Number(blockHeight) - 2000;
        if (isNaN(uBlockReplaceTime)) {
            throw new Error(`Invalid blockHeight value: ${blockHeight}`);
        }
        const backupDir = path_1.default.join(__dirname, '../../database/backup');
        if (!fs_1.default.existsSync(backupDir)) {
            fs_1.default.mkdirSync(backupDir, { recursive: true });
        }
        const backupFileName = `worldHistory_backup_${blockHeight}.db`;
        const backupDbPath = path_1.default.join(backupDir, backupFileName);
        if (!/^worldHistory_backup_\d+\.db$/.test(backupFileName)) {
            throw new Error(`Invalid backup file name: ${backupFileName}`);
        }
        if (fs_1.default.existsSync(backupDbPath)) {
            throw new Error(`The backup file already exists to avoid overwriting: ${backupDbPath}`);
        }
        try {
            await new Promise((resolve, reject) => {
                const tempDb = new sqlite3_1.Database(backupDbPath, (err) => {
                    if (err)
                        reject(err);
                    else
                        tempDb.close((err) => err ? reject(err) : resolve(null));
                });
            });
        }
        catch (err) {
            throw new Error(`Failed to create backup file: ${err.message}`);
        }
        try {
            await db.run(`ATTACH DATABASE '${backupDbPath}' AS table_backup`);
            await db.run(`
          CREATE TABLE IF NOT EXISTS table_backup.${tableName} AS 
          SELECT * FROM main.${tableName} WHERE blockReplaceTime <= ?
        `, [uBlockReplaceTime]);
            const indexes = await db.all(`SELECT sql, name FROM main.sqlite_master WHERE type='index' AND tbl_name=?`, [tableName]);
            if (indexes.length > 0) {
                for (const index of indexes) {
                    const indexSql = index.sql
                        .replace(/(CREATE\s+INDEX\s+)(IF NOT EXISTS\s+)?([^ ]+)/, `$1$2table_backup.$3`)
                        .replace(/main\.([a-zA-Z0-9_]+)/g, 'table_backup.$1');
                    await db.run(indexSql);
                }
            }
            await db.run('DETACH DATABASE table_backup');
            await db.run('BEGIN IMMEDIATE TRANSACTION');
            const deleteResult = await db.run(`DELETE FROM main.${tableName} WHERE blockReplaceTime <= ?`, [uBlockReplaceTime]);
            await db.run('COMMIT');
        }
        catch (error) {
            try {
                await db.run('ROLLBACK');
            }
            catch (rollbackError) {
                console.error('Rollback operation failed:', rollbackError);
            }
            if (fs_1.default.existsSync(backupDbPath)) {
                try {
                    fs_1.default.unlinkSync(backupDbPath);
                }
                catch (e) {
                    console.error(`Unable to clean damaged backup files: ${backupDbPath}`);
                }
            }
            console.error('Operation failed, attempted to recover:', error);
        }
    }
}
exports.worldHistory = worldHistory;
