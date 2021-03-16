#!/usr/bin/env node
import commander from 'commander';
import 'reflect-metadata';
import ReactConfigCommandLine from 'cli';
import { initBuildCommand } from 'cli/build';
// import BaseWebpackConfig from './configs/webpack/base/BaseWebpackConfig';

const reactCli = new ReactConfigCommandLine(commander);

const initialInfo = {
  description: '',
  name: 'react-proyect-config',
  version: '0.0.1',
};

reactCli.addInitialCliConfig(initialInfo);

reactCli.addCommand(initBuildCommand());
reactCli.startCli(process.argv);
// const baseWebpackConfigurator = new BaseWebpackConfig();
// const { useDevWebpackConfiguration, useProdWebpackConfiguration } = baseWebpackConfigurator;

// useProdWebpackConfiguration();

// // eslint-disable-next-line no-console
// console.log(baseWebpackConfigurator.defaultConfiguration);
