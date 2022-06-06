import Base from "./base";
import { getListOfFiles, SaveDataFile } from "../utils/directories";

import { IConfig, IRouterObject } from "../types";

export default class AutoRoutesBuilder extends Base {
  constructor(config: IConfig) {
    super(config);
  }

  public perform() {
    this.routes = this.getRoutes();

    SaveDataFile(`${this.const.DATA_PATH}/routes.json`, this.routes);
  }

  private getRoutes(): IRouterObject[] {
    const routes = this.completePaths.map(path => this.getPageObjects(path));
    const completeRoutes = routes.flat().filter(route => route !== undefined);
    const finalRoutes = this.removeIndexPathDuplicates(completeRoutes);
    return finalRoutes;
  }

  private getPageObjects(path: string): IRouterObject[] {
    const files = getListOfFiles(path);
    if (files.length <= 0) return [];

    const listRouteObjects: IRouterObject[] = [];
    const object = files.map(file => this.getRouterObject(file, files, path));
    listRouteObjects.push(...object);
    return listRouteObjects;
  }

  private getRouterObject(file: string, files: string[], path: string): IRouterObject {
    const routeObject = {} as IRouterObject;
    const fileName = file.replace(this.const.REG_EXTENSIONS, "");

    if (fileName.includes(".")) return routeObject;

    routeObject.path = this.getRouteObjectPath(path, fileName);
    routeObject.component = `${path}/${fileName}`;
    routeObject.data = this.getRouteObjectData(path, files, fileName);

    return routeObject;
  }

  private getRouteObjectPath(path: string, fileName: string): string {
    let currentPath = "";
    if (fileName === "404") return (currentPath = "**");
    if (fileName === this.pagePath)
      currentPath = fileName == this.homeComponentName ? "/" : `/${fileName}`;
    else currentPath = `${path.replace(this.pagePath, "")}/${fileName}`;

    while (currentPath.includes("[") && currentPath.includes("]")) {
      const dynamicParamValue = this.getQueryParamValue(currentPath);
      if (dynamicParamValue === null) break;

      currentPath = dynamicParamValue;
    }

    return currentPath;
  }

  private getQueryParamValue(path: string): string | null {
    const queryParamPath = path.match(this.const.REG_DYNAMIC_PATH);
    if (queryParamPath === null) return null;

    const queryParamValue = queryParamPath[0];
    return path.replace(`[${queryParamValue}]`, `:${queryParamValue}`);
  }

  private getRouteObjectData(path: string, files: string[], fileName: string): string | undefined {
    const listExtensions = ["data.ts", "data.js"];
    let currentData = undefined;

    listExtensions.forEach(extension => {
      if (files.includes(`${fileName}.${extension}`)) {
        currentData = `${path}/${fileName}.${extension}`;
      }
    });

    return currentData;
  }

  private removeIndexPathDuplicates(routes: IRouterObject[]): IRouterObject[] {
    const [indexRoutes, originalRoutes] = this.getIndexAndOriginalRoutesIndexes(routes);
    let finalRoutes = routes.map(route => route);

    indexRoutes.forEach((_, index) => {
      originalRoutes.forEach((_, originalIndex) => {
        const pathIndex = routes[indexRoutes[index]].path;
        const pathOriginal = routes[originalRoutes[originalIndex]].path;

        const pathIndexSplit = pathIndex.split("/");

        if (pathIndexSplit.join("/") === pathOriginal) {
          indexRoutes.forEach((_, index) => {
            finalRoutes[index].path = finalRoutes[index].path.replaceAll("/index", "");
          });
          originalRoutes.forEach((_, originalIndex) => delete finalRoutes[index]);
        }
      });
      indexRoutes.forEach((_, index) => {
        finalRoutes[index].path = finalRoutes[index].path.replaceAll("/index", "");
      });
    });

    return finalRoutes.filter(route => route !== null);
  }

  private getIndexAndOriginalRoutesIndexes(routes: IRouterObject[]): [number[], number[]] {
    const indexRoutes: number[] = [];
    const originalRoutes: number[] = [];

    routes.forEach((route, index) => {
      const indexRoute = route.path.split("/");

      if (indexRoute.includes("index")) {
        indexRoutes.push(index);

        routes.forEach((routeOriginal, indexOriginal) => {
          indexRoute.pop();
          if (indexRoute.join("/") === routeOriginal.path) originalRoutes.push(indexOriginal);
        });
      }
    });

    return [indexRoutes, originalRoutes];
  }
}
