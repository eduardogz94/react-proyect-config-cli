#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typed_cli_1 = require("typed-cli");
const cli_1 = require("./cli");
const data = typed_cli_1.cli({
    description: "Calculate expressions",
    name: "calc",
    options: {
        operation: typed_cli_1.presets
            .oneOf(["+", "-", "*", "/"])
            .alias("o")
            .required()
            .description("opeartion to be applied"),
        round: typed_cli_1.option.boolean.alias("r").description("rounds the result"),
    },
    _: typed_cli_1.option.number.array(),
});
const operatorMap = {
    "+": (prev, cur) => prev + cur,
    "/": (prev, cur) => prev / cur,
    "-": (prev, cur) => prev - cur,
    "*": (prev, cur) => prev * cur,
};
// Type safe!
// n1: number
// n2: number
// (place a cursor on a variable to see its type)
const [n1, n2] = data._;
// Type safe!
// op: '+' | '-' | '*' | '/'
const op = data.options.operation;
console.log(`Calculating: ${n1} ${op} ${n2} = ${[n1, n2].reduce(operatorMap[op])}`);
console.log(cli_1.reactConfigCli);
cli_1.reactConfigCli(process.argv);
