import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { ICliCommand, ICLiCommandOption, ICliConfig } from './ICommandLine';
import { CommanderStatic, Command } from 'commander';

export default class ReactConfigCommandLine implements ICliConfig {
  public name: string;
  public version: string;
  public description: string;

  constructor(@inject(TYPES.Program) public program: CommanderStatic) {
    this.program = program;
    // eslint-disable-next-line no-console
    console.log(this.program);
  }

  public startCli = (args: string[]): void | 0 => {
    // eslint-disable-next-line no-console
    console.log(args);
    // @TODO: Change constant names, hard to understand
    const argsHasoptions = args.slice(2).length;
    const hasTypedSomething = /[a-z]/.test(args.slice(2)[0]);
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

  public generateCommand = (): ReturnType<Command['createCommand']> => {
    return new this.program.Command();
  };

  public createNewCommandWith = (params: ICliCommand): void => {
    const { name, description, options } = params;
    const commandObject = this.generateCommand();
    commandObject.command(name).description(description);
    this.mapOptionsIntoCommand(options, commandObject);
  };

  public mapOptionsIntoCommand = (
    options: ICLiCommandOption[],
    command: ReturnType<Command['createCommand']>
  ): ReturnType<Command['createCommand']> => {
    options.length > 2
      ? options.forEach((option: ICLiCommandOption) => this.addOptionToCommand(option, command))
      : this.addOptionToCommand(options[0], command);

    return command;
  };

  public addOptionToCommand = (option: ICLiCommandOption, command: ReturnType<Command['createCommand']> ): void => {
    const { description, flag } = option;
    command.option(flag, description, option.default);
  };

  public addCommand = (command: ReturnType<Command['createCommand']> ): CommanderStatic => {
    return this.program.addCommand(command);
  };

  public getCommands = (): ReturnType<Command['createCommand']>[] => {
    return this.program.commands;
  };
}
