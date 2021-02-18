import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import {
  IHtmlOutputTemplate,
  IHtmlPluginOptions,
  IWebpackConfigurator,
} from './IWebpackConfigurator';

import { DEV, DEVELOPMENT, PRO, PRO_DEV, PRODUCTION } from 'constants/envs';
import { getFolderInCliPath, resolveWebpackPathFile } from 'utils/paths';

import {
  WEBPACK_ALIASES,
  WEBPACK_ENTRYPOINT_MODULES,
  WEBPACK_FILE_ALLOWED_EXTENSIONS,
  WEBPACK_LOADERS,
  WEBPACK_LOADERS_REGEXP,
  WEBPACK_LOADERS_RULES,
  WEBPACK_LOADERS_UTILITIES,
} from './webpack.constants';

const {
  BABEL,
  CSS,
  EXTRACT_CSS,
  EXTRACT_SCSS,
  FONTS,
  GRAPHQL,
  JPG_OR_PNG,
  MODULES,
  SASS,
  SVG,
  TS,
  URL,
} = WEBPACK_LOADERS_UTILITIES;

export default class WebpackConfigurator implements IWebpackConfigurator {
  public publicPath: string;
  public buildVariables = getFolderInCliPath('constants/buildVariables');

  constructor() {
    this.publicPath = '/';
  }

  public setMode = (mode = DEVELOPMENT) => ({ mode });

