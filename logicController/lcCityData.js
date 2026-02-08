"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcCityData = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
class lcCityData {
    static async addCityData(server, currentConn, db, id, type, incrementType, increment, occupyAddres, occupyBlock) {
        await conSQLConfig_1.conSQLConfig.addCityData(db, {
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
    static async addCityDataList(db) {
        let pustData = [
            ["1", "101", "1", "1", "", "0"],
            ["2", "101", "1", "2", "", "0"],
            ["3", "101", "1", "3", "", "0"],
            ["4", "101", "1", "4", "", "0"],
            ["5", "101", "1", "5", "", "0"],
            ["6", "101", "1", "6", "", "0"],
            ["7", "101", "1", "7", "", "0"],
            ["8", "101", "1", "8", "", "0"],
            ["9", "101", "1", "9", "", "0"],
            ["10", "101", "1", "10", "", "0"],
            ["11", "101", "1", "11", "", "0"],
            ["12", "101", "1", "12", "", "0"],
            ["13", "101", "1", "13", "", "0"],
            ["14", "101", "1", "14", "", "0"],
            ["15", "101", "1", "15", "", "0"],
            ["16", "101", "1", "16", "", "0"],
            ["17", "101", "1", "17", "", "0"],
            ["18", "101", "1", "18", "", "0"],
            ["19", "101", "1", "19", "", "0"],
            ["20", "101", "1", "20", "", "0"],
            ["21", "101", "2", "1", "", "0"],
            ["22", "101", "2", "2", "", "0"],
            ["23", "101", "2", "3", "", "0"],
            ["24", "101", "2", "4", "", "0"],
            ["25", "101", "2", "5", "", "0"],
            ["26", "101", "2", "6", "", "0"],
            ["27", "101", "2", "7", "", "0"],
            ["28", "101", "2", "8", "", "0"],
            ["29", "101", "2", "9", "", "0"],
            ["30", "101", "2", "10", "", "0"],
            ["31", "101", "2", "11", "", "0"],
            ["32", "101", "2", "12", "", "0"],
            ["33", "101", "2", "13", "", "0"],
            ["34", "101", "2", "14", "", "0"],
            ["35", "101", "2", "15", "", "0"],
            ["36", "101", "2", "16", "", "0"],
            ["37", "101", "2", "17", "", "0"],
            ["38", "101", "2", "18", "", "0"],
            ["39", "101", "2", "19", "", "0"],
            ["40", "101", "2", "20", "", "0"],
            ["41", "101", "3", "1", "", "0"],
            ["42", "101", "3", "2", "", "0"],
            ["43", "101", "3", "3", "", "0"],
            ["44", "101", "3", "4", "", "0"],
            ["45", "101", "3", "5", "", "0"],
            ["46", "101", "3", "6", "", "0"],
            ["47", "101", "3", "7", "", "0"],
            ["48", "101", "3", "8", "", "0"],
            ["49", "101", "3", "9", "", "0"],
            ["50", "101", "3", "10", "", "0"],
            ["51", "101", "3", "11", "", "0"],
            ["52", "101", "3", "12", "", "0"],
            ["53", "101", "3", "13", "", "0"],
            ["54", "101", "3", "14", "", "0"],
            ["55", "101", "3", "15", "", "0"],
            ["56", "101", "3", "16", "", "0"],
            ["57", "101", "3", "17", "", "0"],
            ["58", "101", "3", "18", "", "0"],
            ["59", "101", "3", "19", "", "0"],
            ["60", "101", "3", "20", "", "0"],
            ["61", "101", "4", "1", "", "0"],
            ["62", "101", "4", "2", "", "0"],
            ["63", "101", "4", "3", "", "0"],
            ["64", "101", "4", "4", "", "0"],
            ["65", "101", "4", "5", "", "0"],
            ["66", "101", "4", "6", "", "0"],
            ["67", "101", "4", "7", "", "0"],
            ["68", "101", "4", "8", "", "0"],
            ["69", "101", "4", "9", "", "0"],
            ["70", "101", "4", "10", "", "0"],
            ["71", "101", "4", "11", "", "0"],
            ["72", "101", "4", "12", "", "0"],
            ["73", "101", "4", "13", "", "0"],
            ["74", "101", "4", "14", "", "0"],
            ["75", "101", "4", "15", "", "0"],
            ["76", "101", "4", "16", "", "0"],
            ["77", "101", "4", "17", "", "0"],
            ["78", "101", "4", "18", "", "0"],
            ["79", "101", "4", "19", "", "0"],
            ["80", "101", "4", "20", "", "0"]
        ];
        for (let i = 0; i < pustData.length; i++) {
            await conSQLConfig_1.conSQLConfig.addCityData(db, {
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
    static async selectCityDataInfo(server, currentConn, db) {
        await conSQLConfig_1.conSQLConfig.selectCityDataInfo(db).then((result) => {
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
    static async updateCityData(server, currentConn, db, occupyAddres, occupyBlock, id) {
        conSQLConfig_1.conSQLConfig.updateCityData(db, occupyAddres, occupyBlock, id).then((result) => {
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
exports.lcCityData = lcCityData;
