import { TYPES } from 'constants/types';
import { resolve } from 'path';
import WebpackConfigurator from '../WebpackConfigurator';

export default class BaseWebpackConfig {
  private defaultConfiguration: any[];
  constructor(private webpackConfigurator: WebpackConfigurator) {
    this.webpackConfigurator = webpackConfigurator;
    this.defaultConfiguration = [
      ...webpackConfigurator.loadJSX({
        exclude: /node_modules/,
        include: 'src',
      }),
    ];
  }
}
