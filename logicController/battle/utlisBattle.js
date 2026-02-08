"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utlisBattle = void 0;
class utlisBattle {
    static get_damage_formula(damage) {
        try {
            return Math.trunc(Math.pow((Math.pow(damage, 2) / 1.5), 0.5) + Math.pow((Math.pow(damage, 2) / 1.6), 0.5) + Math.pow((Math.pow(damage, 2) / 1.7), 0.5));
        }
        catch (error) {
            console.error('get_damage_formula-failure:', error);
            throw error;
        }
    }
    static get_defense_formula(defense) {
        try {
            return Math.trunc(Math.pow(defense, 0.5) + Math.pow(Math.pow(defense, 2), 0.5));
        }
        catch (error) {
            console.error('get_defense_formula-failure:', error);
            throw error;
        }
    }
    static get_speed_formula(speed) {
        try {
            return Math.trunc((Math.pow((speed * 0.025) / 60, 0.5) + (speed / 100)) * 55);
        }
        catch (error) {
            console.error('get_speed_formula-failure:', error);
            throw error;
        }
    }
    static get_health_formula(health) {
        try {
            return Math.trunc(health * 6.72);
        }
        catch (error) {
            console.error('get_health_formula-failure:', error);
            throw error;
        }
    }
    static getDistance(start, end) {
        var pos = { x: 0, y: 0, z: 0 };
        pos.x = start.x - end.x;
        pos.y = start.y - end.y;
        var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        return dis;
    }
    static giveMonsterSkill(monsterData) {
        const SKILL_CONFIG = {
            0: { prop: ['hp', 'maxhp'], ratio: [1.3, 1.6] },
            1: { prop: ['hp', 'maxhp'], ratio: [1.5, 2.0] },
            2: { prop: ['hp', 'maxhp'], ratio: [1.7, 2.4] },
            3: { prop: 'speed', ratio: [1.05, 1.1] },
            4: { prop: 'speed', ratio: [1.1, 1.2] },
            5: { prop: 'speed', ratio: [1.15, 1.3] },
            6: { prop: 'defense', ratio: [1.05, 1.1] },
            7: { prop: 'defense', ratio: [1.1, 1.2] },
            8: { prop: 'defense', ratio: [1.15, 1.3] },
            9: { prop: 'attack', ratio: [1.1, 1.2] },
            10: { prop: 'attack', ratio: [1.2, 1.4] },
            11: { prop: 'attack', ratio: [1.3, 1.6] },
            12: { prop: 'shield', calc: (data, multiple) => data.maxhp * 0.2 * multiple, type: 'add' },
            13: { prop: 'shield', calc: (data, multiple) => data.maxhp * 0.3 * multiple, type: 'add' },
            14: { prop: 'shield', calc: (data, multiple) => data.maxhp * 0.4 * multiple, type: 'add' },
            15: { prop: 'antiTempt', value: true, type: 'assign' },
            16: { prop: 'antiCrit', value: true, type: 'assign' }
        };
        const VALID_SKILL_IDS = Object.keys(SKILL_CONFIG).map(Number);
        if (!monsterData || !Array.isArray(monsterData.skill)) {
            return monsterData;
        }
        monsterData.hp = (monsterData.hp != null) ? monsterData.hp : 0;
        monsterData.maxhp = (monsterData.maxhp != null) ? monsterData.maxhp : 0;
        monsterData.speed = (monsterData.speed != null) ? monsterData.speed : 0;
        monsterData.defense = (monsterData.defense != null) ? monsterData.defense : 0;
        monsterData.attack = (monsterData.attack != null) ? monsterData.attack : 0;
        monsterData.shield = (monsterData.shield != null) ? monsterData.shield : 0;
        const isNumericProp = (prop) => {
            return ['hp', 'maxhp', 'speed', 'defense', 'attack', 'shield'].includes(prop);
        };
        const applySkill = (skillId, multiple) => {
            const skillIdNum = Number(skillId);
            if (!VALID_SKILL_IDS.includes(skillIdNum))
                return;
            const config = SKILL_CONFIG[skillIdNum];
            if (!config)
                return;
            if (config.ratio) {
                const targetRatio = config.ratio[multiple - 1];
                if (typeof targetRatio !== 'number') {
                    console.warn(`giveMonsterSkill：${skillIdNum}-${multiple}`);
                    return;
                }
                const props = Array.isArray(config.prop) ? config.prop : [config.prop];
                props.forEach(prop => {
                    if (isNumericProp(prop) && typeof monsterData[prop] === 'number') {
                        monsterData[prop] *= targetRatio;
                    }
                });
            }
            if (config.calc && config.type === 'add') {
                const prop = config.prop;
                if (isNumericProp(prop) && typeof monsterData[prop] === 'number') {
                    monsterData[prop] += config.calc(monsterData, multiple);
                }
            }
        };
        const skill0 = monsterData.skill[3];
        const skill1 = monsterData.skill[4];
        const isSameSkill = skill0 === skill1;
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        return monsterData;
    }
    static giveCannonSkill(cannonData) {
        const SKILL_CONFIG = {
            0: { prop: ['hp', 'maxhp'], ratio: [1.3, 1.6], type: 'multiply' },
            1: { prop: ['hp', 'maxhp'], ratio: [1.5, 2.0], type: 'multiply' },
            2: { prop: ['hp', 'maxhp'], ratio: [1.7, 2.4], type: 'multiply' },
            3: { prop: 'speed', ratio: [1.05, 1.1], type: 'multiply' },
            4: { prop: 'speed', ratio: [1.1, 1.2], type: 'multiply' },
            5: { prop: 'speed', ratio: [1.15, 1.3], type: 'multiply' },
            6: { prop: 'range', ratio: [1.05, 1.1], type: 'multiply' },
            7: { prop: 'range', ratio: [1.1, 1.2], type: 'multiply' },
            8: { prop: 'range', ratio: [1.15, 1.3], type: 'multiply' },
            9: { prop: 'attack', ratio: [1.1, 1.2], type: 'multiply' },
            10: { prop: 'attack', ratio: [1.2, 1.4], type: 'multiply' },
            11: { prop: 'attack', ratio: [1.3, 1.6], type: 'multiply' },
            12: { prop: 'goldElement', value: [15, 30], type: 'add' },
            13: { prop: 'woodElement', value: [15, 30], type: 'add' },
            14: { prop: 'waterElement', value: [15, 30], type: 'add' },
            15: { prop: 'fireElement', value: [15, 30], type: 'add' },
            16: { prop: 'soilElement', value: [15, 30], type: 'add' }
        };
        const VALID_SKILL_IDS = Object.keys(SKILL_CONFIG).map(Number);
        const DEFENSE_CLEAR_SKILLS = [3, 5];
        if (!cannonData || !Array.isArray(cannonData.skill)) {
            console.warn('giveCannonSkill：461');
            return cannonData;
        }
        const numericInitProps = {
            hp: 0, maxhp: 0, speed: 0, range: 0, attack: 0,
            goldElement: 0, woodElement: 0, waterElement: 0, fireElement: 0, soilElement: 0
        };
        Object.keys(numericInitProps).forEach(prop => {
            const key = prop;
            if (typeof cannonData[key] !== 'number') {
                cannonData[key] = numericInitProps[key];
            }
        });
        const isCannonNumericProp = (prop) => {
            return Object.keys(numericInitProps).includes(prop);
        };
        const applySkill = (skillId, multiplier) => {
            const skillIdNum = Number(skillId);
            if (!VALID_SKILL_IDS.includes(skillIdNum))
                return;
            const config = SKILL_CONFIG[skillIdNum];
            if (!config)
                return;
            if (multiplier < 1 || multiplier > 2) {
                console.warn(`giveCannonSkill：${skillIdNum}-${multiplier}`);
                return;
            }
            if (config.type === 'multiply' && config.ratio) {
                const targetRatio = config.ratio[multiplier - 1];
                if (typeof targetRatio !== 'number') {
                    console.warn(`giveCannonSkill：${skillIdNum}-${multiplier}`);
                    return;
                }
                const props = Array.isArray(config.prop) ? config.prop : [config.prop];
                props.forEach(prop => {
                    if (isCannonNumericProp(prop) && typeof cannonData[prop] === 'number') {
                        cannonData[prop] *= targetRatio;
                    }
                });
            }
            if (config.type === 'add' && config.value) {
                const targetValue = config.value[multiplier - 1];
                if (typeof targetValue !== 'number') {
                    return;
                }
                const prop = config.prop;
                if (isCannonNumericProp(prop) && typeof cannonData[prop] === 'number') {
                    cannonData[prop] += targetValue;
                }
            }
        };
        const skill0 = cannonData.skill[3];
        const skill1 = cannonData.skill[4];
        const isSameSkill = skill0 === skill1;
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        if (DEFENSE_CLEAR_SKILLS.includes(cannonData.skill[2])) {
            cannonData.range = 0;
        }
        return cannonData;
    }
    static runGiveThief(cannon, monster) {
        let skill0 = monster.skill[0];
        let skill1 = monster.skill[1];
        if (monster.skillNumber[0] > 0)
            skill0 = 999;
        if (monster.skillNumber[1] > 0)
            skill1 = 999;
        const isSameSkill = skill0 === skill1;
        const skillConfig = {
            0: {
                targetProp: 'range',
                baseProp: 'defense',
                reduceRatio: 0.03,
                maxStack: 10,
                stackIndex: 0,
            },
            1: {
                targetProp: 'attack',
                baseProp: 'attack',
                reduceRatio: 0.03,
                maxStack: 10,
                stackIndex: 1,
            },
            2: {
                targetProp: 'speed',
                baseProp: 'speed',
                reduceRatio: 0.03,
                maxStack: 10,
                stackIndex: 2,
            },
            3: {
                targetProp: 'hp',
                baseProp: 'maxhp',
                reduceRatio: 0.03,
                maxStack: 10,
                stackIndex: 3,
            },
            4: {
                effect: (targetTower, thief) => {
                },
            },
        };
        let effective = true;
        for (let i = 0; i < cannon.length; i++) {
            const tower = cannon[i];
            if (tower.prohibitThief > 0) {
                effective = false;
            }
        }
        const applySkill = (skillType, multiplierThief) => {
            const config = skillConfig[skillType];
            if (skillType === 999 || !config)
                return;
            if (skillType === 4) {
                cannon.forEach((tower) => config.effect(tower, monster));
                return;
            }
            const skillItem = config;
            for (let i = 0; i < cannon.length; i++) {
                const tower = cannon[i];
                if (tower.skillThief[skillItem.stackIndex] >= skillItem.maxStack)
                    continue;
                const reduceValue = monster[skillItem.baseProp] * skillItem.reduceRatio;
                tower[skillItem.targetProp] -= reduceValue;
                tower.skillThief[skillItem.stackIndex] += 1;
            }
        };
        if (effective) {
            if (isSameSkill) {
                applySkill(skill0, 2);
            }
            else {
                applySkill(skill0, 1);
                applySkill(skill1, 1);
            }
        }
        return cannon;
    }
    static runGiveMercenary(monster) {
        const hpScale = monster.hp / monster.maxhp;
        let skill0 = monster.skill[0];
        let skill1 = monster.skill[1];
        if (monster.skillNumber[0] > 0)
            skill0 = 999;
        if (monster.skillNumber[1] > 0)
            skill1 = 999;
        const isSameSkill = skill0 === skill1;
        const skillConfig = {
            0: {
                hpThreshold: 0.03,
                effect: (target, multiple) => {
                    target.shield += target.maxhp * 0.5 * multiple;
                },
                stackAdd: { same: 2, different: 1 },
                stackIndex: 0,
            },
            1: {
                hpThreshold: 0.25,
                effect: (target, multiple) => {
                    target.hp += target.maxhp * 0.2 * multiple;
                },
                stackAdd: { same: 2, different: 1 },
                stackIndex: 1,
            },
            2: {
                hpThreshold: 0.5,
                effect: (target, multiple) => {
                    target.speed += target.speed * 0.1 * multiple;
                },
                stackAdd: { same: 2, different: 1 },
                stackIndex: 2,
            },
            3: {
                hpThreshold: 0.65,
                effect: (target, multiple) => {
                    target.defense += target.defense * 0.1 * multiple;
                },
                stackAdd: { same: 2, different: 1 },
                stackIndex: 3,
            },
            4: {
                hpThreshold: 0.8,
                effect: (target, multiple) => {
                    target.shield += target.maxhp * 0.05 * multiple;
                },
                stackAdd: { same: 1, different: 1 },
                stackIndex: 4,
            },
        };
        const applySkill = (skillType, multiple) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            const isHpQualified = hpScale <= config.hpThreshold;
            const isStackAvailable = monster.skillMercenary[config.stackIndex] <= 0;
            if (isHpQualified && isStackAvailable) {
                config.effect(monster, multiple);
                const addCount = isSameSkill ? config.stackAdd.same : config.stackAdd.different;
                monster.skillMercenary[config.stackIndex] += addCount;
            }
        };
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        return monster;
    }
    static runGiveNurse(monster, monsterList) {
        let skill0 = monster.skill[0];
        let skill1 = monster.skill[1];
        if (monster.skillNumber[0] > 0)
            skill0 = 999;
        if (monster.skillNumber[1] > 0)
            skill1 = 999;
        const isSameSkill = skill0 === skill1;
        const skillConfig = {
            0: {
                targetProp: 'shield',
                baseProp: 'maxhp',
                baseRatio: 0.03,
                programmerRatio: 0.06,
                programmerRequiredSkill: 0,
                targetChecker: (member) => member.profession !== 3,
            },
            1: {
                targetProp: 'hp',
                baseProp: 'maxhp',
                baseRatio: 0.03,
                programmerRatio: 0.06,
                programmerRequiredSkill: 1,
                targetChecker: (member) => member.profession !== 3,
            },
            2: {
                targetProp: 'defense',
                baseProp: 'defense',
                baseRatio: 0.03,
                programmerRatio: 0.06,
                programmerRequiredSkill: 2,
                targetChecker: (member) => member.profession !== 3,
            },
            3: {
                targetProp: 'speed',
                baseProp: 'speed',
                baseRatio: 0.03,
                programmerRatio: 0.06,
                programmerRequiredSkill: 3,
                targetChecker: (member) => member.profession !== 3,
            },
            4: {
                effect: (nurse) => {
                },
            },
        };
        const applySkill = (skillType, skillIndex, multiple) => {
            const config = skillConfig[skillType];
            if (skillType === 999 || !config)
                return;
            if (skillType === 4) {
                config.effect(monster);
                return;
            }
            const skillItem = config;
            for (let i = 0; i < monsterList.length; i++) {
                const member = monsterList[i];
                if (!skillItem.targetChecker(member))
                    continue;
                let addRatio = skillItem.baseRatio;
                if (member.profession === 7) {
                    addRatio = member.skill[0] === skillItem.programmerRequiredSkill || member.skill[1] === skillItem.programmerRequiredSkill ? skillItem.programmerRatio : addRatio;
                }
                const addValue = monster[skillItem.baseProp] * addRatio * multiple;
                member[skillItem.targetProp] += addValue;
            }
        };
        if (isSameSkill) {
            applySkill(skill0, 0, 2);
        }
        else {
            applySkill(skill0, 0, 1);
            applySkill(skill1, 1, 1);
        }
        return monsterList;
    }
    static runGiveCourier(cannon, monster) {
        const skill0 = monster.skill[0];
        const skill1 = monster.skill[1];
        const isSameSkill = skill0 === skill1;
        const skillConfig = {
            0: {
                targetProp: 'speed',
                baseProp: 'speed',
                reduceRatio: 0.05,
            },
            1: {
                targetProp: 'attack',
                baseProp: 'attack',
                reduceRatio: 0.05,
            },
            2: {
                targetProp: 'range',
                baseProp: 'defense',
                reduceRatio: 0.05,
            },
            3: {
                targetProp: 'hp',
                baseProp: 'maxhp',
                reduceRatio: 0.05,
            },
            5: {
                effect: (courier) => {
                },
            },
        };
        const applySkill = (skillType) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            if (skillType === 5) {
                config.effect(monster);
                return;
            }
            const skillItem = config;
            const reduceValue = monster[skillItem.baseProp] * skillItem.reduceRatio;
            cannon[skillItem.targetProp] -= reduceValue;
        };
        if (isSameSkill) {
            applySkill(skill0);
        }
        else {
            applySkill(skill0);
            applySkill(skill1);
        }
        return cannon;
    }
    static runGiveDoctor(monster) {
        const skill0 = monster.skill[0];
        const skill1 = monster.skill[1];
        const isSameSkill = skill0 === skill1;
        const skillConfig = {
            0: {
                effect: (target) => {
                    target.hp += target.maxhp * 0.1;
                }
            },
            1: {
                effect: (target) => {
                    target.speed += target.speed * 0.05;
                }
            },
            2: {
                effect: (target) => {
                    target.defense += target.defense * 0.05;
                }
            },
            3: {
                effect: (target) => {
                    target.shield += target.maxhp * 0.05;
                }
            },
            4: {
                effect: (target, members) => {
                }
            }
        };
        const applySkill = (skillType) => {
            const config = skillConfig[skillType];
            if (config) {
                config.effect(monster);
            }
        };
        applySkill(skill0);
        applySkill(skill1);
        return monster;
    }
    static runGiveCaptain(monster, monsterList) {
        const skill0 = monster.skill[0];
        const skill1 = monster.skill[1];
        const pathRatio = monster.trip / monster.globalLength;
        const isSameSkill = skill0 === skill1;
        const skillConfig = {
            0: {
                prop: 'speed',
                baseRatio: 0.05,
                maxStack: 5,
                checker: (target) => target.profession !== 6,
                programmerSkill: 0,
                isFlatByMaxHp: false,
            },
            1: {
                prop: 'hp',
                baseRatio: 0.05,
                maxStack: 5,
                checker: (target) => target.profession !== 6,
                programmerSkill: 1,
                isFlatByMaxHp: true,
            },
            2: {
                prop: 'shield',
                baseRatio: 0.05,
                maxStack: 5,
                checker: (target) => target.profession !== 6,
                programmerSkill: 2,
                isFlatByMaxHp: true,
            },
            3: {
                prop: 'defense',
                baseRatio: 0.05,
                maxStack: 5,
                checker: (target) => target.profession !== 6,
                programmerSkill: 3,
                isFlatByMaxHp: false,
            },
            4: {
                prop: 'hp',
                baseRatio: 0.3,
                maxStack: 1,
                checker: (target) => target.id !== monster.id && pathRatio >= 0.95,
                programmerSkill: 4,
                isFlatByMaxHp: true,
            },
        };
        const applySkill = (skillType) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            for (let i = 0; i < monsterList.length; i++) {
                const targetMonster = { ...monsterList[i] };
                if (!config.checker(targetMonster))
                    continue;
                if (targetMonster.skillCaptain[skillType] > config.maxStack)
                    continue;
                let ratio = config.baseRatio;
                if (config.isFlatByMaxHp) {
                    targetMonster[config.prop] += targetMonster.maxhp * ratio;
                }
                else {
                    targetMonster[config.prop] += targetMonster[config.prop] * ratio;
                }
                targetMonster.skillCaptain[skillType] += 1;
                monsterList[i] = targetMonster;
            }
        };
        if (isSameSkill) {
            applySkill(skill0);
        }
        else {
            applySkill(skill0);
            applySkill(skill1);
        }
        return monsterList;
    }
    static runGiveElectrician(monster, monsterList) {
        const skill0 = monster.skill[0];
        const skill1 = monster.skill[1];
        const isSameSkill = skill0 === skill1;
        const travelRatio = monster.trip / monster.globalLength;
        const skillConfig = {
            0: {
                prop: 'defense',
                baseRatio: 0.02,
                programmerSkill: 0,
                programmerRatio: 0.04,
                maxStack: 5,
                stackIndex: 0,
                distanceThreshold: 0.3,
                targetChecker: (target) => target.profession !== 8,
            },
            1: {
                prop: 'defense',
                baseRatio: 0.04,
                programmerSkill: 1,
                programmerRatio: 0.08,
                maxStack: 5,
                stackIndex: 1,
                distanceThreshold: 0.6,
                targetChecker: (target) => target.profession !== 8,
            },
            2: {
                prop: 'speed',
                baseRatio: 0.02,
                programmerSkill: 2,
                programmerRatio: 0.04,
                maxStack: 5,
                stackIndex: 2,
                distanceThreshold: 0.3,
                targetChecker: (target) => target.profession !== 8,
            },
            3: {
                prop: 'speed',
                baseRatio: 0.04,
                programmerSkill: 3,
                programmerRatio: 0.08,
                maxStack: 5,
                stackIndex: 3,
                distanceThreshold: 0.6,
                targetChecker: (target) => target.profession !== 8,
            },
            4: {
                effect: (target, multiple) => {
                },
                stackIndex: 4,
            },
        };
        const applySkill = (skillType, multiple) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            if (skillType === 4) {
                config.effect(monster, multiple);
                return;
            }
            const skillItem = config;
            if (travelRatio < skillItem.distanceThreshold)
                return;
            for (let i = 0; i < monsterList.length; i++) {
                const target = monsterList[i];
                if (!skillItem.targetChecker(target))
                    continue;
                if (target.skillElectrician[skillItem.stackIndex] >= skillItem.maxStack)
                    continue;
                let addRatio = skillItem.baseRatio;
                if (target.profession === 7) {
                    const hasSkill = target.skill[0] === skillItem.programmerSkill || target.skill[1] === skillItem.programmerSkill;
                    addRatio = hasSkill ? skillItem.programmerRatio : addRatio;
                }
                target[skillItem.prop] += target[skillItem.prop] * addRatio * multiple;
                target.skillElectrician[skillItem.stackIndex] += 1;
            }
        };
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        return monsterList;
    }
    static runGiveTeacher(monster, monsterList) {
        const skill0 = monster.skill[0];
        const skill1 = monster.skill[1];
        const isSameSkill = skill0 === skill1;
        const travelRatio = monster.trip / monster.globalLength;
        const skillConfig = {
            0: {
                prop: 'hp',
                baseRatio: 0.02,
                baseUpperLimit: 0.1,
                programmerSkill: 0,
                programmerRatio: 0.04,
                programmerUpperLimit: 0.2,
                maxStack: 5,
                stackIndex: 0,
                distanceThreshold: 0.5,
                targetChecker: (target) => target.profession !== 9,
            },
            1: {
                prop: 'hp',
                baseRatio: 0.04,
                baseUpperLimit: 0.2,
                programmerSkill: 1,
                programmerRatio: 0.08,
                programmerUpperLimit: 0.4,
                maxStack: 5,
                stackIndex: 1,
                distanceThreshold: 0.8,
                targetChecker: (target) => target.profession !== 9,
            },
            2: {
                prop: 'shield',
                baseRatio: 0.02,
                baseUpperLimit: 0.1,
                programmerSkill: 2,
                programmerRatio: 0.04,
                programmerUpperLimit: 0.2,
                maxStack: 5,
                stackIndex: 2,
                distanceThreshold: 0.5,
                targetChecker: (target) => target.profession !== 9,
            },
            3: {
                prop: 'shield',
                baseRatio: 0.04,
                baseUpperLimit: 0.2,
                programmerSkill: 3,
                programmerRatio: 0.08,
                programmerUpperLimit: 0.4,
                maxStack: 5,
                stackIndex: 3,
                distanceThreshold: 0.8,
                targetChecker: (target) => target.profession !== 9,
            },
            4: {
                effect: (target, multiple) => {
                },
                stackIndex: 4,
            },
        };
        const applySkill = (skillType, multiple) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            if (skillType === 4) {
                config.effect(monster, multiple);
                return;
            }
            const skillItem = config;
            if (travelRatio < skillItem.distanceThreshold)
                return;
            for (let i = 0; i < monsterList.length; i++) {
                const target = monsterList[i];
                if (!skillItem.targetChecker(target))
                    continue;
                if (target.skillTeacher[skillItem.stackIndex] > skillItem.maxStack)
                    continue;
                let addRatio = skillItem.baseRatio;
                if (target.profession === 1) {
                    const hasSkill = target.skill[0] === skillItem.programmerSkill || target.skill[1] === skillItem.programmerSkill;
                    addRatio = hasSkill ? skillItem.programmerRatio : addRatio;
                }
                target[skillItem.prop] += target.maxhp * addRatio * multiple;
                target.skillTeacher[skillItem.stackIndex] += 1;
            }
        };
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        return monsterList;
    }
    static runGiveAthletes(monster, cannon) {
        const skill0 = monster.skill[0];
        const skill1 = monster.skill[1];
        const isSameSkill = skill0 === skill1;
        const pathRatio = monster.trip / monster.globalLength;
        const skillConfig = {
            0: {
                prop: 'hp',
                reduceRatio: 0.04,
                maxStack: 5,
                stackIndex: 0,
                checker: () => true,
            },
            1: {
                prop: 'range',
                reduceRatio: 0.04,
                maxStack: 5,
                stackIndex: 1,
                checker: () => true,
            },
            2: {
                prop: 'speed',
                reduceRatio: 0.04,
                maxStack: 5,
                stackIndex: 2,
                checker: () => true,
            },
            3: {
                prop: 'attack',
                reduceRatio: 0.04,
                maxStack: 5,
                stackIndex: 3,
                checker: () => true,
            },
            4: {
                prop: 'attack',
                reduceRatio: 0.1,
                maxStack: 5,
                stackIndex: 4,
                checker: () => pathRatio >= 0.75,
            },
        };
        const applySkill = (skillType, multiple) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            if (!config.checker())
                return;
            for (let i = 0; i < cannon.length; i++) {
                const targetCannon = cannon[i];
                if (targetCannon.skillAthletes[config.stackIndex] >= config.maxStack) {
                    continue;
                }
                targetCannon[config.prop] -= targetCannon[config.prop] * config.reduceRatio;
                targetCannon.skillAthletes[config.stackIndex] += 1;
            }
        };
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        return cannon;
    }
    static runGiveDriver(monsterList) {
        const DRIVER_PROFESSION = 11;
        const skillConfig = {
            0: {
                targetProp: 'hp',
                baseProp: 'maxhp',
                addRatio: 0.06,
                needStack: true,
            },
            1: {
                targetProp: 'defense',
                baseProp: 'defense',
                addRatio: 0.06,
                needStack: true,
            },
            2: {
                targetProp: 'shield',
                baseProp: 'maxhp',
                addRatio: 0.06,
                needStack: true,
            },
            3: {
                targetProp: 'speed',
                baseProp: 'speed',
                addRatio: 0.06,
                needStack: true,
            },
            4: {
                targetProp: 'speed',
                baseProp: 'speed',
                addRatio: 0.2,
                triggerCondition: (driver) => driver.skillDriver >= 15,
                resetStack: true,
                needStack: false,
            },
        };
        const applySkill = (driver, skillType, multiple) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            if (skillType === 4) {
                const triggerConfig = config;
                if (triggerConfig.triggerCondition(driver)) {
                    const addValue = driver[triggerConfig.baseProp] * triggerConfig.addRatio * multiple;
                    driver[triggerConfig.targetProp] += addValue;
                    if (triggerConfig.resetStack)
                        driver.skillDriver = 0;
                }
                return;
            }
            const baseConfig = config;
            const addValue = driver[baseConfig.baseProp] * baseConfig.addRatio * multiple;
            driver[baseConfig.targetProp] += addValue;
            if (baseConfig.needStack)
                driver.skillDriver += 1;
        };
        for (let i = 0; i < monsterList.length; i++) {
            const member = monsterList[i];
            if (member.profession !== DRIVER_PROFESSION || typeof member.skillDriver !== 'number')
                continue;
            const driver = member;
            const skill0 = driver.skill[0];
            const skill1 = driver.skill[1];
            const isSameSkill = skill0 === skill1;
            if (isSameSkill) {
                applySkill(driver, skill0, 2);
            }
            else {
                applySkill(driver, skill0, 1);
                applySkill(driver, skill1, 1);
            }
        }
        return monsterList;
    }
    static cannonGiveThief(cannon, monsterList) {
        const skillConfig = {
            0: {
                targetProp: 'maxhp',
                flagIndex: 0,
            },
            1: {
                targetProp: 'speed',
                flagIndex: 1,
            },
            2: {
                targetProp: 'defense',
                flagIndex: 2,
            },
            3: {
                targetProp: 'attack',
                flagIndex: 3,
            },
            4: {
                targetProp: 'hp',
                flagIndex: 4,
            },
        };
        const applySkill = (skillType) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            for (let i = 0; i < monsterList.length; i++) {
                const monster = monsterList[i];
                if (monster.skill[2] !== 0 &&
                    Array.isArray(monster.giveSkillThief) &&
                    monster.giveSkillThief[config.flagIndex] === 0) {
                    monster.giveSkillThief[config.flagIndex] += 1;
                    monster[config.targetProp] *= 0.95;
                }
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const isSameSkill = skill0 === skill1 && skill0 !== undefined;
        if (isSameSkill) {
            applySkill(skill0);
        }
        else {
            if (skill0 !== undefined)
                applySkill(skill0);
            if (skill1 !== undefined)
                applySkill(skill1);
        }
        return monsterList;
    }
    static cannonGiveEngineer(cannon, cannonList) {
        const CONSTS = {
            KILL_COUNT_INDEX: 5,
            SKILL_TYPE_RANGE: [0, 1, 2, 3, 4],
        };
        const skillConfigMap = {
            0: {
                targetProp: 'range',
                flagIndex: 0,
                addRatio: 0.01,
                maxStack: 15,
                isGlobal: true,
                judgeProp: 'giveSkillEngineer',
                triggerType: 'perKill',
            },
            1: {
                targetProp: 'attack',
                flagIndex: 1,
                addRatio: 0.01,
                maxStack: 15,
                isGlobal: true,
                judgeProp: 'giveSkillEngineer',
                triggerType: 'perKill',
            },
            2: {
                targetProp: 'speed',
                flagIndex: 2,
                addRatio: 0.01,
                maxStack: 15,
                isGlobal: true,
                judgeProp: 'giveSkillEngineer',
                triggerType: 'perKill',
            },
            3: {
                targetProp: 'maxhp',
                flagIndex: 3,
                addRatio: 0.01,
                maxStack: 15,
                isGlobal: true,
                judgeProp: 'giveSkillEngineer',
                triggerType: 'perKill',
            },
            4: {
                targetProp: 'speed',
                flagIndex: 4,
                addRatio: 0.1,
                maxStack: 1,
                isGlobal: true,
                judgeProp: 'giveSkillEngineer',
                triggerType: 'accumulateKill',
                killThreshold: 9,
            },
        };
        if (!cannon || !Array.isArray(cannonList) || cannonList.length === 0) {
            console.warn('cannonGiveEngineer：3801');
            return cannonList;
        }
        const isSkillTriggerable = (targetCannon, config, currentKillCount) => {
            const baseCondition = targetCannon[config.judgeProp]
                && Array.isArray(targetCannon[config.judgeProp])
                && targetCannon[config.judgeProp][config.flagIndex] < config.maxStack
                && targetCannon !== cannon;
            if (!baseCondition)
                return false;
            switch (config.triggerType) {
                case 'perKill':
                    return true;
                case 'accumulateKill':
                    return config.killThreshold !== undefined && currentKillCount >= config.killThreshold;
                default:
                    return false;
            }
        };
        const applySingleSkill = (skillType, currentKillCount) => {
            const config = skillConfigMap[skillType];
            if (!config || !CONSTS.SKILL_TYPE_RANGE.includes(skillType))
                return;
            if (config.isGlobal) {
                cannonList.forEach((targetCannon) => {
                    if (!isSkillTriggerable(targetCannon, config, currentKillCount))
                        return;
                    targetCannon[config.judgeProp][config.flagIndex] += 1;
                    const addValue = cannon[config.targetProp] * config.addRatio;
                    targetCannon[config.targetProp] += addValue;
                });
            }
        };
        cannon.giveSkillEngineer[CONSTS.KILL_COUNT_INDEX] += 1;
        const currentKillCount = cannon.giveSkillEngineer[CONSTS.KILL_COUNT_INDEX];
        // 2026-01-29
        const skill0 = (cannon.skill && cannon.skill[0] != null) ? cannon.skill[0] : -1;
        const skill1 = (cannon.skill && cannon.skill[1] != null) ? cannon.skill[1] : -1;
        const isSameSkill = skill0 === skill1 && CONSTS.SKILL_TYPE_RANGE.includes(skill0);
        if (isSameSkill) {
            applySingleSkill(skill0, currentKillCount);
        }
        else {
            if (CONSTS.SKILL_TYPE_RANGE.includes(skill0)) {
                applySingleSkill(skill0, currentKillCount);
            }
            if (CONSTS.SKILL_TYPE_RANGE.includes(skill1)) {
                applySingleSkill(skill1, currentKillCount);
            }
        }
        return cannonList;
    }
    static cannonGiveMercenary(cannon) {
        const skillConfig = {
            0: {
                effect: (cannon) => {
                    cannon.attack *= 1.15;
                },
            },
            1: {
                effect: (cannon) => {
                    cannon.range *= 1.15;
                },
            },
            2: {
                effect: (cannon) => {
                    cannon.speed *= 1.15;
                },
            },
            3: {
                effect: (cannon) => {
                    cannon.maxhp *= 1.15;
                    cannon.hp *= 1.15;
                },
            },
            4: {
                effect: (cannon) => {
                    cannon.prohibitThief = 1;
                },
            },
        };
        const applySkill = (skillType) => {
            if (skillType === undefined || !skillConfig[skillType])
                return;
            skillConfig[skillType].effect(cannon);
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        applySkill(skill0);
        applySkill(skill1);
        return cannon;
    }
    static cannonGiveNurse(cannon, cannonList) {
        const skillConfig = {
            0: {
                effect: (targetCannon, nurseCannon) => {
                    targetCannon.speed += nurseCannon.speed * 0.2;
                },
            },
            1: {
                effect: (targetCannon, nurseCannon) => {
                    targetCannon.attack += nurseCannon.attack * 0.15;
                },
            },
            2: {
                effect: (targetCannon, nurseCannon) => {
                    const addValue = nurseCannon.maxhp * 0.15;
                    targetCannon.maxhp += addValue;
                    targetCannon.hp += addValue;
                },
            },
            3: {
                effect: (targetCannon) => {
                    targetCannon.range += targetCannon.range * 0.1;
                },
            },
            4: {
                effect: (targetCannon) => {
                    const elementProps = ['goldElement', 'woodElement', 'waterElement', 'fireElement', 'soilElement'];
                    elementProps.forEach((prop) => {
                        const currentValue = (targetCannon[prop] != null) ? targetCannon[prop] : 0; //2026-01-29
                        if (currentValue > 0) {
                            targetCannon[prop] = currentValue + 5;
                        }
                    });
                },
            },
        };
        const isEligible = (targetCannon) => {
            return Array.isArray(targetCannon.skill) && targetCannon.skill.length >= 3 && targetCannon.skill[2] !== 2;
        };
        const applySkill = (skillType) => {
            if (skillType === undefined || !skillConfig[skillType])
                return;
            for (let i = 0; i < cannonList.length; i++) {
                const targetCannon = cannonList[i];
                if (isEligible(targetCannon)) {
                    skillConfig[skillType].effect(targetCannon, cannon);
                }
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        applySkill(skill0);
        applySkill(skill1);
        return cannonList;
    }
    static cannonGiveCourier(cannon) {
        const skillConfig = {
            0: {
                targetProp: 'hp',
                flagIndex: 0,
                addRatio: 0.04,
                maxStack: 10,
            },
            1: {
                targetProp: 'maxhp',
                flagIndex: 1,
                addRatio: 0.04,
                maxStack: 10,
            },
            2: {
                targetProp: 'attack',
                flagIndex: 2,
                addRatio: 0.02,
                maxStack: 10,
            },
            3: {
                targetProp: 'range',
                flagIndex: 3,
                addRatio: 0.02,
                maxStack: 10,
            },
            4: {
                targetProp: 'speed',
                flagIndex: 3,
                addRatio: 0.02,
                maxStack: 10,
            },
        };
        const applySkill = (skillType, multiple) => {
            if (skillType === undefined || !skillConfig[skillType])
                return;
            const config = skillConfig[skillType];
            if (!Array.isArray(cannon.giveSkillCourier))
                return;
            const currentStack = cannon.giveSkillCourier[config.flagIndex];
            if (currentStack < config.maxStack) {
                cannon.giveSkillCourier[config.flagIndex] += 1;
                cannon[config.targetProp] += cannon[config.targetProp] * config.addRatio;
            }
            cannon.skillNumber[0] = 0;
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const isSameSkill = skill0 === skill1 && skill0 !== undefined;
        if (isSameSkill) {
            cannon.skillNumber[0] += 1;
            if (cannon.skillNumber[0] >= 5) {
                applySkill(skill0, 2);
            }
        }
        else {
            cannon.skillNumber[0] += 1;
            if (cannon.skillNumber[0] >= 5) {
                if (skill0 !== undefined)
                    applySkill(skill0, 1);
                if (skill1 !== undefined)
                    applySkill(skill1, 1);
            }
        }
        return cannon;
    }
    static cannonGiveDoctor(cannon, cannonList) {
        const skillConfig = {
            0: {
                effect: (targetCannon, doctorCannon) => {
                    targetCannon.speed += doctorCannon.speed * 0.4;
                },
            },
            1: {
                effect: (targetCannon, doctorCannon) => {
                    targetCannon.attack += doctorCannon.attack * 0.3;
                },
            },
            2: {
                effect: (targetCannon, doctorCannon) => {
                    const addValue = doctorCannon.maxhp * 0.3;
                    targetCannon.maxhp += addValue;
                    targetCannon.hp += addValue;
                },
            },
            3: {
                effect: (targetCannon, doctorCannon) => {
                    targetCannon.range += doctorCannon.range * 0.2;
                },
            },
            4: {
                effect: (targetCannon) => {
                    const elementProps = ['goldElement', 'woodElement', 'waterElement', 'fireElement', 'soilElement'];
                    elementProps.forEach((prop) => {
                        const currentValue = (targetCannon[prop] != null) ? targetCannon[prop] : 0; //2026-01-29
                        if (currentValue > 0) {
                            targetCannon[prop] = currentValue + 10;
                        }
                    });
                },
            },
        };
        const isInRange = (targetCannon, doctorCannon) => {
            const xDiff = doctorCannon.blockPlace.x - targetCannon.blockPlace.x;
            const yDiff = doctorCannon.blockPlace.y - targetCannon.blockPlace.y;
            return xDiff >= -1 && xDiff <= 1 && yDiff >= -1 && yDiff <= 1;
        };
        const isEligible = (targetCannon) => {
            return Array.isArray(targetCannon.skill) && targetCannon.skill.length >= 3 && targetCannon.skill[2] !== 2;
        };
        const applySkill = (skillType) => {
            if (skillType === undefined || !skillConfig[skillType])
                return;
            const config = skillConfig[skillType];
            for (let i = 0; i < cannonList.length; i++) {
                const targetCannon = cannonList[i];
                if (isInRange(targetCannon, cannon) && isEligible(targetCannon)) {
                    config.effect(targetCannon, cannon);
                }
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const isSameSkill = skill0 === skill1 && skill0 !== undefined;
        if (skill0 !== undefined)
            applySkill(skill0);
        if (!isSameSkill && skill1 !== undefined) {
            applySkill(skill1);
        }
        return cannonList;
    }
    static cannonGiveCaptain(cannon, monster) {
        const skillConfig = {
            0: { targetProfessions: [2, 10] },
            1: { targetProfessions: [5, 3] },
            2: { targetProfessions: [6, 8] },
            3: { targetProfessions: [9, 0] },
            4: { targetProfessions: [11, 4] },
        };
        const isTriggerable = (monster, config) => {
            const monsterProfession = monster.skill[2];
            return (monster.giveSkillCaptain === 0 &&
                Array.isArray(monster.skill) &&
                monster.skill.length >= 3 &&
                config.targetProfessions.includes(monsterProfession));
        };
        const applySkill = (skillType) => {
            if (skillType === undefined || !skillConfig[skillType])
                return;
            const config = skillConfig[skillType];
            if (isTriggerable(monster, config)) {
                monster.speed -= cannon.speed * 0.3;
                monster.giveSkillCaptain += 1;
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const isSameSkill = skill0 === skill1 && skill0 !== undefined;
        if (skill0 !== undefined) {
            applySkill(skill0);
        }
        if (!isSameSkill && skill1 !== undefined) {
            applySkill(skill1);
        }
        return monster;
    }
    static cannonGiveProgrammer(cannon, cannonList) {
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const handleSingleSkill = (skillType, multiplier) => {
            for (let i = 0; i < cannonList.length; i++) {
                const targetCannon = cannonList[i];
                if (targetCannon.giveSkillProgrammer[skillType] >= 10)
                    continue;
                switch (skillType) {
                    case 0:
                        targetCannon.speed += targetCannon.speed * multiplier;
                        break;
                    case 1:
                        targetCannon.range += targetCannon.range * multiplier;
                        break;
                    case 2:
                        targetCannon.attack += targetCannon.attack * multiplier;
                        break;
                    case 3:
                        targetCannon.maxhp += targetCannon.maxhp * multiplier;
                        break;
                    case 4:
                        targetCannon.hp += targetCannon.maxhp * multiplier;
                        if (targetCannon.hp > targetCannon.maxhp)
                            targetCannon.hp = targetCannon.maxhp;
                        break;
                }
                targetCannon.giveSkillProgrammer[skillType] += 1;
                cannonList[i] = targetCannon;
            }
            cannon.skillNumber[0] = 0;
        };
        if (skill0 == skill1) {
            cannon.skillNumber[0] += 1;
            if (cannon.skillNumber[0] >= 5) {
                handleSingleSkill(skill0, 0.02);
            }
        }
        else {
            cannon.skillNumber[0] += 1;
            if (cannon.skillNumber[0] >= 5) {
                handleSingleSkill(skill0, 0.01);
                handleSingleSkill(skill1, 0.01);
            }
        }
        return cannonList;
    }
    static cannonGiveElectrician(cannon, monster) {
        const skillConfig = {
            0: {
                hpThreshold: 0.9,
                flagIndex: 0,
                targetProp: 'speed',
                reduceRatio: 0.1,
                baseProp: 'speed',
            },
            1: {
                hpThreshold: 0.8,
                flagIndex: 1,
                targetProp: 'attack',
                reduceRatio: 0.1,
                baseProp: 'attack',
            },
            2: {
                hpThreshold: 0.7,
                flagIndex: 2,
                targetProp: 'maxhp',
                reduceRatio: 0.1,
                baseProp: 'maxhp',
            },
            3: {
                hpThreshold: 0.6,
                flagIndex: 3,
                targetProp: 'defense',
                reduceRatio: 0.1,
                baseProp: 'range',
            },
            4: {
                hpThreshold: 0.2,
                flagIndex: 4,
                targetProp: 'speed',
                reduceRatio: 0.2,
                baseProp: 'speed',
            },
        };
        const isTriggerable = (monster, config) => {
            const monsterHPRatio = monster.maxhp > 0 ? monster.hp / monster.maxhp : 0;
            return (monsterHPRatio <= config.hpThreshold &&
                Array.isArray(monster.giveSkillElectrician) &&
                monster.giveSkillElectrician.length === 5 &&
                monster.giveSkillElectrician[config.flagIndex] === 0);
        };
        const applySkill = (skillType, multipleElectrician) => {
            if (skillType === undefined || !skillConfig[skillType])
                return;
            const config = skillConfig[skillType];
            if (isTriggerable(monster, config)) {
                const reduceValue = cannon[config.baseProp] * config.reduceRatio * multipleElectrician;
                monster[config.targetProp] -= reduceValue;
                monster.giveSkillElectrician[config.flagIndex] += 1;
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const isSameSkill = skill0 === skill1;
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            if (skill0 !== undefined)
                applySkill(skill0, 1);
            if (skill1 !== undefined)
                applySkill(skill1, 1);
        }
        return monster;
    }
    static cannonGiveTeacher(cannon) {
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        cannon.skillNumber[0] += 1;
        const runSkill = (skillType, multiple) => {
            switch (skillType) {
                case 0:
                    if (cannon.giveSkillTeacher[0] < 5) {
                        cannon.range += cannon.range * 0.03 * multiple;
                        cannon.giveSkillTeacher[0] += 1;
                    }
                    break;
                case 1:
                    if (cannon.giveSkillTeacher[1] < 5) {
                        cannon.attack += cannon.attack * 0.03 * multiple;
                        cannon.giveSkillTeacher[1] += 1;
                    }
                    break;
                case 2:
                    if (cannon.giveSkillTeacher[2] < 5) {
                        cannon.speed += cannon.speed * 0.03 * multiple;
                        cannon.giveSkillTeacher[2] += 1;
                    }
                    break;
                case 3:
                    if (cannon.giveSkillTeacher[3] < 5) {
                        cannon.maxhp += cannon.maxhp * 0.03;
                        cannon.hp += cannon.hp * 0.02 * multiple;
                        cannon.giveSkillTeacher[3] += 1;
                    }
                    break;
                case 4:
                    if (cannon.skillNumber[0] >= 7 && cannon.skillNumber[1] === 0) {
                        cannon.attack += cannon.attack * 0.15 * multiple;
                        cannon.skillNumber[1] += 1;
                    }
                    break;
            }
        };
        const isSameSkill = skill0 === skill1 && skill0 !== undefined;
        if (isSameSkill) {
            runSkill(skill0, 2);
        }
        else {
            if (skill0 !== undefined)
                runSkill(skill0, 1);
            if (skill1 !== undefined)
                runSkill(skill1, 1);
        }
        return cannon;
    }
    static cannonGiveAthletes(cannon) {
        const skillConfig = {
            0: 'goldElement',
            1: 'woodElement',
            2: 'waterElement',
            3: 'fireElement',
            4: 'soilElement'
        };
        const applySkill = (skillType) => {
            const elementKey = skillConfig[skillType];
            if (elementKey) {
                cannon[elementKey] += 15;
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        if (skill0 === skill1) {
            applySkill(skill0);
        }
        else {
            applySkill(skill0);
            applySkill(skill1);
        }
        return cannon;
    }
    static cannonGiveDriver(cannon, monster) {
        const skillConfig = {
            0: {
                minTripRatio: 0.1,
                flagIndex: 0,
                reduceProp: 'attack',
                cannonProp: 'attack',
                ratio: 0.2
            },
            1: {
                minTripRatio: 0.2,
                flagIndex: 1,
                reduceProp: 'maxhp',
                cannonProp: 'maxhp',
                ratio: 0.2
            },
            2: {
                minTripRatio: 0.3,
                flagIndex: 2,
                reduceProp: 'defense',
                cannonProp: 'range',
                ratio: 0.1
            },
            3: {
                minTripRatio: 0.4,
                flagIndex: 3,
                reduceProp: 'speed',
                cannonProp: 'speed',
                ratio: 0.1
            },
            4: {
                minTripRatio: 0.8,
                flagIndex: 4,
                reduceProp: 'defense',
                cannonProp: 'range',
                ratio: 0.2
            }
        };
        const monsterTripRatio = monster.trip / monster.globalLength;
        const applySkill = (skillType, multiple) => {
            const config = skillConfig[skillType];
            if (!config)
                return;
            const isTriggerable = (monsterTripRatio >= config.minTripRatio &&
                monster.giveSkillDriver[config.flagIndex] === 0);
            if (isTriggerable) {
                monster.giveSkillDriver[config.flagIndex] += 1;
                monster[config.reduceProp] -= cannon[config.cannonProp] * config.ratio * multiple;
            }
        };
        const skill0 = cannon.skill[0];
        const skill1 = cannon.skill[1];
        const isSameSkill = skill0 === skill1;
        if (isSameSkill) {
            applySkill(skill0, 2);
        }
        else {
            applySkill(skill0, 1);
            applySkill(skill1, 1);
        }
        return monster;
    }
}
exports.utlisBattle = utlisBattle;