  public setNormalReplacementPlugin = (appTarget: any) => {
    return {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/(.*)/, resource => {
          if (/app\/src/.test(resource.context) && /src/.test(resource.request)) {
            const splittedResource = resource.userRequest.split('.');
            const extension = splittedResource.slice(-1)[0];
            const path = splittedResource.slice(0, splittedResource.length - 1).join('.');
            try {
              const filePath = `${path}.${appTarget}.${extension}`;
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

  public setBundleMinimizer = () => ({
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

  public setAppEntrypoint = (app: any) => ({
    entry: [...WEBPACK_ENTRYPOINT_MODULES, app],
  });

  public setAppMultiEntrypoint = (app: any, dev: any) => {
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

  public setSourcemapMode = (mode = DEVELOPMENT) => ({
    devtool: mode === PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
  });

  public setOutputInitialProps = (pathPrefix: string) => {
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

  public setOutput = (mode: string, pathPrefix: string) => {
    return {
      output: this.setOutputInitialProps(pathPrefix),
      plugins: [this.getOuputHtmlPlugin(mode)],
    };
  };

  public createOutputHtmlOptions = (mode: string, pathPrefix?: string): IHtmlPluginOptions => {
    const OUTPUT_HTML_PLUGINS = {
      [DEV]: { favicon: resolveWebpackPathFile('favicon.ico') },
      [PRO]: {},
      [PRO_DEV]: {
        filename: pathPrefix + '/index.html',
      },
    };

    return { ...OUTPUT_HTML_PLUGINS[mode], inject: true };
  };

  public getOuputHtmlPlugin = (mode: string, pathPrefix?: string): HtmlWebpackPlugin => {
    const options = this.createOutputHtmlOptions(mode, pathPrefix);
    return new HtmlWebpackPlugin({
      ...options,
      ...this.setOutputTemplateHtml(),
    });
  };

  public setOutputTemplateHtml = (mode: string = DEV): IHtmlOutputTemplate => {
    if (mode === DEV) return { template: resolveWebpackPathFile('index-dev.html') };

    return {
      template: resolveWebpackPathFile('index.html'),
      templateParameters: {
        configPath: null,
      },
    };
  };

  public setLibEntry = (path: any) => ({
    entry: path,
  });

  public setLibOutput = (path: any, filename: any) => {
    return {
      output: {
        filename,
        libraryTarget: 'umd',
        path,
        umdNamedDefine: true,
      },
    };
  };

  public addModuleRulesIntoLoader = (rules: object[]) => {
    return {
      module: {
        rules,
      },
    };
  };

  public createRuleObjectForModule = (include: any, exclude: any, rest: any) => {
    return {
      exclude,
      include,
      ...rest,
    };
  };

  public addMiniCssExtractPluginToModule = () => {
    return {
      plugins: [
        new MiniCssExtractPlugin({
          //   allChunks: true,
          filename: '[name].[hash].css',
        }),
      ],
    };
  };

  public loadJSX = ({ include, exclude }: any) => {
    const JSXRules = WEBPACK_LOADERS_RULES[BABEL];
    const JSXRulesObject = this.createRuleObjectForModule(include, exclude, JSXRules);
    return this.addModuleRulesIntoLoader([JSXRulesObject]);
  };

  public loadTSX = ({ include, exclude }: any) => {
    const TSXRules = WEBPACK_LOADERS_RULES[TS];
    const TSXRulesObject = this.createRuleObjectForModule(include, exclude, TSXRules);
    return this.addModuleRulesIntoLoader([TSXRulesObject]);
  };

  // To use Sass we need to add the "sass-loader" and a configuration file
  // called "postcss.config.js" with the plugins we are going to use.
  public loadCSS = ({ include, exclude }: any) => {
    const CSSRules = WEBPACK_LOADERS_RULES[CSS];
    const CSSRulesObject = this.createRuleObjectForModule(include, exclude, CSSRules);
    return this.addModuleRulesIntoLoader([CSSRulesObject]);
  };

  public loadSCSS = ({ include, exclude }: any) => {
    const SASSRules = WEBPACK_LOADERS_RULES[SASS];
    const SASSRulesObject = this.createRuleObjectForModule(include, exclude, SASSRules);
    return this.addModuleRulesIntoLoader([SASSRulesObject]);
  };

  public extractCSS = ({ include, exclude }: any) => {
    const extractCSSRules = WEBPACK_LOADERS_RULES[EXTRACT_CSS];
    const extractCSSRulesObject = this.createRuleObjectForModule(include, exclude, extractCSSRules);
    return {
      ...this.addModuleRulesIntoLoader([extractCSSRulesObject]),
      ...this.addMiniCssExtractPluginToModule(),
    };
  };

  public extractSCSS = ({ include, exclude }: any) => {
    const extractSCSSRules = WEBPACK_LOADERS_RULES[EXTRACT_SCSS];
    const extractSCSSRulesObject = this.createRuleObjectForModule(
      include,
      exclude,
      extractSCSSRules
    );
    return {
      ...this.addModuleRulesIntoLoader([extractSCSSRulesObject]),
      ...this.addMiniCssExtractPluginToModule(),
    };
  };

  public loadGraphQL = ({ include, exclude }: any) => {
    const GRAPHQLRules = WEBPACK_LOADERS_RULES[GRAPHQL];
    const modulesRules = WEBPACK_LOADERS_RULES[MODULES];
    const GRAPHQLRulesObject = this.createRuleObjectForModule(include, exclude, GRAPHQLRules);
    const modulesRulesObject = this.createRuleObjectForModule(include, exclude, modulesRules);
    return this.addModuleRulesIntoLoader([GRAPHQLRulesObject, modulesRulesObject]);
  };

  public loadImages = ({ include, exclude, options }: any) => {
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

  public loadFonts = ({ include, exclude }: any) => {
    const fontsRules = WEBPACK_LOADERS_RULES[FONTS];
    const fontsRulesObject = this.createRuleObjectForModule(include, exclude, fontsRules);
    return this.addModuleRulesIntoLoader([fontsRulesObject]);
  };

  public setHotReloadReplacement = () => ({
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });

  public setExtensionFiles = () => ({
    resolve: {
      extensions: WEBPACK_FILE_ALLOWED_EXTENSIONS,
    },
  });

  public setModulesAlises = () => ({
    resolve: {
      alias: WEBPACK_ALIASES,
      modules: [resolve(__dirname, '..', '..', 'node_modules'), 'node_modules', 'src'],
    },
  });

  public createPlugin = (plugins: any) => {
    return {
      plugins: [...plugins],
    };
  };

  //   public createCopyWebpackPlugin = (from: any, to: any) => {
  //     return new CopyWebpackPlugin([{ from, to }]);
  //   };

  //   public getAssets = () => ({
  //     plugins: [
  //       new CopyWebpackPlugin([
  //         {
  //           from: resolve('node_modules', 'dist', 'assets'),
  //           to: resolve('dist', 'assets'),
  //         },
  //       ]),
  //     ],
  //   });

  //   public getTypes = () => ({
  //     plugins: [
  //       new CopyWebpackPlugin([
  //         {
  //           from: resolve('src', 'index.d.ts'),
  //           to: resolve('dist', 'index.d.ts'),
  //         },
  //       ]),
  //     ],
  //   });

  //   public cleanDist = () => ({
  //     plugins: [
  //       new CleanWebpackPlugin({
  //         cleanBeforeEveryBuildPatterns: [resolve('dist')],
  //         root: process.cwd(),
  //       }),
  //     ],
  //   });

  //   public addBuildEnvironmentVariables = (config: any) => {
  //     const buildVariablesObject = this.buildVariables.reduce(
  //       (lv: any, cv: { key: any; getWebpackValue: (arg0: any) => any }) => ({
  //         ...lv,
  //         [cv.key]: JSON.stringify(cv.getWebpackValue(config)),
  //       }),
  //       {}
  //     );
  //     return {
  //       plugins: [new webpack.DefinePlugin(buildVariablesObject)],
  //     };
  //   };
}
