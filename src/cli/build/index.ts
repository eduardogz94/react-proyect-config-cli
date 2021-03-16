#!/usr/bin/env node
import commander, { Command } from 'commander';
import 'reflect-metadata';
import ReactConfigCommandLine from '../';
// import BaseWebpackConfig from './configs/webpack/base/BaseWebpackConfig';

const reactCli = new ReactConfigCommandLine(commander);

export const initBuildCommand = (): Command => {
  const params = {
    name: 'build',
    options: [
      { flag: '-e, --environment [environment]', description: 'api environment' },
      { flag: '-p, --path-prefix [pathPrefix]', description: 'generate folder path prefix' },
    ],
    description: 'Build project. Environment prod | dev',
    // eslint-disable-next-line no-console
    action: () => console.log("s"),
  };

  const buildTsCommand = reactCli.createNewCommandWith(params);

  return buildTsCommand;
};
