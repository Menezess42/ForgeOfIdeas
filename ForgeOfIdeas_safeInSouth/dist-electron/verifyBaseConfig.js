"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBaseConfig = verifyBaseConfig;
const fs_1 = __importDefault(require("fs"));
const pathResolver_js_1 = require("./pathResolver.js");
const path_1 = __importDefault(require("path"));
function verifyBaseConfig() {
    const baseDir = (0, pathResolver_js_1.baseDirPath)(); // pega o caminho certo (dev/build)
    // Se não existir, cria
    if (!fs_1.default.existsSync(baseDir)) {
        fs_1.default.mkdirSync(baseDir, { recursive: true });
    }
    const baseFiles = ['shelf.json', 'anvil.json'];
    for (const baseFile of baseFiles) {
        const filePath = path_1.default.join(baseDir, baseFile);
        if (!fs_1.default.existsSync(filePath)) {
            fs_1.default.writeFileSync(filePath, '');
        }
    }
}
