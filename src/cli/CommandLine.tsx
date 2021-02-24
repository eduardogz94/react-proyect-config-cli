import { inject } from 'inversify';
import { TYPES } from '../constants/types';
import { ICliCommand, ICLiCommandOption, ICliConfig } from './ICommandLine';

export default class ReactConfigCommandLine implements ICliConfig {
  public name: string;
  public version: string;
  public description: string;

  constructor(@inject(TYPES.Program) private program: any) {}

  public startCli = (args: string[]) => {
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

  public addInitialCliConfig = (params: ICliConfig) => {
    const { name, description, version } = params;
    this.program.name(name).version(version).description(description);
  };

  private generateCommand = (): any => {
    return new this.program.Command();
  };

  private createNewCommandWith = (params: ICliCommand) => {
    const { name, description, options } = params;
    const commandObject = this.generateCommand();
    commandObject.command(name).description(description);
    this.mapOptionsIntoCommand(options, commandObject);
  };

  private mapOptionsIntoCommand = (options: ICLiCommandOption[], command: any) => {
    options.length > 2
      ? options.forEach((option: ICLiCommandOption) => this.addOptionToCommand(option, command))
      : this.addOptionToCommand(options[0], command);

    return command;
  };

  private addOptionToCommand = (option: ICLiCommandOption, command: any) => {
    const { description, shortcut } = option;
    command.option(option.shortcut, option.description, option.default);
  };

  private addCommand = (command: any) => {
    return this.program.addCommand(command);
  };

  private getCommands = () => {
    return this.program.commands;
  };
}
