export type CommandAction = () => Record<string, unknown>;

export interface CommandOption {
  flag: string;
  description: string;
}

export interface ICommandConfigurator {
  name: string;
  options: CommandOption[];
  action: CommandAction;
}
