import * as clc from 'cli-color';
import { Injectable, LoggerService, LogLevel, Optional } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';

declare const process: any;
const yellow = clc.xterm(3);

@Injectable()
export class Logger implements LoggerService {
  private static logLevels: LogLevel[] = [
    'log',
    'error',
    'warn',
    'debug',
    'verbose',
  ];
  private static lastTimestamp?: number;
  private static instance?: typeof Logger | LoggerService = Logger;
  private static appName: string;

  constructor(
    @Optional() protected context?: string,
    @Optional() private readonly isTimestampEnabled = false,
  ) {
    Logger.appName = (process.env.APP_NAME || 'NONAME').toUpperCase();
  }

  error(message: any, trace = '', context?: string) {
    if (message instanceof Error || message instanceof TypeError) {
      message = message.message;
      trace = message.trace;
    }

    const instance = this.getInstance();
    if (!this.isLogLevelEnabled('error')) {
      return;
    }

    if (instance) {
      instance.error.call(instance, message, trace, context || this.context);
    }
  }

  log(message: any, context?: string) {
    this.callFunction('log', message, context);
  }

  warn(message: any, context?: string) {
    this.callFunction('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.callFunction('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.callFunction('verbose', message, context);
  }

  setContext(context: string) {
    this.context = context;
  }

  static overrideLogger(logger: LoggerService | LogLevel[] | boolean) {
    if (Array.isArray(logger)) {
      this.logLevels = logger;
      return;
    }
    this.instance = isObject(logger) ? (logger as LoggerService) : undefined;
  }

  static log(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(
      this.appName,
      message,
      clc.green,
      context,
      isTimeDiffEnabled,
    );
  }

  static error(
    message: any,
    trace = '',
    context = '',
    isTimeDiffEnabled = true,
  ) {
    this.printMessage(
      this.appName,
      message,
      clc.red,
      context,
      isTimeDiffEnabled,
    );
    this.printStackTrace(trace);
  }

  static warn(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(
      this.appName,
      message,
      clc.yellow,
      context,
      isTimeDiffEnabled,
    );
  }

  static debug(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(
      this.appName,
      message,
      clc.magentaBright,
      context,
      isTimeDiffEnabled,
    );
  }

  static verbose(message: any, context = '', isTimeDiffEnabled = true) {
    this.printMessage(
      this.appName,
      message,
      clc.cyanBright,
      context,
      isTimeDiffEnabled,
    );
  }

  private callFunction(
    name: 'log' | 'warn' | 'debug' | 'verbose',
    message: any,
    context?: string,
  ) {
    if (!this.isLogLevelEnabled(name)) {
      return;
    }
    const instance = this.getInstance();
    const func = instance && (instance as typeof Logger)[name];
    func &&
      func.call(
        instance,
        message,
        context || this.context,
        this.isTimestampEnabled,
      );
  }

  private getInstance(): typeof Logger | LoggerService {
    const { instance } = Logger;
    return instance === this ? Logger : instance;
  }

  private isLogLevelEnabled(level: LogLevel): boolean {
    return Logger.logLevels.includes(level);
  }

  private static printMessage(
    appName: string,
    message: any,
    color: (message: string) => string,
    context = '',
    isTimeDiffEnabled?: boolean,
  ) {
    const output = isObject(message)
      ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
      : color(message);

    // const localeStringOptions = {
    //   year: 'numeric',
    //   hour: 'numeric',
    //   minute: 'numeric',
    //   second: 'numeric',
    //   day: '2-digit',
    //   month: '2-digit',
    // };
    // const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
    const timestamp = new Date(Date.now()).toISOString();

    // TODO process.env.APP_NAME 으로 대체하기!
    // TODO GCP stackdriver 에서 보면 color 코드가 string 으로 표시되는데, APP_ENV 가 prod 일 때 어떻게 처리하는게 좋을지 고민이 필요합니다.
    const pidMessage = color(`[${appName}] ${process.pid} - `);
    const contextMessage = context ? yellow(`- [${context}] `) : '';
    const timestampDiff = this.updateAndGetTimestampDiff(isTimeDiffEnabled);

    process.stdout.write(
      `${pidMessage}${timestamp} ${contextMessage}${output}${timestampDiff}\n`,
    );
  }

  private static updateAndGetTimestampDiff(
    isTimeDiffEnabled?: boolean,
  ): string {
    const includeTimestamp = Logger.lastTimestamp && isTimeDiffEnabled;
    const result = includeTimestamp
      ? yellow(` +${Date.now() - Logger.lastTimestamp}ms`)
      : '';
    Logger.lastTimestamp = Date.now();
    return result;
  }

  private static printStackTrace(trace: string) {
    if (!trace) {
      return;
    }
    process.stdout.write(`${trace}\n`);
  }
}
