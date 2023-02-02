#!/usr/bin/env node
import * as figlet from "figlet";
import {program} from "commander";
import chalk from "chalk";
import {generateStructure} from "./helpers/structure";
import {resolve} from "path";
import express from 'express';

const app = express();

program
  .name("photon-generator")
  .description(
    "Tool to generate static websites using .md or .html with recursive folder structure"
  )
  .version("0.0.3");

program
  .option("-dn, --disableNav", "disable navigation generation", false)
  .option("-o --outDir <path>", "specify output directory", "docs")
  .option("-w --watch", "watch files in pages for changes -> regenerate on change", false)
  .option("-pr --pollingRate", "in what time intervals in ms the file watcher should check for changes (only effective with --watch)", "1000")
  .option("-s --serve", "serve built files on localhost", false);

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
    let root = await generateStructure(options.outDir);
    if (root) {
      console.log(chalk.green("Done."));
      console.log(chalk.blue("Building static website..."));
      const success = await root.buildRoot();
      if (success) console.log(chalk.green("Done."));
    }
    if (options.watch) {
      console.log(chalk.blue("Watching files for changes..."));
      let changed = false;
      let building = false;
      setInterval(async () => {
        if (building) return;
        building = true;
        const newRoot = await generateStructure(options.outDir)
        if (root && newRoot && !root.compare(newRoot)) {
          const success = await newRoot.buildRoot();
          root = newRoot;
          if (success) console.log(chalk.green("Regenerated."));
        }
        building = false;
      }, parseInt(options.pollingRate));
    }
    if (options.serve) {
      app.use('/', express.static(resolve(process.cwd(), 'docs')));

      app.listen(3000, () => {
        console.log(chalk.blue(`Started local server at http://localhost:3000`));
      });
    }
  } catch (e: any) {
    console.error(chalk.red(`Something went wrong: ${e.message}`));
  }
}

run().then(r => {});
