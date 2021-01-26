#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const cli_1 = require("./cli");
console.log(cli_1.reactConfigCli);
cli_1.reactConfigCli(process.argv);
