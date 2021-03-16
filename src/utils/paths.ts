import path from 'path';
import { CONFIG_WEBPACK_PATH } from 'constants/paths';

// TODO Mejorar constantes y typings
export const getCliPath = (): string => path.resolve(__dirname, '..');

export const getConfigPath = (): string => path.resolve(__dirname, '..', '..', 'configs');

export const getProjectPath = (): string => process.cwd();

export const getFolderInCliPath = (folder: string): string => path.resolve(getCliPath(), folder);

export const getWebpackPathFile = (file: string): string => getFolderInCliPath(CONFIG_WEBPACK_PATH + file);
