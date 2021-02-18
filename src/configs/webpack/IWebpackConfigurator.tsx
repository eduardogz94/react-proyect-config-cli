export interface IWebpackConfigurator {}

export interface IHtmlPluginOptions {
  favIcon?: string;
  filename?: string;
  inject: boolean;
}

export interface IHtmlOutputTemplate {
  template: string;
  templateParameters?: {
    configPath: null;
  };
}
