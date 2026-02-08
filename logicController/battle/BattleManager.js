"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathFs_1 = require("./pathFs");
const Random = {
    seed: 1,
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
};
const getMonsterCurrentPos = (monsterTrip, pathList, PATH_BLOCK_LENGTH) => {
    const pathListLength = pathList.length;
    if (pathListLength === 0) {
        return { newPos: { x: 20, y: 20 }, index: 0 };
    }
    const index = Math.floor(monsterTrip / PATH_BLOCK_LENGTH);
    if (index >= pathListLength - 1) {
        const lastPos = pathList[pathListLength - 1];
        return {
            newPos: { x: lastPos.x * 80 - 40, y: -lastPos.y * 80 - 40 },
            index: pathListLength - 1
        };
    }
    const movePos = monsterTrip % PATH_BLOCK_LENGTH;
    const pos = pathList[index];
    const nextPos = pathList[index + 1];
    const monsterPos = { x: pos.x * 80 - 40, y: -pos.y * 80 - 40 };
    const monsterNextPos = { x: nextPos.x * 80 - 40, y: -nextPos.y * 80 - 40 };
    const newPos = { ...monsterPos };
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
function convertFormationToMonster(formationItem, petData) {
    const rawSkill = formationItem.skill || [];
    const skillFromFormation = rawSkill;
    const safeSkill = {
        ...skillFromFormation,
        0: (skillFromFormation[0] != null) ? skillFromFormation[0] : 0,
        1: (skillFromFormation[1] != null) ? skillFromFormation[1] : 0,
        2: (skillFromFormation[2] != null) ? skillFromFormation[2] : 0,
        3: (skillFromFormation[3] != null) ? skillFromFormation[3] : 0,
        4: (skillFromFormation[4] != null) ? skillFromFormation[4] : 0,
        10: (skillFromFormation[10] != null) ? skillFromFormation[10] : 0,
        11: (skillFromFormation[11] != null) ? skillFromFormation[11] : 0,
        12: (skillFromFormation[12] != null) ? skillFromFormation[12] : 0,
        13: (skillFromFormation[13] != null) ? skillFromFormation[13] : 0,
    };
    return {
        type: formationItem.type,
        id: formationItem.id,
        goTime: formationItem.goTime || 0,
        realTime: formationItem.realTime || 0,
        skill: { ...petData, ...safeSkill },
        profession: formationItem.profession || petData[2] || 0,
        skillNumber: [0, 0],
        attack: utlisBattle.get_damage_formula(petData[10] || 0),
        defense: utlisBattle.get_defense_formula(petData[11] || 0),
        speed: utlisBattle.get_speed_formula(petData[12] || 0),
        hp: utlisBattle.get_health_formula(petData[13] || 0),
        maxhp: utlisBattle.get_health_formula(petData[13] || 0),
        isDeat: formationItem.isDeat || 0,
        isContest: formationItem.isContest || 0,
        attackNum: [-1, -1, -1, -1, -1],
        trip: formationItem.trip || 0,
        monsterCycle: formationItem.monsterCycle || 0,
        globalCycle: formationItem.globalCycle || 0,
        shield: formationItem.shield || 0,
        beingHurt: formationItem.beingHurt || 0,
        skillMercenary: formationItem.skillMercenary || [0, 0, 0, 0, 0],
        skillCaptain: formationItem.skillCaptain || [0, 0, 0, 0, 0],
        skillTeacher: formationItem.skillTeacher || [0, 0, 0, 0, 0],
        skillElectrician: formationItem.skillElectrician || [0, 0, 0, 0, 0],
        skillDriver: formationItem.skillDriver || 0,
        giveSkillElectrician: formationItem.giveSkillElectrician || [0, 0, 0, 0, 0],
        giveSkillDriver: formationItem.giveSkillDriver || [0, 0, 0, 0, 0],
        giveSkillThief: formationItem.giveSkillThief || [0, 0, 0, 0, 0],
        giveSkillCaptain: formationItem.giveSkillCaptain || 0,
        blockTime: formationItem.blockTime,
        globalTime: formationItem.globalTime,
        globalLength: formationItem.globalLength,
        everyTimeLength: formationItem.everyTimeLength
    };
}
const utlisBattle = {
    get_damage_formula(damage) {
        try {
            const dmg = Number(Math.pow((Math.pow(damage, 2) / 1.5), 0.5)) +
                Number(Math.pow((Math.pow(damage, 2) / 1.6), 0.5)) +
                Number(Math.pow((Math.pow(damage, 2) / 1.7), 0.5));
            return Math.trunc(dmg);
        }
        catch (error) {
            console.error('get_damage_formula-failure:', error);
            throw error;
        }
    },
    get_defense_formula(defense) {
        try {
            const def = Number(Math.pow(defense, 0.5)) + Number(Math.pow(Math.pow(defense, 2), 0.5));
            return Math.trunc(def);
        }
        catch (error) {
            console.error('get_defense_formula-failure:', error);
            throw error;
        }
    },
    get_speed_formula(speed) {
        try {
            const spd = (Number(Math.pow((speed * 0.025) / 60, 0.5)) + (speed / 100)) * 55;
            return Math.trunc(spd);
        }
        catch (error) {
            console.error('get_speed_formula-failure:', error);
            throw error;
        }
    },
    get_health_formula(health) {
        try {
            return Math.trunc(health * 6.72);
        }
        catch (error) {
            console.error('get_health_formula-failure:', error);
            throw error;
        }
    },
    getDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Number(Math.sqrt(dx * dx + dy * dy));
    },
    giveCannonSkill: (cannon) => {
        const skill1 = cannon.skill[0] || 0;
        const skill2 = cannon.skill[1] || 0;
        const skill3 = cannon.skill[3] || 0;
        const skill4 = cannon.skill[4] || 0;
        switch (cannon.profession) {
            case 0:
                cannon.skillThief = [skill1, skill2, skill3, skill4, 0];
                break;
            case 1:
                cannon.skillEngineer = [skill1, skill2, skill3, skill4, 0];
                break;
            case 10:
                cannon.skillAthletes = [skill1, skill2, skill3, skill4, 0];
                break;
            case 9:
                cannon.giveSkillTeacher = [skill1, skill2, skill3, skill4, 0];
                break;
            case 4:
                cannon.giveSkillCourier = [skill1, skill2, skill3, skill4, 0];
                break;
            case 7:
                cannon.giveSkillProgrammer = [skill1, skill2, skill3, skill4, 0];
                break;
            case 11:
                cannon.giveSkillDriver = [skill1, skill2, skill3, skill4, 0, 0];
                break;
            default:
                break;
        }
        const elementSkillMap = {
            5: 'goldElement',
            6: 'woodElement',
            7: 'waterElement',
            8: 'fireElement',
            9: 'soilElement',
        };
        [skill1, skill2, skill3, skill4].forEach(skillId => {
            const elementKey = elementSkillMap[skillId];
            if (elementKey) {
                cannon[elementKey] += 10;
            }
        });
        return cannon;
    },
    cannonGiveMercenary: (cannon) => {
        if (cannon.skill[0] === 1) {
            cannon.attack *= 1.2;
            cannon.skillNumber[0] = 1;
        }
        if (cannon.skill[1] === 2) {
            cannon.bj += 15;
            cannon.skillNumber[1] = 1;
        }
        if (cannon.skill[3] === 3) {
            cannon.bjs = 1.5;
        }
        return cannon;
    },
    cannonGiveAthletes: (cannon) => {
        if (cannon.skill[0] === 1) {
            cannon.speed *= 1.3;
            cannon.skillAthletes[0] = 1;
        }
        if (cannon.skill[1] === 2) {
            cannon.range *= 1.2;
            cannon.skillAthletes[1] = 1;
        }
        if (cannon.skill[3] === 3) {
            cannon.skillAthletes[2] = 1;
        }
        return cannon;
    },
    cannonGiveNurse: (nurseCannon, cannons) => {
        const healPercent = 0.1;
        const healRange = 300;
        if (nurseCannon.skill[0] === 1) {
            cannons.forEach(cannon => {
                const distance = utlisBattle.getDistance(nurseCannon.blockPlace, cannon.blockPlace);
                if (distance <= healRange && cannon.hp < cannon.maxhp) {
                    const healValue = cannon.maxhp * healPercent;
                    cannon.hp = Math.min(cannon.hp + healValue, cannon.maxhp);
                }
            });
            nurseCannon.skillNumber[0] = 1;
        }
        if (nurseCannon.skill[1] === 2) {
            cannons.forEach(cannon => {
                const distance = utlisBattle.getDistance(nurseCannon.blockPlace, cannon.blockPlace);
                if (distance <= healRange) {
                    cannon.hp *= 1.1;
                    cannon.maxhp *= 1.1;
                }
            });
            nurseCannon.skillNumber[1] = 1;
        }
        return cannons;
    },
    cannonGiveDoctor: (doctorCannon, cannons) => {
        const reviveHpPercent = 0.5;
        const healPercent = 0.3;
        const effectRange = 400;
        if (doctorCannon.skill[0] === 1) {
            cannons.forEach(cannon => {
                const distance = utlisBattle.getDistance(doctorCannon.blockPlace, cannon.blockPlace);
                if (distance <= effectRange && cannon.hp <= 0) {
                    cannon.hp = cannon.maxhp * reviveHpPercent;
                    cannon.skillNumber[0] = 1;
                }
            });
        }
        if (doctorCannon.skill[1] === 2) {
            cannons.forEach(cannon => {
                const distance = utlisBattle.getDistance(doctorCannon.blockPlace, cannon.blockPlace);
                if (distance <= effectRange && cannon.hp > 0) {
                    cannon.hp = Math.min(cannon.hp + cannon.maxhp * healPercent, cannon.maxhp);
                }
            });
            doctorCannon.skillNumber[1] = 1;
        }
        if (doctorCannon.skill[3] === 3) {
            cannons.forEach(cannon => {
                const distance = utlisBattle.getDistance(doctorCannon.blockPlace, cannon.blockPlace);
                if (distance <= effectRange) {
                    cannon.prohibitThief = 1;
                }
            });
        }
        return cannons;
    },
    cannonGiveThief: (thiefCannon, monsters) => {
        const debuffPercent = 0.2;
        const debuffRange = 350;
        if (thiefCannon.skill[0] === 1) {
            monsters.forEach(monster => {
                if (monster.isContest === 1 && monster.isDeat === 0) {
                    monster.defense *= (1 - debuffPercent);
                }
            });
            thiefCannon.skillThief[0] = 1;
        }
        if (thiefCannon.skill[1] === 2) {
            monsters.forEach(monster => {
                if (monster.isContest === 1 && monster.isDeat === 0) {
                    monster.speed *= (1 - debuffPercent);
                    if (monster.everyTimeLength) {
                        monster.everyTimeLength *= (1 - debuffPercent);
                    }
                }
            });
            thiefCannon.skillThief[1] = 1;
        }
        return monsters;
    },
    giveMonsterSkill: (monster) => {
        const skill1 = monster.skill[0] || 0;
        const skill2 = monster.skill[1] || 0;
        const skill3 = monster.skill[3] || 0;
        const skill4 = monster.skill[4] || 0;
        switch (monster.profession) {
            case 2:
                monster.skillMercenary = [skill1, skill2, skill3, skill4, 0];
                break;
            case 6:
                monster.skillCaptain = [skill1, skill2, skill3, skill4, 0];
                break;
            case 9:
                monster.skillTeacher = [skill1, skill2, skill3, skill4, 0];
                break;
            case 8:
                monster.skillElectrician = [skill1, skill2, skill3, skill4, 0];
                break;
            case 11:
                monster.skillDriver = skill1;
                break;
            default:
                break;
        }
        if (skill1 === 1) {
            monster.hp *= 1.2;
            monster.maxhp *= 1.2;
        }
        if (skill2 === 2) {
            monster.attack *= 1.15;
        }
        if (skill3 === 3) {
            monster.shield = monster.maxhp * 0.1;
        }
        return monster;
    },
    runGiveThief: (cannons, monster, pathList, PATH_BLOCK_LENGTH) => {
        const stealRange = 400;
        const monsterPos = getMonsterCurrentPos(monster.trip, pathList, PATH_BLOCK_LENGTH).newPos;
        const targetCannon = cannons.find(cannon => {
            return cannon.skill[2] !== 0 &&
                cannon.prohibitThief === 0 &&
                utlisBattle.getDistance(cannon.blockPlace, monsterPos) <= stealRange;
        });
        if (targetCannon) {
            const stealSkillIndex = Random.next() > 0.5 ? 0 : 1;
            const stolenSkill = targetCannon.skill[stealSkillIndex];
            if (stolenSkill > 0) {
                monster.skill[stealSkillIndex] = stolenSkill;
                targetCannon.skill[stealSkillIndex] = 0;
                utlisBattle.giveMonsterSkill(monster);
            }
        }
        return cannons;
    },
    runGiveNurse: (monster, monsterApp, pathList, PATH_BLOCK_LENGTH) => {
        const healPercent = 0.15;
        const healRange = 300;
        const healInterval = 3;
        if (monster.monsterCycle % (healInterval * 50) === 0) {
            const monsterPos = getMonsterCurrentPos(monster.trip, pathList, PATH_BLOCK_LENGTH).newPos;
            monsterApp.forEach(m => {
                if (m.isDeat === 0 && m !== monster) {
                    const mPos = getMonsterCurrentPos(m.trip, pathList, PATH_BLOCK_LENGTH).newPos;
                    const distance = utlisBattle.getDistance(monsterPos, mPos);
                    if (distance <= healRange) {
                        m.hp = Math.min(m.hp + m.maxhp * healPercent, m.maxhp);
                    }
                }
            });
            monster.hp = Math.min(monster.hp + monster.maxhp * 0.2, monster.maxhp);
        }
        return monsterApp;
    },
    runGiveElectrician: (monster, monsterApp, pathList, PATH_BLOCK_LENGTH) => {
        const shieldPercent = 0.2;
        const effectRange = 350;
        const reflectDamage = 0.1;
        if (monster.skillElectrician[4] === 0) {
            const monsterPos = getMonsterCurrentPos(monster.trip, pathList, PATH_BLOCK_LENGTH).newPos;
            monsterApp.forEach(m => {
                if (m.isDeat === 0) {
                    const mPos = getMonsterCurrentPos(m.trip, pathList, PATH_BLOCK_LENGTH).newPos;
                    const distance = utlisBattle.getDistance(monsterPos, mPos);
                    if (distance <= effectRange) {
                        m.shield += m.maxhp * shieldPercent;
                    }
                }
            });
            monster.skillElectrician[4] = 1;
        }
        monster.giveSkillElectrician[0] = Math.round(reflectDamage * 100);
        return monsterApp;
    },
    runGiveTeacher: (monster, monsterApp, pathList, PATH_BLOCK_LENGTH) => {
        const buffPercent = 0.1;
        const effectRange = 400;
        if (monster.skillTeacher[4] === 0) {
            const monsterPos = getMonsterCurrentPos(monster.trip, pathList, PATH_BLOCK_LENGTH).newPos;
            monsterApp.forEach(m => {
                if (m.isDeat === 0) {
                    const mPos = getMonsterCurrentPos(m.trip, pathList, PATH_BLOCK_LENGTH).newPos;
                    const distance = utlisBattle.getDistance(monsterPos, mPos);
                    if (distance <= effectRange) {
                        m.attack *= 1.1;
                        m.defense *= 1.1;
                        m.speed *= 1.1;
                        m.hp *= 1.1;
                        m.maxhp *= 1.1;
                    }
                }
            });
            monster.skillTeacher[4] = 1;
        }
        return monsterApp;
    },
    runGiveMercenary: (monster) => {
        const maxBerserkPercent = 0.5;
        const hpThreshold = 0.3;
        const hpPercent = monster.hp / monster.maxhp;
        if (hpPercent <= hpThreshold) {
            const berserkPercent = maxBerserkPercent * (1 - hpPercent / hpThreshold);
            monster.attack *= (1 + berserkPercent);
            monster.skillMercenary[4] = Math.round(berserkPercent * 100);
        }
        return monster;
    },
    runGiveCourier: (cannon, monster) => {
        const slowPercent = 0.2;
        const slowDuration = 5;
        if (monster.beingHurt % 5 === 0) {
            cannon.speed *= (1 - slowPercent);
            cannon.skillNumber[1] = monster.globalCycle + slowDuration * 50;
        }
        if (cannon.skillNumber[1] > 0 && monster.globalCycle >= cannon.skillNumber[1]) {
            cannon.speed /= (1 - slowPercent);
            cannon.skillNumber[1] = 0;
        }
        return cannon;
    },
    runGiveDoctor: (monster) => {
        const healPercent = 0.3;
        if (monster.beingHurt === 15) {
            monster.hp = Math.min(monster.hp + monster.maxhp * healPercent, monster.maxhp);
            monster.speed = utlisBattle.get_speed_formula(monster.skill[12] || 0);
        }
        return monster;
    },
    runGiveDriver: (monsterApp) => {
        const speedBoostPercent = 0.3;
        const boostDuration = 8;
        monsterApp.forEach(m => {
            if (m.isDeat === 0) {
                m.speed *= (1 + speedBoostPercent);
                if (m.everyTimeLength) {
                    m.everyTimeLength *= (1 + speedBoostPercent);
                }
                m.giveSkillDriver[4] = m.globalCycle + boostDuration * 50;
            }
        });
        return monsterApp;
    },
    runGiveCaptain: (monster, monsterApp) => {
        const summonCount = 2;
        const summonHpPercent = 0.5;
        const summonAttackPercent = 0.4;
        if (monster.isDeat === 1 && monster.skillCaptain[4] === 0) {
            for (let i = 0; i < summonCount; i++) {
                const minion = JSON.parse(JSON.stringify(monster));
                minion.id = monster.id + 100 + i;
                minion.hp = monster.maxhp * summonHpPercent;
                minion.maxhp = minion.hp;
                minion.attack = monster.attack * summonAttackPercent;
                minion.defense = monster.defense * 0.6;
                minion.speed = monster.speed * 1.2;
                minion.isDeat = 0;
                minion.beingHurt = 0;
                minion.skillCaptain[4] = 1;
                monsterApp.push(minion);
            }
            monster.skillCaptain[4] = 1;
        }
        return monsterApp;
    },
    runGiveAthletes: (monster, cannons, pathList, PATH_BLOCK_LENGTH) => {
        const debuffPercent = 0.25;
        const effectRange = 350;
        const monsterPos = getMonsterCurrentPos(monster.trip, pathList, PATH_BLOCK_LENGTH).newPos;
        if (monster.isDeat === 1) {
            cannons.forEach(cannon => {
                const cannonPos = {
                    x: cannon.blockPlace.x * 80 - 40,
                    y: -cannon.blockPlace.y * 80 - 40
                };
                const distance = utlisBattle.getDistance(cannonPos, monsterPos);
                if (distance <= effectRange) {
                    cannon.range *= (1 - debuffPercent);
                }
            });
        }
        return cannons;
    },
    cannonGiveEngineer: (cannon, cannons) => {
        const attackBoostPercent = 0.15;
        const effectRange = 300;
        cannons.forEach(c => {
            if (c !== cannon) {
                const distance = utlisBattle.getDistance(cannon.blockPlace, c.blockPlace);
                if (distance <= effectRange) {
                    c.attack *= (1 + attackBoostPercent);
                    c.skillEngineer[4] = 1;
                }
            }
        });
        return cannons;
    },
    cannonGiveCourier: (cannon) => {
        const knockbackDistance = 20;
        cannon.giveSkillCourier[4] = knockbackDistance;
        return cannon;
    },
    cannonGiveCaptain: (cannon, monster) => {
        const attackSpeedDebuff = 0.2;
        const debuffDuration = 4;
        monster.speed *= (1 - attackSpeedDebuff);
        if (monster.everyTimeLength) {
            monster.everyTimeLength *= (1 - attackSpeedDebuff);
        }
        monster.giveSkillCaptain = monster.globalCycle + debuffDuration * 50;
        return monster;
    },
    cannonGiveProgrammer: (cannon, cannons) => {
        const critBoost = 10;
        const effectRange = 350;
        cannons.forEach(c => {
            const distance = utlisBattle.getDistance(cannon.blockPlace, c.blockPlace);
            if (distance <= effectRange) {
                c.bj += critBoost;
                c.giveSkillProgrammer[4] = 1;
            }
        });
        return cannons;
    },
    cannonGiveElectrician: (cannon, monster) => {
        const electricDamagePercent = 0.1;
        const dotDuration = 3;
        const dotInterval = 1;
        const dotDamage = cannon.attack * electricDamagePercent;
        const dotEndCycle = monster.globalCycle + dotDuration * 50;
        monster.giveSkillElectrician[0] = Math.round(dotDamage);
        monster.giveSkillElectrician[1] = dotInterval * 50;
        monster.giveSkillElectrician[2] = dotEndCycle;
        monster.giveSkillElectrician[3] = 0;
        return monster;
    },
    cannonGiveTeacher: (cannon) => {
        const defenseBoostPercent = 0.2;
        const healPerSecond = 0.02;
        if (cannon.skill[0] === 1) {
            cannon.range = utlisBattle.get_defense_formula(cannon.skill[11] || 0) * (1 + defenseBoostPercent);
        }
        if (cannon.skill[1] === 2) {
            cannon.giveSkillTeacher[4] = Math.round(healPerSecond * cannon.maxhp * 50);
        }
        return cannon;
    },
};
const cc = {
    error: (msg) => console.error(msg),
    log: (msg, ...args) => console.log(msg, ...args),
    v2: (x, y) => ({ x, y }),
};
const g_sendCommonManager = {
    getAllData: () => {
        return {
            attackers: { pet: [], formationType: 1, formation: [] },
            defender: { pet: [], battlefieldCannonPos: [], battleMap: 0 },
            battlefieldData: [],
            battleType: 0,
            attackersID: "",
            attackersComplete: "",
            attackersTime: "",
            attackersNumber: "",
            defenderID: "",
            defenderComplete: "",
            defenderTime: "",
            defenderNumber: "",
        };
    },
    getDefenseOrAttack: () => 0,
    setBattleResultDefender: (result) => { },
    setBattleResultAttack: (result) => { },
};
class BattleManager {
    static setBattleData(data, sessionNumber) {
        this.receivedData = data;
        this.receivedSessionNumber = sessionNumber;
    }
    static startFight(returnBattleDataNew) {
        if (!returnBattleDataNew || !returnBattleDataNew.defender || !returnBattleDataNew.attackers) {
            cc.error("Abnormal format of combat data");
            return [];
        }
        const battleDataNew = returnBattleDataNew;
        const { defender, attackers } = battleDataNew;
        const mapData = pathFs_1.pathFs.loadMapData();
        const cannonPath = mapData._cannonList[defender.battleMap] || [];
        const pathList = mapData._pathList[defender.battleMap] || [];
        const pathListLength = pathList.length;
        const globalLength = pathListLength > 0 ? pathListLength * 80 : 1000;
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
                cannon.attack = utlisBattle.get_damage_formula(petData[10] || 0);
                cannon.range = utlisBattle.get_defense_formula(petData[11] || 0) * 5;
                cannon.speed = utlisBattle.get_speed_formula(petData[12] || 0);
                cannon.hp = utlisBattle.get_health_formula(petData[13] || 0);
                cannon.maxhp = cannon.hp;
                cannon.bj = 0;
                cannon.bjs = 0;
                cannon.blockPlace = cannonPath[cannon.blockPlaceTwo] || { x: 5, y: 5 };
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
                cannon = utlisBattle.giveCannonSkill(cannon);
                if (cannon.profession === 2)
                    cannon = utlisBattle.cannonGiveMercenary(cannon);
                if (cannon.profession === 10)
                    cannon = utlisBattle.cannonGiveAthletes(cannon);
                if (cannon.profession === 3) {
                    boolNurse = true;
                    indexNurse = s;
                }
                if (cannon.profession === 5) {
                    boolDoctor = true;
                    indexDoctor = s;
                }
                if (cannon.profession === 0) {
                    boolThief = true;
                    indexThief = s;
                }
                cannons[s] = cannon;
            }
            if (boolNurse)
                cannons = utlisBattle.cannonGiveNurse(cannons[indexNurse], cannons);
            if (boolDoctor)
                cannons = utlisBattle.cannonGiveDoctor(cannons[indexDoctor], cannons);
            return { cannons, boolNurse, boolDoctor, boolThief, indexNurse, indexDoctor, indexThief };
        };
        const initMonsters = () => {
            const formationList = attackers.formation || [];
            const monsterPets = attackers.pet || [];
            return formationList.map((formationItem, index) => {
                const petData = monsterPets[formationItem.type] || [];
                const monster = convertFormationToMonster(formationItem, petData);
                monster.profession = formationItem.profession || petData[2] || (index % 5);
                return monster;
            });
        };
        const { cannons: initCannonsList, boolThief, indexThief } = initCannons();
        let cannons = initCannonsList;
        let monsters = initMonsters();
        let monsterApp = [];
        let playback = [];
        let monsterNum = 0;
        const cannonAttData = new Array(cannons.length).fill(0);
        if (boolThief) {
            monsters = utlisBattle.cannonGiveThief(cannons[indexThief], monsters);
        }
        for (let i = 0; i < CONST.CYCLE_LIMIT; i++) {
            if (monsterNum < CONST.MAX_MONSTER_COUNT) {
                for (let j = 0; j < monsters.length; j++) {
                    const monster = monsters[j];
                    if (!monster || monster.isContest === 1)
                        continue;
                    if (Math.round(monster.realTime * CONST.IE_NUM) === i) {
                        const speed = monster.speed || 1;
                        const blockTime = CONST.PATH_BLOCK_LENGTH / speed;
                        const globalTime = blockTime * 34;
                        const globalTimeIe = globalTime * CONST.IE_NUM || 1;
                        const everyTimeLength = globalLength / globalTimeIe;
                        monster.blockTime = blockTime;
                        monster.globalTime = globalTime;
                        monster.globalLength = globalLength;
                        monster.everyTimeLength = everyTimeLength;
                        monster.isContest = 1;
                        if (monster.profession === 0) {
                            cannons = utlisBattle.runGiveThief(cannons, monster, pathList, CONST.PATH_BLOCK_LENGTH);
                            monster.skillNumber[0]++;
                            monster.skillNumber[1]++;
                        }
                        if (monster.profession === 3) {
                            monsterApp = utlisBattle.runGiveNurse(monster, monsterApp, pathList, CONST.PATH_BLOCK_LENGTH);
                            const skill0 = monster.skill[0];
                            const skill1 = monster.skill[1];
                            if (skill0 === 4 && monster.skillNumber[0] <= 0) {
                                monster.shield += monster.maxhp * 0.2;
                            }
                            if (skill1 === 4 && monster.skillNumber[1] <= 0 && skill0 !== skill1) {
                                monster.shield += monster.maxhp * 0.2;
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
                monster.trip += monster.everyTimeLength || 0.1;
                const { newPos: monsterCurrentPos, index: pathIndex } = getMonsterCurrentPos(monster.trip, pathList, CONST.PATH_BLOCK_LENGTH);
                const profession = monster.profession;
                const travelDistance = monster.trip / (monster.globalLength || globalLength);
                switch (profession) {
                    case 8:
                        if (travelDistance >= 0.8) {
                            if (monster.skill[0] === 4 && monster.skillElectrician[4] === 0) {
                                monster.skillElectrician[4]++;
                                monster.hp += monster.maxhp * 0.5;
                            }
                            if (monster.skill[1] === 4 && monster.skillElectrician[4] === 0 && monster.skill[0] !== monster.skill[1]) {
                                monster.skillElectrician[4]++;
                                monster.hp += monster.maxhp * 0.5;
                            }
                        }
                        if (travelDistance >= 0.5) {
                            monsterApp = utlisBattle.runGiveElectrician(monster, monsterApp, pathList, CONST.PATH_BLOCK_LENGTH);
                        }
                        break;
                    case 9:
                        if (travelDistance >= 0.8 && monster.skillTeacher[4] === 0) {
                            if (monster.skill[0] === 4) {
                                monster.skillTeacher[4]++;
                                monster.defense *= 1.15;
                                monster.speed *= 1.15;
                            }
                            if (monster.skill[1] === 4 && monster.skillTeacher[4] === 0 && monster.skill[0] !== monster.skill[1]) {
                                monster.skillTeacher[4]++;
                                monster.defense *= 1.15;
                                monster.speed *= 1.15;
                            }
                        }
                        if (travelDistance >= 0.5) {
                            monsterApp = utlisBattle.runGiveTeacher(monster, monsterApp, pathList, CONST.PATH_BLOCK_LENGTH);
                        }
                        break;
                }
                for (let a = 0; a < cannons.length; a++) {
                    const cannon = cannons[a];
                    const cannonPos = {
                        x: cannon.blockPlace.x * 80 - 40,
                        y: -cannon.blockPlace.y * 80 - 40
                    };
                    const distance = utlisBattle.getDistance(cannonPos, monsterCurrentPos);
                    const cannonProfession = cannon.profession;
                    if (distance > cannon.range) {
                        continue;
                    }
                    const cannonSpeed = cannon.speed || 1;
                    const cannonAttTime = CONST.CANNON_ATTACK_BASE_TIME / cannonSpeed;
                    const canAttData = Math.round(cannonAttTime * CONST.IE_NUM);
                    if (i - cannonAttData[a] >= canAttData) {
                        monster.beingHurt++;
                        let damageValue = cannon.attack;
                        const defense = monster.defense;
                        const shieldValue = monster.shield;
                        if (damageValue < defense) {
                            damageValue = 1;
                        }
                        else {
                            damageValue -= defense;
                        }
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
                        damageValue = Math.max(1, Math.round(damageValue));
                        const isMonsterDead = monster.hp <= 0 && monster.isDeat === 0;
                        if (isMonsterDead) {
                            monster.isDeat = 1;
                            if (profession !== 11)
                                monsterApp = utlisBattle.runGiveDriver(monsterApp);
                            if (profession === 6)
                                monsterApp = utlisBattle.runGiveCaptain(monster, monsterApp);
                            if (profession === 10)
                                cannons = utlisBattle.runGiveAthletes(monster, cannons, pathList, CONST.PATH_BLOCK_LENGTH);
                            if (cannonProfession === 1)
                                cannons = utlisBattle.cannonGiveEngineer(cannon, cannons);
                            if (cannonProfession === 9)
                                cannons[a] = utlisBattle.cannonGiveTeacher(cannon);
                        }
                        switch (profession) {
                            case 2:
                                monsterApp[k] = utlisBattle.runGiveMercenary(monster);
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
                                    cannons[a] = utlisBattle.runGiveCourier(cannon, monster);
                                    monster.skillNumber[0]++;
                                    monster.skillNumber[1]++;
                                }
                                break;
                            case 5:
                                if (monster.beingHurt === 15) {
                                    if (monster.skill[0] === 4) {
                                        monsterApp.forEach(m => { if (m.profession !== 5)
                                            m.hp += m.maxhp * 0.2; });
                                    }
                                    if (monster.skill[1] === 4 && monster.skill[0] !== monster.skill[1]) {
                                        monsterApp.forEach(m => { if (m.profession !== 5)
                                            m.hp += m.maxhp * 0.2; });
                                    }
                                }
                                if (monster.beingHurt % 5 === 0) {
                                    monsterApp[k] = utlisBattle.runGiveDoctor(monster);
                                }
                                break;
                        }
                        switch (cannonProfession) {
                            case 4:
                                cannons[a] = utlisBattle.cannonGiveCourier(cannon);
                                break;
                            case 6:
                                monsterApp[k] = utlisBattle.cannonGiveCaptain(cannon, monster);
                                break;
                            case 7:
                                cannons = utlisBattle.cannonGiveProgrammer(cannon, cannons);
                                break;
                            case 8:
                            case 11:
                                monsterApp[k] = utlisBattle.cannonGiveElectrician(cannon, monster);
                                break;
                        }
                        const lockTarget = monster.id - 1;
                        playback.push([
                            pathIndex,
                            0,
                            i,
                            a,
                            [[lockTarget, damageValue, isMonsterDead ? 1 : 0]],
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
        const battleType = g_sendCommonManager.getDefenseOrAttack();
        if (battleType === 0) {
            const isDefenseSuccess = deadMonsterCount > CONST.ATTACK_TRIGGER_THRESHOLD;
            g_sendCommonManager.setBattleResultDefender(isDefenseSuccess ? 8 : 9);
        }
        else {
            const isAttackSuccess = deadMonsterCount <= CONST.ATTACK_TRIGGER_THRESHOLD;
            g_sendCommonManager.setBattleResultAttack(isAttackSuccess ? 8 : 9);
        }
        return playback;
    }
}
exports.default = BattleManager;
