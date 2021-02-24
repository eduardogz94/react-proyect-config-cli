import { resolve } from 'path';
import WebpackConfigurator from '../WebpackConfigurator';

import { ASSETS, DIST, NODE_MODULES, NODE_MODULES_REG_EXP, SOURCE } from '../../../constants/paths';
import { WEBPACK_ALIASES, WEBPACK_FILE_ALLOWED_EXTENSIONS, WEBPACK_UTILITIES } from '../constants';

const { BABEL, CSS, FONTS, SASS, TS, GRAPHQL, MODULES } = WEBPACK_UTILITIES.type;

class BaseWebpackConfig extends WebpackConfigurator {
  public defaultConfiguration: any[];
  protected srcPath: string;
  protected assetsPath: string;
  protected nodeModulesAssetsPath: string;

  constructor() {
    super();
    this.nodeModulesAssetsPath = resolve(NODE_MODULES, DIST, ASSETS);
    this.assetsPath = resolve(DIST, ASSETS);
    this.srcPath = resolve(SOURCE);

    this.defaultConfiguration = [];
  }

  public addDefaultConfiguration = () => {
    this.defaultConfiguration = [
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: BABEL,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: CSS,
      }),
      // To use Sass we need to add the "sass-loader" and a configuration file
      // called "postcss.config.js" with the plugins we are going to use.
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: SASS,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: TS,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: FONTS,
      }),
      this.loadWebpackLoaders({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loaders: [GRAPHQL, MODULES],
      }),
      this.loadImagesLoader([this.srcPath, this.nodeModulesAssetsPath], {
        options: {
          limit: 190000,
          name: '[name].[ext]',
        },
      }),
      this.setNormalReplacementPlugin(),
      this.setHotReloadReplacement(),
      this.setExtensionFiles(WEBPACK_FILE_ALLOWED_EXTENSIONS),
      this.setModulesAlises(WEBPACK_ALIASES),
    ];
  };

  public addProductionConfiguration = () => {
    this.defaultConfiguration = [
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: BABEL,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: CSS,
      }),
      // To use Sass we need to add the "sass-loader" and a configuration file
      // called "postcss.config.js" with the plugins we are going to use.
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: SASS,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: TS,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: FONTS,
      }),
      this.loadWebpackLoaders({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loaders: [GRAPHQL, MODULES],
      }),
      this.loadImagesLoader([this.srcPath, this.nodeModulesAssetsPath], {
        options: {
          limit: 190000,
          name: '[name].[ext]',
        },
      }),
      this.setNormalReplacementPlugin(),
      this.setHotReloadReplacement(),
      this.setExtensionFiles(WEBPACK_FILE_ALLOWED_EXTENSIONS),
      this.setModulesAlises(WEBPACK_ALIASES),
    ];
  };
}

export default BaseWebpackConfig;
