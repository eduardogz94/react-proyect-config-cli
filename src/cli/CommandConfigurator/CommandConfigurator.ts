import {
  ICommandConfigurator,
  CommandOption,
  CommandAction,
} from 'cli/CommandConfigurator/ICommandConfigurator';
import ReactConfigCommandLine from 'cli';

export default class CommandConfigurator implements ICommandConfigurator {
  public name: string;
  public options: CommandOption[];
  public action: CommandAction;

  constructor(private cli: ReactConfigCommandLine) {
    this.cli = cli;
  }
}
