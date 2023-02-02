// scan folders
import {Page, PageRoot} from "../classes/page";
import {join, resolve} from "path";
import {opendir, readFile} from "fs/promises";
// @ts-ignore
//import * as showdown from "showdown";
import {existsSync} from "fs";
import chalk from "chalk";
import {marked} from "marked";

export async function generateStructure(
  outputDir: string = "out",
  path: string = process.cwd()
): Promise<PageRoot | null> {
  const root = new PageRoot(outputDir);
  try {
    //console.log(`Start scan at ${resolve(path)}/ ...`);
    //if (existsSync(resolve(path,"")))
    if (!existsSync(resolve(path, "pages"))) {
      console.error(chalk.yellow(`No "pages" directory found.`));
      return null;
    }
    await addPage(root, null, "");
    return root;
  } catch (e: any) {
    console.error(`Failed to scan folders with error: ${e.message}`);
    return null;
  }
}

async function addPage(root: PageRoot, parent: Page | null, path: string = "") {
  try {
    const dir = await opendir(resolve(process.cwd(), "pages", path));
    const page = parent ? new Page(root.outputDir) : root;
    page.path = join(path);
    for await (const dirent of dir) {
      if (dirent.isDirectory() && dirent.name !== "assets") {
        //console.log("DIR");
        await addPage(root, page, join(path, dirent.name));
      } else if (dirent.isFile()) {
        //console.log(dirent.name);
        try {
          const contents = await readFile(
            resolve(process.cwd(), "pages", path, dirent.name),
            {encoding: "utf8"}
          );
          if (dirent.name === "meta.json") {
            try {
              const meta = JSON.parse(contents);
              page.title = meta.title ?? "";
              page.name = meta.name ?? "";
            } catch (e: any) {
              // console.error(
              //   `Failed parsing json for file ${resolve(
              //     process.cwd(),
              //     "pages",
              //     path,
              //     dirent.name
              //   )} with error: ${e.message}`
              // );
            }
          } else if (
            dirent.name.endsWith(".html") ||
            dirent.name.endsWith(".md") ||
            dirent.name.endsWith(".htm")
          ) {
            if (dirent.name.endsWith(".md")) {
              //const converter = new showdown.Converter();
              //page.body = converter.makeHtml(contents);
              page.body = marked.parse(contents.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""));
            } else {
              page.body = contents;
            }
          }
        } catch (e: any) {
          console.error(
            `Failed reading file ${resolve(
              process.cwd(),
              "pages",
              path,
              dirent.name
            )} with error: ${e.message}`
          );
        }
      }
    }
    if (parent) parent.subpages.push(page);
  } catch (e: any) {
    console.error(
      `Failed add page with path ${resolve(
        process.cwd(),
        "pages",
        path
      )} and error: ${e.message}`
    );
  }
}
