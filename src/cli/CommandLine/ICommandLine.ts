export type ICliCommandAction = () => void | Promise<void>;

export interface ICliConfig {
  description: string;
  version: string;
  name: string;
}

export interface ICLiCommandOption {
  flag: string;
  description: string;
  default?: string | boolean | undefined;
}

export interface ICliCommand {
  options: ICLiCommandOption[];
  name: string;
  description: string;
  action: ICliCommandAction;
}
