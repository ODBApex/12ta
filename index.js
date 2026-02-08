"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexConnDataRecord = exports.loginIndexData = exports.server = void 0;
const path = __importStar(require("path"));
const tsrpc_1 = require("tsrpc");
const serviceProto_1 = require("./shared/protocols/serviceProto");
const conSQLConfig_1 = require("./sqliteData/conSQLConfig");
const lcInitConfig_1 = require("./logicController/lcInitConfig");
exports.server = new tsrpc_1.WsServer(serviceProto_1.serviceProto, {
    heartbeatWaitTime: 247000,
    logMsg: false,
    port: 3000,
    json: true
});
async function init() {
    await exports.server.autoImplementApi(path.resolve(__dirname, 'api'));
}
;
exports.loginIndexData = [];
const indexStartPay = 1352500;
const objStockholderCopy = {
    "stockholderCreate": "51104056421913253057301041600838205943112627602261514958403702040404",
    "stockholderRenewal": "51165156543932094718200110072404200454551323423914614534464303060607",
    "stockholderSend": "51195740182519272434091445301752375109572008040415405147221404060608",
    "stockholderMake": "51275332565428174718234002544824271005555738120106425146062805060607",
    "stockholderHero": "51142233152404041440344215520617432909355516240124295922373106060707",
    "stockholderEquipment": "51122022274218154832082325395954460701424631454047184253385207010702",
    "stockholderTrading": "51151937321949136060044355314337081038162743231408433416593408080708",
    "stockholderUpOperate": "51115342065339076025013252471214522501133349160837594626204209080809",
    "stockholderTeam": "51125905370553042706040517270351220324511648091309150125585543595959",
    "stockholderJoinWar": "51174633341304200236571660125818334957600356181451140731351530606060",
    "stockholderFight": "51165954280110374618456102595708264357064913143334224227105218353535"
};
const objStockholder = {
    "stockholderCreate": "",
    "stockholderRenewal": "",
    "stockholderSend": "",
    "stockholderMake": "",
    "stockholderHero": "",
    "stockholderEquipment": "",
    "stockholderTrading": "",
    "stockholderUpOperate": "",
    "stockholderTeam": "",
    "stockholderJoinWar": "",
    "stockholderFight": "",
};
let resultCreate = [];
let resultRenewal = [];
let resultSend = [];
let resultMake = [];
let resultHero = [];
let resultEquipment = [];
let resultTrading = [];
let resultUpOperate = [];
let resultTeam = [];
let resultJoinWar = [];
let resultFight = [];
for (let i = 0; i < objStockholderCopy.stockholderCreate.length; i += 2) {
    let groupCreate = objStockholderCopy.stockholderCreate.substring(i, i + 2);
    resultCreate.push(groupCreate);
    let groupRenewal = objStockholderCopy.stockholderRenewal.substring(i, i + 2);
    resultRenewal.push(groupRenewal);
    let groupSend = objStockholderCopy.stockholderSend.substring(i, i + 2);
    resultSend.push(groupSend);
    let groupMake = objStockholderCopy.stockholderMake.substring(i, i + 2);
    resultMake.push(groupMake);
    let groupHero = objStockholderCopy.stockholderHero.substring(i, i + 2);
    resultHero.push(groupHero);
    let groupEquipment = objStockholderCopy.stockholderEquipment.substring(i, i + 2);
    resultEquipment.push(groupEquipment);
    let groupTrading = objStockholderCopy.stockholderTrading.substring(i, i + 2);
    resultTrading.push(groupTrading);
    let groupUpOperate = objStockholderCopy.stockholderUpOperate.substring(i, i + 2);
    resultUpOperate.push(groupUpOperate);
    let groupTeam = objStockholderCopy.stockholderTeam.substring(i, i + 2);
    resultTeam.push(groupTeam);
    let groupJoinWar = objStockholderCopy.stockholderJoinWar.substring(i, i + 2);
    resultJoinWar.push(groupJoinWar);
    let groupFight = objStockholderCopy.stockholderFight.substring(i, i + 2);
    resultFight.push(groupFight);
}
let goAddresCreate = "";
let goAddresRenewal = "";
let goAddresSend = "";
let goAddresMake = "";
let goAddresHero = "";
let goAddresEquipment = "";
let goAddresTrading = "";
let goAddresUpOperate = "";
let goAddresTeam = "";
let goAddresJoinWar = "";
let goAddresFight = "";
for (let i = 0; i < resultCreate.length; i++) {
    goAddresCreate += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultCreate[i]);
    goAddresRenewal += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultRenewal[i]);
    goAddresSend += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultSend[i]);
    goAddresMake += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultMake[i]);
    goAddresHero += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultHero[i]);
    goAddresEquipment += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultEquipment[i]);
    goAddresTrading += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultTrading[i]);
    goAddresUpOperate += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultUpOperate[i]);
    goAddresTeam += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultTeam[i]);
    goAddresJoinWar += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultJoinWar[i]);
    goAddresFight += lcInitConfig_1.lcInitConfig.intToStrUtlis_aA(resultFight[i]);
}
objStockholder.stockholderCreate = goAddresCreate;
objStockholder.stockholderRenewal = goAddresRenewal;
objStockholder.stockholderSend = goAddresSend;
objStockholder.stockholderMake = goAddresMake;
objStockholder.stockholderHero = goAddresHero;
objStockholder.stockholderEquipment = goAddresEquipment;
objStockholder.stockholderTrading = goAddresTrading;
objStockholder.stockholderUpOperate = goAddresUpOperate;
objStockholder.stockholderTeam = goAddresTeam;
objStockholder.stockholderJoinWar = goAddresJoinWar;
objStockholder.stockholderFight = goAddresFight;
Object.freeze(objStockholder);
exports.indexConnDataRecord = [];
async function main() {
    await init();
    await exports.server.start();
    const db = await lcInitConfig_1.lcInitConfig.initDB();
    let handler = exports.server.listenMsg('Chat', async (call) => {
        let currentConn = call.conn;
        if (call.msg.type == "10000") {
            const addBlockJson = JSON.parse(call.msg.content);
            lcInitConfig_1.lcInitConfig.addBlockInfo(exports.server, currentConn, db, indexStartPay, call.msg.other, objStockholder, addBlockJson.id, addBlockJson.height, addBlockJson.date, call.msg.content);
        }
        else if (call.msg.type == "20000") {
            lcInitConfig_1.lcInitConfig.getMaxHeight(exports.server, currentConn, db, indexStartPay);
        }
        else if (call.msg.type == "20001") {
            let connData = exports.indexConnDataRecord.find(endConnDataRecords => endConnDataRecords.id === call.conn.id);
            connData.home = "1";
            lcInitConfig_1.lcInitConfig.getAddresRoleByAddres(exports.server, currentConn, db, call.msg.content);
        }
        else if (call.msg.type == "20002") {
            lcInitConfig_1.lcInitConfig.getHeroListByAddres(exports.server, currentConn, db, call.msg.content, call.msg.other);
        }
        else if (call.msg.type == "20003") {
            lcInitConfig_1.lcInitConfig.getHeroListByHeroHash(exports.server, currentConn, db, call.msg.content);
        }
        else if (call.msg.type == "20004") {
            lcInitConfig_1.lcInitConfig.getEquipmentListByAddres(exports.server, currentConn, db, call.msg.content, call.msg.other);
        }
        else if (call.msg.type == "20005") {
            lcInitConfig_1.lcInitConfig.getTradingListOnlineAll(exports.server, currentConn, db, call.msg.other);
        }
        else if (call.msg.type == "20006") {
            lcInitConfig_1.lcInitConfig.getTradingListDepositAll(exports.server, currentConn, db, call.msg.other, call.msg.content);
        }
        else if (call.msg.type == "21000") {
            lcInitConfig_1.lcInitConfig.selectAddresHeroNum(currentConn, db, call.msg.content);
        }
        else if (call.msg.type == "21001") {
            lcInitConfig_1.lcInitConfig.selectAddresEquipmentNum(currentConn, db, call.msg.content);
        }
        else if (call.msg.type == "21002") {
            lcInitConfig_1.lcInitConfig.selectAddresSilverCoinNum(currentConn, db, call.msg.content);
        }
        else if (call.msg.type == "22000") {
            lcInitConfig_1.lcInitConfig.getWorldDataPage(currentConn, db, call.msg.other);
        }
        else if (call.msg.type == "22001") {
            lcInitConfig_1.lcInitConfig.getWorldHistoryPage6(currentConn, db, call.msg.other, call.msg.content);
        }
        else if (call.msg.type == "22002") {
            lcInitConfig_1.lcInitConfig.getWorldDataByID(currentConn, db, call.msg.other);
        }
        // console.log("connections:",server.connections.length);
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "blockInfo").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no blockInfo");
            conSQLConfig_1.conSQLConfig.createBlockInfo(db);
            console.log("create blockInfo");
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "addresRole").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no addresRole");
            conSQLConfig_1.conSQLConfig.createAddresRole(db);
            console.log("create addresRole");
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "worldData").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no worldData");
            conSQLConfig_1.conSQLConfig.createWorldData(db);
            console.log("create worldData");
            conSQLConfig_1.conSQLConfig.selectMaxBlockInfoHeight(db).then((maxResult) => {
                let jsonR = JSON.stringify(maxResult);
                let jsonQ = JSON.parse(jsonR);
                console.log("add worldData data");
                lcInitConfig_1.lcInitConfig.addWorldDataList(db, jsonQ.maxHeight);
            }).catch((error) => { console.error(error); });
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "worldHistory").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no worldHistory");
            conSQLConfig_1.conSQLConfig.createWorldHistory(db);
            console.log("create worldHistory");
            lcInitConfig_1.lcInitConfig.addWorldHistory(db, "1", "100", "1566666", "3", ",Pegod4nnYaBoZvzvBiDTXok98gEhczw98A,Purq7gtCoqgBnY4zQ3BsndxTfXWBDU6AhL,Pn7dBrzgi15kAFmsuiFBYHAQVu4Pjwn83m", "Purq7gtCoqgBnY4zQ3BsndxTfXWBDU6AhL", "1566660", "", "", "", "", "");
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "cityData").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no cityData");
            conSQLConfig_1.conSQLConfig.createCityData(db);
            console.log("create cityData");
            lcInitConfig_1.lcInitConfig.addCityDataList(db);
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "shopsData").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no shopsData");
            conSQLConfig_1.conSQLConfig.createShopsData(db);
            console.log("create shopsData");
            lcInitConfig_1.lcInitConfig.addShopsDataList(db);
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "heroList").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no heroList");
            conSQLConfig_1.conSQLConfig.createHeroList(db);
            console.log("create heroList");
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "equipmentList").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no equipmentList");
            conSQLConfig_1.conSQLConfig.createEquipmentList(db);
            console.log("create equipmentList");
        }
    });
    await conSQLConfig_1.conSQLConfig.isSQLDataTable(db, "tradingList").then((result) => {
        if (typeof result === 'undefined') {
            console.log("no tradingList");
            conSQLConfig_1.conSQLConfig.createTradingList(db);
            console.log("create tradingList");
        }
    });
    exports.server.flows.postConnectFlow.push((v) => {
        console.log(v.id, "Client disconnected");
        let conData = {
            "id": v.id + "",
            "home": "0",
            "data": "",
            "online": "1",
            "connTime": new Date() + "",
            "endTime": ""
        };
        exports.indexConnDataRecord.push(conData);
        return v;
    });
    exports.server.flows.postDisconnectFlow.push((v) => {
        console.log(v.conn.id, "Client disconnected");
        let endData = exports.indexConnDataRecord.find(endConnDataRecords => endConnDataRecords.id === v.conn.id);
        if (endData) {
            const index = exports.indexConnDataRecord.indexOf(endData);
            exports.indexConnDataRecord.splice(index, 1);
        }
        const sendChatConst = {
            type: "90000",
            other: "",
            content: "",
            time: new Date()
        };
        if (exports.server.connections.length >= 1) {
            let firstItemWithStatus1 = exports.indexConnDataRecord.find(indexConnDataRecords => indexConnDataRecords.home === "1");
            if (firstItemWithStatus1) {
                let redIindex = exports.server.connections.findIndex(serverData => serverData.id === firstItemWithStatus1.id);
                exports.server.broadcastMsg('Chat', sendChatConst, [exports.server.connections[redIindex]]);
            }
            else {
                console.log("Block update subject not found...");
            }
        }
        return v;
    });
}
function executeEveryMinute() {
    const sendChatConst = {
        type: "90000",
        other: "",
        content: "",
        time: new Date()
    };
    exports.server.broadcastMsg('Chat', sendChatConst, [exports.server.connections[0]]);
}
main();
