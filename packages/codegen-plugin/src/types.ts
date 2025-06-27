export interface CodegenPluginOptions {
  watchPath: string;
  onChange: () => Promise<void>;
}