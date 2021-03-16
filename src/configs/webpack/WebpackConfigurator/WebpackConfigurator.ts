import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import {
  HtmlOutputTemplate,
  HtmlPluginOptions,
  IWebpackConfigurator,
  WebpackAppEntrypoint,
  WebpackBundlerMinimizer,
  WebpackExtensionFiles,
  WebpackExtractMiniCssPlugin,
  WebpackExtractStyling,
  WebpackHotReplacementPlugin,
  WebpackLibEntrypoint,
  WebpackLibOutput,
  WebpackLoaderParams,
  WebpackLoadersParams,
  WebpackMode,
  WebpackModuleAliases,
  WebpackModuleLoaderRules,
  WebpackModuleRule,
  WebpackNormalReplacementPlugin,
  WebpackOutput,
  WebpackOutputInitialProps,
  WebpackSourcemapMode,
} from './IWebpackConfigurator';

import { DEV, DEVELOPMENT, PRO, PRO_DEV, PRODUCTION } from 'constants/envs';
import { getFolderInCliPath, getWebpackPathFile } from 'utils/paths';

import { WEBPACK_ENTRYPOINT_MODULES, WEBPACK_UTILITIES } from 'configs/webpack/constants';

import {
  WEBPACK_LOADERS,
  WEBPACK_LOADERS_REGEXP,
  WEBPACK_LOADERS_RULES,
} from '../constants/loaders';

const { EXTRACT_CSS, EXTRACT_SCSS, JPG_OR_PNG, SVG, URL } = WEBPACK_UTILITIES.type;
import { NODE_MODULES, SOURCE } from '../../../constants/paths';

export default class WebpackConfigurator implements IWebpackConfigurator {
  protected publicPath = '/';
  protected buildVariables: string = getFolderInCliPath('constants/buildVariables');

  public setMode = (mode: string = DEVELOPMENT): WebpackMode => ({ mode });

