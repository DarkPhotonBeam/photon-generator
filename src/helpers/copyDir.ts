import {opendir, copyFile, mkdir} from "fs/promises";
import {existsSync, PathLike} from "fs";
import {resolve, join} from "path";

async function copyDir(src: string, dest: string, recursive: boolean = true) {
  try {
    const dir = await opendir(src);
    //if (!existsSync(resolve(dest))) await mkdir(resolve(dest));
    for await (const dirent of dir) {
      if (dirent.isDirectory() && recursive) {
        await mkdir(resolve(dest, dirent.name));
        await copyDir(join(src, dirent.name), join(dest, dirent.name));
      } else {
        await copyFile(resolve(src, dirent.name), resolve(dest, dirent.name));
      }
    }
  } catch (e: any) {
    console.error(`Copy dir failed with error: ${e.message}`);
  }
}

export default copyDir;
