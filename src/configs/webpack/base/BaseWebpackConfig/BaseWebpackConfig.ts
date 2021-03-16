import { resolve } from 'path';
import WebpackConfigurator from 'configs/webpack/WebpackConfigurator/WebpackConfigurator';
import { DEVELOPMENT, PRODUCTION, PRO_DEV, DEV, PRO } from 'constants/envs';
import { ASSETS, DIST, NODE_MODULES, NODE_MODULES_REG_EXP, SOURCE } from 'constants/paths';
import {
  WEBPACK_ALIASES,
  WEBPACK_FILE_ALLOWED_EXTENSIONS,
  WEBPACK_UTILITIES,
} from 'configs/webpack/constants';

const { BABEL, FONTS, TS, CSS, SASS } = WEBPACK_UTILITIES.type;

class BaseWebpackConfig extends WebpackConfigurator {
  // TODO Crear typings correctos y mejorar los Records
  public defaultConfiguration: Record<string, unknown>[] = [];
  public srcPath: string = resolve(NODE_MODULES, DIST, ASSETS);
  protected assetsPath: string = resolve(DIST, ASSETS);
  protected nodeModulesAssetsPath: string = resolve(SOURCE);

  constructor() {
    super();
  }

  // TODO Crear typings correctos y mejorar los Records
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
        loader: TS,
      }),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: FONTS,
      }),
      // this.loadWebpackLoaders({
      //   excludeFiles: NODE_MODULES_REG_EXP,
      //   includeFiles: [this.srcPath],
      //   loaders: [GRAPHQL, MODULES],
      // }),
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

  // TODO Crear typings correctos y mejorar los Records
  public createSecondaryWebpackConfigurationFor = (config: {
    mode: string;
    entrypoint: string;
  }): Record<string, unknown>[] => {
    return [
      this.setMode(config.mode),
      this.setAppEntrypoint(resolve(SOURCE, config.entrypoint)),
      this.setSourcemapMode(config.mode),
      this.loadWebpackLoader({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: CSS,
      }),
      this.extractCssOrScss({
        excludeFiles: NODE_MODULES_REG_EXP,
        includeFiles: [this.srcPath],
        loader: SASS,
      }),
    ];
  };

  // TODO: Crear Symbolos para los entrypoints
  public createWebpackConfigurationFor = (config: string): Record<string, unknown>[] => {
    const WEBPACK_CONFIGURATIONS = {
      [DEVELOPMENT]: [
        ...this.createBaseWebpackConfiguration(),
        ...this.createSecondaryWebpackConfigurationFor({
          mode: DEVELOPMENT,
          entrypoint: 'index-development.jsx',
        }),
      ],
      [PRODUCTION]: [
        ...this.createBaseWebpackConfiguration(),
        ...this.createSecondaryWebpackConfigurationFor({
          mode: PRODUCTION,
          entrypoint: 'index.jsx',
        }),
      ],
      [PRO_DEV]: [
        ...this.createBaseWebpackConfiguration(),
        ...this.createSecondaryWebpackConfigurationFor({
          mode: PRODUCTION,
          entrypoint: 'index.jsx',
        }),
      ],
    };

    return WEBPACK_CONFIGURATIONS[config];
  };

  public useWebpackConfigurationFor = (config: string): void => {
    const WEBPACK_CONFIGURATIONS = {
      [DEV]: () => [
        ...this.createWebpackConfigurationFor(DEVELOPMENT),
        this.setOutput(DEVELOPMENT, ''),
      ],
      [PRO]: () => [
        ...this.createWebpackConfigurationFor(PRODUCTION),
        this.setOutput(PRODUCTION, ''),
      ],
      [PRO_DEV]: () => [
        ...this.createWebpackConfigurationFor(PRODUCTION),
        this.setOutput(PRO_DEV, ''),
      ],
    } as const;

    this.defaultConfiguration = [...WEBPACK_CONFIGURATIONS[config]()];
  };
}

export default BaseWebpackConfig;
