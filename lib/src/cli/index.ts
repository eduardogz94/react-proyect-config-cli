import program from "commander";

export const getCommands = () => {
  return program.commands;
};

export const reactConfigCli = (args: any) => {
  if (!args.slice(2).length || !/[a-z]/.test(args.slice(2)[0])) {
    program.outputHelp();
    return 0;
  } else {
    program.parse(args);
  }
};

program
  .name("react-proyect-config-cli")
  .version("0.0.1")
  .description("")
  .option("-p, --pepper");
