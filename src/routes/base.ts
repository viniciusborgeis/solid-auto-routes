import * as path from "path";
import { IConfig, IBase, IRouterObject, IConstants } from "../types";
import { getListDirectories } from "../utils";

export default class Base implements IBase {
  completePaths: string[];
  routes: IRouterObject[];
  const: IConstants;
  pagePath: string;
  errorPath?: string | undefined;
  homeComponentName?: string | undefined;

  constructor(config: IConfig) {
    this.pagePath = config.pagePath ?? "./src/pages";
    this.errorPath = config.errorPath ?? "./src/error";
    this.homeComponentName = config.homeComponentName ?? "index";
    this.completePaths = [];
    this.routes = [];
    this.const = {
      REG_EXTENSIONS: /\.(tsx|ts|js|mjs)(?:\?.*|)$/,
      REG_DYNAMIC_PATH: /(?<=\[)(.*?)(?=\])/,
      DATA_PATH: path.resolve(__dirname, "../data")
    };

    this.completePaths = this.getCompletePaths();
  }

  private getCompletePaths(): string[] {
    const paths = this.getDirectories(this.pagePath);
    const errorPath = this.errorPath ? this.getDirectories(this.errorPath) : [];
    const defaultErrorPath = this.errorPath ? this.errorPath : "";
    return [this.pagePath, defaultErrorPath, ...this.completePaths, ...paths, ...errorPath];
  }

  private getDirectories(path: string): string[] {
    const directories = getListDirectories(path);
    const completePaths = directories.map(directory => `${path}/${directory}`);
    const listSubdirectories = completePaths.map(directory => getListDirectories(directory)).flat();
    return [...completePaths, ...listSubdirectories];
  }
}
