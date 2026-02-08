"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addresRole = void 0;
class addresRole {
    static async createAddresRole(db) {
        await db.exec(`
		CREATE TABLE IF NOT EXISTS addresRole (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  did TEXT NOT NULL,
		  name TEXT NOT NULL,
		  addres TEXT NOT NULL UNIQUE,
		  monthlyCard TEXT NOT NULL,
		  createDate TEXT NOT NULL,

		  grain TEXT NOT NULL,
		  wood TEXT NOT NULL,
		  ironOre TEXT NOT NULL,
		  warrior TEXT NOT NULL,
		  silverCoin TEXT NOT NULL,
		  refinedIron TEXT NOT NULL,
		  vodka TEXT NOT NULL,

		  addGrain TEXT NOT NULL,
		  addWood TEXT NOT NULL,
		  addIronOre TEXT NOT NULL,
		  addWarrior TEXT NOT NULL,
		  addSilverCoin TEXT NOT NULL,

		  grainCeiling TEXT NOT NULL,
		  woodCeiling TEXT NOT NULL,
		  ironOreCeiling TEXT NOT NULL,
		  warriorCeiling TEXT NOT NULL,

		  grainLevel TEXT NOT NULL,
		  woodLevel TEXT NOT NULL,
		  ironOreLevel TEXT NOT NULL,
		  warriorLevel TEXT NOT NULL,

		  heroList TEXT NOT NULL,
		  warHeroes1 TEXT NOT NULL,
		  warHeroes2 TEXT NOT NULL,
		  warHeroes3 TEXT NOT NULL,
		  warHeroes4 TEXT NOT NULL,
		  warHeroes5 TEXT NOT NULL,

		  heroValueList TEXT NOT NULL,
		  warHeroValue1 TEXT NOT NULL,
		  warHeroValue2 TEXT NOT NULL,
		  warHeroValue3 TEXT NOT NULL,
		  warHeroValue4 TEXT NOT NULL,
		  warHeroValue5 TEXT NOT NULL,

		  equipmentList TEXT NOT NULL,
		  equipment1 TEXT NOT NULL,
		  equipment2 TEXT NOT NULL,
		  equipment3 TEXT NOT NULL,
		  equipment4 TEXT NOT NULL,
		  equipment5 TEXT NOT NULL,
		  equipment6 TEXT NOT NULL,
		  equipment7 TEXT NOT NULL,
		  equipment8 TEXT NOT NULL,

		  world TEXT NOT NULL,
		  trading TEXT NOT NULL,
		  fusion TEXT NOT NULL,
		  shops TEXT NOT NULL,
		  nobility TEXT NOT NULL,
		  appellation TEXT NOT NULL,
		  city TEXT NOT NULL,
		  invasion TEXT NOT NULL,
		  ceasefire TEXT NOT NULL
		)
	  `);
    }
    static async addAddresRole(db, roleData) {
        const result = await db.run('INSERT INTO addresRole (did,name,addres,monthlyCard,createDate,grain,wood,ironOre,warrior,silverCoin,refinedIron,vodka,addGrain,addWood,addIronOre,addWarrior,addSilverCoin,grainCeiling,woodCeiling,ironOreCeiling,warriorCeiling,grainLevel,woodLevel,ironOreLevel,warriorLevel,heroList,warHeroes1,warHeroes2,warHeroes3,warHeroes4,warHeroes5,heroValueList,warHeroValue1,warHeroValue2,warHeroValue3,warHeroValue4,warHeroValue5,equipmentList,equipment1,equipment2,equipment3,equipment4,equipment5,equipment6,equipment7,equipment8,world,trading,fusion,shops,nobility,appellation,city,invasion,ceasefire) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', roleData.did, roleData.name, roleData.addres, roleData.monthlyCard, roleData.createDate, roleData.grain, roleData.wood, roleData.ironOre, roleData.warrior, roleData.silverCoin, roleData.refinedIron, roleData.vodka, roleData.addGrain, roleData.addWood, roleData.addIronOre, roleData.addWarrior, roleData.addSilverCoin, roleData.grainCeiling, roleData.woodCeiling, roleData.ironOreCeiling, roleData.warriorCeiling, roleData.grainLevel, roleData.woodLevel, roleData.ironOreLevel, roleData.warriorLevel, roleData.heroList, roleData.warHeroes1, roleData.warHeroes2, roleData.warHeroes3, roleData.warHeroes4, roleData.warHeroes5, roleData.heroValueList, roleData.warHeroes1, roleData.warHeroes2, roleData.warHeroes3, roleData.warHeroes4, roleData.warHeroes5, roleData.equipmentList, roleData.equipment1, roleData.equipment2, roleData.equipment3, roleData.equipment4, roleData.equipment5, roleData.equipment6, roleData.equipment7, roleData.equipment8, roleData.world, roleData.trading, roleData.fusion, roleData.shops, roleData.nobility, roleData.appellation, roleData.city, roleData.invasion, roleData.ceasefire);
        return result.lastID;
    }
    static async selectAddresRole(db) {
        try {
            return await db.all('SELECT * FROM addresRole');
        }
        catch (error) {
            throw new Error(`selectAddresRole-failed: ${error}`);
        }
    }
    static async selectAddresRoleByAddres(db, addres) {
        try {
            return await db.get('SELECT * FROM addresRole WHERE addres = ?', addres);
        }
        catch (error) {
            throw new Error(`selectBlockInfoByHeight-failed: ${error}`);
        }
    }
    static async selectARHeroListByAddresses(db, defenderAddres, attackerAddres) {
        try {
            const orderCases = `
				WHEN '${defenderAddres}' THEN 1
				WHEN '${attackerAddres}' THEN 2
			`;
            const sql = `
				SELECT heroList,heroValueList
				FROM addresRole 
				WHERE addres IN ('${defenderAddres}', '${attackerAddres}')
				ORDER BY CASE addres ${orderCases} END
			`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectHeroListByAddresses-failed: ${error}`);
        }
    }
    static async selectARHeroListByArrayAddres(db, addresses) {
        try {
            const addressValues = addresses.map(addr => `'${addr}'`).join(',');
            const orderCases = addresses.map((addr, index) => `WHEN '${addr}' THEN ${index + 1}`).join(' ');
            const sql = `
				SELECT heroList,warHeroValue1,warHeroValue2,warHeroValue3,warHeroValue4,warHeroValue5,warHeroes1,warHeroes2,warHeroes3,warHeroes4,warHeroes5,addres
				FROM addresRole 
				WHERE addres IN (${addressValues})
				ORDER BY CASE addres ${orderCases} END
			`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectHeroListByAddresses-failed: ${error}`);
        }
    }
    static async selectARIsWarHeroes(db, addres, warHeroes) {
        try {
            const sql = `
				SELECT addres, warHeroes1, warHeroes2, warHeroes3, warHeroes4, warHeroes5
				FROM addresRole
				WHERE addres = '${addres}'
				AND '${warHeroes}' IN (warHeroes1, warHeroes2, warHeroes3, warHeroes4, warHeroes5)
			`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectARIsWarHeroes-failed: ${error}`);
        }
    }
    static async selectARIsWarEquipment(db, addres, warEquipment) {
        try {
            const sql = `
				SELECT addres, equipment1, equipment2, equipment3, equipment4, equipment5, equipment6, equipment7, equipment8
				FROM addresRole
				WHERE addres = '${addres}'
				AND '${warEquipment}' IN (equipment1, equipment2, equipment3, equipment4, equipment5, equipment6, equipment7, equipment8)
			`;
            return await db.all(sql);
        }
        catch (error) {
            throw new Error(`selectARIsWarEquipment-failed: ${error}`);
        }
    }
    static async selectAddresSilverCoinNum(db, ownerAddres) {
        try {
            let sql = `SELECT silverCoin AS num FROM addresRole WHERE addres = '${ownerAddres}'`;
            let num = await db.get(sql);
            return num;
        }
        catch (error) {
            throw new Error(`selectAddresSilverCoinNum-failed: ${error}`);
        }
    }
    static async updateARbyResource(db, height) {
        try {
            const result = await db.run('UPDATE addresRole SET grain = MIN(grain + addGrain, CAST(grainCeiling AS INTEGER)),wood = MIN(wood + addWood, CAST(woodCeiling AS INTEGER)),ironOre = MIN(ironOre + addIronOre, CAST(ironOreCeiling AS INTEGER)),warrior = MIN(warrior + addWarrior, CAST(warriorCeiling AS INTEGER)),silverCoin = silverCoin + addSilverCoin where CAST(monthlyCard AS INTEGER)>=?', height);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyGrain-failed: ${error}`);
        }
    }
    static async updateARbyWarResource(db) {
        try {
            const worldRecords = await db.all(`SELECT occupyAddres FROM worldData 
				WHERE occupyAddres IS NOT NULL AND occupyAddres != ''`);
            const occupyAddresses = worldRecords.map(record => record.occupyAddres);
            if (occupyAddresses.length === 0) {
                return 0;
            }
            const placeholders = occupyAddresses.map(() => '?').join(',');
            const result = await db.run(`UPDATE addresRole 
				SET silverCoin = (CAST(silverCoin AS INTEGER) + 4000) || '' 
				WHERE addres IN (${placeholders})`, occupyAddresses);
            const totalUpdated = (result.changes != null) ? result.changes : 0; //2026-01-29
            return totalUpdated;
        }
        catch (error) {
            console.error(`updateARbyWarResource error: ${error}`);
            throw error;
        }
    }
    static async updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount) {
        try {
            let sql1 = `UPDATE addresRole SET ${resourceType} = CAST(${resourceType} AS INTEGER) - ${srcAmount} WHERE addres = '${srcAddres}' AND (CAST(${resourceType} AS INTEGER)) >= ${srcAmount}`;
            await db.run(sql1).then(async (result) => {
                const updatedRows = (result.changes != null) ? result.changes : 0; //2026-01-29
                const upRows = updatedRows > 0 ? 1 : 0;
                if (upRows > 0) {
                    let sql2 = `UPDATE addresRole SET ${resourceType} = CAST(${resourceType} AS INTEGER) + ${srcAmount} WHERE addres = '${dstAddres}'`;
                    const resultTwo = await db.run(sql2);
                    const updatedResultRows = (resultTwo.changes != null) ? resultTwo.changes : 0; //2026-01-29
                    return updatedResultRows;
                }
                else {
                    return upRows;
                }
            }).catch((error) => { console.error(error); });
        }
        catch (error) {
            console.error(`updateARbySendResource error: ${error}`);
            throw error;
        }
    }
    static async updateARbyCreateTradeResourceExchange(db, addres, typeValue) {
        const consume1 = ["50000", "20000", "10000", "100"];
        const consume2 = ["10000", "30000", "40000", "100"];
        try {
            let sqlArray = [
                `wood = CAST(wood AS INTEGER) - ${consume1[1]}`,
                `ironOre = CAST(ironOre AS INTEGER) - ${consume1[0]}`,
                `warrior = CAST(warrior AS INTEGER) - ${consume1[2]}`,
                `refinedIron = refinedIron + ${consume1[3]}`,
                `AND (CAST(wood AS INTEGER) - ${consume1[1]}) >= 0`,
                `AND (CAST(ironOre AS INTEGER) - ${consume1[0]}) >= 0`,
                `AND (CAST(warrior AS INTEGER) - ${consume1[2]}) >= 0`
            ];
            if (typeValue == "vodka") {
                sqlArray = [
                    `grain = CAST(grain AS INTEGER) - ${consume2[0]}`,
                    `wood = CAST(wood AS INTEGER) - ${consume2[1]}`,
                    `warrior = CAST(warrior AS INTEGER) - ${consume2[2]}`,
                    `vodka = vodka + ${consume2[3]}`,
                    `AND (CAST(grain AS INTEGER) - ${consume2[0]}) >= 0`,
                    `AND (CAST(wood AS INTEGER) - ${consume2[1]}) >= 0`,
                    `AND (CAST(warrior AS INTEGER) - ${consume2[2]}) >= 0`
                ];
            }
            let sql = `UPDATE addresRole SET ${sqlArray["0"]} ,${sqlArray["1"]} ,${sqlArray["2"]} ,${sqlArray["3"]} WHERE addres = '${addres}' ${sqlArray["4"]} ${sqlArray["5"]} ${sqlArray["6"]}`;
            const result = await db.run(sql);
            const updatedRows = (result.changes != null) ? result.changes : 0; //2026-01-29
            return updatedRows > 0 ? 1 : 0;
        }
        catch (error) {
            throw new Error(`updateARbyCreateTradeResourceExchange-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn) {
        if (Number(ptn) < 0) {
            return 0;
        }
        try {
            let sqlArray = [
                "",
                `grain = CASE WHEN (CAST(grain AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0 THEN CAST(grain AS INTEGER) - CAST(${ptn} AS INTEGER) ELSE grain END`,
                `wood = CASE WHEN (CAST(wood AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0 THEN CAST(wood AS INTEGER) - CAST(${ptn} AS INTEGER) ELSE wood END`,
                `ironOre = CASE WHEN (CAST(ironOre AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0 THEN CAST(ironOre AS INTEGER) - CAST(${ptn} AS INTEGER) ELSE ironOre END`,
                `warrior = CASE WHEN (CAST(warrior AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0 THEN CAST(warrior AS INTEGER) - CAST(${ptn} AS INTEGER) ELSE warrior END`,
                `silverCoin = CASE WHEN (CAST(silverCoin AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0 THEN CAST(silverCoin AS INTEGER) - CAST(${ptn} AS INTEGER) ELSE silverCoin END`
            ];
            let sqlArrayRequirement = [
                "",
                `AND (CAST(grain AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0`,
                `AND (CAST(wood AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0`,
                `AND (CAST(ironOre AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0`,
                `AND (CAST(warrior AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0`,
                `AND (CAST(silverCoin AS INTEGER) - CAST(${ptn} AS INTEGER)) >= 0`
            ];
            const sql = `UPDATE addresRole SET ${sqlArray[Number(pt)]} WHERE addres = '${addres}' ${sqlArrayRequirement[Number(pt)]}`;
            const result = await db.run(sql);
            const updatedRows = (result.changes != null) ? result.changes : 0; //2026-01-29
            return updatedRows > 0 ? 1 : 0;
        }
        catch (error) {
            throw new Error(`updateARbyCreateTradeResource-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceAdd(db, addres, pt, ptn) {
        try {
            let sqlArray = [
                "",
                `grain = MIN(grain + ${ptn}, CAST(grainCeiling AS INTEGER))`,
                `wood = MIN(wood + ${ptn}, CAST(woodCeiling AS INTEGER))`,
                `ironOre = MIN(ironOre + ${ptn}, CAST(ironOreCeiling AS INTEGER))`,
                "",
                `silverCoin = silverCoin + ${ptn}`
            ];
            const sql = `UPDATE addresRole SET ${sqlArray[Number(pt)]} WHERE addres = '${addres}'`;
            const result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyCreateTradeResourceAdd-failed: ${error}`);
        }
    }
    static async updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height) {
        try {
            const result = await db.run('UPDATE addresRole SET monthlyCard = CASE WHEN monthlyCard > ? THEN monthlyCard + ? ELSE ? + ? END WHERE addres=?', height, monthlyCard, height, monthlyCard, addres);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToMonthlyCard-failed: ${error}`);
        }
    }
    //
    static async updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres) {
        try {
            const result = await db.run('UPDATE addresRole SET grain=grain-?,wood=wood-?,ironOre=ironOre-?,silverCoin=silverCoin-?,grainCeiling=?,woodCeiling=?,ironOreCeiling=?,warriorCeiling=?,grainLevel=?,woodLevel=?,ironOreLevel=?,warriorLevel=? WHERE addres = ? AND (CAST(grain AS INTEGER) - CAST(? AS INTEGER)) >= 0 AND (CAST(wood AS INTEGER) - CAST(? AS INTEGER)) >= 0 AND (CAST(ironOre AS INTEGER) - CAST(? AS INTEGER)) >= 0 AND (CAST(silverCoin AS INTEGER) - CAST(? AS INTEGER)) >= 0', parseInt(grain), parseInt(wood), parseInt(ironOre), parseInt(silverCoin), grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres, parseInt(grain), parseInt(wood), parseInt(ironOre), parseInt(silverCoin));
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToRUpgrade-failed: ${error}`);
        }
    }
    static async updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue) {
        try {
            let heroPos = ["", "warHeroes1", "warHeroes2", "warHeroes3", "warHeroes4", "warHeroes5"];
            let heroPosValue = `${heroPos[Number(amt)]}='${newHeroHash}'`;
            let heroValuePos = ["", "warHeroValue1", "warHeroValue2", "warHeroValue3", "warHeroValue4", "warHeroValue5"];
            let heroValuePosValue = `${heroValuePos[Number(amt)]}='${heroValue}'`;
            let sql = `UPDATE addresRole SET ${heroPosValue},${heroValuePosValue} WHERE addres = '${addres}'`;
            let result = await db.run(sql);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToHeroPosition-failed: ${error}`);
        }
    }
    static async updateARbyAddresToHeroList(db, heroList, addres) {
        try {
            const result = await db.run('UPDATE addresRole SET heroList=? WHERE addres = ?', heroList, addres);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToHeroList-failed: ${error}`);
        }
    }
    static async updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres) {
        try {
            const result = await db.run('UPDATE addresRole SET silverCoin=silverCoin-?,vodka=vodka-? WHERE addres = ? AND (CAST(silverCoin AS INTEGER) - CAST(? AS INTEGER)) >= 0 AND (CAST(vodka AS INTEGER) - CAST(? AS INTEGER)) >= 0', parseInt(silverCoin), parseInt(vodka), addres, parseInt(silverCoin), parseInt(vodka));
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToCreateHeroExpend-failed: ${error}`);
        }
    }
    static async updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2) {
        let field = ["addGrain", "addWood", "addIronOre", "addWarrior"];
        let equipmentPos = ["equipment1", "equipment2", "equipment3", "equipment4", "equipment5", "equipment6", "equipment7", "equipment8"];
        let dataValue = "";
        let dataValue2 = "";
        if (equipmentValueType == equipmentValueType2) {
            dataValue = `,${field[Number(equipmentValueType)]}=${field[Number(equipmentValueType)]} - ${Number(equipmentValue2)}+ ${Number(equipmentValue)}`;
        }
        else {
            dataValue = `,${field[Number(equipmentValueType)]}=${field[Number(equipmentValueType)]} ${calculation} ${equipmentValue}`;
            if (equipmentValueType2.length >= 1 && equipmentValue2.length >= 1 && calculation2.length >= 1) {
                dataValue2 = `,${field[Number(equipmentValueType2)]}=${field[Number(equipmentValueType2)]} ${calculation2} ${equipmentValue2}`;
            }
        }
        let equipmentPosValue = `${equipmentPos[Number(equipmentType)]}='${newEquipmentHash}'`;
        try {
            let sql = `UPDATE addresRole SET ${equipmentPosValue} ${dataValue} ${dataValue2} WHERE addres = ?`;
            let result = await db.run(sql, addres);
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToEquipmentPosition-failed: ${error}`);
        }
    }
    static async updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres) {
        try {
            const result = await db.run('UPDATE addresRole SET silverCoin=silverCoin-?,refinedIron=refinedIron-? WHERE addres = ? AND (CAST(silverCoin AS INTEGER) - CAST(? AS INTEGER)) >= 0 AND (CAST(refinedIron AS INTEGER) - CAST(? AS INTEGER)) >= 0', parseInt(silverCoin), parseInt(refinedIron), addres, parseInt(silverCoin), parseInt(refinedIron));
            return result.lastID;
        }
        catch (error) {
            throw new Error(`updateARbyAddresToCreateEquipmentExpend-failed: ${error}`);
        }
    }
}
exports.addresRole = addresRole;
