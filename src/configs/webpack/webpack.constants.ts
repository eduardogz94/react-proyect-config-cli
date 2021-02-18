import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getFolderInCliPath } from 'utils/paths';

const BABEL: string = 'babel';
const CSS: string = 'css';
const FILE: string = 'file';
const GRAPHQL: string = 'graphql';
const MINICSS: string = 'miniCss';
const SASS: string = 'sass';
const STYLE: string = 'style';
const SVG: string = 'svg-inline';
const TS: string = 'ts';
const URL: string = 'url';
const FONTS: string = 'fonts';
const MODULES: string = 'modules';
const JPG_OR_PNG: string = 'jpgOrPng';
const EXTRACT_CSS: string = 'extractCSS';
const EXTRACT_SCSS: string = 'extractSCSS';

const CSS_REGEX: RegExp = /\.css$/;
const SCSS_REGEX: RegExp = /\.scss$/;
const TS_OR_TSX_REGEX: RegExp = /\.(ts|tsx)?$/;
const JPG_OR_PNG_REGEX: RegExp = /\.(jpg|png)$/;
const SVG_REGEX: RegExp = /\.svg$/;
const GRAPHQL_REGEX: RegExp = /\.graphql$/;
const MODULES_REGEX: RegExp = /\.mjs$/;
const FONTS_REGEX: RegExp = /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/;
const JSX_REGEX: RegExp = /\.jsx?$/;

export const WEBPACK_LOADERS = {
  [BABEL]: 'babel-loader',
  [CSS]: 'css-loader',
  [FILE]: 'file-loader',
  [GRAPHQL]: 'graphql-import-loader',
  [MINICSS]: MiniCssExtractPlugin.loader,
  [SASS]: 'sass-loader',
  [STYLE]: 'style-loader',
  [SVG]: 'svg-inline-loader',
  [TS]: 'ts-loader',
  [URL]: 'url-loader',
};

export const WEBPACK_LOADERS_REGEXP = {
  [BABEL]: JSX_REGEX,
  [CSS]: CSS_REGEX,
  [FONTS]: FONTS_REGEX,
  [GRAPHQL]: GRAPHQL_REGEX,
  [MINICSS]: MiniCssExtractPlugin.loader,
  [SASS]: SCSS_REGEX,
  [MODULES]: MODULES_REGEX,
  [SVG]: SVG_REGEX,
  [TS]: TS_OR_TSX_REGEX,
  [JPG_OR_PNG]: JPG_OR_PNG_REGEX,
};

export const WEBPACK_LOADERS_UTILITIES = {
  BABEL,
  CSS,
  EXTRACT_CSS,
  EXTRACT_SCSS,
  FILE,
  FONTS,
  GRAPHQL,
  JPG_OR_PNG,
  MINICSS,
  MODULES,
  SASS,
  STYLE,
  SVG,
  TS,
  URL,
};

const JSX_RULES = {
  loader: WEBPACK_LOADERS[BABEL],
  options: {
    babelrc: false,
    configFile: getFolderInCliPath('config/babel/babel.config.js'),
  },
  test: WEBPACK_LOADERS_REGEXP[BABEL],
};

const TSX_RULES = {
  test: WEBPACK_LOADERS_REGEXP[TS],
  use: [WEBPACK_LOADERS[TS]],
};

const CSS_RULES = {
  test: WEBPACK_LOADERS_REGEXP[CSS],
  use: [WEBPACK_LOADERS[STYLE], WEBPACK_LOADERS[CSS]],
};

const SASS_RULES = {
  test: WEBPACK_LOADERS_REGEXP[SASS],
  use: [WEBPACK_LOADERS[STYLE], WEBPACK_LOADERS[CSS], WEBPACK_LOADERS[SASS]],
};

const EXTRACT_CSS_RULES = {
  test: WEBPACK_LOADERS_REGEXP[CSS],
  use: [WEBPACK_LOADERS[MINICSS], WEBPACK_LOADERS[CSS], WEBPACK_LOADERS[SASS]],
};

const EXTRACT_SCSS_RULES = {
  test: WEBPACK_LOADERS_REGEXP[SASS],
  use: [WEBPACK_LOADERS[MINICSS], WEBPACK_LOADERS[CSS], WEBPACK_LOADERS[SASS]],
};

const GRAPHQL_RULES = {
  test: WEBPACK_LOADERS_REGEXP[GRAPHQL],
  use: [WEBPACK_LOADERS[GRAPHQL]],
};

const MODULES_RULES = {
  test: WEBPACK_LOADERS_REGEXP[MODULES],
  type: 'javascript/auto',
  use: [],
};

const SVG_RULES = {
  test: WEBPACK_LOADERS_REGEXP[SVG],
  use: [
    {
      loader: WEBPACK_LOADERS[SVG],
      options: {
        removeTags: true,
      },
    },
  ],
};

const FONTS_RULES = {
  test: WEBPACK_LOADERS_REGEXP[FONTS],
  use: [
    {
      loader: WEBPACK_LOADERS[FILE],
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/fonts/',
      },
    },
  ],
};

export const WEBPACK_LOADERS_RULES = {
  [BABEL]: { ...JSX_RULES },
  [CSS]: { ...CSS_RULES },
  [SASS]: { ...SASS_RULES },
  [EXTRACT_CSS]: { ...EXTRACT_CSS_RULES },
  [EXTRACT_SCSS]: { ...EXTRACT_SCSS_RULES },
  [TS]: { ...TSX_RULES },
  [FONTS]: { ...FONTS_RULES },
  [GRAPHQL]: { ...GRAPHQL_RULES },
  [MODULES]: { ...MODULES_RULES },
  [SVG]: { ...SVG_RULES },
};

export const WEBPACK_FILE_ALLOWED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.scss'];

export const WEBPACK_ALIASES = {};

export const WEBPACK_ENTRYPOINT_MODULES = [
  'react-hot-loader/patch', // Hot reload support
  '@babel/polyfill/noConflict', // Babel polyfills
  'whatwg-fetch', // Fetch polyfills
];
