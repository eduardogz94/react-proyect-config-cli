/* eslint-disable @typescript-eslint/no-inferrable-types */
// TODO Crear typings correctos y crear sus respectivos simbolos
const BABEL = 'babel';
const CSS = 'css';
const FILE: string = 'file';
const GRAPHQL: string = 'graphql';
const MINICSS: string = 'miniCss';
const SASS: string = 'sass';
const STYLE: string = 'style';
const SVG: string = 'svg-inlie';
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

// TODO Crear typings correctos y crear sus respectivos simbolos
export const WEBPACK_FILE_ALLOWED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.scss'];

export const WEBPACK_ALIASES = {};

export const WEBPACK_ENTRYPOINT_MODULES = [
  'react-hot-loader/patch', // Hot reload support
  '@babel/polyfill/noConflict', // Babel polyfills
  'whatwg-fetch', // Fetch polyfills
];

// TODO Crear typings correctos y exportar as const
export const WEBPACK_UTILITIES = {
  regexp: {
    CSS_REGEX,
    FONTS_REGEX,
    GRAPHQL_REGEX,
    JPG_OR_PNG_REGEX,
    JSX_REGEX,
    MODULES_REGEX,
    SCSS_REGEX,
    SVG_REGEX,
    TS_OR_TSX_REGEX,
  },
  type: {
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
  },
};
