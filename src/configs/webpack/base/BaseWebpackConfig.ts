import { resolve } from 'path';
import WebpackConfigurator from '../WebpackConfigurator';

import { ASSETS, DIST, NODE_MODULES, NODE_MODULES_REG_EXP, SOURCE } from '../../../constants/paths';
import { WEBPACK_ALIASES, WEBPACK_FILE_ALLOWED_EXTENSIONS, WEBPACK_UTILITIES } from '../constants';
const { BABEL, CSS, FONTS, SASS, TS, GRAPHQL, MODULES } = WEBPACK_UTILITIES.type;

class BaseWebpackConfig extends WebpackConfigurator {
  public defaultConfiguration: Record<string, unknown>[] = [];
  protected srcPath: string = resolve(NODE_MODULES, DIST, ASSETS);
  protected assetsPath: string = resolve(DIST, ASSETS);
  protected nodeModulesAssetsPath: string = resolve(SOURCE);

  constructor() {
    super();
  }

  public createBaseWebpackConfiguration = (): Record<string, unknown>[] => {
    const baseConfiguration: Record<string, unknown>[] = [
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

    return baseConfiguration;
  };
}

export default BaseWebpackConfig;
