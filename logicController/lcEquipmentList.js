"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcEquipmentList = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
const lcInitConfig_1 = require("./lcInitConfig");
class lcEquipmentList {
    static equipmentCalculatedValue(blockTXID, blockID) {
        let n = blockTXID.split("");
        let b = blockTXID.split("");
        let array = [];
        let equipmentType = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[0]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[1]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[2]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[3]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[4]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[5]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[6]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[7]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[8]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[9]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[10]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[11]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[15]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[16]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[17]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[18]);
        let attributeType = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[10]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[11]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[15]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[16]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[17]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[18]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[19]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[21]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[22]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[23]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[27]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[28]);
        let attributeValue = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[21]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[22]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[23]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[27]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[28]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[29]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[30]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[31]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[32]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[33]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[34]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[35]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[36]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[37]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[38]);
        let b_equipmentType = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[0]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[1]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[2]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[3]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[4]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[5]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[6]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[7]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[8]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[9]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[10]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[11]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[15]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[16]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[17]);
        let b_attributeType = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[10]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[11]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[15]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[16]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[17]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[18]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[19]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[21]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[22]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[23]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[27]);
        let b_attributeValue = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[21]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[22]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[23]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[27]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[28]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[29]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[30]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[31]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[32]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[33]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[34]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[35]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[36]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[37]);
        let sum1 = (equipmentType + b_equipmentType) % 9;
        if (sum1 == 8) {
            sum1 = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[0]) % 8;
        }
        array.push(sum1);
        let sum2 = (attributeType + b_attributeType) % 5;
        if (sum2 == 4) {
            sum2 = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[0]) % 4;
        }
        array.push(sum2);
        let sum3 = (attributeValue + b_attributeValue) % 21;
        if (sum3 == 20) {
            sum3 = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[0]) % 20;
        }
        array.push(sum3);
        var outStr = array[0] + '_' + array[1] + '_' + (array[2] + 1);
        return outStr;
    }
    static async addEquipmentList(server, db, block, blockHeight, blockID, equipmentAddres, ownerAddres, equipmentType, equipmentValueType, equipmentValue, gem, enhance, isTrading, tradingID, tradeHistory) {
        await conSQLConfig_1.conSQLConfig.addEquipmentList(db, {
            block: block,
            blockHeight: blockHeight,
            blockID: blockID,
            equipmentAddres: equipmentAddres,
            ownerAddres: ownerAddres,
            equipmentType: equipmentType,
            equipmentValueType: equipmentValueType,
            equipmentValue: equipmentValue,
            gem: gem,
            enhance: enhance,
            isTrading: isTrading,
            tradingID: tradingID,
            tradeHistory: tradeHistory
        });
    }
    static async updateEquipmentListByblockID(server, db, blockID, ownerAddres) {
        conSQLConfig_1.conSQLConfig.updateEquipmentListByblockID(db, blockID, ownerAddres).then((result) => {
        }).catch((error) => { console.error(error); });
    }
    static async updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading) {
        return conSQLConfig_1.conSQLConfig.updateEquipmentListByBlockIDUIsTrading(db, blockID, isTrading);
    }
    static async updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        return conSQLConfig_1.conSQLConfig.updateEquipmentListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID);
    }
    static async getEquipmentListByAddres(server, currentConn, db, ownerAddres, other) {
        conSQLConfig_1.conSQLConfig.selectEquipmentListByAddres(db, ownerAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "20004",
                other: other,
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getEquipmentListByEquipmentHash(server, currentConn, db, ownerAddres) {
        await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, ownerAddres).then((result) => {
            let wearEquipment = result.equipment1;
            let wearEquipmentData = wearEquipment.split(",");
            for (let i = 0; i < wearEquipmentData.length; i++) {
                if (wearEquipmentData[i].length >= 10) {
                    conSQLConfig_1.conSQLConfig.selectEquipmentListByEquipmentHash(db, wearEquipmentData[i], ownerAddres).then((result) => {
                        let jsonR = JSON.stringify(result);
                        const sendChatConst = {
                            type: "20005",
                            other: i + "",
                            content: jsonR,
                            time: new Date()
                        };
                        currentConn.sendMsg('Chat', sendChatConst);
                    }).catch((error) => { console.error(error); });
                }
            }
        }).catch((error) => { console.error(error); });
    }
    static async getEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash) {
        return conSQLConfig_1.conSQLConfig.selectEquipmentListByEquipmentHashToEquipmentValue(db, equipmentHash);
    }
    static async selectAddresEquipmentNum(currentConn, db, ownerAddres) {
        conSQLConfig_1.conSQLConfig.selectAddresEquipmentNum(db, ownerAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "21001",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
}
exports.lcEquipmentList = lcEquipmentList;
