import { Watcher } from "./Watcher";
import { CodegenPluginOptions } from "./types";


export function codegenPlugin(options: CodegenPluginOptions) {
  const watcher = new Watcher(options);

  return {
    name: "codegen-plugin",
    apply: "serve",
    configureServer() {
      watcher.start();
    },
  };
}