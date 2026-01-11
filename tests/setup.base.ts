import pkg from '../package.json' with { type: 'json' };

globalThis.SDK_NAME = pkg.name;
globalThis.SDK_VERSION = pkg.version;
