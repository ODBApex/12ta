"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcHeroList = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
const lcInitConfig_1 = require("./lcInitConfig");
class lcHeroList {
    static async addHeroList(server, db, block, blockHeight, blockID, heroAddres, ownerAddres, heroType, heroValue, isTrading, tradingID, tradeHistory) {
        return await conSQLConfig_1.conSQLConfig.addHeroList(db, {
            block: block,
            blockHeight: blockHeight,
            blockID: blockID,
            heroAddres: heroAddres,
            ownerAddres: ownerAddres,
            heroType: heroType,
            heroValue: heroValue,
            isTrading: isTrading,
            tradingID: tradingID,
            tradeHistory: tradeHistory
        });
    }
    static heroCalculatedValue(blockTXID, blockID) {
        let n = blockTXID.split("");
        let b = blockID.split("");
        let array = [];
        let shen = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[0]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[1]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[2]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[3]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[4]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[5]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[6]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[7]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[8]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[9]);
        let shou = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[6]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[7]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[8]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[9]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[10]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[11]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[15]);
        let tou = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[15]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[16]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[17]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[18]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[19]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[21]);
        let yan = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[18]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[19]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[21]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[22]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[23]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[27]);
        let zui = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[27]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[28]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[29]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[30]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[31]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[32]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[33]);
        let er = lcInitConfig_1.lcInitConfig.strToIntUtlis(n[30]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[31]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[32]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[33]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[34]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[35]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[36]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[37]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[38]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(n[39]);
        let b_shen = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[0]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[1]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[2]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[3]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[4]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[5]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[6]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[7]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[8]);
        let b_shou = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[6]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[7]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[8]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[9]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[10]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[11]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[14]);
        let b_tou = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[12]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[13]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[14]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[15]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[16]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[17]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[18]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[19]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[20]);
        let b_yan = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[18]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[19]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[20]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[21]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[22]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[23]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[26]);
        let b_zui = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[24]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[25]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[26]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[27]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[28]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[29]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[30]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[31]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[32]);
        let b_er = lcInitConfig_1.lcInitConfig.strToIntUtlis(b[30]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[31]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[32]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[33]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[34]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[35]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[36]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[37]) + lcInitConfig_1.lcInitConfig.strToIntUtlis(b[38]);
        array.push((shen + b_shen) % 5);
        array.push((shou + b_shou) % 5);
        array.push((tou + b_tou) % 12);
        array.push((yan + b_yan) % 17);
        array.push((zui + b_zui) % 17);
        array.push((er + b_er) % 12);
        let sum = 0;
        let sum1 = 0;
        for (let i = 0; i < n.length; i++) {
            sum += lcInitConfig_1.lcInitConfig.strToIntUtlis(n[i]);
            sum1 += lcInitConfig_1.lcInitConfig.strToIntUtlis(b[i]);
            if ((i + 1) % 10 == 0) {
                array.push((sum + sum1) % 12);
                sum = 0;
            }
        }
        let petSum = 0;
        let petSum1 = 0;
        for (let i = 0; i < n.length; i++) {
            petSum += lcInitConfig_1.lcInitConfig.strToIntUtlis(n[i]);
            petSum1 += lcInitConfig_1.lcInitConfig.strToIntUtlis(b[i]);
            if ((i + 1) % 20 == 0) {
                var z = (petSum + petSum1) % 94;
                var z1 = 94 + z;
                var z2 = 94 + (94 - z);
                array.push(z1);
                array.push(z2);
                petSum = 0;
            }
        }
        var outStr = array[0] + '_' + array[1] + '_' + array[2] + '_' + array[3] + '_' + array[4] + '_' + array[5] + '_' + array[6] + '_' + array[7] + '_' + array[8] + '_' + array[9] + '_' + array[10] + '_' + array[11] + '_' + array[12] + '_' + array[13];
        return outStr;
    }
    static async updateHeroListByBlockID(server, currentConn, db, blockID, ownerAddres) {
        conSQLConfig_1.conSQLConfig.updateHeroListByBlockID(db, blockID, ownerAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "10000",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async updateHeroListByBlockIDUIsTrading(db, blockID, isTrading) {
        return conSQLConfig_1.conSQLConfig.updateHeroListByBlockIDUIsTrading(db, blockID, isTrading);
    }
    static async updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID) {
        return conSQLConfig_1.conSQLConfig.updateHeroListByBlockIDENDTrading(db, blockID, ownerAddres, isTrading, blockHeight, tradeID);
    }
    static async getHeroListByAddres(server, currentConn, db, ownerAddres, other) {
        conSQLConfig_1.conSQLConfig.selectHeroListByAddres(db, ownerAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "20002",
                other: other,
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres) {
        return conSQLConfig_1.conSQLConfig.selectHeroListByHeroHashToHeroValue(db, heroHash, ownerAddres);
    }
    static async selectAddresHeroNum(currentConn, db, ownerAddres) {
        conSQLConfig_1.conSQLConfig.selectAddresHeroNum(db, ownerAddres).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "21000",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async getHeroListByHeroHash(server, currentConn, db, ownerAddres) {
        await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, ownerAddres).then((result) => {
            if (result) {
                let wearHeroData = ["", result.warHeroes1, result.warHeroes2, result.warHeroes3, result.warHeroes4, result.warHeroes5];
                for (let i = 1; i < wearHeroData.length; i++) {
                    if (wearHeroData[i].length >= 10) {
                        conSQLConfig_1.conSQLConfig.selectHeroListByHeroHash(db, wearHeroData[i]).then((result) => {
                            let jsonR = JSON.stringify(result);
                            const sendChatConst = {
                                type: "20003",
                                other: i + "",
                                content: jsonR,
                                time: new Date()
                            };
                            currentConn.sendMsg('Chat', sendChatConst);
                        }).catch((error) => { console.error(error); });
                    }
                }
            }
            else {
                console.log("getHeroListByHeroHash-no hero");
            }
        }).catch((error) => { console.error(error); });
    }
}
exports.lcHeroList = lcHeroList;
