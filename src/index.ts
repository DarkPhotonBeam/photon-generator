#!/usr/bin/env node
import * as figlet from "figlet";
import {program} from "commander";
import chalk from "chalk";
import {generateStructure} from "./helpers/structure";
import {resolve} from "path";

program
  .name("photon-generator")
  .description(
    "Tool to generate static websites using .md or .html with recursive folder structure"
  )
  .version("0.0.1");

program
  .option("-dn, --disableNav", "disable navigation generation", false)
  .option("-o --outDir <path>", "specify output directory", "docs");

program.parse();

const options = program.opts();

async function run() {
  try {
    console.log(chalk.bold(chalk.blue(figlet.textSync("photon generator"))));
    if (
      resolve(process.cwd(), options.outDir) === resolve(process.cwd(), "pages")
    ) {
      return console.warn(
        chalk.yellow(
          `Output directory must not be "pages". Try a different name.`
        )
      );
    }
    console.log(
      chalk.blue("Scanning folders and generating tree structure...")
    );
    const root = await generateStructure(options.outDir);
    if (root) {
      console.log(chalk.green("Done."));
      console.log(chalk.blue("Building static website..."));
      const success = await root.buildRoot();
      if (success) console.log(chalk.green("Done."));
    }
  } catch (e: any) {
    console.error(chalk.red(`Something went wrong: ${e.message}`));
  }
}

run().then(r => {});
