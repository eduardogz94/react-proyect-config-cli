import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getFolderInCliPath } from 'utils/paths';
import { WEBPACK_UTILITIES } from 'configs/webpack/constants';

// TODO Crear typings correctos y exportar as const
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
  FILE,
  MINICSS,
  STYLE,
} = WEBPACK_UTILITIES.type;

// TODO Crear typings correctos y exportar as const
const {
  CSS_REGEX,
  FONTS_REGEX,
  GRAPHQL_REGEX,
  JPG_OR_PNG_REGEX,
  JSX_REGEX,
  MODULES_REGEX,
  SCSS_REGEX,
  SVG_REGEX,
  TS_OR_TSX_REGEX,
} = WEBPACK_UTILITIES.regexp;

// TODO Crear typings correctos y exportar as const
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

// TODO Crear typings correctos y exportar as const
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

// ------------------------ Mejorar en todas estas constantes ------------------------
// TODO Crear typings correctos y exportar as const
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

// ------------------------ |Mejorar en todas estas constantes -----------------------
