"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conSQLConfig = void 0;
const sqliteDataInit_1 = require("./init/sqliteDataInit");
const createTable_1 = require("./createTable");
const blockInfo_1 = require("./blockInfo");
const addresRole_1 = require("./addresRole");
const worldData_1 = require("./worldData");
const worldHistory_1 = require("./worldHistory");
const cityData_1 = require("./cityData");
const shopsData_1 = require("./shopsData");
const heroList_1 = require("./heroList");
const equipmentList_1 = require("./equipmentList");
const tradingList_1 = require("./tradingList");
class conSQLConfig {
    static async initDB() {
        const db = await sqliteDataInit_1.sqliteDataInit.initDB();
        return db;
    }
    static async isSQLDataTable(db, name) {
        try {
            return await db.get('SELECT name FROM sqlite_master WHERE type="table" AND name=?', name);
        }
        catch (error) {
            console.error(`isSQLDataTable-failed: ${error}`);
        }
    }
    static async createBlockInfo(db) {
        return blockInfo_1.blockInfo.createBlockInfo(db);
    }
    static async addBlockInfo(db, blockInfoData) {
        return blockInfo_1.blockInfo.addBlockInfo(db, blockInfoData);
    }
    static async selectBlockInfo(db) {
        return blockInfo_1.blockInfo.selectBlockInfo(db);
    }
    static async selectBlockInfoByHeight(db, height) {
        return blockInfo_1.blockInfo.selectBlockInfoByHeight(db, height);
    }
    static async selectMaxBlockInfoHeight(db) {
        return blockInfo_1.blockInfo.selectMaxBlockInfoHeight(db);
    }
    static async updateBlockInfo(db, data, height) {
        return blockInfo_1.blockInfo.updateBlockInfo(db, data, height);
    }
    static async deleteBlockInfo(db, height) {
        return blockInfo_1.blockInfo.deleteBlockInfo(db, height);
    }
    static async createTable(db) {
        createTable_1.createTable.createTable(db);
    }
    static async createAddresRole(db) {
        return addresRole_1.addresRole.createAddresRole(db);
    }
    static async addAddresRole(db, roleData) {
        return addresRole_1.addresRole.addAddresRole(db, roleData);
    }
    static async selectAddresRole(db) {
        return addresRole_1.addresRole.selectAddresRole(db);
    }
    static async selectAddresRoleByAddres(db, addres) {
        return addresRole_1.addresRole.selectAddresRoleByAddres(db, addres);
    }
    static async selectARHeroListByAddresses(db, defenderAddres, attackerAddres) {
        return addresRole_1.addresRole.selectARHeroListByAddresses(db, defenderAddres, attackerAddres);
    }
    static async selectARHeroListByArrayAddres(db, addresses) {
        return addresRole_1.addresRole.selectARHeroListByArrayAddres(db, addresses);
    }
    static async selectARIsWarHeroes(db, addres, warHeroes) {
        return addresRole_1.addresRole.selectARIsWarHeroes(db, addres, warHeroes);
    }
    static async selectARIsWarEquipment(db, addres, warEquipment) {
        return addresRole_1.addresRole.selectARIsWarEquipment(db, addres, warEquipment);
    }
    static async selectAddresSilverCoinNum(db, ownerAddres) {
        return addresRole_1.addresRole.selectAddresSilverCoinNum(db, ownerAddres);
    }
    static async updateARbyResource(db, height) {
        return addresRole_1.addresRole.updateARbyResource(db, height);
    }
    static async updateARbyWarResource(db) {
        return addresRole_1.addresRole.updateARbyWarResource(db);
    }
    static async updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount) {
        try {
            return addresRole_1.addresRole.updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount);
        }
        catch (error) {
            console.error(`updateARbySendResource-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceExchange(db, addres, typeValue) {
        try {
            return addresRole_1.addresRole.updateARbyCreateTradeResourceExchange(db, addres, typeValue);
        }
        catch (error) {
            console.error(`updateARbyCreateTradeResourceExchange-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn) {
        try {
            return addresRole_1.addresRole.updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn);
        }
        catch (error) {
            console.error(`updateTradingListByblockID-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceAdd(db, addres, pt, ptn) {
        return addresRole_1.addresRole.updateARbyCreateTradeResourceAdd(db, addres, pt, ptn);
    }
    static async updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height) {
        return addresRole_1.addresRole.updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height);
    }
    static async updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres) {
        return addresRole_1.addresRole.updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres);
    }
    static async updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue) {
        return addresRole_1.addresRole.updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue);
    }
    static async updateARbyAddresToHeroList(db, heroList, addres) {
        return addresRole_1.addresRole.updateARbyAddresToHeroList(db, heroList, addres);
    }
    static async updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres) {
        return addresRole_1.addresRole.updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres);
    }
    static async updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2) {
        return addresRole_1.addresRole.updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2);
    }
    static async updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres) {
        return addresRole_1.addresRole.updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres);
    }
    static async createWorldData(db) {
        worldData_1.worldData.createWorldData(db);
    }
    static async addWorldData(db, worldInfoData) {
        return worldData_1.worldData.addWorldData(db, worldInfoData);
    }
    static async selectWorldDataInfo(db) {
        return worldData_1.worldData.selectWorldDataInfo(db);
    }
    static async selectWorldDataPage(db, other) {
        return worldData_1.worldData.selectWorldDataPage(db, other);
    }
    static async selectWorldDataPage8(db, other) {
        return worldData_1.worldData.selectWorldDataPage8(db, other);
    }
    static async selectWorldDataByID(db, other) {
        return worldData_1.worldData.selectWorldDataByID(db, other);
    }
    static async updateWorldData(db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id) {
        return await worldData_1.worldData.updateWorldData(db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id);
    }
    static async updateJoinWarData(db, warType, warValue, warAddres, warCost) {
        return await worldData_1.worldData.updateJoinWarData(db, warType, warValue, warAddres, warCost);
    }
    static async createWorldHistory(db) {
        worldHistory_1.worldHistory.createWorldHistory(db);
    }
    static async addWorldHistory(db, worldHistoryData) {
        return worldHistory_1.worldHistory.addWorldHistory(db, worldHistoryData);
    }
    static async updateWorldHistoryPlayBack(db, worldDataID, blockReplaceTime, winAddress, playBack1, playBack2, playBack3, playBack4, playBack5) {
        return worldHistory_1.worldHistory.updateWorldHistoryPlayBack(db, worldDataID, blockReplaceTime, winAddress, playBack1, playBack2, playBack3, playBack4, playBack5);
    }
    static async selectWorldHistoryPage6(db, other, worldDataID) {
        return worldHistory_1.worldHistory.selectWorldHistoryPage6(db, other, worldDataID);
    }
    static async deleteWorldHistoryByBlockReplaceTime(db, blockHeight) {
        return worldHistory_1.worldHistory.deleteWorldHistoryByBlockReplaceTime(db, blockHeight);
    }
    static async backupAndCleanupTable(db, blockHeight) {
        return await worldHistory_1.worldHistory.backupAndCleanupTable(db, blockHeight);
    }
    static async createCityData(db) {
        cityData_1.cityData.createCityData(db);
    }
    static async addCityData(db, cityInfoData) {
        return cityData_1.cityData.addCityData(db, cityInfoData);
    }
    static async selectCityDataInfo(db) {
        return cityData_1.cityData.selectCityDataInfo(db);
    }
    static async updateCityData(db, occupyAddres, occupyBlock, id) {
        return cityData_1.cityData.updateCityData(db, occupyAddres, occupyBlock, id);
    }
    static async createShopsData(db) {
        shopsData_1.shopsData.createShopsData(db);
    }
    static async addShopsData(db, shopsInfoData) {
        return shopsData_1.shopsData.addShopsData(db, shopsInfoData);
    }
    static async selectShopsDataInfo(db) {
        return shopsData_1.shopsData.selectShopsDataInfo(db);
    }
    static async updateShopsData(db, occupyAddres, occupyBlock, id) {
        return shopsData_1.shopsData.updateShopsData(db, occupyAddres, occupyBlock, id);
    }
    static async createHeroList(db) {
        heroList_1.heroList.createHeroList(db);
    }
    static async addHeroList(db, heroListData) {
        return heroList_1.heroList.addHeroList(db, heroListData);
    }
    static async updateHeroListByBlockID(db, blockID, ownerAddres) {
        return heroList_1.heroList.updateHeroListByBlockID(db, blockID, ownerAddres);
    }
    static async updateHeroListByBlockIDUIsTrading(db, blockID, isTrading) {
        return heroList_1.heroList.updateHeroListByBlockIDUIsTrading(db, blockID, isTrading);
    }
    static async updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        return heroList_1.heroList.updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID);
    }
    static async selectHeroListByAddres(db, ownerAddres) {
        return heroList_1.heroList.selectHeroListByAddres(db, ownerAddres);
    }
    static async selectHeroListByHeroHash(db, heroHash) {
        return heroList_1.heroList.selectHeroListByHeroHash(db, heroHash);
    }
    static async selectHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres) {
        return heroList_1.heroList.selectHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres);
    }
    static async selectAddresHeroNum(db, ownerAddres) {
        return heroList_1.heroList.selectAddresHeroNum(db, ownerAddres);
    }
    static async createEquipmentList(db) {
        equipmentList_1.equipmentList.createEquipmentList(db);
    }
    static async addEquipmentList(db, equipmentListData) {
        return equipmentList_1.equipmentList.addEquipmentList(db, equipmentListData);
    }
    static async updateEquipmentListByblockID(db, blockID, ownerAddres) {
        return equipmentList_1.equipmentList.updateEquipmentListByblockID(db, blockID, ownerAddres);
    }
    static async updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading) {
        return equipmentList_1.equipmentList.updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading);
    }
    static async updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        return equipmentList_1.equipmentList.updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID);
    }
    static async selectEquipmentListByAddres(db, ownerAddres) {
        return equipmentList_1.equipmentList.selectEquipmentListByAddres(db, ownerAddres);
    }
    static async selectEquipmentListByEquipmentHash(db, equipmentHash, ownerAddres) {
        return equipmentList_1.equipmentList.selectEquipmentListByEquipmentHash(db, equipmentHash, ownerAddres);
    }
    static async selectEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash) {
        return equipmentList_1.equipmentList.selectEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash);
    }
    static async selectAddresEquipmentNum(db, ownerAddres) {
        return equipmentList_1.equipmentList.selectAddresEquipmentNum(db, ownerAddres);
    }
    static async createTradingList(db) {
        tradingList_1.tradingList.createTradingList(db);
    }
    static async addTradingList(db, tradingListData) {
        return tradingList_1.tradingList.addTradingList(db, tradingListData);
    }
    static async updateTradingListByblockID(db, blockID, buyAddres) {
        return tradingList_1.tradingList.updateTradingListByblockID(db, blockID, buyAddres);
    }
    static async checkTradingExists(db, blockId) {
        return await tradingList_1.tradingList.checkTradingExists(db, blockId);
    }
    static async updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID) {
        return tradingList_1.tradingList.updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID);
    }
    static async selectTradingListOnlineAll(db, other) {
        return tradingList_1.tradingList.selectTradingListOnlineAll(db, other);
    }
    static async selectTradingListDepositAll(db, other, addres) {
        return tradingList_1.tradingList.selectTradingListDepositAll(db, other, addres);
    }
    static async deleteTradingListByblockIDAndCreateAddres(db, blockID, createAddres) {
        return tradingList_1.tradingList.deleteTradingListByblockIDAndCreateAddres(db, blockID, createAddres);
    }
    static async getTradingListByBlockId(db, blockId) {
        return tradingList_1.tradingList.getTradingListByBlockId(db, blockId);
    }
}
exports.conSQLConfig = conSQLConfig;