  public setNormalReplacementPlugin = (): WebpackNormalReplacementPlugin => {
    return {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/(.*)/, resource => {
          if (/app\/src/.test(resource.context) && /src/.test(resource.request)) {
            const splittedResource = resource.userRequest.split('.');
            const extension = splittedResource.slice(-1)[0];
            const path = splittedResource.slice(0, splittedResource.length - 1).join('.');
            try {
              const filePath = `${path}.${extension}`;
              fs.statSync(filePath);
              resource.resource = resource.resource.replace(resource.userRequest, filePath);
            } catch (error) {
              if (!error.message.includes('ENOENT')) {
                throw new Error(error);
              }
            }
          }
        }),
      ],
    };
  };

  public setBundleMinimizer = (): WebpackBundlerMinimizer => ({
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  });

  public setAppEntrypoint = (app: string): WebpackAppEntrypoint => ({
    entry: [...WEBPACK_ENTRYPOINT_MODULES, app],
  });

  public setAppMultiEntrypoint = (app: string, dev: string): { entry: Record<string, unknown> } => {
    const variants = [
      {
        file: app,
        name: 'main',
      },
      {
        file: dev,
        name: DEV,
      },
    ];

    return {
      entry: variants.reduce(
        (lv, { name, file }) => ({
          ...lv,
          [name]: [...WEBPACK_ENTRYPOINT_MODULES, file],
        }),
        {}
      ),
    };
  };

  public setSourcemapMode = (mode = DEVELOPMENT): WebpackSourcemapMode => ({
    devtool: mode === PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
  });

  public setOutputInitialProps = (pathPrefix: string): WebpackOutputInitialProps => {
    return {
      chunkFilename: pathPrefix + '/static/js/[name].[hash].chunk.js',
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: (info: { absoluteResourcePath: string }) =>
        resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      filename: pathPrefix + '/static/js/[name].[hash].js',
      pathinfo: true,
      publicPath: this.publicPath,
    };
  };

  public setOutput = (mode: string, pathPrefix: string): WebpackOutput => {
    return {
      output: this.setOutputInitialProps(pathPrefix),
      plugins: [this.getOuputHtmlPlugin(mode)],
    };
  };

  public createOutputHtmlOptions = (mode: string, pathPrefix?: string): HtmlPluginOptions => {
    const OUTPUT_HTML_PLUGINS = {
      [DEV]: { favicon: getWebpackPathFile('favicon.ico') },
      [PRO]: {},
      [PRO_DEV]: {
        filename: pathPrefix + '/index.html',
      },
    };

    return { ...OUTPUT_HTML_PLUGINS[mode], inject: true };
  };

  public getOuputHtmlPlugin = (mode: string, pathPrefix?: string): HtmlWebpackPlugin => {
    const options = this.createOutputHtmlOptions(mode, pathPrefix);
    const template = this.setOutputTemplateHtml();

    return new HtmlWebpackPlugin({
      ...options,
      ...template,
    });
  };

  public setOutputTemplateHtml = (mode: string = DEV): HtmlOutputTemplate => {
    if (mode === DEV) return { template: getWebpackPathFile('index-dev.html') };

    return {
      template: getWebpackPathFile('index.html'),
      templateParameters: {
        configPath: null,
      },
    };
  };

  public setLibEntrypoint = (path: RegExp): WebpackLibEntrypoint => ({
    entry: path,
  });

  public setLibOutput = (path: RegExp, filename: string): WebpackLibOutput => {
    return {
      output: {
        filename,
        libraryTarget: 'umd',
        path,
        umdNamedDefine: true,
      },
    };
  };

  public addModuleRulesIntoLoader = (
    rules: Record<string, unknown>[]
  ): WebpackModuleLoaderRules => ({
    module: {
      rules,
    },
  });

  public createRuleObjectForModule = (
    include: string[],
    exclude: RegExp,
    rest: Record<string, unknown>
  ): WebpackModuleRule => {
    return {
      exclude,
      include,
      ...rest,
    };
  };

  public addMiniCssExtractPluginToModule = (): WebpackExtractMiniCssPlugin => {
    return {
      plugins: [
        new MiniCssExtractPlugin({
          //   allChunks: true,
          filename: '[name].[hash].css',
        }),
      ],
    };
  };

  public loadWebpackLoaders = (loadersParams: WebpackLoadersParams): WebpackModuleLoaderRules => {
    const { excludeFiles, includeFiles, loaders } = loadersParams;
    const loadedLoaders = loaders.map((loader: string) =>
      this.createRuleObjectForModule(includeFiles, excludeFiles, WEBPACK_LOADERS_RULES[loader])
    );

    return this.addModuleRulesIntoLoader(loadedLoaders);
  };

  public loadWebpackLoader = (loaderParams: WebpackLoaderParams): WebpackModuleLoaderRules => {
    const { excludeFiles, includeFiles, loader } = loaderParams;
    const loaderRulesObject = this.createRuleObjectForModule(
      includeFiles,
      excludeFiles,
      WEBPACK_LOADERS_RULES[loader]
    );
    return this.addModuleRulesIntoLoader([loaderRulesObject]);
  };

  public extractCssOrScss = (loaderParams: WebpackLoaderParams): WebpackExtractStyling => {
    const { excludeFiles, includeFiles, loader = EXTRACT_CSS || EXTRACT_SCSS } = loaderParams;
    return {
      ...this.loadWebpackLoader({
        excludeFiles,
        includeFiles,
        loader,
      }),
      ...this.addMiniCssExtractPluginToModule(),
    };
  };

  public loadImagesLoader = (
    include: string[],
    options: Record<string, unknown>,
    exclude = /./
  ): WebpackModuleLoaderRules => {
    const jpgOrPngRulesObject = this.createRuleObjectForModule(include, exclude, {
      test: WEBPACK_LOADERS_REGEXP[JPG_OR_PNG],
      use: [
        {
          loader: WEBPACK_LOADERS[URL],
          options,
        },
      ],
    });

    const svgRules = WEBPACK_LOADERS_RULES[SVG];
    const svgRulesObject = this.createRuleObjectForModule(include, exclude, svgRules);
    return this.addModuleRulesIntoLoader([jpgOrPngRulesObject, svgRulesObject]);
  };

  public setHotReloadReplacement = (): WebpackHotReplacementPlugin => ({
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });

  public setExtensionFiles = (extensions: string[]): WebpackExtensionFiles => ({
    resolve: {
      extensions,
    },
  });

  public setModulesAlises = (alias: Record<string, unknown>): WebpackModuleAliases => ({
    resolve: {
      alias,
      modules: [resolve(__dirname, '..', '..', NODE_MODULES), NODE_MODULES, SOURCE],
    },
  });

  public createPlugin = (plugins: []): { plugins: [] } => {
    return {
      plugins,
    };
  };
}
