import chokidar from 'chokidar';

export interface CodegenPluginOptions {
  watchPath: string;
  onChange: () => Promise<void>;
  environment?: string; 
}

class Watcher {
  private watchPath: string;
  private initialized: boolean = false;
  private running: boolean = false;
  private onChange: () => Promise<void>;
  private watcherInstance: chokidar.FSWatcher | null = null;

  constructor(options: CodegenPluginOptions) {
    this.watchPath = options.watchPath;
    this.onChange = options.onChange;
  }

  public start() {
    if (this.running) return;
    this.watcherInstance = chokidar.watch(this.watchPath, { ignoreInitial: true });
    this.watcherInstance.on('all', async () => {
      await this.onChange();
    });
    this.running = true;
    this.initialized = true;
  }
}

export class CodegenPlugin {
  private watcher: Watcher;

  constructor(options: CodegenPluginOptions) {
    this.watcher = new Watcher(options);
  }

  public setup() {
    this.watcher.start();
  }
}

export function codegenPlugin(options: CodegenPluginOptions) {
  if (options.environment && options.environment !== process.env.NODE_ENV) {
    return null;
  }

  const plugin = new CodegenPlugin(options);
  plugin.setup();
  return plugin;
}
