#!/usr/bin/env node
import commander from 'commander';
import 'reflect-metadata';
import ReactConfigCommandLine from './cli';
import BaseWebpackProductionConfig from './configs/webpack/base/BaseWebpackProductionConfig';

const reactCli = new ReactConfigCommandLine(commander);

const initialConfig = {
  description: '',
  name: 'react-proyect-config',
  version: '0.0.1',
};

reactCli.addInitialCliConfig(initialConfig);

reactCli.startCli(process.argv);

// const webpackProductionConfigurator = new BaseWebpackProductionConfig();
// const {
//   createBaseWebpackConfiguration,
//   createBaseWebpackProductionConfiguration,
// } = webpackProductionConfigurator;

// console.log(webpackProductionConfigurator.defaultConfiguration)

// webpackProductionConfigurator.defaultConfiguration = [
//   ...createBaseWebpackConfiguration(),
//   ...createBaseWebpackProductionConfiguration(),
// ];

// console.log(webpackProductionConfigurator.defaultConfiguration)
