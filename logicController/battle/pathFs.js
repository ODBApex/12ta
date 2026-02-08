"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathFs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class pathFs {
    static loadMapData() {
        try {
            const filePath = path_1.default.join(__dirname, 'mapData.json');
            const jsonContent = fs_1.default.readFileSync(filePath, 'utf-8');
            return JSON.parse(jsonContent);
        }
        catch (error) {
            console.error('Reading map data failed:', error);
            throw error;
        }
    }
}
exports.pathFs = pathFs;
