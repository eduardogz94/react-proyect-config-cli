#!/usr/bin/env node
import commander from "commander";
import "reflect-metadata";
import ReactConfigCommandLine from "./cli";

const reactCli = new ReactConfigCommandLine(commander);

reactCli.addInitialCliConfig({
  description: "",
  name: "react-proyect-config",
  version: "0.0.1",
});

reactCli.startCli(process.argv);
