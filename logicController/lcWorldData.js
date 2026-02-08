"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcWorldData = void 0;
const conSQLConfig_1 = require("../sqliteData/conSQLConfig");
const logicBattle_1 = require("./battle/logicBattle");
class lcWorldData {
    static async addWorldData(server, currentConn, db, id, tName, type, incrementType, increment, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant) {
        await conSQLConfig_1.conSQLConfig.addWorldData(db, {
            id: id,
            tName: tName,
            type: type,
            incrementType: incrementType,
            increment: increment,
            occupyAddres: occupyAddres,
            occupyBlock: occupyBlock,
            replaceTime: replaceTime,
            ApplicantNumber: ApplicantNumber,
            Applicant: Applicant
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
    static async addWorldDataList(db, maxHeight) {
        let tNum = (Math.floor(Number(maxHeight) / 50) + 1) * 50;
        let pustData = ["1", "A", "100", "5", "20", "", "0", "" + tNum, "0", ""];
        let tname = [
            "1980 MW 123", "1981 MW 456", "1982 KJ 892", "1983 RT 123", "1984 YB 567", "1985 PL 999", "1986 NA 345", "1987 GH 678", "1988 XZ 234", "1989 QW 789", "1990 LO 543",
            "1991 CV 876", "1992 FD 321", "1993 ER 654", "1994 TY 987", "1995 UI 432", "1996 OP 765", "1997 AS 198", "1998 DF 621", "1999 GH 854", "2000 JK 397",
            "2001 LM 520", "2002 NB 763", "2003 QC 946", "2004 WR 289", "2005 ET 512", "2006 YU 745", "2007 IO 978", "2008 PA 163", "2009 SD 406", "2010 BF 639",
            "2011 VG 872", "2012 CH 215", "2013 RN 448", "2014 KX 681", "2015 MA 914", "2016 LT 257", "2017 ZE 490", "2018 WQ 723", "2019 JY 956", "2020 GO 189",
            "2021 UC 412", "2022 IH 635", "2023 LY 448", "2024 DB 681", "2025 QP 914", "2026 QL 257", "2027 TS 868", "2028 PL 191", "2029 KJ 424", "2030 ZY 657",
            "2031 EM 880", "2032 QW 123", "2033 NR 356", "2034 DX 589", "2035 FT 812", "2036 AC 145", "2037 BV 378", "2038 GI 601", "2039 MH 934", "2040 SO 267",
            "2041 LD 590", "2042 PE 823", "2043 RU 156", "2044 YC 389"
        ];
        for (let i = 1; i < 65; i++) {
            await conSQLConfig_1.conSQLConfig.addWorldData(db, {
                id: i + "",
                tName: tname[i],
                type: pustData[2],
                incrementType: pustData[3],
                increment: pustData[4],
                occupyAddres: pustData[5],
                occupyBlock: pustData[6],
                replaceTime: pustData[7],
                ApplicantNumber: pustData[8],
                Applicant: pustData[9]
            }).then((result) => {
            }).catch((error) => { console.error(error); });
        }
    }
    static async selectWorldDataInfo(server, currentConn, db) {
        await conSQLConfig_1.conSQLConfig.selectWorldDataInfo(db).then((result) => {
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
    static async selectWorldDataPage(currentConn, db, other) {
        conSQLConfig_1.conSQLConfig.selectWorldDataPage(db, other).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "22000",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async selectWorldDataPage8(currentConn, db, other, height) {
        conSQLConfig_1.conSQLConfig.selectWorldDataPage8(db, other).then((result) => {
            let jsonR = JSON.stringify(result);
            let res = JSON.parse(jsonR);
            ;
            for (let i = 0; i < res.length; i++) {
                let applicantList = res[i].Applicant.split(",");
                applicantList[0] = res[i].occupyAddres;
                if (res[i].occupyAddres === "" && applicantList.length >= 2) {
                    applicantList.shift();
                }
                logicBattle_1.logicBattle.loadInitData(currentConn, db, applicantList, res[i].id, res[i].type, res[i].replaceTime, res[i].ApplicantNumber, height);
            }
        }).catch((error) => { console.error(error); });
    }
    static async selectWorldDataByID(currentConn, db, other) {
        conSQLConfig_1.conSQLConfig.selectWorldDataByID(db, other).then((result) => {
            let jsonR = JSON.stringify(result);
            const sendChatConst = {
                type: "22002",
                other: "",
                content: jsonR,
                time: new Date()
            };
            currentConn.sendMsg('Chat', sendChatConst);
        }).catch((error) => { console.error(error); });
    }
    static async updateWorldData(currentConn, db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id) {
        conSQLConfig_1.conSQLConfig.updateWorldData(db, occupyAddres, occupyBlock, replaceTime, ApplicantNumber, Applicant, id).then((result) => {
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
    static async updateJoinWarData(db, warType, warValue, warAddres, warCost) {
        conSQLConfig_1.conSQLConfig.updateJoinWarData(db, warType, warValue, warAddres, warCost).then((result) => {
            if (result == 1) {
                conSQLConfig_1.conSQLConfig.updateARbyCreateTradeResource(db, warAddres, "4", warCost + "", "", "").then((result) => {
                    if (result == 0) {
                        console.log("updateJoinWarData-updateARbyCreateTradeResource-fail");
                    }
                }).catch((error) => { console.error(error); });
            }
        }).catch((error) => { console.error(error); });
    }
}
exports.lcWorldData = lcWorldData;
