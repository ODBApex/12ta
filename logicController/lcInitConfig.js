"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcInitConfig = void 0;
const sqliteDataInit_1 = require("../sqliteData/init/sqliteDataInit");
const lcAddresRole_1 = require("./lcAddresRole");
const lcBlockInfo_1 = require("./lcBlockInfo");
const lcWorldData_1 = require("./lcWorldData");
const lcWorldHistory_1 = require("./lcWorldHistory");
const lcCityData_1 = require("./lcCityData");
const lcShopsData_1 = require("./lcShopsData");
const lcHeroList_1 = require("./lcHeroList");
const lcEquipmentList_1 = require("./lcEquipmentList");
const lcTradingList_1 = require("./lcTradingList");
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
const STR_TO_INT_URLIS_ALL = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15,
    'g': 16,
    'h': 17,
    'i': 18,
    'j': 19,
    'k': 20,
    'l': 21,
    'm': 22,
    'n': 23,
    'o': 24,
    'p': 25,
    'q': 26,
    'r': 27,
    's': 28,
    't': 29,
    'u': 30,
    'v': 31,
    'w': 32,
    'x': 33,
    'y': 34,
    'z': 35,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
    'G': 16,
    'H': 17,
    'I': 18,
    'J': 19,
    'K': 20,
    'L': 21,
    'M': 22,
    'N': 23,
    'O': 24,
    'P': 25,
    'Q': 26,
    'R': 27,
    'S': 28,
    'T': 29,
    'U': 30,
    'V': 31,
    'W': 32,
    'X': 33,
    'Y': 34,
    'Z': 35
};
const STR_TO_INT_URLIS_ALL_aA = {
    '0': '00',
    '1': '01',
    '2': '02',
    '3': '03',
    '4': '04',
    '5': '05',
    '6': '06',
    '7': '07',
    '8': '08',
    '9': '09',
    'a': '10',
    'b': '11',
    'c': '12',
    'd': '13',
    'e': '14',
    'f': '15',
    'g': '16',
    'h': '17',
    'i': '18',
    'j': '19',
    'k': '20',
    'l': '21',
    'm': '22',
    'n': '23',
    'o': '24',
    'p': '25',
    'q': '26',
    'r': '27',
    's': '28',
    't': '29',
    'u': '30',
    'v': '31',
    'w': '32',
    'x': '33',
    'y': '34',
    'z': '35',
    'A': '36',
    'B': '37',
    'C': '38',
    'D': '39',
    'E': '40',
    'F': '41',
    'G': '42',
    'H': '43',
    'I': '44',
    'J': '45',
    'K': '46',
    'L': '47',
    'M': '48',
    'N': '49',
    'O': '50',
    'P': '51',
    'Q': '52',
    'R': '53',
    'S': '54',
    'T': '55',
    'U': '56',
    'V': '57',
    'W': '58',
    'X': '59',
    'Y': '60',
    'Z': '61'
};
const INT_TO_STR_URLIS_ALL_aA = {
    '00': '0',
    '01': '1',
    '02': '2',
    '03': '3',
    '04': '4',
    '05': '5',
    '06': '6',
    '07': '7',
    '08': '8',
    '09': '9',
    '10': 'a',
    '11': 'b',
    '12': 'c',
    '13': 'd',
    '14': 'e',
    '15': 'f',
    '16': 'g',
    '17': 'h',
    '18': 'i',
    '19': 'j',
    '20': 'k',
    '21': 'l',
    '22': 'm',
    '23': 'n',
    '24': 'o',
    '25': 'p',
    '26': 'q',
    '27': 'r',
    '28': 's',
    '29': 't',
    '30': 'u',
    '31': 'v',
    '32': 'w',
    '33': 'x',
    '34': 'y',
    '35': 'z',
    '36': 'A',
    '37': 'B',
    '38': 'C',
    '39': 'D',
    '40': 'E',
    '41': 'F',
    '42': 'G',
    '43': 'H',
    '44': 'I',
    '45': 'J',
    '46': 'K',
    '47': 'L',
    '48': 'M',
    '49': 'N',
    '50': 'O',
    '51': 'P',
    '52': 'Q',
    '53': 'R',
    '54': 'S',
    '55': 'T',
    '56': 'U',
    '57': 'V',
    '58': 'W',
    '59': 'X',
    '60': 'Y',
    '61': 'Z'
};
class lcInitConfig {
    static async initDB() {
        const db = await sqliteDataInit_1.sqliteDataInit.initDB();
        return db;
    }
    static upgradeConsumptionFormula(index) {
        return (((Math.ceil(index / 10) * Math.ceil(index / 10)) * Math.ceil(index / 10)) / (Math.ceil(index / 10) / 2)) * index * 450;
    }
    static strToIntUtlis(params) {
        return STR_TO_INT_URLIS_ALL[params];
    }
    static strToIntUtlis_aA(params) {
        return STR_TO_INT_URLIS_ALL_aA[params];
    }
    static intToStrUtlis_aA(params) {
        return INT_TO_STR_URLIS_ALL_aA[params];
    }
    static async getMaxHeight(server, currentConn, db, indexStartPay) {
        return lcBlockInfo_1.lcBlockInfo.getMaxHeight(server, currentConn, db, indexStartPay);
    }
    static async addBlockInfo(server, currentConn, db, indexStartPay, addres, objStockholder, id, height, date, content) {
        lcBlockInfo_1.lcBlockInfo.addBlockInfo(server, currentConn, db, indexStartPay, addres, objStockholder, id, height, date, content);
    }
    static async addAddresRole(server, db, addres, monthlyCard, height) {
        lcAddresRole_1.lcAddresRole.addAddresRole(server, db, addres, monthlyCard, height);
    }
    static async getAddresRoleByAddres(server, currentConn, db, addres) {
        return lcAddresRole_1.lcAddresRole.getAddresRoleByAddres(server, currentConn, db, addres);
    }
    static async getAddresRoleByAddresToHome(server, currentConn, db, addres) {
        return lcAddresRole_1.lcAddresRole.getAddresRoleByAddresToHome(server, currentConn, db, addres);
    }
    static async getARHeroListByAddresses(db, defenderAddres, attackerAddres) {
        return lcAddresRole_1.lcAddresRole.getARHeroListByAddresses(db, defenderAddres, attackerAddres);
    }
    static async getARHeroListByArrayAddres(db, addresses) {
        return lcAddresRole_1.lcAddresRole.getARHeroListByArrayAddres(db, addresses);
    }
    static async getARIsWarHeroes(db, addres, warHeroes) {
        return lcAddresRole_1.lcAddresRole.getARIsWarHeroes(db, addres, warHeroes);
    }
    static async getARIsWarEquipment(db, addres, warEquipment) {
        return lcAddresRole_1.lcAddresRole.getARIsWarEquipment(db, addres, warEquipment);
    }
    static async updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToMonthlyCard(db, addres, monthlyCard, height);
    }
    static async updateARbyResource(server, db, height, addres) {
        return lcAddresRole_1.lcAddresRole.updateARbyResource(server, db, height, addres);
    }
    static async updateARbyWarResource(db) {
        return lcAddresRole_1.lcAddresRole.updateARbyWarResource(db);
    }
    static async updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount) {
        try {
            return lcAddresRole_1.lcAddresRole.updateARbySendResource(db, resourceType, srcAddres, dstAddres, srcAmount);
        }
        catch (error) {
            console.error(`updateARbySendResource-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceExchange(db, addres, typeValue) {
        try {
            return lcAddresRole_1.lcAddresRole.updateARbyCreateTradeResourceExchange(db, addres, typeValue);
        }
        catch (error) {
            console.error(`updateARbyCreateTradeResourceExchange-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn) {
        try {
            return lcAddresRole_1.lcAddresRole.updateARbyCreateTradeResource(db, addres, pt, ptn, gt, gtn);
        }
        catch (error) {
            console.error(`updateTradingListByblockID-failed: ${error}`);
        }
    }
    static async updateARbyCreateTradeResourceAdd(db, addres, pt, ptn) {
        return lcAddresRole_1.lcAddresRole.updateARbyCreateTradeResourceAdd(db, addres, pt, ptn);
    }
    static async updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToRUpgrade(db, grain, wood, ironOre, silverCoin, grainCeiling, woodCeiling, ironOreCeiling, warriorCeiling, grainLevel, woodLevel, ironOreLevel, warriorLevel, addres);
    }
    static async updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToHeroPosition(db, addres, amt, newHeroHash, heroValue);
    }
    static async updateARbyAddresToHeroList(server, db, heroList, addres) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToHeroList(server, db, heroList, addres);
    }
    static async updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToCreateHeroExpend(db, silverCoin, vodka, addres);
    }
    static async updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToEquipmentPosition(db, addres, newEquipmentHash, equipmentType, equipmentValueType, equipmentValue, calculation, equipmentValueType2, equipmentValue2, calculation2);
    }
    static async updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres) {
        return lcAddresRole_1.lcAddresRole.updateARbyAddresToCreateEquipmentExpend(db, silverCoin, refinedIron, addres);
    }
    static async addWorldData(server, currentConn, db, id, tName, type, incrementType, increment, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant) {
        lcWorldData_1.lcWorldData.addWorldData(server, currentConn, db, id, tName, type, incrementType, increment, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant);
    }
    static async addWorldDataList(db, maxHeight) {
        lcWorldData_1.lcWorldData.addWorldDataList(db, maxHeight);
    }
    static async getWorldDataInfo(server, currentConn, db) {
        lcWorldData_1.lcWorldData.selectWorldDataInfo(server, currentConn, db);
    }
    static async getWorldDataPage(currentConn, db, other) {
        lcWorldData_1.lcWorldData.selectWorldDataPage(currentConn, db, other);
    }
    static async getWorldDataPage8(currentConn, db, other, height) {
        lcWorldData_1.lcWorldData.selectWorldDataPage8(currentConn, db, other, height);
    }
    static async getWorldDataByID(currentConn, db, other) {
        lcWorldData_1.lcWorldData.selectWorldDataByID(currentConn, db, other);
    }
    static async updateWorldData(currentConn, db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id) {
        lcWorldData_1.lcWorldData.updateWorldData(currentConn, db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id);
    }
    static async updateJoinWarData(db, warType, warValue, warAddres, warCost) {
        return await lcWorldData_1.lcWorldData.updateJoinWarData(db, warType, warValue, warAddres, warCost);
    }
    static async addWorldHistory(db, worldDataID, worldDatatype, blockReplaceTime, applicantNumber, applicantList, winAddress, generateBlock, playBack1, playBack2, playBack3, playBack4, playBack5) {
        return lcWorldHistory_1.lcWorldHistory.addWorldHistory(db, worldDataID, worldDatatype, blockReplaceTime, applicantNumber, applicantList, winAddress, generateBlock, playBack1, playBack2, playBack3, playBack4, playBack5);
    }
    static async getWorldHistoryPage6(currentConn, db, other, worldDataID) {
        lcWorldHistory_1.lcWorldHistory.getWorldHistoryPage6(currentConn, db, other, worldDataID);
    }
    static async addCityData(server, currentConn, db, id, type, incrementType, increment, occupyAddres, occupyBlock) {
        lcCityData_1.lcCityData.addCityData(server, currentConn, db, id, type, incrementType, increment, occupyAddres, occupyBlock);
    }
    static async addCityDataList(db) {
        lcCityData_1.lcCityData.addCityDataList(db);
    }
    static async getCityDataInfo(server, currentConn, db) {
        lcCityData_1.lcCityData.selectCityDataInfo(server, currentConn, db);
    }
    static async updateCityData(server, currentConn, db, occupyAddres, occupyBlock, id) {
        lcCityData_1.lcCityData.updateCityData(server, currentConn, db, occupyAddres, occupyBlock, id);
    }
    static async addShopsData(server, currentConn, db, id, type, incrementType, increment, occupyAddres, occupyBlock) {
        lcShopsData_1.lcShopsData.addShopsData(server, currentConn, db, id, type, incrementType, increment, occupyAddres, occupyBlock);
    }
    static async addShopsDataList(db) {
        lcShopsData_1.lcShopsData.addShopsDataList(db);
    }
    static async getShopsDataInfo(server, currentConn, db) {
        lcShopsData_1.lcShopsData.selectShopsDataInfo(server, currentConn, db);
    }
    static async updateShopsData(server, currentConn, db, occupyAddres, occupyBlock, id) {
        lcShopsData_1.lcShopsData.updateShopsData(server, currentConn, db, occupyAddres, occupyBlock, id);
    }
    static async addHeroList(server, db, block, blockHeight, blockID, heroAddres, ownerAddres, heroType, heroValue, isTrading, tradingID, tradeHistory) {
        lcHeroList_1.lcHeroList.addHeroList(server, db, block, blockHeight, blockID, heroAddres, ownerAddres, heroType, heroValue, isTrading, tradingID, tradeHistory);
    }
    static heroCalculatedValue(blockTXID, blockID) {
        return lcHeroList_1.lcHeroList.heroCalculatedValue(blockTXID, blockID);
    }
    static async updateHeroListByBlockID(server, currentConn, db, blockID, ownerAddres) {
        lcHeroList_1.lcHeroList.updateHeroListByBlockID(server, currentConn, db, blockID, ownerAddres);
    }
    static async updateHeroListByBlockIDUIsTrading(db, blockID, isTrading) {
        lcHeroList_1.lcHeroList.updateHeroListByBlockIDUIsTrading(db, blockID, isTrading);
    }
    static async updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        lcHeroList_1.lcHeroList.updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID);
    }
    static async getHeroListByAddres(server, currentConn, db, ownerAddres, other) {
        return lcHeroList_1.lcHeroList.getHeroListByAddres(server, currentConn, db, ownerAddres, other);
    }
    static async getHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres) {
        return lcHeroList_1.lcHeroList.getHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres);
    }
    static async selectAddresHeroNum(currentConn, db, ownerAddres) {
        return lcHeroList_1.lcHeroList.selectAddresHeroNum(currentConn, db, ownerAddres);
    }
    static async getHeroListByHeroHash(server, currentConn, db, ownerAddres) {
        return lcHeroList_1.lcHeroList.getHeroListByHeroHash(server, currentConn, db, ownerAddres);
    }
    static async addEquipmentList(server, db, block, blockHeight, blockID, equipmentAddres, ownerAddres, equipmentType, equipmentValueType, equipmentValue, gem, enhance, isTrading, tradingID, tradeHistory) {
        lcEquipmentList_1.lcEquipmentList.addEquipmentList(server, db, block, blockHeight, blockID, equipmentAddres, ownerAddres, equipmentType, equipmentValueType, equipmentValue, gem, enhance, isTrading, tradingID, tradeHistory);
    }
    static equipmentCalculatedValue(blockTXID, blockID) {
        return lcEquipmentList_1.lcEquipmentList.equipmentCalculatedValue(blockTXID, blockID);
    }
    static async updateEquipmentListByblockID(server, db, blockID, ownerAddres) {
        lcEquipmentList_1.lcEquipmentList.updateEquipmentListByblockID(server, db, blockID, ownerAddres);
    }
    static async updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading) {
        lcEquipmentList_1.lcEquipmentList.updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading);
    }
    static async updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        lcEquipmentList_1.lcEquipmentList.updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID);
    }
    static async getEquipmentListByAddres(server, currentConn, db, ownerAddres, other) {
        return lcEquipmentList_1.lcEquipmentList.getEquipmentListByAddres(server, currentConn, db, ownerAddres, other);
    }
    static async getEquipmentListByEquipmentHash(server, currentConn, db, ownerAddres) {
        return lcEquipmentList_1.lcEquipmentList.getEquipmentListByEquipmentHash(server, currentConn, db, ownerAddres);
    }
    static async getEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash) {
        return lcEquipmentList_1.lcEquipmentList.getEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash);
    }
    static async selectAddresEquipmentNum(currentConn, db, ownerAddres) {
        return lcEquipmentList_1.lcEquipmentList.selectAddresEquipmentNum(currentConn, db, ownerAddres);
    }
    static async selectAddresSilverCoinNum(currentConn, db, ownerAddres) {
        return lcAddresRole_1.lcAddresRole.selectAddresSilverCoinNum(currentConn, db, ownerAddres);
    }
    static async addTradingList(server, db, blockHeight, blockID, createAddres, tradingType, toType, toValue, obtainType, obtainValue, heroHash, toHeroType, toHeroValue, equipmentHash, toEquipmentType, toEquipmentValue, tradingState, buyBlockID, buyAddres) {
        return lcTradingList_1.lcTradingList.addTradingList(server, db, blockHeight, blockID, createAddres, tradingType, toType, toValue, obtainType, obtainValue, heroHash, toHeroType, toHeroValue, equipmentHash, toEquipmentType, toEquipmentValue, tradingState, buyBlockID, buyAddres);
    }
    static async updateTradingListByblockID(server, db, blockID, buyAddres) {
        lcTradingList_1.lcTradingList.updateTradingListByblockID(server, db, blockID, buyAddres);
    }
    static async checkTradingExists(db, blockId) {
        return await conSQLConfig_1.conSQLConfig.checkTradingExists(db, blockId);
    }
    static async updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID) {
        return lcTradingList_1.lcTradingList.updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID);
    }
    static async getTradingListOnlineAll(server, currentConn, db, other) {
        lcTradingList_1.lcTradingList.getTradingListOnlineAll(server, currentConn, db, other);
    }
    static async getTradingListDepositAll(server, currentConn, db, other, addres) {
        lcTradingList_1.lcTradingList.getTradingListDepositAll(server, currentConn, db, other, addres);
    }
    static async removeTradingListByblockIDAndCreateAddres(server, currentConn, db, blockID, createAddres) {
        return lcTradingList_1.lcTradingList.removeTradingListByblockIDAndCreateAddres(server, currentConn, db, blockID, createAddres);
    }
    static async getTradingListByBlockId(server, db, blockId) {
        return conSQLConfig_1.conSQLConfig.getTradingListByBlockId(db, blockId);
    }
}
exports.lcInitConfig = lcInitConfig;
