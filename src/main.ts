import AutoRoutesBuilder from "./routes";
import { IConfig } from "./types";
import { Plugin } from "vite";

function AutoRoutes(config: IConfig): Plugin[] {
  const plugins: Plugin[] = [];
  const autoRoutesBuilder = new AutoRoutesBuilder(config);

  autoRoutesBuilder.perform();

  plugins.push({
    name: "auto-routes",
    enforce: "post",
    handleHotUpdate({ server, file }) {
      console.log(`[auto-routes] hot update: ${file}`);
      server.restart();
    }
  });

  return plugins;
}

export { AutoRoutes as default };
