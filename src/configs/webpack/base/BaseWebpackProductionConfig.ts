import { resolve } from 'path';
import { DEVELOPMENT, PRODUCTION } from '../../../constants/envs';
import { NODE_MODULES_REG_EXP, SOURCE } from '../../../constants/paths';
import { WEBPACK_UTILITIES } from '../constants';
import BaseWebpackConfig from './BaseWebpackConfig';

const { CSS, SASS } = WEBPACK_UTILITIES.type;

class BaseWebpackProductionConfig extends BaseWebpackConfig {
  constructor() {
    super();
  }

  public createBaseWebpackProductionConfiguration = (): any[] => {
    const baseConfiguration: any[] = [
      this.setMode(DEVELOPMENT),
      this.setAppEntrypoint(resolve(SOURCE, 'index.jsx')),
      this.setSourcemapMode(PRODUCTION),
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

    return baseConfiguration;
  };
}

export default BaseWebpackProductionConfig;
