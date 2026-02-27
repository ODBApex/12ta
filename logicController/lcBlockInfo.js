"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcBlockInfo = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
const lcInitConfig_1 = require("./lcInitConfig");
const objGasMoney = {
    "CreatePeople": "10.00000000",
    "renewal": "",
    "sendSilverCoin": "0.01000000",
    "sendRefinedIron": "0.01000000",
    "sendVodka": "0.01000000",
    "makeRefinedIron": "0.01000000",
    "makeVodka": "0.01000000",
    "makeSilverCoin": "1000.00000000",
    "createHero": "0.01000000",
    "setHero": "0.01000000",
    "makeEquipment": "0.01000000",
    "setEquipment": "0.01000000",
    "sell": "0.01000000",
    "buy": "0.01000000",
    "rm": "1.00000000",
    "RUpgrade": "0.01000000",
    "team": "0.01000000",
    "joinWar": "0.01000000",
};
const resourceFieldMap = ['', 'grain', 'wood', 'ironOre', 'warrior', 'silverCoin'];
class lcBlockInfo {
    static isObjGasMoney(gasMoney, dstMoney) {
        return Number(dstMoney) >= Number(gasMoney) ? true : false;
    }
    static parseMessage(transaction) {
        try {
            return JSON.parse(transaction.message);
        }
        catch (error) {
            console.error(`Failed to parse message: ${transaction.message}`);
            return null;
        }
    }
    static sortTransactionsByDate(transactions) {
        return [...transactions].sort((a, b) => {
            const dateA = parseInt(a.date, 10);
            const dateB = parseInt(b.date, 10);
            return dateA - dateB;
        });
    }
    static filterSellTransactions(transactions) {
        return transactions.filter(transaction => {
            const message = this.parseMessage(transaction);
            return (message === null || message === void 0 ? void 0 : message.op) === 'buy';
        });
    }
    static classifyByOt(transactions) {
        const result = {
            below199: [],
            equal200: [],
            equal300: []
        };
        transactions.forEach(transaction => {
            try {
                const message = JSON.parse(transaction.message);
                const ot = Number(message.ot);
                if (ot < 199) {
                    result.below199.push(transaction);
                }
                else if (ot === 200) {
                    result.equal200.push(transaction);
                }
                else if (ot === 300) {
                    result.equal300.push(transaction);
                }
            }
            catch (error) {
                console.error(`Failed to parse transaction record message, id: ${transaction.id}`, error);
            }
        });
        return result;
    }
    static filterDuplicateDateAndBo(transactions) {
        const transactionCopies = [...transactions];
        const comboMap = new Map();
        transactionCopies.forEach(transaction => {
            try {
                const message = JSON.parse(transaction.message);
                const comboKey = `${transaction.date}|${message.bo}`;
                comboMap.set(comboKey, (comboMap.get(comboKey) || 0) + 1);
            }
            catch (error) {
                console.error(`Failed to parse message, id: ${transaction.id}`, error);
            }
        });
        return transactionCopies.filter(transaction => {
            try {
                const message = JSON.parse(transaction.message);
                const comboKey = `${transaction.date}|${message.bo}`;
                return comboMap.get(comboKey) === 1;
            }
            catch (error) {
                return true;
            }
        });
    }
    static keepMinDateForSameBo(transactions) {
        const boGroups = new Map();
        transactions.forEach(transaction => {
            try {
                const message = JSON.parse(transaction.message);
                const bo = message.bo;
                if (!boGroups.has(bo)) {
                    boGroups.set(bo, []);
                }
                boGroups.get(bo).push(transaction);
            }
            catch (error) {
                console.error(`Failed to parse message, id: ${transaction.id}`, error);
            }
        });
        const result = [];
        boGroups.forEach((group, bo) => {
            const sortedGroup = [...group].sort((a, b) => {
                return Number(a.date) - Number(b.date);
            });
            result.push(sortedGroup[0]);
        });
        return result;
    }
    static async getMaxHeight(server, currentConn, db, indexStartPay) {
        await conSQLConfig_1.conSQLConfig.selectMaxBlockInfoHeight(db).then((result) => {
            let jsonR = JSON.stringify(result);
            let jsonQ = JSON.parse(jsonR);
            let jsonQmaxHeight = jsonQ.maxHeight == null ? indexStartPay : jsonQ.maxHeight;
            const sendChatConst = {
                type: "20000",
                other: "",
                content: jsonQmaxHeight + "",
                time: new Date()
            };
            server.broadcastMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async addBlockInfo(server, currentConn, db, indexStartPay, addres, objStockholder, id, height, date, content) {
        let historyNum = Number(height) % 2000;
        if (historyNum == 0) {
            conSQLConfig_1.conSQLConfig.backupAndCleanupTable(db, height);
        }
        let numStr = Number(height) % 100;
        if (numStr == 0) {
            lcInitConfig_1.lcInitConfig.updateARbyWarResource(db);
        }
        let sqlNumStr = numStr - 34;
        if (sqlNumStr >= 1 && sqlNumStr <= 64) {
            lcInitConfig_1.lcInitConfig.getWorldDataPage8(currentConn, db, sqlNumStr, height);
        }
        const addBlockJson = JSON.parse(content);
        let updateData = [];
        for (let i = 0; i < addBlockJson.data.length; i++) {
            const dstData = addBlockJson.data[i].dst;
            if (dstData == objStockholder.stockholderCreate) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderRenewal) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderSend) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderMake) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderHero) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderEquipment) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderTrading) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderUpOperate) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderTeam) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderJoinWar) {
                updateData.push(addBlockJson.data[i]);
            }
            else if (dstData == objStockholder.stockholderFight) {
                updateData.push(addBlockJson.data[i]);
            }
        }
        addBlockJson.data = this.sortTransactionsByDate(updateData);
        const updateContentString = JSON.stringify(addBlockJson);
        if (updateData.length > 0) {
            await conSQLConfig_1.conSQLConfig.addBlockInfo(db, {
                id: id,
                height: height,
                date: date,
                data: updateContentString
            }).then(async (result) => {
                lcInitConfig_1.lcInitConfig.updateARbyResource(server, db, parseInt(height), addres).then(async (result) => {
                }).catch((error) => { console.error(error); });
                for (let i = 0; i < addBlockJson.data.length; i++) {
                    const isJsonString = (str) => {
                        if (!str || typeof str !== 'string') {
                            return false;
                        }
                        try {
                            JSON.parse(str);
                            return true;
                        }
                        catch (error) {
                            return false;
                        }
                    };
                    if (isJsonString(addBlockJson.data[i].message)) { //
                        const dstData = addBlockJson.data[i].dst;
                        const dstMoney = addBlockJson.data[i].val;
                        const srcDataAddres = addBlockJson.data[i].src;
                        const messageDataJson = JSON.parse(addBlockJson.data[i].message);
                        const messageDataJsonop = messageDataJson.op;
                        if (messageDataJson.p == "prc-100") {
                            if (dstData == objStockholder.stockholderCreate && messageDataJsonop == "CreatePeople") {
                                if (this.isObjGasMoney(objGasMoney.CreatePeople, dstMoney)) {
                                    await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcDataAddres).then((result) => {
                                        let valueIsUndefined = true;
                                        if (!result) {
                                            valueIsUndefined = false;
                                        }
                                        if (valueIsUndefined) {
                                            conSQLConfig_1.conSQLConfig.updateARbyAddresToMonthlyCard(db, srcDataAddres, "1000", height);
                                        }
                                        else {
                                            lcInitConfig_1.lcInitConfig.addAddresRole(server, db, srcDataAddres, "1000", height);
                                        }
                                    }).catch((error) => { console.error(error); });
                                }
                            }
                            else if (dstData == objStockholder.stockholderRenewal && messageDataJsonop == "renewal") {
                                let moneyNum = (1000 - (Math.floor((Number(height) - indexStartPay) / 525600) * 50));
                                moneyNum = moneyNum <= 500 ? 500 : moneyNum;
                                if (dstMoney >= moneyNum) {
                                    await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcDataAddres).then((result) => {
                                        let valueIsUndefined = true;
                                        if (!result) {
                                            valueIsUndefined = false;
                                        }
                                        if (valueIsUndefined) {
                                            conSQLConfig_1.conSQLConfig.updateARbyAddresToMonthlyCard(db, srcDataAddres, "100000", height);
                                        }
                                        else {
                                            lcInitConfig_1.lcInitConfig.addAddresRole(server, db, srcDataAddres, "100000", height);
                                        }
                                    }).catch((error) => { console.error(error); });
                                }
                            }
                            else if (dstData == objStockholder.stockholderSend && (messageDataJsonop == "sendSilverCoin" || messageDataJsonop == "sendRefinedIron" || messageDataJsonop == "sendVodka")) {
                                if (this.isObjGasMoney(objGasMoney.sendSilverCoin, dstMoney)) {
                                    const sendAmount = messageDataJson.a;
                                    if (lcBlockInfo.isPositiveInteger(sendAmount)) {
                                        const dstH = messageDataJson.h;
                                        if (messageDataJsonop == "sendSilverCoin") {
                                            await lcInitConfig_1.lcInitConfig.updateARbySendResource(db, "silverCoin", srcDataAddres, dstH, sendAmount);
                                        }
                                        else if (messageDataJsonop == "sendRefinedIron") {
                                            await lcInitConfig_1.lcInitConfig.updateARbySendResource(db, "refinedIron", srcDataAddres, dstH, sendAmount);
                                        }
                                        else if (messageDataJsonop == "sendVodka") {
                                            await lcInitConfig_1.lcInitConfig.updateARbySendResource(db, "vodka", srcDataAddres, dstH, sendAmount);
                                        }
                                    }
                                }
                            }
                            else if (dstData == objStockholder.stockholderMake && (messageDataJsonop == "makeRefinedIron" || messageDataJsonop == "makeVodka" || messageDataJsonop == "makeSilverCoin")) {
                                if (this.isObjGasMoney(objGasMoney.makeRefinedIron, dstMoney)) {
                                    if (messageDataJsonop == "makeRefinedIron") {
                                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceExchange(db, srcDataAddres, "");
                                    }
                                    else if (messageDataJsonop == "makeVodka") {
                                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceExchange(db, srcDataAddres, "vodka");
                                    }
                                    else if (messageDataJsonop == "makeSilverCoin" && Number(height) <= (indexStartPay + 525600)) {
                                        if (dstMoney >= 1000) {
                                            await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceAdd(db, srcDataAddres, "5", "50000");
                                        }
                                    }
                                }
                            }
                            else if (dstData == objStockholder.stockholderHero && (messageDataJsonop == "createHero" || messageDataJsonop == "setHero")) {
                                if (this.isObjGasMoney(objGasMoney.createHero, dstMoney)) {
                                    await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcDataAddres).then(async (result) => {
                                        let valueIsUndefined = true;
                                        if (!result) {
                                            valueIsUndefined = false;
                                        }
                                        if (valueIsUndefined) {
                                            if (messageDataJson.op == "createHero") {
                                                let moneyHeroSilverCoin = (60000 + (Math.floor((Number(height) - indexStartPay) / 525600) * 10000));
                                                moneyHeroSilverCoin = moneyHeroSilverCoin >= 160000 ? 160000 : moneyHeroSilverCoin;
                                                let moneyHeroVodka = (100 + (Math.floor((Number(height) - indexStartPay) / 525600) * 10));
                                                moneyHeroVodka = moneyHeroVodka >= 200 ? 200 : moneyHeroVodka;
                                                let upgradeResult = [0, 0];
                                                if (parseInt(result.silverCoin) >= moneyHeroSilverCoin) {
                                                    upgradeResult[0] = 1;
                                                }
                                                if (parseInt(result.vodka) >= moneyHeroVodka) {
                                                    upgradeResult[1] = 1;
                                                }
                                                if ((upgradeResult[0] + upgradeResult[1]) == 2) {
                                                    lcInitConfig_1.lcInitConfig.updateARbyAddresToCreateHeroExpend(db, moneyHeroSilverCoin + "", moneyHeroVodka + "", srcDataAddres).then((result) => {
                                                        if (result !== undefined && result > 0) {
                                                            lcInitConfig_1.lcInitConfig.addHeroList(server, db, addBlockJson.id, addBlockJson.height, addBlockJson.data[i].id, srcDataAddres, srcDataAddres, "", lcInitConfig_1.lcInitConfig.heroCalculatedValue(addBlockJson.data[i].id, addBlockJson.id), "0", "0", "");
                                                            if (addres == srcDataAddres) {
                                                                lcInitConfig_1.lcInitConfig.getHeroListByAddres(server, currentConn, db, addres, "1");
                                                            }
                                                        }
                                                    }).catch((error) => { console.error(error); });
                                                }
                                            }
                                            else {
                                                const amt = messageDataJson.amt;
                                                const tick = messageDataJson.tick;
                                                const heroListData = await lcInitConfig_1.lcInitConfig.getHeroListByHeroHashToHeroValue(db, tick, srcDataAddres);
                                                if (heroListData) {
                                                    lcInitConfig_1.lcInitConfig.updateARbyAddresToHeroPosition(db, srcDataAddres, amt, tick, heroListData.heroValue);
                                                    if (addres == srcDataAddres) {
                                                        lcInitConfig_1.lcInitConfig.getHeroListByHeroHash(server, currentConn, db, addres);
                                                    }
                                                }
                                            }
                                        }
                                    }).catch((error) => { console.error(error); });
                                }
                            }
                            else if (dstData == objStockholder.stockholderEquipment && (messageDataJsonop == "makeEquipment" || messageDataJsonop == "setEquipment")) {
                                if (this.isObjGasMoney(objGasMoney.makeEquipment, dstMoney)) {
                                    await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcDataAddres).then((result) => {
                                        let valueIsUndefined = true;
                                        if (!result) {
                                            valueIsUndefined = false;
                                        }
                                        if (valueIsUndefined) {
                                            if (messageDataJson.op == "makeEquipment") {
                                                let upgradeResult = [0, 0];
                                                let moneyHeroSilverCoin = (60000 + (Math.floor((Number(height) - indexStartPay) / 525600) * 10000));
                                                moneyHeroSilverCoin = moneyHeroSilverCoin >= 160000 ? 160000 : moneyHeroSilverCoin;
                                                let moneyHeroRefinedIron = (100 + (Math.floor((Number(height) - indexStartPay) / 525600) * 10));
                                                moneyHeroRefinedIron = moneyHeroRefinedIron >= 200 ? 200 : moneyHeroRefinedIron;
                                                if (parseInt(result.silverCoin) >= moneyHeroSilverCoin) {
                                                    upgradeResult[0] = 1;
                                                }
                                                if (parseInt(result.refinedIron) >= moneyHeroRefinedIron) {
                                                    upgradeResult[1] = 1;
                                                }
                                                if ((upgradeResult[0] + upgradeResult[1]) == 2) {
                                                    let equipmentToData = lcInitConfig_1.lcInitConfig.equipmentCalculatedValue(addBlockJson.data[i].id, addBlockJson.id);
                                                    let equipmentValueData = equipmentToData.split("_");
                                                    lcInitConfig_1.lcInitConfig.updateARbyAddresToCreateEquipmentExpend(db, moneyHeroSilverCoin + "", moneyHeroRefinedIron + "", srcDataAddres).then((result) => {
                                                        if (result !== undefined && result > 0) {
                                                            lcInitConfig_1.lcInitConfig.addEquipmentList(server, db, addBlockJson.id, addBlockJson.height, addBlockJson.data[i].id, srcDataAddres, srcDataAddres, equipmentValueData[0], equipmentValueData[1], equipmentValueData[2], "", "", "0", "0", "");
                                                        }
                                                    }).catch((error) => { console.error(error); });
                                                }
                                            }
                                            else {
                                                let newEquipmentHash = messageDataJson.tick.slice();
                                                conSQLConfig_1.conSQLConfig.selectEquipmentListByEquipmentHash(db, newEquipmentHash, srcDataAddres).then((newRes) => {
                                                    let pastEquipmentHash = "";
                                                    if (newRes.equipmentType == "0") {
                                                        pastEquipmentHash = result.equipment1;
                                                    }
                                                    else if (newRes.equipmentType == "1") {
                                                        pastEquipmentHash = result.equipment2;
                                                    }
                                                    else if (newRes.equipmentType == "2") {
                                                        pastEquipmentHash = result.equipment3;
                                                    }
                                                    else if (newRes.equipmentType == "3") {
                                                        pastEquipmentHash = result.equipment4;
                                                    }
                                                    else if (newRes.equipmentType == "4") {
                                                        pastEquipmentHash = result.equipment5;
                                                    }
                                                    else if (newRes.equipmentType == "5") {
                                                        pastEquipmentHash = result.equipment6;
                                                    }
                                                    else if (newRes.equipmentType == "6") {
                                                        pastEquipmentHash = result.equipment7;
                                                    }
                                                    else if (newRes.equipmentType == "7") {
                                                        pastEquipmentHash = result.equipment8;
                                                    }
                                                    return [newEquipmentHash, newRes.equipmentType, newRes.equipmentValueType, newRes.equipmentValue, pastEquipmentHash, newRes.ownerAddres];
                                                }).then((retNewRes) => {
                                                    if (retNewRes[4].length >= 38) {
                                                        conSQLConfig_1.conSQLConfig.selectEquipmentListByEquipmentHash(db, retNewRes[4], srcDataAddres).then((pastRes) => {
                                                            //
                                                            lcInitConfig_1.lcInitConfig.updateARbyAddresToEquipmentPosition(db, srcDataAddres, newEquipmentHash, retNewRes[1], retNewRes[2], retNewRes[3], "+", pastRes.equipmentValueType, pastRes.equipmentValue, "-").then((result) => {
                                                            }).catch((error) => { console.error(error); });
                                                        });
                                                    }
                                                    else {
                                                        //
                                                        lcInitConfig_1.lcInitConfig.updateARbyAddresToEquipmentPosition(db, srcDataAddres, newEquipmentHash, retNewRes[1], retNewRes[2], retNewRes[3], "+", "", "", "").then((result) => {
                                                        }).catch((error) => { console.error(error); });
                                                    }
                                                });
                                            }
                                        }
                                    }).catch((error) => { console.error(error); });
                                }
                            }
                            else if (dstData == objStockholder.stockholderTrading && (messageDataJsonop == "sell" || messageDataJsonop == "rm")) {
                                if (messageDataJson.op == "sell") {
                                    if (this.isObjGasMoney(objGasMoney.sell, dstMoney)) {
                                        const blockID = addBlockJson.data[i].id;
                                        const exists = await lcInitConfig_1.lcInitConfig.checkTradingExists(db, blockID);
                                        if (exists) {
                                            console.log("Resource sell transaction already exists: ", addBlockJson.data[i].id);
                                            const sendChatConst = {
                                                type: "10000",
                                                other: addres,
                                                content: "updateBlockHeight",
                                                time: new Date()
                                            };
                                            server.broadcastMsg('Chat', sendChatConst);
                                            currentConn.sendMsg('Chat', sendChatConst);
                                        }
                                        else {
                                            if (messageDataJson.ot <= "199") {
                                                if (lcBlockInfo.isPositiveInteger(messageDataJson.ot) && lcBlockInfo.isPositiveInteger(messageDataJson.pt) && lcBlockInfo.isPositiveInteger(messageDataJson.ptn) && lcBlockInfo.isPositiveInteger(messageDataJson.gt) && lcBlockInfo.isPositiveInteger(messageDataJson.gtn)) {
                                                    lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResource(db, srcDataAddres, messageDataJson.pt, messageDataJson.ptn, messageDataJson.gt, messageDataJson.gtn).then((result) => {
                                                        if (result !== undefined && result > 0) {
                                                            lcInitConfig_1.lcInitConfig.addTradingList(server, db, addBlockJson.height, addBlockJson.data[i].id, srcDataAddres, messageDataJson.ot, messageDataJson.pt, messageDataJson.ptn, messageDataJson.gt, messageDataJson.gtn, "", "", "", "", "", "", "0", "", "");
                                                        }
                                                    }).catch((error) => { console.error(error); });
                                                }
                                            }
                                            else if (messageDataJson.ot == "200") {
                                                if (lcBlockInfo.isPositiveInteger(messageDataJson.sc)) {
                                                    const arData = await lcInitConfig_1.lcInitConfig.getARIsWarEquipment(db, srcDataAddres, messageDataJson.oh);
                                                    if (arData.length == 0) {
                                                        let equipmentDataValue = await lcInitConfig_1.lcInitConfig.getEquipmentListByEquipmentHashToEquipmentValue(db, messageDataJson.oh);
                                                        if (equipmentDataValue.isTrading == "0") {
                                                            let equipmentValue = equipmentDataValue.equipmentType + "," + equipmentDataValue.equipmentValueType + "," + equipmentDataValue.equipmentValue;
                                                            lcInitConfig_1.lcInitConfig.updateEquipmentListByBlockIDUIsTrading(db, messageDataJson.oh, "1");
                                                            lcInitConfig_1.lcInitConfig.addTradingList(server, db, addBlockJson.height, addBlockJson.data[i].id, srcDataAddres, messageDataJson.ot, "", "", "", "", "", "", "", messageDataJson.oh, equipmentValue, messageDataJson.sc, "0", "", "");
                                                        }
                                                    }
                                                    else {
                                                        console.log("Equipment is being worn and cannot be traded：", messageDataJson.oh);
                                                    }
                                                }
                                            }
                                            else if (messageDataJson.ot == "300") {
                                                if (lcBlockInfo.isPositiveInteger(messageDataJson.sc)) {
                                                    const arData = await lcInitConfig_1.lcInitConfig.getARIsWarHeroes(db, srcDataAddres, messageDataJson.oh);
                                                    if (arData.length == 0) {
                                                        const heroData = await lcInitConfig_1.lcInitConfig.getHeroListByHeroHashToHeroValue(db, messageDataJson.oh, srcDataAddres);
                                                        if (heroData.isTrading == "0") {
                                                            lcInitConfig_1.lcInitConfig.updateHeroListByBlockIDUIsTrading(db, messageDataJson.oh, "1");
                                                            lcInitConfig_1.lcInitConfig.addTradingList(server, db, addBlockJson.height, addBlockJson.data[i].id, srcDataAddres, messageDataJson.ot, "", "", "", "", messageDataJson.oh, heroData.heroValue, messageDataJson.sc, "", "", "", "0", "", "");
                                                        }
                                                        else {
                                                            console.log(messageDataJson.oh, "It has already been sold on the trading market.");
                                                        }
                                                    }
                                                    else {
                                                        console.log("Equipment is being worn and cannot be traded：", messageDataJson.oh);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (messageDataJson.op == "rm") {
                                    if (this.isObjGasMoney(objGasMoney.rm, dstMoney)) {
                                        if (messageDataJson.ot <= "199") {
                                            const tradingListData = await lcInitConfig_1.lcInitConfig.getTradingListByBlockId(server, db, messageDataJson.co);
                                            if (tradingListData) {
                                                const ptNum = tradingListData.toType;
                                                const ptnNum = tradingListData.toValue;
                                                const createAddres = tradingListData.createAddres;
                                                lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceAdd(db, createAddres, ptNum, ptnNum);
                                            }
                                        }
                                        else if (messageDataJson.ot == "200") {
                                            const tradingListData = await lcInitConfig_1.lcInitConfig.getTradingListByBlockId(server, db, messageDataJson.co);
                                            if (tradingListData) {
                                                lcInitConfig_1.lcInitConfig.updateEquipmentListByBlockIDUIsTrading(db, tradingListData.equipmentHash, "0");
                                            }
                                        }
                                        else if (messageDataJson.ot == "300") {
                                            const tradingListData = await lcInitConfig_1.lcInitConfig.getTradingListByBlockId(server, db, messageDataJson.co);
                                            if (tradingListData) {
                                                lcInitConfig_1.lcInitConfig.updateHeroListByBlockIDUIsTrading(db, tradingListData.heroHash, "0");
                                            }
                                        }
                                        lcInitConfig_1.lcInitConfig.removeTradingListByblockIDAndCreateAddres(server, currentConn, db, messageDataJson.co, srcDataAddres);
                                    }
                                }
                            }
                            else if (dstData == objStockholder.stockholderUpOperate && messageDataJsonop == "RUpgrade") {
                                if (this.isObjGasMoney(objGasMoney.RUpgrade, dstMoney)) {
                                    await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcDataAddres).then((result) => {
                                        let valueIsUndefined = true;
                                        if (!result) {
                                            valueIsUndefined = false;
                                        }
                                        if (valueIsUndefined) {
                                            let upgradeResult = [0, 0, 0, 0];
                                            let upgradeRatio = [0, 0, 0, 0];
                                            let consume = 0;
                                            let consumeCeiling = 0;
                                            if (messageDataJson.bt == "1") {
                                                consume = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.grainLevel) + 1);
                                                consumeCeiling = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.grainLevel) + 2);
                                                upgradeRatio = [5, 2, 5, 10];
                                                if (parseInt(result.grain) >= (consume / upgradeRatio[0])) {
                                                    upgradeResult[0] = 1;
                                                }
                                                if (parseInt(result.wood) >= (consume / upgradeRatio[1])) {
                                                    upgradeResult[1] = 1;
                                                }
                                                if (parseInt(result.ironOre) >= (consume / upgradeRatio[2])) {
                                                    upgradeResult[2] = 1;
                                                }
                                                if (parseInt(result.silverCoin) >= (consume / upgradeRatio[3])) {
                                                    upgradeResult[3] = 1;
                                                }
                                                result.grainCeiling = consumeCeiling + "";
                                                result.grainLevel = (parseInt(result.grainLevel) + 1) + "";
                                            }
                                            if (messageDataJson.bt == "2") {
                                                consume = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.woodLevel) + 1);
                                                consumeCeiling = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.woodLevel) + 2);
                                                upgradeRatio = [2, 5, 5, 10];
                                                if (parseInt(result.grain) >= (consume / upgradeRatio[0])) {
                                                    upgradeResult[0] = 1;
                                                }
                                                if (parseInt(result.wood) >= (consume / upgradeRatio[1])) {
                                                    upgradeResult[1] = 1;
                                                }
                                                if (parseInt(result.ironOre) >= (consume / upgradeRatio[2])) {
                                                    upgradeResult[2] = 1;
                                                }
                                                if (parseInt(result.silverCoin) >= (consume / upgradeRatio[3])) {
                                                    upgradeResult[3] = 1;
                                                }
                                                result.woodCeiling = consumeCeiling + "";
                                                result.woodLevel = (parseInt(result.woodLevel) + 1) + "";
                                            }
                                            if (messageDataJson.bt == "3") {
                                                consume = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.ironOreLevel) + 1);
                                                consumeCeiling = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.ironOreLevel) + 2);
                                                upgradeRatio = [5, 5, 2, 10];
                                                if (parseInt(result.grain) >= (consume / upgradeRatio[0])) {
                                                    upgradeResult[0] = 1;
                                                }
                                                if (parseInt(result.wood) >= (consume / upgradeRatio[1])) {
                                                    upgradeResult[1] = 1;
                                                }
                                                if (parseInt(result.ironOre) >= (consume / upgradeRatio[2])) {
                                                    upgradeResult[2] = 1;
                                                }
                                                if (parseInt(result.silverCoin) >= (consume / upgradeRatio[3])) {
                                                    upgradeResult[3] = 1;
                                                }
                                                result.ironOreCeiling = consumeCeiling + "";
                                                result.ironOreLevel = (parseInt(result.ironOreLevel) + 1) + "";
                                            }
                                            if (messageDataJson.bt == "4") {
                                                consume = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.warriorLevel) + 1);
                                                consumeCeiling = lcInitConfig_1.lcInitConfig.upgradeConsumptionFormula(parseInt(result.warriorLevel) + 2);
                                                upgradeRatio = [5, 5, 5, 5];
                                                if (parseInt(result.grain) >= (consume / upgradeRatio[0])) {
                                                    upgradeResult[0] = 1;
                                                }
                                                if (parseInt(result.wood) >= (consume / upgradeRatio[1])) {
                                                    upgradeResult[1] = 1;
                                                }
                                                if (parseInt(result.ironOre) >= (consume / upgradeRatio[2])) {
                                                    upgradeResult[2] = 1;
                                                }
                                                if (parseInt(result.silverCoin) >= (consume / upgradeRatio[3])) {
                                                    upgradeResult[3] = 1;
                                                }
                                                result.warriorCeiling = consumeCeiling + "";
                                                result.warriorLevel = (parseInt(result.warriorLevel) + 1) + "";
                                            }
                                            if ((upgradeResult[0] + upgradeResult[1] + upgradeResult[2] + upgradeResult[3]) == 4) {
                                                lcInitConfig_1.lcInitConfig.updateARbyAddresToRUpgrade(db, (consume / upgradeRatio[0]) + "", (consume / upgradeRatio[1]) + "", (consume / upgradeRatio[2]) + "", (consume / upgradeRatio[3]) + "", result.grainCeiling, result.woodCeiling, result.ironOreCeiling, result.warriorCeiling, result.grainLevel, result.woodLevel, result.ironOreLevel, result.warriorLevel, srcDataAddres);
                                            }
                                        }
                                    }).catch((error) => { console.error(error); });
                                }
                            }
                            else if (dstData == objStockholder.stockholderTeam && messageDataJsonop == "team") {
                                if (this.isObjGasMoney(objGasMoney.team, dstMoney)) {
                                    lcInitConfig_1.lcInitConfig.updateARbyAddresToHeroList(server, db, messageDataJson.f, srcDataAddres);
                                }
                            }
                            else if (dstData == objStockholder.stockholderJoinWar && messageDataJsonop == "joinWar") {
                                if (this.isObjGasMoney(objGasMoney.joinWar, dstMoney)) {
                                    if (sqlNumStr <= 0) {
                                        lcInitConfig_1.lcInitConfig.updateJoinWarData(db, messageDataJson.t, messageDataJson.w, srcDataAddres, 80000);
                                    }
                                    else {
                                    }
                                }
                            }
                            else if (dstData == objStockholder.stockholderFight && messageDataJsonop == "???????") {
                            }
                        }
                        else {
                            console.error("Error attack block(P):", height);
                        }
                    }
                }
                this.TransactionEndSuccessful(server, db, addBlockJson);
                const sendChatConst = {
                    type: "10000",
                    other: addres,
                    content: "updateBlockHeight",
                    time: new Date()
                };
                server.broadcastMsg('Chat', sendChatConst);
            }).then(async (result) => {
                await new Promise(resolve => setTimeout(resolve, 1500));
                conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, addres).then(async (result) => {
                    let jsonR = JSON.stringify(result);
                    const sendChatConst = {
                        type: "30000",
                        other: addres,
                        content: jsonR,
                        time: new Date()
                    };
                    server.broadcastMsg('Chat', sendChatConst);
                    currentConn.sendMsg('Chat', sendChatConst);
                }).catch((error) => { console.error(error); });
                lcInitConfig_1.lcInitConfig.getEquipmentListByAddres(server, currentConn, db, addres, "1");
            }).catch((error) => { console.error(error); });
        }
        else {
            await conSQLConfig_1.conSQLConfig.addBlockInfo(db, {
                id: "",
                height: height,
                date: "",
                data: ""
            }).then(async (result) => {
                lcInitConfig_1.lcInitConfig.updateARbyResource(server, db, parseInt(height), addres).then(async (result) => {
                }).catch((error) => { console.error(error); });
                const sendChatConst = {
                    type: "10000",
                    other: addres,
                    content: "updateBlockHeight",
                    time: new Date()
                };
                server.broadcastMsg('Chat', sendChatConst);
            }).then(async (result) => {
                conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, addres).then(async (result) => {
                    let jsonR = JSON.stringify(result);
                    if (result) {
                        const sendChatConst = {
                            type: "30000",
                            other: addres,
                            content: jsonR,
                            time: new Date()
                        };
                        currentConn.sendMsg('Chat', sendChatConst);
                    }
                }).catch((error) => { console.error(error); });
            }).catch((error) => { console.error(error); });
        }
    }
    static isPositiveInteger(value) {
        if (value === undefined || value === null) {
            return false;
        }
        const strValue = String(value);
        if (strValue === '') {
            return false;
        }
        const positiveIntegerRegex = /^[1-9]\d*$/;
        return positiveIntegerRegex.test(strValue);
    }
    static async TransactionEndSuccessful(server, db, addBlockJson_end) {
        const filteredTransactions = this.filterSellTransactions(addBlockJson_end.data);
        const sortingTransactions = this.classifyByOt(filteredTransactions);
        if (sortingTransactions.below199.length >= 1) {
            const uniqueDateTransactions199 = this.filterDuplicateDateAndBo(sortingTransactions.below199);
            const sortedTransactions199 = this.keepMinDateForSameBo(uniqueDateTransactions199);
            for (let i = 0; i < sortedTransactions199.length; i++) {
                this.processTransaction(server, db, sortedTransactions199[i], addBlockJson_end.height);
            }
        }
        if (sortingTransactions.equal200.length >= 1) {
            const uniqueDateTransactions200 = this.filterDuplicateDateAndBo(sortingTransactions.equal200);
            const sortedTransactions200 = this.keepMinDateForSameBo(uniqueDateTransactions200);
            for (let i = 0; i < sortedTransactions200.length; i++) {
                this.processTransactionEquipment(server, db, sortedTransactions200[i], addBlockJson_end.height);
            }
        }
        if (sortingTransactions.equal300.length >= 1) {
            const uniqueDateTransactions300 = this.filterDuplicateDateAndBo(sortingTransactions.equal300);
            const sortedTransactions300 = this.keepMinDateForSameBo(uniqueDateTransactions300);
            for (let i = 0; i < sortedTransactions300.length; i++) {
                this.processTransactionHero(server, db, sortedTransactions300[i], addBlockJson_end.height);
            }
        }
    }
    static async processTransaction(server, db, transaction, blockHeight) {
        if (!db)
            throw new Error('Database not initialized');
        const srcAddress = transaction.src;
        const messageObj = this.parseMessage(transaction);
        const blockId = (messageObj && messageObj.bo); //2026-01-29
        if (blockId) {
            try {
                const tradingListData = await lcInitConfig_1.lcInitConfig.getTradingListByBlockId(server, db, blockId);
                if (tradingListData) {
                    if (tradingListData.createAddres != srcAddress) {
                        const obtainType = parseInt(tradingListData.obtainType, 10);
                        const toType = parseInt(tradingListData.toType, 10);
                        const obtainValue = parseInt(tradingListData.obtainValue, 10);
                        const toValue = parseInt(tradingListData.toValue, 10);
                        const addresRoleData = await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcAddress);
                        const addresRoleDataArray = ["", addresRoleData.grain, addresRoleData.wood, addresRoleData.ironOre, addresRoleData.warrior, addresRoleData.silverCoin];
                        if (!addresRoleData) {
                            throw new Error(`Role not found for address: ${srcAddress}`);
                        }
                        const currentObtainResource = parseInt(addresRoleDataArray[obtainType], 10);
                        if (obtainValue > currentObtainResource) {
                            throw new Error(`${blockId},Insufficient resources: need ${obtainValue}, have ${currentObtainResource}`);
                        }
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResource(db, srcAddress, obtainType + "", obtainValue + "", "", "");
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceAdd(db, srcAddress, toType + "", toValue + "");
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceAdd(db, tradingListData.createAddres, obtainType + "", obtainValue + "");
                        await lcInitConfig_1.lcInitConfig.updateTradingListStatus(db, blockHeight, transaction.id, srcAddress, blockId);
                    }
                    else {
                        console.log("Cheating trading:", tradingListData.createAddres, srcAddress);
                    }
                }
            }
            catch (error) {
                console.error('processTransaction failed:', error);
            }
        }
    }
    static async processTransactionEquipment(server, db, transaction, blockHeight) {
        if (!db)
            throw new Error('Database not initialized');
        const srcAddress = transaction.src;
        const messageObj = this.parseMessage(transaction);
        const blockId = (messageObj && messageObj.bo); //2026-01-29
        if (blockId) {
            try {
                const tradingListData = await lcInitConfig_1.lcInitConfig.getTradingListByBlockId(server, db, blockId);
                if (tradingListData) {
                    if (tradingListData.createAddres != srcAddress) {
                        const obtainType = parseInt("5", 10);
                        const toEquipmentValue = parseInt(tradingListData.toEquipmentValue, 10);
                        const addresRoleData = await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcAddress);
                        const addresRoleDataArray = ["", addresRoleData.grain, addresRoleData.wood, addresRoleData.ironOre, addresRoleData.warrior, addresRoleData.silverCoin];
                        if (!addresRoleData) {
                            throw new Error(`Role not found for address: ${srcAddress}`);
                        }
                        const currentObtainResource = parseInt(addresRoleDataArray[obtainType], 10);
                        if (toEquipmentValue > currentObtainResource) {
                            throw new Error(`${blockId},Insufficient resources: need ${toEquipmentValue}, have ${currentObtainResource}`);
                        }
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResource(db, srcAddress, obtainType + "", toEquipmentValue + "", "", "");
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceAdd(db, tradingListData.createAddres, obtainType + "", toEquipmentValue + "");
                        await lcInitConfig_1.lcInitConfig.updateEquipmentListByBlockIDENDTrading(db, tradingListData.equipmentHash, srcAddress, "0", blockHeight, transaction.id);
                        await lcInitConfig_1.lcInitConfig.updateTradingListStatus(db, blockHeight, transaction.id, srcAddress, blockId);
                    }
                    else {
                        console.log("Cheating trading:", tradingListData.createAddres, srcAddress);
                    }
                }
            }
            catch (error) {
                console.error('processTransactionEquipment failed:', error);
            }
        }
    }
    static async processTransactionHero(server, db, transaction, blockHeight) {
        if (!db)
            throw new Error('Database not initialized');
        const srcAddress = transaction.src;
        const messageObj = this.parseMessage(transaction);
        const blockId = (messageObj && messageObj.bo); //2026-01-29
        if (blockId) {
            try {
                const tradingListData = await lcInitConfig_1.lcInitConfig.getTradingListByBlockId(server, db, blockId);
                if (tradingListData) {
                    if (tradingListData.createAddres != srcAddress) {
                        const obtainType = parseInt("5", 10);
                        const toHeroValue = parseInt(tradingListData.toHeroValue, 10);
                        const addresRoleData = await conSQLConfig_1.conSQLConfig.selectAddresRoleByAddres(db, srcAddress);
                        const addresRoleDataArray = ["", addresRoleData.grain, addresRoleData.wood, addresRoleData.ironOre, addresRoleData.warrior, addresRoleData.silverCoin];
                        if (!addresRoleData) {
                            throw new Error(`Role not found for address: ${srcAddress}`);
                        }
                        const currentObtainResource = parseInt(addresRoleDataArray[obtainType], 10);
                        if (toHeroValue > currentObtainResource) {
                            throw new Error(`${blockId},Insufficient resources: need ${toHeroValue}, have ${currentObtainResource}`);
                        }
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResource(db, srcAddress, obtainType + "", toHeroValue + "", "", "");
                        await lcInitConfig_1.lcInitConfig.updateARbyCreateTradeResourceAdd(db, tradingListData.createAddres, obtainType + "", toHeroValue + "");
                        await lcInitConfig_1.lcInitConfig.updateHeroListByBlockIDENDTrading(db, tradingListData.heroHash, srcAddress, "0", blockHeight, transaction.id);
                        await lcInitConfig_1.lcInitConfig.updateTradingListStatus(db, blockHeight, transaction.id, srcAddress, blockId);
                    }
                    else {
                        console.log("Cheating trading:", tradingListData.createAddres, srcAddress);
                    }
                }
            }
            catch (error) {
                console.error('processTransactionHero failed:', error);
            }
        }
    }
}
exports.lcBlockInfo = lcBlockInfo;
