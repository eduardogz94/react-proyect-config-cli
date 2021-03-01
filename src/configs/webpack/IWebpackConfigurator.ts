import HtmlWebpackPlugin = require('html-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import { HotModuleReplacementPlugin, NormalModuleReplacementPlugin } from 'webpack';

export type HtmlPluginOptions = {
  favIcon?: string;
  filename?: string;
  inject: boolean;
};

export type HtmlOutputTemplate = {
  template: string;
  templateParameters?: {
    configPath: null;
  };
};

export type WebpackLoadersParams = {
  includeFiles: string[];
  excludeFiles: RegExp;
  loaders: string[];
};

export type WebpackLoaderParams = {
  includeFiles: string[];
  excludeFiles: RegExp;
  loader: string;
};

export type WebpackNormalReplacementPlugin = {
  plugins: NormalModuleReplacementPlugin[];
};

export type WebpackHotReplacementPlugin = { plugins: HotModuleReplacementPlugin[] };

export type WebpackMode = {
  mode: string;
};

export type WebpackBundlerMinimizer = {
  optimization: {
    minimizer: UglifyJsPlugin[];
  };
};

export type WebpackAppEntrypoint = {
  entry: string[];
};

export type WebpackSourcemapMode = {
  devtool: string;
};

export type WebpackOutputInitialProps = {
  chunkFilename: string;
  filename: string;
  pathinfo: boolean;
  publicPath: string;
  // eslint-disable-next-line no-unused-vars
  devtoolModuleFilenameTemplate(info: { absoluteResourcePath: string }): string;
};

export type WebpackOutput = { output: WebpackOutputInitialProps; plugins: HtmlWebpackPlugin[] };

export type WebpackLibEntrypoint = {
  entry: RegExp;
};

export type WebpackLibOutput = {
  output: {
    filename: string;
    libraryTarget: string;
    path: RegExp;
    umdNamedDefine: boolean;
  };
};

export type WebpackModuleLoaderRules = {
  module: {
    rules: Record<string, unknown>[];
  };
};

export type WebpackModuleRule = { exclude: RegExp; include: string[]; rest?: Record<string, unknown> };

export type WebpackExtractMiniCssPlugin = {
  plugins: MiniCssExtractPlugin[];
};

export type WebpackExtractStyling = {
  plugins: MiniCssExtractPlugin[];
  module: {
    rules: Record<string, unknown>[];
  };
};

export type WebpackExtensionFiles = {
  resolve: {
    extensions: string[];
  };
};

export type WebpackModuleAliases = {
  resolve: {
    alias: Record<string, unknown>;
    modules: string[];
  };
};

export type WebpackPlugins = {
  plugins: []
}

export type WebpackDefaultConfiguration = Array<
  WebpackMode | WebpackAppEntrypoint | WebpackSourcemapMode | WebpackModuleLoaderRules
>;

export interface IWebpackConfigurator {
  // eslint-disable-next-line no-unused-vars
  setMode(mode?: string): WebpackMode;
  setNormalReplacementPlugin(): WebpackNormalReplacementPlugin;
  setHotReloadReplacement(): WebpackHotReplacementPlugin;
  setBundleMinimizer(): WebpackBundlerMinimizer;
  // eslint-disable-next-line no-unused-vars
  setAppEntrypoint(app: string): WebpackAppEntrypoint;
  // eslint-disable-next-line no-unused-vars
  setSourcemapMode(mode?: string): WebpackSourcemapMode;
  // eslint-disable-next-line no-unused-vars
  setOutputInitialProps(pathPrefix: string): WebpackOutputInitialProps;
  // eslint-disable-next-line no-unused-vars
  setOutput(mode: string, pathPrefix: string): WebpackOutput;
  // eslint-disable-next-line no-unused-vars
  createOutputHtmlOptions(mode: string, pathPrefix?: string): HtmlPluginOptions;
  // eslint-disable-next-line no-unused-vars
  getOuputHtmlPlugin(mode: string, pathPrefix?: string): HtmlWebpackPlugin;
  // eslint-disable-next-line no-unused-vars
  setOutputTemplateHtml(mode?: string): HtmlOutputTemplate;
  // eslint-disable-next-line no-unused-vars
  setLibEntrypoint(path: RegExp): WebpackLibEntrypoint;
  // eslint-disable-next-line no-unused-vars
  setLibOutput(path: RegExp, filename: string): WebpackLibOutput;
  // eslint-disable-next-line no-unused-vars
  addModuleRulesIntoLoader(rules?: Record<string, unknown>[]): WebpackModuleLoaderRules;
  // eslint-disable-next-line no-unused-vars
  createRuleObjectForModule(include: string[], exclude: RegExp, rest: Record<string, unknown>): WebpackModuleRule;
  addMiniCssExtractPluginToModule(): WebpackExtractMiniCssPlugin;
  // eslint-disable-next-line no-unused-vars
  loadWebpackLoaders(loaders: WebpackLoadersParams): WebpackModuleLoaderRules;
  // eslint-disable-next-line no-unused-vars
  loadWebpackLoader(loader: WebpackLoaderParams): WebpackModuleLoaderRules;
  // eslint-disable-next-line no-unused-vars
  extractCssOrScss(loader: WebpackLoaderParams): WebpackExtractStyling;
  // eslint-disable-next-line no-unused-vars
  setExtensionFiles(extension: string[]): WebpackExtensionFiles;
  // eslint-disable-next-line no-unused-vars
  setModulesAlises(alias: Record<string, unknown>): WebpackModuleAliases;
  // eslint-disable-next-line no-unused-vars
  createPlugin(plugins: []): WebpackPlugins;
}
