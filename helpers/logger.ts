export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface Logger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  debug(msg: string): void;
}

export function createLogger(context: string): Logger {
  const prefix = (level: string) => `[${level.toUpperCase()}][${context}]`;
  return {
    info:  (msg) => console.log(`${prefix('info')} ${msg}`),
    warn:  (msg) => console.warn(`${prefix('warn')} ${msg}`),
    error: (msg) => console.error(`${prefix('error')} ${msg}`),
    debug: (msg) => console.log(`${prefix('debug')} ${msg}`),
  };
}
