"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcTradingList = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
class lcTradingList {
    static async addTradingList(server, db, blockHeight, blockID, createAddres, tradingType, toType, toValue, obtainType, obtainValue, heroHash, toHeroType, toHeroValue, equipmentHash, toEquipmentType, toEquipmentValue, tradingState, buyBlockID, buyAddres) {
        return await conSQLConfig_1.conSQLConfig.addTradingList(db, {
            blockHeight: blockHeight,
            blockID: blockID,
            createAddres: createAddres,
            tradingType: tradingType,
            toType: toType,
            toValue: toValue,
            obtainType: obtainType,
            obtainValue: obtainValue,
            heroHash: heroHash,
            toHeroType: toHeroType,
            toHeroValue: toHeroValue,
            equipmentHash: equipmentHash,
            toEquipmentType: toEquipmentType,
            toEquipmentValue: toEquipmentValue,
            tradingState: tradingState,
            buyBlockID: buyBlockID,
            buyAddres: buyAddres
        });
    }
    static async updateTradingListByblockID(server, db, blockID, buyAddres) {
        conSQLConfig_1.conSQLConfig.updateTradingListByblockID(db, blockID, buyAddres).then((result) => {
        }).catch((error) => { console.error(error); });
    }
    static async checkTradingExists(db, blockId) {
        return conSQLConfig_1.conSQLConfig.checkTradingExists(db, blockId);
    }
    static async updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID) {
        return conSQLConfig_1.conSQLConfig.updateTradingListStatus(db, tradingStateHeight, buyTransactionID, buyAddres, blockID);
    }
    static async getTradingListOnlineAll(server, currentConn, db, other) {
        conSQLConfig_1.conSQLConfig.selectTradingListOnlineAll(db, other).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "20005",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getTradingListDepositAll(server, currentConn, db, other, addres) {
        conSQLConfig_1.conSQLConfig.selectTradingListDepositAll(db, other, addres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "20006",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async removeTradingListByblockIDAndCreateAddres(server, currentConn, db, blockID, createAddres) {
        conSQLConfig_1.conSQLConfig.deleteTradingListByblockIDAndCreateAddres(db, blockID, createAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "30002",
                other: "",
                content: result + "," + blockID,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getTradingListByBlockId(server, db, blockId) {
        return conSQLConfig_1.conSQLConfig.getTradingListByBlockId(db, blockId);
    }
}
exports.lcTradingList = lcTradingList;
