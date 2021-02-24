import HtmlWebpackPlugin = require('html-webpack-plugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import { HotModuleReplacementPlugin, NormalModuleReplacementPlugin } from 'webpack';

export interface IWebpackConfigurator {
  setMode(mode?: string): WebpackMode;
  setNormalReplacementPlugin(): WebpackNormalReplacementPlugin;
  setHotReloadReplacement(): WebpackHotReplacementPlugin;
  setBundleMinimizer(): WebpackBundlerMinimizer;
  setAppEntrypoint(app: string): WebpackAppEntrypoint;
  setSourcemapMode(mode?: string): WebpackSourcemapMode;
  setOutputInitialProps(pathPrefix: string): WebpackOutputInitialProps;
  setOutput(mode: string, pathPrefix: string): WebpackOutput;
  createOutputHtmlOptions(mode: string, pathPrefix?: string): HtmlPluginOptions;
  getOuputHtmlPlugin(mode: string, pathPrefix?: string): HtmlWebpackPlugin;
  setOutputTemplateHtml(mode?: string): HtmlOutputTemplate;
  setLibEntrypoint(path: RegExp): WebpackLibEntrypoint;
  setLibOutput(path: RegExp, filename: string): WebpackLibOutput;
  addModuleRulesIntoLoader(rules?: object[]): WebpackModuleLoaderRules;
  createRuleObjectForModule(include: string[], exclude: RegExp, rest: object): WebpackModuleRule;
  addMiniCssExtractPluginToModule(): WebpackExtractMiniCssPlugin;
  loadWebpackLoaders(loaders: WebpackLoaders): WebpackModuleLoaderRules;
  loadWebpackLoader(loader: WebpackLoader): WebpackModuleLoaderRules;
  extractCssOrScss(loader: WebpackLoader): WebpackExtractStyling;
  setExtensionFiles(extension: string[]): WebpackExtensionFiles;
  setModulesAlises(alias: object): WebpackModuleAliases;
  createPlugin(plugins: any): { plugins: any };
}

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

export type WebpackLoaders = {
  includeFiles: string[];
  excludeFiles: RegExp;
  loaders: string[];
};

export type WebpackLoader = {
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
  entry: any[];
};

export type WebpackSourcemapMode = {
  devtool: string;
};

export type WebpackOutputInitialProps = {
  chunkFilename: string;
  filename: string;
  pathinfo: boolean;
  publicPath: string;
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
    rules: object[];
  };
};

export type WebpackModuleRule = { exclude: RegExp; include: string[]; rest?: object };

export type WebpackExtractMiniCssPlugin = {
  plugins: MiniCssExtractPlugin[];
};

export type WebpackExtractStyling = {
  plugins: MiniCssExtractPlugin[];
  module: {
    rules: object[];
  };
};

export type WebpackExtensionFiles = {
  resolve: {
    extensions: string[];
  };
};

export type WebpackModuleAliases = {
  resolve: {
    alias: object;
    modules: string[];
  };
};
