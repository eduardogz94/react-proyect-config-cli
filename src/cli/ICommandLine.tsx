export interface ICliConfig {
  description: string;
  version: string;
  name: string;
}

export interface ICliCommand {
  options: ICLiCommandOption[];
  name: string;
  description?: string;
  action?: () => void;
}

export interface ICLiCommandOption {
  shortcut: string;
  description: string;
  default: any;
}
