"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactConfigCli = exports.getCommands = void 0;
const commander_1 = __importDefault(require("commander"));
const getCommands = () => {
    return commander_1.default.commands;
};
exports.getCommands = getCommands;
const reactConfigCli = (args) => {
    if (!args.slice(2).length || !/[a-z]/.test(args.slice(2)[0])) {
        commander_1.default.outputHelp();
        return 0;
    }
    else {
        commander_1.default.parse(args);
    }
};
exports.reactConfigCli = reactConfigCli;
commander_1.default
    .name("react-proyect-config-cli")
    .version("0.0.1")
    .description("")
    .option("-p, --pepper");
