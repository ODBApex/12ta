"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcWorldHistory = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
class lcWorldHistory {
    static async addWorldHistory(db, worldDataID, worldDatatype, blockReplaceTime, applicantNumber, applicantList, winAddress, generateBlock, playBack1, playBack2, playBack3, playBack4, playBack5) {
        await conSQLConfig_1.conSQLConfig.addWorldHistory(db, {
            worldDataID: worldDataID,
            worldDatatype: worldDatatype,
            blockReplaceTime: blockReplaceTime,
            applicantNumber: applicantNumber,
            applicantList: applicantList,
            winAddress: winAddress,
            generateBlock: generateBlock,
            playBack1: playBack1,
            playBack2: playBack2,
            playBack3: playBack3,
            playBack4: playBack4,
            playBack5: playBack5
        }).then((result) => {
            let jsonR = JSON.stringify(result);
        }).catch((error) => { console.error(error); });
    }
    static async getWorldHistoryPage6(currentConn, db, other, worldDataID) {
        conSQLConfig_1.conSQLConfig.selectWorldHistoryPage6(db, other, worldDataID).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "22001",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
}
exports.lcWorldHistory = lcWorldHistory;
