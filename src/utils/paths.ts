import path from 'path';
import { CONFIG_WEBPACK_PATH } from '../constants/paths';

export const getCliPath = () => path.resolve(__dirname, '..');
export const getConfigPath = () => path.resolve(__dirname, '..', '..', 'configs');
export const getProjectPath = () => process.cwd();
export const getFolderInCliPath = (folder: string) => path.resolve(getCliPath(), folder);
export const getWebpackPathFile = (file: string) => getFolderInCliPath(CONFIG_WEBPACK_PATH + file);
