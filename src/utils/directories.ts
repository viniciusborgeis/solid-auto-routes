import * as fs from "fs";
import { IRouterObject } from "../types";

export const isDirectory = (path: string): boolean => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (e) {
    return false;
  }
};

export const getListOfFiles = (path: string): string[] => {
  return fs.readdirSync(path).filter((file: any) => !isDirectory(`${path}/${file}`));
};

export const getListDirectories = (path: string): string[] => {
  return fs.readdirSync(path).filter((file: any) => isDirectory(`${path}/${file}`));
};

export const SaveDataFile = (path: string, data: IRouterObject[]): void => {
  const newData = { fallbackDirectories: getFallbackRootPath(__dirname), routes: data };

  fs.writeFileSync(path, JSON.stringify(newData, null, 2));
};

export const getFallbackRootPath = (path: string) => {
  const rootPath = process.cwd();
  const actualPath = path.replace(rootPath, "").replace("/", "");

  const levelSubdirectories = actualPath.split("\\").length - 1;
  let returnPathString = "../".repeat(levelSubdirectories);
  return returnPathString;
};
