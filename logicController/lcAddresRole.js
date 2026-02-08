"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcAddresRole = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
class lcAddresRole {
    static async updateARbyResource(server, db, height, addres) {
        return await conSQLConfig_1.conSQLConfig.updateARbyResource(db, height);
    }
    static async updateARbyWarResource(db) {
        return await conSQLConfig_1.conSQLConfig.updateARbyWarResource(db);
    }
    static async updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount) {
        try {
            return conSQLConfig_1.conSQLConfig.updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount);
        }
        catch (error) {
            console.error(`updateARbySendResource-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceExchange(db, addres, typeValue) {
        try {
            return conSQLConfig_1.conSQLConfig.updateARbyCreateTradeResourceExchange(db, addres, typeValue);
        }
        catch (error) {
            console.error(`updateARbyCreateTradeResourceExchange-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn) {
        try {
            return conSQLConfig_1.conSQLConfig.updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn);
        }
        catch (error) {
            console.error(`updateTradingListByblockID-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceAdd(db, addres, pt, ptn) {
        return conSQLConfig_1.conSQLConfig.updateARbyCreateTradeResourceAdd(db, addres, pt, ptn);
    }
    static async updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height) {
        await conSQLConfig_1.conSQLConfig.updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height);
    }
    static async updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres) {
        return conSQLConfig_1.conSQLConfig.updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres);
    }
    static async updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue) {
        return conSQLConfig_1.conSQLConfig.updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue);
    }
    static async updateARbyAddresToHeroList(server, db, heroList, addres) {
        conSQLConfig_1.conSQLConfig.updateARbyAddresToHeroList(db, heroList, addres).then(async (result) => {
        }).catch((error) => { console.error(error); });
    }
    static async updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres) {
        return conSQLConfig_1.conSQLConfig.updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres);
    }
    static async updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2) {
        return conSQLConfig_1.conSQLConfig.updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2);
    }
    static async updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres) {
        return conSQLConfig_1.conSQLConfig.updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres);
    }
    static async getAddresRoleByAddres(server, currentConn, db, addres) {
        await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, addres).then((result) => {
            let valueIsUndefined = true;
            if (!result) {
                valueIsUndefined = false;
            }
            let sendChatConst = {
                type: "20001",
                other: server.connections.length + "",
                content: "",
                time: new Date()
            };
            if (valueIsUndefined) {
                let jsonR = JSON.stringify(result);
                sendChatConst = {
                    type: "20001",
                    other: server.connections.length + "",
                    content: jsonR,
                    time: new Date()
                };
            }
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getAddresRoleByAddresToHome(server, currentConn, db, addres) {
        await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, addres).then((result) => {
            let valueIsUndefined = true;
            if (!result) {
                valueIsUndefined = false;
            }
            let sendChatConst = {
                type: "30001",
                other: "",
                content: "",
                time: new Date()
            };
            if (valueIsUndefined) {
                let jsonR = JSON.stringify(result);
                sendChatConst = {
                    type: "30001",
                    other: "",
                    content: jsonR,
                    time: new Date()
                };
            }
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getARHeroListByAddresses(db, defenderAddres, attackerAddres) {
        return conSQLConfig_1.conSQLConfig.selectARHeroListByAddresses(db, defenderAddres, attackerAddres);
    }
    static async getARHeroListByArrayAddres(db, addresses) {
        return conSQLConfig_1.conSQLConfig.selectARHeroListByArrayAddres(db, addresses);
    }
    static async getARIsWarHeroes(db, addres, warHeroes) {
        return conSQLConfig_1.conSQLConfig.selectARIsWarHeroes(db, addres, warHeroes);
    }
    static async getARIsWarEquipment(db, addres, warEquipment) {
        return conSQLConfig_1.conSQLConfig.selectARIsWarEquipment(db, addres, warEquipment);
    }
    static async selectAddresSilverCoinNum(currentConn, db, ownerAddres) {
        conSQLConfig_1.conSQLConfig.selectAddresSilverCoinNum(db, ownerAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "21002",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async addAddresRole(server, db, addres, monthlyCard, height) {
        return await conSQLConfig_1.conSQLConfig.addAddresRole(db, {
            did: "",
            name: "",
            addres: addres,
            monthlyCard: (parseInt(height) + parseInt(monthlyCard)) + "",
            createDate: height,
            grain: "0",
            wood: "0",
            ironOre: "0",
            warrior: "0",
            silverCoin: "0",
            refinedIron: "0",
            vodka: "0",
            addGrain: "1",
            addWood: "1",
            addIronOre: "1",
            addWarrior: "1",
            addSilverCoin: "0",
            grainCeiling: "1500",
            woodCeiling: "1500",
            ironOreCeiling: "1500",
            warriorCeiling: "1500",
            grainLevel: "1",
            woodLevel: "1",
            ironOreLevel: "1",
            warriorLevel: "1",
            heroList: "",
            warHeroes1: '"","","","",""',
            warHeroes2: "",
            warHeroes3: "",
            warHeroes4: "",
            warHeroes5: "",
            heroValueList: '"","","","","",""',
            warHeroValue1: "",
            warHeroValue2: "",
            warHeroValue3: "",
            warHeroValue4: "",
            warHeroValue5: "",
            equipmentList: "",
            equipment1: '"","","","","","","",""',
            equipment2: "",
            equipment3: "",
            equipment4: "",
            equipment5: "",
            equipment6: "",
            equipment7: "",
            equipment8: "",
            world: "0",
            trading: "0",
            fusion: "0",
            shops: "0",
            nobility: "0",
            appellation: "0",
            city: "0",
            invasion: "0",
            ceasefire: "0"
        });
    }
}
exports.lcAddresRole = lcAddresRole;
