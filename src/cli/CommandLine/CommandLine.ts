import { ICliCommand, ICLiCommandOption, ICliConfig, ICliCommandAction } from './ICommandLine';
import commander, { CommanderStatic, Command } from 'commander';

export default class ReactConfigCommandLine implements ICliConfig {
  public name: string;
  public version: string;
  public description: string;

  constructor(private program: CommanderStatic) {
    this.program = program;
  }

  public startCli = (args: string[]): void | 0 => {
    // @TODO: Change constant names, hard to understand
    const argsHasoptions = args.slice(2).length;
    const hasTypedSomething = /[a-z]/.test(args.slice(2)[0]);
    // console.log(argsHasoptions, hasTypedSomething);
    if (!argsHasoptions || !hasTypedSomething) {
      this.program.outputHelp();
      return 0;
    }

    this.program.parse(args);
  };

  public addInitialCliConfig = (params: ICliConfig): void => {
    const { name, description, version } = params;
    this.program.name(name).version(version).description(description);
  };

  public generateCommand = (name?: string): commander.Command => {
    return new this.program.Command(name);
  };

  public createNewCommandWith = (params: ICliCommand): commander.Command => {
    const { name, description, options, action } = params;
    const commandObject = this.generateCommand(name);
    commandObject.command(name).description(description);
    return this.mapOptionsIntoCommand(options, commandObject, action);
  };

  public mapOptionsIntoCommand = (
    options: ICLiCommandOption[],
    command: commander.Command,
    action: ICliCommandAction
  ): commander.Command => {
    options.length > 2
      ? options.forEach((option: ICLiCommandOption) =>
          this.addOptionToCommand(option, command, action)
        )
      : this.addOptionToCommand(options[0], command, action);

    return command;
  };

  public addOptionToCommand = (
    option: ICLiCommandOption,
    command: commander.Command,
    action: ICliCommandAction
  ): void => {
    const { description, flag } = option;
    command.option(flag, description, option.default).action(action);
  };

  public addCommand = (command: Command): CommanderStatic => {
    return this.program.addCommand(command);
  };

  public getCommands = (): ReturnType<Command['createCommand']>[] => {
    return this.program.commands;
  };
}
