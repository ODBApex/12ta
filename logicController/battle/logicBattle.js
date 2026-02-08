"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logicBattle = void 0;
const conSQLConfig_1 = require("../../sqliteData/conSQLConfig");
const pathFs_1 = require("./pathFs");
const utlisBattle_1 = require("./utlisBattle");
let returnBattleDataNew;
class logicBattle {
    static getFormationTime(index) {
        const mapData = pathFs_1.pathFs.loadMapData();
        if (index >= mapData._monsterTime.length) {
            index = mapData._monsterTime.length - 1;
        }
        return mapData._monsterTime[index];
    }
    static loadInitData(currentConn, db, addresArray, worldDataID, worldDatatype, blockReplaceTime, applicantNumber, generateBlock) {
        conSQLConfig_1.conSQLConfig.selectARHeroListByArrayAddres(db, addresArray).then((result) => {
            const parseToNumArray14 = (str) => {
                const parts = str.split("_").map(Number);
                if (parts.length !== 14) {
                    throw new Error(`Does not meet the 14 element requirement：${parts.length}`);
                }
                return parts;
            };
            let petArray;
            let petArrayList = [];
            let heroListData = [];
            let addresData = [];
            for (let i = 0; i < result.length; i++) {
                const resHeroList = JSON.parse(result[i].heroList);
                heroListData.push(resHeroList);
                const heroData1 = parseToNumArray14(result[i].warHeroValue1);
                const heroData2 = parseToNumArray14(result[i].warHeroValue2);
                const heroData3 = parseToNumArray14(result[i].warHeroValue3);
                const heroData4 = parseToNumArray14(result[i].warHeroValue4);
                const heroData5 = parseToNumArray14(result[i].warHeroValue5);
                petArray = [heroData1, heroData2, heroData3, heroData4, heroData5];
                petArrayList.push(petArray);
                addresData.push(result[i].addres);
            }
            let oneBattleData1 = [];
            let winnerIndex1 = [];
            for (let j = 1; j < petArrayList.length; j++) {
                returnBattleDataNew = logicBattle.InitData(heroListData[0], heroListData[j], petArrayList[0], petArrayList[j], addresData[0], addresData[j]);
                let goBattlefieldData = logicBattle.startFight();
                returnBattleDataNew.battlefieldData = goBattlefieldData;
                if (goBattlefieldData[goBattlefieldData.length - 1][0] == 9999) {
                    winnerIndex1.push(j);
                }
                oneBattleData1.push(returnBattleDataNew);
            }
            let wi1 = winnerIndex1.length;
            if (wi1 <= 1) {
                let victoryAddres = addresArray[0];
                if (wi1 == 1) {
                    victoryAddres = addresArray[winnerIndex1[0]];
                }
                let bTime = Math.floor(Number(generateBlock) / 100) * 100;
                conSQLConfig_1.conSQLConfig.addWorldHistory(db, {
                    worldDataID: worldDataID,
                    worldDatatype: worldDatatype,
                    blockReplaceTime: String(bTime + 100),
                    applicantNumber: applicantNumber,
                    applicantList: JSON.stringify(addresArray),
                    winAddress: victoryAddres,
                    generateBlock: generateBlock,
                    playBack1: JSON.stringify(oneBattleData1),
                    playBack2: "",
                    playBack3: "",
                    playBack4: "",
                    playBack5: ""
                });
                conSQLConfig_1.conSQLConfig.updateWorldData(db, victoryAddres, String(bTime + 100), String(bTime + 200), "0", "", worldDataID).then((result) => {
                    let sendChatConst = {
                        type: "39000",
                        other: "1",
                        content: "",
                        time: new Date()
                    };
                    currentConn.sendMsg('Chat', sendChatConst);
                });
                return;
            }
            let oneBattleData2 = [];
            let winnerIndex2 = [];
            let lengthNumber1 = winnerIndex1.length;
            if (lengthNumber1 >= 2) {
                for (let j = 0; j < Math.floor(lengthNumber1 / 2); j++) {
                    let jNum = j * 2;
                    returnBattleDataNew = logicBattle.InitData(heroListData[winnerIndex1[jNum]], heroListData[winnerIndex1[jNum + 1]], petArrayList[winnerIndex1[jNum]], petArrayList[winnerIndex1[jNum + 1]], addresData[winnerIndex1[jNum]], addresData[winnerIndex1[jNum + 1]]);
                    let goBattlefieldData = logicBattle.startFight();
                    returnBattleDataNew.battlefieldData = goBattlefieldData;
                    if (goBattlefieldData[goBattlefieldData.length - 1][0] == 9999) {
                        winnerIndex2.push(winnerIndex1[jNum + 1]);
                    }
                    else {
                        winnerIndex2.push(winnerIndex1[jNum]);
                    }
                    if (lengthNumber1 % 2 != 0 && j == Math.floor(lengthNumber1 / 2) - 1) {
                        winnerIndex2.push(winnerIndex1[jNum + 2]);
                    }
                    oneBattleData2.push(returnBattleDataNew);
                }
            }
            if (winnerIndex2.length == 1) {
                conSQLConfig_1.conSQLConfig.addWorldHistory(db, {
                    worldDataID: worldDataID,
                    worldDatatype: worldDatatype,
                    blockReplaceTime: blockReplaceTime,
                    applicantNumber: applicantNumber,
                    applicantList: JSON.stringify(addresArray),
                    winAddress: addresArray[winnerIndex2[0]],
                    generateBlock: generateBlock,
                    playBack1: JSON.stringify(oneBattleData1),
                    playBack2: JSON.stringify(oneBattleData2),
                    playBack3: "",
                    playBack4: "",
                    playBack5: ""
                });
                conSQLConfig_1.conSQLConfig.updateWorldData(db, addresArray[winnerIndex2[0]], blockReplaceTime, String(Number(blockReplaceTime) + 100), "0", "", worldDataID).then((result) => {
                    let sendChatConst = {
                        type: "39000",
                        other: "1",
                        content: "",
                        time: new Date()
                    };
                    currentConn.sendMsg('Chat', sendChatConst);
                });
                return;
            }
            let oneBattleData3 = [];
            let winnerIndex3 = [];
            let lengthNumber2 = winnerIndex2.length;
            if (lengthNumber2 >= 2) {
                for (let j = 0; j < Math.floor(lengthNumber2 / 2); j++) {
                    let jNum = j * 2;
                    returnBattleDataNew = logicBattle.InitData(heroListData[winnerIndex2[jNum]], heroListData[winnerIndex2[jNum + 1]], petArrayList[winnerIndex2[jNum]], petArrayList[winnerIndex2[jNum + 1]], addresData[winnerIndex2[jNum]], addresData[winnerIndex2[jNum + 1]]);
                    let goBattlefieldData = logicBattle.startFight();
                    returnBattleDataNew.battlefieldData = goBattlefieldData;
                    if (goBattlefieldData[goBattlefieldData.length - 1][0] == 9999) {
                        winnerIndex3.push(winnerIndex2[jNum + 1]);
                    }
                    else {
                        winnerIndex3.push(winnerIndex2[jNum]);
                    }
                    if (lengthNumber2 % 2 != 0 && j == Math.floor(lengthNumber2 / 2) - 1) {
                        winnerIndex3.push(winnerIndex2[jNum + 2]);
                    }
                    oneBattleData3.push(returnBattleDataNew);
                }
            }
            if (winnerIndex3.length == 1) {
                conSQLConfig_1.conSQLConfig.addWorldHistory(db, {
                    worldDataID: worldDataID,
                    worldDatatype: worldDatatype,
                    blockReplaceTime: blockReplaceTime,
                    applicantNumber: applicantNumber,
                    applicantList: JSON.stringify(addresArray),
                    winAddress: addresArray[winnerIndex3[0]],
                    generateBlock: generateBlock,
                    playBack1: JSON.stringify(oneBattleData1),
                    playBack2: JSON.stringify(oneBattleData2),
                    playBack3: JSON.stringify(oneBattleData3),
                    playBack4: "",
                    playBack5: ""
                });
                conSQLConfig_1.conSQLConfig.updateWorldData(db, addresArray[winnerIndex3[0]], blockReplaceTime, String(Number(blockReplaceTime) + 100), "0", "", worldDataID).then((result) => {
                    let sendChatConst = {
                        type: "39000",
                        other: "1",
                        content: "",
                        time: new Date()
                    };
                    currentConn.sendMsg('Chat', sendChatConst);
                });
                return;
            }
            let oneBattleData4 = [];
            let winnerIndex4 = [];
            let lengthNumber3 = winnerIndex3.length;
            if (lengthNumber3 >= 2) {
                for (let j = 0; j < Math.floor(lengthNumber3 / 2); j++) {
                    let jNum = j * 2;
                    returnBattleDataNew = logicBattle.InitData(heroListData[winnerIndex3[jNum]], heroListData[winnerIndex3[jNum + 1]], petArrayList[winnerIndex3[jNum]], petArrayList[winnerIndex3[jNum + 1]], addresData[winnerIndex3[jNum]], addresData[winnerIndex3[jNum + 1]]);
                    let goBattlefieldData = logicBattle.startFight();
                    returnBattleDataNew.battlefieldData = goBattlefieldData;
                    if (goBattlefieldData[goBattlefieldData.length - 1][0] == 9999) {
                        winnerIndex4.push(winnerIndex3[jNum + 1]);
                    }
                    else {
                        winnerIndex4.push(winnerIndex3[jNum]);
                    }
                    if (lengthNumber3 % 2 != 0 && j == Math.floor(lengthNumber3 / 2) - 1) {
                        winnerIndex4.push(winnerIndex3[jNum + 2]);
                    }
                    oneBattleData4.push(returnBattleDataNew);
                }
            }
            if (winnerIndex4.length == 1) {
                conSQLConfig_1.conSQLConfig.addWorldHistory(db, {
                    worldDataID: worldDataID,
                    worldDatatype: worldDatatype,
                    blockReplaceTime: blockReplaceTime,
                    applicantNumber: applicantNumber,
                    applicantList: JSON.stringify(addresArray),
                    winAddress: addresArray[winnerIndex4[0]],
                    generateBlock: generateBlock,
                    playBack1: JSON.stringify(oneBattleData1),
                    playBack2: JSON.stringify(oneBattleData2),
                    playBack3: JSON.stringify(oneBattleData3),
                    playBack4: JSON.stringify(oneBattleData4),
                    playBack5: ""
                });
                conSQLConfig_1.conSQLConfig.updateWorldData(db, addresArray[winnerIndex4[0]], blockReplaceTime, String(Number(blockReplaceTime) + 100), "0", "", worldDataID);
                let sendChatConst = {
                    type: "39000",
                    other: "1",
                    content: "",
                    time: new Date()
                };
                currentConn.sendMsg('Chat', sendChatConst);
                return;
            }
            let oneBattleData5 = [];
            let winnerIndex5 = [];
            let lengthNumber4 = winnerIndex4.length;
            if (lengthNumber4 >= 2) {
                for (let j = 0; j < Math.floor(lengthNumber4 / 2); j++) {
                    let jNum = j * 2;
                    returnBattleDataNew = logicBattle.InitData(heroListData[winnerIndex4[jNum]], heroListData[winnerIndex4[jNum + 1]], petArrayList[winnerIndex4[jNum]], petArrayList[winnerIndex4[jNum + 1]], addresData[winnerIndex4[jNum]], addresData[winnerIndex4[jNum + 1]]);
                    let goBattlefieldData = logicBattle.startFight();
                    returnBattleDataNew.battlefieldData = goBattlefieldData;
                    if (goBattlefieldData[goBattlefieldData.length - 1][0] == 9999) {
                        winnerIndex5.push(winnerIndex4[jNum + 1]);
                    }
                    else {
                        winnerIndex5.push(winnerIndex4[jNum]);
                    }
                    if (lengthNumber4 % 2 != 0 && j == Math.floor(lengthNumber4 / 2) - 1) {
                        winnerIndex5.push(winnerIndex4[jNum + 2]);
                    }
                    oneBattleData5.push(returnBattleDataNew);
                }
            }
            if (winnerIndex5.length == 1) {
                conSQLConfig_1.conSQLConfig.addWorldHistory(db, {
                    worldDataID: worldDataID,
                    worldDatatype: worldDatatype,
                    blockReplaceTime: blockReplaceTime,
                    applicantNumber: applicantNumber,
                    applicantList: JSON.stringify(addresArray),
                    winAddress: addresArray[winnerIndex5[0]],
                    generateBlock: generateBlock,
                    playBack1: JSON.stringify(oneBattleData1),
                    playBack2: JSON.stringify(oneBattleData2),
                    playBack3: JSON.stringify(oneBattleData3),
                    playBack4: JSON.stringify(oneBattleData4),
                    playBack5: JSON.stringify(oneBattleData5)
                });
                conSQLConfig_1.conSQLConfig.updateWorldData(db, addresArray[winnerIndex5[0]], blockReplaceTime, String(Number(blockReplaceTime) + 100), "0", "", worldDataID);
                let sendChatConst = {
                    type: "39000",
                    other: "1",
                    content: "",
                    time: new Date()
                };
                currentConn.sendMsg('Chat', sendChatConst);
                return;
            }
            oneBattleData1.length = 0;
            oneBattleData2.length = 0;
            oneBattleData3.length = 0;
            oneBattleData4.length = 0;
            oneBattleData5.length = 0;
        }).catch((error) => { console.error(error); });
    }
    static InitData(cannonArray, formationArray, cannonPetArray, formationPetArray, addresCannon, addresFormation) {
        const createNumArray14 = () => [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        const createFormationItem = (id, type, skill, goTime, realTime) => ({
            type,
            id,
            goTime,
            realTime,
            skill,
            profession: 0,
            skillNumber: [0, 0],
            attack: 0,
            defense: 0,
            speed: 0,
            maxhp: 0,
            hp: 0,
            isDeat: 0,
            isContest: 0,
            attackNum: [0, 0, 0, 0, 0],
            trip: 0,
            monsterCycle: 0,
            globalCycle: 0,
            shield: 0,
            beingHurt: 0,
            skillMercenary: [0, 0, 0, 0, 0],
            skillCaptain: [0, 0, 0, 0, 0],
            skillTeacher: [0, 0, 0, 0, 0],
            skillElectrician: [0, 0, 0, 0, 0],
            skillDriver: 0,
            giveSkillElectrician: [0, 0, 0, 0, 0],
            giveSkillDriver: [0, 0, 0, 0, 0],
            giveSkillThief: [0, 0, 0, 0, 0],
            giveSkillCaptain: 0,
            blockTime: 0,
            globalTime: 0,
            globalLength: 0,
            everyTimeLength: 0
        });
        let dTime = logicBattle.getFormationTime(formationArray[1][25]);
        let lTime = 0;
        const formationList = Array.from({ length: 25 }, (_, index) => {
            const currentLTime = lTime + dTime[index];
            const item = createFormationItem(index + 1, formationArray[1][index], formationPetArray[formationArray[1][index]], dTime[index], currentLTime);
            lTime = currentLTime;
            return item;
        });
        const createCannonPosData = (cannonID, blockPlaceTwo, skill) => ({
            cannonID,
            blockPlace: { x: 0, y: 0, z: 0 },
            blockPlaceTwo,
            skill,
            profession: 0,
            skillNumber: [0, 0],
            attack: 0,
            range: 0,
            speed: 0,
            maxhp: 0,
            hp: 0,
            bj: 0,
            bjs: 0,
            skillAthletes: [0, 0, 0, 0, 0],
            skillThief: [0, 0, 0, 0, 0],
            skillEngineer: [0, 0, 0, 0, 0],
            giveSkillTeacher: [0, 0, 0, 0, 0],
            giveSkillCourier: [0, 0, 0, 0, 0],
            giveSkillProgrammer: [0, 0, 0, 0, 0],
            giveSkillEngineer: [0, 0, 0, 0, 0, 0],
            giveSkillDriver: [0, 0, 0, 0, 0, 0],
            goldElement: 0,
            woodElement: 0,
            waterElement: 0,
            fireElement: 0,
            soilElement: 0,
            prohibitThief: 0
        });
        const cannonPosList = Array.from({ length: 5 }, (_, index) => createCannonPosData(index, cannonArray[0][index], cannonPetArray[index]));
        const createBattlefieldDataItem = (id) => ({
            0: id,
            1: 0,
            2: 0,
            3: 0,
            4: [[0, 0, 0]],
            5: 0
        });
        const tData = {
            attackers: {
                pet: formationPetArray,
                formationType: formationArray[1][25],
                formation: formationList
            },
            defender: {
                pet: cannonPetArray,
                battlefieldCannonPos: cannonPosList,
                battleMap: cannonArray[0][5]
            },
            battlefieldData: [],
            battleType: 0,
            attackersID: addresFormation + "" || "",
            attackersComplete: "",
            attackersTime: new Date().toISOString(),
            attackersNumber: "",
            defenderID: addresCannon + "" || "",
            defenderComplete: "",
            defenderTime: new Date().toISOString(),
            defenderNumber: ""
        };
        return tData;
    }
    static startFight() {
        const battleDataNew = returnBattleDataNew;
        if (!battleDataNew || !battleDataNew.defender || !battleDataNew.attackers) {
            console.log("Abnormal format of combat data");
            return [];
        }
        const { defender, attackers } = battleDataNew;
        const mapData = pathFs_1.pathFs.loadMapData();
        let cannonPath = mapData._cannonList[battleDataNew.defender.battleMap];
        let pathList = mapData._pathList[battleDataNew.defender.battleMap];
        const pathListLength = pathList.length;
        const globalLength = pathListLength * 80;
        const CONST = {
            IE_NUM: 50,
            MAX_MONSTER_COUNT: 25,
            CYCLE_LIMIT: 100000,
            ATTACK_TRIGGER_THRESHOLD: 20,
            CANNON_ATTACK_BASE_TIME: 75,
            PATH_BLOCK_LENGTH: 80,
        };
        const initCannons = () => {
            let cannons = JSON.parse(JSON.stringify(defender.battlefieldCannonPos || []));
            const cannonPets = defender.pet || [];
            let boolNurse = false, boolDoctor = false, boolThief = false;
            let indexNurse = 0, indexDoctor = 0, indexThief = 0;
            for (let s = 0; s < cannons.length; s++) {
                let cannon = cannons[s];
                const petData = cannonPets[cannon.cannonID] || [];
                cannon.skill = petData;
                cannon.profession = petData[2] || 0;
                cannon.skillNumber = [0, 0];
                cannon.attack = utlisBattle_1.utlisBattle.get_damage_formula(petData[10] || 0);
                cannon.range = utlisBattle_1.utlisBattle.get_defense_formula(petData[11] || 0);
                cannon.speed = utlisBattle_1.utlisBattle.get_speed_formula(petData[12] || 0);
                cannon.hp = utlisBattle_1.utlisBattle.get_health_formula(petData[13] || 0);
                cannon.maxhp = cannon.hp;
                cannon.bj = 0;
                cannon.bjs = 0;
                cannon.blockPlace = cannonPath[cannon.blockPlaceTwo] || {};
                cannon.skillAthletes = [0, 0, 0, 0, 0];
                cannon.skillThief = [0, 0, 0, 0, 0];
                cannon.skillEngineer = [0, 0, 0, 0, 0];
                cannon.giveSkillTeacher = [0, 0, 0, 0, 0];
                cannon.giveSkillCourier = [0, 0, 0, 0, 0];
                cannon.giveSkillProgrammer = [0, 0, 0, 0, 0];
                cannon.giveSkillEngineer = [0, 0, 0, 0, 0, 0];
                cannon.giveSkillDriver = [0, 0, 0, 0, 0, 0];
                cannon.goldElement = 0;
                cannon.woodElement = 0;
                cannon.waterElement = 0;
                cannon.fireElement = 0;
                cannon.soilElement = 0;
                cannon.prohibitThief = 0;
                cannon = utlisBattle_1.utlisBattle.giveCannonSkill(cannon);
                if (cannon.skill[2] === 2)
                    cannon = utlisBattle_1.utlisBattle.cannonGiveMercenary(cannon);
                if (cannon.skill[2] === 10)
                    cannon = utlisBattle_1.utlisBattle.cannonGiveAthletes(cannon);
                if (cannon.skill[2] === 3) {
                    boolNurse = true;
                    indexNurse = s;
                }
                if (cannon.skill[2] === 5) {
                    boolDoctor = true;
                    indexDoctor = s;
                }
                if (cannon.skill[2] === 0) {
                    boolThief = true;
                    indexThief = s;
                }
                cannons[s] = cannon;
            }
            if (boolNurse)
                cannons = utlisBattle_1.utlisBattle.cannonGiveNurse(cannons[indexNurse], cannons);
            if (boolDoctor)
                cannons = utlisBattle_1.utlisBattle.cannonGiveDoctor(cannons[indexDoctor], cannons);
            return { cannons, boolNurse, boolDoctor, boolThief, indexNurse, indexDoctor, indexThief };
        };
        const initMonsters = () => {
            let monsters = JSON.parse(JSON.stringify(attackers.formation || []));
            const monsterPets = attackers.pet || [];
            for (let p = 0; p < monsters.length; p++) {
                let monster = monsters[p];
                const petData = monsterPets[monster.type] || [];
                monster.skill = petData;
                monster.profession = petData[2] || 0;
                monster.skillNumber = [0, 0];
                monster.attack = utlisBattle_1.utlisBattle.get_damage_formula(petData[10] || 0);
                monster.defense = utlisBattle_1.utlisBattle.get_defense_formula(petData[11] || 0);
                monster.speed = utlisBattle_1.utlisBattle.get_speed_formula(petData[12] || 0);
                monster.hp = utlisBattle_1.utlisBattle.get_health_formula(petData[13] || 0);
                monster.maxhp = monster.hp;
                monster.isDeat = 0;
                monster.isContest = 0;
                monster.attackNum = [-1, -1, -1, -1, -1];
                monster.trip = 0;
                monster.monsterCycle = 0;
                monster.globalCycle = 0;
                monster.shield = 0;
                monster.beingHurt = 0;
                monster.skillMercenary = [0, 0, 0, 0, 0];
                monster.skillCaptain = [0, 0, 0, 0, 0];
                monster.skillTeacher = [0, 0, 0, 0, 0];
                monster.skillElectrician = [0, 0, 0, 0, 0];
                monster.skillDriver = 0;
                monster.giveSkillElectrician = [0, 0, 0, 0, 0];
                monster.giveSkillDriver = [0, 0, 0, 0, 0];
                monster.giveSkillThief = [0, 0, 0, 0, 0];
                monster.giveSkillCaptain = 0;
                monster = utlisBattle_1.utlisBattle.giveMonsterSkill(monster);
                monsters[p] = monster;
            }
            return monsters;
        };
        const getMonsterCurrentPos = (monsterTrip) => {
            const index = Math.floor(monsterTrip / CONST.PATH_BLOCK_LENGTH);
            if (index >= pathListLength - 1)
                return { newPos: { x: 0, y: 0, z: 0 }, index: pathListLength - 1 };
            const movePos = monsterTrip % CONST.PATH_BLOCK_LENGTH;
            const pos = pathList[index];
            const nextPos = pathList[index + 1];
            const monsterPos = { x: 0, y: 0, z: 0 };
            monsterPos.x = pos.x * 80 - 40;
            monsterPos.y = -pos.y * 80 - 40;
            const monsterNextPos = { x: 0, y: 0, z: 0 };
            monsterNextPos.x = nextPos.x * 80 - 40;
            monsterNextPos.y = -nextPos.y * 80 - 40;
            const newPos = { x: 0, y: 0, z: 0 };
            newPos.x = monsterPos.x;
            newPos.y = monsterPos.y;
            if (monsterPos.x !== monsterNextPos.x) {
                newPos.x = monsterPos.x > monsterNextPos.x
                    ? monsterPos.x - movePos
                    : monsterPos.x + movePos;
            }
            if (monsterPos.y !== monsterNextPos.y) {
                newPos.y = monsterPos.y > monsterNextPos.y
                    ? monsterPos.y - movePos
                    : monsterPos.y + movePos;
            }
            return { newPos, index };
        };
        const { cannons: initCannonsList, boolThief, indexThief } = initCannons();
        let cannons = initCannonsList;
        let monsters = initMonsters();
        let monsterApp = [];
        let playback = [];
        let monsterNum = 0;
        const cannonAttData = new Array(cannons.length).fill(0);
        if (boolThief) {
            monsters = utlisBattle_1.utlisBattle.cannonGiveThief(cannons[indexThief], monsters);
        }
        for (let i = 0; i < CONST.CYCLE_LIMIT; i++) {
            if (monsterNum < CONST.MAX_MONSTER_COUNT) {
                for (let j = 0; j < monsters.length; j++) {
                    const monster = monsters[j];
                    if (!monster || monster.isContest === 1)
                        continue;
                    if (Math.round(monster.realTime * CONST.IE_NUM) === i) {
                        const blockTime = CONST.PATH_BLOCK_LENGTH / monster.speed;
                        const globalTime = blockTime * 34;
                        const everyTimeLength = globalLength / (globalTime * CONST.IE_NUM);
                        monster.blockTime = blockTime;
                        monster.globalTime = globalTime;
                        monster.globalLength = globalLength;
                        monster.everyTimeLength = everyTimeLength;
                        monster.isContest = 1;
                        if (monster.profession === 0) {
                            cannons = utlisBattle_1.utlisBattle.runGiveThief(cannons, monster);
                            monster.skillNumber[0]++;
                            monster.skillNumber[1]++;
                        }
                        if (monster.profession === 3) {
                            monsterApp = utlisBattle_1.utlisBattle.runGiveNurse(monster, monsterApp);
                            if (monster.skill[0] === 4 && monster.skill[1] === 4) {
                                if (monster.skillNumber[0] === 0) {
                                    monster.shield += monster.maxhp * 0.4;
                                }
                            }
                            else {
                                if (monster.skill[0] === 4 && monster.skillNumber[0] === 0) {
                                    monster.shield += monster.maxhp * 0.2;
                                }
                                if (monster.skill[1] === 4 && monster.skillNumber[1] === 0) {
                                    monster.shield += monster.maxhp * 0.2;
                                }
                            }
                            monster.skillNumber[0]++;
                            monster.skillNumber[1]++;
                        }
                        monsterNum++;
                        monsterApp.push(monster);
                        break;
                    }
                }
            }
            for (let k = 0; k < monsterApp.length; k++) {
                const monster = monsterApp[k];
                if (!monster || monster.isDeat === 1 || monster.trip >= globalLength) {
                    continue;
                }
                monster.globalCycle = i;
                monster.monsterCycle++;
                monster.trip += monster.everyTimeLength;
                const { newPos: monsterCurrentPos, index: pathIndex } = getMonsterCurrentPos(monster.trip);
                if (pathIndex >= pathListLength - 1)
                    continue;
                const profession = monster.profession;
                const travelDistance = monster.trip / globalLength;
                switch (profession) {
                    case 8:
                        if (travelDistance >= 0.7) {
                            if (monster.skill[0] === 4 && monster.skill[1] === 4) {
                                if (monster.skillElectrician[4] === 0) {
                                    monster.skillElectrician[4]++;
                                    monster.hp += monster.maxhp * 0.4 * 2;
                                }
                            }
                            else {
                                if (monster.skill[0] === 4 || monster.skill[1] === 4 && monster.skillElectrician[4] === 0) {
                                    monster.skillElectrician[4]++;
                                    monster.hp += monster.maxhp * 0.4;
                                }
                            }
                        }
                        if (travelDistance >= 0.3) {
                            monsterApp = utlisBattle_1.utlisBattle.runGiveElectrician(monster, monsterApp);
                        }
                        break;
                    case 9:
                        if (travelDistance >= 0.8) {
                            if (monster.skill[0] === 4 && monster.skill[1] === 4) {
                                if (monster.skillTeacher[4] === 0) {
                                    monster.skillTeacher[4]++;
                                    monster.defense *= 1.3;
                                    monster.speed *= 1.2;
                                }
                            }
                            else {
                                if (monster.skill[0] === 4 || monster.skill[1] === 4 && monster.skillTeacher[4] === 0) {
                                    monster.skillTeacher[4]++;
                                    monster.defense *= 1.15;
                                    monster.speed *= 1.1;
                                }
                            }
                        }
                        if (travelDistance >= 0.5) {
                            monsterApp = utlisBattle_1.utlisBattle.runGiveTeacher(monster, monsterApp);
                        }
                        break;
                }
                for (let a = 0; a < cannons.length; a++) {
                    const cannon = cannons[a];
                    const cannonPos = { x: 0, y: 0, z: 0 };
                    cannonPos.x = (cannon.blockPlace.x || 0) * 80 - 40;
                    cannonPos.y = -(cannon.blockPlace.y || 0) * 80 - 40;
                    const distance = utlisBattle_1.utlisBattle.getDistance(cannonPos, monsterCurrentPos);
                    const cannonProfession = cannon.skill[2];
                    if (distance > cannon.range)
                        continue;
                    const cannonAttTime = CONST.CANNON_ATTACK_BASE_TIME / cannon.speed;
                    const canAttData = Math.round(cannonAttTime * CONST.IE_NUM);
                    if (cannonAttData[a] === 0) {
                        cannonAttData[a] = (i - canAttData) - 2;
                    }
                    if (i - cannonAttData[a] >= canAttData) {
                        monster.beingHurt++;
                        let damageValue = cannon.attack;
                        const defense = monster.defense;
                        const shieldValue = monster.shield;
                        if (damageValue < defense)
                            damageValue = 1;
                        else
                            damageValue -= defense;
                        if (monster.skill[3] !== 16 && monster.skillElectrician[4] !== 16) {
                            damageValue += cannon.attack * (cannon.goldElement / 100);
                            damageValue += cannon.attack * (cannon.woodElement / 100);
                            damageValue += cannon.attack * (cannon.waterElement / 100);
                            damageValue += cannon.attack * (cannon.fireElement / 100);
                            damageValue += cannon.attack * (cannon.soilElement / 100);
                        }
                        if (shieldValue > 0) {
                            const result = shieldValue - damageValue;
                            if (result <= 0) {
                                monster.shield = 0;
                                monster.hp -= Math.abs(result);
                            }
                            else {
                                monster.shield = result;
                            }
                        }
                        else {
                            monster.hp -= damageValue;
                        }
                        const isMonsterDead = monster.hp <= 0 && monster.isDeat === 0;
                        if (isMonsterDead) {
                            monster.isDeat = 1;
                            if (profession !== 11)
                                monsterApp = utlisBattle_1.utlisBattle.runGiveDriver(monsterApp);
                            if (profession === 6)
                                monsterApp = utlisBattle_1.utlisBattle.runGiveCaptain(monster, monsterApp);
                            if (profession === 10)
                                cannons = utlisBattle_1.utlisBattle.runGiveAthletes(monster, cannons);
                            if (cannonProfession === 1)
                                cannons = utlisBattle_1.utlisBattle.cannonGiveEngineer(cannon, cannons);
                            if (cannonProfession === 9)
                                cannons[a] = utlisBattle_1.utlisBattle.cannonGiveTeacher(cannon);
                        }
                        switch (profession) {
                            case 2:
                                monsterApp[k] = utlisBattle_1.utlisBattle.runGiveMercenary(monster);
                                break;
                            case 4:
                                if (monster.beingHurt % 3 === 0) {
                                    if (monster.skill[0] === 4) {
                                        monster.skillNumber[0]++;
                                        monster.shield += monster.maxhp * 0.05;
                                    }
                                    if (monster.skill[1] === 4 && monster.skill[0] !== monster.skill[1]) {
                                        monster.skillNumber[1]++;
                                        monster.shield += monster.maxhp * 0.05;
                                    }
                                }
                                if (monster.beingHurt % 5 === 0) {
                                    cannons[a] = utlisBattle_1.utlisBattle.runGiveCourier(cannon, monster);
                                    monster.skillNumber[0]++;
                                    monster.skillNumber[1]++;
                                }
                                break;
                            case 5:
                                if (monster.beingHurt === 15) {
                                    if (monster.skill[0] === 4) {
                                        monsterApp.forEach(m => { if (m.profession !== 5)
                                            m.hp += m.maxhp * 0.3; });
                                    }
                                    if (monster.skill[1] === 4 && monster.skill[0] !== monster.skill[1]) {
                                        monsterApp.forEach(m => { if (m.profession !== 5)
                                            m.hp += m.maxhp * 0.3; });
                                    }
                                }
                                if (monster.beingHurt % 5 === 0) {
                                    monsterApp[k] = utlisBattle_1.utlisBattle.runGiveDoctor(monster);
                                }
                                break;
                        }
                        switch (cannonProfession) {
                            case 4:
                                cannons[a] = utlisBattle_1.utlisBattle.cannonGiveCourier(cannon);
                                break;
                            case 6:
                                monsterApp[k] = utlisBattle_1.utlisBattle.cannonGiveCaptain(cannon, monster);
                                break;
                            case 7:
                                cannons = utlisBattle_1.utlisBattle.cannonGiveProgrammer(cannon, cannons);
                                break;
                            case 8:
                                monsterApp[k] = utlisBattle_1.utlisBattle.cannonGiveElectrician(cannon, monster);
                                break;
                            case 11:
                                monsterApp[k] = utlisBattle_1.utlisBattle.cannonGiveDriver(cannon, monster);
                                break;
                        }
                        const lockTarget = monster.id - 1;
                        playback.push([
                            pathIndex,
                            0,
                            i,
                            a,
                            [[lockTarget, Math.trunc(damageValue), isMonsterDead ? 1 : 0], [Math.trunc(monster.hp), Math.trunc(monster.maxhp), Math.trunc(monster.attack)], [Math.trunc(monster.defense), Math.trunc(monster.shield), Math.trunc(monster.speed)]],
                            0
                        ]);
                        cannonAttData[a] = i;
                    }
                }
            }
            const allMonstersSpawned = monsterNum >= CONST.MAX_MONSTER_COUNT;
            const noActiveMonsters = monsterApp.every(m => !m || m.isDeat === 1 || m.trip >= globalLength);
            if (allMonstersSpawned && noActiveMonsters)
                break;
        }
        const deadMonsterCount = monsterApp.filter(m => (m && m.isDeat === 1)).length; //2026-01-29
        const isDefenseSuccess = deadMonsterCount > CONST.ATTACK_TRIGGER_THRESHOLD;
        if (isDefenseSuccess) {
            playback.push([8888, 0, 0, 0, [[0, 0, 0]], 0]);
        }
        else {
            playback.push([9999, 0, 0, 0, [[0, 0, 0]], 0]);
        }
        return playback;
    }
    static async loadJson() {
        try {
            const mapData = pathFs_1.pathFs.loadMapData();
            return mapData;
        }
        catch (error) {
            console.error('Error processing map data:', error);
        }
    }
}
exports.logicBattle = logicBattle;
