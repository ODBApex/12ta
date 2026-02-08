"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcShopsData = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
class lcShopsData {
    static async addShopsData(server, currentConn, db, id, type, incrementType, increment, occupyAddres, occupyBlock) {
        await conSQLConfig_1.conSQLConfig.addShopsData(db, {
            id: id,
            type: type,
            incrementType: incrementType,
            increment: increment,
            occupyAddres: occupyAddres,
            occupyBlock: occupyBlock
        }).then((result) => {
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
    static async addShopsDataList(db) {
        let pustData = [
            ["1", "102", "1", "1", "", "0"],
            ["2", "102", "1", "2", "", "0"],
            ["3", "102", "1", "3", "", "0"],
            ["4", "102", "1", "4", "", "0"],
            ["5", "102", "1", "5", "", "0"],
            ["6", "102", "1", "6", "", "0"],
            ["7", "102", "1", "7", "", "0"],
            ["8", "102", "1", "8", "", "0"],
            ["9", "102", "1", "9", "", "0"],
            ["10", "102", "1", "10", "", "0"],
            ["11", "102", "1", "11", "", "0"],
            ["12", "102", "1", "12", "", "0"],
            ["13", "102", "1", "13", "", "0"],
            ["14", "102", "1", "14", "", "0"],
            ["15", "102", "1", "15", "", "0"],
            ["16", "102", "1", "16", "", "0"],
            ["17", "102", "1", "17", "", "0"],
            ["18", "102", "1", "18", "", "0"],
            ["19", "102", "1", "19", "", "0"],
            ["20", "102", "1", "20", "", "0"],
            ["21", "102", "2", "1", "", "0"],
            ["22", "102", "2", "2", "", "0"],
            ["23", "102", "2", "3", "", "0"],
            ["24", "102", "2", "4", "", "0"],
            ["25", "102", "2", "5", "", "0"],
            ["26", "102", "2", "6", "", "0"],
            ["27", "102", "2", "7", "", "0"],
            ["28", "102", "2", "8", "", "0"],
            ["29", "102", "2", "9", "", "0"],
            ["30", "102", "2", "10", "", "0"],
            ["31", "102", "2", "11", "", "0"],
            ["32", "102", "2", "12", "", "0"],
            ["33", "102", "2", "13", "", "0"],
            ["34", "102", "2", "14", "", "0"],
            ["35", "102", "2", "15", "", "0"],
            ["36", "102", "2", "16", "", "0"],
            ["37", "102", "2", "17", "", "0"],
            ["38", "102", "2", "18", "", "0"],
            ["39", "102", "2", "19", "", "0"],
            ["40", "102", "2", "20", "", "0"],
            ["41", "102", "3", "1", "", "0"],
            ["42", "102", "3", "2", "", "0"],
            ["43", "102", "3", "3", "", "0"],
            ["44", "102", "3", "4", "", "0"],
            ["45", "102", "3", "5", "", "0"],
            ["46", "102", "3", "6", "", "0"],
            ["47", "102", "3", "7", "", "0"],
            ["48", "102", "3", "8", "", "0"],
            ["49", "102", "3", "9", "", "0"],
            ["50", "102", "3", "10", "", "0"],
            ["51", "102", "3", "11", "", "0"],
            ["52", "102", "3", "12", "", "0"],
            ["53", "102", "3", "13", "", "0"],
            ["54", "102", "3", "14", "", "0"],
            ["55", "102", "3", "15", "", "0"],
            ["56", "102", "3", "16", "", "0"],
            ["57", "102", "3", "17", "", "0"],
            ["58", "102", "3", "18", "", "0"],
            ["59", "102", "3", "19", "", "0"],
            ["60", "102", "3", "20", "", "0"],
            ["61", "102", "4", "1", "", "0"],
            ["62", "102", "4", "2", "", "0"],
            ["63", "102", "4", "3", "", "0"],
            ["64", "102", "4", "4", "", "0"],
            ["65", "102", "4", "5", "", "0"],
            ["66", "102", "4", "6", "", "0"],
            ["67", "102", "4", "7", "", "0"],
            ["68", "102", "4", "8", "", "0"],
            ["69", "102", "4", "9", "", "0"],
            ["70", "102", "4", "10", "", "0"],
            ["71", "102", "4", "11", "", "0"],
            ["72", "102", "4", "12", "", "0"],
            ["73", "102", "4", "13", "", "0"],
            ["74", "102", "4", "14", "", "0"],
            ["75", "102", "4", "15", "", "0"],
            ["76", "102", "4", "16", "", "0"],
            ["77", "102", "4", "17", "", "0"],
            ["78", "102", "4", "18", "", "0"],
            ["79", "102", "4", "19", "", "0"],
            ["80", "102", "4", "20", "", "0"]
        ];
        for (let i = 0; i < pustData.length; i++) {
            await conSQLConfig_1.conSQLConfig.addShopsData(db, {
                id: pustData[i][0],
                type: pustData[i][1],
                incrementType: pustData[i][2],
                increment: pustData[i][3],
                occupyAddres: pustData[i][4],
                occupyBlock: pustData[i][5]
            }).then((result) => {
            }).catch((error) => { console.error(error); });
        }
    }
    static async selectShopsDataInfo(server, currentConn, db) {
        await conSQLConfig_1.conSQLConfig.selectShopsDataInfo(db).then((result) => {
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
    static async updateShopsData(server, currentConn, db, occupyAddres, occupyBlock, id) {
        conSQLConfig_1.conSQLConfig.updateShopsData(db, occupyAddres, occupyBlock, id).then((result) => {
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
}
exports.lcShopsData = lcShopsData;
