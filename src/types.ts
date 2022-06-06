export interface IConstants {
  REG_EXTENSIONS: RegExp;
  REG_DYNAMIC_PATH: RegExp;
  DATA_PATH: string;
}

export interface IBase extends IConfig {
  completePaths: string[];
  routes: IRouterObject[];
  const: IConstants;
}

export interface IConfig {
  pagePath: string;
  errorPath?: string;
  homeComponentName?: string;
}

export interface IRouterObject {
  path: string;
  component: string;
  data?: string;
  children?: IRouterObject[];
}

export interface IRouteHook extends IRouterObject {}
