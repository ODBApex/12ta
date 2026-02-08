"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldData = void 0;
class worldData {
    static async createWorldData(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS worldData (
		  did INTEGER PRIMARY KEY AUTOINCREMENT,
		  id TEXT NOT NULL UNIQUE,
		  tName TEXT NOT NULL,
		  type TEXT NOT NULL,
		  incrementType TEXT NOT NULL,
		  increment TEXT NOT NULL,
		  occupyAddres TEXT NOT NULL,
		  occupyBlock TEXT NOT NULL,
		  replaceTime TEXT NOT NULL,
		  ApplicantNumber TEXT NOT NULL,
		  Applicant TEXT NOT NULL
		)
	  `);
    }
    static async addWorldData(db, worldInfoData) {
        const result = await db.run('INSERT INTO worldData (id, tName, type, incrementType, increment, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant) VALUES (?,?,?,?,?,?,?,?,?,?)', worldInfoData.id, worldInfoData.tName, worldInfoData.type, worldInfoData.incrementType, worldInfoData.increment, worldInfoData.occupyAddres, worldInfoData.occupyBlock, worldInfoData.replaceTime, worldInfoData.ApplicantNumber, worldInfoData.Applicant);
        return result.lastID;
    }
    static async selectWorldDataInfo(db) {
        try {
            return await db.all('SELECT * FROM worldData');
        }
        catch (error) {
            throw new Error(`selectWorldDataInfo-failed: ${error}`);
        }
    }
    static async selectWorldDataPage(db, other) {
        try {
            let page = Number(other) * 30;
            let sql = `SELECT * FROM worldData WHERE type="100" ORDER BY did ASC LIMIT 30 OFFSET ${page}`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectWorldDataPage-failed: ${error}`);
        }
    }
    static async selectWorldDataPage8(db, other) {
        try {
            let page = (other - 1) * 1;
            let sql = `SELECT * FROM worldData WHERE type="100" ORDER BY did ASC LIMIT 1 OFFSET ${page}`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectWorldDataPage8-failed: ${error}`);
        }
    }
    static async selectWorldDataByID(db, other) {
        try {
            let sql = `SELECT * FROM worldData WHERE id="${other}"`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectWorldDataByID-failed: ${error}`);
        }
    }
    static async updateWorldData(db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id) {
        try {
            const result = await db.run('UPDATE worldData SET occupyAddres = ?,occupyBlock = ?,replaceTime = ?,ApplicantNumber = ?,Applicant = ? WHERE id = ?', occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateWorldData-failed: ${error}`);
        }
    }
    static async updateJoinWarData(db, warType, warValue, warAddres, warCost) {
        try {
            if (!warType || !warValue || !warAddres) {
                console.error("updateJoinWarData-Missing parameters for updateJoinWarData");
                return 0;
            }
            const existing = await db.get(`SELECT Applicant,occupyAddres FROM worldData 
				WHERE type = ? AND id = ?`, [warType, warValue]);
            if (!existing) {
                console.log(`updateJoinWarData-No matching record found for type=${warType}, id=${warValue}`);
                return 0;
            }
            if (existing.occupyAddres == warAddres) {
                console.log(`updateJoinWarData-occupyAddres: ${existing.occupyAddres} ,warAddres:${warAddres} -The occupier cannot participate in the competition`);
                return 0;
            }
            const applicantStr = existing.Applicant || '';
            const isExists = applicantStr.includes(`,${warAddres}`);
            if (isExists) {
                console.log(`updateJoinWarData-Applicant ${warAddres} already exists`);
                return 0;
            }
            const warriorCheck = await db.get(`SELECT warrior,heroList FROM addresRole 
				WHERE addres = ? 
				AND CAST(warrior AS INTEGER) >= ?`, [warAddres, warCost]);
            if (!warriorCheck) {
                console.log(`updateJoinWarData-Address ${warAddres} has insufficient warrior (needs >=${warCost})`);
                return 0;
            }
            if (warriorCheck.heroList.length <= 68) {
                console.log(`updateJoinWarData-3.2-warAddres:${warAddres} - No formation set`);
                return 0;
            }
            const sqlTemplate = `
				UPDATE worldData SET 
					Applicant = Applicant || ',' || ?, 
					ApplicantNumber = (CAST(ApplicantNumber AS INTEGER) + 1) || ''
				WHERE type = ? 
				AND id = ? 
				AND CAST(ApplicantNumber AS INTEGER) <= 10
			`;
            const params = [warAddres, warType, warValue];
            let sqlToLog = sqlTemplate;
            params.forEach((param, index) => {
                const value = typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : param;
                sqlToLog = sqlToLog.replace(`?`, value);
            });
            const result = await db.run(sqlTemplate, params);
            const updatedRows = (result.changes != null) ? result.changes : 0; //2026-01-30
            return updatedRows > 0 ? 1 : 0;
        }
        catch (error) {
            console.error(`updateJoinWarData error: ${error}`);
            return 0;
        }
    }
}
exports.worldData = worldData;
